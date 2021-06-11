# 五、Web 安全建设

## 1. 构建防线：服务器安全加固

### (1) Apache 服务器加固

Apache 是世界使用排名第一的 Web 服务器软件，由于其跨平台性和安全性而被广泛使用

#### ① 删除默认页面

Apache 安装后会有如下图所示的默认页面，安装后仅用于测试，用于生产环境中时需要删除 `icons` 和 `manual` 两个目录文件，以避免不必要的信息泄露

![Apache默认页面](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/Apache%E9%BB%98%E8%AE%A4%E9%A1%B5%E9%9D%A2.png)

#### ② 关闭目录浏览功能

Apache 默认允许目录浏览，如果目录下找不到可浏览器的页面，就会出现目录浏览问题，造成信息泄露

![Apache在线浏览目录](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/Apache%E5%9C%A8%E7%BA%BF%E6%B5%8F%E8%A7%88%E7%9B%AE%E5%BD%95.png)

Ubuntu 是通过修改 Apache 配置文件 `/etc/apache2/apache2.conf`，其他平台大多是叫 `httpd.conf` 的配置文件名，修改 Indexes 为 `－Indexes`

![Apache关闭目录浏览](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/Apache%E5%85%B3%E9%97%AD%E7%9B%AE%E5%BD%95%E6%B5%8F%E8%A7%88.png)

#### ③ 开启访问日志

Apache 默认开启访问日志，需要确认下配置文件是否开启 CustomLog 的日志路径设置，在浏览器被攻击时，通过日志可以帮助回溯整个安全事件的过程，有助于定位漏洞成因和攻击者

```js
/etc/apache2/sites-available/default-ssl.conf
/etc/apache2/sites-available/000-default.conf
```

![Apache开启访问日志](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/Apache%E5%BC%80%E5%90%AF%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97.png)

![Apache访问日志文件](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/Apache%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97%E6%96%87%E4%BB%B6.png)

#### ④ 不以 ROOT 启动 Apache

Apache 默认禁止启动 ROOT，可以在 Apache 配置文件中再确认下 User 与 Group 的配置值

* 下面是 apache2.conf 为配置文件时的情况，它通过 /etc/apache2/envars 指定变量名来设置 User 和 Group

    ```js
    # /etc/apache2/apache2.conf
    User ${APACHE_RUN_USER}
    Group ${APACHE_RUN_GROUP}
    # /etc/apache2/envars
    export APACHE_RUN_USER=www-data
    export APACHE_RUN_GROUP=www-data
    ```

* 如果是 httpd.conf，一般就直接用 User 与 Group 来指定用户名和用户组

    ```js
    User apache
    Group apache
    ```

#### ⑤ 禁止访问外部文件

Apache 需要修改 Apache 配置文件，先禁止所有目录的访问，然后再开启可访问的目录，当网站存在目录遍历漏洞时，攻击者可能通过 `../` 来访问系统上的任意目录

```js
# 先禁止任何目录访问

Order Deny,Allow
Deny from all

# 设置可访问的目录

Order Allow,Deny
Allow from {网站根目录}
```

#### ⑥ 错误页面重定向

Apache 修改 Apache 配置文件，指定不同响应号的返回页面文件，Apache 错误页面重定向功能可以防止敏感信息泄露，比如网站路径等信息

```js
ErrorDocument 400 /custom400.html
ErrorDocument 401 /custom401.html
ErrorDocument 403 /custom403.html
ErrorDocument 404 /custom404.html
ErrorDocument 405 /custom405.html
ErrorDocument 500 /custom500.html
```

### (2) Nginx 服务器加固

Nginx 是一款著名且免费的网页服务器软件，在世界范围内应用广泛

Nginx 配置文件通常位于 `/usr/local/etc/nginx/nginx.conf`，没找到可以通过命令 `locate nginx.conf` 来搜索

```js
$ locate nginx.conf
/usr/local/etc/nginx/nginx.conf
/usr/local/etc/nginx/nginx.conf.default
```

#### ① 删除默认页面

Nginx 也存在默认页面，上线后应该删除，防止不必要的信息泄露，可通过删除如下配置信息来解决

```js
location /doc {
root /usr/share;
autoindex on;
allow 127.0.0.1;
deny all;
}
 
location /images {
root /usr/share;
autoindex off;
}
```

#### ② 关闭目录浏览功能

Nginx 默认不允许目录浏览，可以再确认下配置文件中的 autoindex 是否配置为 off，以防止敏感信息泄露

```js
autoindex off
```

#### ③ 开启访问日志

Nginx 默认开启访问日志，可以在配置文件中确认下是否已开启，开启日志有助追踪攻击途径，以及定位攻击者

```js
access_log /backup/nginx_logs/access.log combined;
```

## 2. 入侵排查：阻断与黑客追踪

### (1) 网站入侵检测

想要更加主动、及时、全面地感知到网站被入侵，就需要有一套自己的入侵检测系统，可以自研或者采购，常见的网站入侵检测方法有以下三种

#### ① 基于流量检测

通过收集服务器的网络流量进行数据分析，检测攻击者发送的 payload 攻击特征，特别是 Webshell 特征进行检测和告警，以便及时发现被入侵情况

#### ② 基于文件检测

通过分析文件判断是否为恶意后门，与我们平常的病毒扫描一样，同时排查日志文件也可以发现入侵过程，有利于回溯整个攻击过程

#### ③ 基于行为检测

通过动态检测系统上的执行行为来判断是否为恶意行为，是否被入侵攻击

### (2) 应急处置流程

#### ① 关闭外网进行排查

为防止被进一步入侵窃取敏感信息，或者被内网渗透，应该在第一时间关闭外网，保留现场环境进行排查，等处理完善后再上线

#### ② WebShell 检测、分析、清除

* `检测` Webshell 可以使用一些现成工具，例如 Windows 上的 D 盾、支持 Windows 和 Linux 的河马，还有支持 Linux 的长亭云牧，使用都很简单，指定目录/文件进行扫描即可
* 通过`分析` Webshell 文件的创建时间，也可以推测出入侵事件发生的时间段，不过有时候文件创建时间也可能被篡改，注意结合日志信息来综合判断，接着就是`分析` Webshell 的行为，看是否还有其他后门存在，或者一些破坏性行为
* 最后`清除`所有后门文件，清除前先留存一份，方便后续分析

#### ③ Web 日志分析

通过分析 Web 日志，帮助我们找到漏洞的位置，回溯整个攻击过程，同时通过定位 IP 来追踪黑客

#### ④ 系统后门与日志排查

攻击者为了实现对服务器的长期控制，通常会在系统上留存后门等恶意程序，所以在清除 Webshell 后，还应该对系统进行全面排查，比如是否有可疑文件、进程，进行一次本地病毒的查杀，确保所有恶意程序都被清除干净；否则，即使你修复漏洞了，攻击者仍可通过后门控制你的服务器，再一次遭遇被入侵的局面

#### ⑤ 漏洞分析、复现、修复

* 通过前面分析 Web 日志来定位漏洞，通过访问 Webshell 的 IP 来收集此 IP 的所有访问记录，根据记录我们可以推测出以下两种情况
  * 比如，访问上传接口后就访问 Webshell，那就有可能存在上传文件漏洞
  * 比如，大批量地尝试登录后台，那可能是在暴力破解密码，可以看攻击者是否成功访问后台，来判断是否破解成功
* 之后就是去尝试重现漏洞，以验证前面的推测
* 若确认漏洞存在，就需要进行修复，修复后才能上线

#### ⑥ 安全加固后上线

通过服务器加固方法进行安全加固，加固完成后再上线恢复业务

## 3. 研发安全：从 SDL 到 DevSecOps

近几年很多企业逐步从 SDL 切换到 DevSecOps，以便研发出更安全的系统

### (1) SDL

安全开发生命周期 SDL 是一个满足安全合规要求的同时，兼顾开发成本的软件开发过程，由微软提出，旨在帮助开发人员构建更加安全的软件

SDL 的核心理念就是`将安全集成到软件开发的每个阶段`，从需求、设计、编码、测试、发布的每个阶段都加入相应的安全工作，以提升软件安全质量

![SDL](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/SDL.png)

SDL 更强调安全人员的工作，并未关注运维问题，同时现在企业越来越强调敏捷快速地开发产品，按照 SDL 的流程很难适应这种快速迭代的研发流程，由此促进了 DevSecOps 的诞生

### (2) DevSecOps

#### ① DevOps

DevOps 是`开发`和`运维`两词的缩写，是一套最佳实践方法论，旨在软件的开发生命周期中促进专业 IT 人员（产品、研发、测试、运维）之间的协作和交流，最终实现`持续集成 CI`（集成各个开发团队成员工作以及时发现错误）、`持续部署 CD`（保证快速且经常发布）、`持续反馈`（收集相关反馈帮助优化产品）

![DevOps](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/DevOps.png)

#### ② DevSecOps

DevSecOps 正是在 DevOps 的 CI/CD 过程中嵌入`安全工作`，整合开发、安全、运维等各项工作，强调安全是整个 IT 团队（开发、安全、运维等工作人员）的责任，而不仅仅是安全人员的工作，且需要贯穿整个研发生命周期的每个环节

![DevSecOps](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/DevSecOps.png)

#### ③ SDL 与 DevSecOps 对比

SDL 与 DevSecOps 并不冲突，只是 DevSecOps 更进一步强调自动化融入流程，安全责任属于每个人，自建更适合自己企业的安全文化

![SDL与DevSecOps对比](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/%E7%BD%91%E7%BB%9C%E5%AE%89%E5%85%A8/SDL%E4%B8%8EDevSecOps%E5%AF%B9%E6%AF%94.png)
