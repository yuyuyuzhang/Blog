# 六、WebSocket

[[_TOC_]]

## 1. WebSocket

### (1) WebSocket 的诞生

**由来**：HTTP1.1 协议实现的是一种从客户端到服务器的单向通信机制，服务器在没有接收到请求的情况下无法主动返回响应，因此为了探知服务器上是否有内容更新，就必须频繁地从客户端到服务器进行确认，如果服务器上没有内容更新，就会产生徒劳的通信

① WebSocket 协议是不同于 HTTP1.1 协议的一种新协议，WebSocket 协议实现的是一种客户端和服务器的`双向通信机制`

② WebSocket 协议建立在 HTTP1.1 协议的基础上，WebSocket 协议必须依赖 HTTP1.1 协议进行一次 `WebSocket 连接握手`，握手成功后，数据直接从 TCP 连接上传输，与 HTTP1.1 协议无关

② WebSocket 协议建立在 HTTP1.1 协议的基础上，因此连接的发起方仍然是客户端，一旦客户端和服务器建立起 WebSocket 协议的通信连接，无论是客户端还是服务器，任何一方都可以直接向对方发送数据

### (2) WebSocket 的特点

#### ① 发送二进制数据

WebSocket 协议可以发送字符串文本、二进制数组 ArrayBuffer、二进制对象 Blob

#### ② 没有同源限制

WebSocket 协议不受同源限制，客户端可以与任意服务器通信

#### ③ 减少通信量

WebSocket 连接是持久连接，只要建立起 WebSocket 连接，就一直保持连接状态，除非主动断开连接

#### ④ 服务器推送功能

服务器有内容更新时，主动向客户端推送数据，而无需等待客户端的请求

### (3) WebSocket 的应用

WebSocket 适用于多个客户端与同一个服务器需要实现实时通信的场合

① 聊天室

② 多人在线游戏网站

③ 实时体育或新闻评论网站

④ 实时交互用户信息的社交网站

## 2. WebSocket 原理

WebSocket 协议建立在 HTTP1.1 协议的基础上，WebSocket 协议必须依赖 HTTP1.1 协议进行一次 `WebSocket 连接握手`，握手成功后，数据直接从 TCP 连接上传输，与 HTTP1.1 协议无关

### (1) HTTP 请求报文

```javascript
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket //升级为WebSocket协议
Connection: Upgrade //控制逐跳首部字段Upgrade
Origin: http://example.com //CORS跨域
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13 //
```

### (2) HTTP 响应报文

```javascript
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

## 2. 客户端实现

### (1) WebSocket 对象

WebSocket 的客户端 API 部署在 `window.WebSocket(url)`，url 字符串必须以 `ws 或 wss ( 加密通信 )` 开头

```javascript
定义：const ws = new WebSocket(url) //返回WebSocket实例,浏览器与服务器建立WebSocket连接
属性：ws.readyState     //返回WebSocket连接的当前状态
     ws.binaryType     //设置服务器推送的二进制数据类型
     ws.bufferedAmount //返回还有多少二进制数据没有发送到服务器
方法：ws.send(data)     //无返回值,向服务器发送数据
     ws.close()        //无返回值,关闭WebSocket连接
```

#### ① ws.readyState 属性

* **0**：连接还未建立
* **1**：连接已经建立，可以通信
* **2**：连接正在关闭
* **3**：连接已经关闭

### (2) WebSocket 事件

```javascript
ws.onopen    //WebSocket连接建立时触发
ws.onmessage //WebSocket连接建立后,服务器推送数据时触发
ws.onerror   //WebSocket连接出错时触发
ws.onclose   //WebSocket连接关闭时触发
```

事件对象继承了 Event 对象

```javascript
e.data //服务器推送的数据
```

### (3) 实例

```html
<button id="connectBtn">建立连接</button>
<button id="sendBtn">发送数据</button>
<button id="disconnectBtn">断开连接</button>

发送数据：<input type="text" id="txt" >
```

```javascript
let ws

const connectBtn = document.getElementById('connectBtn')
const sendBtn = document.getElementById('sendBtn')
const disconnectBtn = document.getElementById('disconnectBtn')

connectBtn.addEventListener('click', connect)
sendBtn.addEventListener('click', send)
disconnectBtn.addEventListener('click', disconnect)

function connect (e){
  ws = new WebSocket(url)
  ws.binaryType = 'arraybuffer' //指定服务器推送数据类型为二进制数组

  ws.addEventListener('open', function(e){
    console.log('连接建立')
  })
  ws.addEventListener('error', function(e){
    console.log('连接出错', e.error)
  })
  ws.addEventListener('close', function(e){
    console.log('连接关闭', e.error)
  })

  //服务器推送数据
  ws.addEventListener('message', function(e){
    const data = e.data
  })
}

function send (e){
  const value = document.getElementById('txt').value
  if(value !== ''){
    ws.send(value)
  }
}

function disconnect (e){
  ws.close()
}
```

## 3. 服务器实现

Node 服务器实例

```JAVASCRIPT
const WebSocketServer = require('ws').Server

const wss = new WebSocketServer({ port: 8181 })
wss.on('connection', function(ws){
  console.log('client connected');
  ws.on('message', function(message){
    console.log(message);
  });
});
```

## 4. HTTP & SSE & WebSocket 比较

![HTTP&SSE&WebSocket比较](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E9%80%9A%E4%BF%A1/HTTP%26SSE%26WebSocket%E6%AF%94%E8%BE%83.png)
