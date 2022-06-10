# 一、 Vue3 变动

## 1. 异步组件

### (1) Vue2 异步组件

Vue2 异步组件使用 `ES6 import()` 函数动态加载模块，返回 Promise 实例

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

### (2) Vue3 异步组件

Vue3 异步组件的定义需要包装在 `defineAsyncComponent()` 助手方法中显式定义，并且 component 选项被重命名为 `loader`

```vue
<template>
  <div>
    tableTest
    <treeTest></treeTest>
    <treeTestWithOptions></treeTestWithOptions>
  </div> 
</template>

<script>
import { defineAsyncComponent } from 'vue'

// 不带选项的异步组件
const treeTest = defineAsyncComponent(() => import('../treeTest/index.vue'))

// 带选项的异步组件
const treeTestWithOptions = defineAsyncComponent({
  loader: () => import('../treeTest/index.vue'),
  delay: 200,
  timeout: 3000,
  errorComponent: null,
  loadingComponent: null
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

![vue3局部异步组件]()

## 2. 自定义指令



①②③④⑤⑥⑦⑧⑨⑩
