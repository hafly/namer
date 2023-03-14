const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = defineConfig({
  transpileDependencies: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: config => {
    const plugins = [
      process.env.ANALYZE && new BundleAnalyzerPlugin()
    ].filter(Boolean)
    config.plugins = [...config.plugins, ...plugins]
  },
  publicPath: "/namer"
})
