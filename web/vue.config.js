module.exports = {
  outputDir: __dirname + "/../server/web", //执行 npm run build 命令将文件输出到 server/web
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
