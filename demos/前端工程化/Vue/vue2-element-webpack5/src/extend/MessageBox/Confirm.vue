<template>
  <section v-if="flag" id="confirm" class="shade">
    <div class="content">
      <div class="content-top">
        {{ options.title }}
      </div>
      <div class="content-center">
        {{ options.msg }}
      </div>
      <div class="content-bottom">
        <button class="content-bottom-left" @click="btn_ok_cb">
          {{ options.btn_ok_name }}
        </button>
        <button class="content-bottom-right" @click="btn_no_cb">
          {{ options.btn_no_name }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'cat',
  data() {
    return {
      flag: true,
      options: {
        title: '标题',
        msg: '确定要 xxx 吗？',
        btn_ok_name: '确定',
        btn_no_name: '取消',
        ok_cb: null,
        no_cb: null
      }
    }
  },
  methods: {
    async btn_ok_cb() {
      this.options.ok_cb && (await this.options.ok_cb())
      this.flag = false
    },
    async btn_no_cb() {
      this.options.no_cb && (await this.options.no_cb())
      this.flag = false
    }
  }
};
</script>

<style lang="scss" scoped>
.shade {
  position:fixed;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background:rgba(0,0,0,0.3);   
  .content {
    width:250px;
    height:180px;
    border:1px solid #ccc;
    border-radius:10px;
    background-color:#fff;
    position:fixed;
    top:50%;
    left:50%;
    margin-top:-90px;
    margin-left:-125px;
    &-top {
      width:100%;
      height:40px;
      border-bottom:1px solid #ccc;
      text-align: center;
      font-size:20px;
      font-weight: 700;
      line-height:40px;
    }
    &-center {
      width:90%;
      height:80px;
      margin:5px auto;
    }
    &-bottom {
      width:85%;
      height:40px;
      margin:0 auto;
      position:relative;
    }
  }
}
</style>