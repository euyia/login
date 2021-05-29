export const viewModel = {
  'returnTime': '',
  'borrowerId': '',
  'bookcaseId': '',
  'borrowerName': '',
  'deviceTag': '',
  'books': []
}

export const columns = [
  {
    'prop': 'returnTime',
    'label': 'returnTime'
  },
  {
    'prop': 'borrowerId',
    'label': 'borrowerId'
  },
  {
    'prop': 'bookcaseId',
    'label': 'bookcaseId'
  },
  {
    'prop': 'orderItems',
    'label': 'orderItems'
  }
]

export const rules = {
  'borrowerId': [
    {
      'required': true,
      'message': '请输入borrowerId',
      'trigger': 'blur'
    }
  ],
  'orderItems': [
    {
      'required': true,
      'message': '请输入orderItems',
      'trigger': 'blur'
    }
  ]
}
