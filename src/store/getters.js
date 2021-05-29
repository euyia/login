const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  token: state => state.user.token,
  isLogin: state => state.user.isLogin,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userName: state => state.user.userName,
  phoneNumber: state => state.user.phoneNumber,
  abpConfig: state => state.app.abpConfig,
  addRouters: state => state.permission.addRouteres,
  permissions: state => state.permission.permissions
}
export default getters
