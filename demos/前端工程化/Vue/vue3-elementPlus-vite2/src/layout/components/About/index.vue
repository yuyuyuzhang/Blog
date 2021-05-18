<template>
  <el-dialog
    v-model="isAbout"
    title="关于"
    width="300px"
    show-close
    close-on-click-modal
    close-on-press-escape
    destroy-on-close>
    <div>版本：{{ version }}</div>
  </el-dialog>
</template>

<script>
export default {
  name: 'About',
  props: {
    showAbout: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  computed: {
    isAbout: {
      get() {
        return this.showAbout
      },
      set(val) {
        this.$emit('changeAboutShow', val)
      }
    },
    version(){
      return this.$store.state.app.version
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
