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

<style lang="scss" scoped>
</style>