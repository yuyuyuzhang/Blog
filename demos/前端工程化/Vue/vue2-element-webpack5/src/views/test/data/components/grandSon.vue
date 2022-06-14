<template>
  <section class="grandSon">
    <div>grandson: {{ grandTitleComputed }}</div>

    <input v-model="grandTitleComputed"/>
  </section>
</template>

<script>
export default {
  name: 'grandSon',
  inject: [
    'grandTitle'
  ],
  computed: {
    grandTitleComputed: {
        get() {
            // return this.grandTitle
            return this.grandTitle()
        },
        set(val) {
            this.$emit('changeGrandTitle', val)
        }
    }
  }
};
</script>