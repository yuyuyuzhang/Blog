# 六、Node 事件循环

## 1. timers 模块

### (1) timers API

timers 模块提供定时器 API，用于在未来某个时间点调用某个调度函数，timers 模块是`全局`的，因此不需要 import 导入

```js
调度定时器：
setTimeout(cb,[delay,[...args]])  //返回并创建 timeout 实例,设置 delay 毫秒后调度 cb，delay 不设置或设置为 0 则默认 1ms
setInterval(cb,[delay,[...args]]) //返回并创建 timeout 实例,设置每隔 delay 毫秒重复调度 cb
setImmediate(cb,[...args])        //返回并创建 immediate 实例,设置当前事件循环结束时调用 cb

取消定时器：
clearTimeout(timeout)             //无返回值,取消指定的 timeout 实例
clearInterval(timeout)            //无返回值,取消指定的 timeout 实例
clearImmediate(immediate)         //无返回值,取消指定的 immediate 实例
```

### (2) 实例

* timers.js

  ```js
  console.log('start')

  setTimeout(() => {
      console.log('timeout')
  }, 500)

  setInterval((a) => {
      console.log('interval ' + a)
  }, 500, 'zhangyu')

  setImmediate(() => {
      console.log('immediate')
  })

  console.log('end')
  ```

* node timers.js

  ![timers]()

## 2. Node 事件循环

### (1) Node 事件循环机制

Node 是`单进程单线程应用程序`，Node 事件循环和浏览器的事件循环原理是不一致的，一个是基于 `libev 库`，一个是基于`浏览器`

微任务优先级高于宏任务，只有微任务队列清空后，才会执行宏任务，而 process.nextTick 优先级高于 Promise

* **微任务**：process.nextTick、Promise.then/catch/finally()
* **宏任务**：setImmediate、setTimeout、setInterval、IO
  * setTimeout 如果不设置时间或者设置时间为 0，默认 1ms

```js
import process from 'process'
import fs from 'fs'

console.log('start');

setTimeout(() => { 
    console.log('1'); 
}, 0);

setImmediate(() => {
    console.log('setImmediate 1');
});

fs.readFile('./index.js', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;
    console.log('read file success');
});

process.nextTick(() => {
    console.log('nextTick')
})

new Promise((resolve) => {
    console.log('promise')
    resolve();
}).then(() => {
    console.log('promise cb')
})

console.log('end');
```

![node事件循环]()
