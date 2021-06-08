# 八、HTTPS

[[_TOC_]]

## 1. HTTPS 的诞生

① HTTPS (HTTP Secure) 并非一种新的应用层协议，而是 HTTP 协议的通信接口部分用 SSL/TLS 协议代替，这样 HTTP 就拥有了 SSL/TLS 协议的加密技术、校验机制、身份认证等功能

② HTTPS = HTTP + 加密技术 + 校验机制 + 身份认证技术

![HTTPS](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/HTTPS.png)

## 2. HTTPS 的加密技术

### (1) 加密技术的种类

#### ① 加密技术的由来和原理

一般情况下，网页访问、电子邮件等互联网上流动的数据不会被加密，因此通常无法避免这些信息会被泄露给第三方，为了防止这些信息的泄露、实现机密数据的传输，出现了各种各样的加密技术

![加密技术](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E5%8A%A0%E5%AF%86%E6%8A%80%E6%9C%AF.png)

利用某个值 (密钥) 将明文数据通过一定的算法变成加密数据的过程，其逆反过程为解密

![加密解密](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86.png)

#### ② 共享密钥加密

加密和解密使用同一个密钥的方式

* 客户端生成一个共享密钥
* 客户端将共享密钥发送给服务器
* 客户端将要发送的数据通过自身的共享密钥加密之后再发送，服务器收到密文后，使用客户端的共享密钥将密文解密恢复成原文

![共享密钥加密](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E5%85%B1%E4%BA%AB%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86.png)

* **优势**：共享密钥加密方式处理简单，速度快，效率高
* **缺陷**：共享密钥加密方式，客户端需要将共享密钥发送给服务器，但是共享密钥可能在发送途中被篡改

  ![共享密钥加密-发送密钥](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E5%85%B1%E4%BA%AB%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86-%E5%8F%91%E9%80%81%E5%AF%86%E9%92%A5.png)

#### ③ 公开密钥加密

加密使用公钥，解密使用私钥的方式

* 服务器生成一对私钥和公钥
* 服务器将公钥通过 Web 公开或邮件发送给客户端，客户端使用服务器的公钥将明文加密之后再发送，服务器收到密文后，使用自己的私钥将密文解密恢复成原文

  ![公钥加密方式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E5%85%AC%E9%92%A5%E5%8A%A0%E5%AF%86%E6%96%B9%E5%BC%8F.png)

* **优势**：使用公钥将密文恢复到原文十分困难，因此公开密钥加密方式十分安全，就目前的技术来说，破解不太现实
* **缺陷**
  * 公开密钥加密方式，服务器需要将公钥发送给客户端，但是公钥可能在发送过程中被篡改
  * 公开密钥加密方式处理相对复杂，因此速度更慢、效率更低

#### ④ 混合加密方式

客户端和服务器通过公开密钥加密方式发送共享密钥，然后通过共享密钥加密方式进行安全通信的方式

* 客户端生成一个共享密钥，服务器生成一对公钥私钥
* 服务器将公钥通过 Web 公开或邮件发送给客户端，客户端使用服务器的公钥将自身的共享密钥加密之后再发送，服务器收到密文后，使用自己的私钥将密文解密恢复成共享密钥
* 客户端将要发送的数据通过自身的共享密钥加密之后再发送，服务器收到密文后，使用客户端的共享密钥将密文解密恢复成原文

![混合加密方式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E6%B7%B7%E5%90%88%E5%8A%A0%E5%AF%86%E6%96%B9%E5%BC%8F.png)

* **优势**：混合加密方式结合了共享密钥加密和公开密钥加密两者的优势，比共享密钥加密方式更加安全，又比公开密钥加密方式速度快、效率高
* **缺陷**：混合加密方式，服务器需要将公钥发送给客户端，但是公钥可能在发送过程中被篡改

#### ⑤ 公钥证书

解决加密技术中，公钥在传输过程中可能被篡改或替换的问题，公钥使用公钥证书证明自己的身份

* 数字证书认证机构是处于客户端和服务器双方都信赖的第三方机构的立场
* 首先服务器的运营人员向数字证书认证机构提出公钥申请，数字证书认证机构判明申请者的身份之后，使用自身的私钥对申请的公钥进行数字签名，然后将这个已签名的公钥放入公钥证书后绑定在一起
* 然后服务器将这份公钥证书发送给客户端，收到证书的客户端，使用数字证书认证机构的公钥 (浏览器开发商发布版本时，事先内部植入常用认证机构的公钥) 对证书上的数字签名进行验证，一旦验证通过，就可以证明这个公钥是可以信赖的

![证书](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E8%AF%81%E4%B9%A6.png)

### (2) HTTPS 的加密技术

HTTPS 采用`混合加密方式 + 公钥证书`的加密方式

## 3. HTTPS 的完整性校验

HTTPS 使用加密技术，能够避免窃听风险、篡改风险，则无需完整性校验

## 4. HTTPS 的身份认证技术

### (1) SSL 服务器认证

#### ① SSL 证书

* SSL 证书一是证明作为通信一方的服务器真实存在且规范
* SSL 证书二是证明该服务器背后运营的企业真实存在

#### ② SSL 服务器认证

SSL 服务器认证是利用 SSL 证书完成认证的方式，客户端凭借 SSL 证书可确认访问的服务器真实存在且规范，并且服务器背后运营的企业真实存在

![SSL服务器认证](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/SSL%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%AE%A4%E8%AF%81.png)

### (2) SSL 客户端认证

#### ① 客户端证书

* 客户端证书只能证明作为通信一方的客户端真实存在且规范
* 客户端证书无法证明用户本人的真实有效性，只要获得了安装有客户端证书的计算机的使用权限，也就意味着同时拥有了客户端证书的使用权限
* 从认证机构购买客户端证书需要支付一定费用

#### ② SSL 客户端认证

SSL 客户端认证是利用客户端证书完成认证的方式，服务器凭借客户端证书可确认访问自己的客户端

* 客户端发送 HTTP 请求，请求需要认证的资源
* 服务器返回 Certificate Request 报文，要求客户端提供客户端证书
* 用户选择将要发送的客户端证书后，客户端将选择好的证书信息以 Client Certificate 报文方式发送给服务器
* 服务器验证客户端证书通过后，领取证书内的`客户端的公钥`，然后开始 HTTPS 加密通信

![SSL客户端认证](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/SSL%E5%AE%A2%E6%88%B7%E7%AB%AF%E8%AE%A4%E8%AF%81.png)

### (3) 双因素认证

① HTTPS 的 SSL 客户端认证：认证客户端计算机

② 基于表单认证：认证用户本人

双因素认证就是将 HTTPS 的 SSL 客户端认证和 HTTP 的基于表单认证结合起来的一种认证方式，通过双因素认证，就可以确认是用户本人正在使用匹配正确的计算机访问服务器

## 5. HTTPS 的通信

通常 HTTP 直接和 TCP 通信，而 HTTPS 则是 HTTP 先和 SSL 通信，再由 SSL 和 TCP 通信

![HTTP和HTTPS对比](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/HTTP%E5%92%8CHTTPS%E5%AF%B9%E6%AF%94.png)

### (1) TCP 连接

TCP 连接三次握手和四次挥手

![持久连接](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E6%8C%81%E4%B9%85%E8%BF%9E%E6%8E%A5.png)

### (2) SSL 连接

SSL/TLS 连接只有握手阶段，没有挥手阶段

① 客户端发送 ClientHello 报文

* Version：客户端支持的 SSL 版本
* Random1：随机数，用于生成共享密钥
* Cipher Suite：客户端支持的加密组件列表，一个加密组件包含 4 个功能：信息摘要算法、身份认证算法、共享密钥加密算法、公开密钥加密算法

② 服务器返回 ServerHello 报文

* Version：确认通信使用的 SSL 版本
* Random2：随机数，用于生成共享密钥
* Cipher Suite：确认通信使用的加密组件，从客户端的加密组件列表中筛选出来的，如果服务器不支持客户端提供的加密组件列表，服务器返回握手故障并且断开连接

③ 服务器发送 Certificate 报文，包含服务器的公钥证书：用于证明服务器的公钥身份

④ 服务器发送 ServerHelloDone 报文，通知客户端 SSL 第一次握手阶段结束

⑤ 客户端发送 ClientKeyExchange 报文，包含客户端的共享密钥 ( 使用 Random1、Random1、协商后的共享密钥加密算法生成 )，该报文已经使用服务器的公钥加密

⑥ 客户端发送 ChangeCipherSpec 报文，通知服务器此报文之后的通信都会采用共享密钥加密

⑦ 客户端发送 Finished 报文，报文包含此次连接至今的全部报文的整体校验值，该报文使用共享密钥加密，这次握手协商能否成功，要以服务器能否正确解密该报文作为判定标准

⑧ 服务器发送 ChangeCipherSpec 报文，通知客户端自己已经获得共享密钥，此报文之后的通信都会采用共享密钥加密，服务器使用自己的私钥解密 ClientKeyExchange 报文获得共享密钥

⑨ 服务器发送 Finished 报文，该报文使用共享密钥加密，客户端和服务器的 Finished 报文交换完毕，SSL 连接就算建立完成，从此处开始进行 HTTP 协议的通信

![SSL连接](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/SSL%E8%BF%9E%E6%8E%A5.png)

### (3) HTTPS 的通信

先建立 TCP 连接，再建立 SSL 连接，之后进行 HTTP 通信，然后再断开 TCP 连接

![HTTPS通信](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/HTTPS%E9%80%9A%E4%BF%A1.png)

### (4) HTTPS 比 HTTP 慢

使用 SSL 协议时，HTTPS 比 HTTP 慢 2 到 100 倍

#### ① 通信慢

HTTPS 比 HTTP 多了进行 `SSL 通信`的过程，整体上处理通信量会不可避免的增加，导致网络负载加大，通信变慢

#### ② 处理速度慢

SSL 必须进行加密处理，客户端和服务器都需要进行`加密和解密的运算处理`，因此 HTTPS 比 HTTP 会更多地消耗客户端和服务器的 CPU 和内存等硬件资源，导致硬件负载加强，处理速度变慢

![HTTPS通信慢](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/HTTPS%E9%80%9A%E4%BF%A1%E6%85%A2.png)

## 6. HTTP 升级至 HTTPS

### (1) 购买 SSL 证书

① SSL 证书分为 DV、OV、EV 三种类型

* **DV ( 域名型 SSL )**：个人站点、iOS应用分发站点、登陆等单纯 HTTPS 加密需求的链接
* **OV ( 企业型 SSL )**：企业官网
* **EV ( 增强型 SSL )**：对安全需求更强的企业官网、电商、互联网金融网站

② SSL 证书的部署类型又分为了单域名、多域名、通配符三种类型

* **单域名**：保护主域名
* **多域名**：保护主域名下同一级的指定数量的子域名
* **通配符**：保护主域名下同一级所有的子域名，例如 123.com 申请通配符证书时，csr 域名填写为 \*.123.com，* 可以是任何前缀

### (2) 安装 SSL 证书

SSL 证书购买完成后，下载证书文件，以 `Nginx 服务器`为例，说明如何在服务器上安装/配置 SSL 证书

① 首先在 Nginx 的安装目录下创建 cert 目录，将下载的全部证书文件拷贝到 cert 目录

② 打开 Nginx 安装目录下 conf 目录中的 nginx.conf 文件，找到 HTTPS server 部分，指定证书路径，如下示意并保存，然后重启 Nginx 就可以使用 HTTPS 访问

```javascript
server {
  listen 443;
  server_name localhost;
  root html;
  index index.html index.htm;

  //SSL配置
  ssl                       on; //开启SSL
  ssl_certificate           cert/你的证书文件名.pem; //证书位置
  ssl_certificate_key       cert/你的证书文件名.key; //私钥位置
  ssl_session_timeout       5m;
  ssl_ciphers               ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; //加密方式
  ssl_protocols             TLSv1 TLSv1.1 TLSv1.2; //SSL/TLS协议版本
  ssl_prefer_server_ciphers on; //依赖SSLv3和TLSv1协议的服务器密码将优先于客户端密码

  location / {
    root html;
    index index.html index.htm;
  }

  return 301 https://$server_name$request_uri; //HTTP重定向至HTTPS
}
```
