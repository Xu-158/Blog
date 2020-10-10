const path = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  lintOnSave: false,
  outputDir: __dirname + "/../server/web", //执行 npm run build 命令将文件输出到 server/web
  publicPath: isProduction ? "/" : "/",
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
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  }
};
