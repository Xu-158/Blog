import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'

const httpUtil = axios.create({
  baseUrl: '',
  timeout: 5000
})

httpUtil.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + localStorage.setItem('token') || ''
    return config
  }, err => {
    return Promise.reject(err)
  })

httpUtil.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  err => {
    Message.err(err.response.data)
    return Promise.reject(err)
  }
)

export default httpUtil