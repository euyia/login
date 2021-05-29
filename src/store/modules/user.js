import loginApi from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const token = getToken()
const getDefaultState = () => {
  return {
    token: token,
    isLogin: !!token,
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    state.isLogin = true
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      loginApi.login({
        grant_type: 'password',
        client_id: 'Ai_Ops',
        client_secret: '1q2w3e*',
        username: username.trim(),
        password: password
      }).then(data => {
        const token = data.access_token
        commit('SET_TOKEN', token)
        setToken(token)
        setToken(data, 'tokenObj')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      loginApi.getInfo().then(data => {
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name } = data

        commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeToken('tokenObj') // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()

      window.location.reload()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeToken('tokenObj')
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

