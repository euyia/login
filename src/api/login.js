import request from '@/utils/request'
const qs = require('qs')
const idpBase = process.env.VUE_APP_IDP_BASE

const loginApi = {}

loginApi.login = (data) => {
  return request({
    url: idpBase + '/connect/token',
    data: qs.stringify(data),
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

loginApi.logout = (data) => {
  return request({
    url: idpBase + '/connect/token',
    data: qs.stringify(data),
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'basic YXBwOmU5QzZsZ05PbFRWSXFkNWJy'
    }
  })
}

loginApi.getInfo = () => {
  return request({
    url: idpBase + '/connect/userinfo',
    method: 'get'
  })
}

export default loginApi
