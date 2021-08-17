# Node 进程

## 1. Process 对象

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

npm run serve -a

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
process.dlopen(module,fileName)
process.uptime() //返回当前Node进程已运行的秒数

process.hrtime.bigint()
process.cpuUsage()
process.resourceUsage()
process.memoryUsage()
process.kill()
process.exit()
process.openStdin()
process.assert()
process.setUncaughtExceptionCaptureCallback()
process.hasUncaughtExceptionCaptureCallback()
process.emitWarning(warning,{type,code,stor,detail})
process.nextTick()
process.abort() //退出当前Node进程并生成一个核心文件,abort事件
process.umask()
process.chdir()
process.cwd()

process.binding()
process.reallyExit()
```

### (3) Process 对象事件

```js
message
disconnect
abort
beforeExit
exit
multipleResolves
rejectionHandled
uncaughtException
uncaughtExceptionMonitor
unhandledRejection
warning
worker
信号事件
```

## 2. child_process 对象

child_process 对象表示 `Node 子进程`

①②③④⑤⑥⑦⑧⑨⑩
