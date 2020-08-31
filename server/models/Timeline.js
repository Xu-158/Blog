const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  time: { type: String, default: '' }
})

module.exports = mongoose.model('TimeLine', schema)