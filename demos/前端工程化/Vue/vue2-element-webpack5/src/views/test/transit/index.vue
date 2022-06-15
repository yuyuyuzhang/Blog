<template>
  <section class="transit">
    <h2>Vue 过渡</h2>

    <el-button @click="showP = !showP">切换显示</el-button>
    <transition name="small">
      <div v-if="showP" class="text">我是小可爱</div>
    </transition>
    <transition name="big">
      <div v-if="showP" class="text">我是大可爱</div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'transit',
  data() {
    return {
      showP: true,
    }
  }
};
</script>

<style lang="scss" scoped>
.transit {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  .text {
    width: 100px;
  }

  // CSS 过渡
  .small-enter-active {
    transition: all .3s ease;
  }
  .small-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .small-enter, 
  .small-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  // CSS 动画
  .big-enter-active {
    animation: bigAnimate 1s;
  }
  .big-leave-active {
    animation: bigAnimate 1s reverse;
  }
  @keyframes bigAnimate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>