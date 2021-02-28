# 三、Web 安全

[[_TOC_]]

## 1. Web 安全

* **网络安全**：网络安全是指 `TCP/IP 五层协议群`的整个安全，包括网络系统中的`硬件、软件、及其数据`，不受恶意或偶然原因遭到破坏、更改、泄漏，系统连续可靠的正常运行，网络服务不中断
* **Web 安全**：Web 安全特指`应用层`的安全，主要是 `Web 网站`的安全，因此 Web 安全是网络安全的一部分

根据 HackerOne 的报告数据，71% 的安全问题都出现在网站上，其次是一些 API 接口，再其次就是 iOS 与 Android 应用，因此 Web 安全，是最受外部黑客关注的目标，也是企业应该重点防御的对象

![HackerOne](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Serverless/Serverless%20%E6%97%B6%E4%BB%A3%E7%9A%84%E7%BD%91%E7%AB%99%E9%83%A8%E7%BD%B2%E6%9E%B6%E6%9E%84.png)

## 2. 武器库：渗透测试工具

### (1) 常用渗透测试工具

2020 年的 HackerOne 黑客报告中，统计过白帽子们最喜欢用的软硬件工具如下

![渗透测试工具]()

由统计可知，89% 的白帽子都会使用 `BurpSuite`，涉及 Web 渗透的常用工具功能都集中在代理抓包和漏洞扫描上，BurpSuite 两者兼具，还有丰富的插件，并集成了很多渗透测试的常用功能，是手动挖掘漏洞的必备神器

### (2) BurpSuite

#### ① BurpSuite 的安装配置

* BurpSuite 分为收费的企业版和专业版，免费的社区版，社区版主要是一些代理抓包改包的基本功能，专业版则包含漏洞扫描器、插件商店等功能，专业版一年收费 399 美元，相当于 2600 元左右，网上可以找破解版下载
  官网下载地址：https://portswigger.net/burp/
* BurpSuite 安装完成后，按照下图所示查看 BurpSuite 的代理设置
  ![BurpSuite代理设置]()
* 使用 BurpSuite 前需要配置浏览器代理，这样才能将 HTTP/HTTPS 请求转发到 BurpSuite 上进行分析与测试，我们可以使用 Chrome 插件 `Proxy SwitchyOmega` 来快速切换代理，插件安装之后按照下图配置
  ![SwitchyOmega_BurpSuite]()
* 插件配置完成后就可以在 Chrome 浏览器右上角的插件栏中点击 Proxy SwitchyOmega 插件图标，选择创建的 BurpSuite 情景模式开启 BurpSuite 代理，或者选择`系统代理`关闭 BurpSuite 代理
  ![BurpSuite开启代理]()

#### ② BurpSuite 的使用

* BurpSuite 是一个无需安装的软件，下载完成后直接从`命令行`启动即可，或者直接双击执行 `burpSuite.jar` 文件启动
* 打开 Proxy 功能下的 Intercept 选项卡，确认拦截功能为 Interception is on 状态，如果显示为 Intercept is off 则点击开启拦截功能
  ![BurpSuite开启拦截]()
* 打开浏览器输入要访问的 URL 并回车，将会看到数据流量经过 Burp Proxy 并暂停，直到你点击 `Forward` 才会继续传输下去，如果你点击了 `Drop` 则这次通过的数据将会被丢失不再继续处理，点击 Forward 之后将会看到这次请求返回的所有数据
  ![BurpSuite拦截请求]()
* BurpSuite 具体使用方式如下
  BurpSuite 实战指南：https://t0data.gitbooks.io/burpsuite/content/chapter3.html

## 3. 靶场：搭建漏洞练习环境

### (1) 自行搭建漏洞靶场

* 安装 Docker：https://www.docker.com/products/docker-desktop
* 安装镜像例如 sqli-labs 靶场

### (2) Web 漏洞 CTF 在线练习环境

* 网络信息安全攻防学习平台：http://hackinglab.cn/index.php
  ![网络信息安全攻防学习平台]()
* Websec CTF 练习平台：http://www.websec.fr/
  ![Websec CTF 练习平台]()
* XCTF 攻防世界：https://adworld.xctf.org.cn
  ![XCTF 攻防世界]()
* SQL 注入挑战平台：http://redtiger.labs.overthewire.org
  ![SQL 注入挑战平台]()
* XSS 挑战平台：http://prompt.ml/
  ![XSS 挑战平台]()

## 4. 法律法规：如何合法进行渗透测试

最佳方式是先拿到渗透测试授权书，`任何未经授权的渗透测试都是违法的`

* 如果是对 SRC 的相关网站进行测试，记得点到为止，不要破坏，不要拿数据，不要留后门
* 如果是测试 Webshell，测试完及时删除并报告给厂商修复，真正做到负责人的漏洞披露

如果是为了漏洞赏金，国外的漏洞报告平台更安全，奖金额度更高，或许是个更好的选择
