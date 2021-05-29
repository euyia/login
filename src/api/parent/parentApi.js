import request from '@/utils/request'

const parentApi = {}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-07 10:41:31
 * @version V1.0.0
 */
parentApi.getList = (params) => {
  return request({
    url: `/api/app/parent`,
    method: 'get',
    params
  })
}

export default parentApi
