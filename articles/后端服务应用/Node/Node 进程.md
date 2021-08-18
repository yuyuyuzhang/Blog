# Node 进程

## 1. 浏览器多进程

### (1) 浏览器多进程

一个应用程序至少有一个进程，一个进程至少有一个线程

Chrome 浏览器采用`多进程且多线程`并发执行的方式，打开 Chrome 浏览器的任务管理器（快捷键 Shift + ESC）可以查看谷歌浏览器的进程状态

![浏览器进程](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%A8%A1%E5%9E%8B/%E6%B5%8F%E8%A7%88%E5%99%A8%E8%BF%9B%E7%A8%8B.png)

Chrome 浏览器多进程的优势

* 避免单个标签页影响整个浏览器
* 避免单个插件影响整个浏览器
* 方便使用沙盒模型隔离进程，提高浏览器稳定性

### (2) 标签页渲染进程

浏览器会为`每个标签页`单独启动一个渲染进程

渲染进程主要负责将 HTML、CSS、JS 转化为用户可以与之交互的网页，每个渲染进程都会启动单独的渲染引擎线程、JS 引擎线程、事件触发线程、定时器计数线程、异步请求线程

![渲染进程](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%A8%A1%E5%9E%8B/%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B.png)

### (3) 浏览器下 JS 引擎线程实现异步

JS 引擎线程作为一个单线程为什么能够实现异步？因为浏览器标签页渲染进程除了 JS 引擎线程，还有事件触发线程、异步请求线程、定时器计数线程，将一些异步操作交给其他线程处理，然后采用`事件循环机制`处理返回结果

#### ① 事件循环机制

数组 eventLoop 表示任务队列，用来存放需要执行的任务，对象 event 表示当前需要执行的任务

用一个永不停歇的 while 循环来表示事件循环，一次循环称为一次 tick，每次 tick 如果任务队列中有等待的任务，就获取第一个任务执行

```js
let eventLoop = []; //任务队列，先进先出
let event;          //当前需要执行的任务

while (true) {
  //一次循环
  if (eventLoop.length > 0) {
    //任务队列中取出第一个任务
    event = eventLoop.shift(); //移除数组头部项
    try {
      event();
    } catch (err) {
      console.log(err);
    }
  }
}
```

#### ② 宏任务队列和微任务队列

**由来**：任务队列按照先进先出的顺序执行，即使排在后面的任务更为紧急，也必须等待前面的任务先执行完成，因此 JS 引擎设置宏任务队列和微任务队列 2 个任务队列，微任务队列的优先级高于宏任务队列

**原理**：由于`微任务队列的优先级高于宏任务队列`，每次事件循环时会从微任务队列中获取任务，只有当微任务队列`为空`时才会从宏任务队列中获取任务，同一个队列中的任务只遵循`先进先出`的原则

* **微任务队列**：Promise.then/catch/finally()、MutaionObserver 回调函数、process.nextTick（Node）
* **宏任务队列**：异步请求回调函数、定时器回调函数、DOM 事件回调函数、IntersectionObserver 回调函数

```js
function f1() {
  setTimeout(console.log.bind(null, 1), 0)
}
function f2() {
  Promise.resolve().then(console.log.bind(null, 2))
}
function f3() {
  setTimeout(() => {
    console.log(3)
    f2()
  }, 0)
}
function f4() {
  Promise.resolve().then(() => {
    console.log(4)
    f1()
  }, 0)
}
f3()
f4()

//输出：4 3 2 1
```

如下图所示，红色代表微任务队列，绿色代表宏任务队列

![事件循环机制](https://github.com/yuyuyuzhang/Blog/blob/master/images/JS/ES/%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF%E6%9C%BA%E5%88%B6.png)

### (4) Web Worker

随着电脑计算能力的增强，尤其是`多核 CPU` 的出现，JS 引擎单线程模型无法充分发挥计算机的计算能力，带来很大的不便

Web Worker 就是为 JS 语言创造多线程环境，`允许 JS 引擎线程创建 Wroker 线程`，将一些任务分配给 Worker 线程运行，JS 引擎线程运行的同时，Wroker 线程在后台运行，两者互不干扰，Worker 线程完成计算任务再将结果返回给 JS 引擎线程，这样的好处是一些`计算密集型或高延迟任务`可以交给 Worker 线程运行，JS 引擎线程能够保持流畅不被阻塞或拖慢

Werker 线程一旦被创建，就会始终运行，不会被 JS 引擎线程上的活动打断，这样有利于随时响应 JS 引擎线程的通信，但也导致了 Worker 线程比较耗费资源，不应该过度使用，而且一旦使用完毕就应该关闭

## 2. Node 多进程

## 3. Process 对象

Process 对象表示 `Node 进程`

每个 Node 应用程序都是一个 process 对象实例，因此 Node 应用程序能够直接使用某些内建于 process 对象的功能，process 对象的许多属性和方法能够提供应用程序身份标识和当前运行环境的信息

### (1) Process 对象属性

```js
环境属性：
process.paltform  //返回当前操作系统平台类型
process.arch      //返回当前操作系统CPU架构
process.env       //返回当前系统环境信息对象
process.version   //返回当前Node版本
process.versions  //返回当前Node及其内置模块版本
process.release   //返回当前Node版本相关信息
进程属性：
process.title     //返回或设置当前Node进程名称
process.pid       //返回当前Node进程pid
process.ppid      //返回当前Node进程ppid
process.config    //返回当前Node进程可执行文件的配置选项
process.execPath  //返回当前Node进程可执行文件的绝对路径
process.argv      //返回当前Node进程命令行参数,第一个参数是node,第二个参数是当前执行模块的绝对路径名,之后才是依次传入命令行的参数
process.execArgv  //返回当前Node进程命令行特殊参数
process.argv0     //返回当前Node进程第一个命令行参数(node)
process.debugPort //返回当前Node进程的Node调试端口
输入输出属性：
process.stdin     //返回一个指向标准输入流的只读流
process.stdout    //返回一个指向标准输出流的只写流
process.stderr    //返回一个指向标准错误流的只写流

process.allowedNodeEnvironmentFlags
process.moduleLoadList
process.domain
process.features
```

#### 实例

index.js

```js
console.log(process)
```

npm run serve

```js
{
    platform: 'win32',
    arch: 'x64',
    env: {...},
    version: 'v14.17.4',
    versions: {
        node: '14.17.4',  
        v8: '8.4.371.23-node.76',
        ...
    },
    release: {
        name: 'node',
        lts: 'Fermium',
        sourceUrl: 'https://nodejs.org/download/release/v14.17.4/node-v14.17.4.tar.gz',
        headersUrl: 'https://nodejs.org/download/release/v14.17.4/node-v14.17.4-headers.tar.gz',
        libUrl: 'https://nodejs.org/download/release/v14.17.4/win-x64/node.lib'
    },

    title: 'npm',
    pid: 19516,
    ppid: 20460,
    config: {
        target_defaults: {...},
        variables: {...}
    },
    execPath: 'D:\\node\\node.exe',
    argv: [
        'D:\\node\\node.exe',
        'E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\index.js'
    ],
    execArgv: [],
    argv0: 'node',
    debugPort: 9229
}
```

### (2) Process 对象方法

```js
进程状况：
process.uptime() //返回当前Node进程已运行的秒数
process.hrtime.bigint() //返回当前高精度实际时间(纳秒),常用于计算运行时间差
process.cpuUsage(preVal) //返回当前Node进程用户和系统的CPU使用情况,可选参数preVal为上一次调用结果
process.memoryUsage() //返回当前Node进程内存使用情况
process.resourceUsage() //返回当前Node进程资源使用情况
工作目录：
process.cwd() //返回当前Node进程的当前工作目录
process.chdir(directory) //无返回值,更改当前Node进程的当前工作目录

process.dlopen(module,fileName) //动态加载共享对象
process.kill(pid,signalArr) //将信号数组aignalArr发送到标识为pid的进程
process.emitWarning(warning,options) //触发自定义或特定于应用程序的Node进程警告
process.abort() //退出当前Node进程并生成一个核心文件,abort事件
process.exit(codeArr) //以指定退出码code终止当前Node进程

process.umask()
process.hasUncaughtExceptionCaptureCallback(cb) //返回是否使用process.setUncaughtExceptionCaptureCallback(cb)设置回调
process.setUncaughtExceptionCaptureCallback(cb) //设置发生未捕获的异常时需要调用的回调函数,异常值作为该回调第一个参数,设置该回调后不会触发uncaughtException事件,
process.nextTick()

process.binding()
process.reallyExit()
process.openStdin()
process.assert()
```

#### 查看进程状况

运行时间

* index.js
* npm run serve

    ```js
    console.log(process.uptime()) //0.0456336
    ```

运行时间差

* index.js
* npm run serve

    ```js
    const start = process.hrtime.bigint(); // 191051479007711n
    setTimeout(() => {
        const end = process.hrtime.bigint(); // 191052633396993n
        console.log(`基准测试耗时 ${end - start} 纳秒`); // 基准测试耗时 1154389282 纳秒
    }, 1000);
    ```

CPU 使用情况

* index.js
* npm run serve

    ```js
    const startUsage = process.cpuUsage();
    console.log(startUsage); // { user: 46000, system: 31000 }

    // 使 CPU 旋转 500 毫秒
    const now = Date.now();
    while (Date.now() - now < 500);

    const endUsage = process.cpuUsage(startUsage);
    console.log(endUsage); // { user: 500000, system: 0 }
    ```

内存使用情况

* index.js
* npm run serve

    ```js
    console.log(process.resourceUsage())
    // {
    //   userCPUTime: 546000,
    //   systemCPUTime: 15000,
    //   maxRSS: 28272,
    //   sharedMemorySize: 0,
    //   unsharedDataSize: 0,
    //   unsharedStackSize: 0,
    //   minorPageFault: 0,
    //   majorPageFault: 7454,
    //   swappedOut: 0,
    //   fsRead: 7,
    //   fsWrite: 0,
    //   ipcSent: 0,
    //   ipcReceived: 0,
    //   signalsCount: 0,
    //   voluntaryContextSwitches: 0,
    //   involuntaryContextSwitches: 0
    // }
    ```

资源使用情况

* index.js
* npm run serve

    ```js
    console.log(process.memoryUsage())
    // {
    //   heapUsed: 5088368,  //V8堆内存使用量
    //   heapTotal: 8728576, //V8堆内存总量
    //   arrayBuffers: 9914  //为ArrayBuffer、SharedArrayBuffer分配的内存,包括所有Node Buffer,也包含在external值中
    //   external: 1080971,  //绑定到V8管理的JS、C++对象的内存使用量
    //   rss: 29007872,      //常驻集大小,进程在主内存设备占用的空间量,包括所有JS、C++代码和对象
    // }
    ```

#### 查看/修改工作目录

```js
console.log(process.cwd()) //"E:\Blog\demos\后端服务应用\Node\ES6 modules"

process.chdir("E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\file")
console.log(process.cwd()) //"E:\Blog\demos\后端服务应用\Node\ES6 modules\file"
```

#### 

### (3) Process 对象事件

```js
message //当前Node进程是使用IPC通道衍生,则子进程收到父进程使用childprocess.send()发送的消息时触发
disconnect //当前Node进程是使用IPC通道衍生,则在IPC通道关闭时触发
warning //当前Node进程触发警告时触发
abort
beforeExit
exit //当前Node进程退出时触发(1.显示调用process.exit(),2.Node事件循环不再需要执行任何额外工作)
multipleResolves //当Promise满足条件时触发(1.解决了不止一次,2.拒绝了不止一次,3.解决后拒绝,4.拒绝后解决)
rejectionHandled
uncaughtException
uncaughtExceptionMonitor
unhandledRejection

worker //当前Node进程创建新的worker线程后触发
信号事件 //当前Node进程收到信号时触发
```

## 4. child_process 对象

child_process 对象表示 `Node 子进程`

①②③④⑤⑥⑦⑧⑨⑩
