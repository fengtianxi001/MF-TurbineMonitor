/*
 * @description: 
 * @author: 肛肠科冯主任
 * @Date: 2020-08-29 18:24:56
 */
export default {
  state: {
    barInfo: {
      title: '',
      leftText: '返回',
      leftUrl: '',
      rightText: '',
      rightUrl: '',
      isShow: false
    }
  },
  mutations: {
    setBarTitle(state, data) {
      state.barInfo.title = data
    },
    setShowBar(state, data) {
      state.barInfo.isShow = data
    },
    setLeftText(state, data) {
      state.barInfo.leftText = data
    },
    setLeftUrl(state, data) {
      state.barInfo.leftUrl = data
    },
    setRightText(state, data) {
      state.barInfo.rightText = data
    },
    setRightUrl(state, data) {
      state.barInfo.rightUrl = data
    }
  },
  actions: {
    setBarTitle({ commit }, data) {
      commit("setBarTitle", data)
    },
    showBar({ commit }) {
      commit('setShowBar', true)
    },
    hideBar({ commit }) {
      commit('setShowBar', false)
    },
    setLeftText({ commit }, data) {
      commit('setLeftText', data)
    },
    setLeftUrl({ commit }, data) {
      commit('setLeftUrl', data)
    },
    setRightText({ commit }, data) {
      commit('setRightText', data)
    },
    setRightUrl({ commit }, data) {
      commit('setRightUrl', data)
    }
  },
  getters: {
    barTitle: state => state.barInfo.title,
    barLeftText: state => state.barInfo.leftText,
    barLeftUrl: state => state.barInfo.leftUrl,
    barRightText: state => state.barInfo.rightText,
    barRightUrl: state => state.barInfo.rightUrl,
    barIsShow: state => state.barInfo.isShow
  }
}
