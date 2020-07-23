# 四、CORS

[[_TOC_]]

## 1. CORS

① 跨域资源共享 CORS (Cross-origin resource sharing) 是一个 W3C 标准，允许浏览器向跨域的服务器发送 AJAX 请求，解决了 AJAX 只能同源使用的限制

② CORS 需要浏览器和服务器同时支持，目前所有浏览器都支持 CORS，因此只要服务器实现了 CORS 接口，就可以实现跨域通信

③ 整个 CORS 通信过程，都是浏览器自动完成的，对于开发者来说，代码和普通的 AJAX 通信没有差别，浏览器一旦发现 AJAX 请求跨域，就会在 HTTP 请求报文中自动添加一些附加的首部字段，有时还会多出一次附加的请求，但是用户不会有任何感知

## 2. 简单请求

### (1) 简单请求的条件

简单请求就是简单的 HTTP 请求方法和简单的 HTTP 报文首部的结合，同时满足这两个条件，就属于简单请求，否则就属于非简单请求

#### ① 请求方法为以下三个方法之一

* HEAD
* GET
* POST

#### ② 请求报文首部字段不超出以下字段

* **Accept**
  
  请求首部字段 Accept 用于通知服务器，客户端用户代理支持的媒体类型及优先级

* **Accept-language**
  
  请求首部字段 Accept-language 用于通知服务器，客户端用户代理支持的自然语言及优先级

* **Content-Type**
  
  实体首部字段 Content-Type 用于告知客户端，实体主体的媒体类型，简单请求中 Content-Type 字段仅限于以下三个值
  * **text/plain**：纯文本格式
  * **application/x-www-form-urlencoded**：form 表单数据被编码为 key/value 格式
  * **multipart/form-data**：HTTP 请求时发送多种类型的实体，例如上传表单或文件

* **Content-Language**
  
  实体首部字段 Content-Language 用于告知客户端，实体主体采用的自然语言

* **Last-Event-ID**
  
  其他首部字段 Last-Event-ID 用于浏览器帮助服务器重建 SSE 连接

### (2) 简单请求

#### ① 简单请求

浏览器检测到跨域 AJAX 请求是简单请求，就直接在 HTTP 请求报文中添加一个 `Origin` 首部字段来说明本次请求来自哪个源 (协议、域名、端口)

```javascript
//简单请求的请求报文首部

POST /cors HTTP/1.1 //简单CORS请求
Origin              //当前请求的源
```

#### ② 简单请求的响应

如果服务器允许简单请求，就会返回一个包含 CORS 相关首部字段的 HTTP 响应报文
  
```javascript
//简单请求的响应报文首部

Access-Control-Allow-Origin      //服务器允许跨域请求的源
Access-Control-Allow-Credentials //服务器是否允许简单请求发送Cookie
Access-Control-Expose-Headers    //服务器允许xhr.getResponseHeader()方法除6个基本字段外可以拿到的其他字段
```

如果服务器不允许简单请求，就会返回一个不包含 CORS 相关首部字段的 HTTP 响应报文，浏览器就会抛出一个错误，被 `XMLHttpRequest 实例的 error 事件回调函数捕获`，这种错误无法通过 HTTP 响应报文的状态码识别，状态码很可能是 200 OK

## 3. 非简单请求

### (1) 非简单请求的条件

非简单请求是那种对服务器提出特殊要求的请求，不满足简单请求条件的就是非简单请求

### (2) 预检请求

#### ① 预检请求

预检请求就是浏览器发现跨域 AJAX 请求是非简单请求时，自动在正式通信前增加的一次 OPTIONS 方法的 HTTP 查询请求

浏览器通过预检请求询问服务器，当前网页所在的源 (协议、域名、端口) 是否在服务器的许可名单之内，以及正式通信时可以使用哪些 HTTP 请求方法和首部字段

```javascript
//预检请求的请求报文首部

OPTIONS /cors HTTP/1.1         //预检请求使用OOTIONS方法
Origin                         //当前请求的源
Access-Control-Request-Method  //非简单请求会用到的请求方法
Access-Control-Request-Headers //非简单请求会额外发送的首部字段
```

#### ② 预检请求的响应

如果服务器允许非简单请求，就会返回一个包含 CORS 相关首部字段的 HTTP 响应报文
  
```javascript
//预检请求的响应报文首部

HTTP/1.1 200 OK
Access-Control-Max-Age           //指定本次预检请求的有效期
Access-Control-Allow-Origin      //服务器允许跨域请求的源
Access-Control-Allow-Credentials //服务器是否允许非简单请求发送Cookie
Access-Control-Allow-Methods     //服务器允许非简单请求使用的所有请求方法
Access-Control-Allow-Headers     //服务器允许非简单请求额外发送的所有首部字段
```

如果服务器不允许非简单请求，就会返回一个不包含 CORS 相关首部字段的 HTTP 响应报文，或者响应中明确表示非简单请求不符合条件，浏览器就会抛出一个错误，被 `XMLHttpRequest 实例的 error 事件回调函数捕获`，这种错误无法通过 HTTP 响应报文的状态码识别，状态码很可能是 200 OK

### (3) 非简单请求

服务器针对预检请求返回肯定的答复后，浏览器就会正式发送非简单请求，此时非简单请求的方式和简单请求一样

```javascript
//非简单请求的请求报文首部

POST /cors HTTP/1.1 //简单CORS请求
Origin              //当前请求的源
```

```javascript
//非简单请求的响应报文首部

Access-Control-Allow-Origin      //服务器允许跨域请求的源
Access-Control-Allow-Credentials //服务器是否允许非简单请求发送Cookie
Access-Control-Expose-Headers    //服务器允许xhr.getResponseHeader()方法除6个基本字段外可以拿到的其他字段
```

## 4. Cookie

跨域 CORS 请求默认不发送 Cookie，想要浏览器发送 Cookie，必须同时满足以下 2 个设置

① CORS 请求设置 `xhr.withCredientials=true`

② 服务器针对 CORS 请求的响应报文设置 `Access-Control-Expose-Headers=true`
