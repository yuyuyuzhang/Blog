# 一、TCP/IP 协议群

## 1. TCP/IP 协议群

TCP/IP 协议群就是为了使用互联网而开发制定的，因此互联网协议群就是 TCP/IP 协议群

① 应用协议（应用层）：HTTP、SMTP、FTP、TELNET、SSH、SNMP

② 传输协议（传输层）：TCP、UDP

③ 网际协议（网络层）：IP、ICMP、ARP

④ 路由控制协议（网络层）：RIP、OSPF、BGP

![TCPIP协议群](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/TCPIP%E5%8D%8F%E8%AE%AE%E7%BE%A4.png)

## 2. TCP/IP 协议群的标准化

### (1) 开放性

开放性是由于 TCP/IP 协议群是由国际互联网工程任务组 IETF 讨论制定的，而 IETF 是一个允许任何人加入讨论的组织，在 IETF 人们通常采用电子邮件组的形式进行日常讨论，而邮件组可以由任何人订阅

### (2) 实用性

TCP/IP 协议群在制定某个协议规范的过程中会考虑这个协议实现的可行性，只要这个协议的大致规范确定下来，人们就会在多个已实现这个协议的设备间进行通信实验，一旦发现有什么问题，就可以继续在 IETF 中讨论修改，经过多次讨论、实验、修改，这个协议的最终详细规范才会诞生，因此 TCP/IP 协议群具有很强的实用性

### (3) TCP/IP 规范

#### ① RFC 文档

* TCP/IP 协议群中那些需要标准化的协议，会被列入 RFC 文档并在互联网上公布，RFC 文档记录了协议规范内容、协议的实现和应用相关信息、实验方面的信息，
* RFC 文档通过编号组织每个协议的标准化请求，RFC 文档的编码是既定的，如要扩展某个已有的协议规范，就必须有一个全新编号的 RFC 文档对其记录，同时，老的那份 RFC 文档作废，新的 RFC 文档必须记录扩展自哪个 RFC 文档以及要作废哪个 RFC 文档

#### ② STD 编号

由于每次修改 RFC 时都要产生新的 RFC 编号太麻烦，人们采用 STD 方式管理 RFC 编号，STD 编号记录制定哪个协议，同一个协议的规范内容变化只会改变 RFC 编号，不会改变 STD 编号

下图是部分 STD 编号：

![TCPIP规范](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/TCPIP%E8%A7%84%E8%8C%83.png)

## 3. 物理层

### (1) 物理层作用

数据在实际的设备间传递时，可能会用到电线、光缆、光纤、卫星、无线等通信介质，因此实际传输的是电压的高低、光的闪灭、电波的强弱等信号，而计算机只能处理二进制 0、1 信息，因此物理层需要`封装光电信号和设备差异`，为数据链路层提供`二进制传输`的支持

### (2) 传输介质

① 计算机之间通过`电线、光缆、光纤、卫星、无线`等传输介质相互连接

② 物理层使用的传输介质不同，网络的带宽、可靠性、安全性、延迟等都会有所不同

### (3) 带宽

带宽就是数据传输过程中，两个设备之间数据流动的物理速度，单位 `bps（比特每秒）`，带宽是指单位时间内传输的数据量有多少

## 4. 数据链路层

### (1) 数据链路层作用

* 物理层为数据链路层提供了二进制传输的支持，而单纯的 0、1 二进制电信号没有任何意义，数据链路层的以太网协议规定了一组二进制电信号为`数据帧`，数据帧的报头 head 就包含目标 MAC 地址和源 MAC 地址
* 数据链路层的以太网协议规定接入互联网的设备都必须具备`网卡`，并为每个网卡分配全世界唯一的 `MAC 地址（网卡地址）`，网卡用于计算机`连接局域网`，我们可以通过 MAC 地址唯一识别互联网中的设备，为网络层提供`链路级别传输`的支持

![数据链路层通信](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82%E9%80%9A%E4%BF%A1.png)

### (2) 交换机

交换机主要用于组建局域网，交换机一般至少有 8 个交换端口，可以将多台计算机连接起来，与交换机相连的计算机组成了一个局域网

### (3) 以太网协议

早期各个公司都有自己的二进制电信号分组方式，现在都统一使用以太网协议 ethernet

#### ① 网卡

数据链路层的以太网协议规定接入互联网的设备都必须具备`网卡`，并为每个网卡分配全世界唯一的 `MAC 地址（网卡地址）`，网卡用于计算机`连接局域网`，我们可以通过 MAC 地址唯一识别互联网中的设备，为网络层提供`链路级别传输`的支持

实际上 IP 地址并非根据主机或者路由器来配置的，而是根据`网卡`配置的，一块网卡可以配置多个 IP 地址，因此一台主机可以有多个 IP 地址

* **物理网卡**：安装在电脑主板上的有线或无线网卡，都有不同且唯一的网卡 MAC 地址
  * **有线网卡（ethernet）**：使用`网线`连接互联网
  * **无线网卡（wlan）**：接收`无线信号`连接互联网
  * **本机 IP**：本机 IP 通常是指同一局域网内，`可被外部设备访问`到的绑定在本机`物理网卡`上的 IP 地址
* **虚拟网卡（loopback）**：通过软件模拟网络环境构建的虚拟网络适配器，通过 `VPN` 技术实现虚拟网卡间的局域网通信
  * **回环地址（Loop back address）**：正常的数据包会从 IP 层进入链路层然后发送到网络上，而发送给回环地址 `127.*` 的数据包会直接被发送主机的 IP 层截获，直接就没有后面链路层的事了
  * **127.0.0.1**：127.0.0.1 通常作为惯例被分配给本机`虚拟网卡`，可用于本机各个应用程序之间的网络交互，由于 127.0.0.1 是回环地址，因此`不能被外部设备访问`，如果服务端套接字绑定在 127.0.0.1，客户端程序就只能在本机访问

#### ② MAC 地址

制造厂商针对每块网卡分别指定的`全世界唯一`的网卡地址，也就是 MAC 地址

* **具备唯一性**：MAC 地址可以通过制造商识别号、制造商内部产品编号、产品通用编号确保 MAC 地址的唯一性
* **不具备层次性**：无法确定哪家厂商的哪块网卡被用到了哪个地方，因此 MAC 地址不具备层次性

#### ③ 以太网数据帧

以太网协议规定一组二进制电信号构成一个数据帧，每个数据帧分成报头 head 和数据 data 两部分

* **报头 head**：发送方 MAC 地址、接收方 MAC 地址、上层协议类型
* **数据 data**：数据帧的具体内容

## 5. 网络层

### (1) 网络层作用

* 有了`以太网协议、MAC 地址、广播的传输方式`，基本上世界上所有的计算机都可以相互通信了，但是如果所有的通信都采用以太网协议的广播方式，那么一台计算机发送的数据帧全世界的计算机都会收到，这将是一种灾难
* 世界范围的互联网是由一个个局域网组成，网络层规定一个局域网是一个`广播域/子网`，以太网的广播传输方式只能在一个子网内发送，跨子网通信必须通过`路由器`转发，`所有主机和路由器`都维护一张`路由控制表`，从路由控制表中找到与 IP 报文首部的目标主机 IP 地址`相同网络号`的记录，该记录就是下一跳主机或路由器的 IP 地址，而如何由 IP 地址在网络中找到具体的设备，这就需要 `ARP 协议`通过 IP 地址解析得到 MAC 地址，在数据链路层封装成以太网数据帧传输
* 在浏览器访问网页时，用户通常输入`应用层地址（主机名、域名）`，但是主机在网络层是根据 IP 地址通信，所以需要一种将应用层地址（主机名、域名）映射为 IP 地址的功能，这就是 `DNS`
* 网络层主要负责不同子网间的`路由寻址`

![网络层通信](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E7%BD%91%E7%BB%9C%E5%B1%82%E9%80%9A%E4%BF%A1.png)

### (2) 路由器

① 路由器主要用于连接两个组建好的局域网/子网，并在不同的子网间转发 IP 报文，并通过宽带上网功能接入互联网

② 路由器同样具有交换机的连接不同计算机组建局域网的功能，但是路由器价格昂贵，而且速度没有交换机快

③ 路由器一般有 5 个端口，1 个为 WAN 端口与宽带线相连，实现宽带上网功能，其他 4 个端口相当于交换机的交换端口，可以与计算机相连，所以 1 个路由器最多可支持 4 台计算机上网，但是这 4 个端口可以与交换机相连，将每个交换机组建好的局域网连接起来，那么就可以支持更多的计算机上网

### (3) IP 协议

IP 协议就是规定网络地址的协议，其定义的网络地址也称为 IP 地址，网络层负责`实际的数据传输`，因此需要 IP 地址给主机编号用于区分主机

#### ① 面向无连接

IP 协议采用面向无连接的传输方式，在发送 IP 报文之前，无需建立与目标主机间的连接，上层如果遇到需要发送的数据，该数据会被立刻压缩成 IP 报文发送出去，无论目标主机是否存在

#### ② ipv4 地址

* IPv4 地址长度为 4 个 8 位字节，即 32 比特，
* IPv4 地址以 8 个比特为一组，每组以 . 隔开，再转成十进制表示

![IPv4地址](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/IPv4%E5%9C%B0%E5%9D%80.png)

#### ③ ipv6 地址

* IPv6 地址长度为 8 个 16 位字节，即 128 比特
* IPv6 地址以 16 位比特为一组，每组以 : 隔开，出现连续的 0 时，可以将这些 0 省略，以 :: 隔开，一个 IPv6 地址中最多允许 2 个 :: 号，再转成十六进制表示

![IPv6地址](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/IPv6%E5%9C%B0%E5%9D%80.png)

#### ④ 主机

* **主机**：配有 IP 地址但是不进行路由控制的设备
* **路由器**：配有 IP 地址并且具有路由控制的设备

### (4) DNS

**由来**：在浏览器访问网页时，用户通常输入`应用层地址（主机名、域名）`，但是主机在网络层是根据 IP 地址通信，所以需要一种将应用层地址（主机名、域名）映射为 IP 地址的功能

### (5) ARP 协议

**由来**：计算机网络通信中，网络层的 IPv4 报文，最后都要在数据链路层封装成以太网数据帧，然后通过以太网协议发送，因此需要通过下一跳主机或路由器的 IP 地址获取其 MAC 地址

### (6) ICMP 协议

#### ① ICMPv4 协议

**由来**：IP 协议采用面向无连接的传输方式，IP 协议做不到最终收到与否的验证，IP 报文在发送途中可能出现丢包、错位、数量翻倍等问题，因此提高通信的可靠性很重要

#### ② ICMPv6 协议

**由来**：ARP 协议仅适用于 IPv4 地址，ICMPv6 协议不仅仅具有 ICMPv4 协议的异常通知功能，还包含 ARP 协议的探索下一跳路由器或者目标主机的 MAC 地址的功能

### (7) DHCP 协议

**由来**：逐一为每台主机设置 IP 地址非常繁琐，特别是移动使用笔记本的时候，每移动到一个新地方都需要重新设置 IP 地址，DHCP 协议实现了计算机连网后自动获取 IP 地址的功能

## 6. 传输层

### (1) 传输层作用

* 网络层的 IP 地址用来区分子网，数据链路层的 MAC 地址用来寻找计算机，但是大家在计算机上使用的都是应用程序，一台计算机可能同时打开 QQ、爱奇艺等多个应用程序，我们通过端口来标识一台主机上的不同应用程序
* 传输层主要负责`通过端口识别一台计算机上的不同应用程序`

### (2) 端口

端口号用来标识一台主机上进行通信的不同应用程序

#### ① 端口的范围

端口号的范围是 `0 ~ 65535`

#### ② 端口的类型

* **知名端口号**：HTTP、FTP 等广为使用的应用层协议使用的端口号，知名端口号是固定的，一般由 `0 ~ 1023` 的数字分配而成
* **注册端口号**：一些被正式注册的端口号，一般由 `1024 ~ 49151` 的数字分配而成，注册端口号可用于任何通信用途
* **操作系统分配端口号**：客户端应用程序无需自己设置端口号，操作系统为每个应用程序分配互不冲突的端口号，这样操作系统就可以动态管理端口号，一般由 `49152 ~ 65535` 的数字分配而成

### (3) TCP 协议

TCP 协议是一种面向有连接的传输层协议

### (4) UDP 协议

UDP 协议是一种面向无连接的传输层协议

## 7. 应用层

### (1) 应用层作用

* 用户使用的都是计算机上的应用程序，应用程序多种多样，数据也多种多样，就必须规范好数据的组织形式，避免传输后发生`数据乱码`的情况
* 应用层规定计算机上各种应用程序的`标准数据格式`，将某个应用程序特有的数据格式，转换成网络标准数据格式

### (2) 网关

网关是一种充当转换重任的应用程序，使用在`不同通信协议、数据格式、语言的网络之间`，两边的计算机必须要经过网关才能通信，网关会将收到的信息翻译后重新打包转发，以适应目的网络

* 网关工作在`应用层`
* 网关可以是`交换机、路由器`

例如一个主机执行的是 ISO 电子邮件标准，另一个主机执行的是 Internet 电子邮件标准，如果这两个主机需要交换电子邮件，那么必须经过一个`应用层的电子邮件网关`进行`协议转换`才能实现通信

### (3) 浏览器（HTTP）

用户在一种叫做浏览器的软件上借助鼠标和键盘就可以轻松上网，浏览器中既可以显示文字、图片、动画等信息，还能播放声音以及运行程序

![Web浏览器](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/Web%E6%B5%8F%E8%A7%88%E5%99%A8.png)

### (4) 电子邮件（SMTP）

网络上发送电子邮件使用的协议是 SMTP 协议，最初只能发送文本格式的电子邮件，现在电子邮件的格式由 MIME 协议扩展后，可以发送声音、图像等各式各样的信息，还可以修改邮件文字的大小、颜色，

#### 多用途互联网邮件扩展（MIME）

① MIME 是一种描述消息内容类型的因特网标准，最早应用于邮件系统，后来也应用到浏览器，用来表示文档、文件、字节流的性质和格式

② 常见的 MIME 类型如下：

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
* ...

![电子邮件](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E7%94%B5%E5%AD%90%E9%82%AE%E4%BB%B6.png)

### (5) 文件传输（FTP）

文件传输是指将保存在其他计算机硬盘的文件下载到本地硬盘，或者将本地硬盘上的文件上传到其他计算机硬盘，文件传输使用的协议是 FTP 协议，传输过程可以选择用二进制方式还是文本方式

![文件传输](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E6%96%87%E4%BB%B6%E4%BC%A0%E8%BE%93.png)

### (6) 远程登录（TELNET、SSH）

远程登录是指登录到远程的计算机上，使那台计算机上的程序得以运行的一种功能，TCP/IP 网络中远程登录常用 TELNET、SSH 两种协议

![远程登录](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95.png)

### (7) 网络管理（SNMP）

① 在 TCP/IP 中进行网络管理时，采用 SNMP (Simple Network Management Protocol) 协议，使用 SNMP 协议管理的计算机、路由器等称为 SNMP 代理，进行管理的称为管理器，SNMP 协议的代理端保存网络接口的信息、通信数据量、异常数据量、设备温度等信息，这些信息可以通过 MIB (Management Infomation Base) 访问

② 一个网络范围越大，结构越复杂，就越需要对其进行有效的管理，而 SNMP 协议可以及时让管理员查看网络堵塞情况，及早发现故障，也可以为以后扩大网络收集必要的信息

## 8. TCP/IP 网络通信

![TCPIP网络通信](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/TCPIP%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1.png)
