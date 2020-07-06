const validateEmail = require("./src/js/validateEmail").default
const http2 = require("http2")
const fs = require('fs')
const fetch = require('node-fetch');
const sendEmail = require('./email').default
const Hapi = require("@hapi/hapi")

const dataDir = "./data"
const readMe = {}
const reposDir = dataDir+"/repos.json"
let repos = {
    lastUpdatedEpoch:0,
    data:[]
};

const favicon = fs.readFileSync("./favicon.ico")

if(!fs.existsSync(dataDir))
    fs.mkdirSync(dataDir)

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

async function updateReadme(repo,fileDir) {
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

async function getReadme(repo) {
    const inMemoryReadme = readMe[repo]
    const fileName = dataDir+`/${repo}_README.json`
    if(inMemoryReadme) {
        if(inMemoryReadme.lastUpdatedEpoch + (2*60*60*1000) < Date.now()) {
            //Update
            readMe[repo] = await updateReadme(repo,fileName)
            return readMe[repo].data
        } else {
            //Return in memory
            return inMemoryReadme.data
        }
    } else {
        if(fs.existsSync(fileName)) {
            //Retrieve from cache
            const json = JSON.parse(fs.readFileSync(fileName))
            if(json.lastUpdatedEpoch + (2*60*60*1000) < Date.now()) {
                //update
                readMe[repo] = await updateReadme(repo,fileName)
                return readMe[repo].data
            } else {
                readMe[repo] = { lastUpdatedEpoch:json, data:json.data}
                return json.data
            }
        } else {
            //Update
            readMe[repo] = await updateReadme(repo,fileName)
            return readMe[repo].data
        }

    }
}

const initHapi = async (port) => {
    const listener = http2.createSecureServer(
        {
            key:fs.readFileSync("private.pem"),
            cert:fs.readFileSync("cert.pem")
        }
    )

    const server = Hapi.Server({
        listener,
        port: port,
        routes: {
            files: {
                relativeTo: __dirname
            }
        }
    })

    await server.register(require("@hapi/inert"))

    server.route([{
        method:'GET',
        path:'/robots.txt',
        handler: (req,h) =>
            h.file("robots.txt")

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
        path:"/api/repo",
        handler:(req,h) => {
            return getRepos().then(r => {
                repos = r
                return JSON.stringify(repos.data)
            })
        }
    },{
        method:"GET",
        path:"/api/readme/{repo}",
        handler:(req,h) => {
            const repo = req.params.repo
            return getReadme(repo)
        }
    },{
        method:"POST",
        path:"/api/contact",
        handler: (req,h) => {
            const {name,email,message} = req.payload
            if(name && validateEmail(email) && message) {
                return sendEmail(email,name,message)
                    .then( resp => h.response().code(200) )
                    .catch( e => h.response(JSON.stringify({error:"Something went wrong"})).code(500) )
            } else {
                return h.response(JSON.stringify({error:"Form was not filled in correctly."})).code(500)
            }
        }
    },{
        method:'GET',
        path:"/dist/{any*}",
        handler: (req,h) => {
            const type = req.params.any.split(".").pop()
            const dir = "dist/"+req.params.any
            const fileDir = "./"+dir+".gz"

            let resp

            if(!fs.existsSync(fileDir)) {
                resp = h.file(dir)
            } else {
                resp = h.file(dir+".gz")
                resp.header('Content-Encoding', 'gzip')
            }
            

            if(type === "js") resp.header("Content-Type","text/javascript")
            else if(type === "css") resp.header("Content-Type","text/css")

            return resp
        },
        options: {
            cache: {
                expiresIn: 3600 * 1000
            }
        }
    },{
        method:'GET',
        path:"/public/{any*}",
        handler: (req,h) => {
            return h.file("public/"+req.params.any)
        }
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

exports.default = initHapi