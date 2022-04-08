const theme = {
  namespaced: true,
  state: {
      menuCollapse: false,
      themeDialogVisiable: false,
      language: 'zh',
      color: '#1890ff',
      size: 'm',
      languageOptions: [
          { key: 'zh', name: '中文' },
          { key: 'en', name: '英文' }
      ],
      colorOptions: [
          { key: '#1890ff', name: '蓝色' }
      ],
      sizeOptions: [
          { key: 's', name: '小' },
          { key: 'm', name: '中' },
          { key: 'l', name: '大' }
      ]
  },
  mutations: {
      THEMES_CHANGE(state, data) {
          if(Array.isArray(data) && data.length) {
              data.forEach(({ key, value }) => {
                  state[key] = value
              })
          } else {
              console.log('params must be an array', data)
          }
      }
  },
  actions: {
      themesChange({ commit }, data) {
          commit('THEMES_CHANGE', data)
      }
  }
}

export default theme