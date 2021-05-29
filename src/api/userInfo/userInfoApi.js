import request from '@/utils/request'

const userInfoApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-18 21:42:32
 * @version V1.0.0
 */
userInfoApi.getList = () => {
  return request({
    url: `/api/app/userInfo`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-18 21:42:32
 * @version V1.0.0
 */
userInfoApi.getUserInfo = (userId) => {
  return request({
    url: `/api/app/userInfo/userInfo/${userId}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-18 21:42:32
 * @version V1.0.0
 */
userInfoApi.postChangePassword = (body) => {
  return request({
    url: `/api/app/userInfo/changePassword`,
    method: 'post',
    data: body
  })
}

export default userInfoApi
