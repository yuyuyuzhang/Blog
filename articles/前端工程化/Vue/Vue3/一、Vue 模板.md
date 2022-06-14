# 一、 Vue 模板

## 1. Vue 模板

## 2. 自定义指令

### (1) Vue2 自定义指令

Vue2 自定义指令定义对象具备以下几个钩子函数

* **bind**：指令第一次绑定到元素时调用
* **inserted**：被绑定元素插入父节点时调用
* **update**：被绑定元素所在组件 VNode 更新时调用
* **componentUpdated**：被绑定元素所在组件 VNode 及其子 VNode 全部更新后调用
* **unbind**：指令与元素解绑时调用

Vue2 自定义指令定义对象钩子函数参数

* **el**：被绑定元素
* **binding**
  * **name**：指令名称
  * **value**：指令绑定值
  * **oldValue**：指令绑定的前一个值
  * **expression**：指令表达式
  * **arg**：指令接收到的参数
  * **modifiers**：指令的修饰符对象
* **vnode**：当前虚拟节点
* **oldVnode**：上一个虚拟节点

src/directive/adaptive.js

```js
import Vue from 'vue'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

const doResize = (el, binding, vnode) => {
    const { componentInstance: $table } = vnode

    if (!$table) return
  
    if (!$table.height) {
      throw new Error(`el-$table must set the height. Such as height='100px'`)
    }

    const { value } = binding
    const bottomOffset = (value && value.bottomOffset) || 30
    // 需要减去 layout-footer 高度 50
    const height = window.innerHeight - el.getBoundingClientRect().top - 50 - bottomOffset
    $table.layout.setHeight(height)
    $table.doLayout()
}

Vue.directive('table-height-adaptive', {
    bind(el, binding, vnode) {
        el.resizeListener = () => {
          doResize(el, binding, vnode)
        }
        addResizeListener(el, el.resizeListener)
    },
    inserted(el, binding, vnode) {
        doResize(el, binding, vnode)
    },
    unbind(el) {
        removeResizeListener(el, el.resizeListener)
    }
})
```

src/directive/index.js

```js
import './adaptive.js'
```

src/index.js

```js
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
```

![adaptive1]()

![adaptive2]()

### (2) Vue3 自定义指令

Vue3 自定义指令定义对象具备以下几个钩子函数

* **bind**：指令第一次绑定到元素时调用
* **inserted**：被绑定元素插入父节点时调用
* **update**：被绑定元素所在组件 VNode 更新时调用
* **componentUpdated**：被绑定元素所在组件 VNode 及其子 VNode 全部更新后调用
* **unbind**：指令与元素解绑时调用

* **beforeMount**：指令第一次绑定到元素并且挂载到父组件之前调用
* **mounted**：
* **beforeUpdate**：
* **updated**：被绑定元素所在组件 VNode 更新时调用
* **beforeUnmount**：被绑定元素所在组件 VNode 及其子 VNode 全部更新后调用
* **unmounted**：指令与元素解绑时调用

Vue3 自定义指令定义对象钩子函数参数

* **el**：被绑定元素
* **binding**
  * **name**：指令名称
  * **value**：指令绑定值
  * **oldValue**：指令绑定的前一个值
  * **expression**：指令表达式
  * **arg**：指令接收到的参数
  * **modifiers**：指令的修饰符对象
* **vnode**：当前虚拟节点
* **oldVnode**：上一个虚拟节点

src/directive/adaptive.js

```js

```

src/directive/index.js

```js
import './adaptive.js'
```

src/main.js

```js
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

// element-plus 图标库
const app = createApp(App)
for (const name in ElIcons){
  app.component(name, (ElIcons)[name])
}

// 注册全局自定义指令
import './directive/index.js';

app.use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')
```



![]()

![]()

## 3. 自定义元素



①②③④⑤⑥⑦⑧⑨⑩
