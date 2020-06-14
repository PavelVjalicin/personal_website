const Express = require("express")
const path = require("path")

class Server {
    constructor(_port,isDev) {
        this.port = _port
        this.app = new Express()
        this.sockets = []
        this.isDev = isDev
        this.expressWS = require("express-ws")(this.app);
        const appOptions = {
            root: path.join(__dirname)
        }

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

        this.app.get("/",(req,res) => {
            res.sendFile("src/index.html",appOptions)
        })
        if(isDev) {
            this.app.ws("/", (ws,req) => {
                
            })
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
                socket.send("refresh")
            })
        }
    }
}

exports.default = (port) => new Server(port)