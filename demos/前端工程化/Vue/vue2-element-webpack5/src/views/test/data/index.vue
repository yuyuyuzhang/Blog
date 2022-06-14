<template>
  <section class="data">
    <h2>Vue 组件数据选项</h2>
    
    computed
    <div class="data-computed">
      <div>a: <input v-model="a" /></div>
      <div>b: {{ b }}</div>
      <div>personName: <input v-model="personName" /></div>
      <div>name: {{ name }}</div>
      <button @click="$forceUpdate()">重新渲染</button>
    </div>

    watch
    <div class="data-watch">
      <div>{{ title }} <input v-model="title" /></div>
      <div>{{ person.name }}<input v-model="person.name" /></div>
      <div>{{ people[0].name }}<input v-model="people[0].name" /></div>
    </div>

    props
    <div class="data-props">
      index: {{ childTitle }}
      <child :childTitle="childTitle" @changeChildTitle="changeChildTitle"></child>
    </div>

    provide/inject
    <div class="data-inject">
      index: {{ grandTitle }}
      <son @changeGrandTitle="changeGrandTitle"></son>
    </div>
  </section>
</template>

<script>
import child from './components/child.vue'
import son from './components/son.vue'

export default {
  name: 'data',
  components: {
    child,
    son
  },
  data() {
    return {
      a: 3,
      name: '张三',

      title: '小可爱',
      person: {
        name: '王五',
        age: 40
      },
      people: [
        { name: '张三', age: 26 },
        { name: '李四', age: 30 }
      ],

      childTitle: 'I am child',
      grandTitle: 'I am grandSon'
    };
  },
  provide() {
    return {
      // grandTitle: this.grandTitle
      grandTitle: () => this.grandTitle
     }
  },
  computed: {
    b() {
      return this.a * 2;
    },
    personName: {
      get() {
        return this.name;
      },
      set(val) {
        this.name = val;
      }
    }
  },
  watch: {
    title: {
      handler: function(newVal, oldVal) {
        console.log("title", newVal, oldVal);
      }
    },
    person: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log("person", newVal.name, oldVal.name);
      }
    },
    people: {
      deep: true,
      handler: function(newVal, oldVal) {
        console.log('people', newVal, oldVal);
      }
    }
  },
  methods: {
    changeChildTitle(val) {
      this.childTitle = val
    },
    changeGrandTitle(val) {
      this.grandTitle = val
    }
  }
};
</script>

<style lang="scss" scoped>
.data {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  &-computed,
  &-watch,
  &-props,
  &-inject {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
}
</style>