<template>
  <el-menu
    ref="menu"
    :default-active="$route.path"
    :collapse="sidebarStatus"
    class="app-sidebar"
    @select="handleSelect">
    <sub-menu 
      v-for="item in permission_routes" 
      :key="item.path"
      :currRoute="item">
    </sub-menu>
  </el-menu>
</template>

<script>
import SubMenu from './components/SubMenu.vue'

export default ({
  name: 'Sidebar',
  components: {
    SubMenu
  },
  data() {
    return {
    }
  },
  computed: {
    permission_routes() {
      return this.$router.options.routes
    },
    sidebarStatus() {
      return this.$store.state.theme.sidebarStatus
    }
  },
  mounted(){
    console.log("permission_routes:", this.permission_routes)
  },
  methods: {
    handleSelect(index, indexPath){
      const fullPath = indexPath.join('/')
      console.log(indexPath)
      console.log(fullPath)
      // 跳转至选中菜单，顶部栏显示当前路由
      // this.$router.push({ path: indexPath[indexPath.length - 1] })
    },
  }
})
</script>

<style lang="scss" scoped>
.app-sidebar {
}
</style>
