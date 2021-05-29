import request from '@/utils/request'

const nFCBookApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.post = (body) => {
  return request({
    url: `/api/nfc-book`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.getList = (params) => {
  return request({
    url: `/api/nfc-book`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.get = (id, bookId) => {
  return request({
    url: `/api/nfc-book/${id}/${bookId}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.put = (id, bookId, body) => {
  return request({
    url: `/api/nfc-book/${id}/${bookId}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.getBook = (id) => {
  return request({
    url: `/api/nfc-book/book/${id}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.getByIsbn = (isbn) => {
  return request({
    url: `/api/nfc-book/by-isbn/${isbn}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.postNfcBookinfo = (body) => {
  return request({
    url: `/api/nfc-book/nfc-bookinfo`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.delete = (id) => {
  return request({
    url: `/api/nfc-book/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.GetNfcbookListAsync = (params) => {
  return request({
    url: `/api/nfc-book/ GetNfcbookListAsync`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.DownloadNfcbookTemplate = () => {
  return request({
    url: `/api/nfc-book/ DownloadNfcbookTemplate`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-19 23:47:24
 * @version V1.0.0
 */
nFCBookApi.ImportNfcbook = (body) => {
  return request({
    url: `/api/nfc-book/ ImportNfcbook`,
    method: 'post',
    data: body
  })
}

export default nFCBookApi
