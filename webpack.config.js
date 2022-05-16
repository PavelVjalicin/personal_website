const path = require("path")

const isDevelopment = process.env.NODE_ENV === 'development'
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin')
let plugins;

if(isDevelopment) {
    plugins = []
} else {
    plugins = [
        new CompressionPlugin({
            test: /\.js$/,
            threshold:1,
            minRatio:1
        }),new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new LoadablePlugin()/*,new BundleAnalyzerPlugin()*/]
}

module.exports = {
    watch: false,
    mode: "development",
    entry: "./src/js/index.jsx",
    devtool: isDevelopment ? "inline-source-map" : "",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [path.resolve(__dirname, "node_modules")],
                use: {
                    loader: "babel-loader",
                }
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "js/[name].[contenthash].bundle.js",
        chunkFilename: 'js/[name].[contenthash].bundle.js',
        publicPath: 'dist/'
    },
    plugins: plugins,
    optimization: {
        minimizer: [new UglifyJsPlugin()],
        splitChunks: {
            chunks: 'all',
            automaticNameDelimiter: ".",
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    }
}
