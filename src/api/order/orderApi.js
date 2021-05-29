import request from '@/utils/request'

const orderApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-20 19:16:59
 * @version V1.0.0
 */
orderApi.getList = (params) => {
  return request({
    url: `/api/app/order`,
    method: 'get',
    params
  })
}

// //api/app/order/orderInfo/{Id}
orderApi.getorderInfo = (Id) => {
  return request({
    url: `/api/app/order/orderInfo/` + Id,
    method: 'get'
  })
}

orderApi.getListwhitUser = (params) => {
  return request({
    url: `/api/app/order/whitUser`,
    method: 'get',
    params
  })
}
// /api/app/order/orderList

orderApi.orderList = (params) => {
  return request({
    url: `/api/app/order/orderList`,
    method: 'get',
    params
  })
}
/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-20 19:16:59
 * @version V1.0.0
 */
orderApi.post = (body) => {
  return request({
    url: `/api/app/order`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-20 19:16:59
 * @version V1.0.0
 */
orderApi.putReturn = (body) => {
  return request({
    url: `/api/app/order/return`,
    method: 'put',
    data: body
  })
}

export default orderApi
