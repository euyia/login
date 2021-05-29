import request from '@/utils/request'

const bookTypeApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-08-09 16:06:06
 * @version V1.0.0
 */
bookTypeApi.post = (body) => {
  return request({
    url: `/api/app/bookType`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-08-09 16:06:06
 * @version V1.0.0
 */
bookTypeApi.getList = (params) => {
  return request({
    url: `/api/app/bookType`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-08-09 16:06:06
 * @version V1.0.0
 */
bookTypeApi.delete = (id) => {
  return request({
    url: `/api/app/bookType/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-08-09 16:06:06
 * @version V1.0.0
 */
bookTypeApi.get = (id) => {
  return request({
    url: `/api/app/bookType/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-08-09 16:06:06
 * @version V1.0.0
 */
bookTypeApi.put = (id, body) => {
  return request({
    url: `/api/app/bookType/${id}`,
    method: 'put',
    data: body
  })
}

export default bookTypeApi
