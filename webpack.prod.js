/* ==========================================================
 * webpack.prod.js v20171208
 * ==========================================================
 * by Damer
 *
 * 适用于生产环境(项目上线)
 * 使用webpack进行编译打包
 * ========================================================== */
var path = require("path");
var url = require('url');
var webpack = require("webpack");
var Merge = require("webpack-merge");
var CommonConfig = require("./webpack.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var fs = require('fs-extra')

var env = require('./src/config/env/prod');

module.exports = (options = {}) => {
    return Merge(CommonConfig, {
        entry: {
            "vendor": ["moment"], // 公共库
            "common": ["./src/config/paramConfig.js"], //公共业务
            "app": "./src/app.js"
        },
        output: {
            publicPath: env.publicPath, // 设定以http请求的方式请求静态资源的路径,即为为对服务器、cdn等静态资源的请求路径
            path: path.join(__dirname, env.fileStoragePath),
            filename: "[name].[chunkhash].js", // 去除缓存
            chunkFilename: "[name].[chunkhash].js" // 动态加载路由文件命名
        },
        plugins: [
            new ExtractTextPlugin("css/index.[contenthash:8].css"),
            new webpack.optimize.CommonsChunkPlugin({ // 提取第三方库
                name: ["vendor", "common"], // 指定公共 bundle 的名字。
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor', "common"]
            }),
            new webpack.ProgressPlugin(function handler(percentage, msg) {
                if (percentage == 0) {
                    console.log('开始编译')
                        // fs.removeSync(path.join(__dirname , env.fileStoragePath))
                }
                if (percentage == 1) {
                    console.log('结束编译')
                    fs.removeSync(path.join(__dirname, env.filePath)) //filePath
                    fs.ensureDirSync(path.join(__dirname, env.filePath)) //filePath
                    fs.copySync(path.join(__dirname, env.fileStoragePath), path.join(__dirname, env.filePath)) //fileStoragePath  filePath
                    fs.removeSync(path.join(__dirname, env.fileStoragePath)) //fileStoragePath
                }
            }),
            new HtmlWebpackPlugin({ // 构建html文件
                filename: env.filename,
                template: env.template,
                inject: true,
                minify: {
                    removeComments: true, // 移除HTML中的注释
                    collapseWhitespace: true, // 删除空白符与换行符
                    removeAttributeQuotes: true
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: true
            })
        ],
        devtool: "source-map"
    })
}