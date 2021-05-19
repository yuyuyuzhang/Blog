<template>
  <a-tabs
    :active-key="activeKey"
    type="line"
    @change="handleChangeTab">
    <a-tab-pane 
      v-for="item in tabs" 
      :key="item.key">
      <!-- 自定义页签头 -->
      <template slot="tab">
        <a-icon type="smile"></a-icon>
        {{ item.tab }}
      </template>
      <!-- 自定义页签内容 -->
      <template v-if="item.key === 1">我是小可爱</template>
      <template v-else-if="item.key === 2">我是小可爱111</template>
      <template v-else>我是小可爱222</template>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  data(){
    return {
      activeKey: 1,
      tabs: [
        { key: 1, tab: '哈哈' },
        { key: 2, tab: '呵呵'},
        { key: 3, tab: '嘿嘿'},
        { key: 4, tab: '嘿嘿'},
        { key: 5, tab: '嘿嘿'},
        { key: 6, tab: '嘿嘿'},
        { key: 7, tab: '嘿嘿'},
        { key: 8, tab: '嘿嘿'},
        { key: 9, tab: '嘿嘿'},
        { key: 10, tab: '嘿嘿'},
        { key: 11, tab: '嘿嘿'},
        { key: 12, tab: '嘿嘿'},
        { key: 13, tab: '嘿嘿'},
        { key: 14, tab: '嘿嘿'}
      ]
    }
  },
  methods: {
    /**
     * @description 切换选项卡的回调
     * @param activeKey 当前选项卡的 key
     */
    handleChangeTab(activeKey){
      this.activeKey = activeKey
      console.log(this.activeKey)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>