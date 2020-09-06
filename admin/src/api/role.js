import httpUtil from '@/utils/httpUtil'

// 添加角色
export function addRole(data) {
  return httpUtil({
    url: '/role/add',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(params) {
  return httpUtil({
    url: '/role/delete',
    method: 'delete',
    params
  })
}

// 获取角色列表
export function getRoleList(params) {
  return httpUtil({
    url: '/role/list',
    method: 'get',
    params
  })
}