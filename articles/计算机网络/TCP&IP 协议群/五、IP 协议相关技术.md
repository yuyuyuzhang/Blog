# 五、IP 协议相关技术

[[_TOC_]]

## 1. DNS

**由来**：在浏览器访问网页时，用户通常输入`应用层地址（主机名、域名）`，但是主机在网络层是根据 IP 地址通信，所以需要一种将应用层地址（主机名、域名）映射为 IP 地址的功能

### (1) 主机名 & 域名

#### ① 单一主机名

单一主机名是为每台计算机赋予的唯一主机名（实际上并不唯一），用来替换不便于用户记忆的 IP 地址

#### ② 域名

* 域名是用于识别组织机构名称的一种具有分层的名称
* 域名是分层管理的：`.` 三级域名 `.` 二级域名 `.` 一级域名
* 若服务器返回的 HTTP 响应报文中 `Set-Cookie 字段设置 HttpOnly`，则无法在 JS 脚本中通过 document.domain 获取 Cookie

```js
document.domain //返回/设置当前文档域名
```

#### ③ 带域名的主机名

带域名的主机名是互联网上某一台计算机或某一组计算机的名称，用于识别单一主机名和具有分层结构的组织机构名称，带域名的主机名互联网`唯一`

![url]()

```js
//新浪博客：http://blog.sina.com.cn

单一主机名：blog
域名：.sina.com.cn (.sina代表新浪 .com代表商业机构 .cn代表中国)
带域名的主机名：blog.sina.com.cn
```

```js
//百度网：https://www.baidu.com
console.log(url.hostname);    //"www.baidu.com"
console.log(document.domain); //"www.baidu.com"

//新浪网：https://www.sina.com.cn
console.log(url.hostname);    //"www.sina.com.cn"
console.log(document.domain); //"sina.com.cn"

//新浪博客：http://blog.sina.com.cn
console.log(url.hostname);    //"blog.sina.com.cn"
console.log(document.domain); //"sina.com.cn"
```

### (2) 域名服务器 DNS

① 域名服务器 DNS（Domain Name Server）是进行域名和与之对应的 IP 地址相互转换的服务器

② 从根域名服务器开始，各层域名服务器呈树状结构相互连接，每个域名服务器都了解该层下一层所有域名服务器的 IP 地址，所以若从根域名服务器开始追踪，可以访问世界上所有域名服务器

③ 所有域名服务器都必须注册根域名服务器的 IP 地址，因为根据 IP 地址进行检索时，需要从根域名服务器开始按顺进行

![域名服务器](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8.png)

### (3) 域名检索

以百度网为例：https://www.baidu.com

① 用户在浏览器地址栏输入网址，浏览器先检测本地缓存中是否有之前的查询记录，有就直接读取结果，没有就则向本地 DNS 服务器发送查询请求，本地 DNS 服务器没有就需要向根服务器发送请求，根服务器管理所有顶级域名，再没有就依次向下级域名服务器发送请求

② 用户在浏览器地址栏输入一个域名，浏览器向这个用户的`上网接入商`发出域名请求，接入商的域名服务器 DNS 查询域名数据库，找到该域名对应的 IP 地址，接入商的服务器去这个 IP 地址对应的服务器上抓取网页内容，然后传输给发出请求的浏览器

![域名检索](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/%E5%9F%9F%E5%90%8D%E6%A3%80%E7%B4%A2.png)

## 2. ARP 协议

### (1) ARP 协议

**由来**：计算机网络通信中，网络层的 IPv4 报文，最后都要在数据链路层封装成以太网数据帧，然后通过以太网协议发送，因此需要通过下一跳主机或路由器的 IP 地址获取其 MAC 地址

**限制**：ARP（Address Resolution Protocol）协议只适用于 IPv4 地址

① ARP 协议借助 ARP 请求和 ARP 响应两种类型的包，通过`广播`传输方式，确定下一跳路由器或者接收方主机的 MAC 地址，实现子网内的 IP 通信

② 同一局域网/广播域/子网内的主机 A 需要向主机 B 发送 IP 报文，通过路由控制表主机 A 可以知道主机 B 的 IP 地址，主机 A 在子网内`广播`发送一个 ARP 请求包，请求包中包含主机 B 的 IP 地址，同一子网内的所有主机和路由器都会收到这个广播请求包，然后和自己的 IP 地址对比，如果一致则将自己的 MAC 地址塞入 ARP 响应包返回给主机 A

③ 每发送一个 IP 报文都要进行一次 ARP 请求会造成不必要的网络流量，通常的做法是将每次 ARP 请求获取到的 MAC 地址缓存到下一次 ARP 请求完成

![ARP协议](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/ARP%E5%8D%8F%E8%AE%AE.png)

### (2) RARP 协议

**由来**：平时我们可以通过个人电脑设置 IP 地址，还可以通过 DHCP 服务器自动分配获取 IP 地址，但是对于嵌入式设备来说，没有任何输入接口并且无法通过 DHCP 服务器动态获取 IP 地址，这种情况下，就需要 RARP 协议

①  RARP（Reverse Address Resolution Protocol）协议和 ARP 协议相反，是从 MAC 地址定位 IP 地址的一种协议

② 先架设一台 RARP 服务器，在服务器上注册嵌入式设备的 MAC 地址和 IP 地址，再将嵌入式设备接入到网络，插电启动设备时，设备会向 RARP 服务器发送一条信息，表明自身的 MAC 地址，并且请求自身的 IP 地址，然后设备根据 RARP 服务器的返回结果设置自己的 IP 地址

![RARP协议](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/RARP%E5%8D%8F%E8%AE%AE.png)

### (3) 代理 ARP

**由来**：普通 ARP 请求响应包会被路由器隔离，但是采用代理 ARP 的路由器会将 ARP 请求响应包转发给相邻的子网

## 3. ICMP 协议

### (1) ICMPv4 协议

**由来**：IP 协议采用面向无连接的传输方式，IP 协议做不到最终收到与否的验证，IP 报文在发送途中可能出现丢包、错位、数量翻倍等问题，因此提高通信的可靠性很重要

① ICMPv4 协议的主要功能包括确认 IP 报文是否成功到达目标主机，通知在发送过程中 IP 报文被丢弃的具体原因，改善网络设置等，从而便于进行网络上的问题诊断

② 主机 A 向主机 B 发送 IP 报文，由于某种原因，途中的路由器 2 未能发现主机 B 的存在，那么路由器 2 就会向主机 A 发送一个 ICMPv4 包，说明发往主机 B 的 IP 报文未能成功，主机 A 分解 ICMPv4 包的首部和数据域得知发生问题的具体原因

![ICMPv4协议](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/ICMPv4%E5%8D%8F%E8%AE%AE.png)

### (2) ICMPv6 协议

**由来**：ARP 协议仅适用于 IPv4 地址，ICMPv6 协议不仅仅具有 ICMPv4 协议的异常通知功能，还包含 ARP 协议的探索下一跳路由器或目标主机的 MAC 地址的功能

① ICMPv6 协议通过`组播`传输方式，确定下一跳路由器或者接收方主机的 MAC 地址，实现子网内的 IP 通信

② 同一局域网/广播域/子网内的主机 A 需要向主机 D 发送 IP 报文，通过路由控制表主机 A 可以知道主机 D 的 IP 地址，主机 A 在子网内`组播`发送一个邻居请求消息，只有`支持 IPv6` 的路由器和主机才会收到这个组播消息，主机 D 通过邻居宣告消息告知主机 A 自己的 MAC 地址

![ICMPv6协议](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/ICMPv6%E5%8D%8F%E8%AE%AE.png)

## 4. DHCP 协议

**由来**：逐一为每台主机设置 IP 地址非常繁琐，特别是移动使用笔记本的时候，每移动到一个新地方都需要重新设置 IP 地址，DHCP 协议实现了计算机连网后自动获取 IP 地址的功能

### (1) DHCP 工作原理

① DHCP（Dynamic Host Configuration Protocol）协议实现了自动设置 IP 地址，统一管理 IP 地址分配的功能，有了 DHCP 协议，计算机只要连接到网络，就可以自动获取 IP 地址，进行 TCP/IP 通信

② 首先架设一台 DHCP 服务器，然后将要分配的 IP 地址设置到 DHCP 服务器上，还需要设置相应的子网掩码、路由控制信息、DNS 服务器的地址等等

③ 为了避免 DHCP 服务器遇到故障，导致子网内所有主机都无法进行 TCP/IP 通信，通常会架设两台及以上的 DHCP 服务器，不过启动多个 DHCP 服务器，可能会导致分配的 IP 地址相互冲突

![DHCP协议](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/DHCP%E5%8D%8F%E8%AE%AE.png)

### (2) DHCP 中继器

#### ① 小型网络

家庭网络这种小型网络一般只需要一台 DHCP 服务器就可以满足 IP 地址分配的需求，这种情况下一般都由`宽带路由器`充当这个 DHCP 服务器的角色

#### ② 大型网络

企业或学校等大规模组织机构的大型网络中，一般会有多个子网，这种情况下，将 DHCP 服务器的功能分设到各个路由器上，对管理和运维都不是一件有益的事，因此在这类网络环境中，往往需要一个 `DHCP 服务器`统一管理，即由每个子网的`宽带路由器`充当 `DHCP 中继代理`的角色，在 DHCP 服务器上为每个子网注册 IP 地址的分配范围

## 5. NAT 技术

### (1) NAT

**由来**：没有连接互联网的私有网络中的主机配有私有 IP，而当私有网络中的主机想要访问互联网时，转而使用全局 IP 的技术就是 NAT

① NAT 路由器的内部，有一张自动生成的用来转换私有 IP 和全局 IP 的表，当私有 IP 第一次连接互联网发送第一个 IP 报文时，NAT 路由器生成这张表，并按照表中的映射关系进行处理

② 配置私有 IP：10.0.0.10 的主机与配置全局 IP：163.221.120.9 的主机通信时，途中的 NAT 路由器先将私有 IP：10.0.0.10 转换成全局 IP：202.244.174.37 再发送 IP 请求报文，目标主机返回响应报文时，NAT 路由器又将全局 IP：202.244.174.37 转换为私有 IP：10.0.0.10 再发送 IP 响应报文

③ 私有 IP 结合 NAT 技术已经成为解决 IPv4 地址分配问题的主流方案，现在很多学校、公司内部正在采用每个主机配置私有 IP，路由器配置全局 IP 的方式

![NAT技术](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/NAT%E6%8A%80%E6%9C%AF.png)

### (2) NAPT

**由来**：当私有网络中的多台主机都要连接互联网时，仅仅转换 IP 地址会担心全局 IP 是否够用的问题，因此产生了包含端口号一起转换的技术 NAPT，这样可以将私有网络中的私有 IP 都转换为同一个全局 IP，但是端口号不同

![NAPT技术](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/NAPT%E6%8A%80%E6%9C%AF.png)

## 6. IPv4 和 IPv6 通信

### (1) NAT-PT

**由来**：IPv4 报文首部和 IPv6 报文首部不同，那么 IPv4 地址的主机和 IPv6 地址的主机之间就无法相互通信，NAT-PT 正是将 IPv6 报文首部转换成 IPv4 报文首部的一种技术

![NAT-PT技术](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/NAT-PT%E6%8A%80%E6%9C%AF.png)

### (2) IP 隧道

**由来**：IPv4 报文首部和 IPv6 报文首部不同，那么支持 IPv4 的子网和支持 IPv6 的子网之间就无法相互通信，IP 隧道正是将支持 IPv6 的子网发来的 IP 报文统合成一个数据，再追加一个 IPv4 报文首部之后转发给支持 IPv4 的子网的技术

![IP隧道](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/IP%E9%9A%A7%E9%81%93.png)

## 7. Mobile IP

**由来**：移动设备每移动一个位置，就会连接到不同的子网，由 DHCP 分配不同的 IP 地址，而 IP 地址的变更会引起通信的中断，若传输层使用 TCP 协议，TCP 协议采用面向有连接的传输方式，自始至终都要求通信双方的 IP 地址不发生变化，若传输层使用 UDP 协议，UDP 协议采用面向无连接的传输方式，需要在应用层处理 IP 地址变更的问题，而改造所有应用让其适应 IP 地址变更非常困难，正因如此，移动位置后主机 IP 保持不变的 Mobile IP 技术诞生

① 归属网络：移动设备未移动时连接的网络

② 归属地址：移动设备未移动时的主机 IP

③ 归属代理：处于归属网络下，可监控移动设备的位置，并转发数据给移动设备

④ 外部代理：所有需要接入网络的移动设备都需要它

![MobileIP](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/TCP%26IP%20%E5%8D%8F%E8%AE%AE%E7%BE%A4/MobileIP.png)
