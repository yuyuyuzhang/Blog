<template>
  <section class="data">
    <h2>Vue 组件数据选项</h2>

    data
    <div class="data-data">
      person: {{ person }}
      <el-button size="mini" @click="handleObj1('del')">删除对象属性</el-button>
      <el-button size="mini" @click="handleObj1('add')">添加对象属性</el-button>
      <el-button size="mini" @click="handleObj2('del')">删除对象属性-响应式</el-button>
      <el-button size="mini" @click="handleObj2('add')">添加对象属性-响应式</el-button>

      people: {{ people }}
      <el-button size="mini" @click="handleArr1('edit')">索引修改数组项</el-button>
      <el-button size="mini" @click="handleArr1('add')">索引添加数组项</el-button>
      <el-button size="mini" @click="handleArr2('edit')">修改数组项-响应式</el-button>
      <el-button size="mini" @click="handleArr2('add')">添加数组项-响应式</el-button>
    </div>
    
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
    handleObj1(type) {
      if(type === 'del') {
        Reflect.deleteProperty(this.person, 'name')
      } else {
        this.person.job = 'doctor'
      }
    },
    handleObj2(type) {
      if(type === 'del') {
        this.$set(this.person, 'name', undefined)
      } else {
        this.$set(this.person, 'job', 'doctor')
      }
    },
    handleArr1(type) {
      if(type === 'edit') {
        this.people[0] = { name: '张哈哈', age: 26 }
      } else {
        this.people[2] = { name: '王五', age: 40 }
      }
    },
    handleArr2(type) {
      if(type === 'edit') {
        this.$set(this.people, 0, { name: '张哈哈', age: 26 })
      } else {
        this.$set(this.people, 2, { name: '王五', age: '40' })
      }
    },
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
  &-data,
  &-computed,
  &-watch,
  &-props,
  &-inject {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
  &-data {
    .el-button {
      display: block;
      margin-left: 0;
    }
  }
}
</style>