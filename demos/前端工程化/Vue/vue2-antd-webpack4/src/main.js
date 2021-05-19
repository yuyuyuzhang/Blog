import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store'

// 全局引入组件库 ant-design-vue  
// import AntDesignVue from 'ant-design-vue/lib'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(AntDesignVue)

// 全局样式
// import './assets/styles/index.scss'

// Vue.config.productionTip = false

// const root = document.createElement('div')
// document.body.appendChild(root)

new Vue({
  // router,
  // store,
  el: '#app',
  render: h => h(App)
})
