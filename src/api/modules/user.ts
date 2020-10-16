import { commonRequest } from '../request'

export function login(data: { account: string; password: string }) {
  return commonRequest({
    method: 'post',
    url: '/user/login',
    data,
  })
}

export function logOut() {
  return commonRequest({
    method: 'post',
    url: '/user/logOut',
  })
}

export function getUserInfo() {
  return commonRequest({
    method: 'get',
    url: '/user/info',
  })
}

export function getUserList() {
  return commonRequest({
    method: 'get',
    url: '/user/list',
  })
}
