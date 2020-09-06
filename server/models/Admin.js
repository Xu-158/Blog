const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  role: { type: mongoose.SchemaTypes.ObjectId, ref: 'Role' },
  name: { type: String, default: '' },
  account: { type: String, default: '' },
  password: {
    type: String, select: false, set(val) {
      return require('bcryptjs').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('Admin', schema)