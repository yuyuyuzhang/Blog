<template>
  <a-calendar
    v-model="chooseDate"
    :disabled-date="getDisabledDate"
    :fullscreen="true"
    class="myCalendar"
    @panelChange="handlePanelChange"
    @select="handleSelect"
    @change="handleChange">
    <!-- 月：自定义渲染日单元格 -->
    <template slot="dateCellRender" slot-scope="moment">
      <ul class="events">
        <li v-for="item in getDayData(moment)" :key="item.content">
          <a-badge :status="item.type" :text="item.content"></a-badge>
        </li>
      </ul>
    </template>

    <!-- 年：自定义渲染月单元格 -->
    <template slot="monthCellRender" slot-scope="moment">
      <ul class="events">
        <li v-for="item in getMonthData(moment)" :key="item.content">
          <a-badge :status="item.type" :text="item.content"></a-badge>
        </li>
      </ul>
    </template>
  </a-calendar>
</template>

<script>
export default {
  data(){
    return {
      mode: 'month', // 默认模式是月
      chooseDate: null,
      choose: '',
    }
  },
  methods: {
    /**
     * @description 不可选择的日期
     * @param currentDate 当前日期
     * @return boolean
     */
    getDisabledDate(currentDate){
      if(this.mode === 'month'){
        switch(currentDate.date()){
          case 5:
          case 6:
          case 7:
          case 8:
            return true; // 禁止 5、6、7、8 号
          default:
            return false
        }
      } else{
        // console.log(currentDate.month())
        switch(currentDate.month()){
          case 1:
          case 2:
            console.log(true)
            return true; // 禁止 2、3 月（月份从 0 开始）
          default:
            return false
        }
      }
    },
    getDayData(moment){
      switch(moment.date()){
        case 15:
          return [
            { type: 'warning', content: '吃药' },
            { type: 'success', content: '庆祝生日' }
          ]
        case 23:
          return [
            { type: 'error', content: '去医院' }
          ]
        default:
          return []
      }
    },
    getMonthData(moment){
      // moment.month() 月份从 0 开始
      switch(moment.month()){
        case 3:
          return [
            { type: 'warning', content: '吃药' },
            { type: 'success', content: '庆祝生日' },
            { type: 'error', content: '去医院' }
          ]
        default:
          return []
      }
    },
    /**
     * 切换日期面板的回调
     * @param moment 当前日期的 moment 对象
     * @param mode 日期面板的模式：month/year
     */
    handlePanelChange(moment, mode){
      this.mode = mode
      console.log(moment.format())   // 规范时间 "2021-04-23T14:31:04+08:00"
      console.log(moment.calendar()) // 相对时间 "今天14:31"
      console.log(moment.year())     // 2021
      console.log(moment.month())    // 3 (月份从 0 开始)
      console.log(moment.date())     // 23
      console.log(moment.hour())     // 14
      console.log(moment.minute())   // 31
      console.log(moment.second())   // 4
    },
    /**
     * @description 手动选择日期的回调
     * @param moment 当前日期的 moment 对象
     */
    handleSelect(){
      this.choose = this.chooseDate.format().substring(0, this.mode === 'month' ? 10 : 7)
      console.log(this.chooseDate.format())
      console.log(this.choose)
    },
    /**
     * @description 选中日期变化的回调，日期面板变化可能导致选中日期变化
     * @param moment 当前日期的 moment 对象
     */
    handleChange(){
      this.choose = this.chooseDate.format().substring(0, this.mode === 'month' ? 10 : 7)
      console.log(this.chooseDate.format())
      console.log(this.choose)
    }
  }
}
</script>

<style lang="scss" scoped>
.myCalendar >>> .ant-fullcalendar-month-panel-cell-disabled {
  .ant-fullcalendar-value {
    color: rgba(0, 0, 0, 0.25)!important;
  }
}
.events {
  list-style: none;
  margin: 0;
  padding: 0;
  .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
}
</style>