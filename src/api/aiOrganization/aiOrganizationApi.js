import request from '@/utils/request'

const aiOrganizationApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.post = (body) => {
  return request({
    url: `/api/AiIdentity/organizations`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getList = (params) => {
  return request({
    url: `/api/AiIdentity/organizations`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.delete = (id) => {
  return request({
    url: `/api/AiIdentity/organizations/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.get = (id) => {
  return request({
    url: `/api/AiIdentity/organizations/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.put = (id, body) => {
  return request({
    url: `/api/AiIdentity/organizations/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getAll = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/all`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.putMove = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/move`,
    method: 'put',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getDetails = (id) => {
  return request({
    url: `/api/AiIdentity/organizations/${id}/details`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getDetails = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/details`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getAllDetails = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/all/details`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getChildren = (parentId) => {
  return request({
    url: `/api/AiIdentity/organizations/children/${parentId}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getRoot = () => {
  return request({
    url: `/api/AiIdentity/organizations/root`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getNextCode = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/next-code`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getUsers = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/users`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-26 21:57:18
 * @version V1.0.0
 */
aiOrganizationApi.getRoles = (params) => {
  return request({
    url: `/api/AiIdentity/organizations/roles`,
    method: 'get',
    params
  })
}

export default aiOrganizationApi
