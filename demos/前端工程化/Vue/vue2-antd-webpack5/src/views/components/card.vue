<template>
  <div>
    <!-- 内容可配置卡片 -->
    <a-card
      title="标题"
      size="small"
      type="inner"
      hoverable>
      <!-- 自定义卡片右上角 -->
      <template slot="extra">
        <a-icon type="smile"></a-icon>
      </template>

      <!-- 自定义卡片封面 -->
      <template slot="cover">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
      </template>

      <!-- 自定义卡片主体内容 -->
      <a-card-meta 
        title="Card title" 
        description="This is the description">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-card-meta>

      <!-- 自定义卡片底部操作栏 -->
      <template slot="actions">
        <a-icon type="setting" />
        <a-icon type="edit" />
        <a-icon type="ellipsis" />
      </template>
    </a-card>


    <!-- 带页签的卡片 -->
    <a-card
      title="标题"
      size="small"
      type="inner"
      :loading="isCard"
      :tab-list="tabLists"
      :active-tab-key="activeKey"
      @tabChange="handleTabChange">
      <!-- 自定义卡片右上角 -->
      <template slot="extra">
        <a-icon type="smile"></a-icon>
      </template>

      <!-- 自定义 tab bar 上额外的内容 -->
      <template slot="tabBarExtraContent">
        <a-icon type="user"></a-icon>
      </template>

      <!-- 自定义卡片主体内容 -->
      <a-card-meta 
        title="Card title" 
        description="This is the description">
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-card-meta>

      {{ contentLists[activeKey] }}
    </a-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isCard: true,
      activeKey: '',
      tabLists: [],
      contentLists: {},
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getCardData()
    })
  },
  methods: {
    getCardData(){
      this.isCard = true
      setTimeout(() => {
        this.isCard = false
        this.activeKey = 'a'
        this.tabLists = [
          { key: 'a', tab: '111', content: '11111111' },
          { key: 'b', tab: '222', content: '2222222222' },
          { key: 'c', tab: '333', content: '333333333' },
          { key: 'd', tab: '444', content: '444444' },
          { key: 'e', tab: '555', content: '555555' }
        ]
        this.contentLists = {
          a: '11111111',
          b: '2222222222',
          c: '333333333',
          d: '444444',
          e: '555555'
        }
      }, 1000)
    },
    handleTabChange(key){
      this.activeKey = key
      console.log(key)
    },
  }
}
</script>

<style lang="scss" scoped>
.ant-card {
  width: 300px;
  height: 336px;
  display: inline-block;
  vertical-align: top;
}
</style>