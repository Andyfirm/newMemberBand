import request from '@/utils/request'
// import Qs from 'qs'
export function publicUrl (params) {
  return request({
    method: 'get',
    params
  })
}
