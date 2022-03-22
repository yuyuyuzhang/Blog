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

### (1) Webpack 构建流程

Webpack 构建是一个`串行`的过程

* **初始化配置对象**：Webpack cli 启动打包流程，整合 cli 参数和配置文件，得到一个完整的配置对象
* **开始构建**：载入 Webpack 核心模块，使用配置对象创建和初始化 Compiler 对象，使用 Compiler 对象开始构建整个项目
* **解析依赖关系树**：从配置的入口文件开始，根据代码中出现的 `import、require` 语句解析入口文件依赖的模块，然后再分别去解析每个依赖模块的依赖，周而复始，最终形成整个项目中所有用到的文件的`依赖关系树`

  ![依赖关系树](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB%E6%A0%91.gif)

* **编译模块**：`遍历`依赖关系树，根据配置文件将每个模块交给对应的 loader 处理，直到整个依赖关系树都处理完成
  * Webpack 内置 loader 处理 JS 模块
  * loader 机制处理 JS 外其他类型资源模块，例如 CSS、图片等
  * 对于无需通过 JS 代码表示的资源文件，例如超过 url-loader limit 限制的资源文件，直接通过 file-loader 拷贝到输出目录，并将这个资源文件的访问路径作为这个模块的导出成员暴露给外部
* **组装 chunk**：合并 loader 处理完的结果，组装成一个个包含一或多个模块的 `chunk` 文件
* **输出 bundle**：根据配置文件将输出的可在浏览器直接运行的 `bundle` 文件写入文件系统

### (2) module vs chunk vs bundle

一个 chunk 包含`一或多`个 module

* **module**：Webpack 模块
  * ES6 import
  * CommonJS require()
  * css/sass/less 文件中的 @import
  * 样式文件、HTML 文件中的图片链接 image url
* **chunk**：Webpack 合并 loader 处理完的结果，组装成 chunk 文件
* **bundle**：Webpack 根据配置文件最终输出可在浏览器直接运行的 bundle 文件

![module_chunk_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/module_chunk_bundle.png)

### (3) hash vs chunkhash vs contenthash

当我们把打包后的 dist 目录部署到服务器上后，客户端浏览器就能够访问该服务器的网站和资源，而获取资源是比较耗时的，因此浏览器使用一种名为`缓存`的技术，可以通过命中缓存，降低网络流量，使网站加载速度更快

然而如果我们在部署新版本时，未更改资源文件名，浏览器很可能会认为其未更新，转而使用缓存版本，如果新版本和缓存版本资源内容不同，就需要用户手动清除浏览器缓存之后才能访问新版本，这对用户来说很不方便

Webpack 提供一种在`文件名里嵌入 hash` 的方式，使得每次打包都生成新的文件名，从而告诉浏览器是否要读取缓存

* **hash**：hash 是`项目级别`的，整个项目的所有文件共用一个 hash，Webpack 每次重新构建打包时，如果项目没有任何更改，其 hash 值就不会改变，否则就会改变
  * `url-loader 管理的图片、字体、多媒体`等静态资源，应该在打包后的文件名里嵌套 hash，以避免缓存问题
* **chunkhash**：chunkhash 是 `JS 文件级别`的，每个 JS 模块及其依赖的任意类型模块共用一个 chunkhash，如果某个 JS 模块及其依赖的任意类型模块内容改变，其共用的 chunkhash 值就会改变，否则不会改变
  * `output 输出的 JS 文件`，应该在打包后的文件名里嵌套 chunkhash，以避免缓存问题
* **contenthash**：contenthash 是 `CSS 文件级别`的，每个 CSS 模块一个 contenthash，只要 CSS 模块内容不变，其 contenthash 值不会改变，否则就会改变
  * `单独输出的 CSS 文件`，应该在打包后的文件名里嵌套 contenthash，以避免缓存问题
  * contenthash 值的出现主要是为了让 CSS 文件不受 JS 文件的影响，比如 foo.css 被 foo.js 引用了，所以它们共用相同的 chunkhash，但这样是有问题的，如果 foo.js 修改了代码，foo.css 文件就算内容没有任何改变，其 hash、chunkhash 也会随之改变

### (4) moduleId vs chunkId

* **moduleId**：Webpack 内部为每个 module 维护了一个递增的 moduleId，当增加或删除 moudle 的时候，就需要增加或删除 moduleId，导致其他 module 虽然内容没有变化，但由于 moduleId 被强占，自身 moduleId 只能自增或自减，因此整个 moduleId 表的顺序都错乱了
  * chunk 内部的每个 module 都有一个 moduleId，如果引用一个新文件或删除一个旧文件，都可能导致其他文件的 moduleId 变化，这样缓存就失效了
    ![moduleId表](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/moduleId%E8%A1%A8.png)
  * Webpack4 提供 `HashedModuleIdsPlugin` 插件解决这个问题，不使用自增的 moudleId，使用 `hash 之后的文件路径`作为 moudleId
  * Webpack5 内置该插件解决这个问题，无需手动下载配置
    ![新moduleId](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E6%96%B0moduleId.png)
* **chunkId**：Webpack 内部为每个 chunk 维护了一个递增的 chunkId，当增加或删除 chunk 的时候，就需要增加或删除 chunkId，导致其他 module 虽然内容没有变化，但由于 chunkId 被强占，自身 chunkId 只能自增或自减，因此整个 chunkId 表的顺序都错乱了
  * Webpack4 提供 `NamedChunkPlugin` 插件解决这个问题，但是该插件只对有 name 的 chunk 有效，对于`路由懒加载`的页面无效，但是 NamedChunkPlugin 插件支持自定义 `nameResolver` 规则解决路由懒加载无效的问题
  * Webpack5 内置该插件解决这个问题，无需手动下载配置

### (5) runtime & manifest

使用 Webpack 构建的应用程序中，主要存在以下三种代码类型

* 业务源码
* 引用的第三方 npm 包
* Webpack 的 runtime、manifest 文件，用来管理所有模块的交互
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

```js
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

  ```js
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

  ```js
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

  ```js
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

  ```js
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

```js
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

  ```js
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

```js
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

Webpack 提供 entry 配置`设置哪个模块作为构建依赖关系图的开始`，Webpack 首先进入入口，然后找出入口直接或间接依赖的模块和库，每个依赖项随即被处理，最后被输出到 bundle 文件

> entry 配置可以指定`一或多个`入口，其入口模块的路径必须是`相对 context 配置的目录`

webpack.config.js

```js
const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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

Webpack 提供 output 配置`设置在磁盘哪里输出创建的 bundle 文件，以及如何向磁盘写入编译文件，如何命名这些文件等`

> output 配置只能指定`一个`出口

webpack.config.js

```js
const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
      path: pathResolve('./dist'),             // 输出目录
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

```js
const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
  
  ```js
  const webpack = require('webpack')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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

  ```js
  const f = () => {
    const element = document.createElement('textarea')
    return element
  }
  export default f
  ```

* src/index.js

  ```js
  const Title = document.createElement('h2')
  Title.textContent = 'Hello Webpack'
  document.body.append(Title)

  import createTextarea from './components/textarea.js'
  const Textarea = createTextarea()
  document.body.append(Textarea)
  ```

* npm run watch
  
  ![dist_watch_before1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_watch_before1.png)

  修改 index.html 文件 script 标签 src 属性为打包后的 js 文件路径，`http-server` 打开查看效果

  ![dist_watch_before2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_watch_before2.png)
  
* src/components/textarea.js

  修改 textarea.js 模块代码，测试 watch 模式
  
  ```js
  const f = () => {
    const element = document.createElement('textarea')

    // 保存后自动编译打包 - watch
    console.log('watch 模式')

    return element
  }
  export default f
  ```

* 保存后自动编译

  ![dist_watch_after1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_watch_after1.png)

  由于修改代码会导致 JS 文件名中的 chunkhash 改变，因此需要再次修改 index.html 文件 script 标签 src 属性，http-server 打开查看效果，需要手动刷新页面才能看到新的效果
  
  ![dist_watch_after2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_watch_after2.png)

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
  
  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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

  ![serve_devServer_before1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_devServer_before1.png)

  ![serve_devServer_before2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_devServer_before2.png)

* src/components/textarea.js

  修改 textarea.js 模块代码，测试 devServer
  
  ```js
  const f = () => {
    const element = document.createElement('textarea')

    // 保存后自动编译打包且自动刷新浏览器 - devServer
    element.style.color = 'red'

    return element
  }
  export default f
  ```

* Ctrl + S 保存文件代码，终端重新编译打包如下

  ![serve_devServer_after1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_devServer_after1.png)

  观察浏览器页面变化如下，可得知 devServer 自动刷新页面会丢失操作状态

  ![serve_devServer_after2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_devServer_after2.png)

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

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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

  ![serve_hmr_before](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_hmr_before.png)

* src/components/textarea.js

  修改 textarea.js 模块代码，触发模块热替换 HMR

  ```js
  const f = () => {
    const element = document.createElement('textarea')

    // HMR
    element.style.color = 'red'

    return element
  }
  export default f
  ```

* src/index.js
  * 开发者编写的 JS 文件是没有任何规律的，导出的可能是一个对象/字符串/函数，使用时也各不相同，Webpack 面对这些毫无规律的 JS 文件，无法实现一个通用所有情况的 HMR 方案
  * 因此 JS 文件要实现 HMR 需要`开发者调用插件 HotModuleReplacementPlugin API 手动处理`
  * CSS 等其他资源文件无需开发者手动实现 HMR 处理函数，因为相应的 loader 集成了 HMR 功能，例如 css-loader、vue-loader 等

  ```js
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

  ![serve_hmr_after](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_hmr_after.png)

## 6. 加载器 loader

### (1) loader

Webpack 本身只是 JS 模块打包器，Webpack 内置 loader 只能加载 JS 模块，因此如果需要加载其他类型的资源模块，就需要配置不同的 loader，loader 可以`在 import 模块时预处理模块`，因此 loader 类似于其他构建工具中的任务 task，`loader 还可以将其他类型资源模块转换为 JS 模块，或将内联模块转换为 data URL`，实现所有类型资源模块的加载，从而实现项目的整体模块化

* **JS 模块**：Webpack 内置 JS 模块加载器，无需 loader 即可加载 JS 模块，但是在工程化的项目中，我们还需要对 ES6 代码进行语法检查以及将 ES6 语法转换成浏览器可直接识别的 ES5 语法，这就需要相应的 loader 进行处理
* **其他类型资源模块**：loader 用于将其他类型资源模块转换为 JS 模块，或将内联模块转换为 data URL，从而实现项目的整体模块化

Webpack 规定 loader 导出一个`函数`，这个函数就是对资源的处理过程，函数的输入是加载的资源文件内容，函数的输出是处理后的结果，loader 支持链式传递，而 loader 的原理是`在 JS 文件代码中加载其他类型资源`，因此`一组链式 loader 的最后一个必须返回 JS 代码`

#### ① loader 的特性

* **loader 支持链式传递**：loader 能够对资源使用流水线处理，一组链式的 loader 按照`相反`顺序执行，第一个 loader 以`字符串`的形式读入资源文件，返回值传给下一个 loader，由于 loader 的原理是`在 JS 代码中加载其他类型资源`，因此最后一个 loader 必须返回 `JS 代码`
* **loader 支持同步和异步**：Node 使用的是 chrome V8 JS 引擎，因此 `Node 环境只有一个 JS 引擎线程`，Webpack 就是工作在 Node 环境
  * **同步 loader**：同步返回转换后的内容，转换过程会阻塞 Webpack 整个构建，构建缓慢只适用于计算量小、速度快的情况
  * **异步 loader**：异步返回转换后的内容，转换过程不会阻塞 Webpack 整个构建，适用于计算量大、耗时长的情况，例如网络请求

#### ② loader 的作用

* **加载任意类型资源文件**：Webpack 本身只是 JS 模块打包器，Webpack 内置 loader 只能加载 JS 模块，因此如果需要加载其他类型的资源模块，就需要配置不同的 loader
* **便于开发者维护**：Webpack 的设计哲学是`真正需要引用资源的并不是整个应用，而是你正在编写的 JS 代码`，假设我们在开发某个页面上的局部功能时，需要用到一个 CSS 文件和一个图片文件，如果还是将资源引用到 HTML 文件然后在 JS 文件中添加需要的逻辑代码，那么后期如果这个局部功能不需要了，我们就需要同时删除 HTML 中的资源引用和 JS 中的逻辑代码，也就是说需要同时维护两条线，但是如果遵循 Webpack 的设计哲学，所有资源的加载都是由 JS 代码控制，后期只需要维护 JS 代码这一条线
* **减少网络请求**：正常情况下，项目部署上线后，CSS 文件、图片文件、字体文件、多媒体文件等静态资源都需要向服务器请求，而使用 Webpack 打包后的项目，CSS 文件被 css-loader、style-loader 转换成 `<style>` 标签加载到 JS 文件代码中，图片、字体、多媒体等文件，文件大小若小于 limit 参数，都被 url-loader 转换成 `base64` 格式编码加载到 JS 文件代码中，这些静态资源都不再需要单独向服务器请求，只要请求到了 JS 文件，这些资源就都存在，因此能够显著减少网络请求

### (2) 加载 CSS

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

  ```js
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

  // 加载 CSS 模块
  import './assets/style.css'
  ```

* webpack.config.js

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
          template: './index.html', // HTML 文件路径
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

  ![serve_css_style_loader](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_css_style_loader.png)

### (3) 加载图片

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

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
              }
            }
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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

  ![serve_file_url_loader_image](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_file_url_loader_image.png)

### (4) 加载字体

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

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
              }
            }
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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

  ![serve_file_url_loader_font](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_file_url_loader_font.png)

### (5) 加载多媒体

* src/index.js

  ```js
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

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
              }
            }
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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

  ![serve_file_url_loader_media](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_file_url_loader_media.png)

### (6) 加载数据

Webpack 还支持加载数据文件，例如 JSON 文件、XML 文件等，JSON 是 Webpack 内置的无需 loader 处理，XML 文件需要 xml-loader 处理

* npm i xml-loader -D

* src/index.js

  ```js
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

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
          template: './index.html', // HTML 文件路径
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

  ![serve_xml_loader](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/serve_xml_loader.png)

## 7. 插件 plugin

### (1) plugin

loader 机制是为了完成项目中其他类型资源模块的加载，从而实现项目的整体模块化

plugin 机制是为了解决项目中`除资源模块打包以外的其他自动化工作`，因此 plugin 的能力范围更广用途更多

#### ① 钩子机制

Webpack 的 plugin 机制就是软件开发中常见的`钩子机制`，钩子机制类似于 `DOM 的事件`，`钩子函数`类似于 `DOM 的事件回调函数`

Webpack 的整个工作过程会有很多环节，为了便于插件的扩展，Webpack 几乎在每个环节都埋下了一个钩子，这样开发 plugin 时就可以通过往这些不同钩子上挂载不同的钩子函数，实现扩展 Webpack 的能力

![钩子机制](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E9%92%A9%E5%AD%90%E6%9C%BA%E5%88%B6.gif)

#### ② Tapable 库

Webpack 的钩子机制是通过 `Tapable` 库实现的，类似于 Node 的 `EventEmitter` 库，其实就是实现的`发布订阅模式的自定义事件`

* **EventEmitter 库**：通过 `on()` 方法注册一个事件，通过 `emit()` 方法触发一个事件，执行事件回调函数
  
  ```js
  const EventEmitter = require('events');
  const myEmitter = new EventEmitter();

  //on的第一个参数是事件名,第二个参数是事件回掉函数
  myEmitter.on('newListener', (param1,param2) => {
    console.log("newListener", param1, param2)
  });

  //emit的第一个参数是触发的事件名,第二个以后的参数是事件回调函数的参数
  myEmitter.emit('newListener', 111, 222);
  ```

* **Tapable 库**：通过 `tap()` 方法为钩子注册一个`同步钩子函数`，通过 `tapAsync()` 方法为钩子注册一个`异步钩子函数`，通过 `call()` 方法触发一个钩子，钩子触发时钩子上挂载的所有同步和异步钩子函数都会执行
  
  Tapable 库为插件提供了很多钩子类，这些类可以为插件创建钩子
  
  ```js
  SyncHook
  SyncBailHook
  SyncWaterfallHook
  AsyncParallelHook
  AsyncSeriesHook
  AsyncSeriesWaterfallHook
  ```
  
  ```js
  class MyDaily {
    constructor() {
      //最好将插件的自定义钩子暴露在类的hooks属性上
      this.hooks = {
        beforeWork: new SyncHook(["getUp"]),
        atWork: new SyncWaterfallHook(["workTask"]),
        afterWork: new SyncBailHook(["activity"])
      };
    }
    tapTap(){
      //同步钩子函数：同一个钩子上的所有同步钩子函数按注册顺序执行
      this.hooks.beforeWork.tap("getOut", ()=>{
        console.log("出门")
      })
      this.hooks.atWork.tap("makePPT", ()=>{
        console.log("做 PPT")
        return "你的 ppt"
      })
      this.hooks.afterWork.tap("goHome", (work)=>{
        console.log("带着工作回家：" + work)
      })

      //异步钩子函数：callback()类似于generator函数的next()
      this.hooks.beforeWork.tapAsync("putOnCloth", (params, callback)=>{
        console.log("穿衣服")
        callback(); //此处无callback，则getOut不会执行
      })
      this.hooks.beforeWork.tapAsync("getOut", (params, callback)=>{
        console.log("出门")
        callback() //此处无callback，则无法跳出
      })
    }
    run(){
      this.hooks.beforeWork.call()
      this.hooks.atWork.call()
      this.hooks.afterWork.call()
    }
  }
  ```

### (2) clean-webpack-plugin

Webpack 每次打包的结果都是直接覆盖到 dist 目录，因此打包之前 dist 目录就可能存在上次打包遗留的文件，再次打包时只能覆盖同名文件，故而已经移除的资源文件就会一直积累在里面，导致部署上线时出现多余文件，这显然非常不合理

clean-webpack-plugin 插件就是在每次打包之前，清除磁盘 dist 目录

* npm i clean-webpack-plugin -D

* webpack.config.js

  ```js
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
          template: './index.html', // HTML 文件路径
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
        new CleanWebpackPlugin(),
      ]
    }

    return config
  }
  ```

### (3) html-webpack-plugin

HTML 文件一般是单独存放在项目根目录下，这会导致以下 2 个问题

* 项目发布时需要同时发布项目根目录下的 HTML 文件和 dist 目录下的打包结果，并且需要修改 HTML 文件下的引用为打包后的文件路径
* 打包结果的输出目录或者文件名改变，需要手动修改 HTML 文件中对应的 script 标签的 src 属性，其他类型资源文件通过 loader 加载到 JS 文件代码，loader 内置该功能因此无需手动修改

html-webpack-plugin 插件能够在 Webpack 打包的同时，`自动生成使用打包结果的 HTML 文件到 dist 目录`，让 HTML 文件也参与到整个项目的构建过程

* 项目发布时只需要发布 dist 目录
* 新生成的 HTML 文件中 script 标签是 html-webpack-plugin 插件自动引入的，因此可以确保 JS 文件的路径和名称正确

html-webpack-plugin 插件的使用如下

* npm i html-webpack-plugin -D

* webpack.config.js

  ```js
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
          template: './index.html', // HTML 文件路径
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
        new CleanWebpackPlugin(),
      ]
    }

    return config
  }
  ```

### (4) copy-webpack-plugin

copy-webpack-plugin 插件用于在打包时将无需通过 file-loader 处理的资源文件拷贝到输出目录（一般放在 static 文件夹）

* npm i copy-webpack-plugin -D

* webpack.config.js

  ```js
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
          template: './index.html', // HTML 文件路径
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
        new CleanWebpackPlugin(),
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

  ![dist_copy_webpack_plugin](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_copy_webpack_plugin.png)

### (5) friendly-errors-webpack-plugin

friendly-errors-webpack-plugin 插件用于配置 Webpack `devServer` 运行时控制台输出信息

* npm i friendly-errors-webpack-plugin -D

* webpack.config.js

  ```js
  const webpack = require('webpack')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
          template: './index.html', // HTML 文件路径
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
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CleanWebpackPlugin(),
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

* npm run serve

  ![dist_friendly_errors_webpack_plugin](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_friendly_errors_webpack_plugin.png)

## 8. 代码检查、转换、压缩

### (1) ES6 语法检查（ESlint）

ESlint 是一个使用 Node 编写的开源 JS 代码检查工具

* npm i eslint eslint-webpack-plugin -D

  eslint-loader 已废弃，目前使用最新的 `eslint-webpack-plugin`

* npm i @babel/core @babel/eslint-parser -D

  @babel/eslint-parser 作为 eslint 的解析器

* .eslintrc.js
  
  项目根目录下执行 `eslint --init`，自动创建 .eslintrc.js 文件，稍加配置后如下

  ```js
  module.exports = {
    root: true,
    env: {
      "browser": true,
      "es2021": true,
      "node": true
    },
    extends: "eslint:recommended", // 启用 eslint 默认规则
    parserOptions: {
      "ecmaVersion": 12,                // ES6 语法版本
      "sourceType": "module",           // ES6 模块
      "parser": "@babel/eslint-parser", // 指定解析器
    },
    rules: {
      'accessor-pairs': 2,
      'arrow-spacing': [2, {
        'before': true,
        'after': true
      }],
      'block-spacing': [2, 'always'],
      'brace-style': [2, '1tbs', {
        'allowSingleLine': true
      }],
      'camelcase': [0, {
        'properties': 'always'
      }],
      'comma-dangle': [2, 'never'],
      'comma-spacing': [2, {
        'before': false,
        'after': true
      }],
      'comma-style': [2, 'last'],
      'constructor-super': 2,
      'curly': [2, 'multi-line'],
      'dot-location': [2, 'property'],
      'eol-last': 2,
      'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
      'generator-star-spacing': [2, {
        'before': true,
        'after': true
      }],
      'handle-callback-err': [2, '^(err|error)$'],
      'indent': [2, 2, {
        'SwitchCase': 1
      }],
      'jsx-quotes': [2, 'prefer-single'],
      'key-spacing': [2, {
        'beforeColon': false,
        'afterColon': true
      }],
      'keyword-spacing': [2, {
        'before': true,
        'after': true
      }],
      'new-cap': [2, {
        'newIsCap': true,
        'capIsNew': false
      }],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-caller': 2,
      'no-console': 'off',
      'no-class-assign': 2,
      'no-cond-assign': 2,
      'no-const-assign': 2,
      'no-control-regex': 0,
      'no-delete-var': 2,
      'no-dupe-args': 2,
      'no-dupe-class-members': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty-pattern': 2,
      'no-eval': 2,
      'no-ex-assign': 2,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-extra-boolean-cast': 2,
      'no-extra-parens': [2, 'functions'],
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-func-assign': 2,
      'no-implied-eval': 2,
      'no-inner-declarations': [2, 'functions'],
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': 2,
      'no-iterator': 2,
      'no-label-var': 2,
      'no-labels': [2, {
        'allowLoop': false,
        'allowSwitch': false
      }],
      'no-lone-blocks': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-multiple-empty-lines': [2, {
        'max': 1
      }],
      'no-native-reassign': 2,
      'no-negated-in-lhs': 2,
      'no-new-object': 2,
      'no-new-require': 2,
      'no-new-symbol': 2,
      'no-new-wrappers': 2,
      'no-obj-calls': 2,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-path-concat': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-regex-spaces': 2,
      'no-return-assign': [2, 'except-parens'],
      'no-self-assign': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-shadow-restricted-names': 2,
      'no-spaced-func': 2,
      'no-sparse-arrays': 2,
      'no-this-before-super': 2,
      'no-throw-literal': 2,
      'no-trailing-spaces': 2,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-unexpected-multiline': 2,
      'no-unmodified-loop-condition': 2,
      'no-unneeded-ternary': [2, {
        'defaultAssignment': false
      }],
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unused-vars': [2, {
        'vars': 'all',
        'args': 'none'
      }],
      'no-useless-call': 2,
      'no-useless-computed-key': 2,
      'no-useless-constructor': 2,
      'no-useless-escape': 0,
      'no-whitespace-before-property': 2,
      'no-with': 2,
      'one-var': [2, {
        'initialized': 'never'
      }],
      'operator-linebreak': [2, 'after', {
        'overrides': {
          '?': 'before',
          ':': 'before'
        }
      }],
      'padded-blocks': [2, 'never'],
      'quotes': [2, 'single', {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }],
      'semi': [2, 'never'],
      'semi-spacing': [2, {
        'before': false,
        'after': true
      }],
      'space-before-blocks': [2, 'always'],
      'space-before-function-paren': [2, 'never'],
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [2, {
        'words': true,
        'nonwords': false
      }],
      'spaced-comment': [2, 'always', {
        'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }],
      'template-curly-spacing': [2, 'never'],
      'use-isnan': 2,
      'valid-typeof': 2,
      'wrap-iife': [2, 'any'],
      'yield-star-spacing': [2, 'both'],
      'yoda': [2, 'never'],
      'prefer-const': 2,
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'object-curly-spacing': [2, 'always', {
        objectsInObjects: false
      }],
      'array-bracket-spacing': [2, 'never']
    }
  };
  ```

* .eslintignore
  
  项目根目录下新建 .eslintignore 文件，配置 ESLint 需要`忽略`的目录和文件

  ```eslintignore
  node_modules
  dist
  config/*.js
  src/assets
  src/public
  ```

* webpack.config.js

  配置 ESLintWebpackPlugin 插件代替已废弃的 eslint-loader

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
        new ESLintWebpackPlugin(), // 代替已废弃的 eslint-loader
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CleanWebpackPlugin(),
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

* src/index.js

  ![ESLint报错](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/ESLint%E6%8A%A5%E9%94%99.png)

* Ctrl + S 保存，自动格式化代码

  ![ESLint报错修复](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/ESLint%E6%8A%A5%E9%94%99%E4%BF%AE%E5%A4%8D.png)

### (2) ES6 转换 ES5（Babel）

* npm i babel-loader @babel/preset-env @babel/plugin-transform-runtime -D

* 项目根目录下新建 .babelrc.js 文件

  ```js
  module.exports = {
    presets: [
      ["@babel/preset-env", {
        targets: {
          chrome: 58,
          ie: 9
        },
        modules: false,       // 保留 ES6 modules，不转换成其他类型模块
        useBuiltIns: 'entry', // 按需导入 core-js 支持的 ES6 新 API
        corejs: {             // 指定 core-js 版本
          version: "3.13", 
          proposals: true 
        },          
      }]
    ],
    plugins: ["@babel/plugin-transform-runtime"],
  }
  ```

* webpack.config.js

  配置 babel-loader

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'),             // 输出目录
        publicPath: '/',                      // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.js$/,    // 正则匹配文件路径
            include: /(src)/, // 提高构建速度
            use: {
              loader: 'babel-loader'
            }
          },
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
                publicPath: '../'          // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
        new ESLintWebpackPlugin(), // 代替已废弃的 eslint-loader
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
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
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CleanWebpackPlugin(),
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

### (3) CSS 代码单独拆包和压缩

CSS 文件一般会使用 css-loader、style-loader 处理，最终打包结果就是将 CSS 代码转换成 JS 代码，然后通过 `<style>` 标签嵌套到 JS 文件

* **MiniCSSExtractPlugin**：MiniCSSExtractPlugin 插件可以将 CSS 代码单独打包成 CSS 文件，通过 `<link>` 标签引入到 HTML 页面，CSS 独立拆包的最大好处就是 JS 和 CSS 的改动不会影响对方，例如修改 JS 文件不会导致 CSS 文件缓存失效
* **OptimizeCSSAssetsWebpackPlugin**：生产环境下 Webpack 内置压缩插件只会自动压缩 JS 文件，不会压缩 CSS 文件，因此需要通过 OptimizeCSSAssetsWebpackPlugin 插件来`压缩 CSS 文件`

* npm i mini-css-extract-plugin optimize-css-assets-webpack-plugin -D
* webpack.config.js

  MiniCSSExtractPlugin 插件不但需要配置到 plugins，还需要在 module-rules 中`修改 style-loader 为 MiniCSSExtractPlugin.loader`

  OptimizeCSSAssetsWebpackPlugin 插件用于压缩代码，因此需要配置到 `optimization.minimizer` 而非 plugins，webpack 推荐压缩类插件都应该配置在到 optimization.minimizer 方便统一管理

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.js$/, // 正则匹配文件路径
            include: /(src)/, // 提高构建速度
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            exclude: /(node_modules)/,
            // use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
            use: [MiniCssExtractPlugin.loader, 'css-loader'] // CSS 代码单独拆包
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000, // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: '../' // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
        new ESLintWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css', // 入口文件中引入的 CSS 文件
          chunkFilename: 'css/[name].[contenthash].css' // 入口文件中未引入，通过按需加载引入的 CSS 文件
        }),
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
          title: 'Webpack', // title属性
          meta: { // meta标签
            viewPort: 'width=device-width'
          }
        })
      ]
    }

    // 开发环境
    if (argv.nodeEnv === 'development') {
      config.target = 'web'
      config.devServer = {
        port: '8082',
        open: true,
        hot: true,
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/static/test.js', to: './static' }
          ]
        })
      ]
      config.optimization = {
        minimize: true,
        minimizer: [
          new OptimizeCssAssetsWebpackPlugin()
        ]
      }
    }

    return config
  }
  ```

* npm run build

  ![dist_css1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_css1.png)

  ![dist_css2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_css2.png)

  查看可知，JS 文件代码没有被压缩，

  ![dist_js1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_js1.png)

### (4) JS 代码压缩

Webpack 认为如果配置了 optimization.minimizer，就表示开发者需要自定义压缩插件而不使用 Webpack 内置压缩插件，因此在使用了 CSS 代码单独拆包和压缩插件后，需要重新下载并配置 JS 代码压缩插件

* npm i terser-webpack-plugin -D
* webpack.config.js

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const TerserWebpackPlugin = require('terser-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.js$/, // 正则匹配文件路径
            include: /(src)/, // 提高构建速度
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            exclude: /(node_modules)/,
            // use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
            use: [MiniCssExtractPlugin.loader, 'css-loader'] // CSS 代码单独拆包
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000, // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: '../' // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
        new ESLintWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css', // 入口文件中引入的 CSS 文件
          chunkFilename: 'css/[name].[contenthash].css' // 入口文件中未引入，通过按需加载引入的 CSS 文件
        }),
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
          title: 'Webpack', // title属性
          meta: { // meta标签
            viewPort: 'width=device-width'
          }
        })
      ]
    }

    // 开发环境
    if (argv.nodeEnv === 'development') {
      config.target = 'web'
      config.devServer = {
        port: '8082',
        open: true,
        hot: true,
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/static/test.js', to: './static' }
          ]
        })
      ]
      config.optimization = {
        minimize: true,
        minimizer: [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin()
        ]
      }
    }

    return config
  }
  ```

* npm run build

  ![dist_js2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_js2.png)

## 9. Webpack 编译阶段优化

### (1) 减少执行编译的模块

* **剔除无需构建的模块**：`IgnorePlugin` 插件可以在编译时`忽略指定目录`，从而提高构建速度，减少产物体积
* **按需引入类库模块中的导出**：import 后跟的文件路径写到`文件模块内导出的具体方法`

  ```js
  import _ from 'lodash' // 全部引入

  import find from 'lodash/find'; // 按需引入
  ```

### (2) 提高单个模块的构建速率

* **include/exclude**：include 只对符合条件的模块指定 loader 处理，exclude 排除不符合条件的模块
* **noParse**：module.noParse 可以配置某些模块不使用 JS 模块编译器进行编译，例如 jQuery
  
  ```js
  module.exports = {
    ...
    module: {
      noParse: /jquery/, // Webpack 不解析 jquery
      rules: [
        ...
      ]
    }
    ...
  }
  ```

### (3) 并行构建以提升总体效率

中小型项目并不适用于并行构建的思路，因为这种情况下，并发所需的多进程管理与通信带来的额外时间成本，可能会超过使用工具带来的收益，而在大型项目的生产环境构建时，并行构建工具才具有发挥作用的空间

* **thread-loader**：thread-loader 作用于编译模块的 loader 上，用于在特定 loader 的编译过程中开启`多进程`的方式加速编，thread-loader 应该放置在其他 loader 之前，之后的 loader 就会在一个单独的 worker 池中运行，并且运行是受限制的
* **parallel-webpack**：parallel-webpack 针对多配置构建，Webpack 的配置文件可以是包含多个子配置对象的数组，在执行这类多配置对象时默认串行执行，而 parallel-webpack 能实现相关配置的`并行处理`

## 10. Webpack 打包阶段优化

### (1) 按需引入模块 import()

Webpack 默认将所有模块打包到`一个 JS 文件`，这会导致打包结果过大，绝大多数情况下，应用程序刚开始运行时，并非所有模块都是必须的，如果所有模块都被打包到一个 JS 文件，即使应用程序一开始只需要一到两个模块工作，也必须将打包后的整个 JS 文件加载进来，前端应用程序一般都是运行在浏览器，因此这种情况会浪费大量流量和带宽，也会导致浏览器响应速度变慢

合理的方式是将打包结果按照一定的规则分离到`多个 JS 文件`，然后根据应用程序的运行`按需加载`，这样就可以降低启动成本，提高响应速度

这与 Webpack 将项目中散落的模块打包到一起，从而提高加载效率，并不自相矛盾，只是物极必反，前端应用程序中的资源受环境所限，太大不行，太碎也不行，需要维持在一个`合理的细粒度`，开发环境中划分模块的颗粒度一般都会非常细，很多时候一个模块只是提供一个小工具函数，并不能形成一个完整的功能单元，如果不将这些资源模块打包，直接按照开发过程划分的模块颗粒度加载，那么运行一个很小的功能，就需要加载非常多的资源模块，因此模块打包肯定是必要的，但是当应用程序体积越来越大时，我们也要学会变通

Webpack 由此提供了 `ES6 Modules import() 按需加载功能`，所有动态导入的模块都会被自动提取到`单独的 JS 文件`

* src/components/link.js

  ```js
  const link = document.createElement('a')
  link.href = 'https://www.baidu.com/'
  link.innerHTML = '百度一下'

  export default link // 默认导出
  ```

* src/index.js

  ```js
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

  // 按需引入模块
  const btn = document.createElement('button')
  btn.innerHTML = '显示链接'
  document.body.append(btn)
  btn.addEventListener('click', e => {
    import('./components/link.js')
      .then(Link => {
        document.body.append(Link.default)
      })
  })
  ```

* webpack.config.js

  Webapck 无需针对 ES6 modules import() 做任何额外的配置

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const TerserWebpackPlugin = require('terser-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.js$/, // 正则匹配文件路径
            include: /(src)/, // 提高构建速度
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            exclude: /(node_modules)/,
            // use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
            use: [MiniCssExtractPlugin.loader, 'css-loader'] // CSS 代码单独拆包
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000, // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: '../' // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
        new ESLintWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css', // 入口文件中引入的 CSS 文件
          chunkFilename: 'css/[name].[contenthash].css' // 入口文件中未引入，通过按需加载引入的 CSS 文件
        }),
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
          title: 'Webpack', // title属性
          meta: { // meta标签
            viewPort: 'width=device-width'
          }
        })
      ]
    }

    // 开发环境
    if (argv.nodeEnv === 'development') {
      config.target = 'web'
      config.devServer = {
        port: '8082',
        open: true,
        hot: true,
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/static/test.js', to: './static' }
          ]
        })
      ]
      config.optimization = {
        minimize: true,
        minimizer: [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin()
        ]
      }
    }

    return config
  }
  ```

* npm run build

  ![dist_import()](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_import().png)

### (2) TreeShaking

TreeShaking 功能就是摇掉树上的枯枝和树叶，也就是摇掉项目中的`未引用代码 dead-code`，TreeShaking 并不是指某一个配置选项，而是一组功能搭配使用的效果

TreeShaking 功能是基于 `ES6 modules 静态特性检测`找出未引用代码，因此 CommonJS 模块 TreeShaking 就会失效

* **生产环境**：生产环境打包时`自动`开启 TreeShaking 功能，检测未引用代码并移除，无需手动配置
* **其他环境**：其他环境需要开发者`手动`在配置文件 webpack.config.js 中配置 TreeShaking 功能
  * **optimization.usedExports**：模块只导出外部用到的成员（标记枯树枝、树叶）
  * **optimization.minimize**：压缩打包结果（摇下枯树枝、树叶）
  * **optimization.concatenateModules**：尽可能合并所有模块到一个函数（合并可用树枝、树叶）

### (3) sideEffects

> 模块副作用：模块执行时除了导出成员，还做了其他事情

sideEffects 功能就是模块打包时去除导出成员外的其他代码，sideEffects 并不是指某一个配置选项，而是一组功能搭配使用的效果

* **生产环境**：生产环境打包时`自动`开启 sideEffects 功能，无需手动配置
* **其他环境**：其他环境需要开发者`手动`在配置文件 webpack.config.js 中配置 sideEffects 功能
  * **无用的副作用**：模块除导出成员外还包含例如 console.log 之类的无效代码
    * **optimization.sideEffects**：配置模块无副作用打包
  * **必要的副作用**：模块本身无需导出成员，只需要实现一些操作
    * **package.json/sideEffects**：标识`需要保留副作用的模块路径`

      src/components/pad.js

      ```js
      // 为 Number 的原型添加一个扩展方法
      Number.prototype.pad = function(size) {
        const leadingZeros = Array(size + 1).join(0)
        return leadingZeros + this
      }
      ```

      package.json

      ```json
      {
        "sideEffects": [
          "./src/components/pad.js",
          "*.css"
        ],
      }
      ```

### (4) CodeSplitting

CodeSplitting 功能就是实现`代码分包`，`生产环境`下默认开启 CodeSplitting 功能

Webpack 内置代码分包策略如下

* 新的 chunk 是否被共享或者是来自 node_modules 的模块
* 新的 chunk 体积在压缩之前是否大于 30kb
* 按需加载 chunk 的并发请求数量小于等于 5 个
* 页面初始加载时的并发请求数量小于等于 3 个

Webpack 提供 `optimization.splitChunks` 供开发者自行配置代码分包策略

* Webpack 内置代码分包策略在某些业务情况下并不是十分合适，例如一个后台管理系统，大部分页面都是表格，因此封装一个公共 Table 组件供所有表格页面使用，但是体积很小只有 15KB，不符合 Webpack 内置代码分包策略，会被打包到每个页面的 bundle，这就很浪费资源不太合理了，这种情况就建议把大部分页面能公用的组件单独分包
* Webpack 内置代码分包策略优化配置如下

  ![Webpack内置代码分包策略优化](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/Webpack%E5%86%85%E7%BD%AE%E4%BB%A3%E7%A0%81%E5%88%86%E5%8C%85%E7%AD%96%E7%95%A5%E4%BC%98%E5%8C%96.png)

  webpack.config.js

  ```js
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: { // 基础类库
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: { // UI 组件库
          name: 'chunk-elementUI', // elementUI 单独拆包
          test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于 libs、app 不然会被打包进 libs、app
          priority: 20,
        },
        commons: { // 自定义组件/函数
          name: 'chunk-commons',
          test: pathResolve('src/components'),
          priority: 5,
          minChunks: 3, // 最小共用次数
          reuseExistingChunk: true
        }
      }
    }
  }
  ```

### (5) 提取 manifest 文件

Webpack 的 runtime、manifest 文件，用来管理所有模块的交互

* **manifest 文件**：编译器 Compiler 开始执行、解析、映射应用程序`源代码`时，manifest 文件保留所有模块的详细要点
* **runtime 文件**：runtime 文件包含浏览器运行时连接模块所需的加载和解析逻辑代码，浏览器中已加载模块的连接，以及懒加载模块的执行逻辑
* Webpack 完成打包并发送到浏览器运行时，`/src 目录结构将不复存在`，import、require 等模块导入语句都将转换成 `__webpack_require__` 方法，该方法指向`模块标识符`，runtime 文件通过 manifest 文件查询模块标识符，检索出背后对应的模块，完成加载和解析模块的功能

Webpack 提供 `optimization.runtimeChunk` 让开发者配置如何提取 manifest 文件，将包含 chunks 映射关系的 list 从 app.js 提取出来单独生成一个 `runtimeChunk.xxx.js`

runtimeChunk.xxx.js 文件非常小又经常会改变，每次都需要重新请求，HTTP 耗时远大于执行时间，因此不建议单独拆包，而是使用插件 `ScriptExtHtmlWebpackPlugin` 将其内联到 `index.html`，index.html 本来每次打包都会改变

* npm install script-ext-html-webpack-plugin --save-dev
* webpack.config.js
  
  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const TerserWebpackPlugin = require('terser-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径

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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathResolve('./src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.js$/, // 正则匹配文件路径
            include: /(src)/, // 提高构建速度
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.css$/,
            exclude: /(node_modules)/,
            // use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
            use: [MiniCssExtractPlugin.loader, 'css-loader'] // CSS 代码单独拆包
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 20000, // 文件小于 20KB url-loader 将文件转换为 DataURL,否则 file-loader 拷贝文件至输出目录
                name: 'img/[name].[ext]', // 文件名合并文件输出目录（相对 dist 目录）
                publicPath: '../' // 打包后引用地址（相对 name）
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
                publicPath: '../'
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
                publicPath: '../'
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
        new ESLintWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css', // 入口文件中引入的 CSS 文件
          chunkFilename: 'css/[name].[contenthash].css' // 入口文件中未引入，通过按需加载引入的 CSS 文件
        }),
        new HtmlWebpackPlugin({
          template: './index.html', // HTML 文件路径
          title: 'Webpack', // title属性
          meta: { // meta标签
            viewPort: 'width=device-width'
          }
        })
      ]
    }

    // 开发环境
    if (argv.nodeEnv === 'development') {
      config.target = 'web'
      config.devServer = {
        port: '8082',
        open: true,
        hot: true,
        hotOnly: true, // 避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
        quiet: true // 控制台输出配置：FriendlyErrorsPlugin
      }
      config.plugins = [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://localhost:8082`
            ]
          },
          onErrors: undefined
        })
      ]
    }

    // 生产环境
    if (argv.nodeEnv === 'production') {
      config.plugins = [
        ...config.plugins,
        new ScriptExtHtmlWebpackPlugin({
          inline: /runtime\..*\.js$/ // 将提取的 manifest 内联到 index.html，必须在 HtmlWebpackPlugin 插件之后使用
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/static/test.js', to: './static' }
          ]
        })
      ]
      config.optimization = {
        minimize: true,
        minimizer: [
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin()
        ],
        runtimeChunk: 'single' // 单独提取 manifest 文件
      }
    }

    return config
  }
  ```

* npm run build

  ![dist_manifest](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/dist_manifest.png)

## 11. Webpack API

### (1) Compiler 钩子

### (2) Compilation 钩子

### (3) resolver

### (4) parser

### (5) module API

### (6) loader API

#### ① loader API

#### ② 开发一个 loader

需求是开发一个可以加载 markdown 文件的 loader，以便在代码中可以直接导入 .md 文件，.md 文件一般是需要转换成 HTML 之后再呈现到页面上的，因此 markdown-loader 的工作原理是`接收 .md 文件，转换成 HTML 字符串，再拼接成 JS 代码`

### (7) plugin API

#### ① plugin API

#### ② 开发一个 plugin

需求是开发一个打包时能够自动清除注释的插件，使得 bundle.js 文件更易阅读

删除 bundle.js 文件的注释，只有在 Webpack 明确需要生成的 bundle.js 文件内容后才能实施，查阅 API 文档后得知，我们需要把任务挂载到 `emit 钩子`上，emit 钩子会在 Webpack 即将向输出目录输出文件前执行

Webpack 要求插件必须是一个`包含 apply() 方法的类`
