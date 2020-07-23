# 三、AJAX

[[_TOC_]]

## 1. AJAX

### (1) AJAX 发展历史

Ajax 的诞生改变了一切，从 Web 1.0 时代到了 Web 2.0 时代，从纯内容展示的静态页面到了富交互、前端数据处理的动态页面

① 1999 年，微软公司发布 IE 浏览器 5.0 版，允许 JS 脚本向服务器发出 HTTP 请求，

② 2005 年，AJAX ( Asynchronous JavaScript and XML ) 正式提出，指的是通过 JS 的异步通信，从服务器获取数据，更新当前网页的对应部分，而无需刷新整个网页

③ 2006 年，W3C 发布了 AJAX 的国际标准，AJAX 成为 JS 脚本发起 HTTP 通信的代名词

### (2) AJAX 步骤

① 创建 XMLHttpRequest 实例

② 发出 HTTP 请求

③ 接收服务器传回的数据

④ 更新网页对应部分

### (3) XMLHttpRequest 对象

XMLHttpRequest 对象是 AJAX 的主要接口，尽管名字中含有 XML、HTTP，但实际上可以发送任何格式的数据

```javascript
定义：const xhr = new XMLHttpRequest()
```

## 2. XMLHttpRequest 属性

```javascript
请求状态：
xhr.readyState      //返回一个整数,表示xhr的当前状态
xhr.responseType    //返回/设置从服务器接收数据的类型
xhr.timeout         //返回/设置多少毫秒后请求仍未得到结果就自动终止(0则没有时间限制)
xhr.withCredentials //返回/设置跨域请求时,用户信息是否包含在请求中(默认false)
回应状态：
xhr.status          //返回服务器回应的HTTP状态码
xhr.statusText      //返回服务器回应的状态提示信息
xhr.responseURL     //返回实际返回数据的服务器网址(会剥离片段识别符)
xhr.response        //返回服务器回应的数据体
xhr.upload          //返回一个对象,得知文件上传的进展
```

### (1) xhr.readyState

xhr.readyState 属性状态每次变化都会在 xhr 实例上触发 `readystatechange 事件`

* 0：实例 xhr 已生成，但 xhr.open() 方法未调用
* 1：xhr.open() 方法已调用，可以使用 xhr.setRequestHeader() 方法设置 HTTP 请求的头信息
* 2：xhr.send() 方法已调用，服务器返回的头信息和状态码已收到
* 3：正在接收服务器传来的数据体 ( HTTP 回应的 body 部分 )
* 4：本次接收完成/失败

### (2) xhr.responseType

设置 xhr.responseType 属性可以告知服务器浏览器希望返回的数据类型，设置这个属性需要在调用 `xhr.open() 方法之前，xhr.send() 方法之后`

* text
* json
* document
* arraybuffer
* blob

### (3) xhr.timeout

xhr.timeout 属性返回/设置多少毫秒后请求仍未得到结果，就自动终止请求，终止请求时，会在 xhr 实例上触发 timeout 事件

```javascript
const xhr = new XMLHttpRequest()

//事件监听必须在调用xhr.send()方法发送请求之前
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

### (4) xhr.withCredientials

用于 CORS 发送跨域的 AJAX 时，设置是否在请求中包含用户信息 ( Cookie )，默认 false

### (5) xhr.status & xhr.statusText

当 301、302、303 的状态码返回时，几乎所有的浏览器都会删除请求报文的主体，将 POST 改成 GET，自动再次发送请求

当 307 的状态码返回时，浏览器不会像 303 一样将 POST 改成 GET，而是按照之前的请求方法，自动再次发送请求

* **200 OK**
  
  请求被服务器正常处理，返回正确的响应报文

* **204 No Content**
  
  请求被服务器正常处理，但返回的响应报文不包含实体

* **206 Partial Content**
  
  服务器成功执行了客户端发来的范围请求，返回的响应报文中包含指定范围的实体内容

* **301 Moved Permanently**
  
  表示`永久性重定向` (URI 不会再次改变)，请求的资源已经被永久分配了新的 URI，希望客户端按照响应报文的 `Location` 字段提示的 URI 重新请求

* **302 Moved temporarily**
  
  表示`临时性重定向` (URI 将来还有可能改变)，请求的资源已经被临时被分配了新的 URI，希望客户端按照响应报文的 `Location` 字段提示的 URI 重新请求

* **303 See Other**
  
  表示`临时性重定向` (URI 将来还有可能改变)，请求的资源已经被临时被分配了新的 URI，希望客户端按照响应报文的 `Location` 字段提示的 URI 重新请求，并且必须采用 `GET` 方法

* **307 Temporary Redirect**
  
  表示`临时性重定向` (URI 将来还有可能改变)，请求的资源已经被临时被分配了新的 URI，希望客户端按照响应报文的 `Location` 字段提示的 URI 重新请求

* **304 Not Modified**
  
  表示客户端发送`附带条件`的请求时，服务器允许访问资源但未满足条件的情况，因此返回的响应报文不包含实体

* **400 Bad Request**
  
  表示请求报文中存在语法错误，需要修改请求报文后再次发送

* **401 Unauthorized**
  
  表示请求报文需要包含通过 `HTTP 认证`的认证信息，若之前已经进行过一次请求，则表示用户认证失败

* **403 Forbidden**
  
  表示服务器拒绝访问资源的请求，访问权限出现某些问题、未获得访问授权等都有可能导致这种情况

* **404 Not Found**
  
  表示服务器无法找到访问的资源

* **500 Internal Server Error**
  
  表示服务器在执行请求时发生了错误，可能是 Web 应用存在 bug 或者是某些临时故障

* **503 Service Unavailable**
  
  表示服务器暂时处于超负荷状态，或者服务器正在停机维护，现在无法处理请求，如果事先得知解决以上情况需要的时间，可以写入响应报文的 `RetryAfter` 字段后返回给客户端

### (6) xhr.responseURL

xhr.responseURL 返回的服务器网址与 xhr.open() 方法指定的请求网址不一定相同，若服务器发生跳转，该属性返回`实际返回数据的服务器网址`，并且该属性会`剥离片段识别符`

```javascript

```

### (7) xhr.upload

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

ProcessEvent 对象表示`进度事件`，继承了 Event 对象

```javascript
e.lengthComputable //返回布尔值,表示加载的量是否可计算,默认false
e.loaded           //返回整数,表示已经加载的量,默认0
e.total            //返回整数,表示需要加载的总量,默认0
```

```javascript

```

## 3. XMLHttpRequest 方法

```javascript
xhr.open(method,url,async)      //无返回值,指定HTTP请求xhr的参数
xhr.getResponseHeader(key)      //返回HTTP请求xhr的头信息的指定字段值
xhr.getAllResponseHeaders()     //返回HTTP请求xhr的头信息的所有字段值,字段间使用CRLF分隔(回车\r+换行\n)
xhr.setRequestHeader(key,value) //无返回值,设置HTTP请求xhr的头信息
xhr.overrideMimeType(MIME)      //无返回值,指定服务器返回数据的MIME类型,覆盖服务器返回数据的真正MIME类型(不推荐使用)
xhr.send(data)                  //无返回值,发出HTTP请求xhr
xhr.abort()                     //无返回值,终止已发出的HTTP请求xhr
```

### (1) xhr.open()

已经调用过 xhr.open() 方法的 HTTP 请求，再次调用该方法，将会`终止`请求

#### ① GET

GET 请求的参数作为查询字符串附加在 URL 的后面，xhr.send() 方法中的 data 只能为 `null`

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

POST 请求的参数使用 xhr.send(data) 方法发送给服务器，xhr.send(data) 方法可以发送以下 5 种类型的数据给服务器

* text
* json
* document
* arraybuffer
* blob

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

### (2) xhr.getResponseHeader(key)

xhr.getResponseHeader(key) 方法通常只能拿到 HTTP 响应报文的 6 个基本字段

如果是跨域 CORS 请求，那么 xhr.getResponseHeader(key) 方法还能够拿到 HTTP 响应报文中 `Access-Control-Expose-Headers` 字段指定的字段

* Cache-Control：通用首部字段 Cache-Control 用于控制缓存的行为
* Pragma：通用首部字段 Pragma 是 HTTP/1.0 的遗留字段，只用在客户端发送的 HTTP 请求报文中，要求所有的代理服务器不返回缓存，为了兼容所有的 HTTP 协议版本，通常的 HTTP 请求中会同时包含以下两个字段
  
  ```javascript
  Cache-Control: no-cache
  Pragma: no-cache
  ```

* Content-Type：实体首部字段 Content-Type 用于告知客户端，实体主体的媒体类型
* Content-Language：实体首部字段 Content-Language 用于告知客户端，实体主体采用的自然语言
* Expires：实体首部字段 Expires 用于告知客户端，资源过期的日期时间
* Last-Modified：实体首部字段 Last-Modified 用于告知客户端，资源最后修改的日期时间

### (3) xhr.overrideMimeType()

修改服务器返回数据的 MIME 类型，不是正常情况下应用采取的方式，如果希望服务器返回指定 MIME 类型的数据，应该在发送 HTTP 请求前设置 xhr.reaponseType 属性告知服务器，只有在服务器无法返回某种 MIME 类型的数据时，才能使用 xhr.overrideMimeType() 方法强制转换返回数据的 MIME 类型

### (4) xhr.abort()

xhr.abort() 方法调用后，xhr.readyState 属性变为 4，xhr.status 属性变为 0，会在 xhr 实例上触发 readyStateChange 事件

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

xhr.readyState 属性改变时，会在 xhr 上触发 readyStateChange 事件

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

ProcessEvent 对象表示`进度事件`，继承了 Event 对象

```javascript
e.lengthComputable //返回布尔值,表示加载的量是否可计算,默认false
e.loaded           //返回整数,表示已经加载的量,默认0
e.total            //返回整数,表示需要加载的总量,默认0
```
