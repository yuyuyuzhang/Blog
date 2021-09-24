# 八、Node 网络系统

## 1. url 模块

### (1) url 模块

url 模块用于`处理和解析网址`，Node 实现了浏览器使用的 `WHATWG 网址标准`的新版 API

![url](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/url.png)

WHATWG 网址标准的`特殊协议方案`有如下 6 种，WHATWG 网址标准认为特殊协议在解析和序列化方面具有特殊性，不能通过 url.protocol 属性将特殊协议更改为非特殊协议，或将非特殊协议更改为特殊协议，6 种特殊协议的默认端口如下

|协议|端口|
|:---|:--|
|http|80|
|https|443|
|ws|80|
|wss|443|
|file||
|ftp|21|

### (2) url.URL 类

```js
定义：import { URL } from 'url'
     const url = new URL(input,[base])
属性：url.href                    //返回/设置完整 URL
     url.origin                  //返回源(协议、主机、端口)
     url.protocol                //返回/设置协议(包含:)
     url.username                //返回/设置用户名
     url.password                //返回/设置密码
     url.host                    //返回/设置主机、端口
     url.hostname                //返回/设置主机
     url.port                    //返回/设置端口
     url.pathname                //返回/设置 URL 路径
     url.search                  //返回/设置查询字符串(从?开始)
     url.searchParams            //返回 URLSearchParams 对象
     url.hash                    //返回/设置片段识别符(从#开始)
方法：静态方法：
     URL.createObjectURL(blob)   //返回一个URL字符串,为上传/下载的文件、流媒体文件生成一个URL字符串,给File对象、Blob对象使用
     URL.revokeObjectURL(id)     //无返回值,释放浏览器内存中由URL.createObjectURL()方法生成的URL实例
     实例方法：
     url.urlToHttpOptions(url)   //返回指定 url 字符串序列化后的 WHATWG 网址对象
     url.format(URL,[options])   //返回指定 WHATWG 网址对象解析后的 url 字符串
     url.fileURLToPath(url)      //返回指定文件路径 url 的特定于平台的 Node 文件绝对路径
     url.pathToFileURL(path)     //返回指定
     url.domainToASCII(domain)   //返回指定域名的 ASCII 序列化
     url.domainToUnicode(domain) //返回指定域名的 Unicode 序列化 
```

#### ① URL 对象属性

```js
import { URL } from 'url'

const url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1')
console.log(url)
// URL {
//   href: 'http://user:passwd@www.example.com:4097/path/a.html?x=111#part1',
//   origin: 'http://www.example.com:4097',
//   protocol: 'http:',
//   username: 'user',
//   password: 'passwd',
//   host: 'www.example.com:4097',
//   hostname: 'www.example.com',
//   port: '4097',
//   pathname: '/path/a.html',
//   search: '?x=111',
//   searchParams: URLSearchParams { 'x' => '111' },
//   hash: '#part1'
// }
```

#### ② URL 对象静态方法

```js
//通过文件流下载文件
request({
  url: LOAD_URL,
  method: 'get',
  responseType: 'blob',
  params: params
}).then(res => {
  const fileName = decodeURI(res.headers.fileName)
  const url = URL.createObjectURL(res.data)
  const link = document.createElement('a')
  document.body.append(link)
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download',fileName)
  link.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(link)
})
```

#### ③ URL 对象实例方法

```js
import { urlToHttpOptions } from 'url'

const url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1')
const urlObj = urlToHttpOptions(url)
console.log(urlObj)
// {
//   protocol: 'http:',
//   hostname: 'www.example.com',
//   hash: '#part1',
//   search: '?x=111',
//   pathname: '/path/a.html',
//   path: '/path/a.html?x=111',
//   href: 'http://user:passwd@www.example.com:4097/path/a.html?x=111#part1',
//   port: 4097,
//   auth: 'user:passwd'
// }
```

### (3) url.URLSearchParams 类

URLSearchParams 类表示 `URL 的查询字符串`，用来构造、解析、处理 URL 的查询字符串

查询字符串就是 `URL 参数`，添加在 URL 末尾的用于向服务器发送信息的字符串（键值对），常用于`显示动态页面结果`，例如购物页面，添加了活动参数，就可以按照大小过滤产品

```js
定义：import { URLSearchParams } from 'url'
     const searchParams = url.searchParams
     const searchParams = new URLSearchParams()
     const searchParams = new URLSearchParams(searchParamsStr)
     const searchParams = new URLSearchParams(searchParamsObj)
     const searchParams = new URLSearchParams(iterable)
方法：searchParams.toString()        //返回searchParams的字符串形式
     操作方法：
     searchParams.has(key)          //返回布尔值,是否包含指定键名的键值对
     searchParams.get(key)          //返回指定键名的第一个键值
     searchParams.getAll(key)       //返回指定键名的所有键值构成的数组
     searchParams.set(key,value)    //无返回值,设置指定键名的键值
     searchParams.append(key,value) //无返回值,追加指定键名的键值(允许重复)
     searchParams.delete(key)       //无返回值,删除指定键名的键值对
     排序方法：
     searchParams.sort()            //无返回值,按照Unicode码点从小到大对键名排序
     遍历方法：
     searchParams.keys()            //返回键名的遍历器
     searchParams.values()          //返回键值的遍历器
     searchParams.entries()         //返回键值对的遍历器
```

实例

```js
let urlSearch = new URLSearchParams({'f2': 2,'f1': 1})

urlSearch.append('f2',3);
console.log(urlSearch.toString());   //"f2=2&f1=1&f2=3"
console.log(urlSearch.get('f3'));    //null
console.log(urlSearch.get('f2'));    //"2"
console.log(urlSearch.getAll('f2')); //Array ["2","3"]

urlSearch.set('f2',4); 
urlSearch.set('f2',5); 
urlSearch.set('f1',1); 
console.log(urlSearch.toString());   //"f2=5&f1=1",重复设置则覆盖

urlSearch.sort();
console.log(urlSearch.toString());   //"f1=1&f2=5",同名键则顺序不变

for(let item of urlSearch.keys()){
  console.log(item); //"f1" "f2"
}
for(let item of urlSearch.values()){
  console.log(item); //"1" "5"
}
for(let item of urlSearch.entries()){
  console.log(item); //Array ["f1","1"] ["f2","5"]
}
```

## 2. dns 模块

### (1) dns 模块

dns 模块用于`域名解析（查找主机名的 IP 地址）`

* **dns.lookup() 方法**：使用`操作系统工具`进行查找，可能不需要执行任何网络通信
* **dns 模块所有其他方法**：使用`域名系统协议`进行查找，始终使用网络连接到实际的域名系统服务器执行域名解析

### (2) dns API

```js
定义：import dns from 'dns'
方法：操作系统工具解析方法：
     dns.lookup(hostname,[options],(err,ip,family)=>{})    //返回将hostname解析后的IP地址
     dns.lookupService(ip,port,(err,hostname,service)=>{}) //返回将ip,port反向解析后的主机名和服务,使用操作系统的底层getnameinfo实现解析
     域名系统协议解析方法：
     dns.getServers()                                      //返回域名解析时使用的域名服务器地址数组
     dns.setServers(servers)                               //无返回值,设置域名解析时使用的域名服务器地址数组
     dns.reverse(ip,(err,hostnames)=>{})                   //返回将ip反向域名解析后的主机名数组
     dns.resolve(hostname,[rrtype],(err,records)=>{})      //返回将hostname解析后的资源记录数组
     dns.resolve4(hostname,[options],(err,ips)=>{})        //返回将hostname解析后的IPv4地址数组(rrtype:A)
     dns.resolve6(hostname,[options],(err,ips)=>{})        //返回将hostname解析后的IPv6地址数组(rrtype:AAAA)
     dns.resolveAny(hostname,(err,records)=>{})            //返回将hostname解析后的任何记录数组(rrtype:ANY)
     dns.resolveCaa(hostname,(err,records)=>{})            //返回将hostname解析后的CA授权记录数组(rrtype:CAA)
     dns.resolveCname(hostname,(err,records)=>{})          //返回将hostname解析后的规范名称记录数组(rrtype:CNAME)
     dns.resolveMx(hostname,(err,records)=>{}b)            //返回将hostname解析后的邮件交换记录数组(rrtype:MX)
     dns.resolveNaptr(hostname,(err,records)=>{})          //返回将hostname解析后的名称授权指针记录数组(rrtype:NAPTR)
     dns.resolveNs(hostname,(err,records)=>{})             //返回将hostname解析后的名称服务器记录数组(rrtype:NS)
     dns.resolvePtr(hostname,(err,records)=>{})            //返回将hostname解析后的指针记录数组(rrtype:PTR)
     dns.resolveSoa(hostname,(err,records)=>{})            //返回将hostname解析后的起始规范记录数组(rrtype:SOA)
     dns.resolveSrv(hostname,(err,records)=>{})            //返回将hostname解析后的服务记录数组(rrtype:SRV)
     dns.resolveTxt(hostname,(err,records)=>{})            //返回将hostname解析后的文本记录数组(rrtype:TXT)


options：
family   //0(默认)：返回IPv4和IPv6地址，4：返回IPv4地址，6：返回IPv6地址
hints    //dns.ADDRCONFIG：返回操作系统配置的非环回地址类型，dns.V4MAPPED：指定了IPv6但未找到IPv6则返回IPv4映射的IPv6，dns.ALL：指定了dns.V4MAPPED则返回解析的IPv6以及IPv4映射的IPv6
all      //false(默认)：返回第一个已解析地址，true：返回所有已解析地址
verbatim //false(默认)：IPv4位于IPv6地址之前，true：按照DNS解析器返回顺序接受IPv4和IPv6地址
```

#### ① 操作系统工具解析方法

```js
import dns, { Resolver } from 'dns'

// IPv4
dns.lookup('archive.org', (err, ip, family) => {
  if(err) throw err

  console.log(`ipv${family} ${ip}`) //'ipv4 31.13.66.6'
})

// IPv6
const options1 = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED
}
dns.lookup('archive.org', options1, (err, ip, family) => {
  if(err) throw err

  console.log(`ipv${family} ${ip}`) //'ipv6 ::ffff:31.13.66.6'
})
```

#### ② 域名系统协议解析方法

```js
import dns from 'dns'

console.log(dns.getServers()) // [ '10.6.8.88', '114.114.114.114', '61.139.2.69' ]

dns.resolve4('archive.org', (err, ips) => {
  if(err) throw err

  console.log("ips:", ips) // ips: [ '31.13.85.34' ]

  ips.forEach(ip => {
    dns.reverse(ip, (err, hostnames) => {
      if(err) throw err

      console.log(`reverse for ${ip}: ${JSON.stringify(hostnames)}`) // 'reverse for 31.13.85.34: ["edge-mqtt-mini-shv-01-gru2.facebook.com"]'
    })
  })
})
```

### (3) dns.Resolver 类

dns.Resolver 类表示`域名解析器`，可用于创建一个新的域名解析器，并且可以使用 dns API 的所有`域名系统协议解析方法`

```js
定义：import { Resolver } from 'dns'
     const resolver = new Resolver([options])
方法：resolver.setLocalAddress([ipv4],[ipv6]) //无返回值,设置当前域名解析器向域名系统服务器发出请求时使用的本地ipv4和ipv6地址,未设置则使用默认值
     resolver.cancel()                       //无返回值,取消当前域名解析器进行的所有未完成的域名系统查询
     dns API 所有域名系统协议解析方法


options：
timeout //查询超时
tries   //解析器放弃尝试联系每个服务器的尝试次数(默认4)
```

## 3. net 模块

net 模块提供`异步网络 API`，用于`创建基于流的 TCP 或 IPC 客户端和服务器`

### (1) IPC（Inter-Process Communication，进程间通信）

### (2) net API

```js
定义：import net from 'net'
方法：net.connect()
     net.createConnection()
     net.createServer()
     net.isIP(input)
     net.isIPv4(input)
     net.isIPv6(input)
```

### (3) net.BlockList 类

```js

```

### (4) net.SocketAddress 类

```js

```

### (5) net.Server 类

```js

```

### (6) net.Socket 类

```js

```

## 4. http、https 模块

为了支持所有可能的 HTTP 应用程序，Node `http、https、http2` 模块是非常底层的，只进行`流处理和消息解析`，将消息解析后头部和正文，但不再解析实际的头部和正文

### (1) http API

```js
定义：import http from 'http'
属性：http.globalAgent                           //返回 Agent 类的全局实例
方法：http.request(options,[cb])                 //返回并创建 ClientRequest 实例
     http.get(options,[cb])                     //返回并创建 ClientRequest 实例,get请求并自动调用req.end()
     http.createServer([options],[reqListener]) //返回并创建 Server 实例


options：
protocol //默认 http:
hostname 
port     //默认 80
path
method   //默认 GET
headers
...
```

### (2) https API

```js
定义：import https from 'https'
属性：https.globalAgent                           //返回 Agent 类的全局实例
方法：https.request(options,[cb])                 //返回并创建 ClientRequest 实例
     https.get(options,[cb])                     //返回并创建 ClientRequest 实例,get请求并自动调用req.end()
     https.createServer([options],[reqListener]) //返回并创建 https.Server 实例


options：
protocol //默认 https:
hostname 
port     //默认 443
path
method   //默认 GET
headers
...
```

### (3) http/https.Agent 类

```js

```

### (4) http/https.ClientRequest 类

http/https.ClientRequest 类表示`客户端请求`

```js
定义：import http from 'http'
     import https from 'https'
     http/https.request(url,[options],[cb])
     http/https.get(url,[options],[cb]) 
属性：req.protocol                                 //返回当前请求协议
     req.host                                     //返回当前请求主机
     req.path                                     //返回当前请求路径
     req.method                                   //返回当前请求方法
     req.maxHeadersCount                          //返回当前请求的限制最大标头计数
     req.socket                                   //返回当前请求的底层套接字
     req.reusedSocket                             //返回当前请求是否通过重用的套接字发送
     req.writableEnded                            //返回当前请求是否完成发送,即已调用req.end()
     req.writableFinished                         //返回当前请求是否数据均已刷新到底层系统
     req.aborted                                  //返回当前请求是否中止
     req.destroyed                                //返回当前请求是否销毁
方法：标头方法：
     req.setHeader(name,value)                    //无返回值,为当前请求设置指定标头
     req.removeHeader(name)                       //无返回值,删除当前请求的指定标头
     req.getHeader(name)                          //返回当前请求的指定标头
     req.getRawHeaderNames()                      //返回当前请求的原始标头数组
     操作方法：
     req.write(chunk,[enc],[cb])                  //返回当前请求整个正文数据是否均被成功刷新到内核缓冲,发送一块请求正文chunk
     req.end([data],[enc],[cb])                   //返回并完成发送当前请求,可选参数data存在则相当于先调用req.write()
     req.destroy([err])                           //返回并销毁当前请求
     req.flushHeaders()                           //无返回值,刷新当前请求头,Node由于效率通常会缓冲请求头直到调用req.end()或写入第一块请求数据,然后将请求头和数据打包到单个TCP数据包从而节省TCP往返
     方法：
     req.setNoDelay([noDelay])                    //无返回值,
     req.setSocketKeepAlive([enable],[initDelay]) //无返回值,
     req.setTimeout(timeout,[cb])                 //返回当前请求,


事件：
abort       //客户端中止当前请求时触发
timeout     //当前请求的底层套接字因不活动而超时时触发
response    //客户端接收到针对当前请求的响应时触发
connect     //服务器使用 CONNECT 方法响应当前请求时触发
continue    //服务器针对当前请求返回 100 Continue 响应时触发
information //服务器针对当前请求返回 1xx 响应时触发(不包括 101 升级)
upgrade     //服务器针对当前升级协议请求返回响应时触发
```

#### 发送 GET 请求

```js
import https from 'https'

const options = {
  protocol: 'https:',
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'GET'
}
const req = https.request(options,res => {
  console.log("res:",res)

  res.on('data',d => {
    process.stdout.write(d)
  })
})
req.on('error',err => {
  console.log("err:",err)
})
req.end()
```

#### 发送 POST 请求

```js
const data = JSON.stringify({ todo: '做点事情' })
const options = {
  protocol: 'https:',
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}
const req = https.request(options,res => {
  console.log("res:",res)

  res.on('data',d => {
    process.stdout.write(d)
  })
})
req.on('error',err => {
  console.log("err:",err)
})
req.end(data)
```

### (5) http/https.Server 类

http/https.Server 类表示服务器

```js
定义：import http from 'http'
     import https from 'https'
     http/https.createServer([options],[reqListener])
属性：server.headersTimeout           //
     server.listening                //
     server.maxHeadersCount          //
     server.requestTimeout           //
     server.timeout                  //
     server.keepAliveTimeout         //
方法：server.setTimeout([msecs],[cb]) //
     server.listen()                 //
     server.close([cb])              //


事件：
checkContinue    //
checkExpectation //
clientError      //
close            //
connect          //
connection       //
request          //
upgrade          //
```

### (6) http/https.ServerResponse 类

```js

```

### (7) http/https.IncomingMessage 类

```js

```

## 5. http2 模块

## 6. tls 模块

## 7. dgram 模块

①②③④⑤⑥⑦⑧⑨⑩
