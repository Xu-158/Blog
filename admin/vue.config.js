module.exports = {
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV == 'production' ? '/admin/' : '/',
  // 向所有 Sass 样式传入共享的全局变量
  // css: {
  //   // 给 sass-loader 传递选项
  //   loaderOptions: {
  //     sass: {
  //       // @/ 是 src/ 的别名
  //       // 所以这里假设你有 `src/variables.scss` 这个文件
  //       data: `@import "@/assets/style/style.scss";`
  //     }
  //   }
  // }
}