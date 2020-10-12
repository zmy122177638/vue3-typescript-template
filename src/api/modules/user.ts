import { commonRequest } from '../request'

export function getUserInfo() {
  return commonRequest({
    method: 'get',
    url: '/users/info',
  })
}
