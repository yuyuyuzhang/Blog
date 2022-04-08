import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import './assets/style/index.scss'

// element-plus 组件库
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import * as ElIcons from '@element-plus/icons'

const app = createApp(App)

for (const name in ElIcons){
	app.component(name, (ElIcons)[name])
}

app.use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')