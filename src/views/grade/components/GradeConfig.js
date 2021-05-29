export const viewModel = {
  'name': ''
}

export const columns = [
  {
    'prop': 'name',
    'label': '名称'
  }
]

export const rules = {
  'name': [
    {
      'required': true,
      'message': '请输入名称',
      'trigger': 'blur'
    }
  ]
}
