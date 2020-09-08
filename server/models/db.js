module.exports = app =>{
  const mongoose = require('mongoose')

  mongoose.connect('mongodb://127.0.0.1:27017/MyBlog',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
  })

  require('require-all')(__dirname + '/../models')
}