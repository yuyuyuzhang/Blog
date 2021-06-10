<template>
  <div>
    <!-- 统计数值 -->
    <a-statistic
      title="上升百分比"
      :value="11.28"
      :precision="2"
      suffix="%">
      <template slot="prefix">
        <a-icon type="arrow-up"></a-icon>
      </template>
    </a-statistic>

    <!-- 倒计时 -->
    <a-statistic-countdown
      title="倒计时"
      :value="deadline"
      @finish="handleFinish">
      <!-- 自定义数值展示 -->
      <template slot="formatter">
      </template>
    </a-statistic-countdown>
  </div>
</template>

<script>
export default {
  data(){
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
    }
  },
  methods: {
    /**
     * @description 倒计时结束的回调
     */
    handleFinish(){
      console.log('倒计时结束！')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>