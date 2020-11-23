const path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  lintOnSave: false,//是否开启eslint保存检测，有效值：ture | false | 'error'
  outputDir: __dirname + "/../server/web", //执行 npm run build 命令将文件输出到 server/web
  publicPath: isProduction ? "/" : "/",
  productionSourceMap: false,//打包后不会生成.map文件（运行时报错，输出的错误信息无法准确得知是哪里的代码报错）false将提高构建速度
  devServer: {
    open: true, //配置自动启动浏览器
    //如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
    proxy: {
      "/dev": {
        target: "https://www.runoob.com/try", //需要代理的地址，（这里设置的地址会代替axios中设置的baseURL)
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          //重写路径
          "^/dev": "/"
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      }
    }
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '破旧笔记 - 分享前端学习记录',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: ['@kangc'],
  css: {
    extract: false,
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/style/_variables.scss";` //引入 SCSS 全局变量
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@a": path.resolve(__dirname, "./src/assets"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@u": path.resolve(__dirname, "./src/utils"),
        "@api": path.resolve(__dirname, "./src/api/api")
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
        analyzerMode: 'disabled',//关闭分析
        openAnalyzer: true,
      }),
    ],
    // 用cdn方式引入
    externals: {
      "highlight.js": "hljs",
      "vue": "Vue",
      "vue-router": "VueRouter",
      "axios": "axios"
    }
  }
};
