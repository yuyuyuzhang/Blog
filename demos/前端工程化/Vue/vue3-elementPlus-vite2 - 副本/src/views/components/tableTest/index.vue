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

<style lang="scss" scoped>
</style>