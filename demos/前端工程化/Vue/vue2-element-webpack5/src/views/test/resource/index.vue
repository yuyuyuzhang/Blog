<template>
  <section class="resource">
    自定义全局过滤器
    <div class="resource-filter">
      <div>{{ new Date() }}</div>
      <div>{{ new Date() | formatDate }}</div>
    </div>

    自定义混入
    <div class="resource-mixin">
      <el-table :data="tableData">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="{ row }">
            {{ row.gender === 'male' ? '公' : '母' }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="weight" label="体重">
          <template slot-scope="{ row }">
            {{ row.weight + ' 斤' }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    混入
    <div class="resource-mixin">
      <el-button @click="handleDel">删除</el-button>
    </div>
  </section>
</template>

<script>
import catMixin from '@/mixin/catMixin.js'

export default {
  name: 'resource',
  mixins: [
    catMixin
  ],
  created() {
    this.getTableData()
  },
  methods: {
    handleDel() {
      this.$confirm_custom({
        title: '删除',
        msg: '你确定要删除当前数据吗？',
        btn_ok_name: '确定',
        btn_no_name: '取消',
        ok_cb: () => {
          new Promise((resolve1, reject) => {
            Promise.resolve().then(res => {
              console.log('ok')
              resolve1()
            })
          })
        },
        no_cb: () => {
          new Promise((resolve1, reject) => {
            Promise.resolve().then(res => {
              console.log('no')
              resolve1()
            })
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.resource {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  &-filter,
  &-mixin {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
}
</style>