# 二、Vue 组件

## 1. Vue 应用

一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的、嵌套的、可复用的组件树组成

## 2. Vue 组件

Vue 组件非常类似于自定义元素，Vue 组件是 Web 组件规范的一部分，实现了 Slot API 和 is attribute

不同框架对于组件的定义和实现各不相同，但可以用一句话来概括组件的定义：`组件就是基于视图的模块`，组件的核心任务就是将数据渲染到视图并监听用户在视图上的操作

### (1) Vue 实例

单页面应用程序 SPA 中只有一个 Vue 实例

### (2) VueComponent 实例

Vue 组件是 VueComponent 实例，VueComponent 实例是 Vue 实例的扩展

### (3) 父子组件间的单向数据流

* 数据自上而下流 `prop、provide/inject`

* 事件自下而上走 `this.$emit(e,...args)`

## 3. Vue 组件生命周期

### (1) 生命周期方法

Vue 实例的 4 个有关生命周期的方法

```js
vm.$mount(elem)   //将当前未挂载的实例手动挂载到指定elem元素
vm.$forceUpdate() //强迫当前实例重新渲染,仅影响实例本身和插入插槽内容的子组件,并非所有子组件
vm.$destroy()     //销毁当前实例,清理与其他实例的连接并且解绑全部指令及事件监听,绝大多数情况下不应该调用该方法,而是使用v-if指令以数据驱动的方式控制子组件的生命周期
vm.$nextTick(cb)  //将回调函数延迟到下次 DOM 更新后调用
```

### (2) 生命周期钩子

Vue 实例的 11 个生命周期钩子

```js
beforeCreate(){}             //实例初始化之后,数据观测和事件绑定之前被调用
created(){}                  //实例初始化完成之后被调用
beforeMount(){}              //实例被挂载到 DOM 元素之前被调用
mounted(){}                  //实例被挂载到 DOM 元素之后被调用,无法保证所有子组件一起被挂载,如果希望等到整个视图都渲染完毕,可以在内部使用this.$nextTick()
beforeUpdate(){}             //数据更新时,虚拟 DOM 重新渲染之前被调用
updated(){}                  //数据更新时,虚拟 DOM 重新渲染之后被调用
beforeDestroy(){}            //实例销毁之前被调用,此时实例仍然可用
destroyed(){}                //实例销毁之后被调用,此时实例不可用
errorCaptured(err,vm,info){} //捕获一个来自子孙组件的错误时被调用

activated(){}                //被 keep-alive 缓存的组件激活时调用
deactivated(){}              //被 keep-alive 缓存的组件停用时调用
```

![Vue实例生命周期](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue2/Vue%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)

### (3) 实例

```html
<div id="app">
  <div id="tit">{{title}}</div>
  <button @click="handleChange">修改</button>
  <button @click="handleDestroy">销毁实例</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js"></script>
<script>
const vm = new Vue({
  el: '#app',
  data(){
    return {
      title: 'hello'
    }
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
  created(){
    console.log('created')
  },
  beforeMount(){
    console.log('beforeMount')
  },
  mounted(){
    console.log('mounted')
  },
  beforeUpdate(){
    console.log('beforeUpdate')
  },
  updated(){
    console.log('updated')
  },
  activated(){
    console.log('activated')
  },
  deactivated(){
    console.log('deactivated')
  },
  beforeDestroy(){
    console.log('beforeDestroy', this.$data.title)
  },
  destroyed(){
    console.log('destroyed', this.$data.title)
  },
  errorCaptured(err,vm,info){
    console.log('errorCaptured')
  },
  methods: {
    handleChange(){
      console.log('hanldeChange1')
      this.title = 'hello world'
      console.log('hanldeChange2')

      //输出：hanldeChange1 hanldeChange2 beforeUpdate updated
    },
    handleDestroy(){
      console.log('handleDestroy1')
      this.$destroy()
      console.log('handleDestroy2')

      //输出：handleDestroy1 beforeDestroy destroyed handleDestroy2
    }
  }
})
</script>
```

## 4. Vue 组件选项

### (1) DOM 选项

```js
DOM：
el          //将当前 Vue实例挂载到一个页面上已存在的 DOM元素上
template    //字符串模板,用来替换挂载的 DOM元素
render      //渲染函数,用来代替字符串模板
renderError //render函数遭遇错误时错误作为第二个参数传递到renderError(只在开发者环境下工作)
```

### (2) 生命周期钩子选项

### (3) 资源选项

```js
extends    //当前组件局部注册引用的扩展(当前组件继承扩展组件)
components //当前组件局部注册引用的所有子组件
mixins     //当前组件局部注册引用的所有混入
filters    //当前组件局部注册引用的所有过滤器
directives //当前组件局部注册引用的所有指令
```

#### ① extends

extends 选项可以在当前组件局部注册`扩展`，即当前组件`继承`扩展组件

扩展组件

```html
<template>
  <div class="message" :class="type" v-show="isShow">
    <i class="icon"></i>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {};
  },
  methods: {
    parentClick() {
      console.log("parent");
    }
  }
};
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

子组件

```html
<template>
  <div id="app">
    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
import Message from "@/api/extends/Message";

export default {
  name: "App",
  extends: Message, //当前组件继承扩展组件,
  methods: {
    childClick() {
      console.log("child");
    },
    handleClick() {
      this.parentClick(); //'parent'
    }
  }
};
</script>
```

#### ② mixin

mixin 选项可以在当前组件局部注册`混入`

```js
import Home from "@/views/Home";

export default {
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
};
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
import mixin from "@/api/mixins/mixin";

export default {
  components: {},
  mixins: [mixin],
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

#### ③ filters

filters 选项可以在当前组件局部注册`过滤器`

```html
<template>
  <div class="about">
    当前时间：{{ time | formateDate }}
    <div :time="time | formateDate">aaa</div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      time: new Date()
    };
  },
  filters: {
    formateDate: function(date) {
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

      return (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
    }
  }
};
</script>
```

#### ④ directives

directives 选项可以在当前组件局部注册`自定义指令`

```html
<template>
  <div class="about">
    <input v-focus v-model="txt" />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      txt: ""
    };
  },
  directives: {
    focus: {
      //挂载元素插入到DOM后
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
```

### (4) 数据选项

Vue 会递归地将 data 选项中的数据加入响应式系统，但这些数据应该是声明时即存在的

```js
props          //当前组件接收到的父组件数据
provide/inject //祖先组件向所有子孙组件注入一个依赖,无论层次有多深,类似于prop
data           //当前组件的数据对象
computed       //当前组件的计算属性
watch          //当前组件的观察器
methods        //当前组件的方法
```

#### ① provide / inject

祖先组件使用 provide 选项暴露自身的数据，子孙组件使用 inject 注入祖先组件暴露的数据，无论组件层次有多深

父组件

```html
<template>
  <div id="app">
    <About></About>
  </div>
</template>

<script>
import About from "@/views/About";
export default {
  name: "App",
  components: {
    About
  },
  provide() {
    return {
      title: this.title
    };
  },
  data() {
    return {
      title: "this is app"
    };
  }
};
</script>
```

子组件

```html
<template>
  <div class="about">
    <Home></Home>
  </div>
</template>

<script>
import Home from "./Home";
export default {
  name: "About",
  components: {
    Home
  }
};
</script>

```

孙组件

```html
<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  name: "Home",
  inject: ["title"]
};
</script>
```

#### ② computed

computed 选项的计算属性结果会被`缓存`，只有计算属性依赖的响应式 property 发生变化时计算属性才会重新计算

* 组件触发重新渲染时，如果计算属性依赖的响应式 property 没有发生变化，那么计算属性会使用缓存值而不是重新计算
* 相比之下，methods 选项的方法始终会重新调用

如下示例，当改变计算属性的值之后，点击重新渲染按钮，重新渲染当前组件，计算属性的值不变，使用缓存的值，不会重新计算

```html
<template>
  <div class="about">
    a: <input v-model="a" />
    b: <input v-model="b" />
    c: {{ c }}

    personName: <input v-model="personName" />
    name:{{ name }}

    <button @click="$forceUpdate()">重新渲染</button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      a: 3,
      b: 3,
      name: "张三"
    };
  },
  computed: {
    c() {
      return this.a * 2 + this.b;
    },
    personName: {
      get() {
        return this.name;
      },
      set(val) {
        this.name = val;
      }
    }
  }
};
</script>
```

#### ③ watch

watch 选项是一个`观察器`，可以观察当前组件的 data 选项的变量的值变化

组件的 `this.$watch(target,cb,options)` 方法作用同 watch 选项一样

* **deep**：深度监听,可监听到对象属性和数组项的变化
* **immediate**：立即触发一次回调

```html
<template>
  <div class="about">
    <h1>{{ title }}</h1>
    <input v-model="title" />

    <h2>{{ person.name }}</h2>
    <input v-model="person.name" />

    <h3>{{ users[0].name }}</h3>
    <input v-model="users[0].name" />
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      title: "This is an about page",
      person: {
        name: "张三"
      },
      users: [
        { name: "李四", age: 20 },
        { name: "王五", age: 21 }
      ],
    };
  },
  watch: {
    title: {
      handler: function(newVal, oldVal) {
        console.log("watch", newVal, oldVal);
      }
    },
    person: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log("watch", newVal.name, oldVal.name);
      }
    },
    users: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log(newVal, oldVal);
      }
    }
  },
  mounted() {
    this.$watch("title", function(newVal, oldVal) {
      console.log(newVal, oldVal);
    });
    this.$watch(
      "person",
      function(newVal, oldVal) {
        console.log(newVal.name, oldVal.name);
      },
      { deep: true }
    );
    this.$watch(
      "person.name",
      function(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      { immediate: true }
    );
  }
};
</script>
```

### (5) 其他选项

```js
name         //当前组件的名字
delimiters   //当前组件修改默认的双花括号插值符{{}}
comments     //当前组件是否保留渲染HTML模板中的注释,默认false
inhertiAttrs //当前组件是否将父组件不作为prop的attribute作为attribute绑定到自身根元素,默认true
model        //当前组件自定义v-model指令的prop、event,默认将表单控件的value作为prop,input作为event
functional   //当前组件作为函数式组件
```

## 5. Vue 组件属性和方法

### (1) Vue 组件属性

```js
this.$isServer    //返回布尔值,当前组件是否运行于服务器

this.$root        //返回当前组件的根 Vue实例
this.$parent      //返回当前组件的父组件
this.$children    //返回当前组件的子组件数组

this.$el          //返回当前组件的根 DOM元素
this.$data        //返回当前组件的 data选项
this.$props       //返回当前组件的 props选项
this.$refs        //返回一个对象,包含当前组件内所有注册 ref的 DOM元素和组件
this.$attrs       //返回一个对象,包含父组件对当前组件的未作为 prop识别的 attribute 属性绑定 (class,style除外)
this.$listeners   //返回一个对象,包含父组件对当前组件的事件监听

this.$options     //返回一个对象,包含当前组件的初始化选项
```

父组件

```html
<template>
  <div id="app">
    <About
      :class="aa"
      :style="{ color: 'red' }"
      :data="data"
      :value="value"
      @click="click"
    ></About>
  </div>
</template>

<script>
import About from "@/views/About";

export default {
  name: "app",
  components: {
    About
  },
  data() {
    return {
      data: "bbb",
      value: "aaa",
      aa: "a"
    };
  },
  methods: {
    click() {}
  }
};
</script>
```

子组件

```html
<template>
  <div class="about">
    <Home></Home>
    <h1 ref="a">{{ title }}</h1>
  </div>
</template>

<script>
import Home from "@/views/Home";
export default {
  name: "app",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {
    Home
  },
  data() {
    return {
      title: "This is an about page"
    };
  },
  mounted() {
    console.log(this.$isServer);  // false
    console.log(this.$root);      // Vue {}
    console.log(this.$parent);    // VueComponent{}
    console.log(this.$children);  // [VueComponent{}]
    console.log(this.$el);        // <div class="about"></div>
    console.log(this.$data);      // {title: 'This is an about page'}
    console.log(this.$props);     // {value: 'aaa'}
    console.log(this.$refs);      // {a: h1}
    console.log(this.$attrs);     // {data: 'bbb'}
    console.log(this.$listeners); // {click: f()}
    console.log(this.$options);   // {parent, propsData, _componentTag, _parentListeners, _parentVnode, _propKeys, _renderChildren}

    // console.log(this.$slots);
    // console.log(this.$scopedSlots);
  }
};
</script>
```

### (2) Vue 组件方法

#### ① 生命周期方法

#### ② 数据方法

```js
this.$watch(target,cb,options)         //作用同 Vue组件的 watch选项相同
this.$set(target,propName/index,value) //向当前组件的响应式对象target添加
this.$delete(target,propName/index)    //向当前组件响应式对象target删除propName

options: deep      //深度监听,可监听到对象属性和数组项的变化
         immediate //立即触发一次回调
```

#### ③ 事件方法

以下事件方法仅适用于组件上的`自定义事件`

```js
this.$on(e,cb)        //监听当前组件上的自定义事件e
this.$once(e,cb)      //监听当前组件上的自定义事件e(只触发一次,之后监听器立即被移除)
this.$off(e,cb)       //移除当前组件上的自定义事件e
this.$emit(e,...args) //触发当前组件上的自定义事件e,附加参数...args传给事件回调函数
```

父组件

```html
<template>
  <div id="app">
    <!-- 设置并监听子组件的自定义事件parentClick -->
    <About @parentClick="parentClick"></About>
  </div>
</template>

<script>
import About from "@/views/About";
export default {
  name: "app",
  components: {
    About
  },
  methods: {
    //设置子组件自定义事件parentClick的回调函数
    parentClick() {
      console.log("parent");
    }
  }
};
</script>
```

子组件

```html
<template>
  <div class="about">
    <h1 @click="handleClick">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "app",
  props: {},
  data() {
    return {
      title: "This is an about page"
    };
  },
  mounted() {
    //设置并监听当前组件的自定义事件childClick及回调函数
    this.$on("childClick", () => console.log("child"));
  },
  methods: {
    handleClick() {
      console.log("hello");
      this.$emit("childClick");  //触发当前组件的自定义事件childClick
      this.$emit("parentClick"); //触发当前组件的自定义事件parentClick
    }
  }
};
</script>
```

## 6. Vue 动态组件

**动态组件**：多个组件使用同一个挂载点，动态进行切换，这就是动态组件

正常情况下，切换组件调用时会`销毁`组件实例，而使用 `<keep-alive>` 包裹动态组件时，就不会销毁，而是缓存不活动的组件实例，下一次使用的时候直接从缓存中加载，主要用于保存组件状态，避免反复重新渲染导致的性能问题

`<keep-alive>` 标签自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中

组件在 `<keep-alive>` 标签内切换时，组件的 `activated` 和 `deactivated` 生命周期钩子函数将会被对应执行

`<keep-alive>` 标签的属性

* include：字符串或正则表达式，只有名称匹配的组件会被缓存
* exclude：字符串或正则表达式，任意名称匹配的组件都不会被缓存
* max：数字，最多可缓存多少个组件实例

```html
<!-- 多个条件判断的子组件缓存状态,不销毁 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

父组件

```html
<template>
  <div id="app">
    <button @click="is = 'About'">About</button>
    <button @click="is = 'Home'">Home</button>

    <keep-alive>
      <template v-if="is === 'About'">
        <About></About>
      </template>

      <template v-else>
        <Home></Home>
      </template>
    </keep-alive>
  </div>
</template>

<script>
import About from "@/views/About";
import Home from "@/views/Home";

export default {
  name: "App",
  components: {
    About,
    Home
  },
  data() {
    return {
      is: "About"
    };
  },
};
</script>
```

子组件

```html
<template>
  <div class="Home">
    <button @click="count++">HomeBtn</button>
    {{ count }}
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      count: 0
    };
  },
};
</script>
```

## 7. Vue 异步组件

### (1) import 函数

ES2020 提案引入 import(path) 函数，支持动态加载模块，返回一个 `Promise 实例`

#### ① 异步加载

ES6 的 import() 方法类似于 Node 的 require() 方法，区别主要是 import() 是异步加载，require() 是同步加载

import() 方法返回一个 `Promise 实例`

```js
const main = document.querySelector('main');

//JS引擎线程执行import()函数,并通知网络进程异步加载模块资源,
//import()函数交出执行权,JS引擎线程继续执行后续代码,模块加载
//完成后,事件触发线程将import()函数返回的Promise实例的then
//方法的参数函数放入JS引擎线程的微任务队列,JS引擎线程空闲时
//执行then方法的参数函数
import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

#### ② 按需加载

import(path) 函数可以用在任何地方，不仅仅是模块，非模块的脚本也可以使用，`运行到这一行代码时`才会加载指定的模块

```js
//<button @click="handleClick">点击</button>
const btn = document.getElementById('btn')
btn.addEventListener('click', function(){
  import('./module')
    .then(res => console.log(res))
    .catch(err => console.log(err));
})
```

#### ③ 条件加载

可以放在 if 代码块，根据不同的情况，加载不同的模块，

```js
//main.js
if(flag){
  import('./module1')
    .then(res => {})
    .catch(err => console.log(err));
} else{
  import('./module2')
    .then(res => {})
    .catch(err => console.log(err));
}
```

#### ④ 动态的模块路径

允许模块路径动态生成

```js
const f = (name) => return './' + name + '.js';
import(f())
  .then(res => {})
  .catch(err => console.log(err));
```

#### ⑤ 模块作为对象

import(path) 加载成功后的模块会作为一个`对象`，成为返回的 Promise 实例的 then 方法的参数函数的参数

```js
//person.js
export { person1, person2}

//main.js
import('./person')
  .then(res => console.log(res.default)) //可以直接获取默认输出default接口
  .catch(err => console.log(err));

import('./person')
  .then({ person1, person2 } => {}) //对象可以使用解构赋值
  .catch(err => console.log(err));
```

#### ⑥ 同时动态加载多个模块

使用 `Promise.all()` 实现同时加载多个模块

```js
Promise.all([
  import('./module1'),
  import('./module2'),
  import('./module3')
])
  .then(([module1, module2, module3]) => {})
  .catch(err => console.log(err));
```

#### ⑦ 用在 async 函数 await 命令后

import(path) 函数返回一个 Promise 实例，因而可以用在 async 函数的 await 命令后

```js
//main.js
async f(){
  const { export1, export2 } = await import('./module1');
  const [module2, nodule3] = await Promise.all([
    import('./module2'),
    import('./module3')
  ])
}
f();
```

### (2) 异步组件

#### ① 全局异步组件

```js
Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)
```

#### ② 局部异步组件

```vue
<template>
  <div>
    tableTest
    <treeTest></treeTest>
    <treeTestWithOptions></treeTestWithOptions>
  </div> 
</template>

<script>
// 不带选项的局部异步组件
const treeTest = () => import('../treeTest/index.vue')

// 带选项的局部异步组件
const treeTestWithOptions = () => ({
  component: import('../treeTest/index.vue'),
  delay: 200,
  timeout: 3000,
  error: null,
  loading: null
})

export default ({
  name: 'tableTest',
  components: {
    treeTest,
    treeTestWithOptions
  },
  data() {
    return {}
  }
})
</script>
```

![vue2局部异步组件]()
