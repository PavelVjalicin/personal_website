const Express = require("express")
const path = require("path")
const fs = require('fs');
const fetch = require('node-fetch');

class Server {
    constructor(_port,isDev) {
        this.port = _port
        this.app = new Express()
        this.sockets = []
        this.isDev = isDev
        this.expressWS = require("express-ws")(this.app);
        this.repos = {
            lastUpdatedEpoch:0,
            data:[]
        };

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

        this.app.get('*.js', gz("text/javascript"));
        this.app.get('*.css', gz("text/css") );

        this.app.use("/dist", Express.static('dist'))

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

    updateRepo() {
        console.log("GitHub repos updated")
        return fetch("https://api.github.com/users/PavelVjalicin/repos")
            .then(resp => {
                if(resp.ok) return resp
                else throw "GitHub server error"
            })
            .then(resp => resp.json())
            .then(json => {
                if(fs.existsSync(this.reposDir)) fs.unlinkSync(this.reposDir)
                json.sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at) )
                const resp = { lastUpdatedEpoch:Date.now(), data:json }
                fs.writeFile(this.reposDir,JSON.stringify(resp),(err) => {})
                return resp
            })
    }

    async getRepos() {
        if(this.repos.data.length === 0) {
            if(fs.existsSync(this.reposDir))  {
                //Retrieve from cache
                return JSON.parse(fs.readFileSync(this.reposDir));
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