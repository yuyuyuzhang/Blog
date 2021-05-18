<template>
  <el-drawer
    v-model="showSettings"
    title="主题"
    direction="rtl"
    size="20%"
    modal
    show-close
    close-on-press-escape
    class="app-settings">
    <el-form 
      label-width="90px"
      label-position="right"
      label-suffix="："
      class="theme-form">
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" size="small"></el-color-picker>
      </el-form-item>

      <el-form-item label="语言">
        <el-select v-model="language" size="small">
          <el-option 
            v-for="item in langOptions" 
            :key="item.key" 
            :value="item.key" 
            :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="字体大小">
        <el-select v-model="size" size="small">
          <el-option 
            v-for="item in sizeOptions" 
            :key="item.key" 
            :value="item.key" 
            :label="item.label">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  name: 'Settings',
  data(){
    return {
      langOptions: [
        { key: 'zh', label: '简体中文' },
        { key: 'en', label: 'English' }
      ],
      sizeOptions: [
        { key: 'large', label: '大' },
        { key: 'medium', label: '中' },
        { key: 'small', label: '小' },
      ]
    }
  },
  computed: {
    showSettings: {
      get() {
        console.log(this.$store.state.theme.showSettings)
        return this.$store.state.theme.showSettings
      },
      set(val) {
        this.$store.dispatch('theme/changeSettings', {
          key: 'showSettings',
          value: val
        })
      }
    },
    color: {
      get() {
        return this.$store.state.theme.color
      },
      set(val) {
        this.$store.dispatch('theme/changeSettings', {
          key: 'color',
          value: val
        })
      }
    },
    language: {
      get() {
        return this.$store.state.theme.language
      },
      set(val) {
        this.$store.dispatch('theme/changeSettings', {
          key: 'language',
          value: val
        })
      }
    },
    size: {
      get() {
        return this.$store.state.theme.size
      },
      set(val) {
        this.$store.dispatch('theme/changeSettings', {
          key: 'size',
          value: val
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
