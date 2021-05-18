<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
      size="large"
      class="login-form">
      <div class="login-title">登录</div>

      <el-form-item prop="userName">
        <el-input 
          ref="userName"
          v-model="loginForm.userName"
          clearable
          prefix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input 
          ref="password"
          v-model="loginForm.password" 
          clearable
          type="password"
          show-password
          prefix-icon="el-icon-lock">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          :loading="isSubmit"
          class="login-btn"
          @click="handleCheck"
          @keyup.native.enter="handleCheck">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      isSubmit: false,
      loginForm: {
        userName: '',
        password: '',
      },
      loginFormRules: {
        userName: [],
        password: []
      },
    }
  },
  mounted() {
    // 表单元素自动获得焦点
    if(this.loginForm.userName === ''){
      this.$refs.userName.focus()
    } else if(this.loginForm.password === ''){
      this.$refs.password.focus()
    }
  },
  methods: {
    handleCheck(){
      this.$refs.loginForm.validate(valid => {
        if(valid){
          this.submitForm()
        }
      })
    },
    submitForm(){
      this.isSubmit = true;
      setTimeout(() => {
        this.isSubmit = false
        this.$router.push({ path: '/home' })
      }, 1000)
    },
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  vertical-align: middle;
  .login-form {
    width: 450px;
    height: 250px;
    margin: 0 auto;
    position: relative;
    top: 125px;
    .login-title {
      margin-bottom: 40px;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      color: white;
    }
    .login-btn {
      width: 450px;
    }
  }
}
</style>
