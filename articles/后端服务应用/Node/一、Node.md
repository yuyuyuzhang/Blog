# 一、Node

## 1. Node 概述

Node 是一个开源与跨平台的 JS 运行时环境，基于 `Google 的 V8 引擎`

### (1) Node 核心特点 - 异步事件驱动

目前的 Java、PHP 等服务端语言存在的问题，是`为每个客户端连接创建一个新线程`，每个线程大约耗费 `2MB` 内存，理论上 `8GB` 内存的服务器可以同时连接的最大用户数为 `4000` 左右，要让 Web 应用程序支持更多的用户，就需要增加服务器数量，而 Web 应用程序的硬件成本也就随之增加，在技术层面也会产生一些潜在的问题，例如同一用户的不同客户端请求可能会被不同服务器处理，因此必须在所有服务器之间共享所有资源，由此可见，Web 应用程序的一个主要瓶颈就是`服务器所支持的最大同时连接用户量`

Node 的基本设计原则是将 Web 应用程序放置在`单线程（JS 引擎线程）`中执行，然后通过`事件循环和回调函数`异步处理所有事件， Node 等待 Web 应用程序启动完成后开始捕获请求，`为每个客户端连接触发一个内部处理事件`，Node 接收到多个客户端连接时，会严格按照请求顺序初始化资源请求操作（数据库请求、文件访问等），但并不会一直等待操作完成或结果返回，而是当被请求的资源准备好或请求的操作完成时，触发特定事件，执行关联的回调函数，在此期间，JS 引擎线程会去处理其他的事务，尽管 Node 并不能真正地并行处理客户请求，但其设计方式能够繁忙且高效地处理客户请求，并能有效地使用内存和其他计算机资源，使用 Node 可以同时处理多达`几万个`用户的客户端连接

### (2) Node 在前端工程化和后端服务应用的区别

* **前端工程化**：前端工程化最重要的工具就是 Webpack、Vite 等构建工具，这些构建工具的核心都是基于 Node 运行，但最终目标都只是`提高前端研发效率`，并没有真正应用到 Node 的核心特点
* **后端服务应用**：后端服务应用才能真正应用 Node `异步事件驱动`的核心特点

| 差异点   | 前端工程化       | 后端服务应用             |
| -------- | ---------------- | ------------------------ |
| 运行环境 | 本地环境         | 远程服务器               |
| 受众用户 | 本地开发人员     | 真实用户                 |
| 问题调试 | 简单             | 复杂，需要日志埋点       |
| 关注点   | 提高前端研发效率 | 保证后端服务的安全与稳定 |

## 2. Node 后端应用场景

### (1) 后端服务

现有的后端服务大致分类如下

* **网关**：负责负载转发，例如 Nginx
* **业务网关**：负责业务相关的通用逻辑，例如通用协议转化、统一鉴权处理、统一的业务安全处理
* **业务系统**：负责业务逻辑
* **运营系统**：负责日常的运营活动
* **中台服务**：负责通用类的服务，例如前端配置系统、用户反馈系统、推送系统、系统工具
* **各类基础层**：负责单一的核心后台服务，例如用户模块，需要根据不同业务设计不同的核心底层服务
* **数据服务**：负责数据缓存和数据存储

![后台服务](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%90%8E%E5%8F%B0%E6%9C%8D%E5%8A%A1.png)

### (2) Node 后端服务

Node 非常不适合`密集型 CPU 运算`的服务

* **图片处理**：图片的裁剪缩放等等非常损耗 CPU 计算
* **大文件读写处理**：V8 内存上限是 `1.4G`，Node 处理大文件时可能会导致内存溢出
* **大字符串、大数组类处理**：涉及这些数据应该考虑如何通过切割处理

Node 适用于`网络 IO 较多，但是 CPU 计算较少、业务复杂度高`的服务，例如以下三种

#### ① 业务网关

普通的网关例如 Nginx 作为负载均衡转发层，负责负载转发，那么业务网关负责什么呢？

管理系统有一般都有鉴权模块，以往都是在后端服务中增加一个`鉴权类`，然后在`统一路由处`增加鉴权判断，而现在不仅仅是这个管理系统需要使用这个鉴权类，多个管理系统都需要使用，此时可以考虑复制这个鉴权类到其他项目，也可以考虑做一个专门的`鉴权服务`

业务网关就是专门处理业务相关的通用逻辑，例如统一鉴权

![业务网关](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E4%B8%9A%E5%8A%A1%E7%BD%91%E5%85%B3.png)

#### ② 中台服务

Web 应用中存在一些通用服务，以往都是独立接口独立开发，随着公司应用越来越多，需要将一些`通用业务服务集中`，这就是中台的概念

* **前端配置系统**：在服务端根据客户端的版本、设备、地区、语言等下发不同的配置
* **用户反馈系统**：用户可以在任何平台调用反馈接口，并将反馈内容写入队列，并落地到系统中进行综合分析
* **推送系统**：管理消息的推送、用户红点和消息数的拉取、消息列表的管理
* **系统工具**：日志捞取、信息调试上报、性能问题定位分析提取

中台服务的设计着重关注：`网络 IO、并发、通用性、业务复杂度`，一般情况下不涉及复杂的 CPU 运算，以上列举的 4 个系统的特性说明如下

![中台服务系统特性说明](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E4%B8%AD%E5%8F%B0%E6%9C%8D%E5%8A%A1%E7%B3%BB%E7%BB%9F%E7%89%B9%E6%80%A7%E8%AF%B4%E6%98%8E.png)

#### ③ 运营系统

各类互联网项目经常用运营活动来做项目推广，而这类运营系统往往逻辑复杂，同时需要根据业务场景进行多次迭代、不断优化，这些活动往往并发很高，但是可以不涉及底层数据库的读写，而更多的是缓存数据的处理，例如投票活动、排行榜活动等

![投票系统场景分析](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E6%8A%95%E7%A5%A8%E7%B3%BB%E7%BB%9F%E5%9C%BA%E6%99%AF%E5%88%86%E6%9E%90.png)

## 3. Node 环境搭建

### (1) Node 版本号

Node 偶数版本号代表稳定发行版本（0.8.x），奇数版本号代表开发版本（0.9.x）

### (2) Node 版本升级

* **使用安装包升级**：新版本 Node 将自动覆盖旧版本 Node
* **使用源代码升级**：为避免潜在的混乱或文件冲突，始终应该在旧版本源代码中执行 `make uninstall` 卸载命令，然后再下载新版本源代码，编译并安装

### (3) Node 版本管理器（Node Version Manager，Nvm）

升级 Node 版本的挑战在于新版本 Node 是否能兼容特定的环境、模块、Node 应用程序，如果碰到版本问题，可以使用 `Node 版本管理器（Node Version Manager，Nvm）`在多个 Node 版本之间切换

nvm 常用命令如下

* **安装 Node 指定版本**：nvm install v0.4.0
* **卸载 Node 指定版本**：nvm uninstall v0.4.0
* **查看 Node 可用版本**：nvm ls
* **切换 Node 指定版本**：nvm use v0.4.0

#### ① nvm 安装

* **百度网盘自取安装包**：nvm-setup.exe
* **双击文件安装**：需要先卸载所有已安装的 Node 版本并清除对应文件夹

  ![nvm](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/nvm.png)

#### ② node & npm 安装

* **配置 Node&npm 安装镜像**：nvm 安装路径下找到 `setting.txt` 文件添加如下两行代码，避免 Node 安装失败
  
  ![nvm配置node安装镜像](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/nvm%E9%85%8D%E7%BD%AEnode%E5%AE%89%E8%A3%85%E9%95%9C%E5%83%8F.png)

* **安装 Node**：nvm install v16.8.0，命令安装指定版本 Node
* **安装 npm**：正常情况下安装 Node 会自动安装 npm，但是 `8.11` 以上版本的 Node 对应的 npm 都无法自动安装，需要手动安装
  * npm 各版本下载地址：https://npm.taobao.org/mirrors/npm
  * 下载完成后解压并将文件夹名称改为 npm，放入 nvm 安装目录下对应版本的 Node 文件夹的 node_modules 文件夹下
  * 复制 bin 文件夹下的如下 4 个文件到 node_modules 同级目录
    
    ![npm安装](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/npm%E5%AE%89%E8%A3%85.png)

* **使用 Node**：nvm use 16.8.0 命令使用指定版本 Node，会自动拷贝对应版本的 Node 安装文件夹到 nvm 安装目录下并重命名为 nodejs
  
  ![nvm使用指定版本Node](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/nvm%E4%BD%BF%E7%94%A8%E6%8C%87%E5%AE%9A%E7%89%88%E6%9C%ACNode.png)

* **修改 npm 全局安装和缓存位置**
  * nvm\nodejs 文件夹下新建如下两个文件夹

    ![npm全局安装和缓存位置1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/npm%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85%E5%92%8C%E7%BC%93%E5%AD%98%E4%BD%8D%E7%BD%AE1.png)

  * cmd 输入以下命令
  
    ![npm全局安装和缓存位置2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/npm%E5%85%A8%E5%B1%80%E5%AE%89%E8%A3%85%E5%92%8C%E7%BC%93%E5%AD%98%E4%BD%8D%E7%BD%AE2.png)

* **配置 Node 环境变量**
  * 环境变量 - 系统变量 - 新建 NODE_PATH

    ![NODE_PATH](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/NODE_PATH.png) 
  
  * 环境变量 - 用户变量 - PATH 修改
  
    ![PATH变量修改](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/PATH%E5%8F%98%E9%87%8F%E4%BF%AE%E6%94%B9.png)

## 4. Node REPL

### (1) Node REPL

REPL（Read Eval Print Loop，交互式解释器）表示一个电脑环境，类似于 shell，可以在终端中输入命令，并接收到系统响应

Node 自带 REPL，可以调试 JS 代码，可以执行以下任务

* **读取**：读取并解析输入的 JS 数据结构并存储到内存
* **执行**：执行输入的 JS 数据结构
* **打印**：输出结果
* **循环**：循环执行以上三个步骤，直到退出当前终端

### (2) Node REPL 命令

* **node**：启用 Node REPL
  默认尖括号 `>` 为命令行提示符，该符号之后输入的任何内容都由底层的 V8 JS 引擎处理
    ![Node REPL 启用](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/Node%20REPL%20%E5%90%AF%E7%94%A8.png)
* **.editor**：进入编辑模式，编辑多行表达式
* **ctrl + D**：存在编辑模式则退出编辑模式，否则退出 Node REPL
* **.save fileName**：保存当前 Node REPL 会话到指定文件
* **.load fileName**：载入一个文件到当前 Node REPL 会话

### (3) Node REPL 使用

* **即时输出表达式值**：REPL（Read Eval Print Loop）的重点在于 `Eval（求值）`，而变量赋值的表达式并不会返回变量值作为表达式的值，因此在 Node REPL 中变量赋值表达式会输出 undefined
  ![变量赋值表达式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%8F%98%E9%87%8F%E8%B5%8B%E5%80%BC%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)
* **_**：下划线变量用于获取上个表达式的计算结果，还可以访问其属性或调用其方法
  ![_](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/_.png)

### (4) 多行表达式

* .editor 进入编辑模式
* 编写多行表达式
* ctrl + D 退出编辑模式
* 使用多行表达式

![多行表达式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%A4%9A%E8%A1%8C%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)

### (5) 保存与载入文件

* **.save**：保存当前会话为 js 文件到当前目录

  ![.save1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.save1.png)

  ![.save2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.save2.png)

* **.load**：从当前目录加载指定 js 文件到当前会话

  b.js

  ```js
  var b = 2;
  ```

  ![.load1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.load1.png)

  ![.load2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.load2.png)
