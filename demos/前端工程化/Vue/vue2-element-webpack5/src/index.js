import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 全局样式
import './assets/style/index.scss'

// api
import Api from './api/request.js'
Vue.use(Api)

// element 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 注册全局自定义指令
import './directive/index.js';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
