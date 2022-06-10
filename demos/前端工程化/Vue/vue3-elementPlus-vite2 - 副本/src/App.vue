<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

export default {
  name: 'App',
  computed: {
    language() {
      return this.$store.state.theme.language
    },
    locale() {
      return this.language === 'zh' ? zhCn : en
    }
  }
}
</script>
