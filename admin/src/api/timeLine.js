import httpUtil from '@/utils/httpUtil'

// 时间线API
export function addTimeLine(data) {
  return httpUtil({
    url: '/timeLine/edit',
    method: 'post',
    data
  })
}

export function updateTimeLine(data) {
  return httpUtil({
    url: '/timeLine/update',
    method: 'put',
    data
  })
}

export function deleteTimeLine(params) {
  return httpUtil({
    url: '/timeLine/delete',
    method: 'delete',
    params
  })
}


export function getTimeLineList(params) {
  return httpUtil({
    url: '/timeLine/list',
    method: 'get',
    params
  })
}