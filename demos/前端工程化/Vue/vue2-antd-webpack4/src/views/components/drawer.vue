<template>
  <div>
    <a-button 
      type="primary" 
      @click="isDrawer = true">
      抽屉
    </a-button>

    <a-drawer 
      title="抽屉"
      :visible="isDrawer"
      mask
      mask-closable
      closable
      destroy-on-close
      placement="right"
      @close="handleClose">
      <div>哈哈哈</div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isDrawer: false,
    }
  },
  methods: {
    handleClose(){
      this.isDrawer = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>