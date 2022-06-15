<template>
  <section class="dom">
    <h2>Vue 组件 DOM 选项</h2>
    
    template
    <div class="dom-template">
      <h3>{{ title }}</h3>
    </div>

    v-text、v-html、v-pre
    <div class="dom-directive">
      <div>
        v-text
        <span v-text="text"></span>
        <span>{{ text }}</span>
      </div>

      <div>
        v-html
        <span v-html="html"></span>
      </div>

      <div>
        v-pre 
        <span v-pre>{{ html }}</span>
      </div>
    </div>

    v-if、v-show
    <div class="dom-directive">
      <div>
        <el-radio-group v-model="isShowA">
          <el-radio :label="true">显示</el-radio>
          <el-radio :label="false">不显示</el-radio>
        </el-radio-group>
        <div v-show="isShowA">I am A</div>
      </div>

      <div>
        <el-radio-group v-model="isRenderB">
          <el-radio :label="true">渲染</el-radio>
          <el-radio :label="false">不渲染</el-radio>
        </el-radio-group>
        <div v-if="isRenderB">bbb</div>
      </div>
    </div>

    v-for
    <div class="dom-directive">
      <ul>
        <li v-for="item in people" :key="item.name">{{ item.name + ' ' + item.age }}</li>
      </ul>
    </div>

    v-model
    <div class="dom-directive">
      trim: <input v-model.trim="name" @input="handleInputName" />
    </div>

    v-bind
    <div class="dom-directive">
      <div :class="[ 'red', { 'big': isBig } ]" :style="{ backgroundColor: 'gray' }">
        class、style 绑定
      </div>

      <div>
        attribute、property 区分
        <input id="block" data-a="a" value="111" />
      </div>

      <div>
        .prop 修饰符
        <input :data="data1" @keyup="handlePrintData1($event)" />
        <input :data.prop="data2" @keyup="handlePrintData2($event)" />
      </div>  

      <div>
        .sync 修饰符
        <child :childTitle.sync="childTitle"></child>
      </div>
    </div>

    v-on
    <div class="dom-directive">
      .self 修饰符
      <ul @click.self="handleSelf">
        <li v-for="item in lis" :key="item">{{ item }}</li>
      </ul>

      .stop 修饰符
      <ul @click="handleStop">
        <li v-for="item in lis" :key="item" @click.stop="">{{ item }}</li>
      </ul>

      .prevent 修饰符<a href="https://fanyi.baidu.com/?aldtype=16047#en/zh" @click.prevent="">百度翻译</a>
      .passive 修饰符<a href="https://fanyi.baidu.com/?aldtype=16047#en/zh" @click.passive="">百度翻译</a>

      .capture 修饰符
      <!-- 情况1：3 2 1 -->
      <div @click="handle1">
        <div @click="handle2">
          <div @click="handle3">aaa</div>
        </div>
      </div>

      <!-- 情况2：1 3 2 -->
      <div @click.capture="handle1">
        <div @click="handle2">
          <div @click="handle3">aaa</div>
        </div>
      </div>

      <!-- 情况3：2 3 1 -->
      <div @click="handle1">
        <div @click.capture="handle2">
          <div @click="handle3">aaa</div>
        </div>
      </div>

      <!-- 情况4：1 2 3 -->
      <div @click.capture="handle1">
        <div @click.capture="handle2">
          <div @click="handle3">aaa</div>
        </div>
      </div>
    </div>

    v-once
    <div class="dom-directive">
      <div v-once>{{ txt }}</div>
      <input v-model="txt" />
    </div>

    v-slot
    <div class="dom-directive">
      <context ref="context">
        <template v-slot:img>
          <img :src="img_cat"/>
        </template>
        <template v-slot:desc="{ desc }">
          <ul>
            <li>{{ desc.name }}</li>
            <li>{{ desc.age }}</li>
          </ul>
        </template>
      </context>
    </div>
  </section>
</template>

<script>
import child from './components/child.vue'
import context from './components/context.vue'
import img_cat from '@/assets/img/cat.jpg'

export default {
  name: 'dom',
  components: {
    child,
    context,
  },
  data() {
    return {
      title: '我是小可爱',
      text: '我是大可爱',
      html: '<h1>我是大可爱</h1>',
      isShowA: true,
      isRenderB: true,
      people: [
        { name: '张三', age: 26 },
        { name: '李四', age: 30 }
      ],
      name: '',
      isBig: true,
      data1: 'aaa',
      data2: 'bbb',
      childTitle: '你是大可爱',
      lis: [ 'a', 'b', 'c' ],
      txt: '哈哈',
      img_cat: img_cat
    }
  },
  mounted() {
    this.$nextTick(() => {
      const div = document.querySelector('#block')
      console.log(div.attributes) // NamedNodeMap { 0: data-v-ff66debc, 1: id, 2: data-a, 3: value, length: 4 }
      div.addEventListener('keyup', function(e) {
        console.log(e.target.attributes[3])  // attribute, 始终输出 value="111"
        console.log(e.target.value)          // property, 不断输出最新值
      })

      // 查询插槽
      console.log('slots:',this.$slots,this.$refs.context.$slots)
      console.log('scopedSlots:',this.$scopedSlots,this.$refs.context.$scopedSlots)
    })
  },
  methods: {
    handleInputName() {
      console.log('name-input:', this.name)
    },
    handlePrintData1(e){
      console.log(e.target.data) //undefined
      console.log(e.target.attributes[1]) //data="aaa"
    },
    handlePrintData2(e){
      console.log(e.target.data) //'bbb'
    },
    handleSelf(){
      console.log('self')
    },
    handleStop(){
      console.log('stop')
    },
    handle1(){
      console.log('1')
    },
    handle2(){
      console.log('2')
    },
    handle3(){
      console.log('3')
    },
  }
};
</script>

<style lang="scss" scoped>
.dom {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  &-template,
  &-directive {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
}
</style>