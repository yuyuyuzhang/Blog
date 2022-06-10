<template>
  <el-submenu 
    v-if="!currRoute.hidden" 
    :key="currRoute.path"
    :index="currRoute.path">
    <template #title>
      <span>{{ currRoute.name }}</span>
    </template>

    <el-menu-item-group>
      <template v-for="item in currRoute.children">
        <template v-if="Array.isArray(item.children)">
          <sub-menu 
            v-if="item.children.length > 1" 
            :key="`${currRoute.path}/${item.path}`" 
            :currRoute="item" 
          />

          <el-menu-item 
            v-else
            :key="`${currRoute.path}/${item.children[0].path}`"
            :index="`${currRoute.path}/${item.children[0].path}`"
            :route="item.children[0]">
            {{ item.children[0].name }}
          </el-menu-item>
        </template>

        <el-menu-item 
          v-else
          :key="`${currRoute.path}/${item.path}`"
          :index="`${currRoute.path}/${item.path}`"
          :route="item">
          {{ item.name }}
        </el-menu-item>
      </template>
    </el-menu-item-group>
  </el-submenu>
</template>

<script>
export default ({
  name: 'SubMenu', // 用于实现递归
  props: {
    currRoute: {
      required: true,
      default: () => ({})
    }
  }
})
</script>

<style lang="scss" scoped>
</style>