# 四、Node 全局对象

## 1. global 对象

global 对象是 Node 的`全局命名空间对象`，与浏览器环境中的 window 对象类似，都可以为用户提供全局属性和全局方法的访问能力

在某个 JS 文件中定义一个全局变量，在浏览器环境中该变量能够被所有页面访问，在 Node 环境中只能被当前模块访问，其他模块不可见，即使该变量会成为 global 对象的属性

![global]()

## 2. console 对象

console 对象是 `JS 引擎`提供的调试工具，用于控制台调试输出，逐渐成为了浏览器的实施标准，Node 也沿用了这个标准，提供了与浏览器行为习惯一致的 console 对象

## 3. 其他全局对象

###  定时器

```node
setTimeout(cb,t,param...) //返回定时器编号,t毫秒后将回调函数cb添加到等待队列,其他参数将依次传入回调函数
setInterval(cb,t)         //返回定时器编号,每隔t毫秒将回调函数cb添加到等待队列
setImmediate()

clearTimeout(tId)         //无返回值,清除编号tId表示的setTimeout定时器
clearInterval(tId)        //无返回值,清除编号tId表示的setInterval定时器
clearImmediate()
```

###  Buffer

###  Event、EventTarget

###  MessageChannel、MessageEvent、MessagePort

###  performance

###  process

###  queueMicrotask(cb)

###  TextDecoder、TextEncoder

###  URL、URLSearchParams

###  WebAssembly

###  AbortController 类

①②③④⑤⑥⑦⑧⑨⑩
