# 四、Vue Router

## 1. 前端路由

浏览器地址栏的 URL 变化时，会请求对应的网络资源，而负责响应这个网络资源的服务就称为路由

默认情况下，浏览器地址栏 URL 变化时，会向服务器发起新的请求，前端路由的核心基础就是`修改浏览器地址栏 URL 时，不向服务器发起请求`

根据浏览器提供的 API，前端路由有以下两种实现方式

### (1) 基于 history 实现

#### ① history 对象

History 对象表示当前浏览器窗口的`浏览历史`

History 对象保存了当前浏览器窗口浏览过的所有文档地址，由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航，浏览器工具栏的前进和后退按钮，就是对 History 对象进行操作

```js
定义：window.history
属性：history.length                       //返回当前浏览器窗口的访问过的文档数量(包括当前文档)
     history.state                         //返回History栈中顶层文档的state对象
方法：状态方法：
     history.pushSate(state,title,url)    //无返回值,向history对象添加一条最新浏览记录,地址栏立刻变化,但是不会跳转
     history.replaceSate(state,title,url) //无返回值,替换history对象的当前浏览记录,地址栏立刻变化,但是不会跳转
     地址导航方法：
     history.back()                       //无返回值,当前浏览器窗口加载上一个访问文档(浏览器后退键)
     history.forward()                    //无返回值,当前浏览器窗口加载下一个访问文档(浏览器前进键)
     history.go(n)                        //无返回值,当前浏览器窗口加载指定文档(以当前文档为基准,n=0则刷新当前文档,n>0则前进)
```

* 将要添加的浏览记录相关联的状态对象，浏览器会将这个状态对象序列化以后保存在`本地`，载入这个记录时可以拿到这个对象，不需要这个对象可以填 `null`，主要用于 popstate 事件，popstate 事件触发时 state 对象会传入该事件回调函数

history.pushSate(state,title,url)

* 向 History 对象添加一条最新浏览记录，浏览器地址栏立刻变化，但是不会跳转
* 浏览器也不会检查该文档是否存在，只是成为浏览历史中的最新记录
* 点击浏览器后退按钮，浏览器地址栏立即变成上一条记录，页面不变

history.replaceSate(state,title,url)

* 将 History 对象当前浏览器记录替换成指定 URL，浏览器地址栏立即变化，但是不会跳转
* 浏览器也不会检查该文档是否存在，只是成为浏览历史中的最新记录
* 点击浏览器后退按钮，浏览器地址栏立即变成上上一条记录，页面跳转

history.back()/forward()/go(n)

* 将要加载的文档若是访问过，则从`浏览器缓存`中加载，否则要求服务器发送文档

#### ② popstate 事件

每当`同一个文档`的 history 对象变化时，就会触发 popstate 事件，如果浏览历史的切换导致加载不同的文档，不会触发 popstate 事件

* 用户点击浏览器后退和前进按钮，会在 window 对象上触发 popstate 事件
* 调用 back()、forward()、go() 方法时，会在 window 对象上触发 popstate 事件
* 调用 pushState()、replaceState() 方法时，不会触发 popstate 事件
* 由于改变片段识别符会改变 History 对象的浏览记录，因此会在 `window` 对象上触发 `popstate` 事件，并且先触发 popstate 事件，后触发 hashchange 事件

Event对象相关属性如下

```js
e.state //返回浏览器 History对象当前记录的state对象
```

实例

```js
//当前文档 URL：https://wangdoc.com/javascript/bom/history.html

window.addEventListener('popstate', function(e){
  console.log('state');
});

history.pushState(null, '', 'https://wangdoc.com/javascript/bom/window.html'); //控制台无反应
history.back(); //'state', 文档不变,history.html

history.replaceState(null, '', 'https://wangdoc.com/javascript/bom/same-origin.html'); //控制台无反应
history.go(); //控制台无反应, 文档变化,same-origin.html
```

#### ③ 监听 pushState、replaceState

* 通过 history.pushState()、history.replaceState() 这两个 API 操作浏览器历史记录，从而实现修改浏览器地址栏 URL 而无需重新请求服务器
* history.pushState()、history.replaceState() 这两个 API 不会触发 popstate 事件，因此无法监听到 URL 变化，必须要通过其他方式监听这两个 API

以下示例通过新建全局事件 pushState、replaceState 监听 history.pushState()、history.replaceState() API

```js
const _globalE = function(ename){
  const orig = history[ename]
  return function(){
    const rv = orig.apply(this, arguments)
    const e = new Event(ename)
    e.arguments = arguments
    window.dispatchEvent(e)
    return rv
  }
}
history.pushState = _globalE('pushState')
history.replaceState = _globalE('replaceState')

window.addEventListener('pushState', function(e){
  console.log('pushState')
})
window.addEventListener('replaceState', function(e){
  console.log('replaceState')
})


//当前文档 URL：https://wangdoc.com/javascript/bom/history.html

history.pushState(null, '', 'https://wangdoc.com/javascript/bom/window.html'); //'pushState'

history.replaceState(null, '', 'https://wangdoc.com/javascript/bom/same-origin.html'); //'replaceState'
```

### (2) 基于 hash 实现

#### ① 片段识别符

片段识别符是 `URL 的锚`，代表文档中的一个位置，# 号后面的字符就是该位置的标识符

```js
url.hash
location.hash
```

* HTTP 请求不包括片段识别符
  
  片段识别符不包含在 HTTP 请求 URL 中，对服务器完全无用，仅仅是用来`指导浏览器动作`的，浏览器读取到 URL 后，会自动根据 URL 的片段识别符滚动到文档指定位置

* 改变片段识别符不触发文档重载
  
  改变 URL 的片段识别符，浏览器只会滚动到文档指定位置，不会重新加载文档

* 改变片段识别符会改变浏览器访问历史
  
  每次改变 URL 的片段识别符，都会在浏览器的 History 对象中新增一个浏览记录，点击后退按钮，可以回到文档的上一个位置

  由于改变片段识别符会改变 History 对象，因此会在 `window` 对象上触发 `popstate` 事件

  先触发 popstate 事件，后触发 hashchange 事件

#### ② hashchange 事件

HTML5 新增 hashchange 事件，每当 URL 的片段识别符改变时，就会在 `window 对象`上触发 hashchange 事件

Event 对象相关属性如下

```js
e.oldURL    //返回变化前的完整URL
e.newURL    //返回变化后的完整URL
```

实例

```html
<button id="btn1">part1</button>
<button id="btn2">part2</button>
<div id="part1" style="height:500px;border:1px solid red;">part1</div>
<div id="part2" style="height:500px;border:1px solid red;">part2</div>
```

```js
window.addEventListener('popstate', function(e){
  console.log('state');
});
window.addEventListener("hashchange", function(e) {
  console.log("oldURL: ", e.oldURL);
  console.log("newURL: ", e.newURL);
});

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
btn1.addEventListener('click', function(e){
  location.hash = '#part1';
})
btn2.addEventListener('click', function(e){
  location.hash = '#part2';
})
```

## 2. Vue Router

Vue Router 是 Vue 的官方路由管理器，与 Vue 的核心深度集成

Vue + Vue Router 构建单页面应用非常简单，使用 Vue 可以通过组合组件来构建应用程序，使用 Vue Router 可以将组件映射到路由，告诉 Vue Router 在哪里渲染组件

Vue Router 3.x 版本是一个`类`

### (1) 路由模式

#### ③ history 模式

* 利用 window.history 对象的 history.pushState(state,title,url) 方法更改前端路由

#### ③ hash 模式

* 直接修改 URL 的 hash 属性更新前端路由
* 然后在 window 对象上监听 hashchange 事件

#### ③ 两者对比

前端路由的核心在于 `改变视图的同时不会向服务器发出请求`

Vue Router 默认 `hash 模式`

* history.pushState() 设置的新 URL 可以与旧 URL 一模一样，仍然会把新 URL 添加到 History 栈
* hash 设置的新值必须与旧值不同，才会将新 URL 添加到 History 栈

* history 模式下前端 URL 必须和 HTTP 请求 URL 完全一致，否则如果服务器缺少对子路由的处理，会返回 404 错误，因此 history 模式服务器需要增加一个覆盖所有情况的候选资源，如果 URL 匹配不到任何静态资源，服务器返回同一个 HTML 文档
* hash 字符串不包含在 HTTP 请求 URL 中，对服务器完全无用，仅仅是用来`指导浏览器动作`的，浏览器读取到 URL 后，会自动根据 URL 的片段识别符滚动到文档指定位置，因此即使服务器没有做到对路由的全覆盖，也不会返回 404 错误

router/index.js

```js
// Vue Router 3.x 版本是一个类
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home")
  }
];

const router = new VueRouter({
  mode: "hash", //决定路由模式
  base: process.env.BASE_URL,
  routes
});
```

### (2) 动态路由

#### ① 通配符

使用通配符 `*` 匹配任意路径

|模式|匹配路径|
|----|-------|
|*|所有路径|
|/user-*|/user-开头的所有路径|

#### ② 冒号

使用冒号 `:` 配置动态路由，即某种模式匹配到的所有路由，全都映射到同个组件

|模式|匹配路径|$route.params|
|----|-------|-------------|
|/user/:username|/user/evan|{ username: 'evan' }|
|/user/:username/post/:post_id|/user/evan/post/123|{ username: 'evan', post_id: '123' }|

### (3) 嵌套路由

使用 `children` 配置嵌套路由，以 `/` 开头的嵌套路径会被当做`根路径`

router/index.js

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/statistics",
    meta: { title: '统计分析', icon: '', noCache: true },
    children: [
      {
        path: "duty",
        name: "统计报表",
        component: () => import("@/views/statistics/report"),
        meta: { title: '统计报表', icon: '', noCache: true }
      },
      {
        path: "chart",
        name: "统计图表",
        component: () => import("@/views/statistics/chart"),
        meta: { title: '统计图表', icon: '', noCache: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
```

### (4) 重定向

使用 `redirect` 配置重定向，重定向的意思是，用户访问 / 时，浏览器 URL 会被替换为 /home，匹配路由为 /home

router/index.js

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/home', //重定向到首页
  },
  {
    path: "/home",
    meta: { title: '首页', icon: '', noCache: true },
    component: () => import('@/views/Home')
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});
```

## 3. 路由导航

### (1) 路由导航

组件内部通过 `this.$router` 访问路由实例，因此可以通过以下三个方法导航到不同的 URL

```js
this.$router.push(route)    //向history对象添加一条最新浏览记录,地址栏立刻变化,跳转
this.$router.replace(route) //修改history对象的当前浏览记录,地址栏立刻变化,跳转
this.$router.go(n)          //浏览器加载指定索引的路由
```

组件 home

```html
<template>
  <div class="home">
    home

    <button @click="judgeAbout">跳转到about</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    judgeAbout() {
      this.$router.push({
        path: "/about",
        query: {
          title: "hha"
        }
      });
    }
  }
};
</script>
```

组件 about

```js
<template>
  <div class="about">
    about
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.query); //{title: 'hha'}
  }
};
</script>
```

### (2) 导航守卫

导航守卫主要用来通过`跳转或取消`的方式守卫导航，`参数或查询`的改变并不会触发`进入/离开`的导航守卫

每个守卫方法都接收三个参数

* to：导航将要进入的路由
* from：导航正要离开的路由
* next：确保 next() 方法在任意给定的守卫方法中都被严格调用一次
  * next()：执行管道中的下一个守卫方法，全部守卫方法执行完后，导航的状态为`已确认 confirmed`
  * next(false)：中断当前导航
  * next(route)：中断当前导航，进行一个新的导航跳转到指定路由
  * next(error)：中断当前导航，错误对象被传递给 router.onError() 注册的回调函数

### (3) 全局守卫

```js
beforeEach(to,from,next)    //全局前置守卫,导航触发后调用
beforeResolve(to,from,next) //全局解析守卫,导航确认前,同时所有组件内守卫执行后调用
afterEach(to,from,next)     //全局后置钩子,导航确认后调用
```

* afterEach 全局后置钩子不接受 next() 方法也不改变导航本身

permission.js

```js
import router from './router'

router.beforeEach((to, from, next) => {
  //当前用户登录状态
  let isLogin = window.sessionStorage.getItem('isLogin');

  //需要判断登陆状态的路由集合
  const nextRoute = ['home', 'duty', 'shift', 'report'];

  //跳转至集合中的路由时,如果是未登录状态,跳转到登陆页面
  if (nextRoute.includes(to.name) && isLogin) {  
    router.push({ name: 'login' })
  }

  //跳转到登陆页面时,如果是已登陆状态,跳转到首页
  if (to.name === 'login' && isLogin) {
    router.push({ name: 'home' });
  }

  next();
});

router.beforeResolve((to, from, next) => {
  //...
});

router.afterEach((to, from) => {
  //...
});
```

### (4) 路由守卫

```js
beforeEnter(to,from,next) //路由独享守卫,全局前置守卫 beforeEach执行后调用
```

router/index.js

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("../views/login/index"),
    meta: { title: "登陆", noCatch: true },
    hidden: true,
    //login 路由独享守卫
    beforeEnter: (to, from, next) => {
      console.log(to);
      console.log(from);
      console.log(next);
    }
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
```

### (5) 组件内守卫

```js
beforeRouteEnter(to,from,next)  //导航进入当前组件对应的路由前调用,不能访问 this
beforeRouteUpdate(to,from,next) //路由改变但是当前组件被复用时调用,例如路由 /foo/:id 在 /foo/1 和 /foo/2 之间跳转
beforeRouteLeave(to,from,next)  //导航离开当前组件对应的路由前调用
```

* beforeRouteEnter 是支持给 next() 参数函数传递回调的唯一组件内守卫，其他组件内守卫 beforeRouteUpdate、beforeRouteLeave 内已经可以访问 this，因此不支持给 next() 参数函数传递回调
* beforeRouteLeave 守卫常用来禁止用户在未保存修改前突然离开

```html
<template>
  <div id="app">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      title: "大可爱",
    };
  },
  beforeRouteEnter(to, from, next){
    //导航进入当前组件对应的路由后执行回调
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate (to, from, next) {
    //可以直接访问 this
    this.name = to.params.name
    next()
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false) //中断当前导航
    }
  }
};
</script>
```

### (6) 导航解析流程

* 导航被触发
* 将要离开的组件里调用 beforeRouteLeave 守卫
* 在重用的组件里调用 beforeRouteUpdate 守卫
* 调用全局前置守卫 beforeEach
* 在路由配置文件将要进入的路由那里调用路由独享守卫 beforeEnter
* 在激活的组件里调用 beforeRouteEnter 守卫
* 调用全局解析守卫 beforeResolve
* 导航被确认，无法再更改，这一步之前的所有守卫都可以通过 `next()` 方法导向其他路由或者停止
* 调用全局后置钩子 afterEach
* 触发 DOM 更新
* 在激活的组件里调用 beforeRouteEnter 守卫的 `next 参数函数的回调函数`
* 在激活的组件里调用`生命周期钩子`

## 4. 滚动行为

使用前端路由，当切换到新路由时，无论是想要页面保持原先的滚动位置还是滚动到底部，Vue Router 都能做到，可以自定义路由切换时页面如何滚动

router/index.js

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(to);
    console.log(from);

    // savedPosition 仅当 popstate 导航时才可用(浏览器的前进后退按钮触发)
    if (savedPosition) {
      return savedPosition; //滚动到旧路由的位置
    } else if (to.hash) {
      return to.hash; //滚动到新路由的锚点
    } else {
      return { x: 0, y: 0 }; //保持在顶部
    }

    // 异步滚动
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  }
});

export default router;
```

## 5. 路由菜单

### (1) router-link

`<router-link>` 组件支持用户在具有路由功能的应用中点击导航，默认渲染成带有正确链接的 a 标签

`<router-link>` props

* to：设置目标路由，点击后立即将 to 的值传到 router.push()
* replace：设置是否调用 router.replace() 而不是 router.push()，默认 false
* append：设置是否在当前相对路径前添加基路径，默认 false
* tag：设置将 `<router-link>` 渲染成何种标签，默认 a 标签
* event：设置可以用来触发导航的事件，可以是字符串或者数组，默认 click

```html
<router-link to="/home">首页</router-link>
```

### (2) router-view

`<router-view>` 用来渲染通过 `<router-link>` 映射过来的组件，当路由更改时渲染的组件也会更改

App.vue

```html
<template>
  <div id="app">
    <!-- 单页面应用中渲染通过 `<router-link>` 路由映射过来的组件 -->
    <router-view></router-view>
  </div>
</template>
```
