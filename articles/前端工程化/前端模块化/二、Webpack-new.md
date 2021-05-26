# 二、Webpack

## 1. 模块化

Webpack 本质上是一个现代 JS 应用程序的静态模块打包器，Webpack 处理应用程序时，会递归地构建一个`依赖关系图`，其中包含应用程序需要的每个模块，然后将所有模块打成一或多个包

### (1) 模块化的问题

模块化可以更好地解决复杂项目开发过程中的代码组织问题，但随着模块化思想的引入，前端应用又产生了一些新的问题

* ES6 Modules 模块系统本身存在环境兼容性问题，尽管主流浏览器的最新版本都支持，但是无法保证用户的浏览器使用情况
* 模块化方式划分出来的模块文件过多，前端应用运行在浏览器中，每个模块文件都需要从服务器请求，零散的模块文件会导致浏览器频繁发送请求，影响应用的工作效率
* 前端应用开发过程中，不仅仅 JS 文件需要模块化，HTML 和 CSS 这些资源文件也会面临模块化的问题

### (2) Webpack 针对模块化问题的解决方式

* 对于有环境兼容性问题的代码，Webpack 可以在打包过程中通过 babel-loader 对其实现编译转换，然后再进行打包
* 对于零散的 JS 文件，Webpack 可以将其打包到一个 JS 文件中
* 对于不同类型的前端模块，Webpack 支持在 JS 文件中以模块化的方式载入任意类型的资源文件，如在 JS 文件中载入 CSS 文件，就是通过 css-loader、style-loader 将 CSS 文件转换成 `<style>` 标签加载到 JS 文件代码中

## 2. Webpack 概念

### (1) module vs chunk vs bundle

一个 chunk 包含`一或多`个 module

* **module**：Webpack 模块
  * ES6 import
  * CommonJS require()
  * css/sass/less 文件中的 @import
  * 样式文件、HTML 文件中的图片链接 image url
* **chunk**：Webpack 处理过程中根据 module 依赖关系生成 chunk 文件
* **bundle**：Webpack 处理好 chunk 文件后，最终输出可在浏览器直接运行的 bundle 文件

### (2) hash vs chunkhash vs contenthash

* **hash**：hash 是`项目级别`的，整个项目的所有文件共用一个 hash，Webpack 每次重新构建打包时，如果项目没有任何更改，其 hash 值就不会改变，否则就会改变
  * `url-loader 管理的图片、字体、多媒体`等静态资源，应该在打包后的文件名里嵌套 hash，以避免缓存问题
* **chunkhash**：chunkhash 是 `JS 文件级别`的，每个 JS 模块及其依赖的任意类型模块共用一个 chunkhash，如果某个 JS 模块及其依赖的任意类型模块内容改变，其共用的 chunkhash 值就会改变，否则不会改变
  * `output 输出的 JS 文件`，应该在打包后的文件名里嵌套 chunkhash，以避免缓存问题
* **contenthash**：contenthash 是 `CSS 文件级别`的，每个 CSS 模块一个 contenthash，只要 CSS 模块内容不变，其 contenthash 值不会改变，否则就会改变
  * `单独输出的 CSS 文件`，应该在打包后的文件名里嵌套 contenthash，以避免缓存问题
  * contenthash 值的出现主要是为了让 CSS 文件不受 JS 文件的影响，比如 foo.css 被 foo.js 引用了，所以它们共用相同的 chunkhash，但这样是有问题的，如果 foo.js 修改了代码，foo.css 文件就算内容没有任何改变，其 hash、chunkhash 也会随之改变

### (3) 依赖图

一个模块依赖于另一个模块，Webpack 就视这两个模块之间有依赖关系

Webpack 从配置文件定义的入口 `entry` 开始，`递归`地构建一个依赖图，这个依赖图包含着应用程序所需的所有模块

### (4) runtime & manifest

使用 Webpack 构建的应用程序中，主要存在以下三种代码类型

* 业务源码
* 引用的第三方 npm 包
* Webpack 的 runtime、manifest 文件，用于管理所有模块的交互
  * **manifest 文件**：编译器 Compiler 开始执行、解析、映射应用程序`源代码`时，manifest 文件保留所有模块的详细要点
  * **runtime 文件**：runtime 文件包含浏览器运行时连接模块所需的加载和解析逻辑代码，浏览器中已加载模块的连接，以及懒加载模块的执行逻辑
  * Webpack 完成打包并发送到浏览器运行时，`/src 目录结构将不复存在`，import、require 等模块导入语句都将转换成 `__webpack_require__` 方法，该方法指向`模块标识符`，runtime 文件通过 manifest 文件查询模块标识符，检索出背后对应的模块，完成加载和解析模块的功能

## 3. Webpack 安装

* npm init

  初始化项目，生成 package.json 文件，管理项目依赖的 npm 包

* 项目根目录添加 .gitignore 文件，配置忽略而无需提交到 git 的目录和文件

  ```gitignore
  .DS_Store
  node_modules/
  dist/
  npm-debug.log*
  yarn-debug.log*
  yarn-error.log*
  **/*.log

  test/unit/coverage
  test/e2e/reports
  selenium-debug.log

  # Editor directories and files
  .idea
  .vscode
  *.suo
  *.ntvs*
  *.njsproj
  *.sln

  package-lock.json
  ```

* npm i webpack webpack-cli webpack-dev-server -D

  安装开发环境下的 webpack 相关依赖

## 4. Webpack 基本配置

### (1) 构建目标 target

Webpack 提供 target 配置`设置构建目标为浏览器代码还是服务器代码`，因为现在两者都可以用 JS 语言编写

|属性|用途|
|----|----|
|web|编译为类浏览器环境可用（默认）|
|webworker|编译为一个 WebWorker|
|node|编译为类 Node 环境可用（require 加载 chunk）|
|async-node|编译为类 Node 环境可用（使用 fs 和 vm 异步加载 chunk）|
|electron-main|编译为 Electron 主进程|
|electron-renderer|编译为 Electron 渲染进程|

webpack.config.js

```javascript
module.exports = (env, argv) => {
  const config = {
    target: 'web',
  }
  return config
}
```

### (2) 模式 mode

开发环境和生产环境有很大的差异，Webpack 提供 mode 配置为开发者提供不同模式下的预设配置

* 开发环境 development
  * 注重`开发效率`，方便开发人员调试
  * Webpack `自动优化打包速度`，添加一些调试过程中的辅助插件

* 生产环境 production
  * 注重`运行效率`，强调以更少量更高效的代码完成业务功能
  * Webpack `自动优化打包结果`，启动内置优化压缩插件，打包速度偏慢

#### ① Node 环境变量

package.json 设置 Node 环境变量有以下 2 种方式

* 方式一

  package.json

  ```json
  {
    "scripts": {
      "serve": "set NODE_ENV=development&&webpack serve",
      "build": "set NODE_ENV=production&&webpack"
    },
  }
  ```

  webpack.config.js

  ```javascript
  console.log(process.env.NODE_ENV) //'development' 'production'

  module.exports = (env, argv) => {
    console.log(argv.nodeEnv) //undefined
  }
  ```

* 方式二
  
  package.json

  ```json
  {
    "scripts": {
      "serve": "webpack serve --node-env=development",
      "build": "webpack --node-env=production"
    },
  }
  ```

  webpack.config.js

  ```javascript
  console.log(process.env.NODE_ENV) //'development' 'production'

  module.exports = (env, argv) => {
    console.log(argv.nodeEnv) //'development' 'production'
  }
  ```

#### ② Webpack 环境变量

package.json 设置 Webpack 环境变量有以下 2 种方式

* 方式一

  package.json

  ```json
  {
    "scripts": {
      "serve": "webpack serve --env=development",
      "build": "webpack --env=production"
    },
  }
  ```

  webpack.config.js

  ```javascript
  module.exports = (env, argv) => {
    console.log(env)       //{ WEBPACK_SERVE: true, development: true } 
                           //{ WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, production: true }
    console.log(argv.mode) //undefined
  }
  ```

* 方式二
  
  package.json

  ```json
  {
    "scripts": {
      "serve": "webpack serve --mode=development",
      "build": "webpack --mode=production"
    },
  }
  ```

  webpack.config.js

  ```javascript
  module.exports = (env, argv) => {
    console.log(env)       //{ WEBPACK_SERVE: true }
                           //{ WEBPACK_BUNDLE: true, WEBPACK_BUILD: true }
    console.log(argv.mode) //'development' / 'production'
  }
  ```

#### ③ Node 环境变量配置为 Webpack 环境变量

package.json

```json
{
  "scripts": {
    "serve": "webpack serve --node-env=development",
    "build": "webpack --node-env=production"
  },
}
```

webpack.config.js

```javascript
module.exports = (env, argv) => {
  const config = {
    target: 'web',
    mode: argv.nodeEnv,
  }
  return config
}
```

### (3) 开发工具 devtool

Webpack 将开发阶段编写的源代码打包成客户端浏览器实际运行的代码，也就意味着实际运行的代码和真正编写的代码之间存在很大差异（`loader、ES6 语法转换、压缩`），这种情况下打包后的应用程序在运行过程中出现意料之外的错误将无从下手，因为只能在浏览器控制台看到错误信息定位在打包后的代码位置，而无法直接定位到源代码的位置

Webpack 提供 devtool 配置为开发者提供`源代码地图 SourceMap 文件`，SourceMap 文件是一个 `.map` 后缀的 `JSON` 格式文件，SourceMap 文件其实就是`源代码和打包后代码的映射关系表`，打包后的代码通过 SourceMap 文件就可以逆向解析得到源代码

目前很多第三方库都会在发布时同时提供一个 SourceMap 文件，记录了转换前后代码的映射关系，主要存在以下几个属性

* **version**：使用的 SourceMap 标准版本
* **sources**：转换前的源文件名称
* **names**：源代码中使用的一些成员名称
* **mappings**： base64-VLQ 编码字符串，记录转换后代码的字符与转换前代码的字符之间的映射关系

#### ① jquery SourceMap

![jquery](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/jquery.png)

* jquery.min.map
  
  ![jquery_map](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/jquery_map.png)

* jquery.min.js
  
  一般我们在转换后的代码中通过`添加一行注释`的方式引入 SourceMap 文件，用于开发调试
  
  ![引入SourceMap](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E5%BC%95%E5%85%A5SourceMap.png)

* index.html
  
  chrome 浏览器打开 index.html 文件，然后 F12 打开控制台 source 面板，可以看到自动请求了 jquery.min.map 文件，然后根据文件内容逆向解析出来源代码 jquery.js 文件，以便于调试
  
  ![解析源代码](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E8%A7%A3%E6%9E%90%E6%BA%90%E4%BB%A3%E7%A0%81.png)
  
  还可以添加一个断点，然后刷新页面进行单点调试，此时调试的就是源代码而非压缩后的代码
  
  ![调试源代码](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E8%B0%83%E8%AF%95%E6%BA%90%E4%BB%A3%E7%A0%81.png)

#### ② Webpack SourceMap

Webpack 支持 12 种不同的 SourceMap 机制

* **开发环境**：无论是 Vue 项目还是 React 项目，loader 转换前后代码差别很大，而开发者一般是需要`调试 loader 转换前的代码`，这种情况下错误`定位到行`就够了，省略列信息可以提升构建速度，因此推荐 `eval-cheap-module-source-map` 模式
* **生产环境**：SourceMap 会暴露源代码到生产环境，如果没有控制 SourceMap 文件的访问权限，但凡有点技术的人都很容易复原项目中绝大多数源码，这非常不安全也不合理，因此建议设置为 `false`

* webpack.config.js

  ```javascript
  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    }
    return config
  }
  ```

![source_map模式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/source_map%E6%A8%A1%E5%BC%8F.png)

### (4) 环境上下文 context

Webpack 提供 context 配置`设置某个目录的绝对路径为环境上下文`，默认使用`当前目录`，推荐设置`项目根目录`

webpack.config.js

```javascript
const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

module.exports = (env, argv) => {
  const config = {
    target: 'web',
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: path.pathResolve(__dirname, './'), // 设置项目根目录为环境上下文
  }
  return config
}
```

### (5) 入口 entry

Webpack 提供 entry 配置`设置哪个模块作为构建依赖关系图的开始`，Webpack 首先进入入口，然后找出入口直接或间接依赖的模块和库，每个依赖项随即被处理，最后被输出到 bundles 文件

> entry 配置可以指定`一或多个`入口，其入口模块的路径必须是`相对 context 配置的目录`

webpack.config.js

```javascript
const path = require('path')
const pathResolve = dir => path.join(__dirname, dir) // 将第二个参数解析为绝对路径

module.exports = (env, argv) => {
  const config = {
    target: 'web',
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: pathResolve('./'), // 设置项目根目录为环境上下文
    entry: {
      app: './src/index.js' // 相对 context 配置
    },
  }
  return config
}
```

### (6) 出口 output

Webpack 提供 output 配置`设置在磁盘哪里输出创建的 bundles 文件，以及如何向磁盘写入编译文件，如何命名这些文件等`

> output 配置只能指定`一个`出口

webpack.config.js

```javascript
const path = require('path')
const pathResolve = dir => path.join(__dirname, dir) // 将第二个参数解析为绝对路径
const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

module.exports = (env, argv) => {
  const config = {
    target: 'web',
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: pathResolve('./'), // 设置项目根目录为环境上下文
    entry: {
      app: './src/index.js' // 相对 context 配置
    },
    output: {
      filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
      path: pathJoin('./dist'),             // 输出目录
      publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
    },
  }
  return config
}
```

### (7) 解析器 resolve

Webpack 提供 resolve 配置`设置模块如何被解析`

* 别名 alias：设置导入模块时的路径别名
* 扩展 extensions：自动解析指定的扩展，使开发者引入模块时不带扩展

|常用属性   |用途|
|----------|----|
|alias     |设置导入模块时的路径别名|
|extensions|自动解析指定的扩展，使开发者引入模块时不带扩展|

webpack.config.js

```javascript
const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
    }
    return config
}
```

## 5. 浏览器热更新（watch、devServer、HMR）

浏览器热更新是指本地开发的同时打开浏览器预览，当文件代码发生变化时，`浏览器自动更新页面内容`的技术，有以下 2 种更新方式

* 自动刷新整个页面：watch、devServer
* 自动更新页面部分内容（页面整体无刷新）：HMR

### (1) 保存后自动编译打包（Auto Compile）— watch

Webpack 提供 watch 配置`设置在打包后不退出当前 node 进程`，而是继续监控源文件代码是否发生变化，当源文件代码发生变化后自动再次执行该流程实现自动编译，直到`用户退出`

> watch 模式使得开发者无需每次手动执行打包，但问题并未解决，在浏览器预览时仍需要`手动刷新页面`才能看到变更效果

* package.json

  ```json
  "scripts": {
    "serve": "webpack serve --node-env=development",
    "build": "webpack --node-env=production",
    "watch": "wabpack --node-env=production --watch"
  }
  ```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
    }

    // watch 模式
    if (argv.watch) {
      config.watchOptions = {
        aggregateTimeout: 300, // 将指定延迟内的所有更改都聚合到这次的重新构建
        ignored: /node_modules/, // 不监听 node_modules 文件夹，避免占用大量 CPU 和内存
      }
    }

    return config
  }
  ```

* src/components/textarea.js

  ```javascript
  export default () => {
    const element = document.createElement('textarea')
    return element 
  }
  ```

* src/index.js

  ```javascript
  const Title = document.createElement('h2')
  Title.textContent = 'Hello Webpack'
  document.body.append(Title)

  import createTextarea from './components/textarea.js'
  const Textarea = createTextarea()
  document.body.append(Textarea)
  ```

* npm run watch
  
  ![dist_watch_before1]()

  修改 index.html 文件 script 标签 src 属性为打包后的 js 文件路径，`http-server` 打开查看效果

  ![dist_watch_before2]()
  
* src/components/textarea.js

  修改 textarea.js 模块代码，测试 watch 模式
  
  ```javascript
  export default () => {
    const element = document.createElement('textarea')

    // 保存后自动编译打包 - watch
    console.log('watch 模式')
    
    return element 
  }
  ```

* 保存后自动编译

  ![dist_watch_after1]()

  由于修改代码会导致 JS 文件名中的 chunkhash 改变，因此需要再次修改 index.html 文件 script 标签 src 属性，http-server 打开查看效果，需要手动刷新页面才能看到新的效果
  
  ![dist_watch_after2]()

### (2) 保存后自动编译打包且自动刷新浏览器（Live Reload）— devServer

Webpack devServer 是 Webpack 官方推出的一款 `Web 静态服务器`，将自动编译打包、自动刷新浏览器等一系列对开发友好的功能全部集成到一起

devServer 为了提高工作速率，并没有将打包结果写入到磁盘，而是暂时存放在`内存`，内部的 HTTP Server 也是从内存读取这些文件，这样一来就会减少很多不必要的磁盘读写操作，大大提高整体的构建效率

devServer 服务器是一种 `WebSocket` 通信机制，用来连接`浏览器预览页面`与`本地监控代码变更的 node 进程`，实现本地代码变更后的自动编译打包、自动刷新浏览器，devServer `默认开启 watch 模式`，本地代码变更时，将变更内容推送到浏览器

devServer 是一个本地 Web 服务器，所以开发阶段前端应用程序独立运行于前端人员电脑的 localhost 的一个端口上，后端应用程序运行于后端人员的电脑上，因此前后端是`跨域`的，而最终上线后，前端应用程序和后端应用程序一般会部署到同一个服务器的同一个 IP 地址的不同端口上，这也是`跨域`的，解决`开发阶段`跨域请求的最好办法，就是在本地 Web 服务器中配置一个后端 API 的代理服务，具体方法是在配置文件 webpack.config.js 的 devServer 属性，添加一个 `proxy` 属性

> devServer 自动刷新页面会`丢失页面的操作状态`

* npm i html-webpack-plugin -D

  devServer 需要 `html-webpack-plugin` 插件才能实现自动刷新浏览器，后续在插件 Plugin 章节说明原因

* webpack.config.js
  * 前端：http://localhost:8081
  * 代理：http://localhost:8081/api/users
  * 后端：http://github.com/users
  
  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        overlay: { errors: true, warnings: false },
        proxy: {
          '/api': {
            target: 'https://github.com',
            //代理服务器默认请求实际在浏览器中请求的主机名localhost:8081,
            //设置changeOrigin=true,代理服务器就会请求代理主机名github.com
            changeOrigin: true,
            pathRewrite: {
              '/api': '/'
            }
          }
        }
      }
    }

    return config
  }
  ```

* npm run serve

  浏览器页面上 textarea 输入框输入 ddddd...

  ![serve_devServer_before]()

* src/components/textarea.js

  修改 textarea.js 模块代码，测试 devServer
  
  ```javascript
  export default () => {
    const element = document.createElement('textarea')

    // 保存后自动编译打包且自动刷新浏览器 - devServer
    element.style.color = 'red'
    
    return element 
  }
  ```

  Ctrl + S 保存文件代码，终端重新编译打包如下

  ![serve_devServer_after1]()

  观察浏览器页面变化如下，可得知 devServer 自动刷新页面会丢失操作状态

  ![serve_devServer_after2]()

### (3) 模块热替换（Hot Module Replacement，HMR）— HMR

Webpack HMR 完整功能主要包含了以下 3 方面的技术

* **watch 模式**：对本地源代码文件变更的监控 node 进程
* **devServer 服务器**：浏览器预览页面与本地服务器的 `WebSocket 通信`，本地代码变更时，将变更内容推送到浏览器
* **HMR 功能**：模块解析与替换

模块热替换（hot module replacement，HMR）功能就是在应用程序运行过程中替换、添加、删除模块，而无需重新加载整个页面的技术，Webpack HMR 就是为了解决 devServer 刷新页面导致的状态丢失问题

* webpack.config.js 文件配置 HMR 需要配置 2 处地方
  * devServer `hot` 属性设置为 true
  * devServer `hotOnly` 属性设置为 true，避免 JS 文件 HMR 处理函数出现错误导致回退到自动刷新页面
  * 通过 webpack 模块加载 `HotModuleReplacementPlugin` 插件

  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

* npm run serve

  ![serve_hmr_before]()

* src/components/textarea.js

  修改 textarea.js 模块代码，触发模块热替换 HMR

  ```javascript
  export default () => {
    const element = document.createElement('textarea')

    // 触发 HMR
    element.style.color = 'red'

    return element 
  }
  ```

* src/index.js
  * 开发者编写的 JS 文件是没有任何规律的，导出的可能是一个对象/字符串/函数，使用时也各不相同，Webpack 面对这些毫无规律的 JS 文件，无法实现一个通用所有情况的 HMR 方案
  * 因此 JS 文件要实现 HMR 需要`开发者调用插件 HotModuleReplacementPlugin API 手动处理`
  * CSS 等其他资源文件无需开发者手动实现 HMR 处理函数，因为相应的 loader 集成了 HMR 功能，例如 css-loader、vue-loader 等

  ```javascript
  const Title = document.createElement('h2')
  Title.textContent = 'Hello Webpack'
  document.body.append(Title)

  import createTextarea from './components/textarea.js'
  const Textarea = createTextarea()
  document.body.append(Textarea)

  // HMR 处理函数
  let lastTextarea = Textarea
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./components/textarea.js', () => {
      const value = lastTextarea.value
      document.body.removeChild(lastTextarea)
      lastTextarea = createTextarea()
      lastTextarea.value = value
      document.body.append(lastTextarea)
    })
  }
  ```

* 操作步骤同上，保存文件代码后观察页面变化如下

  ![serve_hmr_after]()

## 6. 加载器 loader

Webpack 提供 loader 机制，`loader 可以在 import 模块时预处理模块`，因此 loader 类似于其他构建工具中的任务 task，`loader 还可以将其他类型资源模块转换为 JS 模块，或将内联模块转换为 data URL`，实现所有类型资源模块的加载，从而实现项目的整体模块化

* **JS 模块**：Webpack 内置 JS 模块加载器，无需 loader 即可加载 JS 模块，但是在工程化的项目中，我们还需要对 ES6 代码进行语法检查以及将 ES6 语法转换成浏览器可直接识别的 ES5 语法，这就需要相应的 loader 进行处理
* **其他类型资源模块**：loader 用于将其他类型资源模块转换为 JS 模块，或将内联模块转换为 data URL，从而实现项目的整体模块化

### (1) 加载 CSS

* npm i css-loader -D
  
  css-loader 的作用就是`将 CSS 模块转换为 JS 模块`，但是并没有使用这个模块

* npm i style-loader -D

  style-loader 的作用就是将 css-loader 转换后的 JS 模块通过 `<style>` 标签追加到页面

* src/style/index.css

  ```css
  body {
    color: red;
  }
  ```

* src/index.js

  ```javascript
  const Title = document.createElement('h2')
  Title.textContent = 'Hello Webpack'
  document.body.append(Title)

  import createTextarea from './components/textarea.js'
  const Textarea = createTextarea()
  document.body.append(Textarea)

  // 加载 CSS 模块
  import './assets/style.css'
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

* npm run serve

  ![serve_css_style_loader]()

### (2) 加载图片

* npm i file-loader -D

  file-loader 将指定资源文件`拷贝至输出目录`

* npm i url-loader -D

  当文件小于限定大小时，url-loader 将文件转换为 `DataURL`，否则 url-loader 使用 `file-loader` 将文件拷贝至输出目录

* src/style/index.css

  ```css
  body {
    background: url('../assets/cat.jpg');
    color: red;
  }
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
            exclude: /(node_modules)/, 
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

* npm run serve

  ![serve_file_url_loader_image]()

### (3) 加载字体

* src/style/index.css

  ```css
  @font-face {
    font-family: 'myFont';
    src: url('../assets/TJS.ttf');
  }
  body {
    background: url('../assets/cat.jpg');
    font-family: 'myFont';
    color: red;
  }
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
            exclude: /(node_modules)/, 
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

* npm run serve

  ![serve_file_url_loader_font]()

### (4) 加载多媒体

* src/index.js

  ```javascript
  const Title = document.createElement('h2')
  Title.textContent = 'Hello Webpack'
  document.body.append(Title)

  import createTextarea from './components/textarea.js'
  const Textarea = createTextarea()
  document.body.append(Textarea)

  // 加载 CSS 模块
  import './style/index.css'

  // 加载多媒体模块
  import movie from './assets/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/,
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
            exclude: /(node_modules)/, 
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'media/[name].[ext]',
                publicPath: './'
              }
            }
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

* npm run serve

  ![serve_file_url_loader_media]()

### (5) 加载数据

Webpack 还支持加载数据文件，例如 JSON 文件、XML 文件等，JSON 是 Webpack 内置的无需 loader 处理，XML 文件需要 xml-loader 处理

* npm i xml-loader -D

* src/index.js

  ```javascript
  const Title = document.createElement('h2')
  Title.textContent = 'Hello Webpack'
  document.body.append(Title)

  import createTextarea from './components/textarea.js'
  const Textarea = createTextarea()
  document.body.append(Textarea)

  // 加载 CSS 模块
  import './style/index.css'

  // 加载多媒体模块
  import movie from './assets/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 加载 JSON 模块
  import Person from './assets/data1.json'
  console.log(Person)

  // 加载 XML 模块
  import Info from './assets/data2.xml'
  console.log(Info)
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            exclude: /(node_modules)/,
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'media/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.xml$/,
            use: 'xml-loader'
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

* npm run serve

  ![serve_xml_loader]()

## 7. 插件 plugin

loader 机制是为了完成项目中其他类型资源模块的加载，从而实现项目的整体模块化

plugin 机制是为了解决项目中除资源模块打包以外的其他自动化工作，因此 plugin 的能力范围更广用途更多

### (1) clean-webpack-plugin

Webpack 每次打包的结果都是直接覆盖到 dist 目录，因此打包之前 dist 目录就可能存在上次打包遗留的文件，再次打包时只能覆盖同名文件，故而已经移除的资源文件就会一直积累在里面，导致部署上线时出现多余文件，这显然非常不合理

clean-webpack-plugin 插件就是在每次打包之前，清除 dist 目录

* npm i clean-webpack-plugin -D

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'media/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.xml$/,
            use: 'xml-loader'
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

### (2) html-webpack-plugin

HTML 文件一般是单独存放在项目根目录下，这会导致以下 2 个问题

* 项目发布时需要同时发布项目根目录下的 HTML 文件和 dist 目录下的打包结果，并且需要修改 HTML 文件下的引用为打包后的文件路径
* 打包结果的输出目录或者文件名改变，需要手动修改 HTML 文件中对应的 script 标签的 src 属性，其他类型资源文件通过 loader 加载到 JS 文件代码，loader 内置该功能因此无需手动修改

html-webpack-plugin 插件能够在 Webpack 打包的同时，`自动生成使用打包结果的 HTML 文件到 dist 目录`，让 HTML 文件也参与到整个项目的构建过程

* 项目发布时只需要发布 dist 目录
* 新生成的 HTML 文件中 script 标签是 html-webpack-plugin 插件自动引入的，因此可以确保 JS 文件的路径和名称正确

html-webpack-plugin 插件的使用如下

* npm i html-webpack-plugin -D

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /(node_modules)/, 
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'media/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.xml$/,
            use: 'xml-loader'
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    return config
  }
  ```

### (3) copy-webpack-plugin

copy-webpack-plugin 插件用于在打包时将无需通过 file-loader 处理的资源文件拷贝到输出目录（一般放在 static 文件夹）

* npm i copy-webpack-plugin -D

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
            exclude: /(node_modules)/, 
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'media/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.xml$/,
            use: 'xml-loader'
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/static/test.js', to: './static' }
          ]
        })
      ]
    }

    return config
  }
  ```

* npm run build

  ![dist_copy_webpack_plugin]()

## 8. 代码检查、转换、压缩

### (1) ES6 语法检查（ESlint）

ESlint 是一个使用 Node 编写的开源 JS 代码检查工具，代码检查是一种静态分析，常用于检查有问题的代码和模式，并不依赖于具体的编码风格，ESlint 的所有规则都被设计成可插入的，每条规则都是各自独立的

* npm i eslint eslint-webpack-plugin -D

  eslint-loader 已废弃，目前使用最新的 eslint-webpack-plugin

* npm i @babel/core @babel/eslint-parser -D

  @babel/eslint-parser 作为 eslint 的解析器

* 项目根目录下执行 `./node_modules/.bin/eslint --init`，自动创建 .eslintrc.js 文件

  ```js
  module.exports = {
    "root": true, // 在当前根目录下寻找配置文件
    "env": { // eslint 脚本运行环境
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": "eslint:recommended", // 启用 eslint 默认规则
    "parserOptions": {
      "ecmaVersion": 12,                // ES6 语法版本
      "sourceType": "module",           // ES6 模块
      "parser": "@babel/eslint-parser", // 指定解析器
    },
    "rules": {} // 自定义规则
  };
  ```

* 项目根目录下新建 .eslintignore 文件

  ```eslintignore
  node_modules
  dist
  config/*.js
  src/assets
  src/public
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
  const pathJoin = dir => path.join(__dirname, '..', dir) // 连接路径

  module.exports = (env, argv) => {
    const config = {
      target: 'web',
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
      context: pathResolve('./'), // 设置项目根目录为环境上下文
      entry: {
        app: './src/index.js' // 相对 context 配置
      },
      output: {
        filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
        path: pathJoin('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.css$/, 
            exclude: /(node_modules)/, 
            use: ['style-loader', 'css-loader'] 
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, 
            exclude: /(node_modules)/, 
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,             // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: './'          // 打包后引用地址（相对 name）
              }
            }
          },
          {
            test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'fonts/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, 
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000,
                name: 'media/[name].[ext]',
                publicPath: './'
              }
            }
          },
          {
            test: /\.xml$/,
            use: 'xml-loader'
          },
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html', // 文件名
          title: 'Webpack',       // title 属性
          meta: {                 // meta 标签
            viewPort: 'width=device-width'
          }
        }),
        new ESLintWebpackPlugin(), // 代替已废弃的 eslint-loader
      ]
    }

    // 开发环境：devServer
    if (argv.nodeEnv === 'development') {
      config.devServer = {
        port: '8081',
        open: true,
        hot: true,
        hotOnly: true,
        overlay: { errors: true, warnings: false },
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/static/test.js', to: './static' }
          ]
        })
      ]
    }

    return config
  }
  ```

### (2) ES6 转换 ES5（Babel）

* **@babel/core**：转换 ES6 代码的核心方法
* **@babel/preset-env**：babel 是插件化的，什么插件都不配，输入输出就是一样的，因此需要配置插件来转换 `ES6 标准语法`，@babel/preset-env 是一个`智能预设`，处理 ES6 规范语法的插件集合，会按需加载需要的插件
* **@babel/polyfill**：babel 默认只会转换 ES6 标准语法，不会转换 Promise 等新增的全局 API，@babel/polyfill 负责转换新增 API
* **@babel/plugin-transform-runtime**：babel 转换复杂语法例如 class 等时会引入一些 helper 函数，@babel/plugin-transform-runtime 负责将这些 helper 函数抽离到一个公共包，用到的地方只需要引入对应函数，从而减少代码量

* npm i babel-loader @babel/preset-env @babel/plugin-transform-runtime -D

* 项目根目录下新建 babel.config.js 文件

  ```javascript

  ```

### (3) JS 代码压缩

### (4) CSS 代码压缩

## 9. Webpack 编译阶段优化

## 10. Webpack 打包阶段优化

### (1) moduleId vs chunkId

* **moduleId**：Webpack 内部为每个 module 维护了一个递增的 moduleId，当增加或删除 moudle 的时候，就需要增加或删除 moduleId，导致其他 module 虽然内容没有变化，但由于 moduleId 被强占，自身 moduleId 只能自增或自减，因此整个 moduleId 表的顺序都错乱了
  
  chunk 内部的每个 module 都有一个 moduleId，如果引用一个新文件或删除一个旧文件，都可能导致其他文件的 moduleId 变化，这样缓存就失效了
  
  ![moduleId表](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/moduleId%E8%A1%A8.png)
  
  Webpack 提供 `HashedModuleIdsPlugin` 插件解决这个问题，不使用自增的 moudleId，使用 `hash 之后的文件路径`作为 moudleId
  
  ![新moduleId](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E6%96%B0moduleId.png)

* **chunkId**：Webpack 内部为每个 chunk 维护了一个递增的 chunkId，当增加或删除 chunk 的时候，就需要增加或删除 chunkId，导致其他 module 虽然内容没有变化，但由于 chunkId 被强占，自身 chunkId 只能自增或自减，因此整个 chunkId 表的顺序都错乱了
  
  Webpack 提供 `NamedChunkPlugin` 插件解决这个问题，但是该插件只对有 name 的 chunk 有效，因此对于`路由懒加载`的页面无效，`NamedChunkPlugin` 插件支持自定义 `nameResolver` 规则解决路由懒加载无效的问题

  * webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
  const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
  const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, 'dist_moduleId_chunkId_111')
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '..', 'src')
      },
      extensions: ['.js', '.json', '.vue']
    },
    module: {
      rules: [{
          test: /\.css$/, //正则匹配文件路径
          use: [ //指定具体的loader,一组链式loader按相反顺序执行
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,                    //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[hash].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'                 //打包后引用地址(相对name)
            }
          }
        },
        {
          test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
          exclude: /(node_modules)/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000, 
              name: 'fonts/[name].[hash].[ext]',
              publicPath: '../'
            }
          }
        },
        {
          test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
          exclude: /(node_modules)/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000, 
              name: 'media/[name].[hash].[ext]',
              publicPath: './'
            }
          }
        },
        {
          test: /\.md$/,
          use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html', //文件名
        title: 'Webpack',       //title属性
        meta: {                 //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new RemoveCommentsPlugin(),
      new webpack.IgnorePlugin({ //构建时忽略指定目录
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',     //入口文件中引入的CSS文件
        chunkFilename: 'css/[name].[contenthash].css' //入口文件中未引入,通过按需加载引入的CSS文件
      }),
      new webpack.HashedModuleIdsPlugin(), //固定hash之后的文件路径作为moduleId
      new webpack.NamedChunksPlugin(chunk => { //固定chunkId
        if (chunk.name) {
          return chunk.name;
        }
        const modules = Array.from(chunk.modulesIterable);
        if (modules.length > 1) {
          const hash = require("hash-sum");
          const joinedHash = hash(modules.map(m => m.id).join("_"));
          let len = nameLength;
          while (seen.has(joinedHash.substr(0, len))) len++;
          seen.add(joinedHash.substr(0, len));
          return `chunk-${joinedHash.substr(0, len)}`;
        } else {
          return modules[0].id;
        }
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,         //无副作用打包
      minimizer: [
        // new UglifyJsWebpackPlugin(), //压缩JS文件
        new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
      ]
    },
  }
  module.exports = config
  ```

  * npx webpack
  
  ![moduleId_chunkId打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/moduleId_chunkId%E6%89%93%E5%8C%85.png)
