import request from '@/utils/request'

const appSettingApi = {}

/**
 * 设置图书封面保存路径
 * @author Xy
 * @date 2020-08-08 03:50:11
 * @version V1.0.0
 */
appSettingApi.post = (params) => {
  return request({
    url: `/appSetting`,
    method: 'post',
    params
  })
}

/**
 * 键值获取value
 * @author Xy
 * @date 2020-08-08 03:50:11
 * @version V1.0.0
 */
appSettingApi.getList = (params) => {
  return request({
    url: `/appSetting`,
    method: 'get',
    params
  })
}

export default appSettingApi
