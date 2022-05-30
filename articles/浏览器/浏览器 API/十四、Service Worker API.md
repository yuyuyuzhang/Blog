# 十四、Service Worker API

## 1. Service Worker

Service Worker 是一个`运行在后台的 Worker 线程`，它会长期运行充当一个服务，最常见用途就是拦截和处理网络请求

Service Worker 充当`浏览器和服务器之间的代理服务器`，如果网站注册了 Service Worker，那么 Service Worker 就可以拦截当前网站的所有请求，如果需要向服务器发起请求就转发给服务器，如果可以直接使用缓存就直接返回缓存，从而大大提高浏览体验

* Service Worker 基于 `Web Worker`
* Service Worker 完全`异步`，无法访问同步 API：XHR、Storage，可以访问异步 API：IndexedDB
* Service Worker 只能由 `HTTPS` 承载，毕竟将修改网络请求的能力暴露给中间人攻击十分危险
* Service Worker 脚本必须与当前网址`同源（协议、域名、端口）`，不允许跨域脚本
* Service Worker 在 Web Worker 的基础上增加了`离线缓存`的能力，创建了有效的离线体验，将不常更新的内容缓存在服务器，提高浏览体验
* Service Worker 可以让开发者自己管理缓存的内容及版本

## 2. ServiceWorkerContainer 对象

```js
定义：const serviceWorkerCon = navigator.serviceWorker
属性：serviceWorkerCon.controller         //返回
方法：serviceWorkerCon.ready()            //返回Promise实例,
     serviceWorkerCon.register(path,options) //返回Promise实例,注册指定的Service Worker脚本
     serviceWorkerCon.startMessages()    //
     serviceWorkerCon.getRegistration()  //
     serviceWorkerCon.getRegistrations() //


事件：
controllerchange //
message          //
messageerror     //
```

## 3. Service Worker 的使用

### (1) 注册

使用 Service Worker 的第一步，就是告诉浏览器，需要注册一个 Service Worker 脚本

* Service Worker 脚本文件路径是相对于`根目录`的，而非当前 JS 文件目录
* Service Worker 默认只对`根目录`生效，如果要改变生效范围，需要修改配置对象 options 的范围属性 scope

用一个源下，可以注册多个 Service Worker，但每个 Service Worker 的 scope 必须不同

默认情况下，Service Worker 每 24 小时被下载一次，如果下载的是最新文件，就会被重新注册和安装，但不会被激活，当所有页面都不再使用旧的而是使用最新的 Service Worker 时就会被激活，这对于开发非常不方便，因此可以在控制台 F12 的 Service Worker 中勾选 `Update on reload`，选中后每次刷新页面都会得到最新文件

```js
navigator.serviceWorker.register('serviceWorker.js', { scope: './' })
  .then(reg => {
      console.log(reg) //ServiceWorkerRegistration 实例
  })
  .catch(err => console.log('error'))
```

### (2) 安装

Service Worker 注册成功后浏览器会自动安装，安装完成后会触发 Service Worker 脚本的 `install 事件`

serviceWorker.js

```js
this.addEventListener('install', e => {
  //e.waitUntil() 指定 install 事件完成后的回调函数
  e.waitUntil(() => {
    console.info('安装完成')
  })
})
```

### (3) 激活

Service Worker 安装完成后就会等待激活，激活成功后会触发 Service Worker 脚本的 `activate 事件`

```js
this.addEventListener('activate', e => {
    //e.waitUntil() 指定 activate 事件完成后的回调函数
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
                msg: 'Hey, from service worker! I\'m listening to your fetch requests.',
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

## 4. 离线应用

### (1) manifest 文件

在 Service Worker 出现之前，离线应用的解决方案一般是 manifest 文件，但是目前 Service Worker 已经取代 manifest 文件

离线应用需要创建一个 `manifest.appcache` 文件，该文件列出了该应用所有需要存储的文件

* manifest 文件的 MIME 类型必须是 `text/cache-manifest`，如果服务器将其设为其他 MIME 类型，该应用就不会被浏览器缓存
* manifest 文件第一行必须是 `CACHE MANIFEST`
* manifest 文件每一行列出一个需要存储的文件，位置都是`相对于 manifest 文件的相对位置`，空行会被忽略
* manifest 文件的注释行以 `#` 开头

```appcache
CACHE MANIFEST
# version 1.0
index.html
index.css
index.js
cat.jpg
```

编写完 manifest 文件后，需要将网页 `<html> 元素的 manifest 属性`指向这个 manifest 文件，浏览器加载这个网页的时候，就会离线存储这个网页及 manifest 文件中指定的资源文件，如果一个 Web 应用需要离线存储多个网页，那么每个网页都应该按照上述操作

```html
<!DOCTYPE html>
<html lang="en" manifest="manifest.appcache">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="renderer" content="webkit" />
  <title>离线应用</title>
  <link rel="stylesheet" href="index.css" />
</head>
<body>

<span>我是小可爱</span>
<img src="cat.jpg" />

<script src="index.js"></script>
</body>
</html>
```

如果需要删除离线存储的 Web 应用，只需要删除 manifest 文件即可

### (2) Cache API

### (2) Service Worker API
