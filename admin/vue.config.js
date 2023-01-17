/**
 * outputDir: 指定打包目录
 * publicPath: 判断环境 切换访问域名
 */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'prod' ? '/admin' : '/',
  devServer: {
    proxy: {
      '/uploads': {
        target: 'http://server:3000',
        ws: true,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('@/components', resolve('../components'))
  }
}
