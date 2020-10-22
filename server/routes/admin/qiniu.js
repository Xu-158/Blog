const response = require("../../utils/response");
const qiniu = require('qiniu');
const qiniuConfig = require('../../utils/qiniuConfig')
//              *** qiniuConfig.js 👇 ***
//  module.exports = {ACCESS_KE:'ryLFircFrd4********3cuAjbyrnpPqIoA8P',
//   SECRET_KEY:'OAr01Z*********bF_kFi1kwg4DmV_K3',
//   bucket:'xjfblog'
// }

//七牛云 
const mac = new qiniu.auth.digest.Mac(
  qiniuConfig.ACCESS_KE,
  qiniuConfig.SECRET_KEY
);
const cdnManager = new qiniu.cdn.CdnManager(mac);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
const bucketManager = new qiniu.rs.BucketManager(mac, config);

module.exports = {
  //七牛云文件上传(给前端token)
  async qiniuUploadToken(req, res) {

    let key = req.body.key || "";

    const options = {
      scope: `${qiniuConfig.bucket}`,
      saveKey: key,
      expires: 3600 * 24,
      returnBody: `{
            "key":"$(key)",
            "hash":"$(etag)",
            "fsize":$(fsize),
            "bucket":"$(bucket)",
            "msg":"上传成功",
            "status":0,
            "url":"http://img.xujinfeng.top/$(key)"
          }`
    };

    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = await putPolicy.uploadToken(mac);

    response(res, 0, '七牛云token', uploadToken);
  },

  //获取七牛云存储桶下文件列表
  qiniuSource(req, res) {
    let prefix = req.query.prefix || '';
    let limit = req.query.limit || 2;
    let nextMarker = req.query.marker || '';
    if (prefix === "all") prefix = '';

    let options = {
      limit: limit,
      prefix: prefix,
      marker: nextMarker
    };

    bucketManager.listPrefix(`${qiniuConfig.bucket}`, options, function (err, respBody, respInfo) {
      if (!err) {
        response(res, 0, '七牛云存储桶列表', respBody);
      } else {
        response(err, 1, '获取错误')
      }
    })
  },

  //删除空间中的文件
  qiniuDelete(req, res) {
    const key = req.query.key
    bucketManager.delete(`${qiniuConfig.bucket}`, key, function (err, respBody, respInfo) {
      if (err) {
        response(res, 1, '删除失败', err)
      } else {
        if (respInfo.statusCode) {
          response(res, 0, '删除成功')
        }
      }
    });
  }
}