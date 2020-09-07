import httpUtil from '@/utils/httpUtil'

// 添加管理员
export function addAdmin(data) {
  return httpUtil({
    url: '/admin/edit',
    method: 'post',
    data
  })
}

// 删除管理员
export function deleteAdmin(params) {
  return httpUtil({
    url: '/admin/delete',
    method: 'delete',
    params
  })
}

// 更新管理员
export function updateAdmin(data) {
  return httpUtil({
    url: '/admin/update',
    method: 'put',
    data
  })
}

// 获取管理员列表
export function getAdminList(params) {
  return httpUtil({
    url: '/admin/list',
    method: 'get',
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