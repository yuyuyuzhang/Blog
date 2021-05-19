<template>
  <a-tree
    :load-data="handleLoadData"
    :treeData="treeData"
    :replaceFields="{
      title: 'name',
      key: 'name'
    }"
    :checkable="true"
    :draggable="true">
  </a-tree>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isTree: false,
      treeData: [],
      searchText: '',
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.getTreeData();
    });
  },
  methods: {
    getTreeData() {
      this.isTree = true
      // 定时器模拟后端请求
      setTimeout(() => {
        this.isTree = true
        this.treeData = [
          {
            name: "张三",
            gender: "woman",
            email: "111111111@qq.com",
            age: 34,
            isEdit: false,
            isLeaf: true,
          },
          {
            name: "李四",
            gender: "woman",
            email: "222222222@128.com",
            age: 20,
            isEdit: false,
            isLeaf: false, // 拥有子节点
          },
          {
            name: "王五",
            gender: "man",
            email: "333333333@163.com",
            age: 30,
            isEdit: false,
            isLeaf: true,
          },
        ];
      }, 1000);
    },
    /**
     * @description 点击节点时异步加载子节点数据
     * @param currNode 当前点击节点
     */
    handleLoadData(currNode){
      // 必须返回 Promise
      return new Promise((resolve, reject) => {
        // 定时器模拟异步请求
        setTimeout(() => {
          currNode.dataRef.children = [
            {
              name: '李哈哈',
              gender: 'man',
              email: '21111111@qq.com',
              age: 23,
              isEdit: false,
              isLeaf: true
            },
            {
              name: '李嘿嘿',
              gender: 'woman',
              email: '2333333@163.com',
              age: 21,
              isEdit: false,
              isLeaf: true
            }
          ]
          this.treeData = [...this.treeData]
          resolve()
        }, 1000)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
