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

### (1) Chrome v8 引擎

Node 是基于 Chrome v8 引擎开发的使 JS 在服务器端运行的运行时环境（runtime environment），Node 实际上是对 v8 引擎进行了封装并提供 API 调用，但并不只是简单的封装，还对一些特殊用例进行了优化并提供替代 API，使得 Node 在非浏览器环境下运行得更好，在各个环境下更加给力

v8 引擎一方面提供了多种可调用的 API 如读写文件、网络请求、系统信息等，另一方面还负责将 JS 代码编译成`机器码`交由硬件 CPU 执行，作为一个 JS 开发者，搞清楚敲入 console.log('hello world') 到 CPU 执行的过程很重要

### (2) Chrome v8 引擎架构

Chrome v8 引擎架构如下

![v8引擎架构]()

* **Parse**：负责将 JS 源码转换成 `AST 抽象语法树`
  * **词法分析**：将 JS 源码拆分成最小的、不可再分的`词法单元（token）`，忽略空格

    ```js
    var x = 1;
    ```

    ```js
    分解成 5 个词法单元：var、a、=、1、;
    ```

  * **语法分析**：将词法单元转换成一个由元素逐级嵌套所组成的代表程序语法结构的 `AST 抽象语法树`

    ```json
    {
      "type": "Program",
      "start": 0,
      "end": 10,
      "sourceType": "module",
      "body": [
        {
          "type": "VariableDeclaration",
          "start": 0,
          "end": 10,
          "kind": "var",
          "declarations": [
            {
              "type": "Indentifier",
              "start": 4,
              "end": 9,
              "id": {
                "type": "Indetifier",
                "start": 4,
                "end": 5,
                "name": "a"
              },
              "init": {
                "type": "Literal",
                "start": 8,
                "end": 9,
                "value": 1,
                "raw": 1
              }
            }
          ]
        }
      ]
    }
    ```

* **Ignition（解释器）**：负责将 AST 抽象语法树转换成`字节码`
  * Ignition 解释器生成的字节码是介于 AST 抽象语法树和机器码之间的一种代码，需要将其转换成机器码之后才能执行，字节码可以理解为机器码的一种抽象
* **TurboFan（编译器）**：负责将字节码优化为可执行的`机器码`
  * Ignition 解释器生成字节码之后，如果发现一段代码被重复多次执行，生成的字节码以及分析数据就会传给 TurboFan 编译器，TurboFan 编译器根据分析数据生成`优化`好的机器码，这样性能会更好
* **Orinoco**：负责`垃圾回收`，释放不再需要的内存控件

### (3) v8 API

v8 模块暴露了当前 Node 使用的 v8 引擎的 API

```js
定义：import v8 from 'v8'
方法：基本方法：
     v8.cachedDataVersionTag()        //返回表示从 v8 版本、命令行标志、以及检测到的 CPU 特性派生的版本标签的整数
     v8.setFlagsFromString(flags)     //无返回值,设置 v8 引擎命令行标志
     v8 堆方法：
     v8.getHeapCodeStatistics()       //返回有关 v8 堆的统计信息对象
     v8.getHeapSpaceStatistics()      //返回有关 v8 堆内存的片段的统计信息
     v8.getHeapStatistics()           //返回有关 v8 堆内存的统计信息
     v8.getHeapSnapshot()             //返回包含 v8 堆快照的可读流
     v8.writeHeapSnapshot([filename]) //返回保存快照的文件名,生成当前 v8 堆快照并将其写入 JSON 文件
     v8 堆收集方法：
     v8.stopCoverage()                //无返回值,停止 NODE_V8_COVERAGE 启动的覆盖收集
     v8.takeCoverage()                //无返回值,将 NODE_V8_COVERAGE 开始的覆盖写入磁盘,每次执行将重置计数器,进程即将退出时除非在退出前调用该方法,否则最后一个覆写仍会写入磁盘
     v8 序列化方法：
     v8.serialize(value)              //返回 buffer,使用 DefaultSerializer 将 value 序列化到 buffer 缓冲区
     v8.deserialize(buffer)           //无返回值,使用带有默认选项的 DefaultDeserializer 从 buffer 缓冲区读取 JS 值
```

## 3. vm 模块

### (1) vm 模块

vm 模块用于`提供上下文对象并运行 JS 源码`

* 对于浏览器而言，只要将 JS 代码放在 `<script>` 标签中或者通过 `<script> src` 属性远程引用，JS 代码就会执行，在 JS 代码执行之前，会首先执行未曾定义但会预先传入的`上下文对象 Window`，iframe 也有自己的 Window 且各自独立
* Node 将一个 index.js 文件读取出来后只是一段`文本`，没有更大的作用，但要运行里面的代码，就需要一个类似于 Window 的上下文对象，而 vm 模块就是提供这个类似于 Window 的 `上下文对象 global`

### (2) vm API

```js
定义：import vm from 'vm'
方法：基础方法：
     vm.compileFunction(code,[params,[options]])        //
     vm.createContext([contextObject,[options]])        //
     vm.isContext(object)                               //
     vm.measureMemory([options])                        //
     vm.runInContext(code,contextifiedObject,[options]) //
     vm.runInNewContext(code,[contextObject,[options]]) //
     vm.runInThisContext(code,[options])                //
```

①②③④⑤⑥⑦⑧⑨⑩
