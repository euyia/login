import request from '@/utils/request'

const studentApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
studentApi.getList = (params) => {
  return request({
    url: `/api/app/student`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
studentApi.postDelStudent = (studentId) => {
  return request({
    url: `/api/app/student/delStudent/${studentId}`,
    method: 'post'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
studentApi.getParents = (userId) => {
  return request({
    url: `/api/app/student/parents/${userId}`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-14 10:02:42
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
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
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
 * @author 宏杰
 * @date 2020-10-14 10:02:42
 * @version V1.0.0
 */
studentApi.postImport = (body) => {
  return request({
    url: `/api/app/student/import`,
    method: 'post',
    data: body
  })
}

export default studentApi
