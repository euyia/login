export const viewModel = {
  'name': '',
  'desc': '',
  'gradeId': '',
  'teacherId': ''
}

export const columns = [
  {
    'prop': 'name',
    'label': 'name'
  },
  {
    'prop': 'desc',
    'label': 'desc'
  },
  {
    'prop': 'gradeId',
    'label': 'gradeId'
  },
  {
    'prop': 'teacherId',
    'label': 'teacherId'
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
