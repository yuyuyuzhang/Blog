<template>
  <a-button type="priamry" @click="handleClick">通知</a-button>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  methods: {
    handleClick(){
      this.$notification.open({
        key: 1,
        message: '标题',
        description: '这是一条内容',
        duration: 2,
        placement: 'topRight',
        style: {
          width: '300px',
          height: '100px'
        },
        icon: <a-icon type="smile"></a-icon>,
        onClick: () => {
          console.log('click')
        },
        onClose: () => {
          console.log('close')
        }
      })
      // 通过唯一的 key 标识通知框，可用于更新内容
      setTimeout(() => {
        this.$notification.open({
          key: 1,
          message: '标题',
          description: '这是一条更新后的内容',
          duration: 2,
          placement: 'topRight',
          style: {
            width: '300px',
            height: '100px'
          },
          icon: <a-icon type="smile"></a-icon>
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
