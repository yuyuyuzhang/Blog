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

## 2. Webpack 安装

* npm init

  初始化项目，生成 package.json 文件，管理项目依赖的 npm 包

* 项目根目录添加 .gitignore 文件，配置忽略的不提交到 git 的目录和文件

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

## 3. Webpack 基本配置

### (1) 模式 mode

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
    mode: argv.nodeEnv,
  }
  return config
}
```

### (2) 开发工具 devtool

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
      mode: argv.nodeEnv,
      devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    }
    return config
  }
  ```

![source_map模式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/source_map%E6%A8%A1%E5%BC%8F.png)

### (3) 环境上下文 context

Webpack 提供 context 配置`设置某个目录的绝对路径为环境上下文`，默认使用`当前目录`，推荐设置`项目根目录`

webpack.config.js

```javascript
const path = require('path')

module.exports = (env, argv) => {
  const config = {
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: path.resolve(__dirname, './'), // 设置项目根目录为环境上下文
  }
  return config
}
```

### (4) 入口 entry

Webpack 提供 entry 配置`设置哪个模块作为构建依赖关系图的开始`，Webpack 首先进入入口，然后找出入口直接或间接依赖的模块和库，每个依赖项随即被处理，最后被输出到 bundles 文件

> entry 配置可以指定`一或多个`入口，其入口模块的路径必须是`相对 context 配置的目录`

webpack.config.js

```javascript
const path = require('path')

module.exports = (env, argv) => {
  const config = {
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: path.resolve(__dirname, './'), // 设置项目根目录为环境上下文
    entry: {
      app: './src/index.js' // 相对 context 配置
    },
  }
  return config
}
```

### (5) 出口 output

Webpack 提供 output 配置`设置在磁盘哪里输出创建的 bundles 文件，以及如何向磁盘写入编译文件，如何命名这些文件等`

> output 配置只能指定`一个`出口

webpack.config.js

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = (env, argv) => {
  const config = {
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: path.resolve(__dirname, './'), // 设置项目根目录为环境上下文
    entry: {
      app: './src/index.js' // 相对 context 配置
    },
    output: {
      filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
      path: resolve('dist'), // 输出目录
      publicPath: '/', // 输出目录中相对该目录加载资源、启动服务
    },
  }
  return config
}
```

### (6) 解析器 resolve

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
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = (env, argv) => {
  const config = {
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv === 'development' ? 'eval-cheap-module-source-map' : false,
    context: path.resolve(__dirname, './'), // 设置项目根目录为环境上下文
    entry: {
      app: './src/index.js' // 相对 context 配置
    },
    output: {
      filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
      path: resolve('dist'), // 输出目录
      publicPath: '/', // 输出目录中相对该目录加载资源、启动服务
    },
    resolve: {
      alias: {
        '@': resolve('src')
      },
      extensions: ['.js', '.vue', '.json'],
    },
  }
  return config
}
```

## 4. 加载器 loader

Webpack 提供 loader 机制实现除 JS 模块外的其他各种类型资源模块的加载，从而实现项目的整体模块化

* npm i css-loader -D
  
  css-loader 的作用就是`将 CSS 模块转换为 JS 模块`，但是并没有使用这个模块

* npm i style-loader -D

  style-loader 的作用就是将 css-loader 转换后的 JS 模块通过 `<style>` 标签追加到页面

* src/assets/style.css

  ```css
  body {
    color: red;
  }
  ```

* src/index.js

  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入 CSS 文件
  import './assets/style.css'
  ```

* webpack.config.js

  ```javascript

  ```

### (1) 加载 CSS

### (2) 加载图片

### (3) 加载字体

### (4) 加载多媒体

## 5. 插件 plugin
