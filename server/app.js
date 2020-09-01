const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(require('cors')())

// 设置静态文件托管
// 当用户访问的URL以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/uploads', express.static(path.join(__dirname, 'public')));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// app.use(express.urlencoded({ extended: false }));

app.use('/admin', require('./routes/admin/router'));
app.use('/web', require('./routes/web/router'));
require('./models/db')(app)

app.listen(3000, () => {
  console.log('RUN AT http://127.0.0.1:3000')
})

