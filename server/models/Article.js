const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, default: '' },
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  thumbnail: { type: String, default: '' },
  isTop: { type: Boolean, default: false },
  isShow: { type: Boolean, default: false },
  contentMd: { type: String, default: '' },
  contentHtml: { type: String, default: '' },
  directory: { type: String, default: '' },
  hitCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)