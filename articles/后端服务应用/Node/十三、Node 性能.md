# 十三、Node 性能

## 1. perf_hooks 模块

perf_hooks 模块提供了 `W3C Web 性能 API` 子集的实现，以及用于 Node 特定性能测量的其他 API

Node 支持以下 Web 性能 API

* 高解析度时间
* 性能时间轴
* 用户计时

```js
定义：import perf_hooks from 'perf_hooks'
方法：Histogram 类方法：
     perf_hooks.createHistogram([{lowest,highest,figures}]) //返回 RecordableHistogram 实例
     perf_hooks.monitorEventLoopDelay([{resolution}])       //返回 IntervalHistogram 实例,可随时间采样并报告事件循环延迟
```

## 2. perf_hooks.Histogram 类

### (1) Histogram API

```js

```

### (2) IntervalHistogram API

```js

```

### (3) RecordableHistogram API

```js

```

## 3. perf_hooks.performance 对象

perf_hooks.performance 对象类似浏览器中的 window.performance 对象，可从当前 Node 实例手机性能指标

```js
定义：import perf_hooks from 'perf_hooks'
     const performance = perf_hooks.performance
属性：
performance.timeOrigin //返回当前 Node 进程开始的高解析度毫秒时间戳
performance.nodeTiming //返回 PerformanceNodeTiming 实例
方法：
performance.timerify(fn,[options])
performance.toJSON()
performance.now() //返回当前的高解析度毫秒时间戳,0 表示当前 Node 进程正开始
performance.clearMarks([name]) //无返回值,从性能时间轴中删除可选参数 name 指定的 PerformanceMark 对象,未提供 name 则删除所有
performance.eventLoopUtilization([utilization1,[utilization2]]) //返回包含事件循环作为高解析度毫秒计时器的既空闲又活动的累积持续时间的对象
performance.mark([name,[options]])
performance.measure(name,[startMarkOrOptions,[endMark]])
```

①②③④⑤⑥⑦⑧⑨⑩

## 4. 影响 Node 服务性能的因素

### (1) 代码逻辑

以下 3 种代码情况，只有 CPU 密集型计算会真正影响 Node 性能，而网络 IO 和磁盘 IO 都是直接影响服务器性能，从而侧面影响 Node 性能

#### ① CPU 密集型计算

CPU 负责程序的运行和业务逻辑的处理，CPU 密集型主要表示 CPU 承载了比较复杂的计算，Node 主线程是单线程的，无论是主线程逻辑还是回调逻辑，最终都还是在主线程处理，那么如果主线程一直在处理复杂的计算，其他请求就无法进来，也就是说单个用户就可以阻塞所有用户的请求，因此保持主线程通畅非常关键

以下几种情况的处理，会影响主线程的运行，应该主动避免

* **大的数据循环**：例如没有利用好数据流，一次性处理非常大的数组
* **字符串处理转化**：例如加解密、字符串序列化等
* **图片、视频的计算处理**：例如对图片进行裁剪、缩放或者切割等

#### ② 远程网络 IO

IO 的意思是`输入输出`，也就是数据传递的一个过程，作为后台服务需要更多地与外部进行数据交互，也就免不了 IO 操作，IO 操作在系统层面有以下 2 个阶段

* 读取文件，将文件放入`操作系统的内核缓冲区`
* 将操作系统内核缓冲区的文件拷贝到`应用程序地址空间`

网络 IO 分为以下 2 种类型

* **同步网络 IO**：发起网络请求后，需要等待返回才能处理其他计算
* **异步网络 IO**：发起网络请求后，可以继续处理其他计算

网络 IO 的成本很高，因为涉及到以下 2 个重要的点

* 依赖其他服务的性能
* 依赖服务器之间的延时

针对以上 2 个点，可以从以下几个方面考虑优化的策略

* **本地内存缓存**：本地内存缓存`已获取的内容`可以`减少与网络 IO 的交互`，对于固化的、无差别的用户数据是很有必要的，例如客户端配置信息
* **共享内存方案**：本地内存缓存有一个最大的问题就是，如果每台机器都缓存了运营配置，这时候运营修改了配置，然而不同机器的过期时间不一致，就会导致不同机器用户的首页配置不一致，这时候就需要共享内存方案来解决了
  如下图我们访问 API 服务，在 API 中判断是否有缓存，有缓存则直接从共享内存服务中读取，没有则先前往数据库 MySQL 获取最新数据，返回到 API 服务后，再设置共享内存，这样下次用户访问就可以直接从缓存获取
  ![共享内存方案](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%85%B1%E4%BA%AB%E5%86%85%E5%AD%98%E6%96%B9%E6%A1%88.png)
  共享内存方案适合那些`可以延迟更新的数据服务，并且与用户维度无关`
* **异步队列方案**：异步队列方案可以显著`降低网络 IO 服务的并发压力`，例如每个用户抢票都执行一次查询并且购票，那么对于目标机器则压力非常大，这时就可以采用异步队列的方式，也就是用户发送请求后只是告知用户你已经进入队列，但真正情况是用户请求仍缓存在队列中，再一个个前往具体的网络 IO 服务并独立去处理，这时候并发压力就可控，也就不会出现性能问题
  如下图所示，假设现在有 3 个用户同时向服务器请求，这时候服务器处理不过来，只能告知用户你的请求我们已经收到且正在处理中，请耐心等待通知，这时候将用户请求放到一个队列中，然后通知另一个服务定时从队列获取待处理的消息，根据实际情况处理完成后，再将处理结果告知用户，这让用户无感知，只是延迟了用户收到结果的时间
  ![异步队列方案](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%BC%82%E6%AD%A5%E9%98%9F%E5%88%97%E6%96%B9%E6%A1%88.png)

异步网络 IO 一般不会影响父进程性能，但对于 `CPU 密集型的异步网络 IO`，要如何提升性能呢？

* **TCP 通道复用**：服务器实现 TCP 通道复用，可以减少 TCP 握手从而提升接口性能，或者将某些内部服务使用 UDP 实现
* **增加缓存**：服务器增加缓存处理，对于相同响应的返回数据，避免不必要的计算
* **长链接链接池**：某些网络 IO 是长链接的形式，比如 MySQL、Mamcached 或者 Redis，为了避免排队使用长链接的问题，可以使用链接池，而由于 Redis 和 Node 是单线程非阻塞处理，因此可以不用链接池

#### ③ 本地磁盘 IO

磁盘 IO 是异步其他线程处理，一般情况下是不会影响主线程的性能的，但是涉及磁盘 IO 的服务请求，就不一定了，因为服务器的磁盘性能是一定的，在高并发的情况下，磁盘 IO 压力比较大，可能导致磁盘 IO 的服务性能下降

涉及磁盘 IO 的服务请求，如何提高性能呢？需要考虑如下 6 点

* 读 IO
  * 大文件读取：使用数据流的方式，不要一次性读取到内存中处理
  * 需要获取读取结果：尽量缓存读取结果，减少并发对系统的压力
  * 无法进行缓存：尽量考虑不使用本地磁盘 IO 操作
* 写 IO
  * 尽量使用文件流的方式，避免重复打开同一个文件
  * 不需要获取写入结果：不进行回调处理，减少主线程压力
  * 可以将需要写入的日志放入一个临时内存，从而降低系统并发处理压力，降低系统负载

实例开发中最常见的磁盘 IO 场景就是`日志模块`，因为日志需要频繁的写入文件，日志模块的性能提升点可以有以下 3 个点

* 保存带写入的日志信息到临时内存
* 定时从临时内存中，取出数据写入文件
* 写入文件后，无需处理回调

![日志模块](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E6%97%A5%E5%BF%97%E6%A8%A1%E5%9D%97.png)

### (2) 集群服务

后台服务无论是多机器部署还是单机器部署，都有集群的概念

![集群模式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E9%9B%86%E7%BE%A4%E6%A8%A1%E5%BC%8F.png)

Node cluster 模块提供集群功能，cluster 模块应用 child_process 创建子进程，子进程通过复写掉 cluster._getServer 方法，从而在 server.listen 保证只有父进程监听端口，其次父进程根据平台或者协议不同，应用两种不同模块（round_robin_handle.js/shared_handle.js）进行请求分发给子进程处理

平时实例通过 node index.js 启动的 Node 服务，就只启动了一个进程，只能在一个 CPU 中计算，无法应用服务器的多核 CPU，Node cluster 模块就是`一个父进程和多个子进程`形成的一个集群的概念，使用的是`多进程分发策略：父进程监听一个端口，子进程不监听端口，通过父进程分发请求到子进程`

![cluster多进程分发策略](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/cluster%E5%A4%9A%E8%BF%9B%E7%A8%8B%E5%88%86%E5%8F%91%E7%AD%96%E7%95%A5.png)

这种集群模式父进程会存在性能瓶颈，因为所有的请求都必须经过父进程进行分发，同时父进程接收子进程的返回，在实际开发中会遇到这样一个问题，所用机器是一个 96 核以上的服务器，因此启用了较多的子进程，而父进程只有一个，因此在单机高并发时会导致父进程处理性能瓶颈（2 万以上的每秒并发请求），这就影响到了服务性能，然后子进程的 CPU 没有任何压力，这点非常重要，但在生产环境下一般很难发现这类问题，但是应该有这样一个概念：`大概在 2 万以上的并发时，父进程会存在性能瓶颈`

### (3) 服务器资源竞争

对于 Node 后台服务，还应该考虑它对服务器资源竞争产生的性能影响，例如无节制地使用服务器的内存或句柄，从而导致服务器的异常，而服务器的异常也会侧面影响 Node 性能

#### ① 内存限制

32 位服务器上的 Node 进程内存限制是 0.7G，64 位服务器上是 1.4G，这个限制主要是因为 Node 垃圾回收线程在超过限制内存时回收时长循环会大于 1s，从而影响性能

现在我们一般启用多个进程，如果每个进程损耗 1.4G，那么加起来就可能超过了服务器内存上限，从而导致服务器瘫痪，其次如果内存达到一定上限也就是 0.7G/1.4G，会导致服务器重启，从而导致接口请求失败

#### ② 句柄限制

句柄可以理解为一个 `ID 索引`，通过这个索引可以访问到对应资源，例如文件句柄、网络 IO 操作句柄等，一般服务器句柄都有上限，当 Node 没有控制好句柄例如无限打开文件未关闭时，可能会出现句柄泄露问题，这样会导致服务器异常，从而影响 Node 性能

## 5. CPU 过载保护机制

### (1) 过载保护

过载保护这个词最早出现在电路方面，出现短路或电压承载过大时，会触发电源的过载保护，要不熔断，要不切断电源

假设一种场景，去银行办事都需要拿号排队，银行每 10 分钟处理 1 个人的业务，而每 10 分钟进来 2 个人，这样每 10 分钟就会积压一个人，然后偶数进来的人还需要再多等 10 分钟，这样每个人的等待时长为 `((n+1)/2-1+(n+1)%2)*10`，其中变量 n 为第 n 个进来的人，随着 n 越大，等待的时长就越长，如果没有即时制止银行将永远处于饱和状态，长时间饱和工作状态，银行工作人员非常幸苦将无法提供更好的服务

一般这种情况下，银行都有一定的`取号上限`或保安会提示无法再服务了，这就是`过载保护：避免因事务积压，导致系统无法提供更好的服务`

### (2) CPU 过载保护

Node 最大的性能瓶颈在于 CPU，`CPU 密集型请求可能会导致服务器瘫痪`，因此需要针对 CPU 实现过载保护机制，`当 CPU 使用率超出一定范围时，进行请求熔断处理，切断用户服务直接报错返回，直到 CPU 压力恢复时正常响应用户请求`

CPU 过载保护机制的实现方案

* 获取当前进程所在 CPU 使用率
* 尽量避免影响服务器性能
* 请求丢弃及减少误处理
* 请求优先级

### (3) 获取 CPU 使用率

单个 Node 进程启动后都绑定在单核 CPU 上，假设机器有 2 个 CPU，在没有其他外在因素的影响下，单个 Node 进程即使跑满 CPU，也最多只占用 50% 的总机器 CPU 占用率

我们需要获取的是`当前进程的 CPU 使用情况`，而非整体机器的 CPU 使用情况，因此不能使用 Node 的 os 模块

```js
/**
 * @description 获取当前进程绑定 CPU 的利用率
 */
async _getProcessInfo() {
     // 获取当前进程信息
     let pidInfo
     if (platform === 'win32') {  
          pidInfo = await this._getWmic() // windows
     } else { 
          pidInfo = await this._getPs() // linux & mac
     }

     // 获取当前进程绑定 CPU 的信息
     const cpuInfo = await this._parseInOs(pidInfo); 
     if(!cpuInfo || cpuInfo == '') { 
          return false
     }

     // 字段解析处理，获取当前进程绑定 CPU 的利用率
     return parseFloat(cpuInfo).toFixed(4)
}

/**
 * @description Linux & Mac 系统使用 ps 命令获取当前进程信息
 */
async _getPs() {
     const cmd = `ps -p ${process.pid} -o pcpu`;
     const { stdout, stderr } = await exec(cmd);
     if(stderr) {
          console.log(stderr);
          return false;
     }
     return stdout;
}

/**
 * @description Windows 系统使用 wmic 命令获取当前进程信息
 */
async _getWmic() {
     const cols = 'IDProcess,Name,PercentProcessorTime,PrivateBytes,VirtualBytes';
     const cmd  = 'wmic path Win32_PerfFormattedData_PerfProc_Process get ' + cols + ' /format:csv';
     const { stdout, stderr } = await exec(cmd)
     if(stderr) {
          console.log(stderr);
          return false;
     }
     return stdout;
}

/**
 * @description 获取指定进程绑定 CPU 的信息
 */
async _parseInOs(pidInfo) {
     let lines = String(pidInfo).trim().split(os.EOL);
     if(!lines || lines.length < 2){
          return false;
     }
     let cpuStr = lines[1];
     return cpuStr.trim();
}
```

### (4) 概率丢弃及减少误处理

获取 CPU 信息后，可以根据当前 CPU 情况进行一些丢弃处理，但是应该尽量避免出现误处理的情况，比如 CPU 某个时刻出现了过高，但是立马恢复了，这种情况下是不能丢弃请求的，`只有当 CPU 长期处于高负载的情况下才能进行请求丢弃`，即使丢弃请求，也要根据概率来丢弃，而不是每个请求都丢弃，需要根据以下 3 个变量来判断

* **overloadTimes（o）**：CPU 过载持续次数，该值越高丢弃概率越大，可以看作直线型，影响概率 0.1
* **currentCpuPercentage（c）**：CPU 当前负载，该值越高丢弃概率越大，也可以看作直线型
* **baseProbability（b）**：CPU 负载最大时的丢弃概率，该值越高丢弃概率越大，指数增长模型

从上可得出一个简单的计算公式如下：

```js
P = (0.1 * o) * Math.exp(c) / (10 * Math.exp(10)) * b
```

该计算公式的实现代码如下

```js
/**
 * @description 设置丢弃概率
 */
_setProbability() {
     let o = overloadTimes >= 100 ? 100 : overloadTimes;
     let c = currentCpuPercentage >= 100 ? 10 : currentCpuPercentage/10;
     currentProbability = ((0.1 * o) * Math.exp(c) / maxValue * this.baseProbability).toFixed(4);
}
```

### (5) 性能影响

Node 只有一个主线程，因此必须严格减少框架在主线程的占用时间，控制框架基础模块的性能损耗，从而将主线程资源更多地服务于业务，增强业务并发处理能力，因此我们需要做到以下这点

* **定时落地 CPU 信息到内存**：也就是说我们需要`定时校验服务器是否过载`，而非根据用户访问来实时计算

在上一步的程序上，优化逻辑，并且定时设置内存中的 CPU 使用率

```js
/**
 * @description 定时校验服务器是否过载
 */
async check() {
     // 定时处理逻辑
     setInterval(async () => {
          try {
               // 获取当前进程绑定 CPU 的利用率
               const cpuInfo = await this._getProcessInfo();
               if(!cpuInfo) {
                    return;
               }
               currentCpuPercentage = cpuInfo;

               if(cpuInfo > this.maxCpuPercentage) { 
                    overloadTimes++; // 当 cpu 持续过载时，将当前的 overloadTimes 计数 +1
               } else { 
                    overloadTimes = 0; // 当 cpu 低于设定值时，认为服务负载恢复，将 overloadTimes 设置为 0
                    return isOverload = false;
               }

               // 当持续出现 cpu 过载并且达到了我们设置上限时，需要进行请求丢弃
               if(overloadTimes > this.maxOverloadNum){ 
                    isOverload = true;
               }

               // 设置丢弃概率
               this._setProbability();
          } catch(err){
               console.log(err);
               return;
          }
     }, 2000);
}
```

### (6) 优先级处理

有了概率丢弃和减少误处理后，还需要考虑以下 2 个点

* **优先级问题**：有些核心请求不希望用户在访问时出现丢弃的情况，例如支付或者其他核心重要的流程
* **关联接口**：对于某个用户，我们允许该用户访问其中一个接口，那么其他关联接口在短时间内也应该允许访问，否则用户还是无法正常使用功能

优先级实现最简单的方式就是`白名单机制`，白名单中的请求无需校验直接通过处理，不在白名单中的请求才会进行检查

```js
/*
 * @description 判断服务器当前是否可用
 * @param {string} path 请求路径
 * @param {string} uuid 通用唯一识别码
 */
isAvailable(path, uuid) {
     // 判断是否在白名单内
     if(path && this.whiteList.includes(path)) { 
          return true
     }

     // 判断是否已经放行过
     if(uuid && canAccessList.includes(uuid)){ 
          return true
     }

     // 判断是否过载
     if(isOverload) {
          if(this._getRandomNum() <= currentProbability) {
               removeCount++
               return false
          }
     }

     // 需要将 uuid 加入放行数组
     if(uuid) { 
          if(canAccessList.length > maxUser){
               canAccessList.shift()
          }
          canAccessList.push(uuid)
     }

     return true
}
```

### (7) 实际使用

入口文件初始化 CPU 过载保护模块，并且调用 check() 方法，定时获取 CPU 信息

```js
import CPUOverLoad from './util/cpuOverload'

const cpuOverload = new CPUOverLoad()
cpuOverload.check().then().catch(err => {
    console.log(err)
})
```

请求转发处先进行判断，进入业务之前就进行拦截处理

![isAvailable](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/isAvailable.png)

实际代码文件见 demos - 后端服务应用 - Node - ES6 modules - 16. Node 框架 - koa-project
