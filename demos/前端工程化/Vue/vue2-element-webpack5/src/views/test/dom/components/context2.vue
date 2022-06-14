<template>
  <section class="context2">
    <h2>context2</h2>

    <slot name="context2" :context2Title="context2Title">
      <div>{{ context2Title }}</div>
    </slot>
  </section>
</template>

<script>
export default {
  name: 'context2',
  data() {
    return {
      context2Title: 'I am context2',
    }
  }
};
</script>