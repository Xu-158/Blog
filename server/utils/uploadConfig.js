module.exports = app => {
  const baseConfig = app.get('baseConfig')
  const uploadConfig = {
    filePath: baseConfig.mode == "dev"
      ? "http://localhost:3000/admin/uploads"
      : "http://47.107.105.76/api/admin/uploads",
    mimetype: {
      "image/png": "images",
      "image/jpeg": "images",
      "image/gif": "images",
      "audio/mp3": "mp3"
    }
  }
  app.set("uploadConfig", uploadConfig)
}