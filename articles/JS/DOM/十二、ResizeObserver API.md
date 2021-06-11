# 十二、ResizeObserver API

## 1. ResizeObserver API

ResizeObserver API 出现之前，通过监听 `window.onresize` 事件监听元素的大小变化，这通常会在改变窗口大小时导致性能问题

* resize 事件会在一秒内触发将近 `60` 次
* resize 事件只在 `window` 对象上触发，因此会监听每个元素的大小变化

MutationObserver API 用于`观察并处理 DOM 节点的大小变化`，可以只监听一个 DOM 节点的变化

* 元素节点的大小变化
* 元素节点的出现隐藏
* 屏幕的横竖屏

## 2. ResizeObserver 对象

浏览器原生提供 ResizeObserver 构造函数，接受一个回调函数作为参数，该回调函数接受一个参数，，当检测到页面变化时执行这个回调函数

```js
定义：const resizeObserver = new ResizeObserver(entries => {...})
方法：resizeObserver.observe(elem)   //无返回值,开始观察节点elem
     resizeObserver.unobserve(elem) //无返回值,停止观察节点elem
     resizeObserver.disconnect()    //无返回值,停止当前观察器的所有观察
```

## 3. ResizeObserverEntry 对象

ResizeObserverEntry 对象表示`对某个 DOM 元素的观察入口`，可以获得观察的 DOM 元素变化后的各种尺寸大小

```js
定义：const entry = entries[index]
属性：entry.target               
     entry.contentRect               
     entry.contentBoxSize            
     entry.borderBoxSize        
     entry.devicePixelContentBoxSize 
```

## 4. 实例

F12 打开控制台，控制 div 元素宽高变化时，会触发观察器执行回调函数

```html
<div id="block" style="border:1px solid red;width:100%;height:100px;">aaa</div>
```

```js
const resizeObserver = new ResizeObserver(entries => {
  console.log(entries)
  console.log(entries[0])
})
resizeObserver.observe(div)
```

## 5. 性能优化

使用 ResizeObserver API 在每次触发元素的大小变化时，会在 1s 内多次触发回调，可以使用 `throttle 节流函数`进一步优化性能

```js
const resizeObserver = new ResizeObserver(throttle(entries => {
  entries.forEach(entry => {
    console.log('大小位置 contentRect', entry.contentRect)
    console.log('监听的DOM target', entry.target)
  })
}), 500)
```
