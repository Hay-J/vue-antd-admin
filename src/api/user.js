import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/vue-antd-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo (token) {
  return request({
    url: '/vue-antd-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout () {
  return request({
    url: '/vue-antd-admin/user/logout',
    method: 'post'
  })
}

// 获取快捷方式
export function getShortcut (token) {
  return request({
    url: '/vue-antd-admin/user/shortcut',
    method: 'post',
    params: { token }
  })
}
