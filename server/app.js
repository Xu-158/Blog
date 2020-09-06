const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(require('cors')())
app.set('secret', 'xxuujjjfff158')

// app.use(express.urlencoded({ extended: false }));

app.use('/admin', require('./routes/admin/router'));
app.use('/web', require('./routes/web/router'));
require('./models/db')(app)
require('./utils/base')(app)
require('./utils/uploadConfig')(app)


const baseConfig = app.get('baseConfig')
app.listen(baseConfig.host, () => {
  console.log('RUN AT http://127.0.0.1:' + baseConfig.host)
})

