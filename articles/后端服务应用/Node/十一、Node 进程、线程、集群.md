# 十一、Node 进程、线程、集群

## 1. process 模块

### (1) process API

```js
定义：import process from 'process'
属性：操作系统属性：
     process.arch                                      //返回当前进程所在操作系统的CPU架构
     process.platform                                  //返回当前进程所在操作系统平台
     用户环境属性：
     process.env                                       //返回当前进程所在的用户环境对象
     Node 属性：
     process.release                                   //返回当前进程使用的 Node 版本对象
     process.version                                   //返回当前进程使用的 Node 版本
     process.versions                                  //返回当前进程使用的 Node 及其依赖项版本对象
     process.execPath                                  //当前当前进程的可执行文件的绝对路径
     process.config                                    //返回当前进程的可执行文件的只读配置对象
     进程属性：
     process.pid                                       //返回当前进程 pid
     process.ppid                                      //返回当前进程的父进程 pid
     process.title                                     //返回当前进程标题
     process.argv                                      //返回当前进程启动时传入的命令行参数(第一个参数是process.execPath,第二个参数是正在执行的JS文件路径)
     process.execArgv                                  //返回当前进程启动时传入的一组特定 Node 命令行选项,不会出现在 process.argv,可用于衍生与父进程具有相同执行环境的子进程
     process.debugPort                                 //返回当前进程的调试端口
     process.exitCode                                  //返回/设置当前进程的退出码
     process.report                                    //返回当前进程的诊断报告对象{compact,directory,filename}
     process.noDeprecation                             //返回当前进程是否设置了 --no-deprecation 标志
     process.throwDeprecation                          //返回当前进程是否设置了 --throw-deprecation 标志
     process.traceDeprecation                          //返回当前进程是否设置了 --trace-deprecation 标志
     输入输出属性：
     process.stdin                                     //返回当前进程的标准输入流
     process.stdin.fd                                  //返回当前进程的标准输入流的底层文件名描述符
     process.stdout                                    //返回当前进程的标准输出流
     process.stdout.fd                                 //返回当前进程的标准输出流的底层文件名描述符
     process.stderr                                    //返回当前进程的错误输出流
     process.stderr.fd                                 //返回当前进程的错误输出流的底层文件名描述符
     父子进程通信属性：
     process.channel                                   //返回当前进程通往父进程的通道
     process.connected                                 //返回当前进程通往父进程的通道是否仍连接
方法：身份标识方法：
     process.getuid()                                  //返回当前进程的数字用户标识
     process.setuid(id)                                //无返回值,设置当前进程的数字用户标识
     process.geteuid()                                 //返回当前进程的数字有效用户身份
     process.seteuid(id)                               //无返回值,设置当前进程的数字有效用户身份
     process.getgid()                                  //返回当前进程的数字群组标识
     process.setgid(id)                                //无返回值,设置当前进程的数字群组标识
     process.getegid()                                 //返回当前进程的数字有效群组标识
     process.setegid(id)                               //无返回值,设置当前进程的数字有效群组标识
     process.getgroups()                               //返回当前进程的带有补充组 ID 的数组
     process.setgroups(groups)                         //无返回值,设置当前进程的带有补充组 ID 的数组
     process.initgroups(user,extraGroup)               //无返回值,读取 /etc/group 文件并使用用户所属的所有组初始化组访问列表 
     进程基本方法：
     process.hrtime.bigint()                           //返回当前进程已经运行的纳秒数
     process.uptime()                                  //返回当前进程已经运行的秒数
     process.cpuUsage([preVal])                        //返回当前进程的用户和系统 CPU 时间使用情况(微秒)
     process.memoryUsage()                             //返回当前进程的内存使用量对象(字节)
     process.resourceUsage()                           //返回当前进程的资源使用情况
     process.cwd()                                     //返回当前进程的当前工作目录
     process.chdir(directory)                          //无返回值,更改当前进程的当前工作目录
     process.dlopen(module,filename,[flags])           //无返回值,动态加载共享对象
     process.nextTick(cb,[...args])                    //无返回值,将回调 cb 添加到下一个事件循环
     process.emitWarning(warning,[options])            //无返回值,触发自定义或特定于应用程序的进程警告
     process.emitWarning(warning,[type,[code]],[ctor]) //无返回值,触发自定义或特定于应用程序的进程警告
     process.kill(pid,[signal])                        //无返回值,将可选参数 signal 信号发送到 pid 标识的进程
     process.abort()                                   //无返回值,中止当前进程并生成一个核心文件
     process.exit([code])                              //无返回值,指定当前进程以退出码 code 同步终止进程,即使仍有未完成的异步操作,大多数情况下没必要调用该方法,事件循环中没有待处理工作则进程会自行退出
     process.setUncaughtExceptionCaptureCallback(fn)   //无返回值,设置当前进程发生未捕获异常时的回调函数
     process.hasUncaughtExceptionCaptureCallback()     //返回当前进程是否已使用 process.setUncaughtExceptionCaptureCallback() 设置回调
     父子进程通信方法：
     process.send(message,[sendHandle,[options]],[cb]) //无返回值,当前进程向父进程发送消息
     process.disconnect()                              //无返回值,关闭当前进程通往父进程的通道    
```

### (2) process 事件

```js
进程事件：
process.onmessage        //当前进程接收到其他进程发送的消息时触发
process.onbeforeExit     //当前进程清空其事件循环且没有额外的工作要安排时触发
process.ondisconnect     //当前进程通往父进程的通道关闭时触发
process.onexit           //当前进程即将关闭时触发(code)
process.onwarning        //当前进程触发警告时触发(name,message,stack)

线程事件：
process.onworker         //当前进程创建新的 worker 线程时触发(worker)

未捕获的错误事件：
uncaughtException        //当未捕获的 JS 异常一直冒泡回到事件循环时触发(err,origin)
uncaughtExceptionMonitor //当 uncaughtException 要触发时在其之前触发(err,origin)
multipleResolves         //当 Promise 解决了多次、解决后拒绝、拒绝了多次、拒绝后解决时触发,用于跟踪应用程序使用Promise的潜在错误(type,promise,value)
rejectionHandled         //当 Promise 被拒绝且错误句柄被附加到晚一轮的事件循环时触发(promise)
unhandledRejection       //当 Promise 被拒绝且在事件循环的一个轮询内没有错误句柄附加到承诺时触发(reason,Promise)

信号事件
```

### (3) 进程退出码

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

## 2. child_process 模块

### (1) child_process API

默认情况下，会在父进程和其衍生子进程之间建立 `stdin、stdout、stderr 管道`，这些管道的`容量有限且特定于平台`，如果子进程在没有捕获输出的情况下写入标准输出超过限制，则子进程会阻塞等待管道缓冲区能够接收更多数据

```js
定义：import child_process from 'child_process'
属性：child_process
方法：衍生异步子进程：
     child_process.fork(jsModulePath,[args],[options])                           //返回ChildProcess实例,当前进程使用父进程的 process.execPath 衍生新的子进程
     child_process.spawn(command,[args],[options])                               //返回ChildProcess实例,当前进程衍生 Shell 作为新的子进程,并在其中执行命令 command
     child_process.exec(command,[options],[(err,stdout,stderr)=>{}])             //返回ChildProcess实例,当前进程衍生 Shell 作为新的子进程,并在其中执行命令 command,缓冲生成的输出
     child_process.execFile(nodeFile,[args],[options],[(err,stdout,stderr)=>{}]) //返回ChildProcess实例,当前进程直接将可执行文件 nodeFile 作为新的子进程衍生
     衍生同步子进程：
     child_process.spawnSync(command,[args],[options])                           
     child_process.execSync(command,[options])                                   
     child_process.execFileSync(file,[args],[options])                           
```

### (2) ChildProcess 类

ChildProcess 类表示`子进程`

```js
定义：import child_process from 'child_process'
     const subprocess = child_process.spawn()
     const subprocess = child_process.exec()
     const subprocess = child_process.execFile()
     const subprocess = child_process.fork()
     const subprocess = child_process.spawnSync()
     const subprocess = child_process.execSync()
     const subprocess = child_process.execFileSync()
属性：子进程属性：
     subprocess.pid                                   //返回子进程 subprocess 的 pid
     subprocess.spawnfile                             //返回子进程 subprocess 的可执行文件名
     subprocess.spawnargs                             //返回子进程 subprocess 启动时使用的命令行参数的完整列表
     subprocess.connected                             //返回子进程 subprocess 是否仍处于连接状态,可接收和发送消息
     subprocess.signalCode                            //返回子进程 subprocess 接收到的信号
     subprocess.killed                                //返回子进程 subprocess 是否成功接收到来自 subprocess.kill() 的信号
     subprocess.exitCode                              //返回子进程 subprocess 的退出码
     输入输出属性：
     subprocess.stdio                                 //返回子进程 subprocess 的稀疏管道数组
     subprocess.stdin                                 //返回子进程 subprocess 的标准输入流
     subprocess.stdout                                //返回子进程 subprocess 的标准输出流
     subprocess.stderr                                //返回子进程 subprocess 的错误输出流
     父子进程通信属性：
     subprocess.channel                               //返回子进程 subprocess 通往父进程的通道
方法：基本方法：
     subprocess.ref()                                 //无返回值,当前父进程的事件循环恢复子进程 subprocess 在其引用计数中,迫使父进程等待子进程退出
     subprocess.unref()                               //无返回值,当前父进程的事件循环不将子进程 subprocess 包含在其引用计数中,从而允许父进程独立于子进程退出
     父子进程通信方法：
     subprocess.kill([signal])                        //返回当前父进程是否成功将可选参数 signal 信号发送给子进程 subprocess 
     subprocess.send(msg,[sendHandle,[options]],[cb]) //返回当前父进程是否成功将消息 msg 发送给子进程 subprocess ,子进程 subprocess 可通过 message 事件接收消息
     subprocess.disconnect()                          //无返回值,关闭当前父进程和子进程 subprocess 之间的消息通道


事件：
subprocess.onspawn      //子进程 subprocess 衍生成功时触发
subprocess.onmessage    //子进程 subprocess 给父进程发送消息时触发
subprocess.ondisconnect //子进程 subprocess 关闭连接时触发
subprocess.onexit       //子进程 subprocess 退出时触发,输入输出流可能仍打开
subprocess.onclose      //子进程 subprocess 结束且标准输入输出流已关闭时触发
subprocess.onerror      //子进程 subprocess 发生错误时触发
```

### (3) 实例

衍生同步子进程会`阻塞父进程的事件循环`，暂停任何其他代码的执行，直到衍生的子进程退出或终止，这样的阻塞对于简化通用脚本任务和在启动时简化应用程序配置的加载和处理非常有用，但是也会对性能产生重大影响

衍生异步子进程不会阻塞父进程的事件循环

* mainProcess.js

    ```js
    import child_process from 'child_process'

    const childProcess = child_process.fork('./childProcess.js')
    childProcess.send({ name: 'parent' })
    childProcess.on('message', childMsg => {
        console.log("childMsg:", childMsg)
    })
    ```

* childProcess.js

    ```js
    import process from 'process'

    process.send({ name: 'child' })
    process.on('message', parentMsg => {
        console.log('parentMsg:', parentMsg)
    })
    ```

* node mainProcess.js
  ![异步父子进程通信]()

## 3. cluster 模块

### (1) 集群

为了利用多核 CPU 系统，用户有时想要启动 Node 进程的集群来处理负载，集群可以轻松创建共享服务器端口的子进程，子进程使用 `child_process.fork()` 方法衍生，可以通过通道与父进程通信并且来回传递服务器句柄

由于子进程都是独立进程，可以根据程序的需要被杀死或重新衍生而不会影响其他子进程，只要还有子进程仍然活动，服务器就会继续接收连接，如果没有子进程活动，现有连接将被丢弃，新连接将被拒绝，但是 Node 不会自动管理子进程的数量，因此应用程序有责任根据自己的需要管理子进程池

由以下多进程分发策略和负载均衡问题可得知，cluster 模块的原理如下

> cluster 模块应用 child_process 创建子进程，子进程通过复写掉 cluster._getServer 方法，从而在 server.listen 保证只有父进程监听端口，其次父进程根据平台或者协议不同，应用两种不同模块（round_robin_handle.js/shared_handle.js）进行请求分发给子进程处理

#### ① 多进程分发策略

平时实例通过 node index.js 启动的 Node 服务，就只启动了一个进程，只能在一个 CPU 中计算，无法应用服务器的多核 CPU，Node cluster 模块就是`一个父进程和多个子进程`形成的一个集群的概念，使用的是`多进程分发策略：父进程监听一个端口，子进程不监听端口，通过父进程分发请求到子进程`

![cluster多进程分发策略]()

既然 cluster 模块的子进程不监听端口，那么实例中又是如何实现多个子进程监听同一个端口呢？

这就需要关注 server.listen() 方法的内部实现，server.listen() 会调用 cluster 模块的 listenInCluster() 方法，该方法有一个关键信息如下所示，由以下代码可以看出，`在父进程启动真实的端口监听服务，而在子进程只是获取父进程的服务器句柄并监听`

```js
if (cluster.isPrimary || exclusive) {
    // Will create a new handle
    // _listen2 sets up the listened handle, it is still named like this
    // to avoid breaking code that wraps this method
    server._listen2(address, port, addressType, backlog, fd, flags)
    return
}

const serverQuery = {
    address: address,
    port: port,
    addressType: addressType,
    fd: fd,
    flags
}

// Get the primary's server handle, and listen on it
cluster._getServer(server, serverQuery, listenOnPrimaryHandle)
```

#### ② 负载均衡问题

cluster 模块使用主子进程方式，那么是如何处理负载均衡问题的呢？

这就涉及到 cluster 模块中的 2 个模块

* **shared_handle.js（Windows 平台应用模式）**：父进程将文件描述符、端口等信息传递给子进程，子进程通过信息创建相应的 SocketHandle/ServerHandle，然后进行相应的端口绑定和监听、处理请求
* **round_robin_handle.js（非 Windows 平台应用模式）**：父进程轮询处理，分发给空闲的子进程，子进程处理完成后回到子进程池，子进程如果绑定过就会被复用，没有则会重新判断

### (2) cluster API

```js
定义：import cluster from 'cluster'
属性：父进程属性：
     cluster.workers                              //返回当前父进程所在集群的所有子进程
     子进程属性：
     cluster.worker                               //返回当前子进程的引用
     所有进程属性：
     cluster.isMaster/isPrimary                   //返回当前进程是否为父进程
     cluster.isWorker                             //返回当前进程是否为子进程
     cluster.settings                             //返回当前进程所在集群的设置对象
     cluster.schedulingPolicy                     //返回当前进程所在集群的调度策略
方法：父进程方法：
     cluster.fork([env])                          //返回新的子进程,当前父进程所在集群使用可选参数 env 衍生新的子进程
     cluster.setupMaster/setupPrimary([settings]) //无返回值,当前父进程所在集群使用可选参数 settings 更改默认 fork 行为
     cluster.disconnect([cb])                     //无返回值,当前父进程所在集群的所有子进程断开连接,完成时调用可选参数 cb 


settings：
execArgv      //传给 Node 可执行文件的字符串参数列表
exec          //指定子进程的文件路径
cwd           //指定子进程的当前工作目录
args          //指定传给子进程的字符串参数
serialization //指定进程间发送消息的序列化类型
slient        //指定是否将输出发送到父进程的标准输入输出
......


事件：
cluster.onfork       //当前父进程所在集群衍生新的子进程时触发(worker)
cluster.onsetup      //当前父进程更改默认 fork 行为时触发(settings)
cluster.onlistening  //子进程开始监听当前父进程时在 worker.onlistening 之后触发(worker,address)
cluster.ononline     //当前父进程接收到子进程的在线消息时触发(worker)
cluster.onmessage    //当前父进程接收到子进程的消息时触发(worker,message,handle)
cluster.ondisconnect //当前父进程所在集群的任意子进程断开连接时触发(worker)
cluster.onexit       //当前父进程所在集群的任意子进程死亡时触发(worker,code,signal)
```

### (3) cluster.Worker 类

cluster.Worker 类表示`集群中的子进程`

```js
定义：父进程：
     cluster.workers
     子进程：
     cluster.worker
属性：worker.id                                    //返回子进程 worker 的 ID
     worker.process                               //返回子进程 worker 的引用
     worker.exitedAfterDisconnect                 //返回子进程 worker 是否以 worker.kill()/disconnect() 退出
方法：worker.send(msg,[sendHandle,[options]],[cb]) //无返回值,当前父进程向子进程 worker 发送消息
     worker.isConnected()                         //返回子进程 worker 是否连接到父进程
     worker.disconnect()                          //无返回值,关闭子进程 worker 到父进程的连接
     worker.isDead()                              //返回子进程 worker 是否已终止
     worker.kill/destroy([signal])                //无返回值,终止子进程 worker


事件：
worker.ononline     //子进程 worker 在线时触发
worker.onlistening  //子进程 worker 监听父进程时触发(address)
worker.onmessage    //子进程 worker 向父进程发送消息时触发(message,handle)
worker.ondisconnect //子进程 worker 断开与父进程的连接时触发
worker.onexit       //子进程 worker 退出时触发(code,signal)
worker.onerror      //子进程 worker 发生错误时触发
```

### (4) 实例

* cluster.js

    ```js
    import cluster from 'cluster'
    import process from 'process'
    import os from 'os'

    // 必须判断是否父进程，父进程中才能调用集群创建子进程的方法
    if (cluster.isPrimary) {
        console.log(`Master Process ${process.pid} is running`);

        // 按照 CPU 数量创建子进程
        const numCPUs = os.cpus().length
        for (let i = 0; i < numCPUs; i++) {
            console.log(`Forking process number ${i + 1}...`);
            cluster.fork();
        }

        // 父进程接收到子进程发送的消息时触发
        cluster.on('message', (worker, message) => {
            console.log(`${worker.id}: ${message}`)
        }) 

        // 子进程开始监听父进程时触发
        cluster.on('listening', (worker, address) => {
            console.log(`cluster - listening - ${address.address} : ${address.port}`)
        })
    } else if(cluster.isWorker) {
        import('./worker.js')
    } 
    ```

* worker.js

    ```js
    import http from 'http'

    // 子进程向父进程发送消息
    process.send('hello, I am worker')

    // 创建服务器并监听 3000 端口
    const server = http.createServer((req, res) => {
        res.write('hello world')
        res.end()
    })
    server.listen(3000, 'localhost', () => {
        const address = server.address()
        console.log(`listening at http://${address.address}:${address.port}`)
    })
    ```

* node cluster.js

  ![cluster]()

### (5) PM2（守护进程管理器）

PM2 是守护进程管理器，可以帮助管理和保持应用程序在线

* npm i pm2@latest -g
* pm2 start cluster.js
  ![pm2]()

## 4. worker_threads 模块

### (1) 多线程

worker_threads 模块提供`多线程并行执行 JS 代码`，多线程对于处理 `CPU 密集型操作`很有用，对于 IO 密集型操作帮助不大，Node 内置的异步 IO 操作比多线程更高效

与 child_process、cluster 不同，worker_threads 可以`共享内存`，通过传输 `ArrayBuffer` 实例或共享 `SharedArrayBuffer` 实例实现

### (2) worker_threads API

```js
定义：import worker_threads from 'worker_threads'
属性：基本属性：
      worker_threads.threadId                                           //返回当前线程 ID
      worker_threads.workerData                                         //返回当前线程创建时传给构建函数的数据副本
      worker_threads.isMainThread                                       //返回当前线程是否为父线程
      worker_threads.SHARE_ENV                                          //返回当前线程的共享环境变量
      worker_threads.resourceLimits                                     //返回当前线程的 JS 引擎资源约束
      worker_threads.parentPort                                         //返回当前线程的父线程通信端口
方法：基本方法：
      worker_threads.setEnvironmentData(key,[value])                    //无返回值,设置当前线程的环境数据
      worker_threads.getEnvironmentData(key)                            //返回当前线程的环境数据
      传输方法：
      worker_threads.moveMessagePortToContext(port,contextifiedSandbox) //返回新的 MessagePort 实例,将指定 port 传输到新的 vm 上下文 contextifiedSandbox,继承其全局 Object 类,不再继承 EventEmitter,只有 port.onmessage() 可以接收事件
      worker_threads.markAsUntransferable(obj)                          //无返回值,将指定对象 obj 标记为不可传输
      worker_threads.receiveMessageOnPort(port)                         //返回当前线程从指定的 MessagePort 接收到的消息
```

### (3) worker_threads.Worker 类

worker_threads.Worker 类表示`独立的 JS 执行子线程`，大多数 Node API 都可以在其中使用

```js
定义：import worker_threads from 'worker_threads'
     const workerThread = new Worker(filename,[options])
属性：worker.threadId                          //返回 worker 线程的 ID
     worker.resourceLimits                    //返回 worker 线程的 JS 引擎资源约束
     worker.stdin                             //返回 worker 线程的标准输入流
     worker.stdout                            //返回 worker 线程的标准输出流
     worker.stderr                            //返回 worker 线程的错误流
     worker.performance                       //返回 worker 线程的性能对象
方法：worker.ref()                             //无返回值,恢复 worker 线程的引用计数
     worker.unref()                           //无返回值,取消 worker 线程的引用计数
     worker.postMessage(value,[transferList]) //无返回值,当前主线程向 worker 线程发送消息
     worker.terminate()                       //返回 Promise 实例,停止 worker 线程的所有 JS 代码执行
     worker.getHeapSnapshot()                 //返回 Promise 实例,worker 线程当前状态的 V8 堆快照的可读流


事件：
worker.onerror        //worker 线程发生错误时触发(err)
worker.onexit         //worker 线程退出时触发(exitCode)
worker.onmessage      //worker 线程向主线程发送消息时触发(value)
worker.onmessageerror //worker 线程向主线程发现的消息反序列化失败时触发(error)
worker.ononline       //worker 线程开始执行 JS 代码时触发
```

### (4) worker_threads.MessageChannel 类

worker_threads.MessageChannel 类表示 `worker 线程的异步双向通信通道`，new MessageChannel() 产生具有 port1、port2 属性的对象，其引用链接的 MessagePort 实例

```js
定义：import { MessageChannel } from 'worker_threads'
使用：const { port1, port2 } = new MessageChannel()
```

### (5) worker_threads.MessagePort 类

worker_threads.MessagePort 类表示 `worker 线程的异步双向通信通道的一端`，用在不同的 worker 线程之间传输结构化的数据、内存区域和其他 MessagePort

```js
定义：import { MessageChannel } from 'worker_threads'
     const { port1, port2 } = new MessageChannel()
方法：port.ref()                             //无返回值,恢复 port 的引用计数
     port.unref()                           //无返回值,取消 port 的引用计数
     port.start()                           //无返回值,port 端口打开连接
     port.close()                           //无返回值,port 端口断开连接
     port.postMessage(value,[transferList]) //无返回值,port 端口向另一端发送消息


事件：
port.onclose        //port 端口断开连接时触发
port.onmessage      //port 端口接收到消息时触发(value)
port.onmessageerror //port 端口接收到的消息反序列化失败时触发(error)
```

### (6) 实例

* worker_threads.js

    ```js
    import assert from 'assert'
    import worker_threads, { Worker, MessageChannel } from 'worker_threads'

    if(worker_threads.isMainThread) {
        const worker = new Worker('./worker_threads.js')
        const { port1, port2 } = new MessageChannel()

        // 主线程向 worker 线程发送消息
        worker.postMessage(
            { 
                workerPort: port2,
                msg: 'hello, I am mainThread'
            }, 
            [port2]
        )

        // 主线程监听来自 worker 线程的消息
        port1.on('message', message => {
            console.log("port1:", message)
        })
    } else {
        // worker 线程监听来自主线程的消息
        worker_threads.parentPort.on('message', value => {
            assert(value.workerPort instanceof MessagePort)
            console.log('port2:', value.msg)

            // worker 线程向主线程发送消息
            value.workerPort.postMessage('hello, I am workerThread')
        })
    }
    ```

* node worker_threads.js

    ![worker_threads]()
