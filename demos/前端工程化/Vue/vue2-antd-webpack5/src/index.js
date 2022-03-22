import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// api
import Api from './api/request.js'
Vue.use(Api)

// antd 组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
