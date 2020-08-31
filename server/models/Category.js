const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String,default:''},
})

module.exports = mongoose.model('Category',schema)