import request from '@/utils/request'

const classApi = {}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-11 14:02:48
 * @version V1.0.0
 */
classApi.post = (body) => {
  return request({
    url: `/api/app/class`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-11 14:02:48
 * @version V1.0.0
 */
classApi.getList = (params) => {
  return request({
    url: `/api/app/class`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-11 14:02:48
 * @version V1.0.0
 */
classApi.put = (id, body) => {
  return request({
    url: `/api/app/class/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-11 14:02:48
 * @version V1.0.0
 */
classApi.delete = (id) => {
  return request({
    url: `/api/app/class/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-11 14:02:48
 * @version V1.0.0
 */
classApi.get = (id) => {
  return request({
    url: `/api/app/class/${id}`,
    method: 'get'
  })
}

export default classApi
