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
