[TOC]

## vue

### 用法

```
    <div id="app">
      {{ message }}
    </div>
    var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })
```

### 语法

##### 文本：{{}}

```
   “Mustache”语法  {{}}
```

##### 原始 html：v-html

```
    双大括号会将数据解释为普通文本，真正的html需要通过v-html显示
```

##### 动态更新 html 特性（属性）：v-bind，缩写:

```
    作用在 HTML 特性上应该使用v-bind
```

##### 指令：v- 前缀的特殊特性

### 计算属性与侦听器

#### 计算属性

```
    用于复杂逻辑

    基本用法
        computed: {
            // 计算属性的getter
            test: function () {
                return this.message
            }
        }

    常用场景
        1.后台传入数据是value，列表显示需要是value对应的文字（也可用methods，methods不能缓存）
        2.组件中，需要随prop改变重新计算的data（也可用watch，watch代码较多，需要声明data）

    传入参数的方法（建议使用方法传参！）
        // 利用闭包传入参数
        computed: {
            reversedMessage: function() {
                return function(value) {
                    return value
                }
            }
        }

```

##### 计算属性的 setter

```
    计算属性默认只有 getter ，可以在需要时提供一个 setter
```

##### 计算属性 vs 侦听方法

```
    侦听器watch的变量会与data中声明的变量代码重复
```

##### 计算属性 vs 方法

```
    计算属性是基于它们的响应式依赖进行缓存的
    只在相关响应式依赖发生改变时才会重新求值
```

#### 侦听器——watch

```
    基本用法，侦听data
        watch:{
            option1:function(val){
                this.chart.setOption(val)
            },
            option2{
                handler(newVal,oldVal){
                    if(newVal){
                        this.chart.setOption(val)
                    }
                },
                deep:true // 如果监听的是对象，需要使用deep:true监听到对象中的值发生变化
            }
        }
```

### Class 与 Style 绑定

#### class

```
    对象语法
        :class="{class:flag}"
        :class="{class:flag,class2:flag}"
        :class="{ active: isActive, 'text-danger': hasError }"
    三元表达式
        :class="flag==0?'class1':'class2'"
    与计算属性结合
        <div v-bind:class="classObject"></div>
        computed: {
          classObject: function () {
            return {
              'text-danger': this.error
            }
          }
        }
    数组语法（适合多种判定方法时使用，可以应用多个class）
        <div v-bind:class="[activeClass, errorClass]"></div>
        结合三元表达式
            :class="[flag2==1?'class3':'','class4']"
        结合对象
            :class="[{ active: isActive }, errorClass]"
    注意
        带有横杠写法的类名，需要加引号
        vue会将"{}"中的内容应用到js中处理，而横线“-”（不是下划线）， 空格是js不支持的变量，因此需要加引号
```

#### style

```
    CSS 属性名
        可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名

    语法
        拼接方式
            :style="{ color: activeColor, fontSize: fontSize + 'px' }"
        绑定到一个对象
            :style="styleObject"
        数组（可以应用多个样式对象）
            :style="[baseStyles, overridingStyles]"
        多重值
            :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"
        结合计算属性

    当 v-bind:style 使用需要添加浏览器引擎前缀的 CSS 属性时，Vue.js 会自动侦测并添加相应的前缀
```

### 事件

#### 使用 v-on 监听事件

```
    直接绑定js代码
    绑定方法
    在内联js语句中调用方法（传入参数）
```

#### 事件修饰符

### 表单输入绑定

#### 使用 v-model 在表单元素上创建 双向绑定

它会根据控件类型自动选取正确的方法来更新元素

```
    text textarea：value属性 input事件
    checkbox radio：checked属性 change事件
    select：value作为prop change事件
```

#### 值绑定

```
    可以通过v-bind将值绑定到某个动态属性
        此时v-model绑定的属性将于v-bind绑定的属性关联起来
        此时v-model绑定的不再是默认的静态字符串，而是value绑定的变量，具体值取决于value绑定的变量
```

#### 修饰符

```
    .lazy
        默认情况下，v-model在input事件触发后将输入框的值与数据同步，使用.lazy将会转变为change事件同步
    .number
    .trim
```

### 组件

#### 基础

组件是可复用的 Vue 实例，且带有一个名字，与 new Vue 接收相同的选项（除了 el，el 是根实例特有的选项）

可以将组件进行任意次数的复用，每用一次组件，就会有一个它的新实例被创建

##### 组件的 data 必须是一个函数

因为这样每个实例才能各自维护一份被返回对象的独立拷贝

##### 组件必须先注册

##### 每个组件必须只有一个根元素

#### 注册

##### 全局注册

```
    方法一：
        import myComponent from '@/component/myComponent'
        Vue.component('myComponent', myComponent )
    方法二
        Vue.component('myComponent', {
          // ... options ...
        })
    批量全局注册
        https://juejin.im/post/5d317f9c6fb9a07f050aa2a6
```

##### 局部注册

```
   import myComponent from '@/component/myComponent'
   export default{
       components:{
           myComponent
       }
   }
```

#### 组件创建的方式（待补充）

1. template 中直接编写字符串
2. template 使用模板字符串

参考‘处理边界情况的’->‘模板定义的替代品’

3. 内联模板（inline-template）和 X-Template
4. 创建单页面组件

#### prop

###### 作用

```
    Prop是在组件上注册的一些自定义特性，当一个值传给一个Prop特性时，他就变成了那个组件实例的一个属性
    在组件实例中，props存放着该组件可接受的prop
```

###### 浏览器对驼峰命名法的 prop 名的处理

```
    HTML 中的特性名是大小写不敏感的，浏览器会把所有大写字符解释为小写字符，因此使用 DOM 中的模板时，需要将camelCase (驼峰命名法) 的 prop 使用其等价的 kebab-case (短横线分隔命名) 命名
```

###### prop 声明方法

```
    直接声明
        props: ['title'],

    默认值：需要在prop为undefined或未定义时生效 ！
```

###### prop 类型检验

类型可以是
String
Number
Boolean
Array
Object
Date
Function
Symbol
中的任意一个，或者是一个自定义的构造函数，Vue 会通过 instanceof 进行检查

```
    props: {
        //基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
        title: String,
        s:{
            type:String,
            default:'',  // 默认值
            required:true  // 设置是必须的
        },
        o:{
            type:Object,
            default: ()=>{
                return {}  // 对象或数组默认值必须从一个工厂函数获取
        },
        o2:{
            type:Object,
            default:null  // null可以直接设置为默认值
        },
    }
```

###### 传递静态或动态的 Prop（什么时候需要 v-bind）

```
    有两种方式传入字符串
        传入静态值
            <blog-post title="My journey with Vue"></blog-post>
        传入动态值
            传入变量的值：<blog-post title="title"></blog-post>
            传入复杂表达式：
                <blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
    注意
        只有传入静态字符串常量时不需要使用v-bind，其他类型：如Number、Boolean、数组、对象都需要使用v-bind形式传递，用来表明传入的值不是字符串

    传入一个对象的所有属性
        如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind
        <blog-post v-bind="post"></blog-post>
```

###### 单项数据流

```
    父级 prop 的更新会向下流动到子组件中，但是反过来则不行，这意味着你不应该在一个子组件内部改变 prop，否则Vue会在控制台中发出警告
    如果要改变prop，可以将prop赋值给组件中的其他data，如：
        1.prop 作为组件中data的初始值
        2.使用 prop 的值来定义一个计算属性
```

###### 非 Prop 的特性

非 prop 特性是指传入一个组件，但是组件中并没有相应的 prop 定义的特性。

```
非prop特性会自动添加到组件的根元素上
```

###### 替换/合并已有的特性

对于绝大部分特性，从外部提供给组件的值会替换掉组件内部设置好的值，但是 style 和 class 特性会稍微智能一些，会把两边的值合并起来

###### prop 传递对象，直接实现双向绑定

#### 自定义事件

##### 作用

父组件通过 v-on:事件名监听子组件的任意事件，同时，子组件通过调用\$emit 并传入事件名来触发父组件的该事件

##### 事件名

```
    事件名推荐始终使用 kebab-case
```

##### v-model 在包含 input 元素的组件上的双向绑定

- 组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件实现双向绑定
- 要绑定其他 prop 和事件可以用 model 选项来重新声明

##### 在组件的根元素上直接监听原生事件

可以使用.native 修饰符

当组件做了重构，根元素被修改为不包含原生事件的情况下，.native 将静默失败，此时可以借助 Vue 的\$listeners

```
    $listeners是一个对象，里面包含作用在这个组件上的所有监听器
    可以向$listeners添加自定义监听器，然后通过v-on="$listeners"将监听器作用到某个元素，实现对组件非根元素的事件监听
```

##### .sync 实现双向绑定

- 原理

直接使用 Prop 进行双向绑定会导致维护上的问题，因此推荐以 update:value 的模式触发事件取代 Prop 双向绑定，例如

```
    子组件：this.$emit('update:title', newTitle)
    父组件：v-on:update:title="title = $event"
        注意事件名是 update:属性名
```

为了方便起见，我们为这种模式提供了一个缩写，即.sync 修饰符

```
    v-bind:title.sync="title"
```

> 注意，带有 .sync 修饰符的 v-bind 不能和表达式一起使用，只能和属性名一起使用

- 对象的.sync

v-bind.sync='obj' 会把对象的每一个属性作为一个独立的 prop 传进去

#### 插槽（slot）

```
    作用：向组件传递内容
        组件包含的内容会显示在组件中slot声明的地方
    如果要父组件在子组件中插入内容 ，必须要在子组件中声明slot 标签
    如果子组件模板不包含<slot>插口，父组件的内容将会被丢弃
```

#### 动态组件和异步组件

##### 动态组件

- 使用 is 切换组件
- keep-alive

##### 异步组件

大型应用中，可能会需要将应用分割为代码块，在需要用时才从服务器加载

###### 实现方式

- 以工厂函数的方式定义组件，该函数会异步解析组件定义，Vue 只在这个组件需要被渲染时才会触发该组件，且会把结果缓存起来供未来使用

```
    Vue.component('component-name',function(resolve,reject){})
```

如上，工厂函数会收到一个 resolve 回调，这个回调函数会在你从服务器得到组件定义的时候被调用，也可以调用 reject 来表示加载失败

- 推荐将异步组件和 Webpack 的 code-splitting 功能结合使用，在工厂函数中使用 require

```
    Vue.component('component-name',function(resolve){
        require(['./my-async-component'], resolve)
    })
```

require 语法会告诉 webpack 自动将你的代码切割成多个包，这些包会通过 Ajax 请求加载

- 也可以在工厂函数中返回 Promise

结合 webpack2 和 ES6 语法可以写成

```
    Vue.component('component-name',
        () => import('./my-async-component')
    })
```

这个 import 函数会返回一个 Promise 对象

#### 边界情况

##### 模板定义的替代品

inline-template 和 X-Template

#### 总结

##### 数据传递

###### 父组件向子组件传递——prop

###### 子组件向父组件传递数据——\$emit、双向绑定

- 通过\$emit 监听子组件事件

```
    父组件通过v-on监听子组件实例的任意事件
        <blog-post @enlarge-text="postFontSize += 0.1"></blog-post>
    子组件通过调用内建的 $emit 方法并传入事件名称来触发事件
        <button @click="$emit('enlarge-text')">
          Enlarge text
        </button>
    参数传递
        可以通过$emit的第二个参数向向监听事件提供参数
            @click="$emit('enlarge-text', 0.1)"
        父级组件可以通过 $event 访问到被抛出的这个值
            @enlarge-text="postFontSize += $event"
        监听事件的值是一个方法时，抛出的值将会作为第一个参数传入这个方法
```

###### 组件间的数据传递——子组件通过调用父组件向另一个组件传递数据

[参考](https://my.oschina.net/jishuge/blog/2222521)

```
    1.子组件: parent.vm.initTable();
        vm是父页面中的 Vue的实例
    2.子组件: this.$parent.initTable();
        注意：有多层组件容易找不到parent
    3.通过props传递this
        父组件：<parent :sup_this="this"/>
        子组件调用：this.sup_this.initTable()
```

##### 对话框组件的销毁和创建

```
    使用v-if
        <search-history
            :show="showSearchHistory"
            @close="showSearchHistory = false"
            v-if="showSearchHistory" />
        或者
            <search-history
                :visible.sync="showSearchHistory"
                v-if="showSearchHistory" />
            使用:visible.sync，此时不需要设置 @close="showSearchHistory = false"，因为关闭会自动转为 false
```

##### 创建弹框组件的三种思路

1. 按钮+弹框作为子组件

```
    优点：不需要传递控制弹框显示的flag，数据处理简单
    缺点：每个按钮都有自己的弹框组件
```

2. 按钮在父组件中，弹框作为子组件，向子组件传入 url，在组件中调用 axios

```
    优点：所有按钮共用一个弹框组件
    缺点：弹框需要用v-if实现打开时创建，关闭时销毁，在创建时调用axios，过于复杂
```

3. 按钮在父组件中，弹框作为子组件， 点击按钮时，调用 axios，然后将得到的数据传入页面

```
    优点：所有按钮共用一个弹框组件，不需要考虑弹框的创建与销毁
```

**总结**

1. 采用方法 2
2. 需要在 axios 获取到数据之后，再显示弹框，否则不显示，按钮也需要处于不可点击状态

### 自己的总结

##### 将方法绑定到 window 对象，给 app 端调用

[参考](https://blog.csdn.net/u010394015/article/details/79264093)

```
created() {
},
mounted() {
    // 将backToday方法绑定到window下面，提供给外部调用
     window['backToday'] = () => {
        this.goToday()
     }
 },
 methods: {
    goToday() {
        // to do something
    }
 }
```

##### refs 定位出现 undefined

[参考：vue 中使用 refs 定位 dom 出现 undefined 的解决方法](https://www.jb51.net/article/131163.htm)

```
    如果在mounted钩子中使用$refs，如果ref是定位在有v-if、v-for、v-show中的DOM节点，返回来的只能是undefined，因为在mounted阶段他们根本不存在
    如果说mounted阶段是加载阶段，那么updated阶段则是完成了数据更新到DOM的阶段(对加载回来的数据进行处理)，此时，ref、数据等等全部都挂载到DOM结构上去，在update阶段使用this.$refs.xxx，就100%能找到该DOM节点
    官方文档建议
        因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在！$refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定
    结论
        父组件向子组件传值作为子组件的初始值，应该使用 prop
            在父组件的 mounted(){ this.$nextTick(() => {})} 阶段赋值，通过 prop 传递
        渲染结果可使用 ref
    传递this指针不要通过refs 传递
        通过refs 传递this指针，在子组件中得到的还是指向自身的 this，应该通过prop传递
```

##### 需要双向绑定的数据，必须在 data 中声明，否则赋值一次之后，改变不了

```
    html 中
        <input :value="search.data"/>
    js 中
        data() {
            return {
                search:{}  // 仅声明search时，会出现给 search.data 赋值后，无法修改 input 框数据的情况
                search:{
                    data:'' // 一定要把data 也声明了，不能只声明到 search
                }
        }
}
```

##### vue 对 undefined 的处理

```
    data 为undefined 时，显示到页面上时，vue 会自动显示为空
    js 仍会显示 undefined
```

##### 封装定时器（增加监听）

```
    现象：单页面页面跳转，定时器仍然存在
    解决方案
        在destroyed(){} 生命周期中清除定时器
    优化：封装定时器组件，通过 this.$once() 监听钩子，清除定时器
        export function mySetTimeout(fn,timeout,that){
            var timer = setTimeout(fn,timeout)
            that.$once('hook:beforeDestroy',()=>{
                clearInterval(timer)
            })
        }
```

##### vue 给对象新增属性，且保证属性能触发更新

```
    官方定义：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新
        因此添加到对象上的新属性不会触发更新
    解决方法
        1、可以使用 Vue.set(object, key, value)
            方法将响应属性添加到嵌套的对象上
            Vue.set(vm.obj, 'e', 0)
            还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名：this.$set(this.obj,'e',02)
        2、可以创建一个新的对象，让它包含原对象的属性和新的属性
            this.obj= Object.assign({}, this.obj, { a: 1, e: 2 })
```

##### vue 操作 dom 元素

```
    1.元素上加上 ref = “dom”
        this.$refs.dom
    2.js
        js 根据 class 获取dom 元素，然后操作 dom
        var els = document.getElementsByClassName('classname')
        for(var i = 0;i<els.length;i++){
            els[i].click
        }
        注意：有时候会出现无法取到 dom 元素的情况
        （Vue 无法读取HTMLCollection列表的length解决：https://blog.csdn.net/weixin_41602509/article/details/86661758）
            官网解释：mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted
            即：mounted阶段，dom 还没加载完，js就执行了
            所以需要将 js 代码放到 nextTick() 中执行
```

##### 异步功能间的同步保持

[参考：js 异步编程](https://blog.csdn.net/natureskyblue/article/details/80155704)

```
    1、await
        需要外面包一层函数，把所有同步函数放进去
        async function makeTea(){
            await water();
            await cup();
            await tea();
        }
    2.promise
        function water(){
            return new Promise((resove,reject)=>{
                // 执行water部分
                resolve()
            })  // 必须要reolve，有错误需要 reject
        }
        water().then(()=>{ cup()  })
    3、回调函数
        function water(callback){
            // 执行water部分
            callback()
        }
        water(cup)
```

##### 引用 data 中定义的变量

```
    1.标签中
        <div>{{value}}</div>
    2.属性中
        :class = 'isActive'
    3.element中的属性引用
        <el-pagination :current-page="pagination.currentPage"></el-pagination>
```

##### 定义全局方法

```
    1.函数定义到原型链中
        注意alarm 后没有括号
        Vue.prototype.alarm = function () {
          alert(1111)
        }
        vue实例中调用：this.alarm()
    2.通过export import
        export function fn(){}
        import {fn} from ‘./index’
        html元素中引用，需要在mounted中注册：mouted:{fn}
        script 中直接引用： fn
```

##### 引入 jQuery

[参考：在 vue 项目中使用 jquery](https://blog.csdn.net/u011786439/article/details/73201216)

##### template 标签

```
    template标签内容天生不可见，设置了display:none; 属性
    使用情况：需要同时渲染多个元素时
        如需要将 v-if v-for作用在多个元素上时
        <template v-if="ok">
            <h1>Title</h1>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
        </template>
```

##### his.$el 和 this.$mount

[参考：vue 中 el 解析](https://blog.csdn.net/zhangfeng1742/article/details/82977447)

```
    el
        如果存在 render 函数或 template 属性，则挂载元素会被 Vue 生成的 DOM 替换；
        否则，挂载元素所在的 HTML 会被提取出来用作模版
        new Vue({
          el: '#ppp',
          router,
          store,
          render: h => h(App)
        })
        new Vue({
          el: '#ppp',
          router,
          components: { App },
          template: '<App/>'
        })
        挂载的dom 均为 id = 'app'
    mount
        如果在实例化vue的时候指定el，则该vue将会渲染在此el对应的dom中
        若没有指定el，则vue实例会处于一种“未挂载”的状态，此时可以通过$mount来手动执行挂载
        new Vue({
          router,
          store,
        }).$mount('#ppp')
```

##### v-cloak 防止页面加载时出现 vuejs 的变量名

```
原理：包含 v-cloak属性的 html 标签在页面初始化时会被隐藏。
用法
    css中添加（css要放在vuejs 之前添加）
        [v-cloak] {  display: none;}
    html 标签加上 v-cloak
        <ul v-cloak v-for="item in items">
          <li>{{ item.name }}</li>
        </ul>
```

### 风格

[官网](https://cn.vuejs.org/v2/style-guide/)

```
    组件名：多个单词
        单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)
        应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V
    prop：camelCase
        HTML 中则是 kebab-case（html不区分大小写）

```

## webpack

### 静态资源打包

#### css、图片等静态资源打包原理

```
    原理：开发环境是以相对路径寻找图片，生产环境是以绝对路径寻找图片

    问题：打包后，image图片地址出错
    打包过程
        按照路径查找到css 调用的相应图片，将静态资源分别放到 css、img 目录下
        此时xxx.png 的路径被改为 static/img/xxx.png
        此时xxx.css的路径为static/css/xxx.css，在打包后的css中想要访问图片需要先回到根目录，才能通过 /static/img/xxx.png（绝对路径）正确访问图片
    解决办法
        图片加载模块，需要加上 publicPath:'../../' ，才能让static/css/ 中的css正确访问：static/img/xxx.png
        注意：在处理css 的js中修改，vue-cli 中是在build 下的 utils.js 修改
        module:{
            rules:[{
                test:xxxx
                loader:xxx,
                options:{
                    publicPath:'../../'
                }
            }]
        }
```

vue 动态加载图片

[vue 动态定义图片路径](https://www.jianshu.com/p/fab484498e4e)

[vue 动态加载图片 src 的解决办法](https://blog.csdn.net/Mr_YanYan/article/details/78783091)

```
无法直接使用vue 动态加载图片
    原因
        当图片地址是直接写死在html或者css里的，webpack会帮你处理成绝对地址（以/开头的路径就是绝对路径，/指根目录）
        但是当Vue.js来动态定义图片路径的时候，url-loader是无法探测到图片路径的。我们build后发现，图片根本不会打包输出到dist目录（webpack是按需打包的）
    解决
        1. 绝对访问路径
            把图片放到静态资源目录static目录下（build 会将static目录中的文件或者文件夹按照原本的结构放在dist目录下），并用/static绝对路径访问
        2. 使用require
            src:require('../assets/user.png')
        3. 使用import
            import userPath from '../assets/user.png'
            src:userPath
```

问题：使用绝对路径访问图片，打包后路径仍是绝对路径，不是打包后的路径[vue 中静态资源的引入机制](https://segmentfault.com/a/1190000019495695)

```
用绝对路径引入时，路径读取的是public文件夹中的资源，
任何放置在 public文件夹的静态资源都会被简单的复制到编译后的目录中，
而不经过 webpack特殊处理
```

## vue-router

### vue-router 的使用

```
    创建router实例
        // 模块化系统，创建router对象前需调用Vue.use(VueRouter)
        const router = new VueRouter({
          routes // (缩写) 相当于 routes: routes
        })

    组件注入
        通过在 Vue 根实例注入router实例，可以在任何组件内，通过this.$router访问router 实例，通过this.$route 访问当前路由
```

==this.\$router 和 router 使用起来完全一样==

### 动态路由匹配与组件复用

作用：不同参数的路由都匹配到同一个组件

通过动态路径参数实现

```
一个动态参数使用:标记，当匹配到一个路由时，参数值会被设置到this.$route.params，可以在每个组件中使用
    routes: [
        { path: '/user/:id', component: User }]

可以在一个路由中设置多段“路径参数”
```

- 复用组件时如何相应参数变化

当使用路由参数时，原来的组件实例会被复用，这也意味着组件的生命周期钩子不会再被调用，因此复用组件时想要对路由参数变化做出相应，可以通过 watch 监听\$route 变化，或者使用 beforeRouteUpdate 导航守卫

- 匹配 404

*（通配符）可以匹配任意路径，可以通过 *将匹配不到的路径，匹配到 404

### 嵌套路由

以 / 开头的嵌套路径会被当作根路径， 子路由路径不加上/即可实现嵌套

### 编程式的导航

除了通过<router-link>标签导航，还可以借助通过 Vue Router 的导航方法

Vue Router 的导航方法实际上是借鉴 window.history 的 API，Vue Router 的导航方法在各类模式（history hash abstract）下表现一致

- router.push

点击 <router-link> 时，这个方法会在内部调用，点击 <router-link :to="..."> 等同于调用 router.push(...)

该方法的参数可以是字符串路径或描述地址的对象

```
带参数的情况
    1.命名路由（name） + params：
        router.push({ name: 'user', params: { userId: '123' }})
    2.path + query（因为提供了path，params会被忽略，因此只能使用query）
        router.push({ path: '/user', query: { userId: '123' }})
        或者
        router.push({ path: `/user/${userId}` }) // -> /user/123
        此时路径会变成/user?userId=123，页面刷新参数仍会存在
```

- router.replace

和 push 很像，区别在于不会项 history 添加新纪录，而是会替换当前的 history 记录

- router.go

在 history 记录中向前或向后退多少步，类似 window.history.go(n)

### 命名路由

通过一个名称标识路由，并且可以通过标识进行跳转

### 命名试图

### 重定向和别名

别名作用：当 url 名称改变时，但路由匹配不变

### 路由组件传参

通过 props 将组件和路由解耦

如果 props 被设置为 true，route.params 将会被设置为组件属性。如：

```
    routes: [
        { path: '/user/:id', component: User, props: true }]
    子组件通过props获取参数
        const User = {
            props: ['id'],
            template: '<div>User {{ id }}</div>'
        }
```

### history 模式

```
    hash模式：使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载
    history模式：会使URL 像正常的 url
```

### 导航守卫

#### 全局导航守卫

##### 全局前置守卫 router.beforeEach

==守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中==（所有守卫是指现在的全局前置守卫，还是指下面的所有守卫？是在这个守卫中的导航，还是完整的导航？）

接收三个参数 to from next

- to：即将要进入的目标路由对象
- from：当前导航正要离开的路由
- next：一定要调用该方法来 resolve 钩子

执行效果依赖 next()方法的调用参数

```
    next() 进行管道的下一个钩子
        注意：不改变当前路由的url
    next(false) 中断当前的导航
    next('/')或 next({path:'/'}) 跳转到一个不同的地址，当前导航被中断，然后进行一个新的导航
    next(error) 导航会被终止且错误会被传递给route.onError()注册过的回调
```

##### 全局解析守卫 router.beforeResolve

==在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫被调用==

##### 全局后置钩子 router.afterEach

与其他全局守卫不同的是：不接受 next 函数，也不会改变导航本身

#### 路由独享的守卫

##### beforeEnter

可以在路由配置上直接定义，全局前置守卫的方法参数一样

```
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
```

#### 组件内的守卫

可以在路由组件内定义

```
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
  },
  beforeRouteUpdate (to, from, next) {
  },
  beforeRouteLeave (to, from, next) {
  }
}
```

##### beforeRouteEnter

在渲染该组件的对应路由被 confirm 前调用

不能获取组件实例`this`，因为当守卫执行前，组件实例还没被创建

可以通过传一个回调给 next 来访问组件实例，在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数

##### beforeRouteUpdate

在当前路由改变，但是该组件被复用时调用

可以访问`this`

##### beforeRouteLeave

导航离开该组件的对应路由时调用，通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消

可以访问`this`

### 数据获取

- 导航完成后获取数据

```
    组件的create阶段获取
```

- 导航完成前获取数据

```
    组件的beforeRouteEnter阶段获取
```

### 过渡动效

可以用<transition>给组件增加过渡效果

可以给所有路由添加一样的过渡效果，或者给单个路由设置过渡效果

### 滚动行为

可以通过 route 实例中的 scrollBehavior 方法，确定切换新路由时页面的位置，可以是滚动到顶部，或者是保持原先的滚动位置

### 路由懒加载

把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件

#### 通过结合 Vue 的异步组件和 Webpack 的 code-splitting 实现

1. 首先需要将异步组件定义为返回一个 Promise 的工厂函数
2. 在 Webpack2 中，使用动态 import 语法来引入代码分块点

结合以上两点得到：

```
    routes: [
        { path: '/foo', component:() => import('./Foo.vue')}
    ]
```

## vuex

```
    Vuex 的状态存储是响应式的
        调用 store 中的状态简单到仅需要在计算属性中返回即可
        触发变化也仅仅是在组件的 methods 中提交 mutation
            改变 store 中的状态的唯一途径就是显式地提交mutation
    将store从根组件注入后（需调用Vue.use(Vuex)）
        子组件可以通过this.$store 访问store
    创建
        // 模块化系统，创建store对象前需调用Vue.use(Vuex)
        const store = new Vuex.Store({
            state: {
                count: 0
            },
        })
```

### state

```
    获取state
        访问store.state
        mapState（将state映射到计算属性）
            ...mapGetters（使用对象展开符混入）

```

### Getter

```
    相当于store 的计算属性
    访问
        通过 store.getters 对象访问
        mapGetters（将 getter 映射到计算属性）
        ...mapGetters（将 getter 混入 computed ）
```

### Mutation

```
    类似事件
        有一个字符串的事件类型和回调函数
        回调函数接受state作为第一个参数
        应该使用常量替代事件类型
        mutation 必须是同步函数
    提交Mutation
        store.commit('XXX')
        mapMutations（将组件中的methods映射为store.commit）
        ...mapMutations
    参数
        载荷
            向store.commit() 传入额外的参数
            载荷大多数情况下是对象
        对象风格提交
            store.commit({
              type: 'increment',
              amount: 10
            })
```

### Action

```
    Action
        提交的是 mutation
        可以包含任意异步操作
        函数参数：content对象
            与store 实例具有相同方法和属性，但不是 store 实例本身
        与Mutation一样，支持载荷方式和对象方式进行分发
    触发
        store.dispatch() 触发
        mapActions （将组件的 methods 映射为 store.dispatch）
    组合Action
        promise
        async/await
```
