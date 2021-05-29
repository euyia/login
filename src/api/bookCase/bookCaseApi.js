import request from '@/utils/request'

const bookCaseApi = {}

/**
 * 获取用户信息
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.getUserinfoImage = (params) => {
  return request({
    url: `/api/BookCase/GetUserinfoImage`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.post = (body) => {
  return request({
    url: `/api/app/bookCase`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.getList = (params) => {
  return request({
    url: `/api/app/bookCase`,
    method: 'get',
    params
  })
}
///api/BookCase/GetBookCaseList
bookCaseApi.GetBookCaseList = (params) => {
  return request({
    url: `/api/BookCase/GetListNameAsync`,
    method: 'get',
    params
  })
}
/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.delete = (id) => {
  return request({
    url: `/api/app/bookCase/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.get = (id) => {
  return request({
    url: `/api/app/bookCase/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.put = (id, body) => {
  return request({
    url: `/api/app/bookCase/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.postPubSignaling = (deviceId, params) => {
  return request({
    url: `/api/app/bookCase/pubSignaling/${deviceId}`,
    method: 'post',
    params
  })
}

/**
 * 获取用户信息(包括人脸信息)
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
bookCaseApi.getUsers = (params) => {
  return request({
    url: `/api/app/bookCase/users`,
    method: 'get',
    params
  })

  ///api/app/bookCase/deviceStatusRecord/{deviceId}
  ///api/app/bookCase/powerLog
}
bookCaseApi.deviceStatusRecord = (deviceId, params) => {
  return request({
    url: `/api/app/bookCase/deviceStatusRecord/${deviceId}`,
    method: 'get',
    params
  })
}
bookCaseApi.powerLog = (deviceId,params) => {
  return request({
    url: `/api/app/bookCase/powerLog/${deviceId}`,
    method: 'get',
    params
  })
}

export default bookCaseApi
