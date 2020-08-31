const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  hitCount: { type: Number, default: 0 },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  thumbnail: { type: String, default: '' },
  likeCount: { type: Number, default: 0 },
  comments: [{}],
  keyWord: { type: String, default: [''] }
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)