# 二、Vue

## 1. Vue 应用

### (1) Vue 应用

一个 Vue 应用由一个根 Vue 应用实例，以及可选的、嵌套的、可复用的 Vue 组件实例组成

![组件树]()

### (2) Vue 应用实例

单页面应用程序 SPA 中只有一个根 Vue 应用实例，通过 `new Vue()`创建

```js
import App from './App.vue'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

![Vue实例]()

### (3) Vue 全局 API

全局注册往往是不够理想的，因为如果使用 Webpack 构建系统，即使全局注册的内容不再被使用，也都会包含在最终的构建结果中，这会造成用户下载的 JS 代码的无谓增加

```js
全局 DOM API
Vue.compile(template)                //将模板字符串 template 编译成渲染函数 render

全局数据 API
Vue.observable(obj)                  //让一个对象可响应,该对象可直接用于渲染函数和计算属性内,并在变更时触发相应更新

全局资源 API：
Vue.directive(name, define)          //全局注册一个指令
Vue.filter(name, cb)                 //全局注册一个过滤器
Vue.mixin(mixin)                     //全局注册一个混入
Vue.component(name, define)          //全局注册一个组件,常用于定义异步组件
Vue.extend(options)                  //全局注册一个扩展,返回一个 Vue 构造器子类

全局数据方法：
Vue.set(target, propName/index, val) //向响应式对象 target 添加/修改 propName/index
Vue.delete(target, propName/index)   //向响应式对象 target 删除 propName/index
Vue.nextTick(cb)                     //下次 DOM 更新后调用回调函数 cb

Vue 插件：
Vue.use(plugin, options)             //全局注册 Vue 插件

其他 API：
Vue.version                          //返回安装的 Vue 版本号
```

## 2. Vue 组件

### (1) VueComponent 实例

Vue 组件是 VueComponent 实例，VueComponent 实例是 Vue 应用实例的扩展

Vue 组件非常类似于`自定义元素`，Vue 组件是 `Web Components API` 的一部分，实现了 `Slot API 和 is attribute`，但还是有几个关键差别

* Web Components API 已经完成并通过，但未被所有浏览器原生实现，相比之下，Vue 组件不需要任何 polyfill，并且在所有支持浏览器下表现一致，必要时也可以包装于自定义元素之内
* Vue 组件提供了纯自定义元素不具备的一些重要功能，最突出的就是`跨组件数据流、自定义事件通讯、构建工具集成`

不同框架对于组件的定义和实现各不相同，但可以用一句话来概括组件的定义：`组件就是基于视图的模块`，组件的核心任务就是将数据渲染到视图并监听用户在视图上的操作

### (2) 父子组件间的单向数据流

* 数据自上而下流 `prop、provide/inject`
* 事件自下而上走 `this.$emit(e,...args)`

## 3. Vue 组件 DOM 选项

### (1) Vue 组件 DOM 选项

```js
el          //将当前 Vue 应用实例挂载到一个页面上已存在的 DOM 元素上
template    //字符串模板,用来替换挂载的 DOM 元素
render      //渲染函数,用来代替字符串模板
renderError //render 函数遭遇错误时错误作为第二个参数传递到 renderError(只在开发者环境下工作)
```

### (2) 模板 temlate

Vue 使用了基于 HTML 的模板语法，偏向于 HTML 但不是 HTML，因此无法被浏览器直接识别

```html
<template>
  <h3>我是小可爱</还>
</template>
```

### (3) 渲染函数 render

绝大多数情况下，使用模板更加简单，但是在一些场景中需要 JS 的完全编程的能力，这时可以使用渲染函数 render

```html
<script>
export default {
  render(createElement) {
    return createElement("H4", this.title);
  },
  data() {
    return {
      title: "我是小可爱"
    };
  }
};
</script>
```

### (4) 真实 DOM

浏览器的渲染引擎线程解析 HTML 代码生成 DOM 树，解析 CSS 代码生成 CSSOM 树

浏览器的渲染引擎线程将 DOM 树和 CSSOM 树关联起来构建 Render 树，每个 DOM 节点都有一个 attach 方法接受样式信息，返回 render 对象，这些 render 对象构成一个 Render 树

浏览器的渲染引擎线程遍历 Render 树开始布局，为每个节点确定一个显示屏上的精确坐标

浏览器的渲染引擎线程调用每个节点的 print 方法，将其绘制出来

```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```

![真实DOM](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue/%E7%9C%9F%E5%AE%9EDOM.png)

### (5) 虚拟 DOM

#### ① 虚拟节点 VNode

Vue 其实最终也是把模板 template 编译成渲染函数 render，这是 Vue 的底层实现细节，通常无需关心，不过开发者可以使用 `Vue.compile(template)` 实时编译模板

render 渲染函数的参数函数 `createElement` 返回的并不是一个实际的 DOM 节点，而是一个`虚拟节点 VNode`，VNode 的更准确描述其实是 `DOM 节点描述信息`，用来描述需要在页面上渲染一个什么样的 DOM 节点

组件树中的所有 VNode 必须是`唯一`的

#### ② diff 算法

* 旧虚拟 DOM：实际 DOM
* 新虚拟 DOM：初始为实际 DOM
* 每次用户交互，就会改变新虚拟 DOM 的 VNode
* 每次修改新虚拟 DOM，都会将新虚拟 DOM 和旧虚拟 DOM 通过 diff 算法进行对比，得出 `diff 结果数据表`
* 将`同一事件循环`中的所有数据变更，通过`文档片段`更新到浏览器 DOM
* 浏览器实际 DOM 成为旧虚拟 DOM

#### ③ diff 比较过程（v-for key 原理）

![diff比较](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue/diff%E6%AF%94%E8%BE%83.jpg)

diff 比较过程

* 图中很清楚的说明了，diff 的比较过程只会在`同层级比较`，不会跨级比较
* 整体的比较过程可以理解为一个层层递进的过程，每一级都是一个 vnode 数组，当比较其中一个 vnode 时，若 children 不一样，就会进入 `updateChildren()` 函数（其主要入参为 newChildren 和 oldChildren，此时 newChildren 和 oldChildren 为同级的 vnode 数组），然后逐一比较 children 里的节点，对于 children 的 children，再循环以上步骤
* updateChildren() 函数就是 diff 最核心的算法

updateChildren()

* updateChildren() 函数中有一个 `saveVnode()` 函数，源码如下，也就是说，判断两个节点是否为同一节点（也就是是否可复用），标准是 `key 相同且 tag 相同`
  
  ```js
  function sameVnode (a, b) {
    return (a.key === b.key && a.tag === b.tag)
  }
  ```

v-for key 原理

* 最大化利用节点，diff 比较时减少性能消耗，如下图，所有 Vnode tag 相同
* 不加 kay 属性时，diff 比较如下
  ![不加key](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue/%E4%B8%8D%E5%8A%A0key.jpg)
* 加上 key 属性时，diff 比较如下
  ![加上key](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue/%E5%8A%A0%E4%B8%8Akey.jpg)

#### ④ 文档片段

DocumentFrament 对象表示`一个文档片段`，DOM 规定文档片段是一种轻量级的文档，可以包含和控制节点，但不会像完整的文档那样占用额外的资源

文档片段`不属于当前文档`，故操作文档片段节点比直接操作 DOM 树快得多，常用于先构建一个 DOM 树结构的文档片段，然后再插入当前文档，可以`避免浏览器反复渲染新信息`的问题

#### ⑤ 异步更新

Vue 更新 DOM 是异步执行的，Vue 侦听到数据变化，将开启一个队列（diff 结果数据表），缓存`同一事件循环`中的所有数据变更，下一次事件循环中，Vue 实际更新 DOM，并且清空缓存队列

#### ⑥ 虚拟 DOM 的作用

* **跨平台**：虚拟 DOM 以 JS 对象为基础，可以根据不同的运行环境进行代码转换（浏览器、服务器、原生应用），这使得虚拟 DOM 具有了跨平台的能力
* **优化性能**：真实 DOM 操作涉及到渲染引擎线程和 JS 引擎线程的切换，因此是比较耗时的，而虚拟 DOM 通过 diff 算法可以减少不必要的 DOM 操作，从而提升渲染性能
  
  并非所有的 DOM 操作都能够通过虚拟 DOM 提升性能，比如单次删除某个节点，直接操作 DOM 肯定要比虚拟 DOM 计算对比之后再删除要快，所以会看到一些对渲染性能要求比较高的场景，比如在线文档、表格编辑，还是会使用真实 DOM

  > 虚拟 DOM 提升了 DOM 操作的性能下限，降低了 DOM 操作的性能上限

### (6) Vue 模板指令

#### ① v-text、v-html、v-pre

* v-text 内容被 Vue 渲染为`文本节点`
* v-html 内容被 Vue 渲染为`元素节点`，v-html 容易导致 XSS 攻击，因此永远不要用在用户提交的内容上
* v-pre 所在元素及其子元素`不会被 Vue 编译`

#### ② v-show、v-if/v-else-if/v-else

* v-show 根据后跟表达式的真假值，`切换元素样式的 display`
* v-if 根据后跟表达式的真假值，决定是否渲染元素，切换时元素或组件被`销毁并重建`

#### ③ v-for

v-for 用于实现数组的列表渲染，配合使用 `item in/of items` 语法，并且最好为每个迭代元素提供一个`不重复的 key 属性`

* 不使用 key 属性，数组成员改变时，Vue 会为数组成员就近复用已存在的 DOM 节点
* 使用 key 属性，数组成员改变时，Vue 会根据 key 属性的变化重新排列节点顺序

#### ④ v-model

v-model 用于`表单控件`上创建`双向数据绑定`，表单数据修饰符如下

* input 事件：值改变时触发
* change 事件：值改变且`失去焦点`时触发

```js
.trim   //自动过滤用户输入的首尾空格
.number //自动将用户输入转换为数值类型 (不推荐使用)
.lazy   //默认情况下 v-model 在 input 事件后同步值,.lazy 将改为在 change 事件后同步
```

#### ⑤ v-bind

v-bind 用于属性绑定，常简写为 `:`，属性修饰符如下

```js
.prop  //作为一个 property 而非 attribute 绑定
.sync  //扩展成一个更新父组件绑定值的 v-on 侦听器
.camel //将连词符属性名转换为驼峰大小写属性名(不推荐使用,建议开发者通过 ESLint 规范代码)
```

.prop 修饰符

* **attribute**：attribute 是指 `HTML 标签属性`，也就是`属性节点`，是和元素节点同一类型同一层次的存在，都是节点
  attribute 不随用户输入改变，只能通过属性节点的操作方法访问和修改
* **property**：property 是指 `DOM 元素节点的属性`，只是一个字段
  property 随用户输入改变，可以通过`点访问法`或`方括号访问法`直接访问和修改

.sync 修饰符

* Vue 仅`表单控件`使用 v-model 双向数据绑定
* Vue 其他地方都是使用 v-bind、v-on 实现`父子组件间的单向数据绑定`，数据自上而下流 `prop`，事件自下而上走 `this.$emit(事件名)`
* v-bind 加上 .sync 修饰符，子组件会自动具有 `this.$emit("update:属性名", newVal)` 方法用于更新父组件值

#### ⑥ v-on

v-on 用于事件绑定，常简写为 `@`

* **使用范围**：既可以用在普通元素上监听`原生 DOM 事件`，也可以用在自定义组件上监听`自定义事件`
* **访问原始 DOM 事件**：将 `$event` 作为参数传入事件
* **多事件处理器**：使用`逗号`分隔多个事件

    ```html
    <button @click="one($event), two($event)">Submit</button>
    ```

* **事件修饰符**：支持的事件修饰符如下

    ```js
    .self     //从绑定元素本身触发
    .stop     //禁止事件继续传播,调用 e.stopPropagation()
    .prevent  //禁止事件默认行为,调用 e.preventDefault()
    .passive  //允许事件默认行为

    .native   //监听原生事件
    .once     //仅触发一次
    .capture  //捕获触发事件流（v-on 指令是在冒泡阶段处理事件，添加 .capture 修饰符会变成在捕获阶段处理事件）

    按键修饰符
    ```

#### ⑦ v-cloak

v-cloak 用于保持在 DOM 元素上直到关联实例编译结束，常用于消除实例编译结束前的`页面闪烁`

```css
[v-cloak] {
  display: none;
}
```

```html
<div id="app" v-cloak>
  <div>{{ msg }}</div>
</div>
```

#### ⑧ v-once

v-once 用于只渲染元素或组件一次，随后的重新渲染将被跳过，可用于优化更新性能

#### ⑨ v-slot

插槽的作用就是`父组件向子组件指定位置插入 HTML 结构`，是一种仅适用于父组件到子组件的组件间通信方式，父组件使用 `v-slot` 指令分发内容，子组件使用 `<slot>` 元素承载分发内容

* **插槽具名**：有时父组件需要多个插槽承载子组件中不同内容，为了识别不同插槽，父组件通过 `v-slot:name` 中 name 属性唯一标识某个插槽，子组件通过 `<slot name=""></slot>` 中 name 属性唯一标识某个插槽的承载内容
* **插槽作用域**：父组件中所有内容都是在`父级作用域`中编译的，子组件中所有内容都是在`子级作用域`中编译的，父组件插槽只能访问父组件数据而不能访问子组件数据，然而子组件可以在 `<slot :a="a"></slot>` 通过属性绑定传值给父组件，父组件在 `v-slot:name="{ a }"` 通过插槽 prop 访问子组件传递的数据

### (7) 实例

src/views/test/dom/index.vue

```vue
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
      <context>
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
```

src/views/test/dom/components/context.vue

```vue
<template>
  <section class="context">
    <h2>我是子组件</h2>

    <slot name="img"></slot>
    <slot name="desc" :desc="{ name, age }"></slot>
  </section>
</template>

<script>
export default {
  name: 'context',
  data() {
    return {
      name: '花花',
      age: '1 岁'
    }
  }
};
</script>
```

![Vue组件DOM选项]()

## 4. Vue 组件数据选项（Vue2 双向数据绑定）

### (1) Vue 组件数据选项（Vue2 双向数据绑定）

Vue 会递归地将 data 选项中的数据加入响应式系统，但这些数据应该是声明时即存在的

```js
data           //当前组件的数据对象
computed       //当前组件的计算属性
watch          //当前组件的观察器
methods        //当前组件的方法
props          //当前组件接收到的父组件数据
provide/inject //祖先组件向所有子孙组件注入一个依赖,无论层次有多深,类似于 prop
```

#### ① data（Vue2 双向数据绑定）

Vue data 选项返回对象中的数据都具有`双向数据绑定`，原理是 Vue 遍历 data 选项返回的 JS 对象的属性，并使用 `Object.defineProperty()` 将其全部转换为`对象属性的 getter/setter`，从而实现双向数据绑定，模拟如下

```html
<input id="edit" />

<script>
const edit = document.querySelector('#edit')
const obj = {
  profile: 'aaa'
}
const store = {} // 暂存 obj 的改动,避免栈溢出
Object.defineProperty(obj, 'profile', {
  get() {
    return store.profile
  },
  set(val) {
    store.profile = val
    edit.value = val
  }
})
edit.addEventListener('keyup', () => {
  obj.profile = this.value
  console.log(obj.profile)
})
</script>
```

由于 ES5 本身的限制，使用 getter/setter 实现的双向数据绑定无法检测对象和数组的变化

* Vue 不能检测以下`对象`的变动
  * 对象属性的添加
  * 对象属性的删除
  * 可以使用 `this.set(obj, propName, value)` 方法为对象添加响应式 property
* Vue 不能检测以下`数组`的变动
  * 修改数组的长度 length 属性
  * 利用索引直接修改/添加一个数组项
  * 可以使用 `this.set(arr, index, value)` 方法为数组添加响应式数组项

#### ② computed

**数据链**：数据链在学术上被定义为连通数据的链路，数据链上有一到多个数据起点（`元数据`），并通过数据起点不断衍生扩展新的数据节点（`衍生数据`），形成一个庞大的网状数据结构，修改元数据时，数据链上的所有衍生数据都将同步更新

![数据链](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Vue/Vue/%E6%95%B0%E6%8D%AE%E9%93%BE.png)

**函数式编程**：函数式编程的核心是根据元数据生成新的衍生数据，提供`唯一确定的输入`，函数将返回`唯一确定的输出`
  
  * 函数式编程不会修改原变量的值
  * 函数式编程的函数体只能包含运算过程，并且必须带返回值

  通过函数式编程实现衍生数据，可以保证`衍生数据的值只依赖元数据且不允许被外界修改`

  ```js
  const a = 3, b = 4

  const c = (a => a*2+2)(a)
  const d = ((a, b) => a+b*2)(a, b)
  const e = (b => b/2)(b)
  const f = ((c, d) => c+d)(c, d)
  const g = ((d, e) => d-e)(d, e)

  console.log(c) //8
  console.log(d) //11
  console.log(e) //2
  console.log(f) //19
  console.log(g) //9
  ```

Vue 通过`数据链和函数式编程`实现 computed 选项以供开发者生成 data 选项的衍生数据，通过修改 data 选项的值来触发一系列 computed 衍生数据的更新

computed 选项的计算属性结果会被`缓存`，只有计算属性依赖的响应式 property 发生变化时计算属性才会重新计算

* 组件触发重新渲染时，如果计算属性依赖的响应式 property 没有发生变化，那么计算属性会使用缓存值而不是重新计算
* 相比之下，methods 选项的方法始终会重新调用

#### ③ watch

watch 选项是一个`观察器`，可以观察当前组件的 data 选项的变量的值变化，组件的 `this.$watch(target,cb,options)` 方法作用同 watch 选项一样

* **deep**：深度监听,可监听到对象属性和数组项的变化
* **immediate**：立即触发一次回调

#### ④ props

* 父组件通过`属性绑定`向子组件传递数据，子组件通过 `props` 选项接收父组件传递的数据
* 为了避免数据混乱，子组件不能直接修改 props，可以通过计算属性 `computed` 接收 props 并修改
* **单向数据流**：props 使得父子组件间形成了一个单向下行绑定，父组件 prop 的更新会向下流动到子组件，反过来则不行，这是为了避免子组件意外变更父组件的状态，从而导致应用数据流难以理解

#### ⑤ provide/inject

祖先组件使用 `provide` 选项暴露自身的数据，子孙组件使用 `inject` 选项注入祖先组件暴露的数据，无论组件层次有多深

* provide/inject 选项设计成数据`非响应式`的，这是为了避免数据混乱，例如子组件不能直接修改 props 一样
* 如果一定需要 provide/inject 变成响应式的，可以让祖先组件 provide 选项返回一个`函数`，函数内部返回响应式的数据，子孙组件通过计算属性 `computed` 接收 inject 收到的函数

### (2) 实例

src/views/test/data/index.vue

```vue
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
```

src/views/test/data/componnets/child.vue

```vue
<template>
  <section class="child">
    <div>child: {{ childTitle }}</div>

    <input v-model="childTitleComputed" />
  </section>
</template>

<script>
export default {
  name: 'child',
  props: {
    childTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    childTitleComputed: {
      get() {
        return this.childTitle
      },
      set(val) {
        this.$emit('changeChildTitle', val)
      }
    }
  }
};
</script>
```

src/views/test/data/componnets/son.vue

```vue
<template>
  <section class="son">
    <div>son: {{ grandTitle() }}</div>

    <grandSon @changeGrandTitle="changeGrandTitle"></grandSon>
  </section>
</template>

<script>
import grandSon from './grandSon.vue'

export default {
  name: 'son',
  components: {
    grandSon
  },
  inject: [
    'grandTitle'
  ],
  methods: {
    changeGrandTitle(val) {
      this.$emit('changeGrandTitle', val)
    }
  }
};
</script>
```

src/views/test/data/componnets/grandSon.vue

```vue
<template>
  <section class="grandSon">
    <div>grandson: {{ grandTitleComputed }}</div>

    <input v-model="grandTitleComputed"/>
  </section>
</template>

<script>
export default {
  name: 'grandSon',
  inject: [
    'grandTitle'
  ],
  computed: {
    grandTitleComputed: {
        get() {
            // return this.grandTitle
            return this.grandTitle()
        },
        set(val) {
            this.$emit('changeGrandTitle', val)
        }
    }
  }
};
</script>
```

![Vue组件数据选项]()

## 5. Vue 组件生命周期钩子选项

### (1) Vue 组件生命周期钩子选项

```js
beforeCreate  //组件实例初始化之后,数据观测和事件绑定之前调用
created       //组件实例初始化完成之后调用
beforeMount   //组件实例挂载到 DOM 元素之前调用
mounted       //组件实例挂载到 DOM 元素之后调用,无法保证所有子组件一起被挂载,如果希望等到整个视图都渲染完毕,可以在内部使用 this.$nextTick()
beforeUpdate  //数据更新时,虚拟 DOM 重新渲染之前调用
updated       //数据更新时,虚拟 DOM 重新渲染之后调用
beforeDestroy //组件实例销毁之前调用,此时实例仍然可用
destroyed     //组件实例销毁之后调用,此时实例不可用
errorCaptured //捕获一个来自子孙组件的错误时调用

activated     //被 keep-alive 缓存的组件激活时调用
deactivated   //被 keep-alive 缓存的组件停用时调用
```

### (2) 实例

src/views/test/life/index.vue

```vue
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

      // 输出：change start    change end    beforeUpdate    updated
    },
    handleDestroy(){
      console.log('destroy start')
      this.$destroy()
      console.log('destroy end')

      // 输出：destroy start    beforeDestroy    destroyed    destroy end
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
```

![Vue组件生命周期选项]()

## 6. Vue 组件资源选项

### (1) Vue 组件资源选项

```js
directives //当前组件局部注册引用的所有指令
filters    //当前组件局部注册引用的所有过滤器
mixins     //当前组件局部注册引用的所有混入
components //当前组件局部注册引用的所有子组件
extends    //当前组件局部注册引用的扩展(当前组件继承扩展组件)
```

### (2) Vue 指令 directives

自定义指令用于`对普通 DOM 元素进行底层操作`

指令定义对象提供以下几个钩子函数

* **bind**：指令第一次绑定到元素时调用
* **inserted**：被绑定元素插入父节点时调用
* **update**：被绑定元素所在组件 VNode 更新时调用
* **componentUpdated**：被绑定元素所在组件 VNode 及其子 VNode 全部更新后调用
* **unbind**：指令与元素解绑时调用

指令定义对象的钩子函数参数

* **el**：被绑定元素
* **binding**
  * **name**：指令名称
  * **value**：指令绑定值
  * **oldValue**：指令绑定的前一个值
  * **expression**：指令表达式
  * **arg**：指令接收到的参数
  * **modifiers**：指令的修饰符对象
* **vnode**：当前虚拟节点
* **oldVnode**：上一个虚拟节点

全局自定义指令

```js
Vue.directive('xxx', {
  inserted: (el, binding, vnode, oldVnode) => {
    //...
  }
  ...
})
```

局部自定义指令

```js
directives: {
  xxx: {
    inserted: (el, binding, vnode, oldVnode) => {
      //...
    }
    ...
  }
}
```

src/directive/adaptive.js

```js
import Vue from 'vue'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

const doResize = (el, binding, vnode) => {
    const { componentInstance: $table } = vnode

    if (!$table) return
  
    if (!$table.height) {
      throw new Error(`el-$table must set the height. Such as height='100px'`)
    }

    const { value } = binding
    const bottomOffset = (value && value.bottomOffset) || 30
    // 需要减去 layout-footer 高度 50
    const height = window.innerHeight - el.getBoundingClientRect().top - 50 - bottomOffset
    $table.layout.setHeight(height)
    $table.doLayout()
}

Vue.directive('table-height-adaptive', {
    bind(el, binding, vnode) {
        el.resizeListener = () => {
          doResize(el, binding, vnode)
        }
        addResizeListener(el, el.resizeListener)
    },
    inserted(el, binding, vnode) {
        doResize(el, binding, vnode)
    },
    unbind(el) {
        removeResizeListener(el, el.resizeListener)
    }
})
```

src/directive/index.js

```js
import './adaptive.js'
```

src/index.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 全局样式
import './assets/style/index.scss'

// api
import Api from './api/request.js'
Vue.use(Api)

// element 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 注册全局自定义指令
import './directive/index.js';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

src/views/person/index.vue

![adaptive1]()

![adaptive2]()

### (3) Vue 过滤 filters

自定义过滤器用于常见的`文本格式化`，只能用在`双花括号插值`和 `v-bind` 属性绑定表达式，通过`管道符 |` 调用，多个过滤器可以`链式调用`，前一个过滤器的返回结果作为参数传递到下一个过滤器

```js
<!-- 双花括号插值：msg 作为参数传到过滤器 filterA，过滤器 filterA 的返回结果作为参数传到过滤器 filterB -->
{{ msg | filterA | filterB }}

<!-- v-bind 属性绑定： -->
<div v-bind:id="msg | filterA | filterB"></div>
```

全局自定义过滤器

```js
Vue.filter('xxx', val => {
  //...
  return value
})
```

局部自定义过滤器

```js
filters: {
  xxx: val => {
    //...
    return value
  }
}
```

src/filter/formateDate.js

```js
import Vue from 'vue'

Vue.filter('formatDate', date => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;

    return (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
})
```

src/filter/index.js

```js
import './formatDate.js'
```

src/index.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 全局样式
import './assets/style/index.scss'

// api
import Api from './api/request.js'
Vue.use(Api)

// element-ui 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 注册全局自定义指令
import './directive/index.js';

// 注册全局自定义过滤器
import './filter/index.js'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

src/views/test/resource/index.vue

```vue
<template>
  <section class="resource">
    自定义全局过滤器
    <div class="resource-filter">
      <div>{{ new Date() }}</div>
      <div>{{ new Date() | formatDate }}</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'resource',
};
</script>

<style lang="scss" scoped>
.resource {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  &-filter {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
}
</style>
```

![自定义全局过滤器]()

### (4) Vue 混入 mixins

混入用于`分发组件的可复用功能`，混入可以包含任意组件选项，组件使用混入时，所有混入的选项都将混合进入组件本身的选项，混入主要用于复用`业务逻辑`

* 值为对象的选项将合并为同一个`对象`，键名发生冲突时以`组件`优先（directives、filters、components、extends、data、methods）
* 生命周期钩子函数同名则合并为`数组`，因此都将被调用，`混入钩子在组件钩子之前调用`

src/mixin/cat.js

```js
export default {
    name: 'resource',
    data() {
        return {
            tableData: []
        }
    },
    methods: {
        getTableData() {
            this.tableData = [
                { name: '三胖', gender: 'male', age: 2, weight: 17 },
                { name: '四旁', gander: 'female', age: 1.5, weight: 9 }
            ]
        }
    }
};
```

src/views/test/resource/index.vue

```vue
<template>
  <section class="resource">
    自定义全局过滤器
    <div class="resource-filter">
      <div>{{ new Date() }}</div>
      <div>{{ new Date() | formatDate }}</div>
    </div>

    自定义混入
    <div class="resource-mixin">
      <el-table :data="tableData">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="{ row }">
            {{ row.gender === 'male' ? '公' : '母' }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="weight" label="体重">
          <template slot-scope="{ row }">
            {{ row.weight + ' 斤' }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
import catMixin from '@/mixin/catMixin.js'

export default {
  name: 'resource',
  mixins: [
    catMixin
  ],
  created() {
    this.getTableData()
  },
};
</script>

<style lang="scss" scoped>
.resource {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  &-filter,
  &-mixin {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
}
</style>
```

![mixin]()

### (5) Vue 扩展 extends

扩展就是使用基础 Vue 构造器创建一个`子类构造器`，之后再使用子类构造器创建一个`实例`，并将实例挂载到`任意指定节点`，常用于`开发者自己构建一个复杂弹窗`

```js
// 创建扩展构造器
const Profile = Vue.extend({
  template: '<div></div>',
  data() {
    return {}
  },
  methods: {}
})

// 实例化扩展构造器并挂载到指定节点
new Profile().$mount('#mount-point')
```

src/extend/MessageBox/Confirm.vue

```vue
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
```

src/extend/MessageBox/index.js

```js
import Vue from 'vue'
import Confirm from './Confirm.vue'

// 创建子类构造器
const confirmStructor = Vue.extend(Confirm)  

const theConfirm = options => {
  // 实例化子类构造器并挂载到指定节点
  const confirmDom = new confirmStructor({
    el: document.createElement('div')
  })
  document.body.appendChild(confirmDom.$el)

  // 初始化组件参数
  options.title && (confirmDom.options.title = options.title)
  options.msg && (confirmDom.options.msg = options.msg)
  options.btn_ok_name && (confirmDom.options.btn_ok_name = options.btn_ok_name)
  options.btn_no_name && (confirmDom.options.btn_no_name = options.btn_no_name)
  confirmDom.options.ok_cb = options.ok_cb
  confirmDom.options.no_cb = options.no_cb
}

export default theConfirm
```

src/extend/index.js

```js
import Vue from 'vue'
import theConfirm from './MessageBox/index.js'

Vue.prototype.$confirm_custom = theConfirm
```

src/index.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 全局样式
import './assets/style/index.scss'

// api
import Api from './api/request.js'
Vue.use(Api)

// element-ui 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 注册全局自定义指令
import './directive/index.js';

// 注册全局自定义过滤器
import './filter/index.js'

// 注册扩展
import './extend/index.js'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

src/views/test/resource/index.vue

```vue
<template>
  <section class="resource">
    自定义全局过滤器
    <div class="resource-filter">
      <div>{{ new Date() }}</div>
      <div>{{ new Date() | formatDate }}</div>
    </div>

    自定义混入
    <div class="resource-mixin">
      <el-table :data="tableData">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template slot-scope="{ row }">
            {{ row.gender === 'male' ? '公' : '母' }}
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="weight" label="体重">
          <template slot-scope="{ row }">
            {{ row.weight + ' 斤' }}
          </template>
        </el-table-column>
      </el-table>
    </div>

    混入
    <div class="resource-mixin">
      <el-button @click="handleDel">删除</el-button>
    </div>
  </section>
</template>

<script>
import catMixin from '@/mixin/catMixin.js'

export default {
  name: 'resource',
  mixins: [
    catMixin
  ],
  created() {
    this.getTableData()
  },
  methods: {
    handleDel() {
      this.$confirm_custom({
        title: '删除',
        msg: '你确定要删除当前数据吗？',
        btn_ok_name: '确定',
        btn_no_name: '取消',
        ok_cb: () => {
          new Promise((resolve1, reject) => {
            Promise.resolve().then(res => {
              console.log('ok')
              resolve1()
            })
          })
        },
        no_cb: () => {
          new Promise((resolve1, reject) => {
            Promise.resolve().then(res => {
              console.log('no')
              resolve1()
            })
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.resource {
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  h2 {
    margin-top: 0;
  }
  &-filter,
  &-mixin {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid black;
  }
}
</style>
```

![extend]()

## 7. Vue 组件其他选项

```js
name         //当前组件的名字
delimiters   //当前组件修改默认的双花括号插值符 {{}}
comments     //当前组件是否保留渲染 HTML 模板中的注释,默认 false
inhertiAttrs //当前组件是否将父组件不作为 prop 的 attribute 作为 attribute 绑定到自身根元素,默认 true
model        //当前组件自定义 v-model 指令的 prop、event,默认将表单控件的 value 作为 prop,input 作为 event
functional   //当前组件作为函数式组件
```

## 8. Vue 组件属性、方法、事件

### (1) Vue 组件属性

```js
this.$isServer    //返回布尔值,当前组件是否运行于服务器

this.$root        //返回当前组件的根 Vue 应用实例
this.$parent      //返回当前组件的父组件
this.$children    //返回当前组件的子组件数组

this.$options     //返回一个对象,包含当前组件的初始化选项
this.$el          //返回当前组件的根 DOM 元素
this.$data        //返回当前组件的 data 选项
this.$props       //返回当前组件的 props 选项
this.$refs        //返回一个对象,包含当前组件内所有注册 ref 的 DOM 元素和组件
this.$slots       //返回一个对象,包含当前组件内所有插槽(不建议使用)
this.$scopedSlots //返回一个对象,包含当前组件内所有插槽,每个插槽都是一个函数(建议使用,方便适配 Vue3)
this.$attrs       //返回一个对象,包含父组件对当前组件的未作为 prop 识别的 attribute 属性绑定 (class,style除外)
this.$listeners   //返回一个对象,包含父组件对当前组件的事件监听
```

### (2) Vue 组件方法

#### ① Vue 组件生命周期方法

```js
this.$mount(elem)   //将当前未挂载的 Vue 应用实例手动挂载到指定 elem 元素
this.$destroy()     //销毁当前组件,清理与其他组件的连接并且解绑全部指令及事件监听,绝大多数情况下不应该调用该方法,而是使用 v-if 指令以数据驱动的方式控制子组件的生命周期

this.$forceUpdate() //强迫当前组件重新渲染,仅影响组件本身和插入插槽内容的子组件,并非所有子组件
this.$nextTick(cb)  //下次 DOM 更新后调用回调函数 cb
```

#### ② Vue 组件数据方法

```js
this.$watch(target, cb, { deep, immediate }) //作用同 Vue组件的 watch 选项相同
this.$set(target ,propName/index, value)     //向当前组件的响应式对象 target 添加
this.$delete(target, propName/index)         //向当前组件响应式对象 target 删除 propName
```

### (3) Vue 组件事件

以下事件方法仅适用于组件上的`自定义事件`

```js
this.$on(e, cb)        //监听当前组件上的自定义事件 e
this.$once(e, cb)      //监听当前组件上的自定义事件 e(只触发一次,之后监听器立即被移除)
this.$off(e, cb)       //移除当前组件上的自定义事件 e
this.$emit(e, ...args) //触发当前组件上的自定义事件 e,附加参数 ...args 传给事件回调函数
```

## 9. Vue 动态组件

### (1) componnet

动态组件就是通过 `<component :is="compName"></component>` 标签的 is 属性，动态绑定多个组件到同一个挂载点，通过改变 is 属性绑定值，切换渲染哪个组件

### (2) keep-alive

正常情况下切换组件调用时会`销毁`组件实例，而使用 `<keep-alive>` 标签包裹动态组件时就不会销毁，而是`缓存`不活动的组件实例，下一次使用的时候直接从缓存中加载，主要用于保存组件状态，避免反复重新渲染导致的性能问题

* `<keep-alive>` 标签自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中
* 组件在 `<keep-alive>` 标签内切换时，组件的 `activated` 和 `deactivated` 生命周期钩子函数将会被对应执行

`<keep-alive>` 标签的属性

* include：字符串或正则表达式，只有名称匹配的组件会被缓存
* exclude：字符串或正则表达式，任意名称匹配的组件都不会被缓存
* max：数字，最多可缓存多少个组件实例

### (3) 实例

src/views/test/dynamicComponents/index.vue

```vue
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
```

src/views/test/dynamicComponents/component/cat.vue

```vue
<template>
  <section class="cat">
    <el-tabs tab-position="left">
      <el-tab-pane label="布偶">布偶</el-tab-pane>
      <el-tab-pane label="缅因">缅因</el-tab-pane>
      <el-tab-pane label="橘猫">橘猫</el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
export default {
  name: 'cat',
};
</script>
```

src/views/test/dynamicComponents/component/dog.vue

```vue
<template>
  <section class="cat">
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="柯基">柯基</el-tab-pane>
      <el-tab-pane label="金毛">金毛</el-tab-pane>
      <el-tab-pane label="萨摩">萨摩</el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
export default {
  name: 'cat',
};
</script>
```

![未使用keep_alive]()

![使用keep_alive]()

## 10. Vue 异步组件

### (1) 全局异步组件

```js
Vue.component(
  'async-webpack-example',
  () => import('./my-async-component')
)
```

### (2) 局部异步组件

大型应用中可能需要将应用分割成一些小的代码块，只在需要的时候才从服务器加载，这就需要使用 ES6 引入的 `import()` 函数，支持动态加载模块，返回一个 `Promise 实例`

src/views/test/asyncComponents/index.vue

```vue

```

src/views/test/dynamicComponents/component/child.vue

```vue

```

src/views/test/dynamicComponents/component/loading.vue

```vue

```

src/views/test/dynamicComponents/component/error.vue

```vue

```

![vue2局部异步组件]()

## 11. Vue 过渡

### (1) 单元素/组件的过渡

Vue 提供 `<transition></transition>` 的封装组件，可以在以下情形给任何元素和组件添加`进入/离开`过渡效果

* 条件渲染（v-if）
* 条件展示（v-show）
* 动态组件
* 组件根节点

进入/离开过渡有以下 6 个 CSS class 切换，如果使用没有名字的 `<transition>`，v- 是类名的默认前缀，如果使用有名字的 `<transition name="xxx">`，xxx- 是类名前缀，例如 xxx-enter

```js
v-enter         //进入过渡的开始状态
v-enter-active  //进入过渡的生效状态
v-enter-to      //进入过渡的结束状态

v-appear        //
v-appear-active //
v-appear-to     //

v-leave         //离开过渡的开始状态
v-leave-active  //离开过渡的生效状态
v-leave-to      //离开过渡的结束状态
```

![过渡类名]()

进入/离开过渡有以下 8 个 JS 钩子事件

```js
@before-enter     //
@enter            //
@after-enter      //
@enter-cancelled  //

@before-appear    //
@appear           //
@after-appear     //
@appear-cancelled //

@before-leave     //
@leave            //
@after-leave      //
@leave-cancelled  //
```

### (2) 多元素/组件的过渡

## 12. Vue 插件

### (1) 开发 Vue 插件

Vue 插件通常用于添加`全局功能`，例如 vue-router、element-ui 等都算是 Vue 插件

开发一个 Vue 插件必须暴露一个 `install(Vue, options)` 方法用于安装插件，第一个参数是 Vue 构造器，第二个参数是选项对象

```js
const requestInstance = {
  //...
}

export default {
  install(Vue, options) {
    // 注入全局资源：扩展、混入、过滤、指令等

    // 添加全局属性/方法
    Vue.globalF = globalF;

    // 添加实例属性/方法
    Vue.prototype.$instanceF = instanceF;
  }
};
```

### (2) 使用 Vue 插件

在 new Vue() 创建 Vue 根实例之前通过 Vue.use() 使用插件，如下所示

```js
import MyPlugin from ''

Vue.use(MyPlugin, options)

new Vue({
  //...
})
```

### (3) 实例

src/api/request.js

```js
import axios from 'axios'

// 创建 axios 实例
const instance = axios.create({
    baseURL: '/api', 
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        config.headers.post['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    }
)

// 响应拦截器
instance.interceptors.response.use(
    response => {
        const { code, data, message } = response.data;

        if (code !== 200) {
            this.$message.error({
                content: message || 'request error',
                duration: 5 * 1000
            })

            // 50008: 非法 token，50012: 其他客户端登录，50014: Token 过期
            if (code === 50008 || code === 50012 || code === 50014) {
                this.$confirm({
                    content: '你已被登出，可以取消继续留在该页面，或者重新登录',
                    okText: '重新登录',
                    cancelText: '取消',
                }).then(() => {
                    location.reload()
                })
            }

            return Promise.reject('error')
        } else {
            return data
        }
    },
    error => {
        console.log('err' + error);
        this.$message.error({
            content: error.message,
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

const requestInstance = result => {
    const { url, method, data, config } = result;

    if (!method) return instance.all(result);

    const params = method === 'post' ? data : { params: data };
    return instance[method](url, params, config || {});
}

export default {
    install(Vue) {
        Vue.prototype.$http = requestInstance;
    }
};
```

src/index.js

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 全局样式
import './assets/style/index.scss'

// api
import Api from './api/request.js'
Vue.use(Api)

// element-ui 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 注册全局自定义指令
import './directive/index.js';

// 注册全局自定义过滤器
import './filter/index.js'

// 注册扩展
import './extend/index.js'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```
