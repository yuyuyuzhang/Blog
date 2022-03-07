# 九、Node 网络系统

## 1. 127.0.0.1 与 localhost

### (1) 网卡 NIC

数据链路层的以太网协议规定接入互联网的设备都必须具备`网卡`，并为每个网卡分配全世界唯一的 `MAC 地址（网卡地址）`，网卡用于计算机`连接局域网`，我们可以通过 MAC 地址唯一识别互联网中的设备，为网络层提供`链路级别传输`的支持

实际上 IP 地址并非根据主机或者路由器来配置的，而是根据`网卡`配置的，一块网卡可以配置多个 IP 地址，因此一台主机可以有多个 IP 地址

* **物理网卡**：安装在电脑主板上的有线或无线网卡，都有不同且唯一的网卡 MAC 地址
  * **有线网卡（ethernet）**：使用`网线`连接互联网
  * **无线网卡（wlan）**：接收`无线信号`连接互联网
  * **本机 IP**：本机 IP 通常是指同一局域网内，`可被外部设备访问`到的绑定在本机`物理网卡`上的 IP 地址
* **虚拟网卡（loopback）**：通过软件模拟网络环境构建的虚拟网络适配器，用于本机各个应用程序之间的网络交互，也可以使用 `VPN` 技术实现虚拟网卡间的局域网通信
  * **回环地址（Loop back address）**：正常的数据包会从 IP 层进入链路层然后发送到网络上，而发送给回环地址 `127.*` 的数据包会直接被发送主机的 IP 层截获，直接就没有后面链路层的事了
  * **127.0.0.1**：127.0.0.1 通常作为惯例被分配给本机`虚拟网卡`，由于 127.0.0.1 是回环地址，因此`不能被外部设备访问`，如果服务端套接字绑定在 127.0.0.1，客户端程序就只能在本机访问

### (2) localhost

localhost 是`本机域名`，位于以下目录的 hosts 文件，操作系统初始化本机的 TCP/IP 协议栈时，一般会按照惯例将虚拟网卡的 IP 地址 127.0.0.1 作为 locaolhost 的指向，当然这是可以修改的，localhost 可以被配置成`任意 IP`

一般 ping 127.0.0.1 可以作为测试本机 TCP/IP 协议栈正常与否的判断之一

![localhost]()

### (3) 虚拟专用网络（Virtual Private Network，VPN）

VPN 是一种`利用公用网络架设专用网络的远程访问技术`，例如外地员工访问企业内网资源，利用 VPN 的解决方法就是在内网架设一台 VPN 服务器，外地员工连接上当地互联网后，通过互联网连接 VPN 服务器，再通过 VPN 服务器进入企业内网，为了保证数据安全，客户机和 VPN 服务器之间的通讯数据都进行了加密处理，有了数据加密，就可以认为数据是在一条专用的数据链路上进行安全传输，如同架设了一个专用网络一样，但实际上 VPN 使用的是互联网上的公用网络，因此 VPN 被称为虚拟专用网络，实质上就是利用加密技术在公网上封装出一个专用的数据通信隧道

常用的有以下 4 种

* **VPN 服务器**：在内网的网络中心搭建 VPN 服务器
* **硬件 VPN**：使用专用的硬件实现 VPN
* **软件 VPN**：使用专用的软件实现 VPN
* **集成 VPN**：某些硬件设备如路由器、防火墙等都含有 VPN 功能

## 2. url 模块

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

## 3. dns 模块

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

## 4. net 模块

### (1) 进程间通信 IPC（Inter Process Communication）

进程间通信就是`不同进程间进行数据交换的过程`，每个进程拥有独立的地址空间和数据处理逻辑，操作系统保证了进程独立运行的地址空间，但对于复杂系统单进程往往不能胜任业务需求，需要多进程协同完成工作，这就需要进程间通信了

进程间通信的多种方式如下：

* **管道**：管道只能在具有`公共祖先`的两个进程间使用
* **命名管道**：命名管道是管道的升级，支持具有`不同祖先`进程的两个进程间使用
* **消息队列**：Linux 系统内核支持的消息的链接表，由消息队列标识符在内核进程标识，内核提供专用 API 进行队列操作
* **信号量**：信号量主要作为计数器控制资源的安全访问
* **共享存储**：操作系统在内存中划分出专用区域提供资源共享，操作系统内核提供 API 进行共享内存的操作
* **网络通信**：TCP、UDP、HTTP、HTTPS、HTTP2 等网络通信方式

进程间通信按照`进程分布情况`可以分为以下 2 种

* **单机内的进程间通信**：管道、命名管道、消息队列、信号量、共享内存、网络通信
* **多机间远程调用的进程间通信**：网络通信

由以上可知，`网络通信`既适用于单机内的进程间通信，也适用于多机间远程调用的进程间通信

### (2) 网络通信 - 套接字

套接字就是`网络中不同主机的应用层进程间进行双向通信的端点的抽象`，套接字提供了`应用层进程`利用`网络协议`交换数据的机制，套接字上联应用进程，下联网络协议栈，是应用程序通过网络协议进行通信的接口，也是应用程序与网络协议进行交互的接口

#### ① 套接字的组成

套接字的组成为 `Socket = IP ：Port`，表示方法是点分十进制的 IP 地址后加端口号，中间用冒号隔开

#### ② 套接字的类型

套接字分为以下 4 种类型

* **Unix 本地域套接字**：仅适用于单机内的进程间通信
* **网络套接字**：既适用于单机内的进程间通信，也适用于多机间远程调用的进程间通信
  * **TCP 套接字（SOCK_STREAM）**：仅适用于 `TCP` 协议，只能读取 TCP 协议的数据，提供面向连接、可靠的数据传输服务
  * **DUP 套接字（SOCK_DGRAM）**：仅适用于 `UDP` 协议，只能读取 UDP 协议的数据，提供无连接、不可靠的数据传输服务
  * **原始套接字（SOCK_RAW）**：适用于`其他`协议，可以读取内核未处理的 IP 数据包

网络套接字虽然也适用于单机内的进程间通信，但是同一机器上的两个进程还要用到 IP 地址（127.0.0.1） + 端口通信有点大材小用，而且需要经过网络协议栈的处理效率不高（打包拆包、计算校验和、维护序列和应答等），因此诞生了 `Unix 本地域套接字，是从网络套接字的框架上发展出来的一种进程间通信方式，其 API 和网络套接字的 API 一样，但是无需经过网络协议栈，只是将应用层数据从一个进程拷贝至另一个进程`

#### ③ 套接字的连接过程

要通过互联网进行通信，至少需要一对套接字，客户端套接字 Client Socket，服务端套接字 Server Socket

* **服务器监听**：服务端套接字处于等待连接状态，实时监控网络状态，并不定位具体的客户端套接字
* **客户端请求**：客户端套接字描述要连接的服务端套接字的 IP 地址和端口号，然后向服务端套接字发出连接请求
* **连接确认**：服务端套接字监听到客户端套接字的连接请求，响应请求并建立一个新的线程将自身的描述发送给客户端套接字，客户端套接字确认此描述则建立连接，服务端套接字继续处于监听状态，等待其他客户端套接字的连接请求

#### ④ 套接字的数据传输过程

套接字之间传输的数据被称为`流`，既可以通过 buffer 对象在流中传输二进制数据，也可以通过 Unicode 编码传输字符串，2 种类型的数据最终都会被包装为`数据报`传输，套接字可以通过发送一个特殊的完成数据报 `FIN` 表明本次传输已完成

通过互联网进行通信时，客户端应用程序将要传输的数据写入自身主机的客户端套接字，客户端套接字通过与网卡 NIC 相连的传输介质将数据发送到服务端套接字，使服务端应用程序能够接收到这段数据

### (3) net API

net 模块提供了对 `Unix、TCP 套接字`的支持，用于创建`Unix、TCP 客户端和服务器`

```js
定义：import net from 'net'
方法：IP 方法：
     net.isIP(input)                                     //返回 input 是否为 IP
     net.isIPv4(input)                                   //返回 input 是否为 IPv4
     net.isIPv6(input)                                   //返回 input 是否为 IPv6
     服务器方法：
     net.createServer([options],[connectionListener])    //返回并创建 Unix、TCP 服务器,connectionListener参数将作为connection事件的监听器
     客户端方法：
     net.createConnection(path,[connectListener])        //返回并创建 Unix 客户端套接字,创建后立即使用socket.connect()发起连接请求,建立连接后触发connect事件,connectListener参数将作为connect事件的监听器
     net.createConnection(port,[host],[connectListener]) //返回并创建 TCP 客户端套接字
```

### (4) net.Server 类

net.Server 类表示`服务器`，继承自 EventEmitter 类，常用于创建 `Unix、TCP 服务器`

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
     server.listen(path,[backlog],[listeningListener])          //无返回值,当前服务器启动 Unix 连接监听
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

### (5) net.Socket 类

net.Socket 类表示`套接字`，继承自 stream.Duplex 类，常用于创建 `Unix、TCP 客户端套接字`，或作为 net.Server 类的 connection 事件监听器的参数，即 `Unix、TCP 服务端套接字`

```js
定义：import net from 'net'
     const UnixSocket = net.createConnection(path,[connectListener])        //返回 Unix 客户端套接字
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
     客户端方法：
     socket.connect(options2,[connectListener])    //返回当前套接字,当前套接字向要连接的远程套接字发起连接请求,仅用于连接关闭后重新发起连接
     socket.connect(path,[connectListener])        //返回当前套接字,当前套接字向要连接的远程套接字发起 Unix 连接请求
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
onread       //指定传入数据存储的buffer及数据到达当前套接字时执行的回调函数cb
Unix 连接：
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

### (6) 实例

```js
import net from 'net'

// Server
const server = net.createServer(server_socket => {
    // 当前服务器建立新连接的回调

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
    // 当前套接字与远程套接字成功建立连接的回调

    client_socket.write('hello') // 向服务器发送请求
    client_socket.on('data', data => {
        console.log("客户端：接收到服务端" + "(" + client_socket.remoteAddress + ":" + client_socket.remotePort + ")" + "响应 " + data)
        client_socket.destroy() // 关闭客户端连接
    })
    client_socket.on('close', () => {
        console.log("客户端：已关闭客户端套接字")
    })    
})
```

![tcp_socket]()

## 5. dgram 模块

### (1) dgram API

dgram 模块提供了 UDP 套接字的支持

```js
定义：import dgram from 'dgram'
方法：dgram.createSocket(type,[messageListener])     //返回并创建 UDP 套接字
     dgram.createSocket(options1,[messageListener]) //返回并创建 UDP 套接字
```

### (2) dgram.Socket 类

dgram.Socket 类表示 `UDP 套接字`，继承自 EventEmitter 类，用于创建 `UDP 客户端和服务器`

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
     服务器方法：
     udpSocket.bind([port],[address],[listeningListener]) //返回当前套接字,当前套接字绑定端口和地址并在其上侦听数据报消息,未绑定端口操作系统将绑定随机端口,未绑定地址操作系统将尝试侦听所有地址
     udpSocket.bind(options2,[listeningListener])         //返回当前套接字,当前套接字绑定端口和主机并在其上侦听数据报消息
     客户端方法：
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

### (2) 实例

```js
import dgram from 'dgram'

// Server
const server = dgram.createSocket('udp4').bind(41234, 'localhost')
server.on('listening', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
server.on('message', (req_msg, remoteAddress) => {
    console.log("服务端：接收到客户端" + "(" + remoteAddress.address + ":" + remoteAddress.port + ")" + "请求 " + req_msg)
    server.send('world', remoteAddress.port, remoteAddress.address) // 向客户端发送响应
})

// Client
const client = dgram.createSocket('udp4')
client.connect(41234, 'localhost', () => {
    // 当前套接字与远程套接字成功建立连接的回调

    client.send('hello') // 向服务端发送请求
    client.on('message', (server_res, remoteAddress) => {
        console.log("客户端：接收到服务端" + "(" + remoteAddress.address + ":" + remoteAddress.port + ")" + "响应 " + server_res)
        if(server_res.toString() == 'world'){
            client.close()
        }
    })  
    client.on('close', () => {
        console.log("客户端：已关闭客户端套接字")
    })
})
```

![udp_socket]()

## 6. http 模块

### (1) http API

为了支持所有可能的 HTTP 应用程序，Node http 模块是非常底层的，只进行`流处理和消息解析`，将消息解析为头部和正文，但不再解析实际的头部和正文

```js
定义：import http from 'http'
属性：http.METHODS                                   //返回解析器支持的 HTTP 方法列表
     http.STATUS_CODES                              //返回解析器支持的 HTTP 响应状态码及描述的集合
     http.globalAgent                               //返回 http.Agent 类的全局实例
     http.maxHeaderSize                             //返回 HTTP 标头的最大允许大小(默认8KB)
方法：服务器方法：
     http.createServer([options2],[requestListener]) //返回并创建 http.Server 实例
     客户端方法：
     http.request(options1,[responseListener])       //返回并创建 http.ClientRequest 实例
     http.request(url,[options1],[responseListener])           
     http.get(options1,[responseListener])           //返回并创建 http.ClientRequest 实例
     http.get(url,[options1],[responseListener])               

options1：
protocol //默认 http:
host     //默认 localhost
port     //默认 80
path     //默认 /
method   //默认 GET
headers
...

options2：
maxHeaderSize      //指定当前服务器接收到的请求的 --max-http-header-size 值
insecureHTTPParser //指定当前服务器是否使用不安全的 HTTP 解析器,接收无效的 HTTP 标头
ServerResponse     //指定当前服务器要使用的 http.ServerResponse 类,用于扩展原始的 http.ServerResponse 类
IncomingMessage    //指定当前服务器要使用的 http.IncomingMessage 类,用于扩展原始的 http.IncomingMessage 类
```

### (2) http.Server 类

http.Server 类表示`服务器`，继承自 net.Server 类

```js
定义：import http from 'http'
     const server = http.createServer([options],[requestListener])
属性：基本属性：
     server.listening                                           //返回当前服务器是否正在监听连接
     server.maxRequestsPerSocket                                //返回当前服务器的服务端套接字可以处理的最大连接数
     server.maxHeadersCount                                     //返回当前服务器限制最大传入标头计数
     超时属性：
     server.headersTimeout                                      //返回当前服务器等待接收客户端请求完整 HTTP 标头的超时时间
     server.requestTimeout                                      //返回当前服务器等待接收客户端请求的超时时间
     server.timeout                                             //返回当前服务器的服务端套接字的超时时间
     server.keepAliveTimeout                                    //返回当前服务器的服务端套接字的长连接超时时间
方法：server.setTimeout([msecs],[cb])                            //返回当前服务器,设置当前服务器的服务端套接字的超时时间
     server.listen(path,[backlog],[listeningListener])          //无返回值,当前服务器启动 Unix 连接监听
     server.listen([port],[host],[backlog],[listeningListener]) //无返回值,当前服务器启动 TCP 连接监听
     server.close([closeListener])                              //无返回值,关闭当前服务器,停止接收新连接
net.Server 类属性和方法


事件：
connection       //当前服务器建立新的 TCP 连接时触发
request          //当前服务器接收到请求时触发(request:http.IncomingMessage,response:http.ServerResponse)
checkContinue    //当前服务器接收到 Expect: 100-continue 的请求时触发
upgrade          //当前服务器接收到升级协议的请求时触发
checkExpectation //当前服务器接收到 Expect 标头的请求时触发
connect          //当前服务器接收到 CONNECT 方法的请求时触发
close            //当前服务器关闭时触发
clientError      //当前服务器的客户端连接发生错误时触发
net.Server 类事件
```

### (3) http.ServerResponse 类

http.ServerResponse 类表示`服务端响应`，继承自 Stream 类

http.ServerResponse 类的实例由 http.Server 类内部创建，不由用户创建，作为 http.Server 类的 `request 事件监听器的第二个参数`

```js
定义：http.Server 类的 request 事件监听器的第二个参数
属性：res.req                             //返回当前服务端响应的请求
     res.socket                          //返回当前服务端响应的底层套接字
     res.statusCode                      //返回当前服务端响应的状态码
     res.statusMessage                   //返回当前服务端响应的状态消息
     res.writableEnded                   //返回当前服务端响应是否已结束写入,已调用res.end()
     res.writableFinished                //返回当前服务端响应是否已刷新到底层系统
     res.headersSent                     //返回当前服务端响应的标头是否已发送
方法：基本方法：
     res.setTimeout(msecs,[cb])          //返回当前服务端响应,设置当前服务端响应对应的服务端套接字的超时时间
     标头方法：
     res.writeHead(code,[msg],[headers]) //返回当前服务端响应,写入响应头
     res.writeContinue()                 //无返回值,写入 100-Continue 响应头
     res.writeProcessing()               //无返回值,写入 102-Processing 响应头
     res.flushHeaders()                  //无返回值,刷新响应头,Node由于效率通常会缓冲响应头直到调用res.end()或写入第一块响应数据,然后将响应头和数据打包到单个TCP数据包从而节省TCP往返
     res.hasHeader(name)                 //返回当前服务端响应是否存在指定标头
     res.getHeader(name)                 //返回当前服务端响应的指定标头
     res.getHeaders()                    //返回当前服务端响应的所有标头
     res.getHeaderNames()                //返回当前服务端响应的标头数组
     req.getRawHeaderNames()             //返回当前服务端响应的原始标头数组
     res.setHeader(name,value)           //返回当前服务端响应,设置当前服务端响应的指定标头值
     res.removeHeader(name)              //无返回值,移除当前服务端响应的指定标头
     res.addTrailers(headers)            //无返回值,向当前服务端响应添加 HTTP 尾随标头,仅在响应使用分块编码时
     正文方法
     res.write(chunk,[encoding],[cb])    //返回当前服务端响应整个正文数据是否均被成功刷新到内核缓冲,写入一块响应正文chunk
     res.end([data],[encoding],[cb])     //返回当前服务端响应,向服务器发送结束信号表明所有响应头和正文都已发送,可选参数data存在则相当于调用一次response.write()
     res.cork()                          //无返回值,强制将调用该方法之后写入的所有数据都添加到内部缓冲而不输出到目标
     res.uncork()                        //无返回值,将调用res.cork()以来缓冲的所有数据输出到目标
```

### (4) http.ClientRequest 类

http.ClientRequest 类表示`客户端请求`，继承自 Stream 类

```js
定义：import http from 'http'
     const req = http.request(options,[responseListener])
     const req = http.request(url,[options],[responseListener])
     const req = http.get(options,[responseListener]) 
     const req = http.get(url,[options],[responseListener]) 
属性：请求属性：
     req.protocol                                 //返回当前客户端请求协议
     req.host                                     //返回当前客户端请求主机
     req.path                                     //返回当前客户端请求路径
     req.method                                   //返回当前客户端请求方法
     req.maxHeadersCount                          //返回当前客户端请求的限制最大响应头计数
     req.headersSent                              //返回当前客户端请求的标头是否已发送
     req.aborted                                  //返回当前客户端请求是否已中止
     套接字属性：
     req.socket                                   //返回当前客户端请求的底层套接字
     req.reusedSocket                             //返回当前客户端请求是否通过重用的套接字发送
     req.writableObjectMode                       //返回当前客户端请求对应的套接字的可写端是否为对象模式
     req.writableHighWaterMark                    //返回当前客户端请求对应的套接字的可写端内部缓冲的最大字节数
     req.writableLength                           //返回当前客户端请求对应的套接字的可写端内部缓冲的字节数
     req.writableEnded                            //返回当前客户端请求是否完成发送,即已调用req.end()
     req.writableFinished                         //返回当前客户端请求是否数据均已刷新到底层系统
     req.destroyed                                //返回当前客户端请求对应的套接字是否已销毁
方法：基本方法：
     req.setNoDelay([noDelay])                    //无返回值,设置当前客户端请求的Nagle算法
     req.setSocketKeepAlive([enable],[initDelay]) //无返回值,设置当前客户端请求的长连接功能
     req.setTimeout(timeout,[cb])                 //返回当前客户端请求,设置当前客户端请求的连接超时时间
     标头方法：
     req.flushHeaders()                           //无返回值,刷新当前客户端请求头,Node由于效率通常会缓冲请求头直到调用req.end()或写入第一块请求数据,然后将请求头和数据打包到单个TCP数据包从而节省TCP往返
     req.hasHeader(name)                          //返回当前客户端请求是否存在指定标头
     req.getHeader(name)                          //返回当前客户端请求的指定标头
     req.getHeaders()                             //返回当前客户端请求的所有标头
     req.getHeaderNames()                         //返回当前客户端请求的标头数组
     req.getRawHeaderNames()                      //返回当前客户端请求的原始标头数组
     req.setHeader(name,value)                    //无返回值,为当前客户端请求设置指定标头
     req.removeHeader(name)                       //无返回值,为当前客户端请求删除指定标头
     正文方法：
     req.write(chunk,[enc],[cb])                  //返回当前客户端请求整个正文数据是否均被成功刷新到内核缓冲,写入一块请求正文chunk
     req.end([data],[enc],[cb])                   //返回并完成当前客户端请求,请求正文任何部分未发送则将其刷新到流,可选参数data存在则相当于先调用一次req.write()
     req.destroy([err])                           //返回当前客户端请求,销毁当前客户端请求对应的套接字,触发close事件


事件：
response    //当前客户端请求接收到响应时触发(事件监听器参数为 response-http.IncomingMessage)
continue    //当前客户端请求接收到 100 响应时触发,服务器已收到请求的第一部分,要求客户端继续提出请求
upgrade     //当前客户端请求接收到 101 响应时触发,服务器已确认升级协议的请求并准备升级
information //当前客户端请求接收到 1xx 响应时触发
connect     //当前 CONNECT 方法的客户端请求接收到响应时触发
abort       //当前客户端请求被中止时触发
timeout     //当前客户端请求的底层套接字因不活动而超时时触发
```

### (5) http.IncomingMessage 类

http.IncomingMessage 类表示`接收到的消息`，继承自 stream.Readable 类

http.IncomingMessage 类的实例由 http.ClientRequest、http.Server 类内部创建，不由用户创建，作为 http.ClientRequest 类的 response 事件的第一个参数，http.Server 类的 request 事件监听器的第一个参数

```js
定义：http.ClientRequest 类的 response 事件的第一个参数
     http.Server 类的 request 事件监听器的第一个参数
属性：基本属性：
     inMsg.socket                 //返回当前消息对应的底层套接字
     inMsg.aborted                //返回当前消息是否已中止
     inMsg.complete               //返回当前消息是否已完整接收并解析
     inMsg.httpVersion            //返回当前消息对应的 HTTP 版本
     inMsg.headers                //返回当前消息头部
     inMsg.rawHeaders             //返回当前消息对应的原始标头
     inMsg.trailers               //返回当前消息对应的尾随标头
     inMsg.rawTrailers            //返回当前消息对应的原始尾随标头
     request 属性：
     inMsg.method                 //返回当前消息的请求方法
     inMsg.url                    //返回当前消息的请求地址
     response 属性：
     inMsg.statusCode             //返回当前消息的状态码
     inMsg.statusMessage          //返回当前消息的状态描述
方法：inMsg.setTimeout(msecs,[cb]) //返回当前消息,设置当前消息对应的套接字的超时时间
     inMsg.destroy([error])       //返回当前消息,销毁当前消息对应的套接字,触发close事件
```

### (6) http.Agent 类

http.Agent 类负责管理 `HTTP 客户端连接的持久性和重用`，它维护一个`给定主机和端口`的待处理请求队列，为每个请求重用单个套接字，直到队列为空，此时通过 `keepAlive` 选项决定该套接字是被销毁，还是放入套接字池

池化的套接字将会为其启用 TCP Keep-Alive，但服务器仍可能会关闭空闲连接，这种情况下它们将从池中删除，并在该客户端发起新的 HTTP 请求时建立新连接，服务器也可能拒绝通过同一个连接的多个请求，这种情况下必须为每个请求重新建立连接，并且不能池化

当客户端或服务端关闭连接时，它会从池中删除，池中任何未使用的套接字都将被取消引用，避免在没有完成请求时保持 Node 进程运行，一个很好的做法是不再使用时 destroy() Agent 实例，因为未使用的套接字会消耗操作系统资源

```js
定义：const agent = new Agent([options])
属性：agent.requests                       //返回当前代理尚未分配给套接字的请求队列
     agent.sockets                        //返回当前代理正在使用的所有套接字
     agent.freeSockets                    //返回当前代理尚未使用的所有空闲套接字
     agent.maxFreeSockets                 //返回当前代理空闲状态下保持打开的最大套接字数量
     agent.maxSockets                     //返回当前代理可以为每个主机打开多少个并发套接字
     agent.maxTotalSockets                //返回当前代理可以为所有主机打开多少个并发套接字
方法：agent.createConnection(options,[cb]) //返回并创建用于 HTTP 请求的套接字
     agent.getName(options)               //返回请求选项的唯一名称,以确定是否可以重用套接字
     agent.keepSocketAlive(socket)        //无返回值,将指定套接字持久化供下一个请求使用
     agent.reuseSocket(socket,request)    //无返回值,将指定池化后的套接字附加到指定请求上使用
     agent.destroy()                      //无返回值,销毁当前正在使用的所有套接字


options：
KeepAlive       //指定当前代理是否长连接(默认false)
keepAliveMsecs  //指定当前代理保持长连接时的 TCP 数据报的初始延迟(默认1000,仅KeepAlive=true)
maxFreeSockets  //指定当前代理空闲状态下保持打开的最大套接字数量(默认256,仅KeepAlive=true)
maxSockets      //指定当前代理可以为每个主机打开多少个并发套接字,同一主机每个请求都将使用新的套接字直到达到指定值(默认Infinity)
maxTotalSockets //指定当前代理可以为所有主机打开多少个并发套接字,所有主机每个请求都将使用新的套接字直到达到指定值(默认Infinity)
scheduling      //指定当前代理选择下一个要使用的空闲套接字时应用的调度策略(默认lifo:选择最近使用的套接字,fifo:选择最少使用的套接字)
timeout         //指定当前代理的套接字超时时间
```

### (7) 实例

#### ① HTTP GET 请求

server.js

```js
import http from 'http'
import { getUrlParams } from '../common.js'

const server = http.createServer((req_msg, server_res) => {
    // 当前服务器接收到请求的回调

    console.log("服务端：接收到客户端请求 " + req_msg.url)

    // 获取并判断 URL 参数
    const name = getUrlParams('name', req_msg.url)
    let returnData = ''
    switch(name) {
        case 'zhangsan':
            returnData = [
                {
                    name: 'birth',
                    introduce: '过生日'
                }
            ]
            break;
        case 'lisi':
            returnData = [
                {
                    name: 'hospital',
                    introduce: '医院复诊'
                }
            ]
            break;
    }
    
    // 向客户端发送响应
    server_res.statusCode = 200
    server_res.setHeader('Content-Type', 'text/plain')
    server_res.end(JSON.stringify(returnData))
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import http from 'http'

const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=zhangsan' // URL 若包含中文则需要转义
}
const req = http.get(options, server_res => {    
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client1 套接字")
    })
    req.on('error', e => {
        console.error(e);
    })
})
```

client2.js

```js
import http from 'http'

const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=lisi' // URL 若包含中文则需要转义
}
const req = http.get(options, server_res => {    
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client2 套接字")
    })
    req.on('error', e => {
        console.error(e); 
    })
})
```

![http_get]()

#### ② HTTP POST 请求

server.js

```js
import http from 'http'

const server = http.createServer((req_msg, server_res) => {
    // 当前服务器接收到请求的回调
    
    // POST 请求体参数需要通过 data 事件接收
    req_msg.on('data', data => {
      const paramStr = data.toString()
      console.log("服务端：接收到客户端请求 " + req_msg.url + ' ' + paramStr)

      const name = JSON.parse(paramStr).name
      let returnData = ''
      switch(name) {
          case 'zhangsan':
              returnData = [
                  {
                      name: 'birth',
                      introduce: '过生日'
                  }
              ]
              break;
          case 'lisi':
              returnData = [
                  {
                      name: 'hospital',
                      introduce: '医院复诊'
                  }
              ]
              break;
      }
      
      // 向客户端发送响应
      server_res.statusCode = 200
      server_res.setHeader('Content-Type', 'text/plain')
      server_res.end(JSON.stringify(returnData))
    })
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import http from 'http'

const options = {
  host: '127.0.0.1',
  port: 3001,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}
const req = http.request(options, server_res => {
  // 当前客户端请求接收到响应的回调
  
  server_res.on('data', data => {
    console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
    req.end()
  });
  req.on('close', () => {
    console.log("客户端：已关闭客户端 client1 套接字")
  })
  req.on('error', e => {
    console.error(e);
  })
})
// 向服务器发送请求，内容必须是 String/Buffer
req.write(JSON.stringify({
  name: 'zhangsan'
}))
```

client2.js

```js
import http from 'http'

const options = {
  host: '127.0.0.1',
  port: 3001,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  }
}
const req = http.request(options, server_res => {
  // 当前客户端请求接收到响应的回调
  
  server_res.on('data', data => {
    console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
    req.end()
  })
  req.on('close', () => {
    console.log("客户端：已关闭客户端 client2 套接字")
  })
  req.on('error', e => {
    console.error(e);
  })
})
// 向服务器发送请求，内容必须是 String/Buffer
req.write(JSON.stringify({
  name: 'lisi'
})) 
```

![http_post]()

## 7. tls 模块

### (1) OpenSSL

**安全套接层协议（Secure Sockets Layer，SSL）** 可以在互联网上提供秘密性传输，其目标是保证 2 个应用间通信的保密性和可靠性，服务器和客户端同时实现支持，已经成为互联网上保密通讯的工业标准

**开放式安全套接层协议（Open Secure Sockets Layer，OpenSSL）** 是一个开放源代码的软件库，应用程序可以使用这个库来进行安全通信，避免窃听，同时确认另一端连接者的身份，这个库被广泛应用在互联网的网页服务器上。OpenSSL 整个软件包大概可以分成 3 个主要的功能部分：SSL 协议库、密码算法库、应用程序，作为一个基于密码学的安全开发包，OpenSSL 提供的功能十分强大和全面，囊括了 SSL 协议、主要的密码算法、常用的密钥和证书封装管理功能，并提供了丰富的应用程序供测试和使用

#### ① OpenSSL 的安装和配置

* OpenSSL 官网下载 exe 安装包并安装：http://slproweb.com/products/Win32OpenSSL.html
  ![OpenSSL安装]()
* 配置环境变量：将 OpenSSL 安装路径下 bin 文件夹的路径添加到操作系统的系统环境变量 Path
  ![OpenSSL配置]()
* 测试：cmd 输入 OpenSSL
  ![OpenSSL测试]()

#### ② OpenSSL 生成服务器私钥公钥

```js
生成服务器私钥：openssl genrsa -out server_rsa_private_key.pem 1024
生成服务器公钥：openssl rsa -in server_rsa_private_key.pem -pubout -out server_rsa_public_key.pem

生成服务器CSR证书签名：openssl req -new -key server_rsa_private_key.pem -out server_cert.csr
生成服务器CSR证书文件：openssl x509 -req -in server_cert.csr -signkey server_rsa_private_key.pem -out server_cert.pem
```

![openssl生成服务器私钥公钥]()

一般生成到 C 盘用户文件夹下

![密钥位置]()

### (2) tls API

```js
定义：import tls from 'tls'
方法：基本方法：
     tls.getCiphers()                                            //返回支持的 TLS 密码名称的数组
     tls.createSecureContext([options])                          //无返回值,创建一个安全上下文,用于 TLS API
     tls.checkServerIdentity(hostname,cert)                      //返回undefined或错误对象,验证证书是否被颁发给指定主机
     服务器方法：
     tls.createServer([options1],[secureConnectionListener])     //返回并创建 TLS 服务器
     客户端方法：
     tls.connect(options2,[secureConnectListener])               //返回 TLS 客户端套接字,TLS 客户端套接字向要连接的远程套接字发起连接请求,仅用于连接关闭后重新发起连接
     tls.connect(path,[options2],[secureConnectListener])        //返回 TLS 客户端套接字,TLS 客户端套接字向要连接的远程套接字发起 Unix 连接请求
     tls.connect(port,[host],[options2],[secureConnectListener]) //返回 TLS 客户端套接字,TLS 客户端套接字向要连接的远程套接字发起 TCP 连接请求
```

### (3) tls.Server 类

tls.Server 类表示 `TLS 服务器`，继承自 net.Server 类

```js
定义：import tls from 'tls'
     const server = tls.createServer([options1],[secureConnectionListener])
方法：基本方法：
     server.address()                                           //返回当前服务器的地址{family,address,port}
     server.getTicketKeys()                                     //返回当前服务器的会话票证密钥
     server.setTicketKeys(keys)                                 //无返回值,设置当前服务器的会话票证密钥,不影响现有连接,仅影响后续连接
     server.addContext(hostname,context)                        //无返回值,为指定主机名添加一个安全上下文
     server.setSecureContext(options2)                          //无返回值,设置当前服务器的安全上下文
     监听方法：
     server.listen(path,[backlog],[listeningListener])          //无返回值,当前服务器启动 Unix 连接监听
     server.listen([port],[host],[backlog],[listeningListener]) //无返回值,当前服务器启动 TCP 连接监听
     server.close([closeListener])                              //返回并关闭当前服务器
net.Server 类属性和方法

options1：
key  //指定服务器
cert //指定服务器
ca   //指定客户端
...


事件：
connection       //当前服务器建立新的 TCP 流时,在 TLS 握手之前触发
keylog           //当前服务器生成或接收到密钥材料时触发(事件监听器参数为line:,tlsSocket:)
newSession       //创建新的 TLS 会话时触发(事件监听器参数为sessionId:TLS会话标识符,sessionDataTLS:会话数据,callback)
OCSPRequest      //客户端发送证书状态请求时触发
resumeConnection //客户端请求恢复以前的 TLS 会话时触发
secureConnection //新连接的握手过程成功后触发
tlsClientError   //建立安全连接之前发生错误时触发
net.Server 类事件
```

### (4) tls.TLSSocket 类

tls.TLSSocket 类表示 `TLS 套接字`，继承自 net.Socket 类

```js
定义：import tls from 'tls'
     const socket = new tls.TLSSocket(socket,[options1])
     const socket = tls.connect(options1,[secureConnectListener])               
     const socket = tls.connect(path,[options1],[secureConnectListener])       
     const socket = tls.connect(port,[host],[options1],[secureConnectListener]) 
属性：socket.encrypted                                 //返回true,用于区分 TLS 套接字与常规 net.Socket 套接字
     socket.authorizationError                        //返回未验证对等方证书的原因
     socket.authorized                                //返回对等证书是否由创建 tls.TLSSocket 实例时指定的 CA 签名之一
     socket.localAddress                              //返回当前套接字的本地IP地址
     socket.localPort                                 //返回当前套接字的本地端口
     socket.remoteFamily                              //返回当前套接字远程连接的套接字IP地址类型
     socket.remoteAddress                             //返回当前套接字远程连接的套接字IP地址
     socket.remotePort                                //返回当前套接字远程连接的套接字端口
方法：socket.address()                                 //返回当前套接字的地址{family,address,port}
     socket.getCertificate()                          //返回当前套接字的本地证书对象
     socket.getPeerCertificate([detailed])            //返回当前套接字的远程连接套接字的证书对象,可选参数detailed表示是否包含完整的证书链
     socket.getPeerX509Certificate()                  //返回当前套接字的远程连接套接字的X509Certificate证书对象
     socket.disableRenegotiation()                    //无返回值,禁止 TLS 重新协商
     socket.renegotiate(options2,secureListener)      //返回是否启动成功,启动 TLS 重新协商
     socket.enableTrace()                             //无返回值,将 TLS 数据包跟踪信息写入错误输出流 stderr
     socket.exportKeyingMaterial(len,label,[context]) //返回请求的密钥材料字节
     socket.getFinished()                             //返回 TLS 握手的发送到当前套接字的最新完成信息
     socket.getPeerFinished()                         //返回从套接字接收到的最新 Finished 消息,无则返回undefined
     socket.getCipher()                               //返回协商密码套件信息对象{name,standardName,version}
     socket.getEphemeralKeyInfo()                     //返回当前套接字连接上完全前向保密的临时密钥交换{name,type,size}
     socket.setMaxSendFragment(size)                  //返回是否设置成功,设置最大 TLS 片段大小
     socket.getProtocol()                             //返回当前连接的 TLS 协议版本(TLSv1,TLSv1.1,TLSv1.2,TLSv1.3,SSLv3)
     socket.getSession()                              //返回 TLS 会话数据
     socket.getTLSTicket()                            //返回 TLS 会话票证
     socket.getSharedSigalgs()                        //返回客户端和服务器之间共享的按首选项递减的签名算法列表
     socket.isSessionReused()                         //返回 TLS 会话是否被重用
```

## 8. https 模块

### (1) https API

```js
定义：import https from 'https'
属性：https.globalAgent                                //返回 https.Agent 类的全局实例
方法：客户端方法：
     https.request(options1,[responseListener])       //返回并创建 http.ClientRequest 实例
     https.request(url,[options1],[responseListener])           
     https.get(options1,[responseListener])           //返回并创建 http.ClientRequest 实例
     https.get(url,[options1],[responseListener])               
     服务器方法：
     https.createServer([options2],[requestListener]) //返回并创建 https.Server 实例

options1：
protocol //默认 http:
host     //默认 localhost
port     //默认 80
path     //默认 /
method   //默认 GET
headers
...
```

### (2) https.Server 类

https.Server 类表示`服务器`，继承自 tls.Server 类

```js
定义：import https from 'http'
     const server = https.createServer([options],[requestListener])
属性：基本属性：
     server.maxHeadersCount                                     //返回当前服务器限制最大传入标头计数
     超时属性：
     server.headersTimeout                                      //返回当前服务器等待接收客户端请求完整 HTTP 标头的超时时间
     server.requestTimeout                                      //返回当前服务器等待接收客户端请求的超时时间
     server.timeout                                             //返回当前服务器的服务端套接字的超时时间
     server.keepAliveTimeout                                    //返回当前服务器的服务端套接字的长连接超时时间
方法：基本方法：
     server.setTimeout([msecs],[cb])                            //返回当前服务器,设置当前服务器的服务端套接字的超时时间
     监听方法：
     server.listen(path,[backlog],[listeningListener])          //无返回值,当前服务器启动 Unix 连接监听
     server.listen([port],[host],[backlog],[listeningListener]) //无返回值,当前服务器启动 TCP 连接监听
     server.close([closeListener])                              //无返回值,关闭当前服务器,停止接收新连接

options：
key  //指定当前服务器的私钥
cert //指定当前服务器的证书
...


事件：
listening        //当前服务器启动监听后触发
connection       //当前服务器建立新的 TCP 连接时触发
request          //当前服务器接收到请求时触发(事件监听器参数为 request-http.IncomingMessage、response-http.ServerResponse)
checkContinue    //当前服务器接收到 Expect: 100-continue 的请求时触发
upgrade          //当前服务器接收到升级协议的请求时触发
checkExpectation //当前服务器接收到 Expect 标头的请求时触发
connect          //当前服务器接收到 CONNECT 方法的请求时触发
close            //当前服务器关闭时触发
clientError      //当前服务器的客户端连接发生错误时触发
```

### (3) https.Agent 类

```js
定义：const agent = new Agent([options])

options：
KeepAlive       //指定当前代理是否长连接(默认false)
keepAliveMsecs  //指定当前代理保持长连接时的 TCP 数据报的初始延迟(默认1000,仅KeepAlive=true)
maxFreeSockets  //指定当前代理空闲状态下保持打开的最大套接字数量(默认256,仅KeepAlive=true)
maxSockets      //指定当前代理可以为每个主机打开多少个并发套接字,同一主机每个请求都将使用新的套接字直到达到指定值(默认Infinity)
maxTotalSockets //指定当前代理可以为所有主机打开多少个并发套接字,所有主机每个请求都将使用新的套接字直到达到指定值(默认Infinity)
scheduling      //指定当前代理选择下一个要使用的空闲套接字时应用的调度策略(默认lifo:选择最近使用的套接字,fifo:选择最少使用的套接字)
timeout         //指定当前代理的套接字超时时间


事件：
keylog //当前代理管理的连接生成或接收到密钥材料时触发
```

### (4) 实例

#### ① HTTPS GET 请求

server.js

```js
import https from 'https'
import fs from 'fs'
import { getUrlParams } from '../common.js'

// 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
const options = {
    key: fs.readFileSync('../../keys/server_rsa_private_key.pem'), // 服务器私钥
    cert: fs.readFileSync('../../keys/server_cert.pem'), // 服务器证书
}
const server = https.createServer(options, (req_msg, server_res) => {
    // 当前服务器接收到请求的回调
    
    console.log("服务端：接收到客户端请求 " + req_msg.url)

    // 获取并判断 URL 参数
    const name = getUrlParams('name', req_msg.url)
    let returnData = ''
    switch(name) {
        case 'zhangsan':
            returnData = [
                {
                    name: 'birth',
                    introduce: '过生日'
                }
            ]
            break;
        case 'lisi':
            returnData = [
                {
                    name: 'hospital',
                    introduce: '医院复诊'
                }
            ]
            break;
    }
    
    // 向客户端发送响应
    server_res.statusCode = 200
    server_res.setHeader('Content-Type', 'text/plain')
    server_res.end(JSON.stringify(returnData))
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import https from 'https'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const options2 = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=zhangsan'
}
const req = https.get(options2, server_res => {
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client1 套接字")
    })
    req.on('error', e => {
        console.error(e); // Error: self signed certificate
    })
})
```

client2.js

```js
import https from 'https'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const options2 = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=lisi'
}
const req = https.get(options2, server_res => {
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client2 套接字")
    })
    req.on('error', e => {
        console.error(e); // Error: self signed certificate
    })
})
```

![https_get]()

#### ② HTTPS POST 请求

server.js

```js
import https from 'https'
import fs from 'fs'

// 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
const options = {
    key: fs.readFileSync('../../keys/server_rsa_private_key.pem'), // 服务器私钥
    cert: fs.readFileSync('../../keys/server_cert.pem'), // 服务器证书
}
const server = https.createServer(options, (req_msg, server_res) => {
    // 当前服务器接收到请求的回调
    
    // POST 请求体参数需要通过 data 事件接收
    req_msg.on('data', data => {
        const paramStr = data.toString()
        console.log("服务端：接收到客户端请求 " + req_msg.url + ' ' + paramStr)
  
        const name = JSON.parse(paramStr).name
        let returnData = ''
        switch(name) {
            case 'zhangsan':
                returnData = [
                    {
                        name: 'birth',
                        introduce: '过生日'
                    }
                ]
                break;
            case 'lisi':
                returnData = [
                    {
                        name: 'hospital',
                        introduce: '医院复诊'
                    }
                ]
                break;
        }
        
        // 向客户端发送响应
        server_res.statusCode = 200
        server_res.setHeader('Content-Type', 'text/plain')
        server_res.end(JSON.stringify(returnData))
      })
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import https from 'https'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
}
const req = https.request(options, server_res => {
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
      console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
      req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client1 套接字")
    })
    req.on('error', e => {
        console.error(e); // Error: self signed certificate
    })
})
// 向服务器发送请求，内容必须是 String/Buffer
req.write(JSON.stringify({
    name: 'zhangsan'
}))
```

client2.js

```js
import https from 'https'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
}
const req = https.request(options, server_res => {
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client2 套接字")
    })
    req.on('error', e => {
        console.error(e); // Error: self signed certificate
    })
})
// 向服务器发送请求，内容必须是 String/Buffer
req.write(JSON.stringify({
    name: 'lisi'
})) 
```

![https_post]()

## 9. http2 模块

### (1) http2 API

```js
定义：import http2 from 'http2'
方法：HTTP2 客户端方法：
     http2.connect(authority,[options],[connectListener]) //返回并创建 ClientHttp2Session 实例
     HTTP2 服务端方法：          
     http2.createServer(options,[requestListener])        //返回并创建 Http2Server 实例
     http2.createSecureServer(options,[requestListener])  //返回并创建 Http2SecureServer 实例
```

### (2) Http2Server 类

Http2Server 类表示`服务器`，继承自 `net.Server 类`

```js
定义：import http2 from 'http2'
     const server = http2.createServer(options,[requestListener])
属性：server.timeout                               //返回当前服务器的超时时间
方法：server.updateSettings([settings])            //无返回值,使用指定的设置更新当前服务器
     server.setTimeout([msecs],[timeoutListener]) //返回当前服务器,设置当前服务器的超时时间及监听器
     server.close([cb])                           //无返回值,当前服务器停止建立新会话,可选参数cb在所有活动会话关闭之后调用,由于 http2 会话的持久性,不会阻止创建新的请求流,要正常关闭服务器需要关闭所有活动会话


事件：
connection    //当前服务器建立新的 TCP 连接时触发
request       //当前服务器接收到请求时触发(request:http2.http2ServerRequest、response:http2.http2ServerReponse)
checkContinue //当前服务器收到 Expect: 100-continue 的请求时触发,未监听此事件则服务器自动响应为 100 Continue
session       //当前服务器创建新的 ServerHttp2Session 实例时触发
stream        //当前服务器关联的 ServerHttp2Session 对象触发 stream 事件时触发
sessionError  //当前服务器关联的 ServerHttp2Session 对象触发 error 事件时触发
timeout       //当前服务器超时时触发
```

### (3) Http2SecureServer 类

Http2SecureServer 类表示`服务器`，继承自 `tls.Server 类`，用于创建安全的 https 连接

```js
定义：import http2 from 'http2'
     const secureServer = http2.createServer(options,[requestListener])
属性：secureServer.timeout                               //返回当前服务器的超时时间
方法：secureServer.updateSettings([settings])            //无返回值,使用指定的设置更新当前服务器
     secureServer.setTimeout([msecs],[timeoutListener]) //返回当前服务器,设置当前服务器的超时时间及监听器
     secureServer.close([cb])                           //无返回值,当前服务器停止建立新会话,可选参数cb在所有活动会话关闭之后调用,由于 http2 会话的持久性,不会阻止创建新的请求流,要正常关闭服务器需要关闭所有活动会话


事件：
connection      //当前服务器建立新的 TCP 连接时触发
request         //当前服务器接收到请求时触发(事件监听器参数为 request-http2.http2ServerRequest、response-http2.http2ServerReponse)
checkContinue   //当前服务器收到 Expect: 100-continue 的请求时触发,未监听此事件则服务器自动响应为 100 Continue
session         //当前服务器创建新的 ServerHttp2Session 实例时触发
stream          //当前服务器关联的 ServerHttp2Session 对象触发 stream 事件时触发
sessionError    //当前服务器关联的 ServerHttp2Session 对象触发 error 事件时触发
timeout         //当前服务器超时时触发
unknownProtocol //当前服务器连接的客户端无法协商允许的协议时触发
```

### (4) Http2ServerRequest 类

http2.Http2ServerRequest 类表示`服务端响应`，继承自 Stream 类

http2.Http2ServerRequest 类的实例由 http2.Http2Server/Http2SecureServer 类内部创建，不由用户创建，作为 http2.Http2Server/Http2SecureServer 类的 `request 事件监听器的第一个参数`

```js
定义：http2.Http2Server 类的 request 事件监听器的第一个参数
     http2.Http2SecureServer 类的 request 事件监听器的第一个参数
属性：基础属性：
     request.httpVersion                       //返回当前客户端请求的 HTTP 版本
     request.url                               //返回当前客户端请求的请求网址
     request.method                            //返回当前客户端请求的方法
     request.headers                           //返回当前客户端请求的头部对象
     request.rawHeaders                        //返回当前客户端请求的原始头部对象
     request.trailers                          //返回当前客户端请求的尾随标头
     request.rawTrailers                       //返回当前客户端请求的原始尾随标头
     request.scheme                            //返回当前客户端请求的协议伪标头域
     request.authority                         //返回当前客户端请求的权限伪头域
     关联对象属性：
     request.socket                            //返回当前客户端请求的套接字 Proxy 对象
     request.stream                            //返回当前客户端请求的 Http2Stream 对象
     状态属性：
     request.aborted                           //返回当前客户端请求是否已中止
     request.complete                          //返回当前客户端请求是否已中止、完成、销毁
方法：request.setTimeout(msecs,timeoutListener) //返回当前客户端请求,设置当前客户端请求超时时间及监听器
     request.destroy([error])                  //无返回值,当前客户端请求在其底层 Http2Stream 实例上调用 destroy()



事件：
aborted //当前客户端请求在通信中途异常中止时触发
close   //当前客户端请求的底层 Http2Stream 实例关闭时触发
```

### (5) Http2ServerResponse 类

http2.Http2ServerResponse 类表示`服务端响应`，继承自 Stream 类

http2.Http2ServerResponse 类的实例由 http2.Http2Server/Http2SecureServer 类内部创建，不由用户创建，作为 http2.Http2Server/Http2SecureServer 类的 `request 事件监听器的第二个参数`

```js
定义：http2.Http2Server 类的 request 事件监听器的第二个参数
     http2.Http2SecureServer 类的 request 事件监听器的第二个参数
属性：状态属性：
     response.statusCode                                      //返回当前服务端响应的状态码
     response.statusMessage                                   //返回当前服务端响应的状态信息
     response.req                                             //返回当前服务端响应关联的 request 对象的引用
     response.stream                                          //返回当前服务端响应关联的 ServerHttp2Session 对象的引用
     response.socket                                          //返回当前服务端响应的套接字的 Proxy 对象
     通信属性：
     response.headersSent                                     //返回当前服务端响应标头是否已发送
     response.sendDate                                        //返回当前服务端响应中的 Date 标头是否自动生成并在响应中发送
     response.writableEnded                                   //返回当前服务端响应是否已调用 response.end()
方法：响应头部方法：
     response.hasHeader(name)                                 //返回当前服务端响应是否包含指定标头
     response.getHeader(name)                                 //返回当前服务端响应的的指定标头值
     response.getHeaderNames()                                //返回当前服务端响应的所有标头名称数组
     response.getHeaders()                                    //返回当前服务端响应的所有标头键值对
     response.removeHeader(name)                              //无返回值,删除当前服务端响应的指定标头
     response.addTrailers(headers)                            //无返回值,当前服务端响应添加 HTTP 尾随标头
     其他方法：
     response.setTimeout(msecs,[cb])                          //无返回值,当前服务端响应设置超时时间
     response.setHeader(name,value)                           //无返回值,当前服务端响应为指定标头设置值
     response.writeContinue()                                 //无返回值,当前服务端响应发送状态 100 Continue
     response.writeHead(statusCode,[statusMessage],[headers]) //无返回值,当前服务端响应发送响应标头
     response.write(chunk,[encoding],[cb]) //无返回值,当前服务端响应发送一块响应正文
     response.end([data,[encoding]],[cb])                     //返回当前服务端响应,向当前服务器发出信号表明所有响应头和正文都已发送,响应流完成时调用可选参数cb
     response.createPushResponse(headers,(err,response)=>{})  //无返回值,当前服务端响应使用指定标头调用 http2stream.pushStream()


事件：
finish //当前服务端响应发送时触发,具体就是响应标头和正文的最后一段已移交给 HTTP/2 多路复用以通过网络传输时触发,并不意味着客户端接收到任何东西
close  //当前服务端响应的底层 Http2Stream 实例关闭时触发
```

### (6) Http2Session 类

Http2Session 类表示`客户端和服务器之间的活动通信会话`，用户代码不会直接创建 Http2Session 实例

* 客户端 ClientHttp2Session 实例通过 `http2.connect(authority,[options],[connectListener])` 方法创建
* 服务端 ServerHttp2Session 实例是在接收到新的 HTTP2 连接时由 Http2Server/Http2SecureSerever 实例创建

每个 Http2Session 实例都与 `net.Socket、tls.Socket` 相关联，当其一被摧毁时，两者都会被摧毁，一旦将 Socket 绑定到 Http2Session，用户代码应当仅仅依赖于 Http2Session 的 API

```js
属性：状态属性：
     http2session.type                                       //返回当前会话的类型(客户端会话:http2.constants.NGHTTP2_SESSION_CLIENT,服务端会话:http2.constants.NGHTTP2_SESSION_SERVER)
     http2session.state                                      //返回当前会话的状态信息
     http2session.localSettings                              //返回当前会话的本地设置对象
     http2session.remoteSettings                             //返回当前会话的远程设置对象
     http2session.pendingSettingsAck                         //返回当前会话是否正在等待已发送的 SETTINGS 帧的确认
     http2session.connecting                                 //返回当前会话是否仍连接
     http2session.closed                                     //返回当前会话是否已关闭
     http2session.destroyed                                  //返回当前会话是否已销毁
     套接字属性：
     http2session.socket                                     //返回当前会话的底层套接字 Proxy 对象
     http2session.encrypted                                  //返回当前会话是否已连接到 TLSSocket,尚未连接到套接字返回 undefined
     http2session.alpnProtocol                               //返回当前会话已连接的 TLSSocket 的 alpnProtocol 属性值,尚未连接到套接字返回 undefiend,未连接到 TLSSocket 返回 h2c
方法：通信方法：
     http2session.ping([payload],pingListener)               //返回是否成功,当前会话向远程对等方发送 PING 帧
     http2session.goaway([code,[lastStreamID,[opaqueData]]]) //无返回值,当前会话向远程对等方发送 GOAWAY 帧
     http2session.settings([settings],[cb])                  //无返回值,当前会话更新本地设置并向远程对等方发送 SETTINGS 帧
     http2session.setLocalWindowSize(windowSize)             //无返回值,当前会话设置本地端点的窗口大小
     http2session.setTimeout(msecs,timeoutListener)          //无返回值,当前会话设置超时时间
     http2session.close([closeListener])                     //无返回值,关闭当前会话
     http2session.destroy([err],[code])                      //无返回值,销毁当前会话
     套接字方法：
     http2session.ref()                                      //无返回值,当前会话在其底层套接字上调用 ref()
     http2session.unref()                                    //无返回值,当前会话在其底层套接字上调用 unref()


事件：
connect        //当前会话成功连接到远程对等方并可以通信时触发(session,socket)
stream         //当前会话创建新的 Http2Stream 实例时触发
frameError     //当前会话发送帧时发生错误时触发
goaway         //当前会话接收到 GOAWAY 帧时触发,该事件触发时当前会话实例会自动关闭
remoteSettings //当前会话接收到 SETTINGS 帧时触发
localSettings  //当前会话接收到确认 SETTINGS 帧时触发
ping           //当前会话接收到 PING 帧时触发
timeout        //当前会话超时时触发
error          //当前会话发生错误时触发
close          //当前会话被销毁时触发
```

### (7) ServerHttp2Session 类

ServerHttp2Session 类表示`服务端的活动通信会话`，继承自 Http2Session 类，用户代码不会直接创建 ServerHttp2Session 实例，而是服务端在接收到新的 HTTP2 连接时由 Http2Server/Http2SecureSerever 实例自身创建

```js
定义：Http2Server/Http2SecureSerever 实例自身创建
方法：ServerHttp2Session 方法：
     serverSession.altsvc(alt,originOrStream) //当前服务端会话向连接的客户端提交 ALTSVC 帧
     serverSession.origin(...origins)         //当前服务端会话向连接的客户端提交 ORIGIN 帧
```

### (8) ClientHttp2Session 类

ClientHttp2Session 类表示`客户端的活动通信会话`，继承自 Http2Session 类，用户代码不会直接创建 ClientHttp2Session 实例，而是通过 `http2.connect(authority,[options],[connectListener])` 方法创建

```js
定义：import http2 from 'http2'
     const clientSession = http2.connect(authority,[options],[connectListener])
方法：ClientHttp2Session 方法：
     clientSession.request(headers,[options]) //返回并创建 ClientHttp2Stream 实例,当前客户端会话向要连接的服务器发送 HTTP2 请求


事件：
altsvc //当前客户端会话接收到 ALTSVC 帧时触发
origin //当前客户端会话接收到 ORIGIN 帧时触发
```

### (9) Http2Stream 类

Http2Stream 类表示客户端和服务端间的`活动通信会话间的双向 HTTP2 通信流`，继承自 stream.Duplex 类，任何单个活动通信会话在其生命周期内最多可能拥有 `2^32 - 1` 个 Http2Stream 实例

```js
属性：状态属性：
     http2stream.pending                           //返回当前通信流是否尚未分配 ID
     http2stream.id                                //返回当前通信流 ID
     http2stream.state                             //返回当前通信流的状态信息
     http2stream.aborted                           //返回当前通信流是否异常中止
     http2stream.closed                            //返回当前通信流是否已关闭
     http2stream.destroyed                         //返回当前通信流是否已销毁
     http2stream.session                           //返回当前通信流的 Http2Session 实例的引用
     通信属性：
     http2stream.sentHeaders                       //返回当前通信流的已发送的标头对象
     http2stream.sentInfoHeaders                   //返回当前通信流的已发送的信息标头对象数组
     http2stream.sentTrailers                      //返回当前通信流的已发送的尾随标头对象
     http2stream.bufferSize                        //返回当前通信流的缓冲要写入的字节数
     http2stream.endAfterHeaders                   //返回当前通信流接收到的 HEADERS 帧中是否设置了 END_STREAM 标志
     http2stream.rstCode                           //返回当前通信流的 RST_STREAM 帧的错误代码 
方法：
     http2stream.priority(options)                 //无返回值,更新当前通信流的优先级
     http2stream.setTimeout(msecs,timeoutListener) //无返回值,当前通信流设置超时时间及监听器
     http2stream.sendTrailers(headers)             //无返回值,当前通信六流向远程对对等方发送尾随 HEADERS 帧
     http2stream.close(code,[cb])                  //无返回值,当前通信流向远程对等方发送 RST_STREAM 帧来关闭当前通信流


事件：
ready        //当前通信流已打开、已分配 ID、可以使用时触发
wantTrailers //当前通信流已将最后 DATA 帧排队且准备好发送尾随标头时触发
trailers     //当前通信流接收到与尾随标头字段关联的标头块时触发
frameError   //当前通信流发送帧时发生错误时触发
timeout      //当前通信流超时时触发
error        //当前通信流发生错误时触发
aborted      //当前通信流异常中止时触发
close        //当前通信流被销毁时触发
```

### (10) ServerHttp2Stream 类

```js
定义：ServerHttp2Session 实例触发 stream 事件而来
属性：
     http2stream.headersSent                               //返回当前服务端流的标头是否已发送
     http2stream.pushAllowed                               //返回当前服务端流的客户端流是否允许接收推送流
方法：
     http2stream.additionalHeaders(headers)                //无返回值,当前服务端流发送 HEADERS 帧
     http2stream.pushStream(headers,[options],cb)          //无返回值,当前服务端流启动推送流
     http2stream.respond([headers,[options]])              //无返回值,当前服务端流发送响应
     http2stream.respondWithFD(fd,[headers,[options]])     //无返回值,当前服务端流从指定文件描述符中读取数据作为响应
     http2stream.respondWithFile(path,[headers,[options]]) //无返回值,当前服务端流发送普通文件作为响应
```

### (11) ClientHttp2Stream 类

ClientHttp2Stream 类表示`客户端流`，继承自 Http2Stream 类

```js
定义：const clientStream = clientSession.request(headers,[options])


事件：
response //当前客户端流接收到服务器返回的 HEADERS 帧时触发
continue //当前客户端流接收到服务器返回的 100 Continue 状态时触发
headers  //当前客户端流接收到服务器返回的附加标头块时触发
push     //当前客户端流接收到服务器推送的流的响应头时触发
```

### (12) 实例

#### ① http2.get

server.js

```js
import http2 from 'http2'
import { getUrlParams } from '../common.js'

const server = http2.createServer((request, response) => {
    // 当前服务器接收到请求的回调

    console.log("服务端：接收到客户端请求 " + request.url)

    // 获取并判断 URL 参数
    const name = getUrlParams('name', request.url)
    let returnData = ''
    switch(name) {
        case 'zhangsan':
            returnData = [
                {
                    name: 'birth',
                    introduce: '过生日'
                }
            ]
            break;
        case 'lisi':
            returnData = [
                {
                    name: 'hospital',
                    introduce: '医院复诊'
                }
            ]
            break;
    }
    
    // 向客户端发送响应
    response.writeHead(200, 'OK', { 
        'content-type': 'text/html; charset=utf-8'
    })
    response.end(JSON.stringify(returnData))
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import http2 from 'http2'

const clientSession = http2.connect('http://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 GET 请求
    const clientStream = clientSession.request({
        ':method': 'GET',
        ':path': '/todos?name=zhangsan'
    })

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client1：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client1：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client1 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

client2.js

```js
import http2 from 'http2'

const clientSession = http2.connect('http://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 GET 请求
    const clientStream = clientSession.request({
        ':method': 'GET',
        ':path': '/todos?name=lisi'
    })

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client2：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client2：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client2 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

![http2.get]()

#### ② http2.post

server.js

```js
import http2 from 'http2'

const server = http2.createServer((request, response) => {
    // 当前服务器接收到请求的回调

    // POST 请求体参数需要通过 data 事件接收
    request.on('data', data => {
        const paramStr = data.toString()
        console.log("服务端：接收到客户端请求 " + request.url + ' ' + paramStr)

        const name = JSON.parse(paramStr).name
        let returnData = ''
        switch(name) {
            case 'zhangsan':
                returnData = [
                    {
                        name: 'birth',
                        introduce: '过生日'
                    }
                ]
                break;
            case 'lisi':
                returnData = [
                    {
                        name: 'hospital',
                        introduce: '医院复诊'
                    }
                ]
                break;
        }

        // 向客户端发送响应
        response.writeHead(200, 'OK', { 
            'content-type': 'text/html; charset=utf-8'
        })
        response.end(JSON.stringify(returnData))
    })
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import http2 from 'http2'

const clientSession = http2.connect('http://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 POST 请求
    const clientStream = clientSession.request({
        ':method': 'POST',
        ':path': '/todos',
        'Content-Type': 'application/json',
    })
    clientStream.write(JSON.stringify({
        name: 'zhangsan'
    }))

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client1：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client1：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client1 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

client2.js

```js
import http2 from 'http2'

const clientSession = http2.connect('http://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 POST 请求
    const clientStream = clientSession.request({
        ':method': 'POST',
        ':path': '/todos',
        'Content-Type': 'application/json',
    })
    clientStream.write(JSON.stringify({
        name: 'lisi'
    }))

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client2：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client2：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client2 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

![http2.post]()

#### ③ http2Secure.get

server.js

```js
import http2 from 'http2'
import fs from 'fs'
import { getUrlParams } from '../common.js'

// 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
const options = {
    key: fs.readFileSync('../../keys/server_rsa_private_key.pem'), // 服务器私钥
    cert: fs.readFileSync('../../keys/server_cert.pem'), // 服务器证书
}
const server = http2.createSecureServer(options, (request, response) => {
    // 当前服务器接收到请求的回调

    console.log("服务端：接收到客户端请求 " + request.url)

    // 获取并判断 URL 参数
    const name = getUrlParams('name', request.url)
    let returnData = ''
    switch(name) {
        case 'zhangsan':
            returnData = [
                {
                    name: 'birth',
                    introduce: '过生日'
                }
            ]
            break;
        case 'lisi':
            returnData = [
                {
                    name: 'hospital',
                    introduce: '医院复诊'
                }
            ]
            break;
    }
    
    // 向客户端发送响应
    response.writeHead(200, 'OK', { 
        'content-type': 'text/html; charset=utf-8'
    })
    response.end(JSON.stringify(returnData))
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import http2 from 'http2'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const clientSession = http2.connect('https://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 GET 请求
    const clientStream = clientSession.request({
        ':method': 'GET',
        ':path': '/todos?name=zhangsan'
    })

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client1：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client1：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client1 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

client2.js

```js
import http2 from 'http2'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const clientSession = http2.connect('https://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 GET 请求
    const clientStream = clientSession.request({
        ':method': 'GET',
        ':path': '/todos?name=lisi'
    })

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client2：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client2：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client2 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

![http2Secure.get]()

#### ④ http2Secure.post

server.js

```js
import http2 from 'http2'
import fs from 'fs'

// 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
const options = {
    key: fs.readFileSync('../../keys/server_rsa_private_key.pem'), // 服务器私钥
    cert: fs.readFileSync('../../keys/server_cert.pem'), // 服务器证书
}
const server = http2.createServer(options, (request, response) => {
    // 当前服务器接收到请求的回调

    // POST 请求体参数需要通过 data 事件接收
    request.on('data', data => {
        const paramStr = data.toString()
        console.log("服务端：接收到客户端请求 " + request.url + ' ' + paramStr)

        const name = JSON.parse(paramStr).name
        let returnData = ''
        switch(name) {
            case 'zhangsan':
                returnData = [
                    {
                        name: 'birth',
                        introduce: '过生日'
                    }
                ]
                break;
            case 'lisi':
                returnData = [
                    {
                        name: 'hospital',
                        introduce: '医院复诊'
                    }
                ]
                break;
        }

        // 向客户端发送响应
        response.writeHead(200, 'OK', { 
            'content-type': 'text/html; charset=utf-8'
        })
        response.end(JSON.stringify(returnData))
    })
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
```

client1.js

```js
import http2 from 'http2'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const clientSession = http2.connect('https://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 POST 请求
    const clientStream = clientSession.request({
        ':method': 'POST',
        ':path': '/todos',
        'Content-Type': 'application/json',
    })
    clientStream.write(JSON.stringify({
        name: 'zhangsan'
    }))

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client1：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client1：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client1 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

client2.js

```js
import http2 from 'http2'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const clientSession = http2.connect('https://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 POST 请求
    const clientStream = clientSession.request({
        ':method': 'POST',
        ':path': '/todos',
        'Content-Type': 'application/json',
    })
    clientStream.write(JSON.stringify({
        name: 'lisi'
    }))

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client2：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client2：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client2 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})
```

![http2Secure.post]()
