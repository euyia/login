export const viewModel = {
  'parentId': null,
  'code': '',
  'name': '',
  'desc': '',
  'type': null,
  'sort': null
}

export const columns = [
  {
    'prop': 'parentId',
    'label': 'parentId'
  },
  {
    'prop': 'code',
    'label': '编码'
  },
  {
    'prop': 'name',
    'label': '名称'
  },
  {
    'prop': 'desc',
    'label': '描述'
  },
  {
    'prop': 'type',
    'label': '类型'
  },
  {
    'prop': 'sort',
    'label': '排序'
  }
]

export const rules = {
  'type': [
    {
      'required': true,
      'message': '请选择类型',
      'trigger': 'blur'
    }
  ],
  'name': [
    {
      'required': true,
      'message': '请输入名称',
      'trigger': 'blur'
    }
  ],
  'code': [
    {
      'required': true,
      'message': '请输入编码',
      'trigger': 'blur'
    }
  ]
}

export const sysAreaTypeEnum = [
  {
    text: '国家',
    value: 13000
  },
  {
    text: '省份',
    value: 13001
  }, {
    text: '城市',
    value: 13002
  }, {
    text: '区',
    value: 13003
  }
  // , {
  //   text: '街道',
  //   value: 13004
  // }, {
  //   text: '社区',
  //   value: 13005
  // }
]
