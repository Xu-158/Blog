import httpUtil from '@/utils/httpUtil'

export function auth() {
  return httpUtil({
    url: '/auth',
    method: 'get',
  })
}

export function login(data) {
  return httpUtil({
    url: '/login',
    method: 'post',
    data
  })
}

export function tourisLogin(data) {
  return httpUtil({
    url: '/touris/login',
    method: 'post',
    data
  })
}