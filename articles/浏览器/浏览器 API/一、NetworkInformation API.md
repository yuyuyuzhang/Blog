# 一、NetworkInformation API

## 1. 浏览器在线/离线

为了构建离线 Web 应用，需要知道应用何时真正处于离线状态，何时重新回到在线状态

* 应用何时回到在线状态：可以与服务器重新同步
* 应用何时处于离线状态：可以将对服务器的请求放入队列中以便稍后使用

```js
navigator.onLine //返回布尔值,当前浏览器是否在线
```

## 2. NetworkInformation 对象

NetworkInformation 对象表示`当前设备的网络连接信息`

```js
定义：const net = navigator.connection
属性：net.effectiveType //返回当前网络连接的有效类型(slow-2g,2g,3g,4g)
     net.downlink      //返回有效宽带估计值
     net.rtt           //返回当前网络连接的估计有效往返时间
     net.saveData      //返回布尔值,用户是否在用户代理上设置了减少数据使用率选项
```

## 3. NetworkInformation 事件

```js
net.onchange //当前网络连接信息变化时,在当前网络连接上触发
```

## 4. 实例

```js
//浏览器是否在线
console.log(navigator.onLine)

//监听当前网络连接的变化
const net = navigator.connection
net.addEventListener('change', e => {
  console.log(e.target)
})
```
