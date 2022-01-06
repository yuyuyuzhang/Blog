# Node 多进程多线程

## 1. 异步的原理（事件循环机制）

JS 引擎线程作为一个单线程为什么能够实现异步？

* 因为`浏览器标签页渲染进程`除了 JS 引擎线程，还有事件触发线程、异步请求线程、定时器计数线程，将一些异步操作交给其他线程处理，然后通过`事件循环机制`处理返回结果
* 因为 Node 依赖于 libuv 库，libuv 库是一个跨平台的基于事件循环的异步 IO 库，提供 IO、进程、线程、信号、定时器、进程间通信等功能

### (1) 事件循环机制

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

### (2) 宏任务队列和微任务队列

任务队列按照`先进先出`的顺序执行，即使排在后面的任务更为紧急，也必须等待前面的任务先执行完成，因此 JS 引擎设置宏任务队列和微任务队列 2 个任务队列，微任务队列的优先级高于宏任务队列

**原理**：由于`微任务队列的优先级高于宏任务队列`，每次事件循环时会从微任务队列中获取任务，只有当微任务队列`为空`时才会从宏任务队列中获取任务，同一个队列中的任务只遵循`先进先出`的原则

* **微任务队列**：process.nextTick（Node，`优先级最高`）、MutaionObserver 回调函数（浏览器）、Promise.then/catch/finally()
* **宏任务队列**：DOM 事件回调函数（浏览器）、IntersectionObserver 回调函数（浏览器）、异步请求回调函数、定时器回调函数

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

## 2. Node 多进程

## 3. Process 模块

Process 对象表示 `Node 进程`

每个 Node 应用程序都是一个 process 对象实例，因此 Node 应用程序能够直接使用某些内建于 process 对象的功能，process 对象的许多属性和方法能够提供应用程序身份标识和当前运行环境的信息

### (1) Process 对象属性

```js
环境属性：
process.paltform  //返回当前操作系统平台类型
process.arch      //返回当前操作系统CPU架构
process.version   //返回当前Node版本
process.versions  //返回当前Node及其内置模块版本
process.release   //返回当前Node版本相关信息
进程属性：
process.title     //返回/设置当前Node进程名称
process.pid       //返回当前Node进程pid
process.ppid      //返回当前Node进程ppid
process.config    //返回当前Node进程可执行文件的配置选项
process.execPath  //返回当前Node进程可执行文件的绝对路径
process.debugPort //返回当前Node进程的调试端口
process.moduleLoadList //返回当前Node进程已加载的核心模块数组
环境变量：
process.env       //返回当前Node进程启动时设置的所有环境变量
命令行参数：
process.argv      //返回当前Node进程命令行参数,第一个参数是node,第二个参数是当前执行模块的绝对路径名,之后才是依次传入命令行的参数
process.execArgv  //返回当前Node进程命令行特殊参数
process.argv0     //返回当前Node进程第一个命令行参数(node)
输入输出属性：
process.stdin     //返回一个指向标准输入流的只读流
process.stdout    //返回一个指向标准输出流的只写流
process.stderr    //返回一个指向标准错误输出流的只写流

process.allowedNodeEnvironmentFlags //返回一组NODE_OPTIONS环境变量内允许的标志
process.domain //
process.features //
```

#### ① 环境变量

process.env 属性用于设置当前 Node 进程环境变量

* index.js
* npm run serve

    ```js
    // 设置环境变量
    process.env.NODE_ENV = 'development'

    console.log(process.env.NODE_ENV) //'development'
    ```

#### ② 命令行参数

process.argv 属性返回当前 Node 进程命令行参数，第一个参数是 node，第二个参数是当前执行模块的绝对路径名，之后才是依次传入命令行的参数

* index.js

    ```js
    console.log(process.argv)

    // [
    //   'D:\\node\\node.exe',
    //   'E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\index.js',
    //   'zy'
    // ]
    ```

* npm run serve

    package.json

    ```json
    "scripts": {
        "serve": "node index.js zy"
    }
    ```

**minimist 库**：当传入命令行的参数使用`键值对`时，minimist 库有助于我们处理参数，但需要在键值对前添加`双破折号`

* npm i minimist
* index.js

    ```js
    import minimist from 'minimist'

    const args = minimist(process.argv.slice(2))
    console.log(args.name) //zy
    ```

* npm run serve

    package.json

    ```json
    "scripts": {
        "serve": "node index.js --name=zy"
    }
    ```

### (2) Process 对象方法

```js
事件循环：
process.nextTick(cb)        //无返回值,将回调函数cb添加到JS引擎线程微任务队列
进程状况：
process.binding(moduleName) //返回当前Node进程的指定核心模块
process.uptime()            //返回当前Node进程已运行的秒数
process.hrtime.bigint()     //返回当前高精度实际时间(纳秒),常用于计算运行时间差
process.cpuUsage([preVal])  //返回当前Node进程用户和系统的CPU使用情况,可选参数preVal为上一次调用结果
process.memoryUsage()       //返回当前Node进程内存使用情况
process.resourceUsage()     //返回当前Node进程资源使用情况
工作目录：
process.cwd()               //返回当前Node进程的当前工作目录
process.chdir(directory)    //无返回值,更改当前Node进程的当前工作目录
进程操作：
process.emitWarning(warning,options) //触发自定义或特定于应用程序的Node进程警告
process.abort() //退出当前Node进程并生成一个核心文件,触发abort事件
process.exit(codeArr) //以指定退出码code立即强制退出当前Node进程
process.reallyExit(code)    //退出当前Node进程,不触发exit事件


process.dlopen(module,fileName) //动态加载共享对象
process.kill(pid,signalArr) //将信号数组aignalArr发送到标识为pid的进程
process.umask()
process.hasUncaughtExceptionCaptureCallback(cb) //返回是否使用process.setUncaughtExceptionCaptureCallback(cb)设置回调
process.setUncaughtExceptionCaptureCallback(cb) //设置发生未捕获的异常时需要调用的回调函数,异常值作为该回调第一个参数,设置该回调后不会触发uncaughtException事件,


process.openStdin()
process.assert()
```

#### ① 事件循环添加微任务

* index.js
* npm run serve

    ```js
    console.log('start')
    process.nextTick(() => {
        console.log('process.nextTick')
    })
    setTimeout(() => {
        console.log('setTimeout')
    }, 0)
    console.log('end')

    //输出：
    //'start'
    //'end'
    //'process.nextTick'
    //'setTimeout'
    ```

#### ② 查看进程状况

##### 核心模块

* index.js
* npm run serve

    ```js
    const fs = process.binding('fs')
    console.log(fs) 

    // BaseObject {
    //   ...
    // }
    ```

##### 运行时间

* index.js
* npm run serve

    ```js
    console.log(process.uptime()) //0.0456336
    ```

##### 运行时间差

* index.js
* npm run serve

    ```js
    const start = process.hrtime.bigint(); // 191051479007711n
    setTimeout(() => {
        const end = process.hrtime.bigint(); // 191052633396993n
        console.log(`基准测试耗时 ${end - start} 纳秒`); // 基准测试耗时 1154389282 纳秒
    }, 1000);
    ```

##### CPU 使用情况

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

##### 内存使用情况

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

##### 资源使用情况

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

#### ③ 查看/修改工作目录

```js
console.log(process.cwd()) //"E:\Blog\demos\后端服务应用\Node\ES6 modules"

process.chdir("E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\file")
console.log(process.cwd()) //"E:\Blog\demos\后端服务应用\Node\ES6 modules\file"
```

#### ④ 进程操作

#### 退出进程

process.exit(code)

以指定退出码 code 立即强制退出当前 Node 进程，这意味着任何待处理的回调、任何仍在发送中的网络请求、任何文件系统访问等，都会被立即非正常终止

退出码

* **0（默认）**：成功退出
* **1**：未捕获的致命异常
* **2**：未使用
* **3**：内部 JS 解析错误
* **4**：内部 JS 评估失败
* **5**：致命错误
* **6**：非函数的内部异常句柄
* **7**：内部异常句柄运行时失败
* **8**：未使用
* **9**：无效参数
* **10**：内部 JS 运行时失败
* **12**：无效的调试参数
* **13**：未完成的顶层等待
* **>128**：信号退出

process.exitCode

Node 进程完成所有处理后，程序会正常退出并返回该退出码

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
```

信号事件

信号是一个 POSIX 内部通信系统，发送通知给进程，以告知其发生的事件，当前 Node 进程收到信号时触发信号事件

```js
SIGUSR1
SIGTERM：正常终止
SIGPIPE
SIGHUP
SIGTERM
SIGBREAK
SIGWINCH
SIGKILL：立即终止
SIGSTOP

```

## 4. child_process 模块

child_process 对象表示 `Node 子进程`

### (1) child_process 对象方法

```js
异步方法：
child_process.spawn(command,args,options)    //返回ChildProcess实例,使用给定的命令command和参数args中的命令行参数异步衍生子进程
child_process.exec(command,options,cb)       //返回ChildProcess实例,
child_process.execFile(file,args,options,cb) //返回ChildProcess实例,
child_process.fork(modulePath,args,options)  //返回ChildProcess实例,
同步方法：
child_process.spawnSync()    //返回ChildProcess实例,同步衍生子进程,会阻塞事件循环,直到子进程退出或终止
child_process.execSync()     //返回ChildProcess实例,
child_process.execFileSync() //返回ChildProcess实例,
```

#### spawn()

默认情况下，会在父 Node.js 进程和衍生的子进程之间建立 stdin、stdout 和 stderr 的管道。 这些管道的容量有限（且特定于平台）。 如果子进程在没有捕获输出的情况下写入标准输出超过该限制，则子进程会阻塞等待管道缓冲区接受更多数据。 这与 shell 中管道的行为相同。 如果不消费输出，则使用 { stdio: 'ignore' } 选项

在 Windows 上，环境变量不区分大小写。 Node.js 按字典顺序对 env 键进行排序，并使用不区分大小写匹配的第一个键。 只有第一个（按字典顺序）条目将传给子流程。 当传给 env 选项的对象具有多个相同键名的变体时（例如 PATH 和 Path），在 Windows 上可能会导致出现问题

另外 3 个创建异步子进程的方法都是基于 spawn() 方法实现的，同样地，另外 2 个创建同步子进程的方法也都是基于 spawnSync() 方法实现的

```js
options：
cwd                      //子进程的当前工作目录
env                      //环境变量键值对
argv0                    //
stdio                    //子进程的标准输入输出配置
detached                 //
uid                      //子进程的用户标识
gid                      //子进程的群组标识
serialization            //进程间发送消息的序列化类型
shell                    //
windowsVerbatimArguments //
windowsHide              //
signal                   //允许使用中止信号中止子进程
timeout                  //允许进程运行的最长时间(毫秒)
killSignal               //当子进程将被超时或中止信号杀死时使用的信号值


options 默认值：
{
    cwd: undefined,
    env: process.env
}
```

#### exec()

衍生 Shell 并在该 Shell 中执行命令，

#### execFile()

直接衍生命令

#### fork()

衍生异步子进程并使用建立的 IPC 通信通道调用指定的模块

### (2) ChildProcess 对象

```js
定义：const cp = child_process.spawn(command,args,options)
     const cp = child_process.exec(command,options,cb)
     const cp = child_process.execFile(file,args,options,cb)
     const cp = child_process.fork(modulePath,args,options)
属性：cp.channel                         //
     cp.connected                       //
     cp.exitCode                        //
     cp.killed                          //
     cp.pid                             //
     cp.signalCode                      //
     cp.spawnargs                       //
     cp.spawnfile                       //
     cp.stderr                          //
     cp.stdin                           //
     cp.stdio                           //
     cp.stdout                          //
方法：cp.disconnect()                    //
     cp.kill(signal)                    //
     cp.ref()                           //
     cp.unref()                         //
     cp.send(msg,sendHandle,options,cb) //
```

### (3) ChildProcess 事件

```js
spawn      //子进程衍生成功时触发
errer      //子进程衍生失败时触发
message    //子进程使用process.send()发送消息时触发
disconnect //父子进程调用disconnect()方法断开连接时触发
close      //
exit       //
```

## 5. worker_threads 模块

worker_threads 对象表示 `worker 线程`

①②③④⑤⑥⑦⑧⑨⑩
