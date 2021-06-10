<template>
  <a-table
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
    :expand-icon="expandIcon"
    :default-expand-all-rows="true"
    :indent-size="20"
    size="small"
    class="table">
    <a-table-column 
      title="姓名" 
      data-index="name">
      <template slot-scope="text, record, index, column">
        <a-input v-if="record.isEdit" v-model="record.newName"></a-input>
        <span v-else>{{ text }}</span>
      </template>
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
    </a-table-column>
    <a-table-column 
      title="性别" 
      data-index="gender"
      :filter-multiple="false">
      <template slot-scope="text, record, index, column">
        <span v-if="record.gender === 'man'">男</span>
        <span v-else>女</span>
      </template>
      <!-- 自定义性别列筛选菜单 -->
      <template 
        slot="filterDropdown" 
        slot-scope="slotScope">
        <div style="padding: 8px;">
          <a-radio-group 
            v-model="searchGender"
            style="display: block; margin-bottom: 8px;">
            <a-radio
              v-for="item in genderFilters"
              :key="item.value"
              :value="item.value"
              style="display: block;">
              {{ item.text }}
            </a-radio>
          </a-radio-group>
          <a-button 
            type="primary" 
            size="small" 
            @click="handleSearchGender(slotScope)">
            确定
          </a-button>
          <a-button 
            size="small" 
            @click="handleResetGender(slotScope)">
            重置
          </a-button>
        </div>
      </template>
    </a-table-column>
    <a-table-column 
      title="邮箱" 
      data-index="email" 
      ellipsis
      :filter-multiple="true">
      <!-- 自定义邮箱列筛选菜单 -->
      <template 
        slot="filterDropdown" 
        slot-scope="slotScope">
        <div style="padding: 8px;">
          <a-checkbox-group 
            v-model="searchEmail"
            style="display: block; margin-bottom: 8px;">
            <a-checkbox
              v-for="item in emailFilters"
              :key="item.value"
              :value="item.value"
              style="display: block; margin-left: 0;">
              {{ item.text }}
            </a-checkbox>
          </a-checkbox-group>
          <a-button 
            type="primary" 
            size="small" 
            @click="handleSearchEmail(slotScope)">
            确定
          </a-button>
          <a-button 
            size="small" 
            @click="handleResetEmail(slotScope)">
            重置
          </a-button>
        </div>
      </template>
    </a-table-column>
    <a-table-column 
      title="年龄" 
      data-index="age" 
      :default-sort-order="['ascend']" 
      :sorter="handleSortAge">
    </a-table-column>
    <a-table-column 
      title="操作" 
      data-index="operation">
      <template slot-scope="text, record, index, column">
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
    </a-table-column>
  </a-table>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      isTable: true,
      tableData: [],
      initTableData: [], // 用于筛选时保存初始数据
      pagination: {},
      selectedRowKeys: [], // 选中项的 key 数组
      searchName: '',
      searchGender: '',
      genderFilters: [
        { value: "man", text: "男" },
        { value: "woman", text: "女" },
      ],
      searchEmail: [],
      emailFilters: [
        { value: "@qq.com", text: "qq 邮箱" },
        { value: "@163.com", text: "163 邮箱" },
        { value: "@128.com", text: "128 邮箱" },
      ]
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
            children: [
              {
                name: '李哈哈',
                gender: 'man',
                email: '21111111@qq.com',
                age: 23,
                isEdit: false,
                children: [
                  {
                    name: '李瓜瓜',
                    gender: 'woman',
                    email: '432222@qq.com',
                    age: 45,
                    isEdit: false
                  }
                ]
              },
              {
                name: '李嘿嘿',
                gender: 'woman',
                email: '2333333@163.com',
                age: 21,
                isEdit: false
              }
            ]
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
     * @description 自定义展开图标
     * @param props 
     * @returns node 返回 Node 节点，什么都不返回会影响父子节点缩进
     */
    expandIcon(props){
      if(props.record.hasOwnProperty('children') && props.record.children.length > 0){
        if (props.expanded) {
          return <a-icon type="caret-down" onClick={e => {
              props.onExpand(props.record, e)}}></a-icon>
        } else {
          return <a-icon type="caret-right" onClick={e => {
              props.onExpand(props.record, e)}}></a-icon>
        }
      } else{
        //什么都不返回会影响树状表格的缩进
        return <a style="color:'#909399'"></a>
      }
    },
    /**
     * @description 选中行数据的回调
     * @param selectedRowKeys 所有选中行的 key 数组
     */
    handleSelect(selectedRowKeys){
      this.selectedRowKeys = selectedRowKeys
    },
    /**
     * @description 需要进行深度优先遍历，性别和邮箱的筛选也是一样
     */
    handleSearchName(slotScope) {
      console.log(slotScope)
      slotScope.confirm()
      this.tableData = this.initTableData.filter(item => item[slotScope.column.dataIndex].includes(this.searchName))
    },
    handleResetName(slotScope) {
      this.searchName = ''
      slotScope.clearFilters()
      this.tableData = this.initTableData
    },
    handleSearchGender(slotScope){
      slotScope.confirm()
      this.tableData = this.initTableData.filter(item => item[slotScope.column.dataIndex] === this.searchGender)
    },
    handleResetGender(slotScope){
      this.searchGender = ''
      slotScope.clearFilters()
      this.tableData = this.initTableData
    },
    handleSearchEmail(slotScope){
      slotScope.confirm()
      const result = []
      this.searchEmail.forEach(item1 => {
        result.push(...this.initTableData.filter(item => item[slotScope.column.dataIndex].includes(item1)))
      })
      this.tableData = result
    },
    handleResetEmail(slotScope){
      this.searchEmail = []
      slotScope.clearFilters()
      this.tableData = this.initTableData
    },
    /**
     * @description 排序回调
     * @param rowA 前一个行数据
     * @param rowB 后一个行数据
     * @returns boolean
     */
    handleSortAge(rowA, rowB){
      return rowA.age - rowB.age
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
