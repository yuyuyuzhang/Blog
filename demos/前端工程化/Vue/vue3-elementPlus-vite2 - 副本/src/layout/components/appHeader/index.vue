<template>
  <div class="layout-header flex-row">
    <el-icon 
      class="layout-header-icon" 
      @click="menuCollapse = !menuCollapse">
      <expand v-if="menuCollapse"></expand>
      <fold v-else></fold>
    </el-icon>
  
    <div class="layout-header-operation">
      <el-icon 
        class="layout-header-icon layout-header-operation-item" 
        @click="handleThemeDialogShow">
        <setting></setting>
      </el-icon>

      <el-dropdown @command="handleCommand">
        <el-icon class="layout-header-icon"><user></user></el-icon>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="about">关于</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-dialog
      v-model="themeDialogVisiable"
      title="主题设置"
      :width="500"
      :close-on-click-modal="false">
      <el-form
        ref="themeForm"
        :model="themeForm"
        label-position="right"
        label-width="100px">
        <el-form-item label="语言" prop="language">
            <el-select v-model="themeForm.language">
                <el-option
                  v-for="item in languageOptions"
                  :key="item.key"
                  :value="item.key"
                  :label="item.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="颜色" prop="color">
            <el-radio-group v-model="themeForm.color">
                <el-radio
                  v-for="item in colorOptions"
                  :key="item.key"
                  :label="item.key">
                  {{ item.name }}
                </el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="大小" prop="size">
            <el-radio-group v-model="themeForm.size">
                <el-radio
                  v-for="item in sizeOptions"
                  :key="item.key"
                  :label="item.key">
                  {{ item.name }}
                </el-radio>
            </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="medium" @click="handleThemeFormSubmit">确定</el-button>
        <el-button size="medium" @click="themeDialogVisiable = false;">取消</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="aboutDialogVisiable"
      title="关于"
      :width="400"
      :close-on-click-modal="false">
      <div>版本：V1.0.0</div>
      <div>作者：yuyuyuzhang</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'appHeader',
  components: {},
  data() {
    return {
      aboutDialogVisiable: false,
      themeForm: {
        language: '',
        color: '',
        size: ''
      },
    }
  },
  computed: {
    menuCollapse: {
      get() {
        return this.$store.state.theme.menuCollapse
      },
      set(val) {
        this.$store.dispatch('theme/themesChange', [{
          key: 'menuCollapse',
          value: val
        }])
      }
    },
    themeDialogVisiable: {
      get() {
        return this.$store.state.theme.themeDialogVisiable
      },
      set(val) {
        this.$store.dispatch('theme/themesChange', [{
          key: 'themeDialogVisiable',
          value: val
        }])
      }
    },
    languageOptions() {
      return this.$store.state.theme.languageOptions
    },
    colorOptions() {
      return this.$store.state.theme.colorOptions
    },
    sizeOptions() {
      return this.$store.state.theme.sizeOptions
    }
  },
  methods: {
    handleCommand(key) {
      switch(key){
        case 'about':
          this.aboutDialogVisiable = true
          break;
        case 'logout':
          this.$router.push({ path: '/' })
          break;
      }
    },
    handleThemeDialogShow() {
      const { language, color, size } = this.$store.state.theme;
      this.themeForm = {
        language,
        color,
        size
      };
      this.themeDialogVisiable = true;
    },
    handleThemeFormSubmit() {
      const { language, color, size } = this.themeForm;
      this.$store.dispatch('theme/themesChange', [
        {
          key: 'language',
          value: language
        },
        {
          key: 'color',
          value: color
        },
        {
          key: 'size',
          value: size
        }
      ])
      this.themeDialogVisiable = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-size: 20px;
  &-icon {
    font-size: 20px;
    cursor: pointer;
  }
  &-operation {
    flex: 1;
    text-align: right;
    &-item {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>