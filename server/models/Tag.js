const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, default: '' },
  count: { type: Number, default: 0 }
})

module.exports = mongoose.model('Tag', schema)