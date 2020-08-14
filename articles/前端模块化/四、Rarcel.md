# 四、Parcel

[[_TOC_]]

## 1. Parcel

Parcel 是一款完全零配置的前端打包器，开发者只需要了解 Rarcel 提供的几个简单命令，就可以直接使用它打包前端项目了

### (1) 特点

* 真正做到了`完全零配置`，对项目没有任何侵入
* 自动安装依赖，开发过程更专注
* 构建速度更快，内部使用了`多进程并发工作`，能够充分发挥`多核 CPU` 的效率

### (2) 与 Webpack 对比

* Webpack 生态更好，扩展更丰富，出现问题容易解决
* Webpack 随着不断发展，越来越好用，开发者也越来越熟悉

## 2. 无配置打包

### (1) 安装

`npm install parcel-bundler --save-dev`
  
通过 npm 安装 parcel，会产生 node_modules 依赖文件夹和 package-lock.json 文件

![安装](../../images/前端模块化/parcel/安装.png)

### (2) 打包

`npx parcel entry`
  
通过参数 entry 指定打包入口文件，Parcel 和 Webpack 一样支持以`任意类型文件`作为打包入口，但是 Parcel 官方建议使用 `HTML 文件`作为打包入口，官方理由是 HTML 文件是应用在浏览器运行时的入口

![打包](../../images/前端模块化/parcel/打包.png)

Parcel 打包结果与 Webpack 相似，JS 文件代码都是不易阅读的

dist/src.a2b27638.js

![src](../../images/前端模块化/parcel/src.png)

### (3) 本地服务器

打包执行完成后，Parcel 不仅打包了应用，还同时启动了一个本地服务器，就和 Webpack Dev Server 一样

![启动服务器](../../images/前端模块化/parcel/启动服务器.png)

## 3. 生产模式打包

`npx parcel build entry`

Parcel 打包命令中添加 build 就是以生产模式打包

## 4. 导入其他类型资源

Webpack 支持导入 JS 模块以外的其他类型资源模块，但是需要进行各种配置

Parcel 同样支持导入其他类型的资源模块，并且是`完全零配置`的

* src 文件夹下添加 style.css 文件
  
  ```css
  body {
    color: red;
  }
  ```

* src/index.js 文件中通过 ES6 Modules import 语法导入 CSS 文件
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'
  ```

* npx parcel index.html
  
  重新打包，浏览器打开本地服务 http://localhost:1234

  ![导入其他类型资源文件](../../images/前端模块化/parcel/导入其他类型资源文件.png)

## 5. 自动安装依赖

开发一个应用时，如果使用的是 Webpack 打包器，突然需要使用某个第三方依赖时，就需要停止正在运行的 Webapck Dev Server，然后再去安装这个模块，安装完成后再重新启动 Webapck Dev Server

Parcel 支持自动安装依赖，开发一个项目时，项目代码中只管正常导入模块，`保存文件后` Parcel 会自动安装导入模块

![自动安装依赖](../../images/前端模块化/parcel/自动安装依赖.gif)

## 6. 动态导入

Parcel 支持 ES6 Modules 的 `import()` 函数动态导入，从而实现模块的动态按需加载

src/index.js

```javascript
import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

// 导入其他类型资源
import './style.css'

// 自动安装依赖
// import $ from 'query'
// $(document.body).append('<h1>我是大可爱</h1>')

// 动态导入
import('jquery').then($ => {
  $(document.body).append('<h1>我是小可爱</h1>')
})
```

## 7. 模块热替换

Parcel 也支持模块热替换，Parcel 的 accept() 方法只接受`一个回调函数参数`，作用就是在`当前模块更新或者依赖的模块更新`过后`自动执行回调函数`

src/index.js

```javascript
import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

//HMR API 是否存在
if(module.hot){
  module.hot.accept(() => {
    console.log('HMR')
  })
}
```
