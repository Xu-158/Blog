const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, default: '' },
  content: { type: String, default: '' },
  hitCount: { type: Number, default: 0 },
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  thumbnail: { type: String, default: '' },
  likeCount: { type: Number, default: 0 },
  comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }]
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', schema)