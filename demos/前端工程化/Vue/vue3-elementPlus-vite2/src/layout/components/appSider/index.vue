<template>
  <div class="layout-sider" :style="{ width: menuCollapse ? '80px' : '200px' }">
    <el-menu 
      ref="menu"
      mode="vertical"
      :collapse="menuCollapse"
      default-active="/home/index"
      @select="handleMenuSelect">
      <template v-for="item in permission_routes">
        <sub-menu 
          v-if="item.children.length > 1" 
          :key="item.path" 
          :currRoute="item" 
        />
        <el-menu-item 
          v-else
          :key="`${item.path}/${item.children[0].path}`"
          :index="`${item.path}/${item.children[0].path}`"
          :route="item.children[0]">
          {{ item.children[0].name }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SubMenu from './components/SubMenu.vue';

export default ({
  name: 'appSider',
  components: {
    SubMenu
  },
  computed: {
    permission_routes() {
      return this.$router.options.routes.filter(item => item.path !== '/')
    },
    menuCollapse() {
      return this.$store.state.theme.menuCollapse
    },
  },
  methods: {
    /**
     * 跳转至选中菜单
     */
    handleMenuSelect(key) {
      this.$router.push({ path: key })
    },
  }
})
</script>

<style lang="scss">
.layout-sider {
  height: 100%;
  .el-menu--collapse>.el-submenu>.el-submenu__title span {
    width: 24px;
    height: 56px;
    overflow: inherit;
    visibility: visible;
  }
}
</style>