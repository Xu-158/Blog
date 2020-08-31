const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{type:String,default:''},
  url:{type:String,default:''},
  icon:{type:String,default:''}
})

module.exports = mongoose.model('Navigation',schema)