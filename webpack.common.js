/* ==========================================================
 * webpack.common.js v20171208
 * ==========================================================
 * by Damer
 *
 * 基础配置
 * ========================================================== */
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    // 加载器
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.md$/,
                use: ['vue-markdown-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'sass-loader']
                })
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }
        ]
    },
    // 指定的依赖不会被webpack解析
    externals: {
        'Vue': 'Vue',
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'VueRouter': 'VueRouter',
        'echarts': 'echarts',
        'moment': 'moment'
    },
    // 其它解决方案配置(重定向)
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'],
        alias: {
            'axios': 'axios/dist/axios.min.js',
            'src': resolve('src'),
            'components': resolve('src/components'),
            'api': resolve('src/api'),
            'config': resolve('src/config'),
            'images': resolve('src/images'),
            'store': resolve('src/store'),
            'view': resolve('src/view'),
            'utils': resolve('src/utils')
        }
    }
};