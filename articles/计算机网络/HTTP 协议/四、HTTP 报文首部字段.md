# 四、HTTP 报文首部字段

[[_TOC_]]

## 1. HTTP 报文

**HTTP 请求报文**

![HTTP请求报文](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/HTTP%E8%AF%B7%E6%B1%82%E6%8A%A5%E6%96%87.png)

**HTTP 响应报文**

![HTTP响应报文](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/HTTP%E5%93%8D%E5%BA%94%E6%8A%A5%E6%96%87.png)

## 2. 请求首部字段

请求报文特有的首部字段，用于补充请求的附加信息、客户端信息、对响应内容相关的优先级等内容

![请求首部字段](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E8%AF%B7%E6%B1%82%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5.png)

### (1) User-Agent

客户端的 User-Agent 字段用于告知服务器，客户端浏览器的用户代理字符串，表示浏览器厂商和版本信息

![User-Agent](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/User-Agent.png)

### (2) Accept

客户端的 Accept 字段用于通知服务器，客户端用户代理支持的媒体类型及优先级，媒体类型可以后跟 `q = 0 到 1 的精确到小数点后三位的数值`来额外表示权重值，媒体类型用分号 `;` 进行分割，服务器会优先返回权重值最高的媒体类型

![Accept](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Accept.png)

### (3) Accept-Charset

客户端的 Accept-Charset 字段用于通知服务器，客户端用户代理支持的字符集及优先级，写法与 Accept 字段相同

### (4) Accept-Encoding

客户端的 Accept-Encoding 字段用于通知服务器，客户端用户代理支持的内容编码及优先级，写法与 Accept 字段相同，也可使用星号 `*` 指定任意的编码格式

### (5) Accept-Language

客户端的 Accept-Language 字段用于通知服务器，客户端用户代理支持的自然语言及优先级，写法与 Accept 字段相同

### (6) TE

客户端的 TE 字段用于通知服务器，客户端支持的分块传输编码方式及优先级，写法与 Accept 字段相同，TE 字段属于端到端首部字段，在`整个传输过程`中有效

### (7) Referer

**引荐人**：谁引荐了你？，你从哪里知道了我？

客户端的 Referer 字段用于通知服务器，客户端发送当前请求的引荐人

![Referer](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Referer.png)

#### ① 发送 Referer 字段的场景

以下三种场景，浏览器发送 HTTP 请求时，会将`当前网址`添加到请求首部字段 Referer，通知服务器当前请求的引荐人

* 网页加载静态资源，比如请求图片、CSS 样式文件、JS 脚本
  
  ```html
  <!-- 加载图片 -->
  <img src="foo.jpg">

  <!-- 加载样式 -->
  <link rel="stylesheet" href="foo.css">

  <!-- 加载脚本 -->
  <script src="foo.js"></script>
  ```

* 用户点击网页上的链接
  
  ```html
  <a href="..." target="_blank">xxx</a>
  ```

* 用户发送表单
  
  ```html
  <form>
    姓名：<input type="text" name="username" />
    <button>提交</button>
  </form>
  ```

#### ② Referer 字段的应用

Referer 字段告知服务器当前请求的引荐人，这往往可以用来用户跟踪

* 有些网站不允许自家的图片外链，只有自家网站才能显示图片，外部网站加载图片就会报错，其实现就是基于请求图片的 Referer 字段，如果是自家网站就放行
* 有些网站无需登陆就可以访问，能直接完成密码重置、邮件退订等功能，这些网站一般不可以作为 Referer 字段
  
#### ③ rel 属性

浏览器提供 rel 属性定制 `<a>`、`<form>`、`<area>` 元素的 Referer 行为，设置 `rel="noreferrer"`，这三个元素产生的 HTTP 请求就不会发送 Referer 字段

```html
<a href="..." target="_blank" rel="noreferrer">xxx</a>
```

#### ④ Referrer Policy

浏览器提供 Referrer Policy 定制完整的 Referer 行为

**同源网址**：协议、域名、端口相同

**源信息**：协议、域名、端口

| Referrer Policy                 | 含义                                                                                      |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| no-referrer                     | 不发送                                                                                    |
| origin                          | 一律只发送源信息                                                                          |
| unsafe-url                      | 一律只发送源信息、路径、查询字符串，不包含片段字符串、用户名和密码                        |
| no-referrer-when-downgrade      | 从 HTTPS 网址链接到 HTTP 网址不发送                                                       |
| strict-origin                   | 从 HTTPS 网址链接到 HTTP 网址不发送，否则只发送源信息                                     |
| same-origin                     | 链接到同源网址发送，跨域不发送                                                            |
| origin-when-cross-origin        | 链接到同源网址发送完整信息，跨域只发送源信息                                              |
| strict-origin-when-cross-origin | 链接到同源网址发送完整信息，跨域时如果 HTTPS 网址链接到 HTTP 网址不发送，否则只发送源信息 |

Referrer Policy 有以下三种常用方法

* HTTP 响应报文
  
  服务器返回网页时，通过响应报文的其他首部字段 Referrer-Policy 告知浏览器 Referer 行为

  ```javascript
  Referrer-Policy: origin
  ```

* `<meta>` 标签
  
  `<meta>` 标签，可以通过设置 content 属性定制 Referer 行为

  ```html
  <meta name="referrer" content="origin">
  ```

* referrerpolicy 属性
  
  `<img>`、`<link>`、`<a>`、`<area>`、`<iframe>` 标签，可以通过设置 referrerpolicy 属性定制 Referer 行为

  ```html
  <a href="..." target="_blank" referrerpolicy="origin">xxx</a>
  ```

### (8) Host（必须）

① 客户端的 Host 字段用于通知服务器，客户端请求是访问服务器上的哪个域名

② HTTP/1.1 协议允许一台 Web 服务器通过`网址名称对应的虚拟主机功能`搭建多个 Web 站点，互联网上，域名通过 DNS 服务器映射到 IP 地址之后访问 Web 服务器，可见当请求发送到 Web 服务器时已经是 IP 地址的形式了，因此当一台 Web 服务器内托管了多个域名时，收到请求就必须弄清楚是访问哪个域名，因此发送 HTTP 请求时必须在 `Host` 首部字段指定带域名的主机名的完整 URI，请求首部字段 Host 是 HTTP/1.1 协议规定的唯一必须包含在请求内的字段

![Host](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Host.png)

### (9) From

客户端的 From 字段用于通知服务器，使用用户代理的用户的电子邮件地址

![From](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/From.png)

### (10) Authorization（HTTP 的身份认证技术）

客户端的 Authorization 字段用于客户端与服务器之间的身份认证

**① Basic 认证**：客户端收到服务器发来的 Basic 认证质询时，将用户 ID 和密码以冒号 `:` 连接然后经过 Base64 编码处理，再通过 Authorization 字段告知服务器

![BASIC](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/BASIC.png)

**② Digest 认证**：客户端收到服务器发来的 Digest 认证质询时，由质询码 nonce 通过 MD5 算法计算出响应码 response，再将包含 realm、nonce、response、uri (请求 URI)、username (realm 限定范围内可进行认证的用户名) 这 5 个字段的 Authorization 字段告知服务器

![DIGEST](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/DIGEST.png)

### (11) Proxy-Authorization（HTTP 的身份认证技术）

客户端的 Proxy-Authorization 字段用于客户端与代理服务器之间的认证，客户端收到代理服务器发来的认证质询时，通过 Proxy-Authorization 字段告知代理服务器认证信息

### (12) Max-Forwards

客户端的 Max-Forwards 字段指明 HTTP 请求报文可经过的服务器的最大数量，每经过一个服务器，Max-Forwards 字段值就会减 1，当服务器收到 Max-Forwards 字段值为 0 的请求时，就不再转发请求，而是直接返回响应

![Max-Forwards](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Max-Forwards.png)

### (13) Expect

客户端的 Expect 字段用于通知服务器，期望出现的某种特定行为，服务器无法理解客户端的期望而发生错误时，返回状态码 `417 Expectation Failed`

### (14) Range

客户端的 Range 字段用于通知服务器，实体的字节范围请求

① 服务器能够处理范围请求时，返回状态码 `206 Partial Content` 和`请求范围内的资源`

② 服务器不能处理范围请求时，返回状态码 `200 OK` 和`全部资源`

![范围请求](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E8%8C%83%E5%9B%B4%E8%AF%B7%E6%B1%82.png)

### (15) If-Range、If-Match、If-None-Match、If-Modified-Since、If-Unmodified-Since

**条件请求**：带 If 的请求首部字段，都称为条件请求，服务器收到条件请求后，只有判断条件为真，才会执行请求  

![条件请求](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E6%9D%A1%E4%BB%B6%E8%AF%B7%E6%B1%82.png)

#### ① If-Range
  
客户端的 If-Range 字段用于通知服务器，对比 If-Range 字段值和资源 ETag 值或时间，两者一致时，请求作为范围请求处理，否则返回全体资源

![If-Range](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/If-Range.png)

#### ② If-Match（基本不使用）

* 客户端的 If-Match 字段用于通知服务器，对比 If-Match 字段值和资源的 ETag 值，只有当两者一致时，才会执行请求

* 客户端的 If-Match 字段值为星号 `*` 时，只要资源存在，服务器就执行请求

![If-Match](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/If-Match.png)

#### ③ If-None-Match（HTTP 1.1 — 协商缓存）

* 浏览器第一次请求资源时，服务器返回的响应报文包含`响应首部字段 ETag`，告知客户端返回的资源的唯一字符串标识，当资源更新时，ETag 字段值也会更新
* 浏览器再次请求该资源时，请求报文包含`请求首部字段 If-None-Match`，字段值为第一次请求该资源时响应报文的`响应首部字段 ETag` 值，服务器对比 If-None-Match 字段值与服务器上请求资源的 ETag 字段值
  * 若`相同`则命中协商缓存，返回 `304`，并且不包含资源内容和响应首部字段 ETag
  * 若`不同`则未命中协商缓存，返回 `200`，并且包含更新后的资源内容

#### ④ If-Modified-Since（HTTP 1.0 — 协商缓存）

* 浏览器第一次请求资源时，服务器返回的响应报文包含`实体首部字段 Last-Modify`，标识该资源的最后修改时间
* 浏览器再次请求该资源时，请求报文包含`请求首部字段 If-Modified-Since`，字段值为第一次请求该资源时响应报文的`实体首部字段 Last-Modify` 值，服务器对比 If-Modified-Since 字段值与服务器上请求资源的 Last-Modify 字段值
  * 若`早于`则命中协商缓存，返回 `304`，并且不包含资源内容和实体首部字段 Last-Modify
  * 若`晚于`则未命中协商缓存，返回 `200`，并且包含更新后的资源内容

![If-Modified-Since](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/If-Modified-Since.png)

#### ⑤ If-Unmodified-Since（基本不使用）

客户端再次请求某个资源时，请求报文包含`请求首部字段 If-Modified-Since`，字段值为第一次请求时响应报文的`实体首部字段 Last-Modify` 值，服务器对比 If-Modified-Since 字段值若`晚于`请求资源的最后更新时间，则命中缓存，返回 `304`，并且不包含资源内容和实体首部字段 Last-Modify

## 2. 响应首部字段

响应报文特有的首部字段，用于补充响应的附加信息、服务器信息、对客户端的附加要求等内容

![响应首部字段](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E5%93%8D%E5%BA%94%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5.png)

### (1) Accept-Ranges

服务器的 Accept-Ranges 字段用于告知客户端，服务器是否能够处理范围请求，`bytes` 代表可以处理范围请求，`none` 代表不能处理范围请求

![Accept-Ranges](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Accept-Ranges.png)

### (2) Server

服务器的 Server 字段用于告知客户端，当前服务器上安装的 HTTP 服务器应用程序的信息，包括软件应用名称、版本号、安装时的启动项等等

![Server](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Server.png)

### (3) Vary

① 服务器的 Vary 字段用于告知`代理服务器`，根据响应报文的 Vary 字段的值缓存资源

② 客户端向源服务器发送一个包含字段 Accept-Language: en-us 的请求，代理服务器收到这个请求后，没有对应的缓存，就将请求转发给源服务器，源服务器根据请求返回响应，并在响应中添加字段 Vary: Accept-Language，用于告知代理服务器缓存资源，并且将当前缓存映射到 Accept-Language: en-us，当下次客户端再次发送相同请求时，代理服务器收到请求并且缓存未过期，就直接将缓存返回给客户端而无需转发请求给源服务器

![Vary](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Vary.png)

### (4) ETag（HTTP 1.1 — 协商缓存）

服务器的 ETag 字段用于告知客户端，返回资源的`唯一字符串标识`，当资源更新时，ETag 字段值也会更新

* **强 ETag 值**：不论实体发生多么细微的变化都会改变其值
* **弱 ETag 值**：只用于提示资源是否相同，只有资源发生了根本改变，产生差异时才会改变其值，会在字段值开头附加 `W/`

### (5) Age

服务器的 Age 字段用于告知客户端，源服务器在`多少秒前`创建了响应，如果是缓存代理服务器创建了响应，则表示缓存资源从再次发起认证到认证完成的时间

![Age](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Age.png)

### (6) Location

服务器的 Location 字段用于告知客户端，请求资源的重定向 URI，几乎所有的浏览器在收到包含首部字段 Location 的响应后，都会`强制访问`重定向资源

![Location](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Location.png)

### (7) Retry-After

服务器的 Retry-After 字段用于告知客户端，应该在多久之后再次发送请求，字段值可以是创建响应后的秒数，也可以是具体的日期时间

### (8) WWW-Authenticate（HTTP 的身份认证技术）

服务器的 WWW-Authenticate 字段用于客户端与服务器之间的身份认证

**① Basic 认证**：客户端请求需要认证的资源时，服务器返回状态码 `401 Authorization Required`，响应首部字段 `WWW-Authenticate` 包含认证方式 (Basic)、realm 字符串

![BASIC](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/BASIC.png)

**② Digest 认证**：客户端请求需要认证的资源时，服务器返回状态码 `401 Authorization Required`，响应首部字段 `WWW-Authenticate` 包含认证方式 (Digest)、realm 字符串、质询码 nonce (生成的随机数)

![DIGEST](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/DIGEST.png)

### (9) Proxy-Authenticate（HTTP 的身份认证技术）

服务器的 Proxy-Authenticate 字段用于客户端与代理服务器之间的认证，将代理服务器要求的认证信息发送给客户端

## 3. 通用首部字段

请求报文和响应报文共有的首部字段

![通用首部字段](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E9%80%9A%E7%94%A8%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5.png)

### (1) Transfer-Encoding

Transfer-Encoding 规定报文主体时采用的`分块传输编码`方式，Transfer-Encoding 字段属于逐跳首部字段，只在`两个节点间`有效

![Transfer-Encoding](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Transfer-Encoding.png)

### (2) Trailer

Trailer 字段事先说明在报文主体后记录了哪些首部字段

![Trailer](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Trailer.png)

### (3) Via

Via 字段用于标记请求报文和响应报文转发过程中经过的所有代理服务器，避免请求回环的产生

![代理](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E4%BB%A3%E7%90%86.png)

### (4) Cache-Control 和 Warning（HTTP 1.1 — 强缓存）

**① Cache-Control**：用于控制缓存的行为

* 浏览器第一次请求资源时，服务器返回的响应报文包含`通用首部字段 Cache-Control`，其指令告知客户端服务器对资源缓存的各种限制
* 浏览器再次需要该资源时，根据各种指令判断是否命中强缓存，命中则直接使用缓存，未命中则向服务器发送请求判断是否命中协商缓存

**② Warning**：用于告知用户与缓存相关的警告

### (5) Pragma（HTTP 1.0）

Pragma 字段是 HTTP 1.0 的遗留字段，只用在客户端发送的 HTTP 请求报文中，要求所有的代理服务器不返回缓存，为了兼容所有的 HTTP 协议版本，通常的 HTTP 请求中会同时包含以下两个字段

```javascript
Cache-Control: no-cache
Pragma: no-cache
```

### (6) Connection

**① 控制逐跳首部字段**：在客户端发送的请求和服务器返回的响应内，使用 Connection 首部字段指明代理无需转发给源服务器的逐跳首部字段

![Connection控制逐跳首部字段](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Connection%E6%8E%A7%E5%88%B6%E9%80%90%E8%B7%B3%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5.png)

**① 管理持久连接**：HTTP/1.1 协议都是持久连接，客户端会在持久连接上连续发送请求，当服务器明确想断开连接时，会指定响应报文的 Connection 首部字段值为 close

![Connection管理持久连接](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Connection%E7%AE%A1%E7%90%86%E6%8C%81%E4%B9%85%E8%BF%9E%E6%8E%A5.png)

### (7) Upgrade

Upgrade 字段用于检测 HTTP 协议是否可升级为指定的其他协议

![Upgrade](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Upgrade.png)

## 4. 实体首部字段

实体首部字段可用于请求报文和响应报文，补充实体的更新时间等与实体相关的信息

* 请求报文：POST 请求中与`参数实体`相关的信息 (不常用)
* 响应报文：与服务器返回的`资源实体`相关的信息 (常用)

![实体首部字段](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/%E5%AE%9E%E4%BD%93%E9%A6%96%E9%83%A8%E5%AD%97%E6%AE%B5.png)

### (1) Allow

① 服务器的 Allow 字段用于告知客户端，对于请求的资源，服务器支持的 HTTP 请求方法

② 当服务器收到不支持的 HTTP 方法请求时，返回状态码 `405 Method Not Allowed`，并且把所有支持的 HTTP 方法放入 Allow 字段

### (2) Content-Type

服务器的 Content-Type 字段用于告知客户端，实体主体的媒体类型

### (3) Content-Encoding

服务器的 Content-Encoding 字段用于告知客户端，实体主体采用的内容编码

### (4) Content-Language

服务器的 Content-Language 字段用于告知客户端，实体主体采用的自然语言

### (5) Content-Length

① 服务器的 Content-Length 字段用于告知客户端，实体主体部分的字节大小

② 对实体主体进行`内容编码`时，不能使用 Content-Length 字段

### (6) Content-Range

服务器的 Content-Range 字段用于告知客户端，作为响应返回的实体的哪个部分符合范围请求的要求字段值以字节为单位，表示当前发送部分以及整体实体大小

![Content-Range](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Content-Range.png)

### (7) Content-Location

服务器的 Content-Location 字段用于告知客户端，实体主体返回资源对应的 URI

### (8) Content-MD5（HTTP 的完整性保护）

服务器的 Content-MD5 字段用于让客户端确认响应报文是否完整，Content-MD5 字段是服务器对响应报文主体执行 MD5 算法后再通过 Base64 编码得到的值，客户端在收到响应报文后，对响应报文主体执行相同的 MD5 算法后，得到的值与响应报文的 Content-MD5 字段解码后的值进行对比，用于确认响应报文主体在传输过程中是否保持完整，以及确认传输到达

![Content-MD5](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP%20%E5%8D%8F%E8%AE%AE/Content-MD5.png)

### (9) Expires（HTTP 1.0 — 强缓存）

* 浏览器第一次请求资源时，服务器返回的响应报文包含`实体首部字段 Expires`，告知客户端资源过期的 `GMT 格式的绝对时间字符串`的日期时间
* 浏览器再次需要该资源时，`在此时间之前即命中强缓存`，直接使用缓存，超过该时间则向服务器发送请求判断是否命中协商缓存

这种方式有一个明显的缺点，由于失效时间是一个绝对时间，所以当客户端浏览器时间和服务器时间不一致甚至相差较大时，就会导致缓存混乱

实体首部字段 Expires 是 HTTP 1.0 的规范，在 HTTP 1.1 中被通用首部字段 Cache-Control 取代

### (10) Last-Modified（HTTP 1.0 — 协商缓存）

服务器的 Last-Modified 字段用于告知客户端，资源的`最后修改日期时间`

## 5. 其他首部字段

**① Cookie 相关的字段**：详见 HTTP 协议 - 无状态协议 - Cookie

**② Referrer-Policy 字段**：用于服务器告知浏览器 Referer 行为

**③ Last-Event-ID**：用于浏览器帮助服务器重建 SSE 连接

## 6. HTTP 首部字段转发次数

HTTP 报文首部字段因`代理是否可以转发给源服务器`，分为逐跳首部字段 (Hop-by-hop Header) 和端到端首部字段 (End-to-end Header) 两类

### (1) 逐跳首部字段

逐跳首部字段只对`单次转发`有效，不会通过代理再次转发

* **TE (请求)**：客户端支持的分块传输编码方式及优先级
* **Transfer-Encoding (通用)**：指定报文主体的分块传输编码方式
* **Trailer (通用)**：报文末端的首部一览
* **Upgrade (通用)**：检测 HTTP 协议是否可升级为指定的其他协议
* **Connection (通用)**：控制逐跳首部字段、管理持久连接
* **Proxy-Authorization (请求)**：客户端告知代理服务器其要求的认证信息
* **Proxy-Authenticate (响应)**：代理服务器对客户端的认证信息

### (2) 端到端首部字段

端到端首部字段会转发给请求或响应的`最终接收目标`，除上述 8 个逐跳首部字段以外，其他首部字段都属于端到端首部字段
