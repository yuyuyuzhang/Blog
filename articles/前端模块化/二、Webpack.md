# 二、Webpack

[[_TOC_]]

## 1. Webpack

Webpack 本质上是一个现代 JS 应用程序的静态模块打包器，Webpack 处理应用程序时，会递归地构建一个`依赖关系图`，其中包含应用程序需要的每个模块，然后将所有模块打成一或多个包

### (1) 模块化问题解决

Webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程

* 对于有环境兼容性问题的代码，Webpack 可以在打包过程中通过 Loader 机制对其实现编译转换，然后再进行打包
* 对于零散的 JS 文件，Webpack 可以将其打包到一个 JS 文件中
* 对于不同类型的前端模块，Webpack 支持在 JS 中以模块化的方式载入任意类型的资源文件，如在 JS 中载入 CSS 文件，被载入的 CSS 文件将会以 `<style>` 标签的方式工作

### (2) 渐进式加载

<!-- Webpack 具备代码拆分的能力，能够将所有模块`按需分块打包`，这样就无需担心全部代码打包到一起，产生单个文件过大，加载缓慢的问题

可以将初次加载必须的模块打包到一起，其他的模块再单独打包，等到应用工作过程中实际需要某个模块时，再异步加载该模块，实现增量加载，这非常适合现代化的大型 Web 应用 -->

## 2. 模式 mode

### (1) mode

Webpack 4 的工作模式可以理解为针对不同环境的几组预设配置，mode 指示 Webpack 使用相应模式的内置优化

* production ( 默认 )：生产模式，`自动优化打包结果`，启动内置优化插件，打包速度偏慢
* development：开发模式，`自动优化打包速度`，添加一些调试过程中的辅助插件
* none：原始模式，`不做任何额外处理`，运行最原始的打包

![mode](../../images/前端模块化/webpack/mode.png)

webpack.config.js

```javascript
module.exports = {
  mode: 'development', //开发模式
  mode: 'production',  //生产模式
  mode: 'none'         //原始模式
}
```

### (2) 通过原始模式理解打包原理

将 mode 设置为 none，就是不做任何额外处理的原始打包，这种方式下打包出来的 JS 文件可以阅读源码，方便理解 Webpack 打包原理

#### ① 项目结构

项目目录如下

![none](../../images/前端模块化/webpack/none.png)

#### ② 打包

* `npm i webpack webpack-cli --save-dev`
  
  安装 webpack-cli，由此在根目录生成 node_modules 文件夹和 package-lock.json 文件

* webpack.config.js 文件
  
  项目根目录添加 `webpack.config.js` 文件，完成 Webpack 配置

  ```javascript
  const path = require('path')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_none') //Node语法,绝对路径
    }
  }
  module.exports = config
  ```

* `npx webpack`
  
  按照 webpack.config.js 文件的配置开始打包

  ![none打包](../../images/前端模块化/webpack/none打包.png)

#### ③ bundle.js

VSCode 中折叠代码的快捷键是 Ctrl + K，Ctrl + 0，折叠文件方便了解整体结构

整体代码是一个立即执行函数表达式，接收一个 modules 参数，调用时传入了一个参数数组

![bundle1](../../images/前端模块化/webpack/bundle1.png)

展开调用的参数数组，数组有两项，每项是一个函数表达式，一个函数表达式对应源代码中的一个模块，从而让模块具有`函数作用域`

![bundle2](../../images/前端模块化/webpack/bundle2.png)

展开入口的立即执行函数表达式，开始定义一个 `installedModules` 数组用于存放或缓存加载过的模块，紧接着定义一个 `__webpack_require__` 函数用于加载模块，然后就是 `__webpack_require__` 函数上挂载一些工具函数和数据，最后就是调用 `__webpack_require__` 函数开始加载第一个模块

![bundle3](../../images/前端模块化/webpack/bundle3.png)

## 3. 入口 entry

入口指示 Webpack 应该使用哪个模块作为构建依赖关系图的开始，Webpack 首先进入入口，然后找出入口直接或间接依赖的模块和库，每个依赖项随即被处理，最后被输出到称之为 bundles 的文件中

* Webpack 配置项 entry 属性可以指定`一或多个`入口

webpack.config.js

```javascript
module.exports = {
  entry: {
    app: './src/main.js', //单页面应用程序
  },
  entry: {
    pageOne: './src/pageOne/index.js', //多页面应用程序
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
}
```

## 4. 出口 output

出口指示 Webpack 在磁盘哪里输出创建的 bundles，如何向磁盘写入编译文件，以及如何命名这些文件

* Webpack 配置项 output 属性只能指定`一个`出口

webpack.config.js

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js', //输出一个js文件
    path: path.resolve(__dirname, '../dist/static') //输出目录
  },
  output: {
    //多入口或使用CommonsChunkPlugin插件
    filename: '[name].js', //输出多个js文件,使用占位符确保每个文件具有唯一名称
    path: path.resolve(__dirname, '../dist/static')
  }
};
```

## 4. 加载器 loader

### (1) loader

Webpack 是 JS 模块打包工具，Webpack 自身只理解 JS，默认只能按照 JS 的语法解析模块

Webpack 内部使用加载器 loader 来加载每个模块，而 Webpack 内部默认的 loader 只能导入 JS 模块，因此如果需要导入其他类型的资源模块，就需要配置不同的 loader，loader 机制使 Webpack 可以导入`任意类型的资源文件`

![loader](../../images/前端模块化/webpack/loader.png)

### (2) loader 的使用

#### ① css-loader

* npm install css-loader --save-dev
  
  安装 css-loader，使得 Webpack 可以导入 CSS 模块

* 配置 css-loader，配置文件 webpack.config.js 中在配置对象 module 中添加一个加载规则配置数组 rules，其中每个规则对象都需要设置两个属性
  * 属性 test：使用正则匹配文件路径
  * 属性 use：指定具体的 loader
  
  webpack.config.js

  ```javascript
  const path = require('path');
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: 'css-loader' //指定具体的loader
        }
      ]
    }
  };
  module.exports = config;
  ```

* 导入 CSS 文件
  
  src/index.js 文件中使用 ES6 Modules import 语法直接导入 CSS 文件

  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'
  ```

* npx webpack
  
  由下图可知，CSS 文件并没有单独打包，而是被一起打包到 bundle.js 文件

  ![css-loader打包](../../images/前端模块化/webpack/css-loader打包.png)

* 查看效果
  
  index.html 文件中使用打包后的 dist_loader/bundle.js 文件，控制台打开 index.html 文件，查看效果，发现样式文件并没有生效

  ![css-loader效果](../../images/前端模块化/webpack/css-loader效果.png)

#### ② css-loader 原理

从以上效果图片可看到，样式文件并没有生效，

* css-loader 打包
  
  由上图打包后的项目结构可知，CSS 文件并没有单独打包，而是被一起打包到 bundle.js 文件，由此可知 css-loader 的打包方式如下

  ![css-loader](../../images/前端模块化/webpack/css-loader.png)

* css-loader 原理
  
  查看 dist_loader/bundle.js 文件代码，获知 css-loader 打包原理，为什么样式文件没有生效？

  阅读以下代码可知，css-loader 原理就是将 CSS 模块转换为 JS 模块，具体实现方式是将 CSS 代码 push 到一个数组中，数组是由 css-loader 内部一个模块提供的，但是整个过程并没有任何地方用到了这个数组

  因此样式没有生效的原因是：css-loader 只是将 CSS 模块加载到 JS 代码中，但并没有使用这个模块

  ![css-loader原理](../../images/前端模块化/webpack/css-loader原理.png)

#### ③ style-loader

* npm install style-loader --save-dev
  
  安装 style-loader，style-loader 的作用就是将 css-loader 转换后的结果通过 `<style>` 标签追加到页面

* 配置 style-loader
  
  webpack.config.js 文件中添加 style-loader 配置，将之前 css-loader 配置的 use 属性改成数组，添加上 style-loader

  ```javascript
  const path = require('path')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,多个loader需要注意顺序
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  }
  module.exports = config
  ```

* npx webpack
  
  重新打包，查看效果，index.html 文件中使用打包后的 dist_loader/bundle.js 文件，控制台打开 index.html 文件，查看效果，发现样式文件已经生效

  ![style-loader效果](../../images/前端模块化/webpack/style-loader效果.png)

### (3) loader 的原理

#### ① loader 的原理

loader 的原理是`在 JS 中加载其他资源`，与我们平时所尊崇的`样式和行为分离`的理论相悖

Webpack 的设计哲学是`真正需要引用资源的并不是整个应用，而是你正在编写的 JS 代码`

假设我们在开发某个页面上的局部功能时，需要用到一个 CSS 文件和一个图片文件，如果还是将资源引用到 HTML 文件，然后在 JS 文件中添加需要的逻辑代码，那么如果后期这个局部功能不需要了，我们就需要同时删除 HTML 中的资源引用和 JS 中的逻辑代码，也就是说需要同时维护两条线，如果遵循 Webpack 的设计哲学，所有资源的加载都是由 JS 代码控制，后期也只需要维护 JS 代码这一条线

#### ② loader 的原理优势

loader 的原理就是`建立 JS 代码与资源文件的深度依赖关系`，JS 代码本身负责整个应用的业务功能，放大来说就是驱动了整个前端应用，而 JS 代码在实现业务功能的过程中需要用到样式、图片等资源文件，这种依赖关系具有明显的优势

* 逻辑上比较合理，JS 确实需要这些资源文件配合才能实现业务功能
* 确保项目上线时，资源不会缺失

### (4) 常用的 loader

以下罗列了几个开发常用的 loader

|名称|链接|
|----|----|
|file-loader   |https://webpack.js.org/loaders/file-loader|
|url-loader    |https://webpack.js.org/loaders/url-loader|
|babel-loader  |https://webpack.js.org/loaders/babel-loader|
|style-loader  |https://webpack.js.org/loaders/style-loader|
|css-loader    |https://webpack.js.org/loaders/css-loader|
|sass-loader   |https://webpack.js.org/loaders/sass-loader|
|postcss-loader|https://webpack.js.org/loaders/postcss-loader|
|eslint-loader |https://github.com/webpack-contrib/eslint-loader|
|vue-loader    |https://github.com/vuejs/vue-loader|

### (5) 开发一个 loader

## 5. 插件 plugins

## 6. 配置 configuration

## 7. 模块 modules

①②③④⑤⑥⑦⑧⑨⑩
