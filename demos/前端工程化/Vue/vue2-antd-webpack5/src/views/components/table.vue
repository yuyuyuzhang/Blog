<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :row-key="(record) => record.name"
    :row-selection="{
      type: 'checkbox',
      selectedRowKeys: selectedRowKeys,
      onChange: handleSelect
    }"
    :loading="isTable"
    :pagination="pagination"
    :scroll="{ x: 600, y: 500 }"
    size="small"
    class="table">
    <!-- 自定义姓名列筛选菜单：下拉搜索框 -->
    <template 
      slot="filterDropdown" 
      slot-scope="slotScope">
      <div style="padding: 10px">
        <a-input
          ref="searchNameInput"
          v-model="searchName"
          style="display: block; width: 185px; margin-bottom: 10px">
          <a-icon slot="prefix" type="search"></a-icon>
        </a-input>
        <a-button
          type="primary"
          size="small"
          icon="search"
          style="width: 90px"
          @click="handleSearchName(slotScope)">
          搜索
        </a-button>
        <a-button 
          size="small" 
          style="width: 90px"
          @click="handleResetName(slotScope)">
          重置
        </a-button>
      </div>
    </template>
    <!-- 自定义姓名列渲染内容：姓名列可编辑 -->
    <template 
      slot="customRenderName" 
      slot-scope="text, record, index, column">
      <a-input v-if="record.isEdit" v-model="record.newName"></a-input>
      <span v-else>{{ text }}</span>
    </template>
    <!-- 自定义性别列渲染内容 -->
    <template 
      slot="customRenderGender" 
      slot-scope="text, record, index, column">
      <span v-if="record.gender === 'man'">男</span>
      <span v-else>女</span>
    </template>
    <!-- 自定义操作列渲染内容 -->
    <template
      slot="customRenderOperation"
      slot-scope="text, record, index, column">
      <!-- 编辑：姓名单元格内容可编辑 -->
      <template v-if="record.isEdit">
        <a-button 
          type="primary" 
          size="small" 
          @click="handleEditSave(record)">
          保存
        </a-button>
        <a-button 
          size="small" 
          @click="handleEditCancel(record)">
          停止
        </a-button>
      </template>
      <template v-else>
        <a-button
          type="primary" 
          size="small" 
          icon="edit" 
          @click="handleEdit(record)">
          编辑
        </a-button>
      </template>
      <!-- 删除 -->
      <a-popconfirm 
        v-show="!record.isEdit"
        title="确定删除当前项吗？" 
        @confirm="handleDelete(index)">
        <a-button 
          size="small" 
          icon="delete">
          删除
        </a-button>
      </a-popconfirm>
    </template>
  </a-table>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isTable: true,
      columns: [],
      tableData: [],
      pagination: {},
      selectedRowKeys: [], // 选中项的 key 数组
      searchName: '',
      initTableData: [] // 用于姓名列筛选时保存初始数据
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.getTableData();
    });
  },
  methods: {
    getTableData() {
      this.isTable = true;
      // 定时器模拟后端请求
      setTimeout(() => {
        this.isTable = false;
        this.columns = [
          {
            title: "姓名",
            dataIndex: "name",
            ellipsis: true,
            scopedSlots: {
              customRender: 'customRenderName',
              filterDropdown: "filterDropdown", // 自定义姓名列筛选菜单
            },
          },
          {
            title: "性别",
            dataIndex: "gender",
            scopedSlots: {
              customRender: "customRenderGender", // 自定义性别列渲染内容
            },
            filterMultiple: false, // 单选
            filters: [
              { value: "man", text: "男" },
              { value: "woman", text: "女" },
            ],
            onFilter: (value, record) => record.gender === value,
          },
          {
            title: "邮箱",
            dataIndex: "email",
            ellipsis: true, // 内容过长缩略显示
            filterMultiple: true, // 多选
            filters: [
              { value: "@qq.com", text: "qq 邮箱" },
              { value: "@163.com", text: "163 邮箱" },
              { value: "@128.com", text: "128 邮箱" },
            ],
            onFilter: (value, record) => record.email.includes(value),
          },
          {
            title: "年龄",
            dataIndex: "age",
            defaultSortOrder: ['ascend'], // 默认升序
            sorter: (rowA, rowB) => rowA.age - rowB.age,
          },
          {
            title: "操作",
            dataIndex: "operation",
            scopedSlots: { customRender: "customRenderOperation" }, //自定义操作列渲染内容
          },
        ];
        this.tableData = [
          {
            name: "张三",
            gender: "woman",
            email: "111111111@qq.com",
            age: 34,
            isEdit: false,
          },
          {
            name: "李四",
            gender: "woman",
            email: "222222222@128.com",
            age: 20,
            isEdit: false,
          },
          {
            name: "王五",
            gender: "man",
            email: "333333333@163.com",
            age: 30,
            isEdit: false,
          },
        ];
        this.initTableData = this.tableData;
      }, 1000);
    },
    /**
     * @description 选中项改变回调
     * @param selectedRowKeys 所以选中项的 key 数组
     */
    handleSelect(selectedRowKeys){
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * @description 姓名列筛选搜索的回调
     * @param slotScope slot=filterDropdown 的 slotScope
     */
    handleSearchName(slotScope) {
      slotScope.confirm()
      this.tableData = this.initTableData.filter(item => item[slotScope.column.dataIndex].includes(this.searchName))
    },
    /**
     * @description 姓名列筛选重置的回调
     * @param slotScope slot=filterDropdown 的 slotScope
     */
    handleResetName(slotScope) {
      this.searchName = ''
      slotScope.clearFilters()
      this.tableData = this.initTableData
    },
    handleEdit(record){
      record.newName = record.name
      record.isEdit = true
    },
    handleEditSave(record){
      record.name = record.newName
      Reflect.deleteProperty(record, 'newName')
      record.isEdit = false
    },
    handleEditCancel(record){
      Reflect.deleteProperty(record, 'newName')
      record.isEdit = false
    },
    handleDelete(index) {
      this.tableData.splice(index, 1)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
