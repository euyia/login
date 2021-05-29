import request from '@/utils/request'

const aiUserApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 22:15:33
 * @version V1.0.0
 */
aiUserApi.postAddToOrganizations = (userId, body) => {
  return request({
    url: `/api/Identity/users/${userId}/add-to-organizations`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 22:15:33
 * @version V1.0.0
 */
aiUserApi.postCreateToOrganizations = (body) => {
  return request({
    url: `/api/Identity/users/create-to-organizations`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 22:15:33
 * @version V1.0.0
 */
aiUserApi.getOrganizations = (id, includeDetails = false) => {
  return request({
    url: `/api/Identity/users/${id}/organizations`,
    method: 'get',
    params: includeDetails
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 22:15:33
 * @version V1.0.0
 */
aiUserApi.deleteNs = (params) => {
  return request({
    url: `/remove-to-organizations`,
    method: 'delete',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 22:15:33
 * @version V1.0.0
 */
aiUserApi.putUpdateToOrganizations = (id, body) => {
  return request({
    url: `/api/Identity/users/${id}/update-to-organizations`,
    method: 'put',
    data: body
  })
}

export default aiUserApi
