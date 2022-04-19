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

### (1) Node 异步回调函数

Node 异步回调函数必须满足以下几个关键点，其他一切都是可变的

* 最后一个参数是`回调函数`
* 有错误发生时，创建一个 `Error 对象`并将其作为回调函数的第一个参数
* 无错误发生时，调用回调函数，其第一个参数设为 `null`，并传入相关数据
* 回调函数必须在 `process.nextTick()` 中调用，从而确保进程不被阻塞

```js
const fib = n => {
    if(n < 2) return n
    return fib(n - 1) + fib(n - 2)
}

const Obj = function() {}

Obj.prototype.doSomeThing = function(_arg) {
    // 最后一个参数为回调函数
    let cb = arguments[arguments.length - 1] 
    cb === typeof cb === 'function' ? cb : null

    const arg = typeof _arg === 'number' ? _arg : null

    if(!arg) {
        return cb(new Error('first _arg missing or not a number'))
    } else {
        process.nextTick(() => {
            const data = fib(arg)
            cb(null, data)
        })
    }
}

// 实例测试
const test = new Obj()
const num = 10
test.doSomeThing(10, (err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)   // 55
    }
})

test.doSomeThing('10', (err, res) => {
    if(err) {
        console.error(err) // Error: first _arg missing or not a number
    } else {
        console.log(res)
    }
})
```

### (2) Node 事件循环机制

Node 是`单进程单线程应用程序`，Node 事件循环和浏览器的事件循环原理是不一致的，一个是基于 `libev 库`，一个是基于`浏览器`，Node 主线程是单线程执行的，但是 Node 存在多线程执行，包括定时器线程等等，不过主要还是主线程来循环遍历当前事件循环

微任务优先级高于宏任务，只有微任务队列清空后，才会执行宏任务

* **微任务队列**：Promise.then/catch/finally()、process.nextTick
* **宏任务队列**：IO、setImmediate、setTimeout、setInterval
  * setTimeout 如果不设置时间或者设置时间为 0，默认 `1ms`

![eventloop]()

#### ① 微任务及宏任务的优先级

> 微任务中 Promise.then/catch/finally() 优先级高于 process.nextTick
> 宏任务中 IO 操作优先级高于定时器回调（但定时器可能比 IO 操作先执行完），定时器中 setImmediate 优先级最高，优于 setTimeout(cb, 0)

* eventloop1.js

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

    fs.readFile('./test.js', {encoding: 'utf-8'}, (err, data) => {
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

* node eventloop1.js

    ![eventloop1]()

#### ② 回调函数会阻塞主线程的执行

* eventloop2.js

    ```js
    import fs from 'fs'

    console.log('start')

    const sleep = (n) => { 
        const start = new Date().getTime()
        while (true) {
            if (new Date().getTime() - start > n) {
                break
            }
        }
    }

    setTimeout(() => {
        console.log('1')
        sleep(10000)
        console.log('sleep 10s')
    }, 0)

    fs.readFile('./test.conf', {encoding: 'utf-8'}, (err, data) => {
        if (err) throw err
        console.log('read file success')
    })

    console.log('end');
    ```

* node eventloop.js

    ![eventloop]()

### (3) Node 不善于处理 CPU 密集型业务

Node 不善于处理 CPU 密集型业务，可能会导致性能问题，如果要实现一个耗时 CPU 的计算逻辑，处理方法有如下 2 种

* 主业务进程中处理
* 通过网络异步 IO 给其他进程处理

用以上 2 个方法计算从 0 到 1000000000 之间的和对比效果

#### ① 主业务进程中处理

* cpuComputing1.js

    ```js
    import http from 'http'

    const startCount = () => {
        let sum = 0;
        for(let i=0; i<500000000; i++){
            sum = sum + i;
        }
        return sum;
    }

    const endCount = () => {
        let sum = 0;
        for(let i=500000000; i<1000000000; i++){
            sum = sum + i;
        }
        return sum;
    }

    const server = http.createServer((req, res) => {
        res.write(`${startCount() + endCount()}`)
        res.end()
    }).listen(4000, () => {
        console.log("server start at http://127.0.0.1:4000")
    })
    ```

* node cpuComputing1.js

    ![cpuComputing1]()

#### ② 异步网络 IO 给其他进程处理

异步网络 IO 充分利用了 Node 的异步事件驱动能力，将耗时 CPU 计算逻辑交给其他进程处理，而无需等待耗时 CPU 计算，可以直接处理其他请求或者其他部分逻辑

* startCount.js

    ```js
    import http from 'http'

    const server = http.createServer((req, res) => {
        let sum = 0;
        for(let i=0; i<500000000; i++){
            sum = sum + i;
        }
        res.write(`${sum}`);
        res.end()
    }).listen(4001, () => {
        console.log('server start at http://127.0.0.1:4001')
    })
    ```

* endCount.js

    ```js
    import http from 'http'

    const server = http.createServer((req, res) => {
        let sum = 0;
        for(let i=500000000; i<1000000000; i++){
            sum = sum + i;
        }
        res.write(`${sum}`);
        res.end()
    }).listen(4002, () => {
        console.log('server start at http://127.0.0.1:4002')
    })
    ```

* cpuComputing2.js

    ```js
    import http from 'http'
    import requestPromise from 'request-promise'

    const startCount = async () => {
        await requestPromise.get('http://127.0.0.1:4001')
    }
    const endCount = async () => {
        await requestPromise.get('http://127.0.0.1:4002')
    }

    const server = http.createServer((req, res) => {
        Promise.all([
            startCount(),
            endCount()
        ]).then(values => {
            let sum = values.reduce((prev, curr) => {
                return parseInt(prev) + parseInt(curr);
            })
            res.write(`${sum}`);
            res.end(); 
        })
    }).listen(4000, () => {
        console.log('server start at http://127.0.0.1:4000')
    })
    ```

* node cpuComputing3.js

    ![cpuComputing2]()
