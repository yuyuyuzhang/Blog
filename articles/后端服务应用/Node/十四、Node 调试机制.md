# 十四、Node 调试机制

## 1. debugger 模块

### (1) debugger API

debugger 模块是 `Node 命令行调试工具`，不是一个功能齐全的调试器，但是可以进行简单的步进和检查，使用 debugger 模块只需要使用 inspect 参数启动 Node 且后跟要调试的脚本路径

```js
cont(c) //继续执行
next(n) //单步执行下一行
step(s) //单步进入
out(o)  //单步退出
pause   //暂停正在运行的代码
```

### (2) 实例

* debugger.js

    ```js
    import child_process from 'child_process'

    const childProcess = child_process.fork('./childProcess.js')
    childProcess.send({ name: 'parent' })
    childProcess.on('message', childMsg => {
        debugger;
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

* node inspect debugger.js

    ![debugger](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/debugger.png)

## 2. inspector 模块

### (1) inspector API

inspector 模块表示 `chrome V8 引擎的检查器`，也就是平时使用 chrome 浏览器时 F12 打开的控制台调试面板

```js
定义：import inspector from 'inspector'
属性：inspector.console
方法：inspector.open([port,[host,[wait]]]) //无返回值,在主机和端口上激活当前检查器,可选参数wait表示在客户端连接之前是否阻塞
     inspector.waitForDebugger()          //无返回值,阻塞当前检查器直到客户端发送 Runtime.runIfWaitingForDebugger 命令
     inspector.close()                    //无返回值,停用当前检查器
     inspector.url()                      //返回当前检查器的网址
```

### (2) inspector.Session 类

inspector.Session 类用于向 V8 检查器后端发送消息并接收消息响应和通知

```js
定义：import inspector from 'inspector'
     const inspectSession = new inspector.Session()
方法：session.connect()                              //无返回值,将当前会话连接到当前线程检查器后端
     session.connectToMainThread()                  //无返回值,将当前会话连接到主线程检查器后端
     session.post(method,[params],[(err,info)=>{}]) //无返回值,当前会话向连接的检查器后端发送消息
     session.disconnect()                           //无返回值,立即关闭当前会话


事件
inspectorNotification     //当接收到来自当前检查器的通知时触发
inspector-protocol-method //当接收到当前检查器通知其方法字段设置为 inspector-protocol-method 时触发
```

### (3) 使用 V8 检查器的 CPU 分析器 Profiler

* profiler.js

    ```js
    import inspector from 'inspector'
    import fs from 'fs'

    const session = new inspector.Session();
    session.connect()
    session.post('Profiler.enable', () => {
        session.post('Profiler.start', () => {

            // 在此处调用测量中的业务逻辑...
            for(let i=0; i<10000, i++;) {
            }

            // 一段时间之后...
            session.post('Profiler.stop', (err, { profile }) => {
                // 将分析文件写入磁盘、上传等
                if (!err) {
                    fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
                }
            })
        })
    })
    ```

* node profiler.js

  ![Profiler](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/Profiler.png)

### (4) 使用 V8 检查器的堆分析器 profile.heapsnapshot

* heapsnapshot.js

    ```js
    import inspector from 'inspector'
    import fs from 'fs'

    const session = new inspector.Session();
    const fd = fs.openSync('profile.heapsnapshot', 'w')
    session.connect()
    session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
        fs.writeSync(fd, m.params.chunk);
    });
    session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
        session.disconnect();
        fs.closeSync(fd);
    });
    ```

* node heapsnapshot.js

  ![heapsnapshot](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/heapsnapshot.png)
