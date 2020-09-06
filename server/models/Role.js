const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  type: { type: String, default: '' },
})

module.exports = mongoose.model('Role', schema)