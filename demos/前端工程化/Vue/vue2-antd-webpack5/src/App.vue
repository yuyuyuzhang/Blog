<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import zhCn from 'ant-design-vue/lib/locale-provider/zh_CN';
import esUs from 'ant-design-vue/lib/locale-provider/en_US'

export default {
  name: 'App',
  computed: {
    language() {
      return this.$store.state.theme.language
    },
    locale() {
      return this.language === 'zh' ? zhCn : esUs
    }
  }
}
</script>
