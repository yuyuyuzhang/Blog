<template>
  <a-pagination
    v-model="page"
    :pageSize.sync="pageSize"
    :defaultPageSize="10"
    :total="total"
    :showSizeChanger="true"
    :showTotal="total => `共 ${total} 条数据`"
    :showQuickJumper="true"
    @change="handlePage"
    @showSizeChange="handlePageSize">
  </a-pagination>
</template>

<script>
export default {
  data(){
    return {
      page: 1,
      pageSize: 10,
      total: 150,
      pageSizeOptions: [10, 20, 30, 50]
    }
  },
  methods: {
    /**
     * @description page 改变的回调
     * @param page 当前页码
     * @param pageSize 当前显示的每页条数
     */
    handlePage(page, pageSize){
      this.page = page
      console.log(this.page)
      console.log(this.pageSize)
    },
    /**
     * @description pageSize 改变的回调
     * @param current 当前页码
     * @param size 当前显示的每页条数
     */
    handlePageSize(current, size){
      this.pageSize = size
      console.log(this.page)
      console.log(this.pageSize)
    },
  }
}
</script>

<style lang="scss" scoped>
</style>