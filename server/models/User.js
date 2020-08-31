const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  role: { type: mongoose.SchemaTypes.ObjectId, ref: 'Role' },
  userName: { type: String, default: '' },
  password: { type: String, default: '' }
})

module.exports = mongoose.model('User', schema)