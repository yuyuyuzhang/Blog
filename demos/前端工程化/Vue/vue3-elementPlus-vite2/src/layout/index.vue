<template>
  <el-row class="app-wrapper">
    <el-col :span="4">
      <el-scrollbar>
        <sidebar></sidebar>
      </el-scrollbar>
    </el-col>
    
    <el-col :span="20">
      <topbar></topbar>
      <container></container>
    </el-col>
  </el-row>
</template>

<script>
import Sidebar from './components/Sidebar/index.vue'
import Topbar from './components/Topbar/index.vue'
import Container from './components/Container/index.vue'

export default ({
  components: {
    Sidebar,
    Topbar,
    Container,
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  },
})
</script>

<style lang="scss" scoped>
.el-scrollbar {
  border-right: solid 1px #e6e6e6;
}
.el-menu {
  border-right: none;
}
</style>
