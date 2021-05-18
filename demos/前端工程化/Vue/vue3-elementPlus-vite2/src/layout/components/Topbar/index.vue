<template>
  <div class="app-topbar">
    <div class="left" style="width: calc(100% - 100px); text-align: left;">
      <!-- sidebar 展开折叠 -->
      <i
        :class="['icon-container', sidebarStatus ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
        @click="sidebarStatus = !sidebarStatus">
      </i>

      <!-- 当前路由显示 -->
      {{ $route.fullPath }}
    </div>
    
    <div class="right">
      <!-- 用户信息 -->
      <el-dropdown @command="handleCommand">
        <i class="icon-container el-icon-user"></i>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="about">关于</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 主题配置 -->
      <i
        class="icon-container el-icon-present"
        @click="showSettings = !showSettings">
      </i>
    </div>

    <!-- 关于 -->
    <about :showAbout="showAbout" @changeAboutShow="changeAboutShow"></about>
  </div>
</template>

<script>
import About from '../About/index.vue'

export default {
  name: 'Headbar',
  components: {
    About
  },
  data() {
    return {
      showAbout: false,
    }
  },
  computed: {
    sidebarStatus: {
      get() {
        return this.$store.state.theme.sidebarStatus
      },
      set(val) {
        this.$store.dispatch('theme/changeSettings', {
          key: 'sidebarStatus',
          value: val
        })
      }
    },
    showSettings: {
      get() {
        return this.$store.state.theme.showSettings
      },
      set(val) {
        this.$store.dispatch('theme/changeSettings', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    handleCommand(command) {
      switch(command){
        case 'about':
          this.showAbout = true
          break;
        case 'logout':
          break;
      }
    },
    changeAboutShow(val){
      this.showAbout = val
    },
  }
}
</script>

<style lang="scss" scoped>
.app-topbar {
  position: relative;
  top: 0;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e6e6e6;
  .icon-container {
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    margin: 15px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
