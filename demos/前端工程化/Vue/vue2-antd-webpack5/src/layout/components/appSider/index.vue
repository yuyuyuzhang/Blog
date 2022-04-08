<template>
  <div class="layout-sider" :style="{ width: menuCollapse ? '80px' : '200px' }">
    <a-menu
      ref="menu"
      mode="inline"
      theme="light"
      :inline-collapsed="menuCollapse"
      :default-selected-keys="['/home/index']"
      @select="handleMenuSelect">
      <template v-for="item in permission_routes">
        <sub-menu 
          v-if="item.children.length > 1" 
          :key="item.path" 
          :currRoute="item" 
        />
        <a-menu-item v-else :key="`${item.path}/${item.children[0].path}`">
          {{ item.children[0].name }}
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
// antd 组件内部会动态更改 a-sub-menu 属性，单文件递归生成菜单则无法将属性挂载到 a-sub-menu，
// 需要自行声明属性并挂载，而使用函数式组件可以避免自行声明属性
import { Menu } from 'ant-design-vue';
const SubMenu = {
  template: `
    <a-sub-menu 
      v-if="!currRoute.hidden" 
      :key="currRoute.path" 
      :title="currRoute.name" 
      v-bind="$props" 
      v-on="$listeners">
      <template v-for="item in currRoute.children">
        <template v-if="Array.isArray(item.children)">
          <sub-menu 
            v-if="item.children.length > 1" 
            :key="currRoute.path + '/' + item.path" 
            :currRoute="item" 
          />
          <a-menu-item v-else :key="currRoute.path + '/' + item.children[0].path">
            {{ item.children[0].name }}
          </a-menu-item>
        </template>
        <a-menu-item v-else :key="currRoute.path + '/' + item.path">
          {{ item.name }}
        </a-menu-item>
      </template>
    </a-sub-menu>`,
  name: 'SubMenu',
  isSubMenu: true, // 必须
  props: {
    ...Menu.SubMenu.props,
    currRoute: {
      type: Object,
      default: () => ({}),
    },
  }
};

export default ({
  name: 'appSider',
  components: {
    'sub-menu': SubMenu
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
    handleMenuSelect({ key }) {
      console.log(key)
      this.$router.push({ path: key })
    },
  }
})
</script>

<style lang="scss" scoped>
.layout-sider {
  height: 100%;
  .ant-menu {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>