# 四、Web 攻击

[[_TOC_]]

## 1. 跨站脚本（Cross Site Scripting，XSS）

### (1) XSS

`跨站脚本` XSS 是一种`代码注入攻击`，攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行，然后攻击者就可以获得用户的敏感信息如 Cookie、SessionID 等，进而危害数据安全

#### ① 反射型 XSS

反射型 XSS 是指攻击者将恶意代码拼接在 URL 后面提交给服务器，服务器返回的内容也带上这段恶意代码，导致浏览器执行恶意代码

#### ② 存储型 XSS

存储型 XSS 是指将恶意代码存储在数据库，每次访问页面都会触发攻击，例如某个网站允许用户设置个性签名，并且显示在个人主页，攻击者就可以在个性签名中输入恶意代码并提交到服务器，如果这段恶意代码没有进行任何处理直接存储在数据库，那么其他用户在访问这个人的个人主页时都会执行这段恶意代码从而受到攻击

#### ③ DOM 型 XSS

DOM 型 XSS 是指恶意代码无需经过服务器，直接在浏览器上运行

### (2) 防御 XSS

#### ① 参数校验

校验 GET 请求和 URL 参数和 POST 请求的 payload 参数，例如参数为用户年龄，前端发送前就需要判断参数是否为数字，后端接收后也需要判断参数是否为数字，不符合校验规则的数据需要抛出错误

#### ② 字符转义

对于一些后端返回的特殊字符，前端需要进行转义后显示

#### ③ 不允许获取 Cookie

* 服务器的 Set-Cookie 字段指定 Secure 属性，浏览器只有在加密协议 HTTPS 下才将 Cookie 发送给服务器
* 服务器的 Set-Cookie 字段指定 HttpOnly 属性，Cookie 无法由 JS 脚本使用 `document.cookie` 获得，主要目的是为了防止跨站脚本攻击 XSS (Cross-site scripting) 对 Cookie 信息的窃取

```javascript
Set-Cookie: sid=hdhfhbg136254; Secure; HttpOnly
```

## 2. 跨站请求伪造（Cross-site Request Forgery，CSRF/XSRF）

### (1) CSRF

`跨站请求伪造` CSRF 是指黑客诱骗用户打开恶意网站，然后利用用户的登录状态发起跨站请求，例如用户先登陆银行网站，银行服务器返回一个 Cookie，用户又访问恶意网站，上面有一个表单，用户一旦被诱骗发送这个表单，银行网站就会收到带有正确 Cookie 的请求，这种由第三方网站引导发出的 Cookie，就被称为`第三方 Cookie`

### (2) 防御 CSRF

Chrome 51 浏览器为 Cookie 新增了一个 `SameSite 属性`，服务器的 Set-Cookie 字段通过指定 SameSite 属性用来限制第三方 Cookie 以防止 CSRF 攻击，SameSite 属性可以设置三个值

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

## 3. 点击劫持（ClickJacking）

### (1) ClickJacking

点击劫持 ClickJacking 是指攻击者创建一个网页，利用 iframe 包含目标网站，然后通过设置透明度等方式隐藏目标网站，然后诱导用户点击特定的按钮，这个按钮和目标网站的某个按钮重合，因此用户实际上点击的是目标网站的按钮

### (2) 防御 ClickJacking

ClickJacking 的攻击原理主要是利用 iframe，因此可以通过设置响应报文首部字段 `X-Frame-Options` 告知浏览器允许哪些页面引用当前网站

* DENY：不允许在任何 iframe 中引用，即便是相同域名页面的 iframe 也不行
* SAMEORIGIN：允许在相同域名页面的 iframe 中引用
* ALLOW-FROM [URL]：允许在指定来源的 iframe 中引用
