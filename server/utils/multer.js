const multer = require('multer')
const path = require('path')

function handleMulter() {
  let upload = multer({
    storage: multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '../uploads/images'))
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
      }
    })
  })

  return upload
}

module.exports = handleMulter