# 二、Node 全局对象

## 1. global 对象

### (1) 浏览器 global 对象

浏览器 window 对象表示`浏览器窗口`，浏览器 window 对象具有双重角色

* 既是通过 JS 访问浏览器窗口的一个接口
* 又是 JS 中规定的 `global 对象`，因而全局作用域中声明的变量和函数都是 window 对象的属性和方法

浏览器 global 对象作为 `window 对象的一部分`来实现

* ES5 规定全局上下文中声明的 var、function 变量，都是 global 对象的属性，也就是 window 对象的属性
* ES6 规定全局上下文中声明的 const、let、class 变量，不属于 global 对象的属性，从 ES6 开始，全局变量将逐步与 global 对象分离

### (2) Node global 对象

Node global 对象指的是`当前模块的全局命名空间对象`，Node 中顶层作用域也就是`当前模块的作用域`，Node 开发人员谈及上下文环境 `context` 时，一般就是指 global 对象

* ES6 规定当前模块中声明的 var、function 变量，都是当前模块的 global 对象的属性
* ES6 规定当前模块中声明的 const、let、class 变量，不属于当前模块的 global 对象的属性，从 ES6 开始，当前模块的全局变量将逐渐与当前模块的 global 对象分离

![模块内全局变量和局部变量]()

## 2. console 对象

console 对象是 `JS 引擎`提供的调试工具，用于控制台调试输出，逐渐成为了浏览器的实施标准，Node 也沿用了这个标准，提供了与浏览器行为习惯一致的 console 对象

## 3. 事件循环机制相关全局对象

### (1) queueMicrotask(cb)

#### ① 浏览器

浏览器的 window 对象上实现了 window.queueMicrotask(cb) API，同于将回调函数 cb 添加到 JS 引擎线程的微任务队列

```js
console.log('start')
window.queueMicrotask(() => {
    console.log('queueMicrotask')
})
setTimeout(() => {
    console.log('setTimeout')
}, 0)
console.log('end')

//输出：
//'start'
//'end'
//'queueMicrotask'
//'setTimeout'
```

#### ② Node

同样地，Node 实现了全局方法 queueMicrotask(cb) API 用于将回调函数 cb 添加到 JS 引擎线程的微任务队列，queueMicrotask(cb) API 提供了一种可移植且可靠的延迟执行机制，该机制适用于多个不同的 JS 平台环境，是 process.nextTick(cb) 的替代方案，除非需要 process.nextTick(cb) 的特定功能，否则请使用 queueMicrotask(cb)

两个 API 之间唯一值得注意的区别是 process.nextTick(cb) 允许指定`额外参数`传递给回调函数 cb，使用 queueMicrotask(cb) 实现相同的结果需要使用`闭包或绑定函数`

* index.js
* npm run serve

    ```js
    console.log('start')
    queueMicrotask(() => {
        console.log('queueMicrotask')
    })
    setTimeout(() => {
        console.log('setTimeout')
    }, 0)
    console.log('end')

    //输出：
    //'start'
    //'end'
    //'queueMicrotask'
    //'setTimeout'
    ```

### (2) 定时器

```js
setTimeout(cb,t,param...) //返回定时器编号,t毫秒后将回调函数cb添加到等待队列,其他参数将依次传入回调函数
setInterval(cb,t)         //返回定时器编号,每隔t毫秒将回调函数cb添加到等待队列
setImmediate()

clearTimeout(tId)         //无返回值,清除编号tId表示的setTimeout定时器
clearInterval(tId)        //无返回值,清除编号tId表示的setInterval定时器
clearImmediate()
```
