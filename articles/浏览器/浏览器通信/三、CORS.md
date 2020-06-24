# 三、CORS

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

* Accept
* Accept-language
* Content-Language
* Last-Event-ID
* Content-Type：仅限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

### (2) 简单请求的跨域流程

### (3) 简单请求的Cookie

## 3. 非简单请求

①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯
