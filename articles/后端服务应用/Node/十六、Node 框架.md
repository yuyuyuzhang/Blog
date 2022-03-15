# 十六、Node 框架

## 1. MSVC 架构

### (1) MVC 架构

![MVC]()

* **Model（模型层）**：处理数据库相关操作，提供数据
* **View（视图层）**：用户界面显示和交互，展示数据
* **Controller（控制层）**：业务逻辑处理

在目前服务划分较细的情况下，Model 层不仅仅是数据库操作，开发数据及业务逻辑有时在 Model 层，有时在 Controller 层，出现这类情况的核心原因是 `Controller 层之间无法复用`，如果需要复用的逻辑放在 Model 层，那么业务逻辑就会冗余在 Model 层，代码显得非常繁杂

### (2) MSVC 架构

![MSVC]()

* **Model（模型层）**：处理数据库相关操作，提供数据
* **Service（）**：复用的业务逻辑处理
* **View（视图层）**：用户界面显示和交互，展示数据
* **Controller（控制层）**：核心业务逻辑处理

## 2. 洋葱模型

无论哪个 Node 框架都是基于`中间件`来实现的，而中间件的执行方式需要依据`洋葱模型`，从洋葱切开的平面来看，想要从洋葱中间点穿过去，就必须先一层层向内穿入洋葱表皮进入中心点，再一层层向外穿出表皮，这也符合`栈列表先进先出`的原则，再回到 Node 框架，洋葱的表皮可以思考为中间件

* 由外向内的过程是一个关键字 next()
* 由内向外则是每个中间件执行完成后，进入下一层中间件，直到最后一层

![洋葱模型]()

## 3. Express

### (1) Express 安装与使用

Express 框架在 Node 初期就是一个热度较高、成熟的 Web 框架，包括的应用场景非常齐全，同时基于 Express 也诞生了一些场景性的框架，例如 Nest.js

* Express 封装、内置了很多中间件，例如 connect、router
* Express 基于 callback 处理中间件
* Express 并非严格按照洋葱模型异步执行中间件的

Express 安装与使用流程如下

* npm i -g express-generator
* express --views=ejs express-project
  --views=ejs 表示使用 ES modules 模块规范
  ![express_project]()

### (2) Express Restful 实例

## 4. Koa

### (1) Koa 安装与使用

随着 Node 的不断迭代，出现了以 async/await 为核心的语法糖，Express 原班人马为实现一个高可用、高性能、更健壮、更符合当代 Node 版本的框架而开发出了 Koa

* Koa 比较轻量，可以根据自身需求定制框架
* Koa 基于 async/await 处理中间件
* Koa 严格遵循洋葱模型异步执行中间件

Koa 安装与使用流程如下

* npm i -g koa-generator
* koa2 -e koa-porject
  -e 表示使用 ES module 模块规范
  ![koa_project]()

### (2) Koa Restful 实例

## 5. Nest.js

### (1) Nest 安装与使用

Nest.js 与上述三个框架最大的不同就是天然支持 TypeScript

Nest 安装与使用流程如下

* npm i -g @nestjs/cli
* nest new project-name
    ![nest_project]()
* src 核心文件概要简述
  * app.controller.ts：带有单个路由的基本控制器示例
  * app.controller.spec.ts：对于基本控制器的单元测试样例
  * app.module.ts：应用程序的根模块
  * app.service.ts：带有单个方法的基本服务
  * main.ts：应用程序入口文件
* main.ts
  ![nest_main]()

### (2) Nest Restful 实例
