const Server = require("./server.js").default
const webpack = require("webpack")
const webpackConfig = require("./webpack.config.js")

const server =  Server(8080,true)

webpack(webpackConfig,(err,stats)=> {
    server.sendMessageToWS("refresh")
})



server.start()

