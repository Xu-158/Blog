const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userName: { type: String, default: '' },
  password: { type: String, default: '' }
})

module.exports = mongoose.model('Role', schema)