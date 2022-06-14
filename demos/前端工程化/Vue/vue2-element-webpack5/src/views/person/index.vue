<template>
  <section class="person">
    <el-form 
      ref="searchForm" 
      :model="searchForm" 
      :rules="searchFormRules" 
      :inline="true"
      size="small">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="searchForm.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="searchForm.gender" clearable>
          <el-option 
            v-for="item in genderOptions" 
            :key="item.key" 
            :value="item.key" 
            :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          :loading="isSearchLoading"
          @click="handleSearch">
          查询
        </el-button>
        <el-button 
          :loading="isResetLoading"
          @click="handleReset">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-table 
      ref="personTable"
      v-loading="isTableLoading"
      height="100px"
      v-table-height-adaptive="{ bottomOffset: 50 }"
      :data="tableData"
      size="small"
      :default-sort="{ order: 'ascending' }"
      @selection-change="handleSelection">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column 
        label="姓名" 
        prop="name" 
        show-overflow-tooltip
        sortable="custom"
        :sort-method="handleSortName">
      </el-table-column>
      <el-table-column label="性别" prop="gender" width="100"></el-table-column>
      <el-table-column label="年龄" prop="age" sortable></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button 
            size="mini" 
            type="primary" 
            @click.stop="handleEditDialogShow(scope.row)">
            编辑
          </el-button>
          <el-button 
            :loading="scope.row.isDelLoading"
            size="mini" 
            @click.stop="handleDel(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="searchForm.page"
      :page-size="searchForm.size"
      :total="total"
      :page-sizes="[20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      class="table-page">
    </el-pagination>

    <el-dialog 
      title="编辑" 
      :visible.sync="editDialogVisiable"
      class="person-dialog">
      <el-form 
        ref="editDialogForm" 
        :model="editDialogForm" 
        :rules="editDialogFormRules" 
        :inline="true"
        label-width="100px"
        size="small"
        class="person-dialog-form">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editDialogForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editDialogForm.gender" clearable>
            <el-option 
              v-for="item in genderOptions" 
              :key="item.key" 
              :value="item.key" 
              :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editDialogForm.age" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button 
          :loading="isEditDialogFormLoading"
          type="primary" 
          @click="handleEditDialogFormSubmit">
          确定
        </el-button>
        <el-button @click="editDialogVisiable = false;">
          取消
        </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default ({
  name: 'person',
  components: {},
  data() {
    return {
      searchForm: {
        name: '',
        gender: '',
        page: 1,
        size: 20
      },
      searchFormRules: {},
      genderOptions: [
        { key: 'woman', label: '女' },
        { key: 'man', label: '男' }
      ],
      tableData: [],
      total: 0,
      isSearchLoading: false,
      isResetLoading: false,

      editDialogVisiable: false,
      isEditDialogFormLoading: false,
      editDialogForm: {
        id: '',
        name: '',
        gender: '',
        age: '',
      },
      editDialogFormRules: {}
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      this.isTableLoading = true
      return new Promise((resolve, reject) => {
        // this.$http({
        //   url: '/person/data',
        //   method: 'post',
        //   data: this.searchForm
        // })
        //   .then(res => {
        //     this.isTableLoading = false
        //     if(res && Array.isArray(res.data) && res.data.length) {
        //       const { data, page, size, total } = res
        //       this.tableData = data.map(item => ({
        //         ...item,
        //         isDelLoading: false
        //       }))
        //       this.total = total
        //     } else {
        //       this.tableData = []
        //       this.total = 0
        //     }
        //     resolve()
        //   })
        //   .catch(err => {
        //     this.$message.error(err)
        //     this.isTableLoading = false
        //     this.tableData = []
        //     reject()
        //   })

        const res = [
          {
            id: 1,
            name: '张三',
            gender: 'woman',
            age: 26
          },
          {
            id: 2,
            name: '李四',
            gender: 'man',
            age: 30
          }
        ]
        this.tableData = res.map(item => ({
          ...item,
          isDelLoading: false
        }))
        this.isTableLoading = false
        resolve()
      })
    },
    async handleSearch() {
      this.isSearchLoading = true
      await this.getTableData()
      this.isSearchLoading = false
    },
    async handleReset() {
      this.isResetLoading = true
      this.searchForm.name = ''
      this.searchForm.gender = ''
      await this.getTableData()
      this.isResetLoading = false
    },
    handlePageChange(page) {
      this.searchForm.page = page
      this.getTableData()
    },
    handleSizeChange(size) {
      this.searchForm.size = size
      this.getTableData()
    },
    handleEditDialogShow({ id, name, gender, age }) {
      this.editDialogForm = {
        id: id,
        name: name,
        gender: gender,
        age: age
      }
      this.editDialogVisiable = true
    },
    handleEditDialogFormSubmit() {
      this.isEditDialogFormLoading = true
      this.$http({
        url: '/person/edit',
        method: 'post',
        data: this.editDialogForm
      })
        .then(res => {
          this.isEditDialogFormLoading = false
          if(res) {
            this.editDialogVisiable = false
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(err => {
          this.$message.error(err)
          this.isEditDialogFormLoading = false
        })
    },
    handleDel(row) {
      // const index = this.tableData.findIndex(item => item.id === row.id)
      // this.$set(this.tableData, index, {
      //   ...row,
      //   isDelLoading: true
      // })
      row.isDelLoading = true
      this.$http({
        url: '/person/del',
        method: 'post',
        data: {
          id: row.id
        }
      })
        .then(res => {
          // this.$set(this.tableData, index, {
          //   ...row,
          //   isDelLoading: false
          // })
          row.isDelLoading = false
          this.$message({
            type: res? 'success' : 'error',
            message: res.msg,
            duration: 100
          })
        })
        .catch(err => {
          row.isDelLoading = false
          this.$message.error(err)
          // this.$set(this.tableData, index, {
          //   ...row,
          //   isDelLoading: false
          // })
        })
    },
    handleSortName(a, b) {
      console.log(a)
      console.log(b)
    },
    handleSelection(selection) {
      console.log('selection:', selection)
    },
  }
})
</script>

<style lang="scss" scoped>
.person {
  position: relative;
  height: 100%;
  &-dialog {
    &-form {
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>