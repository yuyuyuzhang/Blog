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

## 3. dgram、net 模块

### (1) 套接字

套接字就是网络中不同主机上的应用进程之间进行双向通信的端点的抽象

套接字提供了应用层进程利用网络协议交换数据的机制，套接字上联应用进程，下联网络协议栈，是应用程序通过网络协议进行通信的接口，也是应用程序与网络协议进行交互的接口

#### ① 套接字的组成

套接字 `Socket = IP ：Port`，套接字的表示方法是点分十进制的 IP 地址后面加上端口号，中间用冒号隔开

#### ② 套接字的类型

进程间通信按进程分布情况可以分为以下 2 种

* 单机内的进程间通信
* 多机间远程调用的进程间通信

套接字分为以下 4 种类型

* **Unix 域套接字**：仅适用于单机内的进程间通信
* **网络套接字**：既适用于单机内的进程间通信，也适用于多机间远程调用的进程间通信
  * **TCP 套接字（SOCK_STREAM）**：仅适用于 `TCP` 协议，只能读取 TCP 协议的数据，提供面向连接、可靠的数据传输服务
  * **DUP 套接字（SOCK_DGRAM）**：仅适用于 `UDP` 协议，只能读取 UDP 协议的数据，提供无连接、不可靠的数据传输服务
  * **原始套接字（SOCK_RAW）**：适用于`其他`协议，可以读取内核未处理的 IP 数据包

单机内的进程间通信更推荐使用 Unix 域套接字，因为 Unix 域套接字仅仅进行数据复制，不会执行网络协议栈中的添加、删除报文头、计算校验和、计算报文顺序等复杂操作，通信开销更小

#### ③ 套接字的连接过程

要通过互联网进行通信，至少需要一对套接字，客户端套接字 Client Socket，服务端套接字 Server Socket

* **服务器监听**：服务端套接字处于等待连接状态，实时监控网络状态，并不定位具体的客户端套接字
* **客户端请求**：客户端套接字描述要连接的服务端套接字的 IP 地址和端口号，然后向服务端套接字发出连接请求
* **连接确认**：服务端套接字监听到客户端套接字的连接请求，响应请求并建立一个新的线程将自身的描述发送给客户端套接字，客户端套接字确认此描述则建立连接，服务端套接字继续处于监听状态，等待其他客户端套接字的连接请求

#### ④ 套接字的数据传输过程

套接字之间传输的数据被称为`流`，既可以通过 buffer 对象在流中传输二进制数据，也可以通过 Unicode 编码传输字符串，2 种类型的数据最终均会被包装为`数据报`传输，套接字可以通过发送一个特殊的完成数据报 `FIN` 表明本次传输已完成

通过互联网进行通信时，客户端应用程序将要传输的数据写入自身主机的客户端套接字，客户端套接字通过与网卡 NIC 相连的传输介质将数据发送到服务端套接字，使服务端应用程序能够接收到这段数据

### (2) net 模块

net 模块提供了对 `IPC、TCP 套接字`的支持，用于创建`IPC、TCP 客户端和服务器`

```js
定义：import net from 'net'
方法：IP 方法：
     net.isIP(input)                                     //返回 input 是否为 IP
     net.isIPv4(input)                                   //返回 input 是否为 IPv4
     net.isIPv6(input)                                   //返回 input 是否为 IPv6
     套接字方法：
     net.createConnection(path,[connectListener])        //返回并创建 IPC 客户端套接字,创建后立即使用socket.connect()发起连接请求,建立连接后触发connect事件,connectListener参数将作为connect事件的监听器
     net.createConnection(port,[host],[connectListener]) //返回并创建 TCP 客户端套接字
     net.createServer([options],[connectionListener])    //返回并创建 IPC、TCP 服务端,connectionListener参数将作为connection事件的监听器
```

### (3) net.Socket 类

net.Socket 类表示`套接字`，常用于创建 `IPC、TCP 客户端套接字`，或作为 net.Server 类的 connection 事件监听器的参数，即 `IPC、TCP 服务端套接字`

```js
定义：import net from 'net'
     const ipcSocket = net.createConnection(path,[connectListener])        //返回 IPC 客户端套接字
     const tcpSocket = net.createConnection(port,[host],[connectListener]) //返回 TCP 客户端套接字
     const socket = new net.Socket([options1])                             //返回自定义套接字
属性：基本属性：
     socket.localAddress                           //返回当前套接字的本地IP地址
     socket.localPort                              //返回当前套接字的本地端口
     socket.remoteFamily                           //返回当前套接字远程连接的套接字IP地址类型
     socket.remoteAddress                          //返回当前套接字远程连接的套接字IP地址
     socket.remotePort                             //返回当前套接字远程连接的套接字端口
     连接属性：
     socket.pending                                //返回当前套接字是否正在等待请求连接,socket.connect()尚未调用
     socket.connecting                             //返回当前套接字是否正在发起连接请求,socket.connect()已被调用但尚未完成
     socket.readyState                             //返回当前套接字的连接状态(opening:正在连接,open:可读可写,readOnly:只读,writeOnly:只写)
     socket.destroyed                              //返回当前套接字是否已关闭连接,无法再传输数据
     socket.timeout                                //返回当前套接字的连接超时时间(毫秒)
     传输属性：
     socket.bytesWritten                           //返回当前套接字发送的字节数
     socket.bytesRead                              //返回当前套接字接收的字节数
方法：基本方法：
     socket.address()                              //返回当前套接字的地址{family,address,port}
     socket.ref()                                  //返回当前套接字,将当前套接字加入Node事件循环
     socket.unref()                                //返回当前套接字,将当前套接字移出Node事件循环
     socket.setEncoding([encoding])                //返回当前套接字,设置当前套接字编码
     socket.setNoDelay([noDelay])                  //返回当前套接字,设置当前套接字的Nagle算法
     socket.setTimeout(timeout,[timeoutListener])  //返回当前套接字,设置当前套接字的连接超时时间
     socket.setKeepAlive([enable],[initialDelay])  //返回当前套接字,设置当前套接字的长连接功能
     连接方法：
     socket.connect(options2,[connectListener])    //返回当前套接字,当前套接字向要连接的远程套接字发起连接请求,仅用于当前套接字连接关闭后重新发起连接
     socket.connect(path,[connectListener])        //返回当前套接字,当前套接字向要连接的远程套接字发起 IPC 连接请求
     socket.connect(port,[host],[connectListener]) //返回当前套接字,当前套接字向要连接的远程套接字发起 TCP 连接请求
     传输数据方法：
     socket.pause()                                //返回当前套接字,当前套接字暂停读取数据,用于限制上传
     socket.resume()                               //返回当前套接字,当前套接字继续读取数据
     socket.write(data,[encoding],[cb])            //返回当前套接字是否整个数据都已刷新到内核缓存区,当前套接字发送数据 data 给远程连接的套接字,可选参数cb在数据最终写完后执行,可能不会立即执行
     socket.end([data],[encoding],[cb])            //返回当前套接字,半关闭当前套接字连接,可选参数data存在则相当于再调用一次socket.write(),可选参数cb在数据最终写完后执行,可能不会立即执行
     socket.destroy([error])                       //返回当前套接字,关闭当前套接字连接   


options1：
fd            //指定文件描述符可用于封装现有的套接字,不指定则创建新的套接字
readable      //指定传入 fd 时,是否允许在当前套接字上读取
writable      //指定传入 fd 时,是否允许在当前套接字上写入
allowHalfOpen //指定当前套接字可读端结束时,是否不自动结束可写端
signal        //指定可用于销毁当前套接字的中止信号

options2：
onread       //指定传入数据存储的buffer及数据到达当前套接字时执行的回调函数callback
IPC 连接：
path         //指定当前套接字应该连接的远程套接字路径
TCP 连接：
lookup       //指定当前套接字的自定义域名查找函数(默认dns.lookup())
hints        //指定当前套接字的 lookup 函数提示
family       //指定当前套接字的本地 IP 地址类型(4,6,0-默认)
localAddress //指定当前套接字的本地 IP 地址
localPort    //指定当前套接字的本地端口
host         //指定当前套接字要连接的远程套接字主机(默认localhost)
port         //指定当前套接字要连接的远程套接字端口


事件：
lookup  //当前套接字解析主机名之后建立连接之前触发,不适用于 Unix 套接字
connect //当前套接字成功与要连接的远程套接字建立连接时触发
ready   //当前套接字准备好使用时触发,connect事件后立即触发
data    //当前套接字接收到数据时触发(事件监听器参数为 buffer/string)
drain   //当前套接字写缓冲区变空时触发,可用于限制上传
end     //当前套接字连接的远程套接字表示传输结束时触发,从而结束当前套接字的可读端
close   //当前套接字完全关闭时触发(事件监听器参数 hadError 表示当前套接字是否有传输错误)
error   //当前套接字发生错误时触发(事件监听器参数为 Error 对象)
timeout //当前套接字因不活动而超时时触发,用户必须手动调用socket.end()/destroy()关闭连接
```

### (4) net.Server 类

net.Server 类表示`服务器`，常用于创建 `IPC、TCP 服务器`

```js
定义：import net from 'net'
     const server = net.createServer([options],[connectionListener])
     const server = new net.Server([options],[connectionListener])
属性：server.listening                                           //返回当前服务器是否正在监听连接
     server.maxConnections                                      //返回当前服务器允许的最大连接数
方法：基本方法：
     server.address()                                           //返回当前服务器的地址{family,address,port}
     server.ref()                                               //返回当前服务器,将当前服务器加入Node事件循环
     server.unref()                                             //返回当前服务器,将当前服务器加入Node事件循环
     监听方法：
     server.listen(path,[backlog],[listeningListener])          //无返回值,当前服务器启动 IPC 连接监听
     server.listen([port],[host],[backlog],[listeningListener]) //无返回值,当前服务器启动 TCP 连接监听
     server.getConnections((err,count)=>{})                     //返回当前服务器,异步获取当前服务器上的并发连接数
     server.close([closeListener])                              //返回并关闭当前服务器


options：
allowHalfOpen  //指定当前服务器可读端结束时,是否不自动结束可写端
pauseOnConnect //指定是否应该在连接上暂停当前服务器


事件：
listening  //当前服务器启动监听后触发
connection //当前服务器建立新连接时触发(事件监听器参数为当前服务器的服务端套接字,net.Socket实例)
close      //当前服务器关闭时触发
error      //当前服务器发生错误时触发(事件监听器参数为 Error 对象)
```

### (5) TCP 客户端/服务器实例

```js
import net from 'net'

// Server
const server = net.createServer(server_socket => {
    server_socket.on('data', data => {
        console.log("服务端：接收到客户端" + "(" + server_socket.remoteAddress + ":" + server_socket.remotePort + ")" + "请求 " + data)
        server_socket.write('world') // 向客户端发送响应
    })
}).listen(8124, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})

// Client
const client_socket = net.createConnection(8124, () => {
    console.log('客户端：已建立连接')
    client_socket.write('hello') // 向服务器发送请求
})
client_socket.on('data', data => {
    console.log("客户端：接收到服务端" + "(" + client_socket.remoteAddress + ":" + client_socket.remotePort + ")" + "响应 " + data)
    client_socket.destroy() // 关闭客户端连接
})
client_socket.on('close', () => {
    console.log("客户端：已关闭客户端套接字")
})
```

![TCP_Socket]()

### (6) dgram 模块

dgram 模块提供了对 UDP 套接字的支持

dgram.Socket 类表示 `UDP 套接字`，用于创建 `UDP 客户端和服务器`

```js
定义：import dgram from 'dgram'
     const udpSocket = dgram.createSocket(type,[messageListener])
     const udpSocket = dgram.createSocket(options1,[messageListener])
方法：基本方法：
     udpSocket.address()                                  //返回当前套接字的地址{family,address,port}
     udpSocket.remoteAddress()                            //返回当前套接字远程连接的套接字地址{family,address,port}
     udpSocket.ref()                                      //返回当前套接字,将当前套接字加入Node事件循环
     udpSocket.unref()                                    //返回当前套接字,将当前套接字移出Node事件循环
     缓冲区方法：
     udpSocket.setSendBufferSize(size)                    //无返回值,设置当前套接字发送缓冲区大小
     udpSocket.setRecvBufferSize(size)                    //无返回值,设置当前套接字接收缓冲区大小
     udpSocket.getSendBufferSize()                        //返回当前套接字发送缓冲区字节大小
     udpSocket.getRecvBufferSize()                        //返回当前套接字接收缓冲区字节大小
     连接方法：
     udpSocket.bind([port],[address],[listeningListener]) //返回当前套接字,当前套接字绑定端口和地址并在其上侦听数据报消息,未绑定端口操作系统将绑定随机端口,未绑定地址操作系统将尝试侦听所有地址
     udpSocket.bind(options2,[listeningListener])         //返回当前套接字,当前套接字绑定端口和主机并在其上侦听数据报消息
     udpSocket.connect(port,[address],[connectListener])  //无返回值,当前套接字向要连接的远程套接字发起 UDP 连接请求,可选参数address为空,默认使用127.0.0.1(udp4)、::1(udp6)
     数据传输方法：
     udpSocket.send(msg,[offset,len],[cb])                //无返回值,当前套接字将msg从偏移offset处开始的len字节发送到远程连接的套接字,可选参数offset、len仅当msg为缓冲区、TypedArray、DataView时才支持,可选参数cb在数据最终写完后执行,可能不会立即执行
     udpSocket.disconnect()                               //无返回值,当前套接字断开连接
     udpSocket.close([closeListener])                     //返回并关闭当前套接字
  

options1：
type           //指定 UDP 协议类型
ipv6Only       //指定当前套接字仅适用于 IPv6 地址
sendBufferSize //指定当前套接字的发送缓冲区大小
recvBufferSize //指定当前套接字的接收缓冲区大小
lookup         //指定当前套接字的自定义域名查找函数(默认dns.lookup())
signal         //指定可用于销毁当前套接字的中止信号

options2：
fd        //指定文件描述符可用于封装现有的套接字,不指定则创建新的套接字
port      //指定当前套接字绑定的端口
address   //指定当前套接字绑定的主机
exclusive //指定当前套接字是否不允许共享端口连接(默认false)


事件：
listening //当前套接字正在监听时触发
connect   //当前套接字与远程套接字成功建立连接后触发
message   //当前套接字接收到可用的数据报时触发(事件监听器参数为 msg、remoteAddress)
close     //当前套接字关闭时触发
error     //当前套接字发生错误时触发(事件监听器参数为 Error 对象)
```

### (7) UDP 客户端/服务器实例

```js
import dgram from 'dgram'

// Server
const server = dgram.createSocket('udp4')
  .bind(41234, 'localhost')
server.on('listening', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
server.on('message', (msg, remoteAddress) => {
    console.log("服务端：接收到客户端" + "(" + remoteAddress.address + ":" + remoteAddress.port + ")" + "请求 " + msg)
    server.send('world', remoteAddress.port, remoteAddress.address) // 向客户端发送响应
})

// Client
const client = dgram.createSocket('udp4')
client.connect(41234, 'localhost', () => {
    console.log("客户端：已建立连接")
    client.send('hello') // 向服务端发送请求
    client.on('message', (msg, remoteAddress) => {
        console.log("客户端：接收到服务端" + "(" + remoteAddress.address + ":" + remoteAddress.port + ")" + "响应 " + msg)
        if(msg.toString() == 'world'){
            client.close()
        }
    })
    client.on('close', () => {
        console.log("客户端：已关闭客户端套接字")
    })
})
```

![UDP_Socket]()

## 4. http 模块

为了支持所有可能的 HTTP 应用程序，Node http 模块是非常底层的，只进行`流处理和消息解析`，将消息解析后头部和正文，但不再解析实际的头部和正文

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

### (3) http.Agent 类

```js

```

### (4) http.ClientRequest 类

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

### (5) http.Server 类

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

### (6) http.ServerResponse 类

```js

```

### (7) http.IncomingMessage 类

```js

```

## 5. tls、https 模块

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

https.Agent

https.Server

## 6. http2 模块

①②③④⑤⑥⑦⑧⑨⑩
