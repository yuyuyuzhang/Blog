# 二、AJAX

[[_TOC_]]

## 1. AJAX

### (1) AJAX 发展历史

Ajax 的诞生改变了一切，从 Web 1.0 时代到了 Web 2.0 时代，从纯内容展示的静态页面到了富交互、前端数据处理的动态页面

① 1999 年，微软公司发布 IE 浏览器 5.0 版，允许 JS 脚本向服务器发出 HTTP 请求，

② 2005 年，AJAX ( Asynchronous JavaScript and XML ) 正式提出，指的是通过 JS 的异步通信，从服务器获取数据，更新当前网页的对应部分，而不用刷新整个网页

③ 2006 年，W3C 发布了 AJAX 的国际标准，AJAX 成为 JS 脚本发起 HTTP 通信的代名词

### (2) AJAX 步骤

① 创建 XMLHttpRequest 请求

② 发出 HTTP 请求

③ 接收服务器传回的数据

**④** 更新网页对应部分

### (3) XMLHttpRequest 对象

XMLHttpRequest 对象是 AJAX 的主要接口，尽管名字中含有 XML、HTTP，但实际上可以使用多种协议 \( file、ftp \)，发送任何格式的数据

```javascript
定义：const xhr = new XMLHttpRequest()
```

## 2. XMLHttpRequest 属性

```javascript
请求状态：
xhr.readyState      //返回一个整数,表示xhr的当前状态
xhr.responseType    //返回/设置从服务器接收数据的类型(默认text)
xhr.timeout         //返回/设置多少毫秒后请求仍未得到结果就自动终止(0则没有时间限制)
xhr.withCredentials //返回/设置跨域请求时,用户信息是否包含在请求中(默认false)
回应状态：
xhr.status          //返回服务器回应的HTTP状态码
xhr.statusText      //返回服务器回应的状态提示信息
回应数据：
xhr.response        //返回从服务器接收到的数据体(HTTP回应的body部分)
xhr.responseText    //返回从服务器接收到的字符串
xhr.responseXML     //返回从服务器接收到的XML、HTML文档对象
xhr.responseURL     //返回实际返回数据的服务器网址
文件上传：
xhr.upload          //返回一个对象,得知文件上传的进展
```

### (1) 请求状态属性

#### ① xhr.readyState

* 0：实例 xhr 已生成，但 xhr.open() 方法未调用
* 1：xhr.open() 方法已调用，可以使用 xhr.setRequestHeader() 方法设置 HTTP 请求的头信息
* 2：xhr.send() 方法已调用，服务器返回的头信息和状态码已收到
* 3：正在接收服务器传来的数据体 ( HTTP 回应的 body 部分 )
* 4：本次接收完成/失败

#### ② xhr.responseType

* text：返回字符串
* json：返回 JSON 字符串，浏览器自动对返回数据调用 JSON.parse() 方法
* document：返回文档对象 Document 对象
* arraybuffer：返回二进制数组 ArrayBuffer 对象
* blob：返回二进制对象 Blob 对象

#### ③ xhr.timeout

xhr.timeout 属性返回/设置多少毫秒后请求仍未得到结果，就自动终止请求，终止请求时，会在 xhr 上触发 timeout 事件

```javascript
const xhr = new XMLHttpRequest()

//事件监听必须在调用xhr.send()发送请求之前
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(xhr.response)
  } else{
    console.error(xhr.statusText)
  }
}
xhr.ontimeout = function(){
  console.log('the request is timeout')
}

//请求设置
xhr.open('POST', 'http://example.com', true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.timeout = 5000 //5秒超时
const data = { name: '张三', age: 20 }
xhr.send(JSON.stringify(data))
```

#### ④ xhr.withCredientials

* 同源请求：无需设置这个属性，AJAX 只能发送同源请求
* 跨域请求：如果需要发送用户信息 ( Cookie、认证的 HTTP 头信息 )，需要设置属性值为 true，为了让该属性生效，服务器必须显示返回头信息 Access-Control-Allow-Credientials 为 true

### (4) 回应状态属性

#### ① xhr.status

* 200：OK，访问正常
* 301：Moved Permanently，永久移动
* 302：Moved temporarily，暂时移动
* 304：Not Modified，未修改
* 307：Temporary Redirect，暂时重定向
* 401：Unauthorized，未授权
* 403：Forbidden，禁止访问
* 404：Not Found，未发现指定网址
* 500：Internal Server Error，服务器发生错误

#### ②  xhr.statusText

调用 xhr.open() 方法前，该属性值为空字符串，若服务器未返回状态提示，默认 OK

### (5) 回应数据属性

#### xhr.responseURL

xhr.responseURL 返回的服务器网址与 xhr.open() 方法指定的请求网址不一定相同，若服务器发生跳转，该属性返回`实际返回数据的服务器网址`，并且该属性会`剥离锚点`，

```javascript

```

### (6) 文件上传属性

#### xhr.upload

XMLHttpRequest 请求可以发送文件，文件发送以后，通过 xhr.upload 属性得到一个对象，监听这个对象的进度事件可以得知 AJAX 文件上传的进度

```javascript
进度事件(加载)：
loadstart //资源开始加载时触发
progress  //资源加载过程中重复触发
load      //资源加载完成时触发
error     //资源加载错误时触发,不冒泡
timeout   //资源加载超时时触发
about     //资源中止加载时触发,如用户取消加载
loadend   //资源停止加载时触发,无论成功或失败
```

实例

```javascript

```

## 3. XMLHttpRequest 方法

```javascript
xhr.open(method,url,async)      //无返回值,指定HTTP请求xhr的参数
xhr.setRequestHeader(key,value) //无返回值,设置HTTP请求xhr的头信息
xhr.getResponseHeader(key)      //返回HTTP请求xhr的头信息的指定字段值
xhr.getAllResponseHeaders()     //返回HTTP请求xhr的头信息的所有字段值,字段间使用CRLF分隔(回车\r+换行\n)
xhr.overrideMimeType(MIME)      //无返回值,指定服务器返回数据的MIME类型,覆盖服务器返回数据的真正MIME类型
xhr.send(data)                  //无返回值,发出HTTP请求xhr
xhr.abort()                     //无返回值,终止已发出的HTTP请求xhr
```

### (1) xhr.open()

已经调用过 xhr.open() 方法的 HTTP 请求，再次调用该方法，将会`终止`请求

#### ① GET

get 请求的参数作为查询字符串附加在 URL 的后面，xhr.send() 方法中的 data 只能为 null

```javascript
const xhr = new XMLHttpRequest()

//事件监听必须在调用xhr.send()发送请求之前
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(xhr.response)
  } else{
    console.error(xhr.statusText)
  }
}

//请求设置
const params = '?name=张三&age=20'
xhr.open('GET', 'http://example.com' + params, true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.send(null)
```

#### ② POST

post 请求的参数位于 body 中，使用 xhr.send \( \) 方法发送参数

```javascript
const xhr = new XMLHttpRequest()

//事件监听必须在调用xhr.send()发送请求之前
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(xhr.response)
  } else{
    console.error(xhr.statusText)
  }
}

//请求设置
xhr.open('POST', 'http://example.com', true)
xhr.setRequestHeader('Content-Type', 'application/json')
const data = { name: '张三', age: 20 }
xhr.send(JSON.stringify(data))
```

### (2) xhr.overrideMimeType()

修改服务器返回数据的 MIME 类型，不是正常情况下应用采取的方法，如果希望服务器返回指定 MIME 类型的数据，应该在发送 HTTP 请求前设置 xhr.reaponseType 属性告诉服务器，只有在服务器无法返回某种 MIME 类型的数据时，才能使用 xhr.overrideMimeType \( \) 方法强制转换返回数据的 MIME 类型

例如服务器返回的 MIME 类型是 text/xml，由于种种原因浏览器解析不成功报错，这时就拿不到数据，可以通过 xhr.overrideMimeType \( \) 方法将 MIME 类型改成 `text/plain`，这样浏览器就不会自动解析，从而可以拿到原始文本    

```javascript
const xhr = new XMLHttpRequest()

//事件监听必须在调用xhr.send()发送请求之前
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(xhr.response)
  } else{
    console.error(xhr.statusText)
  }
}

//请求设置
xhr.open('POST', 'http://example.com', true)
xhr.setRequestHeader('Content-Type', 'application/json')
xhr.responseType = 'document';
xhr.overrideMimeType('text/xml');
const data = { name: '张三', age: 20 }
xhr.send(JSON.stringify(data))
```

### (3) xhr.abort()

xhr.abort() 方法调用后，xhr.readyState 属性变为 4，xhr.status 属性变为 0，会在 xhr 上触发 readyStateChange 事件

```javascript
const xhr = new XMLHttpRequest()

//事件监听必须在调用xhr.send()发送请求之前
xhr.onreadystatechange = function(){
  if(xhr.readyState === 4 && xhr.status === 200){
    console.log(xhr.response)
  } else{
    console.error(xhr.statusText)
  }
}

//请求设置
xhr.open('POST', 'http://example.com', true)
xhr.setRequestHeader('Content-Type', 'application/json')
const data = { name: '张三', age: 20 }
xhr.send(JSON.stringify(data))

//设置5秒后终止请求
setTimeout(() => xhr.abort(), 5000);
```

## 4. XMLHttpRequest 事件

### (1) readyStateChange 事件

xhr\.readyState 属性改变时，会在 xhr 上触发 readyStateChange 事件

### (2) 进度事件

xhr 请求的进度改变时，会在 xhr 上触发进度事件

```javascript
进度事件(加载)：
loadstart //资源开始加载时触发
progress  //资源加载过程中重复触发
load      //资源加载完成时触发
error     //资源加载错误时触发,不冒泡
timeout   //资源加载超时时触发
about     //资源中止加载时触发,如用户取消加载
loadend   //资源停止加载时触发,无论成功或失败
```

dd
