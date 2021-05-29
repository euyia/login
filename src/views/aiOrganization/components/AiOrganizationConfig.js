export const viewModel = {
  "parentId": "",
  "displayName": "",
  "extraProperties": null
}

export const columns = [
  {
    "prop": "parentId",
    "label": "上级部门"
  },
  {
    "prop": "displayName",
    "label": "名称"
  },
  {
    "prop": "extraProperties",
    "label": "extraProperties"
  }
]

export const rules = {
  "displayName": [
    {
      "min": 0,
      "max": 128,
      "message": "长度在 0 到 128 个字符",
      "trigger": "blur"
    }
  ]
}
