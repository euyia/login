import request from '@/utils/request'

const studentApi = {}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-09 19:23:48
 * @version V1.0.0
 */
studentApi.getList = (params) => {
  return request({
    url: `/api/app/student`,
    method: 'get',
    params
  })
}
//api/app/student/parents/
studentApi.getparents = (userId) => {
  return request({
    url: `/api/app/student/parents/${userId}`,
    method: 'get'
  })
}

studentApi.getparentuser = (params) => {
  return request({
    url: `/api/app/student/getparentuser`,
    method: 'get' ,
    params
  })
}
/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
studentApi.putAddparentId = (params) => {
  return request({
    url: `/api/app/student/addparentId`,
    method: 'put',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
studentApi.deleteDelparent = (params) => {
  return request({
    url: `/api/app/student/delparent`,
    method: 'delete',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-09 19:23:48
 * @version V1.0.0
 */
studentApi.getDownloadTemplate = () => {
  return request({
    url: `/api/app/student/downloadTemplate`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-09 19:23:48
 * @version V1.0.0
 */
studentApi.postImport = (body) => {
  return request({
    url: `/api/app/student/import`,
    method: 'post',
    data: body
  })
}

studentApi.postImportToOu = (body) => {
  return request({
    url: `/api/app/student/importToOu`,
    method: 'post',
    data: body
  })
}
/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-09-14 01:38:05
 * @version V1.0.0
 */
studentApi.deletefaceId = (id) => {
  return request({
    url: `/facede/${id}`,
    method: 'delete'
  })
}

export default studentApi
