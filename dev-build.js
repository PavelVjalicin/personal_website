const hapi = require("./server.js").default
const webpack = require("webpack")
const webpackConfig = require("./webpack.config.js")

const server = hapi(8080)

webpack(webpackConfig,(err,stats)=> {

})


