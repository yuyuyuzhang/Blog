# Node 事件循环

## 1. Node 事件循环

Node 是单进程单线程应用程序，

Node 事件循环和浏览器的事件循环原理是不一致的，一个是基于 libev 库，一个是基于浏览器

## 2. Node 事件循环流程图

Node 事件循环原理的核心流程图如下，这一流程包含 6 个阶段，每个阶段的含义如下

* **timers**：执行 setTimeout、setInterval 定时器的回调函数
* **pending callbacks**：执行某些系统操作（TCP 错误类型）的回调函数
* **idle、prepare**：仅系统内部使用
* **poll**：检索新的 IO 事件，执行与 IO 相关的回调
* **check**：执行 setInmmediate 回调函数，并不是立即执行，而是当 poll 阶段没有新的事件处理时执行
* **close callbacks**：执行一些关闭的回调函数，例如 socket.on('close', ...)

![Node事件循环原理流程图](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/Node%20%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E5%8E%9F%E7%90%86%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

```js
const fs = require('fs');

setTimeout(() => { // 新的事件循环的起点
    console.log('1'); 
}, 0);

setImmediate(() => {
    console.log('setImmediate 1');
});

// 将会在新的事件循环中的 pending callbacks 阶段执行
fs.readFile('./test.conf', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;
    console.log('read file success');
});

// 该部分将会在首次事件循环中执行
Promise.resolve().then(()=>{
    console.log('poll callback');
});

// 首次事件循环执行
console.log('2');
```

## 3. poll 回调队列

poll 过程主要处理`异步 IO 以及其他几乎所有的回调函数`，异步 IO 又分为`网络 IO` 和`文件 IO`

事件循环主要包含宏任务和微任务

process.nextTick 优先级高于 Promise，微任务优先级高于宏任务，只有微任务队列清空后，才会执行宏任务

* **微任务**：process.nextTick、Promise
* **宏任务**：IO、setTimeout、setInterval、setImmediate
  * setTimeout 如果不设置时间或者设置时间为 0，默认 1ms

Node 不善于处理 CPU 密集型业务，这会导致性能问题，如果要实现一个耗时 CPU 的计算逻辑，处理方法有如下 2 种

* 直接在主线程中执行

  node sync.js

  ```js
  function startCount() {
    let sum = 0;
    for(let i=0; i<500000000; i++){
        sum = sum + i;
    }
    return sum;
  }
  function nextCount() {
    let sum = 0;
    for(let i=500000000; i<1000000000; i++){
        sum = sum + i;
    }
    return sum;
  }
  const http = require('http');
  const server = http.createServer((req, res) => {
    res.write(`${startCount() + nextCount()}`);
    res.end();
  });
  server.listen(4000, () => {
    console.log('server start http://127.0.0.1:4000');
  });
  ```

* 通过网络异步 IO 给其他线程处理，例如

   ```js

   ```

## 4. EventEmitter

Node约定，如果某个函数需要回调函数作为参数，则回调函数是最后一个参数。另外，回调函数本身的第一个参数，约定为上一步传入的错误对象

callback的第一个参数是Error对象，第二个参数才是真正的数据参数。这是因为回调函数主要用于异步操作，当回调函数运行时，前期的操作早结束了，错误的执行栈早就不存在了，传统的错误捕捉机制try…catch对于异步操作行不通，所以只能把错误交给回调函数处理

如果没有发生错误，回调函数的第一个参数就传入null。这种写法有一个很大的好处，就是说只要判断回调函数的第一个参数，就知道有没有出错，如果不是null，就肯定出错了。另外，这样还可以层层传递错误

①②③④⑤⑥⑦⑧⑨⑩
