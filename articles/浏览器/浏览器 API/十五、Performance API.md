# 十五、Performance API

## 1. Performance 对象

Performance API 用于`前端性能监控`

```js
定义：const performance = window.performance
属性：performance.timeOrigin                       //返回
     performance.eventCounts                      //返回 EventCounts 对象
     performance.memory                           //返回 MemoryInfo 对象
     performance.navigation                       //返回 PerformanceNavigation 对象,包含当前浏览上下文中网页导航的类型及次数
     performance.timing                           //返回 PerformanceTiming 对象,包含延迟相关的性能信息
方法：performance.toJSON()                         //返回 JSON 格式化后的 Performance 对象
     performance.now()                            //返回创建上下文环境到调用当前方法时的时间戳
     performance.clearMarks()                     //
     performance.clearMeasures()                  //
     performance.clearResourceTimings()           //
     performance.getEntries()                     //
     performance.getEntriesByName()               //
     performance.getEntriesByType()               //
     performance.mark()                           //
     performance.measure()                        //
     performance.measureUserAgentSpecificMemory() //
     
     performance.setResourceTimingBufferSize()    //
     

事件：
.onresourcetimingbufferfull //
```

## 2. PerformanceTiming 对象

## 3. PerformanceNavigation 对象
