const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://tibamef2e.com/cgd103/g1/api/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // '/map': {
      //   target: 'https://logistics-stage.ecpay.com.tw/Express/map',
      //   pathRewrite: {
      //     '^/map': ''
      //   }
      // }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/chd103/ingrid/cms/'
  : '/',
  outputDir: 'cms'
})
