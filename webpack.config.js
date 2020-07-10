const path = require("path")

const isDevelopment = process.env.NODE_ENV === 'development'
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let plugins;

if(isDevelopment) {
    plugins = []
} else {
    plugins = [new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
        chunkFilename: 'css/[name].[contenthash].css',

    }),
        new CompressionPlugin({
            test: /\.js$|\.css$/,
            threshold:1,
            minRatio:1
        }),new HtmlWebpackPlugin({
            template: 'src/index.html'
        })/*,new BundleAnalyzerPlugin()*/]
}

module.exports = {
    watch: isDevelopment,
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
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.module\.s(a|c)ss$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isDevelopment
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                ]

            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx",".css"]
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
