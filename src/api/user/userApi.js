import request from '@/utils/request'

const userApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.get = (id) => {
  return request({
    url: `/api/identity/users/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.put = (id, body) => {
  return request({
    url: `/api/identity/users/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.delete = (id) => {
  return request({
    url: `/api/identity/users/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.getList = (params) => {
  return request({
    url: `/api/identity/users`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.post = (body) => {
  return request({
    url: `/api/identity/users`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.getRoles = (id) => {
  return request({
    url: `/api/identity/users/${id}/roles`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.putRoles = (id, body) => {
  return request({
    url: `/api/identity/users/${id}/roles`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.getAssignableRoles = () => {
  return request({
    url: `/api/identity/users/assignable-roles`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.getByUsername = (userName) => {
  return request({
    url: `/api/identity/users/by-username/${userName}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 22:38:15
 * @version V1.0.0
 */
userApi.getByEmail = (email) => {
  return request({
    url: `/api/identity/users/by-email/${email}`,
    method: 'get'
  })
}

export default userApi
