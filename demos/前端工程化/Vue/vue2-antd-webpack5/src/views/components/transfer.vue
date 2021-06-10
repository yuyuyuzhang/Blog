<template>
  <a-transfer
    :titles="['来源', '目的']"
    :data-source="transferData"
    :render="record => record.title"
    :target-keys="targetKeys"
    :show-search="true"
    :filter-option="handleFilter"
    :showSelectAll="true"
    :selected-keys="selectedKeys"
    @change="handleChange"
    @selectChange="handleSelect">
  </a-transfer>
</template>

<script>
export default {
  data(){
    return {
      transferData: [   // 左侧来源
        { key: 'a', title: 'a', description: '11111111' },
        { key: 'b', title: 'b', description: '2222222' },
        { key: 'c', title: 'c', description: '33333333' },
        { key: 'd', title: 'd', description: '4444444' },
        { key: 'e', title: 'e', description: '555555' },
        { key: 'f', title: 'f', description: '6666666' },
        { key: 'g', title: 'g', description: '777777777' },
        { key: 'h', title: 'h', description: '888888' }
      ], 
      targetKeys: [     // 右侧目标 key 数组
        'b',
        'c', 
        'd' 
      ],   
      selectedKeys: [], // 左右两侧选中项 key 数组
    }
  },
  methods: {
    /**
     * @description 自定义筛选函数
     * @param inputValue 搜索内容
     * @param option     当前筛选项
     */
    handleFilter(inputValue, option){
      // 默认以 title 属性搜索
      return option.description.includes(inputValue)
    },
    /**
     * @description 选中项改变时的回调
     * @param sourceSelectedKeys 左侧来源选中项 key 数组
     * @param targetSelectedKeys 右侧目标选中项 key 数组
     */
    handleSelect(sourceSelectedKeys, targetSelectedKeys){
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    },
    /**
     * @description 选项在两边之间转移的回调
     * @param targetKeys 转移后的右侧目标 key 数组
     * @param direction  转移方向
     * @param moveKeys   转移项 key 数组
     */
    handleChange(targetKeys, direction, moveKeys){
      this.targetKeys = targetKeys
    },
  }
}
</script>

<style lang="scss" scoped>
</style>