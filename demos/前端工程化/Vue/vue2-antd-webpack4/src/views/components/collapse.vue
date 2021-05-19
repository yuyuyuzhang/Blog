<template>
  <a-collapse
    :active-key="activeKey"
    accordion
    @change="handleChange">
    <!-- 自定义切换图标 -->
    <template slot="expandIcon" slot-scope="props">
      <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0"></a-icon>
    </template>

    <a-collapse-panel
      v-for="item in panels"
      :key="item.key">
      <!-- 自定义头部内容 -->
      <template slot="header">
        <a-icon type="smile"></a-icon>
        {{ item.header }}
      </template>

      <!-- 自定义右上角内容 -->
      <template slot="extra">
        <a-icon type="user"></a-icon>
      </template>

      <!-- 自定义面板内容 -->
      <template v-if="activeKey === '1'">哈哈哈</template>
      <template v-else-if="activeKey === '2'">呵呵呵</template>
      <template v-else>嘿嘿嘿</template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
export default {
  data(){
    return {
      activeKey: '', // 必须是字符串
      panels: [
        { key: '1', header: 'haha' },
        { key: '2', header: 'hehe' },
        { key: '3', header: 'wawa' }
      ]
    }
  },
  methods: {
    handleChange(key){
      this.activeKey = key
    }
  }
}
</script>

<style lang="scss" scoped>
</style>