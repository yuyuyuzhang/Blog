# 三、Vue 组件

[[_TOC_]]

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

## 4. 动态组件

`<keep-alive>` 标签包裹组件，会缓存不活动的组件实例，而不是销毁组件实例，主要用于保存组件状态，避免反复重新渲染导致的性能问题

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

## 5. 异步组件

### (1) import 函数

ES2020 提案引入 import(path) 函数，支持动态加载模块，返回一个 `Promise 实例`

#### ① 异步加载

ES6 的 import() 方法类似于 Node 的 require() 方法，区别主要是 import() 是异步加载，require() 是同步加载

import() 方法返回一个 `Promise 实例`

```javascript
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

```javascript
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

```javascript
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

```javascript
const f = (name) => return './' + name + '.js';
import(f())
  .then(res => {})
  .catch(err => console.log(err));
```

#### ⑤ 模块作为对象

import(path) 加载成功后的模块会作为一个`对象`，成为返回的 Promise 实例的 then 方法的参数函数的参数

```javascript
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

```javascript
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

```javascript
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

全局异步组件

```javascript
Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)
```

局部异步组件

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
  components: {
    'my-component': () => import('./my-async-component')
  },
  data() {
    return {
      count: 0
    };
  },
};
</script>
```
