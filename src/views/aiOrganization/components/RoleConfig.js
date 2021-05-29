export const viewModel = {
  orgId: '',
  name: '',
  isDefault: false,
  isPublic: false
}

export const rules = {
  name: [
    {
      'required': true,
      'message': '请输入角色名称',
      'trigger': 'blur'
    },
    {
      'min': 0,
      'max': 256,
      'message': '长度在 0 到 256 个字符',
      'trigger': 'blur'
    }
  ],
  isDefault: [
    {
      'type': 'boolean',
      'message': 'isDefault 必须为 boolean',
      'trigger': 'change'
    }
  ],
  isPublic: [
    {
      'type': 'boolean',
      'message': 'isPublic 必须为 boolean',
      'trigger': 'change'
    }
  ]
}
