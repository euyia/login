import request from '@/utils/request'

const settingUiApi = {}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-01 08:31:49
 * @version V1.0.0
 */
settingUiApi.getRoupSettingDefinitions = () => {
  return request({
    url: `/api/app/settingUi/groupSettingDefinitions`,
    method: 'get'
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-01 08:31:49
 * @version V1.0.0
 */
settingUiApi.postEtSettingValues = (body) => {
  return request({
    url: `/api/app/settingUi/setSettingValues`,
    method: 'post',
    data: body
  })
}

/**
 * Created by AbpVueCli
 * @author 宏杰
 * @date 2020-10-01 08:31:49
 * @version V1.0.0
 */
settingUiApi.postEsetSettingValues = (body) => {
  return request({
    url: `/api/app/settingUi/resetSettingValues`,
    method: 'post',
    data: body
  })
}

export default settingUiApi
