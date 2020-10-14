import httpUtil from "@/utils/httpUtil";

// 获取七牛云token
export function qiniuUploadToken() {
  return httpUtil({
    url: '/qiniuUploadToken',
    method: 'post'
  })
}

// 上传到七牛云
export function uploads(data) {
  return httpUtil({
    url: '/uploads',
    method: 'post',
    data
  })
}

//获取七牛云资源
export function getQiniuSource() {
  return httpUtil({
    url: '/getQiniuSource',
    method: 'get',
  })
}