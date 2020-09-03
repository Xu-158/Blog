module.exports = app => {
  const baseConfig = app.get('baseConfig')
  const uploadConfig = {
    filePath: baseConfig.mode == "dev" ? "http://localhost:3000/admin/uploads" : "http://localhost:3000/admin/uploads",
  }
  app.set("uploadConfig", uploadConfig)
}