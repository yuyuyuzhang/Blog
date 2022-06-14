<template>
  <section class="asyncComponents">
    <h2>Vue 异步组件</h2>

    <child></child>
    <childWidthOptions></childWidthOptions>
  </section>
</template>

<script>
import loading from './component/loading.vue'
import error from './component/error.vue'

// 不带选项的局部异步组件
const child = () => import('./component/child.vue')

// 带选项的局部异步组件
const childWidthOptions = () => ({
  component: import('./component/child.vue'),
  delay: 200,
  timeout: 3000,
  loading: loading,
  error: error,
})

export default {
  name: 'asyncComponents',
  components: {
    child,
    childWidthOptions
  },
};
</script>

<style lang="scss" scoped>
.asyncComponents {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
}
</style>