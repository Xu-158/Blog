const express = require('express');
const app = express();

app.use(express.json());
app.use(require('cors')());
app.set('secret', 'xxuujjjfff158');

// 全局错误处理函数
const errorHandler = require('./utils/errorHandler')
app.use(errorHandler)

// 托管静态文件
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

app.use('/api/admin', require('./routes/admin/router'));
app.use('/api/web', require('./routes/web/router'));

require('./models/db')(app)
require('./utils/base')(app)
require('./utils/uploadConfig')(app)
require('./utils/oAuth_github')(app)

const baseConfig = app.get('baseConfig')
app.listen(baseConfig.host, () => {
  console.log('RUN AT http://localhost:' + baseConfig.host)
})