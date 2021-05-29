import request from '@/utils/request'

const aiRoleApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 15:41:23
 * @version V1.0.0
 */
aiRoleApi.postAddToOrganization = (roleId, ouId) => {
  return request({
    url: `/api/AiIdentity/roles/${roleId}/add-to-organization/${ouId}`,
    method: 'post'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 15:41:23
 * @version V1.0.0
 */
aiRoleApi.postCreateToOrganization = (body) => {
  return request({
    url: `/api/AiIdentity/roles/RoleOrgCreate`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 15:41:23
 * @version V1.0.0
 */
aiRoleApi.getList = (params) => {
  return request({
    url: `/api/AiIdentity/roles/GetList`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 15:41:23
 * @version V1.0.0
 */
aiRoleApi.putUpdate = (params, body) => {
  return request({
    url: `/api/AiIdentity/roles/Update`,
    method: 'put',
    params,
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 15:41:23
 * @version V1.0.0
 */
aiRoleApi.getAll = () => {
  return request({
    url: `/api/AiIdentity/roles/GetAll`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 15:41:23
 * @version V1.0.0
 */
aiRoleApi.delete = (params) => {
  return request({
    url: `/api/AiIdentity/roles/Delete`,
    method: 'delete',
    params
  })
}

export default aiRoleApi
