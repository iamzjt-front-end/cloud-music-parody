const path = require('path') // 引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            // set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
            .set('plugins', resolve('src/plugins'))
    },
    devServer: {
        proxy: {
            '/api': {
                // target: 'https://api.lk-lmusic.top', // 接口域名
                target: 'http://localhost:3000', // 接口域名
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/cloud-music-parody/'
        : '/'
}