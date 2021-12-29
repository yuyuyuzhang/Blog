# 九、Node 操作系统

## 1. os 模块

### (1) os API

os 模块提供了与操作系统相关的属性和方法

```js
定义：import os from 'os'
属性：os.constants                   //返回当前操作系统的特定常量
     os.EOL                         //返回当前操作系统特有的行尾标记(windows:\n,Posix:\r\n)
     os.devNull                     //返回当前操作系统特有的空设备的文件路径(windows:\\.\nul,Posix:/dev/null)
方法：基础属性：
     os.type()                      //返回当前操作系统的名称(Linux,macOS:Darwin,windows:Windows_NT)
     os.release()                   //返回当前操作系统的版本号
     os.hostname()                  //返回当前操作系统的主机名
     os.platform()                  //返回当前操作系统的平台(darwin/freebsd/linux/openbsd/win32/win64)
     os.version()                   //返回当前操作系统的内核版本
     os.arch()                      //返回当前操作系统的 CPU 架构(arm/arm64/ia32/mips/mipsel/ppc/ppc64/s390/s390x/x32/x64)
     os.cpus()                      //返回当前操作系统所有 CPU 内核的信息对象数组({model,speed,times:{user,nice,sys,idle,irq}})
     os.endianness()                //返回当前操作系统编译当前 Node 二进制文件的 CPU 字节序(大端序:BE,小端序:LE)
     os.networkInterfaces()         //返回当前操作系统所有网络接口的详细信息对象
     os.loadavg()                   //返回当前操作系统包含1、5、15分钟平均负载的数组(仅适用于Linux、macOS)
     os.uptime()                    //返回当前操作系统自上次计算器重启以来的持续运行时间(秒)
     内存属性：
     os.totalmem()                  //返回当前操作系统的内存总量
     os.freemem()                   //返回当前操作系统的空闲内存量(字节)
     用户属性：
     os.userInfo([{encoding}])      //返回当前操作系统的有关当前用户的信息
     os.homedir()                   //返回当前操作系统的当前用户的主目录路径
     os.tmpdir()                    //返回当前操作系统的默认临时文件目录 
     进程属性：
     os.getPriority([pid])          //返回当前操作系统由可选参数 pid 指定的进程的调度优先级
     os.setPriority([pid],priority) //无返回值,为当前操作系统的由可选参数 pid 指定的进程设置调度优先级 priority
```

### (2) 实例

```js
import os from 'os'

console.log(os.type())     // 'Windows_NT'
console.log(os.release())  // '10.0.19043'
console.log(os.hostname()) // 'LAPTOP-62JRLP16'
console.log(os.platform()) // 'win32'
console.log(os.version())  // 'Windows 10 Home China'
console.log(os.arch())     // 'x64'
console.log(os.loadavg())  // [0, 0, 0]
console.log(os.uptime())   // 1483109

console.log(os.totalmem()) // 16505954304
console.log(os.freemem())  // 4515356672

console.log(os.userInfo())
// {
//     uid: -1,
//     gid: -1,
//     username: '86173',
//     homedir: 'C:\\Users\\86173',
//     shell: null
// }
console.log(os.homedir()) // C:\Users\86173
console.log(os.tmpdir())  // C:\Users\86173\AppData\Local\Temp
```

## 2. v8 模块

### (1) v8 API

Node 是基于 Chrome V8 引擎开发的能使 JS 在服务器端运行的运行时环境（runtime environment），V8 引擎一方面提供了多种可调用的 API，如读写文件、网络请求、系统信息等。另一方面还负责将 JS 代码解释成机器码由 V8 引擎执行

## 3. vm 模块

### (1) vm API

JS 是一款拥有`自动垃圾回收`功能的编程语言，市面上具有这种功能的语言一般都具有相对应的`虚拟机`，如 JAVA-JVM、C#-CLR、PHP-Zend 等，虚拟机一般实现了代码解析、内存管理、垃圾回收等功能，C/C++ 这种没有虚拟机的语言，就需要手动管理内存

①②③④⑤⑥⑦⑧⑨⑩
