# 十四、ServiceWorker API

## 1. ServiceWorker 概述

ServiceWorker 是一个`运行在后台的 Worker 线程`，它会长期运行充当一个服务，最常见用途就是拦截和处理网络请求

ServiceWorker 充当`浏览器和服务器之间的代理服务器`，如果网站注册了 ServiceWorker，那么 ServiceWorker 就可以拦截当前网站的所有请求，如果需要向服务器发起请求就转发给服务器，如果可以直接使用缓存就直接返回缓存，从而大大提高浏览体验

* ServiceWorker 基于 `WebWorker`
* ServiceWorker 完全`异步`，无法访问同步 API：XHR、Storage，可以访问异步 API：IndexedDB
* ServiceWorker 只能由 `HTTPS` 承载，毕竟将修改网络请求的能力暴露给中间人攻击十分危险
* ServiceWorker 脚本必须与当前网址`同源（协议、域名、端口）`，不允许跨域脚本
* ServiceWorker 在 WebWorker 的基础上增加了`离线缓存`的能力，创建了有效的离线体验，将不常更新的内容缓存在服务器，提高浏览体验
* ServiceWorker 可以让开发者自己管理缓存的内容及版本

## 2. ServiceWorker API

### (1) ServiceWorkerContainer 对象

ServiceWorkerContainer 对象表示 `ServiceWorker 容器`，包括对 ServiceWorker 的注册、下载、卸载、更新、访问

```js
定义：const serviceWorkerCon = navigator.serviceWorker
属性：serviceWorkerCon.controller             //返回控制当前页面的 ServiceWorker 实例
     serviceWorkerCon.ready                  //返回当前容器是否准备好为页面服务
方法：serviceWorkerCon.ready()                //返回 Promise 实例,
     serviceWorkerCon.register(path,options) //返回 Promise 实例,当前容器注册指定路径的 ServiceWorker 脚本
     serviceWorkerCon.getRegistration()      //返回当前容器与当前网页匹配的 ServiceWorkerRegistration 实例
     serviceWorkerCon.getRegistrations()     //返回当前容器的所有 ServiceWorkerRegistration 实例
     serviceWorkerCon.startMessages()        //


事件：
serviceWorkerCon.oncontrollerchange //当前容器的注册获取到新的激活状态的 serviceWorker 对象时触发
serviceWorkerCon.onmessage          //当前容器接收到消息时触发
serviceWorkerCon.onmessageerror     //当前容器接收消息错误时触发
```

### (2) ServiceWorker 对象

ServiceWorker 对象继承自 WebWorker 类

```js
定义：const serviceWorker = 
属性：serviceWorker.state     //返回当前 serviceWorker 状态(installing,installed,activating,activated,redundant)
     serviceWorker.scriptURL //返回当前 serviceWorker 序列化脚本 URL
方法：Worker 类的方法


事件：
serviceWorker.onstatechange //当前 serviceWorker 状态改变时触发
```

### (3) ServiceWorkerRegistration 对象

ServiceWorkerRegistration 对象表示 `ServiceWorker 注册`，

```js
定义：const register = await serviceWorkerCon.register(path,options)
属性：
     register.active              //返回当前注册激活的 ServiceWorker 实例
     register.scope               //返回当前注册的作用域
     register.installing          //
     register.waiting             //
     
     register.periodicSync        //
     register.pushManager         //
     register.sync                //
     register.backgroundFetch
     register.cookies
     register.paymentManager
     register.updateViaCache
方法：register.getNotifications()  //
     register.showNotifications() //
     register.update()            //
     register.unregister()        //


事件：
serviceWorker.onupdateFound //
```

## 3. ServiceWorker 使用

### (1) 注册

使用 ServiceWorker 的第一步，就是告诉浏览器，需要注册一个 ServiceWorker 脚本

* ServiceWorker 脚本文件路径是相对于`根目录`的，而非当前 JS 文件目录
* ServiceWorker 默认只对`根目录`生效，如果要改变生效范围，需要修改配置对象 options 的范围属性 scope

同一个源下，可以注册多个 ServiceWorker，但每个 ServiceWorker 的 scope 必须不同

默认情况下，ServiceWorker 每 24 小时被下载一次，如果下载的是最新文件，就会被重新注册和安装，但不会被激活，当所有页面都不再使用旧的而是使用最新的 ServiceWorker 时就会被激活，这对于开发非常不方便，因此可以在控制台 F12 的 ServiceWorker 中勾选 `Update on reload`，选中后每次刷新页面都会得到最新文件

```js
navigator.serviceWorker.register('serviceWorker.js', { scope: './' })
  .then(register => {
    console.log(register) // ServiceWorkerRegistration 实例
  })
  .catch(err => console.log('error'))
```

### (2) 安装

ServiceWorker 注册成功后浏览器会自动安装，安装完成后会触发 ServiceWorker 脚本的 `install 事件`

serviceWorker.js

```js
this.addEventListener('install', e => {
  // e.waitUntil() 指定 install 事件完成后的回调函数
  e.waitUntil(() => {
    console.info('安装完成')
  })
})
```

### (3) 激活

ServiceWorker 安装完成后就会等待激活，激活成功后会触发 ServiceWorker 脚本的 `activate 事件`

```js
this.addEventListener('activate', e => {
    // e.waitUntil() 指定 activate 事件完成后的回调函数
    e.waitUntil(() => {
        console.log('激活完成')
    })
})
```

### (4) 通信

serviceWorker.js

```js
this.addEventListener('activate', e => {
    e.waitUntil(
        this.clients.matchAll().then(client => {
            client.postMessage({
                msg: 'Hey, from ServiceWorker! I\'m listening to your fetch requests.',
                source: 'service-worker'
            })
        })
    )
})
```

客户端

```js
this.addEventListener('message', data => {
    if(data.source == 'service-worker'){
        console.log(data.msg)
    }
})
```
