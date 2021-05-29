import request from '@/utils/request'

const schoolApi = {}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-08 14:08:57
 * @version V1.0.0
 */
schoolApi.post = (body) => {
  return request({
    url: `/api/app/school`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-08 14:08:57
 * @version V1.0.0
 */
schoolApi.getList = (params) => {
  return request({
    url: `/api/app/school`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-08 14:08:57
 * @version V1.0.0
 */
schoolApi.put = (id, body) => {
  return request({
    url: `/api/app/school/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-08 14:08:57
 * @version V1.0.0
 */
schoolApi.delete = (id) => {
  return request({
    url: `/api/app/school/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-08 14:08:57
 * @version V1.0.0
 */
schoolApi.get = (id) => {
  return request({
    url: `/api/app/school/${id}`,
    method: 'get'
  })
}

export default schoolApi
