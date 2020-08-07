# 七、Vuex

[[_TOC_]]

## 1. Vuex

Vuex 使用单一状态树，用一个对象包含全部的应用层级状态，至此便作为一个唯一数据源而存在

每个应用仅仅包含一个 store 实例，单一状态树让开发者能够直接定位任一特定的状态片段，调试的过程中也能轻易地取得整个当前应用状态的快照

### (1) 将 Vuex 注入到所有子组件

Vuex 通过 store 选项，提供了一种机制在 main.js 中将状态从根组件注入到每个子组件中，这样就无需在每个需要使用 store 的组件中频繁导入 store

main.js

```javascript
import Vue from "vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import App from "./App.vue";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router, //router从根组件注入到所有子组件
  store,  //store从根组件注入到所有子组件
  render: h => h(App)
});
```

## 2. state

Vuex 的状态存储是响应式的，从 store 实例中读取状态的最简单方法就是在组件的`计算属性`中返回某个状态，每当状态变化时，计算属性都会重新计算，并且触发 DOM 更新

store/modules/config.js

```javascript
const config = {
  state: {
    allTime: "2"
  },
  mutations: {
    setConfig(state, obj) {
      state.allTime = obj.allTime;
    }
  },
  actions: {},
  modules: {}
};

export default config;
```

store/index.js

```javascript
import Vue from "vue";
import Vuex from "vuex";

import config from "./modules/config";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    config
  }
});

export default store;
```

组件

```html
<template>
  <div class="about">
    <button @click="handleClick">AboutBtn</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    allTime() {
      return this.$store.state.config.allTime;
    }
  },
  methods: {
    handleClick() {
      console.log(this.allTime);
    }
  }
};
</script>
```

## 3. getter

## 4. mutation

## 5. action

## 6. mudule

①②③④⑤⑥⑦⑧⑨⑩
