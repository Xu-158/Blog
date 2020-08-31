/**
 * 
 * @param {res} res 
 * @param {状态码|0：成功 & 1：失败} status 
 * @param {响应信息} msg 
 * @param {返回的查询的obj} data 
 * @param {token} token 
 */
function response(res, status, msg, data = {}, token) {
  if (token) {
    res.json({ status, msg, token, data })
  } else {
    res.json({ status, msg, data })
  }
}

module.exports = response