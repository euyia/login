import request from '@/utils/request'

const deviceManageApi = {}

/**
 * 在某产品下申请创建一批设备
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.postBatchCheckDeviceNames = (params, body) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/BatchCheckDeviceNames`,
    method: 'post',
    params,
    data: body
  })
}

/**
 * 批量获取设备的在线状态，ONLINE｜OFFLINE|UNACTIVE|DISABLE
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getBatchGetDeviceState = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/BatchGetDeviceState`,
    method: 'get',
    params
  })
}

/**
 * 根据设备名称列表批量获取设备详情
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getBatchQueryDeviceDetail = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/BatchQueryDeviceDetail`,
    method: 'get',
    params
  })
}

/**
 * 禁用设备，设备一旦被禁用，不能再接入物联网平台，除非解禁
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getDisableThing = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/DisableThing`,
    method: 'get',
    params
  })
}

/**
 * 重新启用设备，被禁用的设备启用后可以再次接入物联网平台
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getEnableThing = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/EnableThing`,
    method: 'get',
    params
  })
}

/**
 * 获取设备的在线状态，ONLINE｜OFFLINE|UNACTIVE|DISABLE
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getDeviceStatus = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/GetDeviceStatus`,
    method: 'get',
    params
  })
}

/**
 * 获取产品的设备列表
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getQueryDevices = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/QueryDevices`,
    method: 'get',
    params
  })
}

/**
 * 分页回去设备信息
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getdevicesList = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/GetdevicesList`,
    method: 'get',
    params
  })
}

/**
 * 根据产品PK和设备名称获取设备详细信息
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.getQueryDeviceByName = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/QueryDeviceByName`,
    method: 'get',
    params
  })
}

/**
 * 在某一产品下创建一台设备
 * @author 宏杰
 * @date 2020-09-14 21:00:13
 * @version V1.0.0
 */
deviceManageApi.postRegisterDevice = (params) => {
  return request({
    url: `/api/AlyunIot/DeviceManage/RegisterDevice`,
    method: 'post',
    params
  })
}

export default deviceManageApi
