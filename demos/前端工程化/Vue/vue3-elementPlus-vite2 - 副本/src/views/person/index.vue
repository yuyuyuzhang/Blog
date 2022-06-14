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

    <el-table></el-table>

    <el-pagination></el-pagination>

    <el-dialog></el-dialog>
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
  }
})
</script>

<style lang="scss" scoped>
</style>