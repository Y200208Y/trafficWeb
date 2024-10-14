const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://43.143.167.120:9090/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      },
    },
  },
})
