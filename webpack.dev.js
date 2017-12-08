/* ==========================================================
 * webpack.dev.js v20170911
 * ==========================================================
 * by Damer
 *
 * 适用于开发环境(前端自己模拟，还没有与后端联调)
 * 使用webpack-dev-server，开启热更新
 * ========================================================== */
var path = require("path");
var url = require('url');
var webpack = require("webpack");
var Merge = require("webpack-merge");
var CommonConfig = require("./webpack.common.js");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var env = require('./src/config/env/dev');

module.exports = (options = {}) => {
    return Merge(CommonConfig, {
        // 入口
        entry: {
            "vendor": ["moment"], // 公共库
            "app": "./src/app.js"
        },
        output: {
            publicPath: env.publicPath, // 设定以http请求的方式请求静态资源的路径,即为为对服务器、cdn等静态资源的请求路径
            path: path.join(__dirname, env.filePath),
            filename: "[name].js", // 去除缓存
            chunkFilename: "[name].js" // 动态加载路由文件命名
        },
        plugins: [
            new ExtractTextPlugin("css/index.css"),
            new webpack.optimize.CommonsChunkPlugin({ // 提取第三方库
                name: "vendor", // 指定公共 bundle 的名字
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            }),
            new HtmlWebpackPlugin({ // 构建html文件
                template: "./template/index.html", // 模板文件路径
                inject: true,
                chunksSortMode: function(a, b) {
                    var chunksort = ["manifest", "vendor", "app"];
                    var aIndex = chunksort.indexOf(a.names[0]);
                    var bIndex = chunksort.indexOf(b.names[0]);
                    aIndex = aIndex < 0 ? chunksort.length + 1 : aIndex;
                    bIndex = bIndex < 0 ? chunksort.length + 1 : bIndex;
                    return aIndex - bIndex;
                }
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": JSON.stringify("dev")
                }
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            compress: true,
            port: env.port,
            hot: true,
            proxy: {
                '/': {
                    target: 'http://jarvis.dev.com',
                    changeOrigin: true
                }
            }
        },
        devtool: "cheap-module-eval-source-map"
    })
}