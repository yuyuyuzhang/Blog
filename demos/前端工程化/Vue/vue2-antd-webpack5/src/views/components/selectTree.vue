<template>
  <div>
    <!-- 单选：treeNodeFilterProp 指定根据哪个属性值进行筛选 -->
    <a-tree-select
      v-model="value1"
      :tree-data="treeData1"
      show-search
      treeNodeFilterProp="title"
      allow-clear
      :tree-default-expand-all="true"
      style="width: 200px;"
      @change="handleChange1">
      <!-- 自定义后缀图标 -->
      <template slot="suffixIcon">
        <a-icon type="search" />
      </template>
    </a-tree-select>

    <!-- 多选 -->
    <a-tree-select
      v-model="value2"
      :tree-data="treeData2"
      show-search
      treeNodeFilterProp="title"
      tree-checkable
      multiple
      allow-clear
      :tree-default-expand-all="true"
      style="width: 200px;"
      @change="handleChange2">
      <!-- 自定义后缀图标 -->
      <template slot="suffixIcon">
        <a-icon type="search" />
      </template>
    </a-tree-select>

    <!-- 异步加载数据 -->
    <a-tree-select
      v-model="value3"
      tree-data-simple-mode
      :load-data="handleLoad"
      :tree-data="treeData3"
      show-search
      treeNodeFilterProp="title"
      allow-clear
      style="width: 200px;"
      @change="handleChange3">
      <!-- 自定义后缀图标 -->
      <template slot="suffixIcon">
        <a-icon type="search" />
      </template>
    </a-tree-select>
  </div>
</template>

<script>
export default {
  data(){
    return {
      value1: '',
      treeData1: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
              disabled: true,
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
      value2: [],
      treeData2: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
              disabled: true,
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1',
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2',
            },
          ],
        },
      ],
      value3: '',
      treeData3: [
        { id: 1, pId: 0, value: '1', title: 'Node 1', isLeaf: true },
        { id: 2, pId: 0, value: '2', title: 'Node 2', isLeaf: false },
        { id: 3, pId: 0, value: '3', title: 'Node 3', isLeaf: true },
      ],
    }
  },
  methods: {
    /**
     * @description 点击节点异步加载子节点的回调
     * @param treeNode 当前点击节点
     */
    handleLoad(treeNode){
      return new Promise((resolve, reject) => {
        // 定时器模拟后端请求
        setTimeout(() => {
          const children = [
            { id: 4, pId: 2, value: '4', title: 'Node 4', isLeaf: true },
            { id: 5, pId: 2, value: '5', title: 'Node 5', isLeaf: true },
          ]
          treeNode.dataRef.children = children

          // 刷新树
          this.treeData3 = [...this.treeData3]
          resolve();
        }, 300);
      });
    },
    /**
     * @description 选中树节点时的回调
     * @param value 所有选中项的 value 数组
     * @param label 所有选中项的 title 数组
     * @param extra 额外信息
     */
    handleChange1(value, label, extra){
      console.log(this.value1)
      console.log(value)
      console.log(label)
      console.log(extra)
    },
    handleChange2(value, label, extra){
      console.log(this.value2)
      console.log(value)
      console.log(label)
      console.log(extra)
    },
    handleChange3(value, label, extra){
      console.log(this.value3)
      console.log(value)
      console.log(label)
      console.log(extra)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>