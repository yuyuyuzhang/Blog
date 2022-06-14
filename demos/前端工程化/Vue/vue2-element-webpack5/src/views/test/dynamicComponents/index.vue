<template>
  <section class="dynamicComponents">
    <h2>Vue 动态组件</h2>

    <el-radio-group v-model="compName">
        <el-radio label="Cat">猫咪</el-radio>
        <el-radio label="Dog">狗狗</el-radio>
    </el-radio-group>
    <keep-alive>
        <component :is="compName"></component>
    </keep-alive>
  </section>
</template>

<script>
import Cat from './components/cat.vue'
import Dog from './components/dog.vue'

export default {
  name: 'dynamicComponents',
  components: {
    Cat,
    Dog,
  },
  data() {
    return {
      compName: 'Cat',
    }
  }
};
</script>

<style lang="scss" scoped>
.dynamicComponents {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
}
</style>