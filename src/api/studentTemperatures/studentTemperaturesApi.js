import request from '@/utils/request'

const studentTemperaturesApi = {}

/**
 * 学校温度统计
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.getSchoolTemperatureStatic = (params) => {
  return request({
    url: `/api/app/studentTemperatures/GetSchoolTemperatureStatic`,
    method: 'get',
    params
  })
}

studentTemperaturesApi.studentTemperatures = (params) => {
  return request({
    url: `/api/app/studentTemperatures`,
    method: 'get',
    params
  })
}

/**
 * 学生温度情况统计
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.getStudentTempera = (params) => {
  return request({
    url: `/api/app/studentTemperatures/GetStudentTempera`,
    method: 'get',
    params
  })
}


/**
 * 批量数据插入
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.postInsertBluck = (body) => {
  return request({
    url: `/api/app/studentTemperatures/InsertBluck`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.post = (body) => {
  return request({
    url: `/api/app/studentTemperatures`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.getList = (params) => {
  return request({
    url: `/api/app/studentTemperatures`,
    method: 'get',
    params
  })
}

/**
 * Created by AbpVueCli
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.put = (id, body) => {
  return request({
    url: `/api/app/studentTemperatures/${id}`,
    method: 'put',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.delete = (id) => {
  return request({
    url: `/api/app/studentTemperatures/${id}`,
    method: 'delete'
  })
}

/**
 * Created by AbpVueCli
 * @author XyAi
 * @date 2020-08-25 02:13:40
 * @version V1.0.0
 */
studentTemperaturesApi.get = (id) => {
  return request({
    url: `/api/app/studentTemperatures/${id}`,
    method: 'get'
  })
}

export default studentTemperaturesApi
