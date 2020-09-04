const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String, default: '' },
  selectArticles: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Article' }]
})

module.exports = mongoose.model('Tag', schema)