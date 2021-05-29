import Cookies from 'js-cookie'
import { getLanguage, setLocale } from '@/lang/index'
import { applicationConfiguration } from '@/api/abp'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  abpConfig: null,
  tenantname: '享阅智能',
  unauthorizedDialogVisible: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  toggle_unauthorizedDialogVisible: (state, visible) => {
    state.unauthorizedDialogVisible = visible
  },
  SET_ABPCONFIG: (state, abpConfig) => {
    state.abpConfig = abpConfig
  },
  SET_TENANTNAME: (state, tenantName) => {
    state.tenantName = tenantName
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setTenantName({ commit }, tenantName) {
    commit('SET_TENANTNAME', tenantName)
  },
  toggleUnauthorizedDialogVisible({ commit }, visible) {
    commit('toggle_unauthorizedDialogVisible', visible)
  },
  applicationConfiguration({ commit }) {
    return new Promise((resolve, reject) => {
      applicationConfiguration()
        .then(response => {
          commit('SET_ABPCONFIG', response)

          const language = response.localization.currentCulture.cultureName
          const values = response.localization.values
          setLocale(language, values)

          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
