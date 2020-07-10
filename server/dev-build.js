const hapi = require("./server.js").default
const webpack = require("webpack")
const webpackConfig = require("../webpack.config.js")



const server = hapi(false)

webpack(webpackConfig,(err,stats)=> {

})


