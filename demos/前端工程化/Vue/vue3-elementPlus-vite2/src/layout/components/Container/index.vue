<template>
  <div class="app-main">
    <!-- 缓存组件 -->
    <router-view :key="key" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- 主题设置 -->
    <settings></settings>
  </div>
</template>

<script>
import Settings from '../Settings/index.vue'

export default ({
  components: {
    Settings
  },
  data() {
    return {
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    }
  },
})
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
}
</style>
