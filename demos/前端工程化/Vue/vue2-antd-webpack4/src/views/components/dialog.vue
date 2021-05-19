<template>
  <div>
    <a-button 
      type="primary" 
      @click.stop="isDialog = true">
      弹窗
    </a-button>

    <a-modal
      :visible="isDialog"
      title="弹窗"
      width="600px"
      centered
      closeable
      mask
      mask-closable
      :confirm-loading="isLoading"
      @cancel="isDialog = false"
      @ok="handleCheckForm"
      class="dialog">
      <div>aaa</div>
    </a-modal>
  </div>
</template>

<script>
export default {
  components: {},
  data(){
    return {
      isDialog: false,
      isLoading: false,
    }
  },
  methods: {
    handleCheckForm(){
      this.isLoading = true
      // 定时器模拟后端接口
      setTimeout(() => {
        this.isLoading = false
        this.isDialog = false
      }, 1000)
    },
    handleClose(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
