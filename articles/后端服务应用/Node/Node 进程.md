# Node 进程

## 1. Process 对象

Process 对象表示 `Node 进程`

每个 Node 应用程序都是一个 process 对象实例，因此 Node 应用程序能够直接使用某些内建于 process 对象的功能，process 对象的许多属性和方法能够提供应用程序身份标识和当前运行环境的信息

### (1) Process 对象属性

```js
属性：环境属性：
     process.arch //返回当前操作系统CPU架构
     process.paltform //返回当前操作系统平台类型
     Node属性：
     process.version  //返回当前Node版本
     process.versions //返回当前Node及其内置模块版本
     进程属性：
     process.title //返回/设置当前进程名称
     process.pid //返回当前进程的pid
     process.ppid //返回当前进程的
     process.cwd //返回当前进程的工作目录
     process.execPath //返回当前进程可执行文件的绝对路径
     

process.release
process.moduleLoadList
process.domain
process.config
process.features
process.env //返回当前系统环境信息对象
process.argv     //返回当前命令行参数,第一个参数是node,第二个参数是当前模块绝对路径名,之后才是命令行依次传入的参数
process.execArgv //返回当前命令行特殊参数
process.debugPort
process.argv0

_rawDebug
_linkedBinding
_events
_eventsCount
_maxListeners
_exiting
_getActiveRequests
_getActiveHandles
_kill
_fatalException
_tickCallback
_debugProcess
_debugEnd
_startProfilerIdleNotifier
_stopProfilerIdleNotifier
_preload_modules
```

### (2) Process 对象方法

```js
process.binding()
process.dlopen()
process.uptime()
process.reallyExit()
process.hrtime()
process.cpuUsage()
process.resourceUsage()
process.memoryUsage()
process.kill()
process.exit()
process.openStdin()
process.assert()
process.setUncaughtExceptionCaptureCallback()
process.hasUncaughtExceptionCaptureCallback()
process.emitWarning()
process.nextTick()
process.abort() //退出当前Node进程并生成一个核心文件,abort事件
process.umask()
process.chdir()
process.cwd()

process.allowedNodeEnvironmentFlags()
process.stdout()
process.stdin()
process.stderr()
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
