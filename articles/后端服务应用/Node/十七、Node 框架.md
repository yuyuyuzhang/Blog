# 十七、Node 框架

## 1. MSVC 架构

### (1) MVC 架构

![MVC](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/MVC.png)

* **Model（模型层）**：处理数据库相关操作，提供数据
* **View（视图层）**：用户界面显示和交互，展示数据
* **Controller（控制层）**：业务逻辑处理

在目前服务划分较细的情况下，Model 层不仅仅是数据库操作，开发数据及业务逻辑有时在 Model 层，有时在 Controller 层，出现这类情况的核心原因是 `Controller 层之间无法复用`，如果需要复用的逻辑放在 Model 层，那么业务逻辑就会冗余在 Model 层，代码显得非常繁杂

### (2) MSVC 架构

![MSVC](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/MSVC.png)

* **Model（模型层）**：处理数据库相关操作，提供数据
* **Service（）**：复用的业务逻辑处理
* **View（视图层）**：用户界面显示和交互，展示数据
* **Controller（控制层）**：核心业务逻辑处理

## 2. 洋葱模型

无论哪个 Node 框架都是基于`中间件`来实现的，而中间件的执行方式需要依据`洋葱模型`，从洋葱切开的平面来看，想要从洋葱中间点穿过去，就必须先一层层向内穿入洋葱表皮进入中心点，再一层层向外穿出表皮，这也符合`栈列表先进先出`的原则，再回到 Node 框架，洋葱的表皮可以思考为中间件

* 由外向内的过程是一个关键字 next()
* 由内向外则是每个中间件执行完成后，进入下一层中间件，直到最后一层

![洋葱模型](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E6%B4%8B%E8%91%B1%E6%A8%A1%E5%9E%8B.png)

## 3. Express

Express 框架在 Node 初期就是一个热度较高、成熟的 Web 框架，包括的应用场景非常齐全，同时基于 Express 也诞生了一些其他的框架，例如 Koa、Nest.js

* Express 封装、内置了很多中间件，例如 connect、router
* Express 基于 callback 处理中间件
* Express 并非严格按照洋葱模型异步执行中间件的

## 4. Koa

### (1) Koa

随着 Node 的不断迭代，出现了以 async/await 为核心的语法糖，Express 原班人马为实现一个高可用、高性能、更健壮、更符合当代 Node 版本的框架而开发出了 Koa

* Koa 比较轻量，可以根据自身需求定制框架
* Koa 基于 `async/await` 处理中间件
* Koa 严格遵循`洋葱模型`异步执行中间件

### (2) Koa 安装与使用

Koa 安装与使用流程如下

* npm i -g koa koa-generator
* koa2 -e koa-porject
  -e 表示使用 ES module 模块规范
  ![koa_project](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/koa_project.png)

### (3) Koa 实例

koa 应用程序不是 HTTP 服务器的一对一展现，可以将一或多个 koa 应用程序安装在一起形成具有单个 HTTP 服务器的大型应用程序

```js
定义：import Koa from 'koa'
     const app = new Koa()
属性：app.env             //返回&设置当前 koa 应用程序的环境类型(默认 NODE_ENV 或 development)
     app.context         //返回&设置当前 koa 应用程序的环境上下文 ctx
     app.keys            //返回&设置当前 koa 应用程序的签名的 cookie 密钥数组
     app.proxy           //返回&设置当前 koa 应用程序的代理是否值得信任
     app.subdomainOffset //返回&设置当前 koa 应用程序的子域偏移量
     app.proxyIpHeader   //返回&设置当前 koa 应用程序的代理 IP 消息头(默认 X-Forwarded-For)
     app.maxIpsCount     //返回&设置当前 koa 应用程序的服务器之前的代理 IP 的最大数量
方法：app.callback()      //返回当前 koa 应用程序的适用于 http.createServer() 方法的回调函数
     app.listen(port)    //无返回值,当前 koa 应用程序创建并返回 HTTP 服务器
     app.use(asyncf)     //无返回值,当前 koa 应用程序绑定指定中间件 asyncf


app.listen() 是以下代码的语法糖
app.listen(port) = http.createServer(app.callback()).listen(port)
```

### (4) Koa 中间件（Middleware）

中间件其实就是一个如下所示的`异步函数`

* **ctx**：环境上下文 ctx 参数是中间件之间的`全局变量`，包含了 HTTP 的请求和响应处理 ctx.request、ctx.response

```js
ctx.app                                //返回 koa 应用程序实例的引用
ctx.respond                            //返回&设置是否允许 koa 处理 response 对象
ctx.req                                //返回&设置 request 对象
ctx.res                                //返回&设置 response 对象
ctx.throw([status],[msg],[properties]) //无返回值,抛出错误
ctx.cookies.get(name,[options])        //返回指定 cookie
ctx.cookies.set(name,value,[options])  //无返回值,设置 cookie
```

* **next**：调用 await next() 方法执行下一个中间件

```js
async (ctx, next) => {
  console.log('权限验证通过...')
  await next() // 执行下一个中间件
}
```

每个中间件负责`特定的小模块`，多个中间件构成了一个`执行链条`，相互配合组成一条`完整的业务通道`，一些特定成熟的功能可以抽象成一个个模块共享出来，例如路由模块、模板引擎等

```js
import Koa from 'koa'

const app = new Koa()

// 中间件：访问权限
app.use(async (ctx, next) => {
  console.log('权限验证通过...')
  await next() // 执行下一个中间件
})

// 中间件：日志记录
app.use(async (ctx, next) => {
  console.log('日志记录完成...')
  await next()
})

// 中间件：响应处理
app.use(async (ctx, next) => {
  ctx.response.status = 200
  ctx.response.body = 'hi, koa'
  await next()
})

app.listen(3000);
```

## 5. Nest.js

### (1) Nest 安装与使用

Nest.js 与上述三个框架最大的不同就是天然支持 TypeScript

Nest 安装与使用流程如下

* npm i -g @nestjs/cli
* nest new project-name
    ![nest_project](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/nest_project.png)
* src 核心文件概要简述
  * app.controller.ts：带有单个路由的基本控制器示例
  * app.controller.spec.ts：对于基本控制器的单元测试样例
  * app.module.ts：应用程序的根模块
  * app.service.ts：带有单个方法的基本服务
  * main.ts：应用程序入口文件
* main.ts
  ![nest_main](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/nest_main.png)
