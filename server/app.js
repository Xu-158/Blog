const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(require('cors')())
app.set('secret', 'xxuujjjfff158')

app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/web'))

app.use('/admin', require('./routes/admin/router'));
app.use('/web', require('./routes/web/router'));
require('./models/db')(app)
require('./utils/base')(app)
require('./utils/uploadConfig')(app)
require('./utils/oAuth_github')(app)



// //七牛云 
// const qiniu = require('qiniu')
// const qiniuConfig = require('./utils/qiniuConfig')
// //鉴权对象
// const mac = new qiniu.auth.digest.Mac(
//   qiniuConfig.accessKey,
//   qiniuConfig.secretKey
// );
// const cdnManager = new qiniu.cdn.CdnManager(mac);
// const config = new qiniu.conf.Config();
// config.zone = qiniu.zone.Zone_z2;
// const bucketManager = new qiniu.rs.BucketManager(mac, config);

// //七牛云文件上传(给前端token)
// app.post("/admin/qiniu/upload", async (req, res) => {
//   let key = req.body.key || "";
//   const options = {
//     scope: `zhangxc-blog`,
//     saveKey: key,
//     expires: 7200,
//     insertOnly: 0,
//     returnBody: `{
//         "key":"$(key)",
//         "hash":"$(etag)",
//         "fsize":$(fsize),
//         "bucket":"$(bucket)",
//         "name":"$(x:name)",
//         "url":"https://cdn.zhangxc.cn/$(key)"
//       }`
//   };
//   let putPolicy = new qiniu.rs.PutPolicy(options);
//   let uploadToken = await putPolicy.uploadToken(mac);
//   res.end(
//     JSON.stringify({
//       uploadToken: uploadToken,
//       status: 200
//     })
//   );
// });


const baseConfig = app.get('baseConfig')
app.listen(baseConfig.host, () => {
  console.log('RUN AT http://localhost:' + baseConfig.host)
})

