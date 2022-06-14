<template>
  <section class="context">
    <h2>我是子组件</h2>

    <slot name="img"></slot>
    <slot name="desc" :desc="{ name, age }"></slot>
  </section>
</template>

<script>
export default {
  name: 'context',
  data() {
    return {
      name: '花花',
      age: '1 岁'
    }
  }
};
</script>