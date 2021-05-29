export const viewModel = {
  'name': '',
  'areaRange': [],
  'provinceId': 0,
  'areaId': 0,
  'cityId': 0,
  'schoolType': '',
  'schoolInfo': '',
  'adminPassword': null,
  'adminEmailAddress': null,
  'subDomain': null
}

export const columns = [
  {
    'prop': 'name',
    'label': '名称'
  },
  {
    'prop': 'areaRange',
    'label': '区域信息。'
  },
  {
    'prop': 'provinceId',
    'label': 'provinceId'
  },
  {
    'prop': 'areaId',
    'label': 'areaId'
  },
  {
    'prop': 'cityId',
    'label': 'cityId'
  },
  {
    'prop': 'schoolType',
    'label': '学校类型'
  },
  {
    'prop': 'schoolInfo',
    'label': '学校简介'
  }
]

export const rules = {
  'name': [
    {
      'required': true,
      'message': '请输入名称',
      'trigger': 'blur'
    }
  ], 'adminPassword': [
    {
      'required': true,
      'message': '请输入管理员密码',
      'trigger': 'blur'
    }
  ], 'adminEmailAddress': [
    {
      'required': true,
      'message': '请输入管理员邮箱',
      'trigger': 'blur'
    }
  ], 'subDomain': [
    {
      'required': true,
      'message': '请输入登录域名',
      'trigger': 'blur'
    }
  ]
}
