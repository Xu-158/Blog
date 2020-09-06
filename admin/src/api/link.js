import httpUtil from '@/utils/httpUtil'

// 友情链接API
export function addLink(data) {
  return httpUtil({
    url: '/link/edit',
    method: 'post',
    data
  })
}

export function updateLink(data) {
  return httpUtil({
    url: '/link/update',
    method: 'put',
    data
  })
}

export function deleteLink(params) {
  return httpUtil({
    url: '/link/delete',
    method: 'delete',
    params
  })
}


export function getLinkList(params) {
  return httpUtil({
    url: '/link/list',
    method: 'get',
    params
  })
}