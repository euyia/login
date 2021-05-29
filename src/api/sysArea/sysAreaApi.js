import request from '@/utils/request'

const sysAreaApi = {}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-05 21:02:19
 * @version V1.0.0
 */
sysAreaApi.getTree = () => {
  return request({
    url: `/api/app/sysArea/tree`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-05 21:02:19
 * @version V1.0.0
 */
sysAreaApi.post = (body) => {
  return request({
    url: `/api/app/sysArea`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-05 21:02:19
 * @version V1.0.0
 */
sysAreaApi.getList = (params) => {
  return request({
    url: `/api/app/sysArea`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-05 21:02:19
 * @version V1.0.0
 */
sysAreaApi.put = (id, body) => {
  return request({
    url: `/api/app/sysArea/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-05 21:02:19
 * @version V1.0.0
 */
sysAreaApi.delete = (id) => {
  return request({
    url: `/api/app/sysArea/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-05 21:02:19
 * @version V1.0.0
 */
sysAreaApi.get = (id) => {
  return request({
    url: `/api/app/sysArea/${id}`,
    method: 'get'
  })
}

export default sysAreaApi
