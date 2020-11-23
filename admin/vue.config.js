const path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  lintOnSave: false,//是否开启eslint保存检测，有效值：ture | false | 'error'
  outputDir: __dirname + "/../server/admin",// 构建输出目录
  publicPath: isProduction ? "/admin/" : "/",
  productionSourceMap: false,//打包后不会生成.map文件（运行时报错，输出的错误信息无法准确得知是哪里的代码报错）false将提高构建速度
  devServer: {
    open: true //配置自动启动浏览器
    //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.1.30:8085", //代理地址，这里设置的地址会代替axios中设置的baseURL
    //     changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //     //ws: true, // proxy websockets
    //     //pathRewrite方法重写url
    //     pathRewrite: {
    //       "^/api": "/"
    //       //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
    //       //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
    //     }
    //   }
    // }
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: ['@kangc/v-md-editor'],
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@a": path.resolve(__dirname, "./src/assets")
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
        minChunkSize: 100
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled'//关闭分析
      }),
    ],
    // 用cdn方式引入
    externals: {
      "vue": "Vue",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT"
    }
  }
};
