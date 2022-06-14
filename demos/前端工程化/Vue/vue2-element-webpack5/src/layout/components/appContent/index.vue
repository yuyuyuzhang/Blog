<template>
  <div class="layout-content">
    <router-view :key="key" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
export default ({
  name: 'appContent',
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
  },
})
</script>

<style lang="scss" scoped>
.layout-content {
  position: relative;
  overflow: hidden;
  flex: 1;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
}
</style>