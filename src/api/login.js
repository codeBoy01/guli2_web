import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/eduservice/user/login/'+username+'/'+password,
    method: 'post',
  })
}

export function getInfo(token) {
  return request({
    url: '/eduservice/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/eduservice/user/logout',
    method: 'post'
  })
}
