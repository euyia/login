import request from '@/utils/request'

const bookApi = {}

/**
 * 获取图书类型列表
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.getBookTypeList = () => {
  return request({
    url: `/api/app/book/bookTypeList`,
    method: 'get'
  })
}

/**
 * 添加图书是类型
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.postBookType = (params) => {
  return request({
    url: `/api/app/book/bookType`,
    method: 'post',
    params
  })
}

/**
 * 添加图书绑定类型
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.postType = (params) => {
  return request({
    url: `/api/app/book/type`,
    method: 'post',
    params
  })
}

/**
 * 图书绑定NFC
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.postNfcId = (params) => {
  return request({
    url: `/api/app/book/nfcId`,
    method: 'post',
    params
  })
}

/**
 * 解除图书绑定
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.deleteNfcId = (params) => {
  return request({
    url: `/api/app/book/nfcId`,
    method: 'delete',
    params
  })
}

/**
 * 添加图书
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.post = (body) => {
  return request({
    url: `/api/app/book`,
    method: 'post',
    data: body
  })
}

/**
 * 获取图书列表
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.getList = (params) => {
  return request({
    url: `/api/app/book`,
    method: 'get',
    params
  })
}

/**
 * 删除图书
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.delete = (id) => {
  return request({
    url: `/api/app/book/${id}`,
    method: 'delete'
  })
}

/**
 * 获取图书详细信息
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.get = (id) => {
  return request({
    url: `/api/app/book/${id}`,
    method: 'get'
  })
}

/**
 * 修改图书信
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.put = (id, body) => {
  return request({
    url: `/api/app/book/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * 提供NFCID获取图书信息
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.postNfcGetBook = (nfcId) => {
  return request({
    url: `/api/app/book/nfcGetBook/${NfcId}`,
    method: 'post'
  })
}

/**
 * 获取图书详细
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.getBookInfo = (id) => {
  return request({
    url: `/api/app/book/${id}/bookInfo`,
    method: 'get'
  })
}

/**
 * 通过ISBN查找图书信息
 * @author XyAi
 * @date 2020-08-24 21:12:50
 * @version V1.0.0
 */
bookApi.getBookByIsbn = (params) => {
  return request({
    url: `/api/app/book/bookInfo`,
    method: 'get',
    params
  })
}

export default bookApi
