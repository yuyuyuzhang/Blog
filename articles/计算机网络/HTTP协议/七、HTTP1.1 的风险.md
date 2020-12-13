# 七、HTTP/1.1 的风险

[[_TOC_]]

## 1. HTTP/1.1 的风险

HTTP 通信是不加密的通信，所有信息明文传播，带来了三大风险

### (1) 窃听风险 ( 加密技术 )

第三方可以获知通信内容

### (2) 篡改风险 ( 完整性校验 )

第三方可以修改通信内容

### (3) 冒充风险 ( 身份认证技术 )

第三方可以冒充他人身份参与通信

## 2. HTTP 通信使用明文 ( 窃听风险 )

### (1) 被窃听的互联网

* 互联网是由能连接到全世界的网络组成的，无论世界上哪个角落的服务器在和客户端通信时，通信线路上的某些网络设备、光缆、计算机等都不可能是个人的私有物，所以不排除某个通信环节遭到恶意窥视的可能
* 窃听同一数据链路上的通信并不是难事，只需要收集互联网上流动的`数据帧`，对于收集来的数据帧的解析工作，可以交给那些`抓包工具`或者嗅探器工具
  
![被窃听的互联网](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%E5%8D%8F%E8%AE%AE/%E8%A2%AB%E7%AA%83%E5%90%AC%E7%9A%84%E4%BA%92%E8%81%94%E7%BD%91.png)

### (2) HTTP 没有加密技术

HTTP 协议不存在加密技术，无法对通信过程中传输的报文进行加密，因此存在三大风险

## 3. HTTP 无法确认明文的完整性 ( 篡改风险 )

**完整性**：是指`信息的准确度`，无法确认信息的完整性也就意味着无法判断信息是否准确

### (1) HTTP 的完整性校验

① HTTP 协议中，客户端和服务器通过实体首部字段 `Content-MD5` 来校验报文的完整性

② 服务器的 Content-MD5 字段用于让客户端校验响应报文是否完整，Content-MD5 字段是服务器对响应报文主体执行 MD5 算法后再通过 Base64 编码得到的值，客户端在收到响应报文后，对响应报文主体执行相同的 MD5 算法后，得到的值与响应报文的 Content-MD5 字段解码后的值进行对比，用于校验响应报文主体在传输过程中是否保持完整

![Content-MD5](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%E5%8D%8F%E8%AE%AE/Content-MD5.png)

### (2) HTTP 无法百分百确认明文的完整性

Content-MD5 字段也无法百分百确认报文的完整性，因为 `MD5 值本身被改写`的话，用户是无法察觉的

## 4. HTTP 无法确认通信双方的身份 ( 冒充风险 )

### (1) 身份认证

HTTP 协议通信需要确认客户端和服务器的身份，否则会导致以下两种问题，针对以下问题，HTTP 协议有 Basic 认证和 Digest 认证两种身份认证方式

① 无法确定请求发送至的服务器，是否是请求 URI 真正指定的服务器，有可能是已伪装的服务器

② 无法确定响应返回到的客户端，是否是实际发送请求的客户端，有可能是已伪装的客户端

### (2) Basic 认证

① 客户端发送 HTTP 请求，请求需要认证的资源

② 服务器返回状态码 `401 Authorization Required`，响应首部字段 `WWW-Authenticate` 包含认证方式 (Basic)、realm 字符串

③ 客户端收到服务器发来的 Basic 认证质询时，将`用户 ID 和密码`以冒号 `:` 连接然后经过 Base64 编码处理，再通过 `Authorization` 字段告知服务器

④ 服务器收到认证信息后，如验证通过，则返回状态码 200 OK

![BASIC](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/BASIC.png)

### (3) Digest 认证

① 客户端发送 HTTP 请求，请求需要认证的资源

② 服务器返回状态码 `401 Authorization Required`，响应首部字段 `WWW-Authenticate` 包含认证方式 (Digest)、realm 字符串、质询码 nonce (生成的随机数)

③ 客户端收到服务器发来的 Digest 认证质询时，由`密码`经过 MD5 算法计算出响应码 response，再将包含 realm、nonce、response、uri (请求 URI)、username (realm 限定范围内可进行认证的用户名) 这 5 个字段的 `Authorization` 字段告知服务器

④ 服务器收到认证信息后，如验证通过，则返回状态码 200 OK

![DIGEST](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/DIGEST.png)

### (4) 基于表单认证

① 客户端向服务器上的 Web 应用程序发送登陆信息，按登陆信息的验证结果认证`用户本人`

② 基于表单认证通过后，需要通过 Cookie 管理认证状态

![基于表单认证](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/%E5%9F%BA%E4%BA%8E%E8%A1%A8%E5%8D%95%E8%AE%A4%E8%AF%81.png)

### (5) HTTP 无法百分百确认通信方的身份

① Basic 认证中，客户端通过 Authorization 字段向服务器发送用户 ID 和密码时，并没有加密处理，因此不需要任何附加信息就可以对其解码，被窃听和盗取的可能性极高

② Digest 认证提供了防止密码被窃听或篡改的保护机制，但并不存在防止用户伪装的机制

③ 基于表单认证，只能认证用户本人，无法认证客户端计算机

由于 Basic 认证和 Digest 认证的安全等级过低，无法百分百确认通信方的身份，并且使用上不那么便捷灵活，因此几乎不使用这两者认证方式
