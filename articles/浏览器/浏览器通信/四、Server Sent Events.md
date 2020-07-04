# 四、Server-Sent Event

[[_TOC_]]

## 1. SSE

### (1) SSE 的诞生

**由来**：HTTP1.1 协议实现的是一种从客户端到服务器的单向通信机制，服务器在没有接收到请求的情况下无法主动返回响应，因此为了探知服务器上是否有内容更新，就必须频繁地从客户端到服务器进行确认，如果服务器上没有内容更新，就会产生徒劳的通信

① SSE (Server-Sent Event) 并非新协议，而是基于 HTTP1.1 协议，以`事件流`的形式，实现由服务器向浏览器推送数据的`单向通信机制`的一种技术

② SSE 仍然使用 HTTP1.1 协议，因此 SSE 连接的发起方仍然是客户端，一旦客户端和服务器建立起 SSE 连接，只能够服务器向客户端推送数据，客户端无法向服务器发送数据

### (2) SSE 的特点

① SSE 使用 `HTTP 协议`，现有的服务器软件都支持

② SSE 默认支持断线重连

③ SSE 一般只用来传送文本，二进制数据需要编码后传送

④ SSE 支持自定义事件

⑤ SSE 支持服务器推送功能

### (3) SSE 的应用

SSE 适用于需要实时显示服务器数据的场合

① 股票软件中实时显示股票的在线数据

② 新闻网站中实时显示最近刚刚发生的重大新闻

③ 在线聊天软件中实时显示当前聊天室的用户名和人数

## 2. 客户端实现

### (1) EventSource 对象  

SSE 的客户端 API 部署在 `window.EventSource(url,config)`

```javascript
定义：const sse = new EventSource(url,config) //返回EventSource实例,浏览器与服务器建立SSE连接
属性：sse.readyState  //返回SSE连接的当前状态
方法：sse.close()     //无返回值,关闭SSE连接

config：
withCredentials //指定是否开启xhr.withCredentials属性
```

#### source.readyState 属性

* **0**：连接还未建立，断线正在重连
* **1**：连接已经建立，可以接收数据
* **2**：连接已经关闭，不会重连

### (2) EventSource 事件

默认情况下服务器推送数据时在 EventSource 实例上触发 message 事件，但是开发者还可以`自定义事件`，这种情况下就不会触发 message 事件，而是触发自定义事件

```javascript
source.onopen    //SSE连接建立时触发
source.onmessage //SSE连接建立后,服务器推送数据时触发
source.onerror   //SSE连接出错时触发
```

事件对象继承了 Event 对象

```javascript
e.origin      //服务器的源 (协议、域名、端口)
e.lastEventId //浏览器推送的事件流的事件ID
e.data        //浏览器推送的事件流的数据内容
```

### (3) 实例

```html
<button id="connectBtn">建立连接</button>
<button id="disconnectBtn">断开连接</button>

显示接收数据：
<p id="msg"></p>
```

```javascript
let sse

const msg = document.getElementById('msg')
const connectBtn = document.getElementById('connectBtn')
const disconnectBtn = document.getElementById('disconnectBtn')

connectBtn.addEventListener('click', connect)
disconnectBtn.addEventListener('click', disconnect)

function connect (e){
  sse = new EventSource(url, { withCredentials:false })

  sse.addEventListener('open', function(e){
    console.log('连接建立')
  })
  sse.addEventListener('error', function(e){
    console.log('连接出错')
  })

  //服务器推送数据
  sse.addEventListener('message', function(e){
    const data = e.data
    msg.innerHTML = data
  })

  //自定义事件
  sse.addEventListener('f', function(e){
    const data = e.data
    msg.innerHTML = data
  })
}

function disconnect (e){
  sse.close()
  msg.innerHTML = '连接关闭'
}
```

## 3. 服务器实现

### (1) HTTP 响应报文

服务器向浏览器推送 SSE 数据的 HTTP 响应报文必须具有以下首部字段

```javascript
Content-Type: text/event-stream //事件流
Cache-Control: no-cache         //客户端不缓存,确保实时显示服务器推送的数据
Connection: keep-alive          //持久连接
```

### (2) SSE 数据格式

服务器使用`事件流`向浏览器推送数据，事件流之间以 `\n\n` 分隔，事件流由若干`行`组成，行之间以 `\n` 分割，行有 5 种类型

```javascript
//默认message事件流

data: unnamedEventInfo\n\n
```

```javascript
//自定义事件流

event: fEvent\n
id: msg1\n
data: fEventInfo\n\n
```

```javascript
//注释事件流

: this is an comment\n\n
```

#### ① event

event 字段表示服务器推送的一次事件流的事件名，若没有 event 字段则表示默认 message 事件

```javascript
event: customEvent\n
```

#### ② id

id 字段表示服务器推送的一次事件流的事件 ID

一旦 SSE 连接断线，浏览器就会发送一个 HTTP 请求，包含其他首部字段 `Last-Event-ID`，字段值就是断线时服务器推送的事件流的事件 ID，从而帮助服务器重建 SSE 连接，服务器检查该事件 ID 是否是上次推送的事件 ID，不一致则表示客户端存在与服务器建立连接失败的情况，本次连接需要同时推送前几次的已经推送过的数据

```javascript
id: msg1\n
```

#### ③ data

data 字段表示服务器推送的一次事件流的数据内容，一次事件流可包含多个 data 字段行

```javascript
data: someThing\n
```

```javascript
data: {\n
data: "name": "张三",\n
data: "age", 20\n
data: }\n
```

#### ④ retry

retry 字段表示服务器指定的，浏览器帮助服务器重建 SSE 连接的时间间隔，若没有 retry 字段则浏览器自行决定间隔多久重建 SSE 连接

两种情况会导致 SSE 连接出错，进而导致浏览器通过 HTTP 报文的其他首部字段 `Last-Event-ID` 帮助服务器重建 SSE 连接，一是 retry 字段指定的时间间隔到期，因此浏览器根据 retry 字段每隔一段时间就自动与服务器重建一次连接，二是网络错误

```javascript
retry: 1000\n
```

#### ⑤ 注释

注释以`冒号`开头，通常服务器每隔一段时间就会向浏览器推送一个注释，保持连接不中断

```javascript
: This is a comment
```

### (3) Node 服务器实例

SSE 要求服务器与浏览器保持连接，这对于不同的服务器软件来说，消耗的资源是不一样的，Node 是所有连接都使用同一个线程，因此消耗的资源会小很多，但这要求每个连接不能包含很耗时的操作，比如磁盘的 IO 读写

```javascript
const http = require("http");

http.createServer(function(req, res){
  const fileName = "." + req.url;

  if(fileName === "./stream"){
    res.writeHead(200, {
      "Content-Type":"text/event-stream",
      "Cache-Control":"no-cache",
      "Connection":"keep-alive",
      "Access-Control-Allow-Origin": '*',
    });
    res.write("retry: 10000\n");
    res.write("event: connecttime\n");
    res.write("data: " + (new Date()) + "\n\n");
    res.write("data: " + (new Date()) + "\n\n");

    interval = setInterval(function(){
      res.write("data: " + (new Date()) + "\n\n");
    }, 1000);

    req.connection.addListener("close", function(){
      clearInterval(interval);
    }, false);
  }
}).listen(8844, "127.0.0.1");
```
