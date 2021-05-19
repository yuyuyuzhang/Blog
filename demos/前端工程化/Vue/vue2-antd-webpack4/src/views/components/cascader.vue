<template>
  <div>
    <!-- 可搜索 -->
    <a-cascader
      v-model="value1"
      :options="cascaderData1"
      :fieldNames="{ label: 'title', value: 'content', children: 'children' }"
      :show-search="{ filter: handleFilter }"
      :allow-clear="true"
      :change-on-select="true"
      expand-trigger="click"
      @change="handleChange1">
      <!-- 自定义搜索框图标 -->
      <template slot="suffixIcon">
        <a-icon type="smile"></a-icon>
      </template>

      <!-- 自定义渲染已选项：默认以 / 分割 -->
      <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
        <span v-for="(item, index) in labels" :key="item">
          {{ item + (index === labels.length - 1 ? '' : ' -') }}
        </span>
      </template>
    </a-cascader>

    <!-- 异步加载 -->
    <a-cascader
      v-model="value2"
      :options="cascaderData2"
      :load-data="handleLoad"
      :fieldNames="{ label: 'title', value: 'content', children: 'children' }"
      :allow-clear="true"
      :change-on-select="true"
      expand-trigger="click">
      <!-- 自定义搜索框图标 -->
      <template slot="suffixIcon">
        <a-icon type="smile"></a-icon>
      </template>

      <!-- 自定义渲染已选项：默认以 / 分割 -->
      <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
        <span v-for="(item, index) in labels" :key="item">
          {{ item + (index === labels.length - 1 ? '' : ' -') }}
        </span>
      </template>
    </a-cascader>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value1: [],
      cascaderData1: [
        { title: 'a', content: 'a11111', children: [
          { title: 'a1', content: 'fffffff' },
          { title: 'a2', content: 'gggggg', children: [
            { title: 'a2d', content: '555555' }
          ] }
        ] },
        { title: 'b', content: 'b22222222222' },
        { title: 'c', content: 'c33333', children: [
          { title: 'c33', content: '5555fffff' }
        ] },
        { title: 'd', content: 'd444444' },
      ],
      value2: [],
      cascaderData2: [
        { title: 'a', content: 'a11111', isLeaf: false },
        { title: 'b', content: 'b22222222222' },
        { title: 'c', content: 'c33333', isLeaf: false },
        { title: 'd', content: 'd444444' },
      ]
    }
  },
  methods: {
    /**
     * @description 自定义筛选函数
     * @param inputValue 搜索内容
     * @param path 当前筛选项路径
     * @return boolean
     */
    handleFilter(inputValue, path){
      return path.some(option => option.title.includes(inputValue));
    },
    /**
     * @description 选择完成后的回调
     * @param value 选中项的 value 属性
     * @param selectedOptions 选中项数组
     */
    handleChange1(value, selectedOptions){
      this.value1 = value
    },
    /**
     * @description 点击节点动态加载子节点回调
     * @param selectedOptions 选中项数组
     */
    handleLoad(selectedOptions){
      // 当前点击节点为选中项数组最后一位
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      
      // 定时器模拟后端请求
      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = [
          { title: 'a1', content: 'fffffff' },
          { title: 'a2', content: 'gggggg' }
        ]
        this.cascaderData2 = [...this.cascaderData2]
      }, 1000)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>