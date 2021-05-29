import request from '@/utils/request'

const nFcBookApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.post = (body) => {
  return request({
    url: `/api/nfc-book`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.getList = (params) => {
  return request({
    url: `/api/nfc-book`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.get = (id, bookId) => {
  return request({
    url: `/api/nfc-book/${id}/${bookId}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.put = (id, bookId, body) => {
  return request({
    url: `/api/nfc-book/${id}/${bookId}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.getBook = (id) => {
  return request({
    url: `/api/nfc-book/book/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.getByIsbn = (isbn) => {
  return request({
    url: `/api/nfc-book/by-isbn/${isbn}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.postNfcBookinfo = (body) => {
  return request({
    url: `/api/nfc-book/nfc-bookinfo`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.delete = (id) => {
  return request({
    url: `/api/nfc-book/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-17 11:49:11
 * @version V1.0.0
 */
nFcBookApi.GetNfcbookListAsync = (params) => {
  return request({
    url: `/api/nfc-book/ GetNfcbookListAsync`,
    method: 'get',
    params
  })
}

nFcBookApi.ImportNfcbook = (body) => {
  return request({
    url: `/api/nfc-book/ImportNfcbook`,
    method: 'post',
    data: body
  })
}


export default nFcBookApi
