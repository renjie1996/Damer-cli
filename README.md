# vue-components

### 简介

* 使用vue开发的，样式基于bootstrap的

* 参考了支付宝的[http://ant.design/](http://ant.design/)

* 以及okoala的[http://okoala.github.io/vue-antd/#!/docs/introduce](http://okoala.github.io/vue-antd/#!/docs/introduce)

### 目录结构
暂无

### 命令行

代码压缩

> webpack -p

监听代码变化

> webpack -w

启动服务器，默认的访问地址是http://127.0.0.1:8080

> webpack-dev-server

修改端口号，访问地址是http://127.0.0.1:3030

> webpack-dev-server --port 3030

运行另一个配置文件

> webpack --config **.js

代码高亮

> https://highlightjs.org/

html代码转义

> http://www.danstools.com/html-escape-unescape/

### 开发部署

##### 安装依赖
* 配置好 Node.js 和 npm 环境，其中 npm 需要 3.0 或以上版本，node版本需要4.0以上
* 安装全局webpack: npm install -g webpack和webpack-dev-server: npm install -g webpack-dev-server
* 如果网络不是很理想，可以用国内镜像下载, 镜像配置：npm install -g cnpm --registry=https://registry.npm.taobao.org

##### 开发调试
```shell
// 如果是第一次使用，先运行init，以后直接运行dev
// 代替npm install
npm run init
// 代替webpack-dev-server
npm run dev
```

### 生产部署(生成dist)
```shell
// 代替webpack --config webpack.build.js -p
npm run build
```