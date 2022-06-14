# 一、Vue 模板

## 3. Vue 指令

Vue 的 14 个指令如下

```js
v-text  //内容被 Vue 渲染为文本节点
v-html  //内容被 Vue 渲染为元素节点
v-pre   //所在元素及其子元素不会被 Vue 编译

v-show
v-if
v-else-if
v-else
v-for

v-model //用于表单控件上创建双向数据绑定
v-bind  //用于属性绑定
v-on    //用于事件绑定

v-cloak //保持在 DOM 元素上直到关联实例编译结束
v-once  //只渲染元素或组件一次,随后的重新渲染将被跳过
v-slot  //用于具名插槽和作用域插槽
```


## 4. Vue 全局 API

### (1) 资源 API

全局注册往往是不够理想的，因为如果使用 Webpack 构建系统，即使全局注册的内容不再被使用，也都会包含在最终的构建结果中，这会造成用户下载的 JS 代码的无谓增加

```js
Vue.extend(options)        //全局注册一个扩展,返回一个Vue子类
Vue.component(name,define) //全局注册一个组件,父组件引用后使用
Vue.mixin(mixin)           //全局注册一个混入,组件引用后使用
Vue.filter(name,cb)        //全局注册一个过滤器,组件引用后使用
Vue.directive(name,define) //全局注册一个指令,组件引用后使用
```

#### ① Vue.extend(options)

Vue.extend 基于 Vue 基础实例构造器（new Vue），生成一个 Vue 扩展实例构造器，参数是一个包含组件选项的对象

Vue.component 的原理就是`自动调用`实例构造器生成组件实例，然后将组件实例挂载到`自定义元素`上

Vue.extend 比起 Vue.component 的优势是用于实现某些特殊需求，组件实例并不一定必须要挂载到某个 DOM 元素上，Vue.extend 可以实现组件实例动态插入到文档中，例如 `document.body.appendChild(组件实例.$el)`

* 扩展组件的生命周期钩子和组件的生命周期钩子将被合并为一个数组，因此都将被调用，但是扩展组件的生命周期钩子在组件`之前`调用
* 扩展组件的其他选项将和组件的选项合并，发生同名冲突时`以组件优先`

```html
<template>
  <div class="message" :class="type" v-show="isShow">
    <i class="icon"></i>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'Message'
}
</script>

<style scoped>
.info {
  background-color: "#00aaee";
}
.success {
  background-color: "#00ee6b";
}
.warning {
  background-color: "#eea300";
}
.danger {
  background-color: "#ee000c";
}
</style>
```

全局注册扩展

```js
import Vue from "vue";
import Message from "@/views/Message";

//子类VueMessage继承自Vue类
const VueMessage = Vue.extend(Message);

function showMessage({ type, text, isShow }) {
  //新建子类VueMessage的组件实例
  const messageDOM = new VueMessage({
    data() {
      return {
        type: type,
        text: text,
        isShow: isShow
      };
    }
  });
  //将组件实例挂载的DOM添加到文档
  document.body.appendChild(messageDOM.$mount().$el);
}

export default showMessage;
```

组件

```html
<template>
  <div id="app">
    App
    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
import Message from "@/api/extends/globalMessage";

export default {
  name: "App",
  methods: {
    handleClick() {
      Message({ type: "error", text: "我是小可爱", isShow: true });
    }
  }
};
</script>
```

#### ② Vue.component(name.options)

自定义组件

```html
<template>
  <input v-model="value" />
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      value: "我是小可爱"
    };
  }
};
</script>
```

全局注册子组件

```js
import Vue from "vue";
import Home from "@/views/Home";

Vue.component("Home", Home);
```

父组件

```html
<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import "@/api/components/globalComponent";

export default {
  name: "App",
  data() {
    return {};
  }
};
</script>
```

#### ③ Vue.mixin(options)

全局注册的混入，任意组件都可以引用后使用

混入用来分发组件的可复用功能，混入可以包含任意组件选项，组件引用混入时，混入的所有选项将被混合进该组件本身的选项

* 混入的生命周期钩子和组件的生命周期钩子将被合并为一个数组，因此都将被调用，但是混入的生命周期钩子在组件`之前`调用
* 混入的其他选项将和组件的选项合并，发生同名冲突时`以组件优先`

```js
import Vue from "vue";
import Home from "@/views/Home";

Vue.mixin({
  components: {
    Home
  },
  data() {
    return {
      mixinTitle: "mixin"
    };
  },
  computed: {
    mixinComputed() {
      return this.mixinTitle + " mixinComputed";
    }
  },
  methods: {
    init() {
      console.log("mixin hello");
    }
  },
  beforeCreate() {
    console.log("mixin beforeCreate");
  },
  created() {
    console.log("mixin created");
  },
  beforeMount() {
    console.log("mixin beforeMount");
  },
  mounted() {
    console.log("mixin mounted");
  },
  beforeUpdate() {
    console.log("mixin beforeUpdate");
  },
  updated() {
    console.log("mixin updated");
  },
  beforeDestroy() {
    console.log("mixin beforeDestroy");
  },
  destroyed() {
    console.log("mixin destroyed");
  }
});
```

组件

```html
<template>
  <div class="about">
    {{ new Date() }}
    <Home></Home>
  </div>
</template>

<script>
import "@/api/mixins/overMixin";

export default {
  components: {},
  data() {
    return {
      aboutTitle: "about"
    };
  },
  computed: {
    aboutComputed() {
      return this.aboutTitle + " aboutComputed";
    }
  },
  methods: {
    init() {
      console.log("about hello");
      console.log(this.aboutTitle);
      console.log(this.mixinTitle);
      console.log(this.aboutComputed);
      console.log(this.mixinComputed);
    }
  },
  beforeCreate() {
    console.log("about beforeCreate");
  },
  created() {
    console.log("about created");
  },
  beforeMount() {
    console.log("about beforeMount");
  },
  mounted() {
    console.log("about mounted");
    this.$nextTick(() => {
      this.init();
    });
  },
  beforeUpdate() {
    console.log("about beforeUpdate");
  },
  updated() {
    console.log("about updated");
  },
  beforeDestroy() {
    console.log("about beforeDestroy");
  },
  destroyed() {
    console.log("about destroyed");
  }
};
</script>

//输出：mixin beforeCreate
//     about beforeCreate
//     mixin created
//     about created
//     mixin beforeMount
//     about beforeMount
//     mixin mounted
//     about mounted
//     about hello
//     about
//     mixin
//     about aboutComputed
//     mixin mixinComputed
```

#### ④ Vue.filter(name,cb)

全局注册的过滤器，任意组件都可以引用后使用

过滤器可以用在`双花括号 {{}} 插值`和 `v-bind 表达式`，过滤器的作用一般是文本格式化

```js
import Vue from "vue";

Vue.filter("formateDate", function(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
});
```

组件

```html
<template>
  <div id="app">
    当前时间：{{ date | formateDate }}
    <div :time="date | formateDate">aaa</div>
  </div>
</template>

<script>
import "@/api/utils/filters";

export default {
  name: "App",
  data() {
    return {
      date: new Date()
    };
  }
};
</script>
```

![filters](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue2/filters.png)

#### ⑤ Vue.directive(name,options)

全局注册的自定义指令，任意组件都可以引用后使用

```js
import Vue from 'vue'

Vue.directive("v-focus", {
  //指令绑定到元素时
  bind: function(el, binding, vnode) {
    console.log(el);                 //指令绑定的元素
    console.log(binding);            //指令的属性对象
    console.log(binding.name);       //指令名
    console.log(binding.expression); //指令表达式
    console.log(binding.value);      //指令绑定的当前值
    console.log(binding.oldValue);   //指令绑定的前一个值
    console.log(binding.arg);        //指令参数
    console.log(binding.modifiers);  //修饰符对象
  },
  //绑定元素插入父节点时(仅保证父节点存在,不一定插入文档)
  inserted: function(el, binding, vnode) {
    el.focus();
  },
  //所在组件的VNode更新时(可能发生在子VNode更新前)
  update: function(el, binding, vnode, oldVnode) {
    console.log(vnode);    //当前VNode
    console.log(oldVnode); //上一个VNode
  },
  //所在组件的VNode及其子VNode全部更新时
  componentUpdated: function(el, binding, vnode, oldVnode) {},
  //指令与元素解绑时
  unbind: function(el, binding, vnode) {}
});
```

组件

```html
<template>
  <div id="app">
    <input v-focus v-model="value" />
  </div>
</template>

<script>
import "@/api/utils/directives"; //引入全局注册的自定义指令

export default {
  name: "App",
  data() {
    return {
      value: "aaa"
    };
  }
};
</script>
```

### (3) 其他 API

```js
Vue.version           //Vue安装版本号
Vue.use(plugin)       //安装插件plugin
Vue.observable(obj)   //令对象obj可响应(在Vuex中详解)
Vue.compile(template) //将字符串模板template编译为render函数
```

#### ① Vue.use

Vue.use(plugin) 用于安装 Vue 插件，插件的 install 方法调用时，会将 Vue 作为参数传入

* 如果插件是对象，必须提供 install 方法
* 如果插件是函数，自身会被作为 install 方法

```js
//打印插件

const Print = function(dom, options){
 //...
}
Print.prototype = {
  init(){},
  getHtml(){},
  //...
}

//插件定义
const MyPlugin = {}
MyPlugin.install = function(Vue, options){
  Vue.prototyoe.$print = Print
}
export default MyPlugin
```

main.js

```js
import Vue from "vue";
import axios from "axios";
import "./plugins/element.js";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import Print from '@/api/utils/print'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(Print)

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
```
