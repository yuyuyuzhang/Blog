import { createStore } from 'vuex'
import theme from './modules/theme.js'
import app from './modules/app.js'

const store = createStore({
  modules: {
    theme,
    app
  }
})
export default store

