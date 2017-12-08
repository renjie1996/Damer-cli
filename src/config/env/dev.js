module.exports = {
  port: '3333',
  publicPath: '', // 设定以http请求的方式请求静态资源的路径,即为为对服务器、cdn等静态资源的请求路径
  filePath: '/build/', // 编译文件存放处
  // filename: '../../../resources/views/index.blade.php', // 输出的文件路径
  // template: '../../resources/views/index.blade-tmp.php', // 模板文件路径
  filename: './index.html',// 输出的文件路径
  template: "./template/index.html", // 模板文件路径
}
