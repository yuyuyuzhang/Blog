# 五、Node 事件触发机制

## 1. events 模块

浏览器通过 `DOM 事件`响应用户交互，Node 通过 events 模块的 `EventEmitter 类`处理 Node 事件

```js
定义：import events from 'events'
属性：events.defaultMaxListeners                  //返回默认最大事件监听器数量
方法：events.getEventListeners(emitterOrTarget,e) //返回emitterOrTarget上e事件的监听器数组副本
     events.setMaxListeners(n,[...eventTargets]) //无返回值,设置eventTargets的最大监听器数量为0
     events.once(emitter,e,[options])            //返回并创建指定事件e的单次监听器(触发一次后即移除)
     events.on(emitter,e,[options])              //返回并创建指定事件e的监听器
```

## 2. events.EventEmitter 类

events 模块对外提供 EventEmitter 类，EventEmitter 类通过 `new 命令`实例化

```js
定义：import EventEmitter from 'events'
     const emitter = new EventEmitter()
属性：emitter.usingDomains               //返回
方法：基本方法：
     emitter.eventNames()               //返回emitter上注册的事件数组
     emitter.listenerCount(e)           //返回emitter上指定事件e的监听器数量
     emitter.listeners(e)               //返回emitter上指定事件e的监听器数组
     emitter.getEventListeners()        //返回emitter上可以设置的监听器的最大数量(默认10)
     emitter.setMaxListeners(n)         //返回emitter实例,设置emitter可以设置的监听器的最大数量
     注册&触发事件监听方法：
     emitter.once(e,cb)                 //返回emitter实例,emitter创建指定事件e的单次监听器(触发一次后即移除)
     emitter.on/addListener(e,cb)       //返回emitter实例,emitter创建指定事件e的监听器
     emitter.prependListener(e,cb)      //返回emitter实例,同on,添加到监听器队列第一个
     emitter.prependOnceListeners(e,cb) //返回emitter实例,同once,添加到监听器队列第一个
     emitter.emit(e,x,...)              //返回布尔值,事件e是否存在监听器,emitter触发指定事件e并传入参数x,...
     移除事件监听方法：
     emitter.off/removeListener(e,cb)   //返回emitter实例,移除emitter上指定事件e的指定监听器
     emitter.removeAllListeners(e)      //返回emitter实例,移除emitter上指定事件e的所有监听器


事件：
emitter.onnewListener    //emitter上添加事件监听时触发
emitter.onremoveListener //emitter上移除事件监听时触发
emitter.onerror          //emitter遇到异常时触发
```

## 3. 实例

### (1) 注册 & 触发事件监听

* 普通回调函数 this 绑定 `emitter 实例`，箭头函数 this 不绑定
* emitter `按照注册顺序同步调用`所有监听器
  * emitter.on(e, cb)：添加到监听器队列`最后一个`

     ```js
     import EventEmitter from 'events'

     const emitter = new EventEmitter()
     emitter.on('open', function () {
          console.log('open1')
          console.log(this) //emitter EventEmitter {}
     })
     emitter.on('open', () => {
          console.log('open2')
          console.log(this) //undefined
     })
     emitter.emit('open') //'open1' 'open2'
     ```

  * emitter.prependListener(e, cb)：添加到监听器队列`第一个`

     ```js
     import EventEmitter from 'events'

     const emitter = new EventEmitter()
     emitter.on('open', () => {
          console.log('open1')
     })
     emitter.prependListener('open', () => {
          console.log('open2')
     })
     emitter.emit('open') //'open2' 'open1'
     ```

### (2) 移除事件监听

* emitter.off(e, cb)：移除单个监听器
* emitter.removeAllListeners(e)：移除所有监听器

     ```js
     import EventEmitter from 'events'

     const emitter = new EventEmitter()
     const cb1 = () => console.log('open1')
     const cb2 = () => console.log('open2')
     emitter.on('open', cb1)
     emitter.on('open', cb2)

     console.log(emitter.eventNames())          //['open']
     console.log(emitter.listenerCount('open')) //2
     console.log(emitter.listeners('open'))     //[Funtion: cb1, Funtion: cb2]

     emitter.off('open', cb1)

     console.log(emitter.eventNames())          //['open']
     console.log(emitter.listenerCount('open')) //1
     console.log(emitter.listeners('open'))     //[Funtion: cb2]

     emitter.removeAllListeners()

     console.log(emitter.eventNames())          //[]
     console.log(emitter.listenerCount('open')) //0
     console.log(emitter.listeners('open'))     //[]
     ```

### (3) newListener & removeListener 事件

```js
import EventEmitter from 'events'

const emitter = new EventEmitter()
emitter.on('newListener', (e, listener) => {
    console.log('e:', e)              
    console.log('listener:', listener) 
})
emitter.on('removeListener', (e, listener) => {
    console.log('e:', e)             
    console.log('listener:', listener) 
})

const cb = () => { console.log('open') }
emitter.on('open', cb)
emitter.off('open', cb)

// 输出：
// e: removeListener
// listener: [Function (anonymous)]
// e: open
// listener: [Function: cb]
// e: open
// listener: [Function: cb]
```

### (4) error 事件

emitter 实例遇到异常时`可能`会触发 error 事件，当`触发 error 事件且没有为 error 事件添加至少一个事件监听`时，会抛出错误，打印堆栈跟踪，退出 Node 进程

```js
import EventEmitter from 'events'

const emitter = new EventEmitter()
emitter.emit('error')
```

![error事件1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/error%E4%BA%8B%E4%BB%B61.png)

为防止 Node 进程崩溃，最佳实践是始终为 error 事件添加事件监听

```js
import EventEmitter from 'events'

const emitter = new EventEmitter()
emitter.on('error', () => {
    console.error('error open!')
})
emitter.emit('error')
```

![error事件2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/error%E4%BA%8B%E4%BB%B62.png)

## 4. 创建一个继承 events.EventEmitter 类的子类

* InputChecker.js

     ```js
     import EventEmitter from 'events';
     import fs from 'fs';

     class InputChecker extends EventEmitter {
          constructor(name, file) {
               super(); // 先调用父类构造函数新建实例

               this.name = name;
               this.writeStream = fs.createWriteStream('./' + file + '.txt');
          }
          check(input) {
               const command = input.trim().substr(0, 3)
               if(command == 'wr:') {
                    this.emit('write', input.substr(3, input.length))
               } else {
                    this.emit('end')
               }
          }
     }

     const ic = new InputChecker('yuyuyuzhang', 'output')
          ic.on('write', function(data) {
          this.writeStream.write(data, 'utf8')
     })
     ic.on('end', function() {
          process.exit()
     })

     process.stdin.setEncoding('utf8')
     process.stdin.on('readable', function() {
          const input = process.stdin.read()
          input && ic.check(input) 
     })
     ```

* node InputChecker.js

  ![InputChecker]()
