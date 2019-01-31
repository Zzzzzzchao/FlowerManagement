import axios from '@/libs/api.request'

/*
  公用接口
*/

export const uploadReq = data => {
  return axios.request({
    url: 'file/upload',
    data,
    method: 'post'
  })
}

export const loginReq = data => {
  return axios.request({
    url: '/login/doLogin',
    data: data,
    method: 'post',
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }]
  })
}
