# 一、Global

## 1. 全局对象

浏览器中全局对象是 `Window`，Node 中全局对象是 `Global`，全局对象 Global 最根本的作用是`作为全局变量的宿主`，当定义一个全局变量，这个全局变量就会同时成为全局对象的属性

## 9. global

## 6. console

console 对象是 JS 引擎提供的调试工具，用于控制台调试输出，逐渐成为了浏览器的实施标准，Node 也沿用了这个标准，提供了与行为习惯一致的 console 对象

## 2. AbortController 类

## 3. Buffer 类

## 5. 定时器

```js
setTimeout(cb,t,param...) //返回定时器编号,t毫秒后将回调函数cb添加到等待队列,其他参数将依次传入回调函数
setInterval(cb,t)         //返回定时器编号,每隔t毫秒将回调函数cb添加到等待队列
setImmediate()

clearTimeout(tId)         //无返回值,清除编号tId表示的setTimeout定时器
clearInterval(tId)        //无返回值,清除编号tId表示的setInterval定时器
clearImmediate()
```

## 7. Event、EventTarget

## 10. MessageChannel、MessageEvent、MessagePort

## 11. require()、exports、module、__dirname、__filename

<!-- * require(path/name)：返回并导出指定模块内容
* exports：module.exports 的引用
* module：当前模块的引用 -->

* **__dirname**：当前模块的目录名
* **__filename**：当前模块包含目录的文件名（文件所在位置的绝对路径）

在 /Users/mjr 目录下运行 node example.js

```js
console.log(__dirname);  //"/Users/mjr"
console.log(__filename); //"/Users/mjr/example.js"
```

## 12. performance

## 13. process

## 14. queueMicrotask(cb)

## 15. TextDecoder、TextEncoder

## 16. URL、URLSearchParams

## 17. WebAssembly
