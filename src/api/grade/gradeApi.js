import request from '@/utils/request'

const gradeApi = {}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-10 20:10:51
 * @version V1.0.0
 */
gradeApi.post = (body) => {
  return request({
    url: `/api/app/grade`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-10 20:10:51
 * @version V1.0.0
 */
gradeApi.getList = (params) => {
  return request({
    url: `/api/app/grade`,
    method: 'get',
    params
  })
}
//GetListGradeAsync
gradeApi.getListByschoolId = (params) => {
  return request({
    url: `/api/app/grade/grade`,
    method: 'get',
    params
  })
}
/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-10 20:10:51
 * @version V1.0.0
 */
gradeApi.put = (id, body) => {
  return request({
    url: `/api/app/grade/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-10 20:10:51
 * @version V1.0.0
 */
gradeApi.delete = (id) => {
  return request({
    url: `/api/app/grade/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author 赵坤
 * @date 2020-08-10 20:10:51
 * @version V1.0.0
 */
gradeApi.get = (id) => {
  return request({
    url: `/api/app/grade/${id}`,
    method: 'get'
  })
}

export default gradeApi
