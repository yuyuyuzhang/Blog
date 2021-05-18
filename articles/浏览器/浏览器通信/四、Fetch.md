# 四、Fetch

## 1. Fetch

### (1) Fetch

浏览器原生提供 Fetch 对象，Fetch 是 XMLHttpRequest 的升级版，用于在 JS 脚本中发出 HTTP 请求

### (2) Fetch 与 XMLHttpRequest 差异

* Fetch 采用模块化设计，`API 分散在 Headers、Request、Response` 三个对象上，设计更加合理，XMLHttpRequest 的输入、输出、状态都在同一个接口管理，容易写出混乱的代码
* Fetch 通过`数据流 Stream 对象`处理数据，可以分块读取，有利于提高网站性能，减少内存占用，XMLHTTPRequest 不支持数据流，所有数据必须存放在缓存中，等待全部拿到后一次性读取
* Fetch 使用 `Promise`，不使用回调函数，写法更简洁

## 2. Headers 对象

```javascript
定义：const headers = new Headers()
     const headers = response.headers
属性：headers.
方法：headers.has(key)          //返回布尔值,是否存在指定键值对
     headers.get(key)          //返回指定键值的键值
     headers.set(key,value)    //无返回值,设置指定键名的键值
     headers.append(key,value) //无返回值,添加指定键值对
     headers.delete(key)       //无返回值,删除指定键值对
     遍历器方法：
     headers.keys()            //返回键名的遍历器对象,可使用for-of循环遍历
     headers.values()          //返回键值的遍历器对象,可使用for-of循环遍历
     headers.entries()         //返回键值对的遍历器对象,可使用for-of循环遍历
     headers.forEach()         //无返回值,对headers每项运行f=function(value,key)
```

### (1) 创建 Headers 实例

```javascript
//方法一
const headers = new Headers({
  "Content-Type": "text/plain",
  "X-Custom-Header": "ProcessThisImmediately",
})

//方法二
const headers = new Headers()
headers.append("Content-Type", "text/plain");
headers.append("X-Custom-Header", "ProcessThisImmediately");
```

### (2) Fetch 请求的 Headers

```javascript
fetch(url, {
  method: 'POST',
  header: {
    "Content-Type": "text/plain;charset=UTF-8"
  },
  mode: 'cors'
})
  .then(response => {})
  .catch(err => {})
```

### (3) Fetch 响应的 Headers

```javascript
async function fetchApi(){
  const response = await fetch('https://dummyimage.com/300.png')
  const headers = response.headers

  console.log(headers.get('Content-Type')) //'image/png'

  for(let item of headers.entries()){
    console.log(item) //Array ["cache-control", "public, max-age=7776000"]  ["content-length", "839"]  ...
  }

  headers.forEach((value, key) => console.log(value + ': ' + key)) //'public, max-age=7776000: cache-control'  '839: content-length'  ...
}
fetchApi()
```

## 3. Request 对象

Fetch 接收以下 2 个参数，返回一个 Promise 实例

* **第一个参数 url**：URL 字符串
* **第二个参数 options**：配置对象，用于定制 HTTP 请求

Fetch 请求配置对象 options API 就是 Request 对象的 API

```javascript
{
  method,         //指定 HTTP 请求方法，默认 GET
  headers,        //指定 HTTP 请求头
  body,           //指定 POST 请求的数据体
  referrer,       //指定 HTTP 请求的 referrer 头
  referrerPolicy, //指定 referrer 头的规则
  mode,           //指定请求模式
  credentials,    //指定是否发送 Cookie
  cache,          //指定如何处理缓存
  redirect,       //指定 HTTP 跳转的处理方式
  signal,         //指定一个 AbortSignal 实例，用于取消 Fetch 请求
  keepalive,      //指定页面卸载时，浏览器是否在后台保持连接，继续发送数据
  integrity,      //指定一个哈希值，用于检查 HTTP 响应传回的数据是否等于这个哈希值
}
```

```javascript
fetch(url, options)
  .then(response => {})
  .catch(err => {})
```

### (1) Fetch POST 请求提交不同类型数据体

POST 请求提交不同类型数据时，需要设置 HTTP 请求头的 Content-Type 字段，为要发送数据的 MIME 类型，常见的 MIME 类型如下

* **image/gif**：gif 图片格式
* **image/jpeg**：jpg 图片格式
* **image/png**：png 图片格式
* **text/plain**：纯文本格式
* **application/json**：JSON 格式
* **application/pdf**：pdf 格式
* **application/octet-stream**：二进制流数据
* **application/x-www-form-urlencoded**：form 表单数据被编码为 key/value 格式
* **multipart/form-data**：HTTP 请求时发送多种类型的实体，例如上传表单或文件
* **multipart/byteranges**：HTTP 响应时返回多个范围的实体

#### ① 提交 JSON 数据

```javascript
const user = {name: '张三', age: 20}

fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
})
```

#### ② 提交二进制数据

```javascript
const buf = new ArrayBuffer(100)
const blob = new Blob([buf])

fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  },
  body: blob
})
```

#### ③ 提交表单

```javascript
const form = document.getElementById('form')

fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new FormData(form)
})
```

#### ④ 文件上传

```javascript
const file = document.getElementById('inputFile').files[0]
const formData = new FormData()
formData.append('file', file)
formData.append('userName', '张三')

fetch('/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  body: formData
})
```

### (2) referrerPolicy

* **origin**：Referer 头只包含域名，不包含完整路径
* **origin-when-cross-origin**：同源请求 Referer 头包含完整路径，跨域请求只包含域名
* **no-referrer**：不发送 Referer 头
* **unsafe-url**：总发送 Referer 头
* **no-referrer-when-downgrade（默认）**：总发送 Referer 头，除非从 HTTPS 页面请求资源
* **strict-origin**：Referer 头只包含域名，总发送 Referer 头，除非从 HTTPS 页面请求资源
* **strict-origin-when-cross-origin**：同源请求时 Referer 头包含完整路径，跨域请求时只包含域名，总发送 Referer 头，除非从 HTTPS 页面请求资源
* **same-origin**：跨域请求不发送 Referer，同源请求发送

### (3) mode

* **same-origin**：同源请求
* **cors（默认）**：跨域请求
* **no-cors**：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求

### (4) credentials

* **same-origin（默认）**：同源请求时发送 Cookie，跨域请求时不发送
* **include**：不管同源请求，还是跨域请求，一律发送 Cookie
* **omit**：一律不发送

### (5) cache

* **only-if-cached**：只检查缓存，如果缓存里面不存在，将返回 504 错误
* **force-cache**：缓存优先，只有不存在缓存的情况下，才请求远程服务器
* **no-cache**：将本地缓存和服务器资源进行比较，有新的版本才使用服务器资源，否则使用缓存
* **default（默认）**：先在缓存里面寻找匹配的请求
* **reload**：直接请求远程服务器，并且更新缓存
* **no-store**：直接请求远程服务器，并且不更新缓存

### (6) redirect

* **follow（默认）**：fetch 跟随 HTTP 跳转
* **manual**：fetch 不跟随 HTTP 跳转，但是 response.url 属性会指向新的 URL，response.redirected 属性会变为true，由开发者自己决定后续如何处理跳转
* **error**：如果发生跳转，fetch 就报错

### (7) signal（取消 Fetch 请求）

Fetch 请求发送后，想要中途取消，需要使用 AbortController 对象

首先新建 AbortController 实例，然后发送 Fetch 请求，配置对象的 signal 属性必须指定接收 AbortController 实例发送的信号 controller.signal，controller.abort() 方法用于发出取消信号

```javascript
const controller = new AbortController()
setTimeout(() => controller.abort(), 1000)

fetch('/user', {signal: controller.signal})
  .then(res => {})
  .catch(err => {
    if(err.name === 'AbortError'){
      console.log('fetch abort')
    } else{
      console.log('another error')
    }
  })
```

## 4. Response 对象

Fetch 请求成功后，得到一个 Response 对象，对应服务器的 HTTP 响应

```javascript
定义：const response = await fetch(url)
属性：response.ok            //返回布尔值,请求是否成功
     response.redirected    //返回布尔值,请求是否发生过跳转
     response.url           //返回请求的URL,如果发生跳转返回最终URL
     response.type          //返回请求类型
     response.status        //返回服务器响应的HTTP状态码
     response.statusText    //返回服务器响应的状态提示信息
     response.headers       //返回Headers对象
     response.body          //返回ReadableStream实例
方法：response.text()        //返回Promise实例,以文本字符串读取响应内容
     response.json()        //返回Promise实例,以JSON对象读取响应内容
     response.arrayBuffer() //返回Promise实例,以ArrayBuffer对象读取响应内容
     response.blob()        //返回Promise实例,以Blob对象读取响应内容
     response.formData()    //返回Promise实例,以FormData对象读取响应内容
     response.clone()       //返回response副本,供多次读取


response.type：
basic           //同源请求
cors            //跨域请求
error           //网络错误
opaque          //请求的type设置为no-cors
opaqueredicrect //请求的redirect设置为manual
```

### (1) 判断 Fetch 请求是否成功

Fetch 请求只有在`网络错误`时，Fetch 才会报错，其他情况都认为请求成功，即使服务器响应的状态码为 `4xx、5xx`，Fetch 也不会报错，返回的 Promise 实例不会变成 Rejected 状态

* 方法一：通过判断 response.ok 属性是否为 `true`

```javascript
fetch('/user', {signal: controller.signal})
  .then(res => {
    if(res.ok){
      console.log('fetch success')
    } else{
      throw new Error(res.statusText);
    }
  })
  .catch(err => {})
```

* 方法二：通过 response.status 属性得到 HTTP 响应的真实状态码是否等于 `2xx`，无需考虑 URL 跳转 3xx，因为 Fetch 会将 URL 跳转的状态码自动转换成 200

```javascript
fetch('/user', {signal: controller.signal})
  .then(res => {
    if (res.status >= 200 && res.status < 300) {
      console.log('fetch success')
    } else {
      throw new Error(res.statusText);
    }
  })
  .catch(err => {})
```

### (2) 多次读取 Fetch 响应内容

Response 对象是一个`数据流 Stream 对象`，因此只能读取一次，读取完成后就没了，因此 5 种读取方法种只能使用 1 个，否则会报错

response.clone() 方法返回 Response 对象的副本，可以实现多次读取

```javascript
fetch('https://dummyimage.com/300.png')
  .then(async res => {
    const res1 = res.clone()
    const res2 = res.clone()
    const res3 = res.clone()

    const text = await res1.text()
    const buf = await res2.arrayBuffer()
    const blob = await res3.blob()
    console.log(text)
    console.log(buf)
    console.log(blob)
  })
  .catch(err => {})
```

![多次读取响应内容](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E9%80%9A%E4%BF%A1/%E5%A4%9A%E6%AC%A1%E8%AF%BB%E5%8F%96%E5%93%8D%E5%BA%94%E5%86%85%E5%AE%B9.png)
