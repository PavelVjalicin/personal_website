const Server = require("./server.js").default

var server =  Server(8080,false)

server.start()