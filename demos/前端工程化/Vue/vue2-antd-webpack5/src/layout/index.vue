<template>
  <div class="layout flex-row">
    <app-sider></app-sider>
    <div class="layout-right flex-column">
      <app-header></app-header>
      <app-content></app-content>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import AppSider from './components/appSider/index.vue';
import AppHeader from './components/appHeader/index.vue';
import AppContent from './components/appContent/index.vue';
import AppFooter from './components/appFooter/index.vue';

export default ({
  components: {
    AppSider,
    AppHeader,
    AppContent,
    AppFooter,
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/index.scss';

.layout {
  width: 100%;
  height: 100%;
  &-right {
    flex: 1;
    height: 100%;
  }
}
</style>
