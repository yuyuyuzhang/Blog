<template>
  <div class="layout-header flex-row">
    <a-icon
      :type="menuCollapse ? 'menu-unfold' : 'menu-fold'"
      class="layout-header-icon"
      @click="menuCollapse = !menuCollapse"
    />
  
    <div class="layout-header-operation">
      <a-icon 
        type="setting" 
        class="layout-header-icon layout-header-operation-item" 
        @click="handleThemeDialogShow">
      </a-icon>

      <a-dropdown>
        <a-icon type="user" class="layout-header-icon layout-header-operation-item"></a-icon>
        <a-menu slot="overlay" @click="handleCommand">
          <a-menu-item key="about">关于</a-menu-item>
          <a-menu-item key="logout">退出</a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>

    <a-modal
      v-model="themeDialogVisiable"
      title="主题设置"
      :width="500"
      :mask-closable="false"
      @cancel="themeDialogVisiable = false;"
      @ok="handleThemeFormSubmit">
      <a-form-model
        ref="themeForm"
        :model="themeForm"
        layout="vertical"
        :labelCol="{ span: 4 }"
        :wrapperCol="{ span: 20 }">
        <a-form-model-item label="语言" prop="language">
          <a-select v-model="themeForm.language">
            <a-select-option 
              v-for="item in languageOptions" 
              :key="item.key" 
              :value="item.key">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="颜色" prop="color">
          <a-radio-group v-model="themeForm.color">
            <a-radio 
              v-for="item in colorOptions" 
              :key="item.key" 
              :value="item.key">
              {{ item.name }}
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="大小" prop="size">
          <a-radio-group v-model="themeForm.size">
            <a-radio 
              v-for="item in sizeOptions" 
              :key="item.key" 
              :value="item.key">
              {{ item.name }}
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      v-model="aboutDialogVisiable"
      title="关于"
      :width="400"
      :footer="null"
      :mask-closable="false">
      <div>版本：V1.0.0</div>
      <div>作者：yuyuyuzhang</div>
    </a-modal>
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
    handleCommand({ key }) {
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