export const viewModel = {
  'deviceId': '',
  'deviceTag': '',
  'serialnumber': '',
  'activation': null,
  'caseNum': 0,
  'nfcSerialPort': '',
  'caseBaudRate': 0,
  'nfcSerialBaudRate': 0,
  'caseSerialPort': '',
  'rfidSeriaPort': '',
  'deviceInfos': [],
  'caseInfos': [],
  'lampProt': '',
  'uvSwTimes': {},
  'powerTimes': {},
  'simlarThreshold': 0.0,
  'baiduTtsSn': '',
  'address': null,
  'admin': '',
  'adminName': '',
  'adminPassWord': '',
  'version': 0,
  'schoolId': '',
  'tenantId': ''
}

export const columns = [
  {
    'prop': 'deviceId',
    'label': 'deviceId'
  },
  {
    'prop': 'deviceTag',
    'label': 'deviceTag'
  },
  {
    'prop': 'serialnumber',
    'label': '设备唯一编号，用于添加更新'
  },
  {
    'prop': 'activation',
    'label': '设备使用状态0：未激活，1：激活'
  },
  {
    'prop': 'caseNum',
    'label': 'caseNum'
  },
  {
    'prop': 'nfcSerialPort',
    'label': 'NFC串口号'
  },
  {
    'prop': 'caseBaudRate',
    'label': 'caseBaudRate'
  },
  {
    'prop': 'nfcSerialBaudRate',
    'label': 'nfcSerialBaudRate'
  },
  {
    'prop': 'caseSerialPort',
    'label': 'caseSerialPort'
  },
  {
    'prop': 'rfidSeriaPort',
    'label': 'rfidSeriaPort'
  },
  {
    'prop': 'deviceInfos',
    'label': 'deviceInfos'
  },
  {
    'prop': 'caseInfos',
    'label': 'caseInfos'
  },
  {
    'prop': 'lampProt',
    'label': 'lampProt'
  },
  {
    'prop': 'uvSwTimes',
    'label': 'uvSwTimes'
  },
  {
    'prop': 'adminName',
    'label': 'adminName'
  },
  {
    'prop': 'adminPassWord',
    'label': 'adminPassWord'
  },
  {
    'prop': 'address',
    'label': 'address'
  },
  {
    'prop': 'admin',
    'label': 'admin'
  },
  {
    'prop': 'version',
    'label': '设备信息版本'
  },
  {
    'prop': 'schoolId',
    'label': '学校ID'
  },
  {
    'prop': 'tenantId',
    'label': '租户id.'
  }
]

export const rules = {}
