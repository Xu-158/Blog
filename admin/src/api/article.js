import httpUtil from '@/utils/httpUtil'

export function addTag(data) {
  return httpUtil({
    url: '/tag/edit',
    method: 'post',
    data
  })
}

export function updateTag(data) {
  return httpUtil({
    url: '/tag/update',
    method: 'put',
    data
  })
}

export function deleteTag(params) {
  return httpUtil({
    url: '/tag/delete',
    method: 'delete',
    params
  })
}


export function getTagList(params) {
  return httpUtil({
    url: '/tag/list',
    method: 'get',
    params
  })
}