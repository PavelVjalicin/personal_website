const validateEmail = require("./src/js/validateEmail").default
const Express = require("express")
const http2 = require("http2")
const path = require("path")
const fs = require('fs')
const fetch = require('node-fetch');
const sendEmail = require('./email').default
const bodyParser = require('body-parser')
const Hapi = require("@hapi/hapi")

const reposDir = this.dataDir+"/repos.json"
let repos = {
    lastUpdatedEpoch:0,
    data:[]
};
const favicon = fs.readFileSync("./favicon.ico")

function updateRepo() {
    console.log("GitHub repos updated")
    return fetch("https://api.github.com/users/PavelVjalicin/repos")
        .then(resp => {
            if (resp.ok) return resp
            else throw "GitHub server error"
        })
        .then(resp => resp.json())
        .then(json => {
            if (fs.existsSync(reposDir)) fs.unlinkSync(reposDir)
            json.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            const resp = {lastUpdatedEpoch: Date.now(), data: json}
            fs.writeFile(reposDir, JSON.stringify(resp), (err) => {
            })
            return resp
        })
}

async function getRepos() {
    if(repos.data.length === 0) {
        if(fs.existsSync(reposDir))  {
            //Retrieve from cache
            const json = JSON.parse(fs.readFileSync(reposDir));
            if(json.lastUpdatedEpoch + (2*60*60*1000) < Date.now() ) {
                return await updateRepo()
            } else return json
        } else {
            return await updateRepo()
        }

    } else if(repos.lastUpdatedEpoch + (2*60*60*1000) < Date.now() ) {
        //Update
        return await updateRepo()
    } else {
        //Return in memory
        return repos
    }
}

const initHapi = async () => {
    const listener = http2.createSecureServer(
        {
            key:fs.readFileSync("private.pem"),
            cert:fs.readFileSync("cert.pem")
        }
    )

    const server = Hapi.Server({
        listener,
        port: "9000",
        routes: {
            files: {
                relativeTo: __dirname
            }
        }
    })

    await server.register(require("@hapi/inert"))

    server.route([{
        method:'GET',
        path:"/api/repo",
        handler:(req,h) => {
            return getRepos().then(r => {
                repos = r
                return JSON.stringify(repos.data)
            })
        }
    },{
        method:'GET',
        path:"/dist/{any*}",
        handler: (req,h) => {
            const type = req.params.any.split(".").pop()

            let resp = h.file("dist/"+req.params.any+".gz").header('Content-Encoding', 'gzip')

            if(type === "js") resp.header("Content-Type","text/javascript")
            else if(type === "css") resp.header("Content-Type","text/css")

            return resp
        }
    },{
        method:'GET',
        path:'/favicon.ico',
        handler: (req,h) =>
            h.response(favicon).header('Content-Length', favicon.length)
                .header('Content-Type', 'image/x-icon')
                .header("Cache-Control", "public, max-age=2592000") //Expires in a month
                .header("Expires", new Date(Date.now() + 2592000000).toUTCString())

    },{
        method:'GET',
        path:'/{any*}',
        handler: (req,h) => {
            return h.file("src/index.html")
        }
    }])

    await server.start(err => {
        if(err) console.log(err)
    })

    console.log('Server running at:', server.info.uri);
}

class Server {
    constructor(_port,isDev) {
        this.port = _port

        initHapi()

        this.app = new Express()
        this.sockets = []
        this.isDev = isDev
        this.expressWS = require("express-ws")(this.app);
        this.repos = {
            lastUpdatedEpoch:0,
            data:[]
        };

        this.readMe = {}

        const favicon = fs.readFileSync("./favicon.ico")

        const appOptions = {
            root: path.join(__dirname)
        }
        this.dataDir = "./data"
        this.reposDir = this.dataDir+"/repos.json"

        if(!fs.existsSync(this.dataDir))
            fs.mkdirSync(this.dataDir)

        function gz(type) {
            return function(req, res, next) {
                req.url = req.url + '.gz';
                res.set('Content-Encoding', 'gzip');
                res.set('Content-Type', type);
                next();
            }
        }

        const jsonParser = bodyParser.json()

        this.app.get('*.js', gz("text/javascript"));
        this.app.get('*.css', gz("text/css") );

        this.app.get("/robots.txt",(req,res) => {
            res.sendFile("robots.txt",appOptions)
        })

        this.app.use("/dist", Express.static('dist'))

        this.app.use("/public", Express.static('public'))

        if(isDev) {
            this.app.ws("/", (ws,req) => {

            })
        }

        this.app.get("/api/repo", (req,res) => {
            this.getRepos().then(repos => {
                this.repos = repos
                res.json(this.repos.data)
            })

        })

        this.app.get("/api/readme/:repo", (req,res) => {
            const repo = req.params.repo
            this.getReadme(res,repo)
        })

        this.app.post("/api/contact",jsonParser,(req,res) => {
            const {name,email,message} = req.body
            if(name && validateEmail(email) && message) {
                sendEmail(email,name,message)
                    .then(
                        res.sendStatus(200)
                    ).catch( e => {
                    console.log(e)
                    res.status(500).json({error:"Something went wrong"})
                })
            } else {
                res.status(500).json({error:"Form was not filled in correctly."})
            }
        })

        this.app.get("/favicon.ico", (req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Length', favicon.length);
            res.setHeader('Content-Type', 'image/x-icon');
            res.setHeader("Cache-Control", "public, max-age=2592000");                // expiers after a month
            res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
            res.end(favicon);
        });

        this.app.get("*",(req,res) => {
            res.sendFile("src/index.html",appOptions)
        })
    }

    async updateReadme(repo,fileDir) {
        console.log(`Github ${repo} Readme updated`)
        return fetch(`https://raw.githubusercontent.com/pavelVjalicin/${repo}/master/README.md`)
            .then(resp => {
                if(resp.ok) return resp.text()
                else if(resp.status === 404 ) {
                    return repo + " does not have a README.md file."
                } else {
                    console.log(resp)
                    throw "Github server error"
                }
            })
            .then(body => {
                if (fs.existsSync(fileDir)) fs.unlinkSync(fileDir)
                const resp = {lastUpdatedEpoch: Date.now(), data: body}
                fs.writeFile(fileDir, JSON.stringify(resp), (err) => {
                })
                return resp
            })

    }

    async getReadme(res,repo) {
        const inMemoryReadme = this.readMe[repo]
        const fileName = this.dataDir+`/${repo}_README.json`
        if(inMemoryReadme) {
            if(inMemoryReadme.lastUpdatedEpoch + (2*60*60*1000) < Date.now()) {
                //Update
                this.readMe[repo] = await this.updateReadme(repo,fileName)
                res.send(this.readMe[repo].data)
            } else {
                //Return in memory
                res.send(inMemoryReadme.data)
            }
        } else {

            if(fs.existsSync(fileName)) {
                //Retrieve from cache
                const json = JSON.parse(fs.readFileSync(fileName))
                if(json.lastUpdatedEpoch + (2*60*60*1000) < Date.now()) {
                    //update
                    this.readMe[repo] = await this.updateReadme(repo,fileName)
                    res.send(this.readMe[repo].data)
                } else {
                    this.readMe[repo] = { lastUpdatedEpoch:json, data:json.data}
                    res.send(json.data)
                }
            } else {
                //Update
                this.readMe[repo] = await this.updateReadme(repo,fileName)
                res.send(this.readMe[repo].data)
            }

        }
    }

    updateRepo() {
        console.log("GitHub repos updated")
        return fetch("https://api.github.com/users/PavelVjalicin/repos")
            .then(resp => {
                if (resp.ok) return resp
                else throw "GitHub server error"
            })
            .then(resp => resp.json())
            .then(json => {
                if (fs.existsSync(this.reposDir)) fs.unlinkSync(this.reposDir)
                json.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                const resp = {lastUpdatedEpoch: Date.now(), data: json}
                fs.writeFile(this.reposDir, JSON.stringify(resp), (err) => {
                })
                return resp
            })
    }

    async getRepos() {
        if(this.repos.data.length === 0) {
            if(fs.existsSync(this.reposDir))  {
                //Retrieve from cache
                const json = JSON.parse(fs.readFileSync(this.reposDir));
                if(json.lastUpdatedEpoch + (2*60*60*1000) < Date.now() ) {
                    return await this.updateRepo()
                } else return json
            } else {
                return await this.updateRepo()
            }

        } else if(this.repos.lastUpdatedEpoch + (2*60*60*1000) < Date.now() ) {
            //Update
            return await this.updateRepo()
        } else {
            //Return in memory
            return this.repos
        }
    }

    start() {
        this.app.listen(this.port,() => {
            console.log(`Listening at port ${this.port}`)
        })
        this
    }

    sendMessageToWS(msg) {
        if(this.isDev) {
            this.expressWS.getWss().clients.forEach((socket)=>{
                socket.send(msg)
            })
        }
    }
}

exports.default = (port,isDev) => new Server(port,isDev)