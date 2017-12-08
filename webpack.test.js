/* ==========================================================
 * webpack.test.js v20171208
 * ==========================================================
 * by Damer
 *
 * 适用于测试环境(与后端联调时用)
 * 使用webpack进行编译打包，添加监听watch：true
 * ========================================================== */
var path = require("path");
var url = require('url');
var webpack = require("webpack");
var Merge = require("webpack-merge");
var CommonConfig = require("./webpack.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var env = require('./src/config/env/test');


module.exports = (options = {}) => {
    return Merge(CommonConfig, {
        // 入口
        entry: {
            "vendor": ["vuex", "qrcodejs2", "axios"], // 公共库
            "common": ["./src/config/paramConfig.js"], // 公共业务
            "app": "./src/app.js"
        },
        output: {
            publicPath: env.publicPath, // 设定以http请求的方式请求静态资源的路径,即为为对服务器、cdn等静态资源的请求路径
            path: path.join(__dirname, env.filePath),
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
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("test")
                }
            }),
            new HtmlWebpackPlugin({ // 构建html文件
                filename: env.filename, // 输出的文件路径
                template: env.template, // 模板文件路径
                inject: true
            })
        ],
        watch: true,
        devtool: "cheap-module-eval-source-map"
    })
}