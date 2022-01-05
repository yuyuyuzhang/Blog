# 六、Vuex

## 1. Vuex

Vuex 使用单一状态树，用一个对象包含全部的应用层级状态，至此便作为一个唯一数据源而存在

每个应用仅仅包含一个 store 实例，单一状态树让开发者能够直接定位任一特定的状态片段，调试的过程中也能轻易地取得整个当前应用状态的快照

### (1) 将 Vuex 注入到所有子组件

Vuex 通过 store 选项，提供了一种机制在 main.js 中将状态从根组件注入到每个子组件中，这样就无需在每个需要使用 store 的组件中频繁导入 store

main.js

```js
import Vue from "vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import App from "./App.vue";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,  // vuex 从根组件注入到所有子组件
  render: h => h(App)
});
```

### (2) mudule

使用单一状态树，应用的所有状态集中到一个比较大的对象，当应用变得非常复杂时，store 对象就可能变得十分臃肿，Vuex 允许开发者将 store 分割成模块，每个模块拥有自己的 state、getter、mutation、action，甚至是嵌套子模块

store/modules/config.js

```js
const config = {
  state: {
    allTime: "2"
  }
};

export default config;
```

store/index.js

```js
import Vue from "vue";
import Vuex from "vuex";

import config from "./modules/config";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    config
  }
});

export default store;
```

## 2. 数据

### (1) state

① Vuex 的 state 类似于组件的 `data` 选项

② Vuex 的状态存储是响应式的，从 store 实例中读取状态的最简单方法就是在组件的`计算属性`中返回某个状态，每当状态变化时，计算属性都会重新计算，并且触发 DOM 更新

### (2) getter

① Vuex 的 getter 类似于组件的 `computed` 选项

② getter 用于从 state 派生状态，例如对列表进行过滤并计数，getter 的返回值会根据依赖被`缓存`起来，只有依赖改变才会重新计算，getter 接受 state 作为第一个参数

store/modules/config.js

```js
const config = {
  state: {
    allTime: "2"
  }
};

export default config;
```

store/getters.js

```js
const getters = {
  allTimeConfig: state => state.config.allTime + ' config'
};

export default getters;
```

store/index.js

```js
import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import config from "./modules/config";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    config
  },
  getters
});

export default store;
```

组件

```html
<template>
  <div class="about">
    {{ allTime }}
    {{ allTimeConfig }}
    <button @click="handleClick">AboutBtn</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    allTime() {
      return this.$store.state.config.allTime;
    },
    allTimeConfig() {
      return this.$store.getters.allTimeConfig;
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

## 3. 提交变动

### (1) mutation

① mutation 是`直接变更状态`，Vuex 中变更状态的唯一方法就是提交 mutation

② mutation 必须是`同步函数`，为什么？当我们 debug 一个 app 并且观察 devtools 中的 mutation 日志时，每一条 mutation 被记录，devtools 都需要捕捉前一状态和后一状态的快照，而异步函数是无法实现的，如下所示，mutation 触发时，回调函数还未调用，devtools 不知道回调函数什么时候被实际调用，因此无法捕捉后一状态的快照

③ mutation 函数通过 `$store.commit(name, args)` 触发

```js
mutations: {
  someMutation(state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

### (2) action

① action 是`提交 mutation`

② action 通常是`异步函数`，可以包含任意异步操作，action 函数接受一个与 store 实例具有相同属性和方法的 `context 对象`，因此可以调用 `context.commit()` 提交一个 mutation，也可以通过 `context.state` 或 `context.getters` 来获取 state 和 getters

③ action 函数通过 `$store.dispatch(name, args)` 触发

store/modules/config.js

```js
const config = {
  state: {
    allTime: "2"
  },
  mutations: {
    syncSetConfig(state, val) {
      state.allTime = val;
    }
  },
  actions: {
    actionA({ commit }, val) {
      // Promise 实例创建后立即执行其回调函数
      return new Promise(resolve => {
        commit("syncSetConfig", val);
        resolve(val);
      });
    },
    async actionB({ commit }) {
      // await 命令返回后跟 Promise 实例的 resolve/reject 函数的参数

      // JS引擎线程立即执行actionB await命令,并通知异步请求线程发出getData请求,
      // 然后actionB函数交出执行权,JS引擎线程继续执行后续代码,getData请求返回数据后,
      // 事件触发线程将getData请求回调函数放入JS引擎线程的宏任务队列,
      // JS引擎线程空闲时执行getData请求回调函数,执行完毕后await命令返回参数,
      // 执行commit语句
      commit("syncSetConfig", await getData());
    },
    async actionC({ dispatch, commit }) {
      await dispatch("actionB"); // 等待 actionB 完成
      commit("syncSetConfig", await getOtherData());
    }
  }
};

export default config;
```

store/getters.js

```js
const getters = {
  allTimeConfig: state => state.config.allTime + " config"
};

export default getters;
```

store/index.js

```js
import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import config from "./modules/config";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    config
  },
  getters
});

export default store;
```

组件

```html
<template>
  <div class="home">
    {{ allTime }}<br />
    {{ allTimeConfig }}<br />
    <el-button @click="mutationSubmit">同步提交</el-button>
    <el-button @click="actionASubmit">异步A提交</el-button>
    <el-button @click="actionBSubmit">异步B提交</el-button>
    <el-button @click="actionCSubmit">异步C提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    allTime() {
      return this.$store.state.config.allTime;
    },
    allTimeConfig() {
      return this.$store.getters.allTimeConfig;
    }
  },
  methods: {
    mutationSubmit() {
      this.$store.commit("syncSetConfig", 3);
    },
    actionASubmit() {
      // 立即执行Promise,then方法参数函数放入JS引擎线程微任务队列
      this.$store.dispatch("actionA", "a").then(val => {
        console.log(val);
      });
    },
    actionBSubmit() {
      // 立即执行async函数actionB,async函数执行完毕后返回Promise实例,
      // 将返回的Promise实例then方法的参数函数放入JS引擎线程的微任务队列,
      // 然后actionBSubmit函数交出执行权,JS引擎线程继续执行后续代码,
      // JS引擎线程空闲时执行Promise实例的then方法的参数函数
      this.$store.dispatch("actionB").then(val => console.log(val));
    },
    actionCSubmit() {
      this.$store.dispatch("actionB").then(val => console.log(val));
    }
  }
};
</script>
```
