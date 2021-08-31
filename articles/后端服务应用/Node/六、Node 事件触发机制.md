# 六、Node 事件触发机制

## 1. events 模块

浏览器通过 DOM 事件响应用户交互，Node 通过 events 模块的 EventEmitter 类处理 Node 事件

### (1) EventEmitter 类

events 模块对外提供 EventEmitter 类，EventEmitter 类通过 `new 命令`实例化

```js
import EventEmitter from 'events'
```

### (2) emitter 对象属性和方法

```js
定义：const emitter = new EventEmitter()
属性：emitter.usingDomains               //
方法：设置事件监听：
     emitter.eventNames()               //返回emitter上注册的事件数组
     emitter.listenerCount(e)           //返回emitter上指定事件e的监听器数量
     emitter.listeners(e)               //返回emitter上指定事件e的监听器数组
     emitter.getEventListeners()        //返回emitter上可以设置的监听器的最大数量(默认10)
     emitter.setMaxListeners(n)         //返回emitter实例,设置emitter可以设置的监听器的最大数量
     注册&触发事件监听：
     emitter.once(e,cb)                 //返回emitter实例,emitter创建指定事件e的单次监听器(触发一次后即移除)
     emitter.on/addListener(e,cb)       //返回emitter实例,emitter创建指定事件e的监听器
     emitter.prependListener(e,cb)      //返回emitter实例,同on,添加到监听器队列第一个
     emitter.prependOnceListeners(e,cb) //返回emitter实例,同once,添加到监听器队列第一个
     emitter.emit(e,x,...)              //返回布尔值,事件e是否存在监听器,emitter触发指定事件e并传入参数x,...
     移除事件监听：
     emitter.off/removeListener(e,cb)   //返回emitter实例,移除emitter上指定事件e的指定监听器
     emitter.removeAllListeners(e)      //返回emitter实例,移除emitter上指定事件e的所有监听器
```

#### ① 注册&触发事件监听

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

#### ② 移除事件监听

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

### (3) emitter 事件

```js
emitter.onnewListener    //emitter上添加事件监听时触发
emitter.onremoveListener //emitter上移除事件监听时触发
emitter.onerror          //emitter遇到异常时触发
```

#### ① newListener & removeListener

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

#### ② error

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

## 2. EventTarget、Event 类

Node 提供全局对象 EventTarget、Event 类，是 EventTarget Web API、Event Web API 特定于 Node 的实现

### (1) Node EventTarget 对比 DOM EventTarget

Node EventTarget 没有事件传播的概念，调度到 Node EventTarget 的事件不会通过嵌套目标对象的层次结构传播

### (2) EventTarget 对象属性和方法

```js
定义：const target = new EventTarget()
方法：target.addEventListener(e,listener,{once}) //无返回值,为target添加指定事件e的监听器listener
     target.removeEventListener(e,listener)     //无返回值,为target移除指定事件e的监听器listener
     target.dispatchEvent(e)                    //返回布尔值,target触发事件e,按照注册顺序同步调用监听器
```

### (3) Event 对象属性和方法

```js
定义：const e = new Event(type)
属性：e.type                            //返回事件e的类型
     e.timeStamp                       //返回创建事件e时的毫秒时间戳
     e.cancelable                      //返回布尔值,e创建时是否使用cancelable选项
     e.target/currentTarget/srcElement //返回触发事件e的EventTarget实例
     e.defaultPrevented                //返回布尔值,e.cancelable=ture且e.preventDefault()被调用则返回true
     e.isTrusted                       //返回布尔值,设置为true才会触发abort事件,其他所有情况都为false
方法：e.preventDefault()                //无返回值,当e.cancelable=true则设置e.defaultPrevented=true
     e.stopImmediatePropagation()      //无返回值,当前事件监听器完成后停止调用
```

Node 支持的事件类型：event.type

```js
鼠标事件：
MOUSE_DOWN            //鼠标按下时触发
MOUSE_UP              //鼠标松开时触发
MOUSE_ENTER           //鼠标移入目标节点区域时触发
MOUSE_MOVE            //鼠标在目标节点区域内移动时触发
MOUSE_LEAVE           //鼠标移出目标节点区域时触发
MOUSE_WHEEL           //鼠标滚轮滚动时触发
触摸事件：
TOUCH_START           //手指触摸到屏幕时触发
TOUCH_MOVE            //手指在屏蔽上移动时触发
TOUCH_END             //手指在目标节点区域内离开屏幕时触发
TOUCH_CANCEL          //手指在目标节点区域外离开屏幕时触发
节点事件：
POSITION_CHANGED      //节点位置改变时触发
ROTATION_CHANGED      //节点旋转改变时触发
SCALE_CHANGED         //节点缩放改变时触发
SIZE_CHANGED          //节点尺寸改变时触发
ANCHOR_CHANGED        //节点锚点改变时触发
COLOR_CHANGED         //节点颜色改变时触发
GROUP_CHANGED         //节点归属群组改变时触发
SIBLING_ORDER_CHANGED //节点在兄弟节点中的顺序改变时触发
CHILD_REORDER         //子节点顺序改变时触发
CHILD_ADDED           //添加子节点时触发
CHILD_REMOVED         //移除子节点时触发
```

### (4) 实例

```js

```
