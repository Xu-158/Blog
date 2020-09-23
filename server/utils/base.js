module.exports = app => {
  const baseConfig = {
    // mode:"production",
    mode: "dev",
    host: "3000",
  }
  app.set("baseConfig", baseConfig)
}