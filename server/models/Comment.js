const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String, default: '' },
  avatar: { type: String, default: '' },
  content: { type: String, default: '' },
  isTop: { type: Boolean, default: false },
  state: { type: Number, default: 0 },
  reply: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }]
})

module.exports = mongoose.model('Comment', schema)