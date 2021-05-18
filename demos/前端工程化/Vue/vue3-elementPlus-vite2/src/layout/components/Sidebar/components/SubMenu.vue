<template>
  <div v-if="!currRoute.hidden" class="menu-wrapper">
    <el-submenu 
      v-if="currRoute.children && currRoute.children.length > 0" 
      :key="currRoute.path"
      :index="currRoute.path">
      <template #title>
        {{ currRoute.name }}
      </template>

      <!-- 递归 -->
      <sub-menu 
        v-for="item1 in currRoute.children" 
        :key="item1.path" 
        :currRoute="item1">
      </sub-menu>
    </el-submenu>

    <el-menu-item 
      v-else
      :key="currRoute.path"
      :index="currRoute.path"
      :route="currRoute">
      {{ currRoute.name }}
    </el-menu-item>
  </div>
</template>

<script>
export default ({
  name: 'SubMenu', // 用于实现递归
  props: {
    currRoute: {
      required: true,
      default: {}
    }
  },
})
</script>

<style lang="scss" scoped>
</style>
