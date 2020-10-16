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

/**
* 
* @Descripttion 获取七牛云资源  
* @param prefix 列举的文件前缀
* @param limit 每次返回的最大列举文件数量
*/
export function getQiniuSource(params) {
  return httpUtil({
    url: '/getQiniuSource',
    method: 'get',
    params
  })
}

export function qiniuDelete(params) {
  return httpUtil({
    url: '/qiniuDelete',
    method: 'delete',
    params
  })
}