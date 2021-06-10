<template>
  <div class="login-container">
    <!-- labelCol: 标签占据的栅栏数，wrapperCol: 内容占据的栅栏数 -->
    <a-form-model
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 12 }"
      class="login-form">
      <a-form-model-item label="姓名" prop="name">
        <a-input v-model.trim="loginForm.name">
          <a-icon slot="prefix" type="user"></a-icon>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="password">
        <!-- 自定义 label -->
        <template slot="label">
          <!-- 气泡提示 -->
          <a-popover
            title="提示"
            placement="left"
            trigger="hover">
            <template slot="content">
              1、密码不得小于 8 位<br/>
              2、密码最好使用数字、字母的混合
            </template>

            <!-- 触发气泡的 label 内容 -->
            <span>密码</span>
          </a-popover>
        </template>

        <a-input type="password" v-model.trim="loginForm.password">
          <a-icon slot="prefix" type="lock"></a-icon>
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="自我介绍" prop="introduce">
        <a-textarea v-model.trim="loginForm.introduce"></a-textarea>
      </a-form-model-item>
      <a-form-model-item label="是否匿名" prop="isAnonymous">
        <a-switch v-model="loginForm.isAnonymous"></a-switch>
      </a-form-model-item>
      <a-form-model-item label="性别" prop="gender">
        <a-radio-group v-model="loginForm.gender">
          <a-radio
            v-for="item in genderOptions"
            :key="item.value"
            :value="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="爱好" prop="like">
        <a-checkbox-group v-model="loginForm.like">
          <a-checkbox
            v-for="item in likeOptions"
            :key="item.value"
            :value="item.value">
            {{ item.label }}
          </a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item label="籍贯" prop="origin">
        <a-select v-model="loginForm.origin">
          <a-select-option
            v-for="item in originOptions"
            :key="item.value"
            :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="出生日期" prop="birthday">
        <a-date-picker
          v-model="loginForm.birthday"
          show-time
          type="date"
          placeholder="请选择日期时间">
        </a-date-picker>
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ span: 12, offset: 4 }">
        <a-button
          type="primary"
          class="login-submit"
          :loading="isSubmit"
          @click="checkLoginForm">
          提交
        </a-button>
        <a-button @click="resetLoginForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      loginForm: {
        name: "",
        password: "",
        introduce: "",
        isAnonymous: false,
        gender: "",
        like: [],
        origin: "",
        birthday: "",
      },
      originOptions: [
        { value: "sichuan", label: "四川" },
        { value: "jiangsu", label: "江苏" },
      ],
      genderOptions: [
        { value: "man", label: "男" },
        { value: "woman", label: "女" },
      ],
      likeOptions: [
        { value: "sing", label: "唱歌" },
        { value: "dance", label: "跳舞" },
        { value: "game", label: "游戏" },
      ],
      loginFormRules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 8, message: "密码长度不能小于 8 位", trigger: "blur" },
        ],
      },
      isSubmit: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    checkLoginForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.submitLoginForm();
        }
      });
    },
    submitLoginForm() {
      this.isSubmit = true;
      // 定时器模拟后端请求
      setTimeout(() => {
        this.isSubmit = false
        this.$message.success({
          content: '提交成功',
          duration: 1,
        })
      }, 1000)
    },
    resetLoginForm() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .login-form {
    width: 500px;
    height: 400px;
    margin-left: 300px;
    .ant-form-item {
      margin: 0 0 10px 0;
      .login-submit {
        margin-right: 10px;
      }
    }
  }
}
</style>
