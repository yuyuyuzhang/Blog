<template>
  <section class="life">
    <h2>Vue 组件生命周期选项</h2>
    
    <div> {{ title }} </div>
    <button @click="handleChange">修改</button>
    <button @click="handleDestroy">销毁实例</button>
  </section>
</template>

<script>
export default {
  name: 'life',
  data() {
    return {
      title: '小可爱'
    }
  },
  beforeCreate(){
    console.log('beforeCreate')
  },
  created(){
    console.log('created')
  },
  beforeMount(){
    console.log('beforeMount')
  },
  mounted(){
    console.log('mounted')
  },
  beforeUpdate(){
    console.log('beforeUpdate')
  },
  updated(){
    console.log('updated')
  },
  beforeDestroy(){
    console.log('beforeDestroy', this.$data.title)
  },
  destroyed(){
    console.log('destroyed', this.$data.title)
  },
  methods: {
    handleChange(){
      console.log('change start')
      this.title = 'hello world'
      console.log('change end')

      //输出：change start    change end    beforeUpdate    updated
    },
    handleDestroy(){
      console.log('destroy start')
      this.$destroy()
      console.log('destroy end')

      //输出：destroy start    beforeDestroy    destroyed    destroy end
    }
  }
};
</script>

<style lang="scss" scoped>
.life {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
}
</style>