<template>
  <section class="son">
    <div>son: {{ grandTitle() }}</div>

    <grandSon @changeGrandTitle="changeGrandTitle"></grandSon>
  </section>
</template>

<script>
import grandSon from './grandSon.vue'

export default {
  name: 'son',
  components: {
    grandSon
  },
  inject: [
    'grandTitle'
  ],
  methods: {
    changeGrandTitle(val) {
      this.$emit('changeGrandTitle', val)
    }
  }
};
</script>