import request from '@/utils/request'

const aiClaimTypeApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 02:05:20
 * @version V1.0.0
 */
aiClaimTypeApi.getList = (params) => {
  return request({
    url: `/api/AiIdentity/claim-types`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 02:05:20
 * @version V1.0.0
 */
aiClaimTypeApi.post = (body) => {
  return request({
    url: `/api/AiIdentity/claim-types`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 02:05:20
 * @version V1.0.0
 */
aiClaimTypeApi.getAll = () => {
  return request({
    url: `/api/AiIdentity/claim-types/all`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 02:05:20
 * @version V1.0.0
 */
aiClaimTypeApi.get = (id) => {
  return request({
    url: `/api/AiIdentity/claim-types/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 02:05:20
 * @version V1.0.0
 */
aiClaimTypeApi.put = (id, body) => {
  return request({
    url: `/api/AiIdentity/claim-types/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-27 02:05:20
 * @version V1.0.0
 */
aiClaimTypeApi.delete = (id) => {
  return request({
    url: `/api/AiIdentity/claim-types/${id}`,
    method: 'delete'
  })
}

export default aiClaimTypeApi
