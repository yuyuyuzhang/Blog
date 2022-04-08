import { createStore } from 'vuex'
import theme from './modules/theme.js'

const store = createStore({
  modules: {
    theme
  }
})
export default store

