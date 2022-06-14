<template>
  <section class="child">
    <div>child: {{ childTitle }}</div>

    <input v-model="childTitleComputed" />
  </section>
</template>

<script>
export default {
  name: 'child',
  props: {
    childTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    childTitleComputed: {
      get() {
        return this.childTitle
      },
      set(val) {
        this.$emit('changeChildTitle', val)
      }
    }
  }
};
</script>