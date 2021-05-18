const theme = {
  namespaced: true,
  state: {
    sidebarStatus: false, // 菜单栏的折叠展开，不在主题设置里面，按钮单独位于 Headers 左侧
    showSettings: false,
    color: '#1890ff',
    language: 'zh',
    size: 'medium',
  },
  mutations: {
    CHANGE_SETTINGS(state, { key, value }) {
      if(state.hasOwnProperty(key)){
        state[key] = value
      }
    }
  },
  actions: {
    changeSettings({ state, commit, dispatch, rootState }, data) {
      commit('CHANGE_SETTINGS', data)
    }
  }
}
export default theme