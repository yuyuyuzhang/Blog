<template>
  <section class="context1">
    <h2>context1</h2>

    <slot name="context1" :context1Title="context1Title">
      <div>{{ context1Title }}</div>
    </slot>
  </section>
</template>

<script>
export default {
  name: 'context1',
  data() {
    return {
      context1Title: 'I am context1',
    }
  }
};
</script>