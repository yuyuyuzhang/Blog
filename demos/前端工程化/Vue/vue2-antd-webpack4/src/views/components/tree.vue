<template>
  <div>
    <a-input-search 
      v-model="searchText" 
      @search="handleSearch"
      placeholder="请输入"
      style="width: 200px;">
    </a-input-search>

    <a-tree
      :treeData="treeData"
      :replaceFields="{
        title: 'name',
        key: 'name'
      }"
      :checkable="true"
      :draggable="true"
      @drop="handleDrop">
    </a-tree>
  </div>
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
            children: [
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
     * @description 拖拽节点时的放置回调
     * @param dragNode 拖拽节点
     * @param node 放置节点
     * @param dropToGap 是否放置到节点内部
     * @param dropPosition 放置位置
     */
    handleDrop({ dragNode, node, dropToGap, dropPosition }){
      const dropNode = node
      const dragData = dragNode.dataRef

      // 删除旧位置的拖拽节点
      this.deleteOldNode(dragNode)
      
      // 添加拖拽节点到新位置
      // 拖拽节点成为放置节点的子节点
      if(!dropToGap){
        // 展开放置节点
        dropNode.expanded = true
        // 放置节点有子节点
        if(dropNode.$children && dropNode.$children.length){
          dropNode.dataRef.children.push(dragData)
        } else{
          // 放置节点没有子节点
          dropNode.dataRef.children = [dragData]
        }
      } else{
        // 拖拽节点成为放置节点的同级节点（上一个兄弟节点、下一个兄弟节点）
        const dropPosArr = dropNode.pos.split('-')
        const dropPos = Number.parseInt(dropPosArr[dropPosArr.length - 1]) // 放置节点的位置级别
        // 上一个兄弟节点
        if(dropPosition === dropPos - 1){
          // 放置节点不是根节点
          if(dropNode.$parent && dropNode.$parent.dataRef){
            const dropIndex = dropNode.$parent.dataRef.children.findIndex(item => item.name === dropNode.dataRef.name)
            dropNode.$parent.dataRef.children.splice(dropIndex, 0, dragData)
          } else{
            // 放置节点是根节点
            const dropIndex = this.treeData.findIndex(item => item.name === dropNode.dataRef.name)
            this.treeData.splice(dropIndex, 0, dragData) // 数组指定索引初添加某项
          }
        } else if(dropPosition === dropPos + 1){
          // 下一个兄弟节点
          // 放置节点不是根节点
          if(dropNode.$parent && dropNode.$parent.dataRef){
            const dropIndex = dropNode.$parent.dataRef.children.findIndex(item => item.name === dropNode.dataRef.name)
            dropNode.$parent.dataRef.children.splice(dropIndex + 1, 0, dragData)
          } else{
            // 放置节点是根节点
            this.treeData.push(dragData)
          }
        }
      }

      // 刷新树
      this.treeData = [...this.treeData]
    },
    /**
     * @description 删除旧位置的拖拽节点
     * @param dragNode 拖拽节点
     */
    deleteOldNode(dragNode){
      // 删除旧位置的拖拽节点
      if(dragNode.$parent && dragNode.$parent.dataRef){
        // 拖拽节点不是根节点
        if(dragNode.$parent.dataRef.children.length === 1){
          // 拖拽节点没有兄弟节点，直接删除父节点的 children 属性
          Reflect.deleteProperty(dragNode.$parent.dataRef, 'children')
        } else{
          // 拖拽节点有兄弟节点，进行过滤
          dragNode.$parent.dataRef.children = dragNode.$parent.dataRef.children.filter(item => item.name !== dragNode.dataRef.name)
        }
      } else{
        // 拖拽节点是根节点
        this.treeData = this.treeData.filter(item => item.name !== dragNode.dataRef.name)
      }
    },
    /**
     * @description 搜索时进行深度优先遍历
     */
    handleSearch(){
      console.log(this.searchText)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
