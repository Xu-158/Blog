module.exports = app => {
  const baseConfig = app.get('baseConfig')
  const uploadConfig = {
    filePath: baseConfig.mode == "dev"
      ? "http://localhost:3000/admin/uploads"
      : "http://localhost:3000/admin/uploads",
    mimetype: {
      "image/png": "images",
      "image/jpeg": "images",
      "audio/mp3": "mp3"
    }
  }
  app.set("uploadConfig", uploadConfig)
}