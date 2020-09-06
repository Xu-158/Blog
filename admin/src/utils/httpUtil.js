import axios from 'axios'
import { Message } from 'element-ui'

const httpUtil = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

httpUtil.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') || ''
    return config
  }, err => {
    return Promise.reject(err)
  })

httpUtil.interceptors.response.use(
  response => {
    const res = response.data
    if (response.config.method != 'get') {
      if (res.status == 0) {
        Message.success(`${res.msg}`);
      } else {
        Message.error(`${res.msg}`);
      }
    }
    return res
  },
  err => {
    console.log(err);
    Message.error(err.response.data)
    return Promise.reject(err)
  }
)

export default httpUtil