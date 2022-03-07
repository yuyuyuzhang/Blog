# 十二、Node 性能

## 1. perf_hooks 模块

perf_hooks 模块提供了 `W3C Web 性能 API` 子集的实现，以及用于 Node 特定性能测量的其他 API

Node 支持以下 Web 性能 API

* 高解析度时间
* 性能时间轴
* 用户计时

```js
定义：import perf_hooks from 'perf_hooks'
方法：
     perf_hooks.createHistogram([options])       //
     perf_hooks.monitorEventLoopDelay([options]) //
```

## 2. perf_hooks.performance 对象

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
