# 二、Webpack

[[_TOC_]]

## 1. Webpack

Webpack 本质上是一个现代 JS 应用程序的静态模块打包器，Webpack 处理应用程序时，会递归地构建一个`依赖关系图`，其中包含应用程序需要的每个模块，然后将所有模块打成一或多个包

### (1) 模块化问题解决

Webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程

* 对于有环境兼容性问题的代码，Webpack 可以在打包过程中通过 Loader 机制对其实现编译转换，然后再进行打包
* 对于零散的 JS 文件，Webpack 可以将其打包到一个 JS 文件中
* 对于不同类型的前端模块，Webpack 支持在 JS 中以模块化的方式载入任意类型的资源文件，如在 JS 中载入 CSS 文件，被载入的 CSS 文件将会以 `<style>` 标签的方式工作

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
    path: path.resolve(__dirname, 'dist') //输出目录
  },
  output: {
    //多入口或使用CommonsChunkPlugin插件
    filename: '[name].js', //输出多个js文件,使用占位符确保每个文件具有唯一名称
    path: path.resolve(__dirname, 'dist')
  }
};
```

## 5. 模块 module

module 配置如何加载项目中不同资源类型的模块，需要配置 loader 机制使用

|常用属性|用途|
|-------|----|
|rules|配置模块加载规则，配合 loader 机制使用|

规则数组 rules 包含各个规则对象，每个规则对象都有如下属性

|常用属性|用途|
|-------|----|
|test|正则匹配文件路径|
|use|指定具体的 loader|
|include|指定 test 需要匹配特定条件|
|exclude|指定 test 需要排除特定条件|

## 6. 解析器 resolve

解析器 resolve 配置项目中模块如何被解析

|常用属性|用途|
|--------|---|
|alias|设置导入模块时的路径别名|
|extensions|自动解析指定的扩展，使开发者引入模块时不带扩展|

webpack.config.js

```javascript
const path = require('path')
const config = {
  mode: 'none',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src')
    },
    extensions: ['.js', '.json', '.vue']
  }
}
module.exports = config
```

## 7. 加载器 loader

Webpack 是 JS 模块打包工具，Webpack 自身只理解 JS，默认只能按照 JS 的语法解析模块

Webpack 内部使用加载器 loader 来加载每个模块，而 Webpack 内部默认的 loader 只能导入 JS 模块，因此如果需要导入其他类型的资源模块，就需要配置不同的 loader，loader 机制使 Webpack 可以导入`任意类型的资源文件`

![loader](../../images/前端模块化/webpack/loader.png)

### (1) css-loader、style-loader

#### ① css-loader

* npm install css-loader --save-dev
* 配置 css-loader
  
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
      path: path.resolve(__dirname, 'dist_css_style_loader')
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

  ![css-loader使用](../../images/前端模块化/webpack/css-loader使用.png)

  ![css-loader效果](../../images/前端模块化/webpack/css-loader效果.png)

#### ② css-loader 原理

从以上效果图片可看到，样式文件并没有生效

* css-loader 打包
  
  由上图打包后的项目结构可知，CSS 文件并没有单独打包，而是被一起打包到 bundle.js 文件，由此可知 css-loader 的打包方式如下

  ![css-loader](../../images/前端模块化/webpack/css-loader.png)

* css-loader 原理
  
  查看 dist_loader/bundle.js 文件代码，获知 css-loader 打包原理，为什么样式文件没有生效？

  阅读以下代码可知，css-loader 原理就是`将 CSS 模块转换为 JS 模块`，具体实现方式是将 CSS 代码 push 到一个数组中，数组是由 css-loader 内部一个模块提供的，但是整个过程并没有任何地方用到了这个数组

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
      path: path.join(__dirname, 'dist_css_style_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
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

### (2) loader 的原理

#### ① loader 的原理

loader 的原理是`在 JS 中加载其他资源`，与我们平时所尊崇的`样式和行为分离`的理论相悖

Webpack 的设计哲学是`真正需要引用资源的并不是整个应用，而是你正在编写的 JS 代码`

假设我们在开发某个页面上的局部功能时，需要用到一个 CSS 文件和一个图片文件，如果还是将资源引用到 HTML 文件，然后在 JS 文件中添加需要的逻辑代码，那么如果后期这个局部功能不需要了，我们就需要同时删除 HTML 中的资源引用和 JS 中的逻辑代码，也就是说需要同时维护两条线，如果遵循 Webpack 的设计哲学，所有资源的加载都是由 JS 代码控制，后期也只需要维护 JS 代码这一条线

#### ② loader 的原理优势

loader 的原理就是`建立 JS 代码与资源文件的深度依赖关系`，JS 代码本身负责整个应用的业务功能，放大来说就是驱动了整个前端应用，而 JS 代码在实现业务功能的过程中需要用到样式、图片等资源文件，这种依赖关系具有明显的优势

* 逻辑上比较合理，JS 确实需要这些资源文件配合才能实现业务功能
* 确保项目上线时，资源不会缺失

### (3) loader 的特性

#### ① loader 运行在 Node 环境

#### ② loader 支持链式传递
  
由 css-loader、style-loader 的使用可知，loader 支持链式传递，能够对资源使用流水线，一组链式的 loader 按照`相反`的顺序执行，上一个 loader 的返回值传给下一个 loader，第一个 loader 以`字符串`的形式读入资源文件，最后一个 loader 返回 Webpack 期待的 `JS 代码`

* **按照相反的顺序执行**：css-loader、style-loader 使用时，配置文件 webpack.config.js 如下，use 数组中先指定 style-loader，再指定 css-loader，但是按照相反顺序执行，先执行 css-loader，再执行 style-loader

  ```javascript
  const path = require('path')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_css_style_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        }
      ]
    }
  }
  module.exports = config
  ```

* **最后返回 JS 代码**：loader 的原理是`在 JS 中加载其他资源`，因此一组链式 loader 中`最终 loader` 的返回结果必须是 JS 代码
  
  ![JS代码](../../images/前端模块化/webpack/JS代码.png)

#### ③ loader 支持同步函数也支持异步函数

等等

### (4) 开发一个同步 loader

需求是开发一个可以加载 markdown 文件的 loader，以便在代码中可以直接导入 .md 文件

.md 文件一般是需要转换成 HTML 之后再呈现到页面上的，因此 markdown-loader 的工作原理是`接收 .md 文件，转换成 HTML 字符串，再拼接成 JS 代码`

Webpack 的 loader 导出的是一个`函数`，这个函数就是对资源的处理过程，函数的输入就是导入的资源文件内容，函数的输出就是处理后的结果

* src/title.md
  
  ```md
  # 目录

  ## title is a markdown file
  ```

* markdown-loader.js
  
  ```javascript
  // 导出一个处理函数
  module.exports = source => {
    console.log(source)
    // 必须返回 JS 代码
    return "console.log('<h1>hello markdown-loader</h1>')"
  }
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_md_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        }
      ]
    }
  }
  module.exports = config
  ```

* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'

  // 导入 .md 文件
  import title from './title.md'
  ```

* npx webpack
  
  ![markdown-loader打包](../../images/前端模块化/webpack/markdown-loader打包.png)

  dist_md_loader/bundle.js 文件

  ![markdown-loader-bundle](../../images/前端模块化/webpack/markdown-loader-bundle.png)

* 查看效果
  
  ![markdown-loader效果](../../images/前端模块化/webpack/markdown-loader效果.png)

## 8. 插件 plugins

loader 机制是为了完成项目中各种类型资源模块的加载，从而实现项目的整体模块化

plugin 机制是为了解决项目中除资源模块打包以外的其他自动化工作，因此 plugin 的能力范围更广，用途也更多

* 打包之前自动清除 dist 目录
* 打包时自动生成使用打包结果的 HTML 文件到 dist 目录
* 打包时将无需打包的资源文件拷贝到输出目录
* 压缩打包后输出的文件

### (1) clean-webpack-plugin

Webpack 每次打包的结果都是直接覆盖到 dist 目录，因此打包之前 dist 目录就可能存在上次打包遗留的文件，再次打包时只能覆盖同名文件，所以已经移除的资源文件就会一直积累在里面，导致部署上线时出现多余文件，这显然非常不合理

clean-webpack-plugin 插件就是在每次打包之前，清除 dist 目录

#### clean-webpack-plugin 插件的使用如下

* npm install clean-webpack-plugin --save-dev
* webpack.config.js 文件，导入并配置插件
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_md_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin()
    ]
  }
  module.exports = config
  ```

* npx webpack
  
  打包之后，在 dist_clean_plugin 文件夹中放入 cat.jpg 图片，然后再次打包

  ![clean-plugin](../../images/前端模块化/webpack/clean-plugin.png) ![clean-plugin2](../../images/前端模块化/webpack/clean-plugin2.png)

### (2) html-webpack-plugin

HTML 文件一般是通过硬编码的方式，单独存放在项目根目录下，这回导致以下两个问题

* 项目发布时需要同时发布项目根目录下的 HTML 文件和 dist 目录下的打包结果，并且需要修改 HTML 文件下的引用为打包后的 bundle
* 打包结果输出的目录或者 JS 文件名改变，需要手动修改 HTML 文件中对应的 script 标签 ( 其他资源文件都通过 loader 加载到 JS 文件中 )

html-webpack-plugin 插件能够在 Webpack 打包的同时，自动生成使用打包结果的 HTML 文件到 dist 目录，让 HTML 文件也参与到整个项目的构建过程

* 项目发布时只需要发布 dist 目录
* 新生成的 HTML 文件中 script 标签是自动引入的，因此可以确保 JS 文件的路径和名称正确

#### html-webpack-plugin 插件的使用如下

* npm install html-webpack-plugin --save-dev
* webpack.config.js 文件，导入并配置插件
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_md_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(),
    ]
  }
  module.exports = config
  ```

* npx webpack
  
  ![html-plugin](../../images/前端模块化/webpack/html-plugin.png)

  dist_html_plugin/index.html

  ![html-plugin效果](../../images/前端模块化/webpack/html-plugin效果.png)

* webpack.config.js 文件，配置插件细节
  
  由以上 dist_html_plugin/index.html 文件可知，index.html 文件的页面 `title` 和 `<meta>` 标签需要修改，开发者可以修改 html-webpack-plugin 插件的配置

  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_md_loader')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
      })
    ]
  }
  module.exports = config
  ```

  npx webpack

  ![html-plugin效果2](../../images/前端模块化/webpack/html-plugin效果2.png)

### (3) copy-webpack-plugin

项目中通常会包含一些无需参与构建的静态资源文件，例如字体、图片等等，虽然无需构建，但仍需要部署到线上，一般建议将这类文件统一放到根目录下的 pulic 文件夹，Webpack 打包时将这个目录下的所有文件复制到输出目录

copy-webpack-plugin 插件就是在打包时将无需打包的资源文件拷贝到输出目录

#### copy-webpack-plugin 插件的使用如下

* npm install copy-webpack-plugin --save-dev
* webpack.config.js 文件，导入并配置插件
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_copy_plugin')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
      new CopyWebpackPlugin({
        patterns: [
          { from: './public' } //需要拷贝的目录或者路径通配符
        ]
      })
    ]
  }
  module.exports = config
  ```

* npx webpack
  
  ![copy-plugin](../../images/前端模块化/webpack/copy-plugin.png)

### (4) plugin 机制

#### ① 钩子机制

Webpack 的 plugin 机制就是软件开发中常见的`钩子机制`，钩子机制类似于 `DOM 的事件`，`钩子函数`类似 `DOM 的事件回调函数`

Webpack 的整个工作过程会有很多环节，为了便于插件的扩展，Webpack 几乎在每个环节都埋下了一个钩子，这样开发 plugin 时就可以通过往这些不同钩子上挂载不同的任务，实现扩展 Webpack 的能力

![钩子机制](../../images/前端模块化/webpack/钩子机制.gif)

#### ② Tapable 库

Webpack 的钩子机制是通过 `Tapable 库`实现的，类似于 Node 的 `EventEmitter 库`，其实就是实现的`发布订阅模式的自定义事件`

* **EventEmitter 库**：通过 `on()` 方法注册一个事件，通过 `emit()` 方法触发一个事件，执行事件回调函数
  
  ```javascript
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
  
  ```javascript
  SyncHook
  SyncBailHook
  SyncWaterfallHook
  AsyncParallelHook
  AsyncSeriesHook
  AsyncSeriesWaterfallHook
  ```
  
  ```javascript
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

### (5) 开发一个 plugin

需求是开发一个打包时能够自动清除注释的插件，这样 bundle.js 文件将更易阅读

![comments](../../images/前端模块化/webpack/comments.png)

删除 bundle.js 文件的注释，只有在 Webpack 明确需要生成的 bundle.js 文件内容后才能实施，查阅 API 文档后得知，我们需要把任务挂载到 `emit 钩子`上，emit 钩子会在 Webpack 即将向输出目录输出文件前执行

Webpack 要求插件必须是一个`包含 apply() 方法的类`

* remove-comments-plugin.js
  
  ```javascript
  class RemoveCommentsPlugin {
    constructor(){}
    apply (compiler) {
      // Webpack工作过程中最核心的对象,包含此次构建的所有配置信息,通过这个对象注册钩子函数
      console.log(compiler)
      console.log('RemoveCommentsPlugin 启动')

      // 通过compiler对象的hooks属性访问emit钩子
      // 再通过tap()方法注册同步钩子函数，第一个参数是插件名，第二个参数是同步钩子函数
      compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
        // compilation => 可以理解为此次打包的上下文
        // assets属性获取即将写入输出目录的文件信息
        for (const name in compilation.assets) {
          console.log(name) // 输出文件名
          console.log(compilation.assets[name].source()) // 输出文件内容

          // 去掉JS文件注释
          if (name.endsWith('.js')) {
            const contents = compilation.assets[name].source()
            const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
            compilation.assets[name] = {
              source: () => noComments,
              size: () => noComments.length
            }
          }
        }
      })
    }
  }
  module.exports = RemoveCommentsPlugin
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_copy_plugin')
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
      new CopyWebpackPlugin({
        patterns: [
          { from: './public' } //需要拷贝的目录或者路径通配符
        ]
      }),
      new RemoveCommentsPlugin()
    ]
  }
  module.exports = config
  ```

* npx webpack
  
  ![comments-plugin](../../images/前端模块化/webpack/comments-plugin.png)

  dist_comments_plugin/bundle.js

  ![comments-plugin效果](../../images/前端模块化/webpack/comments-plugin效果.png)

## 9. Webpack 工作机制

### (1) 打包流程

前端项目中散落着各种各样的代码和资源文件，例如 JS、CSS、图片、字体等等，这些文件在 Webpack 中都属于当前项目的一个模块，Webpack 通过打包将它们聚集在一起

* loader 机制处理除 JS 以外其他类型资源的加载，例如 CSS、图片等
* plugin 机制实现各种自动化的构建任务，例如自动压缩、自动发布等

Webpack 启动后，根据配置找到项目中的指定文件作为入口，然后顺着入口的代码，根据代码中出现的 import、require 之类的语句，解析推断出这个文件依赖的模块资源，然后再分别去解析每个资源模块的依赖，周而复始，最终形成整个项目中所有用到的文件的依赖关系树

![依赖关系树](../../images/前端模块化/webpack/依赖关系树.gif)

Webpack 遍历整个依赖关系树，找到每个节点对应的资源文件，然后根据配置文件中的 loader 配置，交给对应的 loader 去加载这个模块，最后将加载的结果放入 bundle.js 文件

对于无法通过 JS 代码表示的资源文件，例如图片、字体，对应的 loader 会将其单独作为资源拷贝到输出目录，然后将这个资源文件的访问路径作为这个模块的导出成员暴露给外部

![打包](../../images/前端模块化/webpack/打包.gif)

### (2) 关键环节

Webpack 核心工作过程的关键环节

* Webpack CLI 启动打包流程
* 载入 Webpack 核心模块，创建 Compiler 实例
* 使用 Compiler 实例开始编译整个项目
* 从入口文件开始，解析模块依赖，形成依赖关系树
* 递归依赖树，将每个模块交给对应的 Loader 处理
* 合并 Loader 处理完的结果，将打包结果输出到 dist 目录

#### ① Webpack Cli

从 Webpack 4 开始 Cli 部分被单独抽象到了 webpack-cli 模块，目的是为了增强 Webpack 本身的灵活性

webpack-cli 的作用就是将 CLI 参数（运行 webpack 命令时通过命令行传入的参数，例如 --mode=production）和 Webpack 配置文件中的配置整合，得到一个完整的配置对象

node_modules/webpack-cli/cli.js

![cli](../../images/前端模块化/webpack/cli.png)

调用 bin/utils/convert-argv.js 模块，将得到的命令行参数转换为 Webpack 的配置选项对象

![调用convert-argv](../../images/前端模块化/webpack/调用convert-argv.png)

convert-argv.js 工作过程中，首先判断命令行参数中是否指定了具体的配置文件路径，如果指定了就加载指定配置文件，否则就需要根据默认配置文件加载规则找到配置文件

node_modules/webpack-cli/utils/convert-argv.js

![convert-argv](../../images/前端模块化/webpack/convert-argv.png)

找到配置文件后，将 CLI 参数中的配置和配置文件中的配置合并，最终得到一个完整的配置选项，有了配置选项，就开始载入 Webpack 核心模块，创建 Compiler 实例，Compiler 实例负责完成整个项目的构建工作，是 Webpack 工作过程中最核心的对象

![Compiler实例](../../images/前端模块化/webpack/Compiler实例.png)

#### ② 创建 Compiler 实例

随着 Webpack-cli 载入 Webpack 核心模块，整个执行过程就到了 Webpack 模块，webpack.js 文件导出一个用于创建 Compiler 实例的函数，

node_modules/webpack/lib/webpack.js

![webpack](../../images/前端模块化/webpack/webpack.png)

导出函数中首先判断参数 options，options 既可以是对象也可以是数组，配置数组中的每个成员都是一个独立的配置选项，Webpack 既支持`单线打包`也支持`多路打包`

![多路打包](../../images/前端模块化/webpack/多路打包.png)

顺着单线打包往下看，创建 Compiler 实例后，Webpack 就开始注册配置的每个插件，再往后 Webpack 工作过程的生命周期就要开始了，所以必须先注册，这样才能确保插件中的钩子函数都能挂载到指定钩子上

![注册插件](../../images/前端模块化/webpack/注册插件.png)

#### ③ 开始构建

完成 Compiler 实例的创建后，再次进入 webpack-cli 模块，开始判断配置选项中是否启用了监视模式

* 如果是监视模式就调用 Compiler 实例的 watch 方法，以监视模式启动构建，但这不是我们主要关心的主线
* 如果不是监视模式就调用 Compiler 实例的 run 方法，开始构建整个应用

node_modules/webpack-cli/cli.js

![判断监视模式](../../images/前端模块化/webpack/判断监视模式.png)

Compiler.run() 方法定义在 Compiler 类上，具体文件在 node_modules/webpack/lib/Compiler.js，run() 方法内部先后触发了 beforeRun、run 两个钩子，最关键的是调用了 this.compile() 方法，正式开始编译整个项目

![Compiler.run](../../images/前端模块化/webpack/Compiler.run.png)

再往下看，找到 Compiler.compile() 方法，compile() 方法内部先后触发了 beforeCompile、compile、make、afterCompile 四个钩子，最主要的是创建了一个 compilation 实例，compilation 可以理解为一次构建过程中的上下文对象，里面包含了这次构建的全部资源和信息

![Compiler.compile](../../images/前端模块化/webpack/Compiler.compile.png)

#### ④ make 阶段

随着 Compiler.compile() 方法内触发 make 钩子，由此进入了 make 阶段，make 阶段的主要目标就是：根据 entry 配置找到入口模块，开始依次递归遍历出所有依赖，形成依赖关系树，然后将每个模块交给对应的 loader 处理

触发 make 钩子之后就开始执行所有同步和异步 make 钩子函数，VSCode 搜索 make.tap，找到所有注册的 make 钩子函数

![make钩子函数](../../images/前端模块化/webpack/make钩子函数.png)

* SingleEntryPlugin.js 插件中调用了 Compilation 对象的 addEntry 方法，开始解析入口
* addEntry 方法中又调用了 _addModuleChain 方法，将入口模块添加到模块依赖列表中
* 紧接着通过 Compilation 对象的 buildModule 方法进行模块构建
* buildModule 方法中执行具体的 Loader，处理特殊资源加载
* build 完成过后，通过 acorn 库生成模块代码的 AST 语法树
* 根据语法树分析这个模块是否还有依赖的模块，如果有则继续循环 build 每个依赖
* 所有依赖解析完成，build 阶段结束
* 最后合并生成需要输出的 bundle.js 写入 dist 目录

## 10. Webpack Dev Server

编写源代码 - Webpack 打包 - 运行应用程序 - 浏览器查看 这种周而复始的开发方式过于原始，开发效率十分低下

Webpack-dev-server 是 Webpack 官方推出的一款开发工具，提供了一个 Web 服务器，并且将自动打包、自动刷新浏览器等一系列对开发友好的功能全部集成到了一起

### (1) webpack-dev-server 使用

* npm install webpack-dev-server --save-dev
  
  webpack-dev-server 是一个独立的 npm 模块，没有集成在 Webpack 或者 Webpack-cli 中，需要单独安装

* webpack.config.js 文件配置 devServer
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_devServer')
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '..', 'src')
      },
      extensions: ['.js', '.json', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为向后兼容版本的ES5代码
            options: {
              presets: ['@babel/preset-env']
            }
          }
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
      new RemoveCommentsPlugin()
    ],
    devServer: {
      host: '10.20.15.72',
      port: '8081',
      open: true,
      overlay: {errors: true, warnings: false},
    },
  }
  module.exports = config
  ```

* npx webpack-dev-server
  
  运行命令，内部会启动一个 Web 服务器，为打包结果提供静态文件服务，并且自动使用 Webpack 打包应用，然后监听源代码的变化，一旦文件发生变化，就会立即重新打包

  大致流程如下

  ![webpack-dev-server流程](../../images/前端模块化/webpack/webpack-dev-server流程.png)

  Webpack-dev-server 为了提高工作效率，并没有将打包结果写入磁盘，不会产生 dist 文件夹，而是暂时存放在`内存`，内部的 Web 服务器也是从内存中读取文件的，这样可以减少很多不必要的磁盘操作，大大提高整体的构建效率

  ![webpack-dev-server内存](../../images/前端模块化/webpack/webpack-dev-server内存.png)

  ![devServer预览](../../images/前端模块化/webpack/devServer预览.png)

* 修改 src/index.js 文件代码
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'

  // 导入 .md 文件
  import title from './title.md'

  // 新增代码
  console.log(111)
  ```

  查看浏览器，效果自动更新

  ![devServer预览更新](../../images/前端模块化/webpack/devServer预览更新.png)

### (2) webpack-dev-server 配置

配置文件 webpack.config.js 有一个 devServer 属性，专门为 webpack-dev-server 提供配置

#### ① 静态资源访问

webpack-dev-server 会默认将构建结果和输出文件全部作为 Web 服务器的静态资源，也就是说，只要是 Webpack 打包输出的文件都可以直接被访问到，但是如果有一些没有参与打包的资源文件也需要作为 Web 服务器的资源被访问，就需要额外通过配置告诉 webpack-dev-server，具体方法是在配置文件 webpack.config.js 的 devServer 属性，添加一个 `contentBase` 属性，值为静态资源路径，可以是字符串或数组

前面提出可以通过插件 `copy-webpack-plugin` 将 public 文件夹中的内容在打包时拷贝到输出目录，但是开发过程中会频繁执行打包工作，如果每次都执行这个插件拷贝文件夹，构建速度自然会降低，因此一般只有在项目上线前的那一次打包中使用这个插件，也就是说，`copy-webpack-plugin` 插件应该配置成只有在`生产模式`下打包时使用，具体如何配置后续再讲

```javascript
module.exports = {
  // ...
  devServer: {
    host: '10.20.15.72',
    port: '8081',
    open: true,
    overlay: {errors: true, warnings: false},
    contentBase: './public'
  }
}
```

#### ② proxy 代理

webpack-dev-server 是一个本地 Web 服务器，所以开发阶段前端应用程序独立运行于前端人员电脑的 localhost 的一个端口上，后端应用程序运行于后端人员的电脑上，因此前后端是`跨域`的，而最终上线后，前端应用程序和后端应用程序一般会部署到同一个服务器的同一个 IP 地址的不同端口上，也是`跨域`的

解决开发阶段跨域请求的最好办法，就是在本地 Web 服务器中配置一个后端 API 的代理服务，具体方法是在配置文件 webpack.config.js 的 devServer 属性，添加一个 `proxy` 属性

```javascript
module.exports = {
  // ...
  devServer: {
    host: '10.20.15.72', //不指定则默认localhost
    port: '8081',
    open: true,
    overlay: {errors: true, warnings: false},
    contentBase: './public',
    proxy: {
      '/api': {
        target: 'https://github.com',
        //代理服务器默认以实际在浏览器中请求的主机名作为代理请求的主机名,
        //而对于github服务器来说,localhost:8081的主机名是不被允许的,
        //该属性设置为true,代理服务器就会以代理的主机名github.com去请求
        changeOrigin: true,
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  }
}

//前端：http://localhost:8081
//代理：http://localhost:8081/api/users
//后端：https://github.com/users
```

## 11. Webpack SourceMap

Webpack 将开发阶段编写的源代码打包成生产环境运行的代码，也就意味着实际运行的代码和真正编写的代码之间存在很大的差异，这种情况下，打包后应用程序运行过程中出现意料之外的错误，将无从下手，因为只能在浏览器控制台看到错误信息定位在打包后的代码中的位置，而无法直接定位到源代码的位置

### (1) SourceMap (源代码地图)

源代码地图 SourceMap 就是解决此类问题的最好办法，它的作用就是映射打包后的代码和源代码之间的关系，打包后的代码通过 SourceMap 文件就可以逆向解析得到源代码

![SourceMap](../../images/前端模块化/webpack/SourceMap.png)

目前很多第三方库都会在发布的文件中同时提供一个 .map 后缀的 SourceMap 文件，例如 jQuery，这是一个 JSON 格式的文件，记录了转换前后代码的映射关系，主要存在以下几个属性

* **version**：使用的 SourceMap 标准版本
* **sources**：转换前的源文件名称
* **names**：源代码中使用的一些成员名称
* **mappings**： base64-VLQ 编码字符串，记录转换后代码的字符与转换前代码的字符之间的映射关系

![jquery_map](../../images/前端模块化/webpack/jquery_map.png)

一般我们在转换后的代码中通过添加一行注释的方式引入 SourceMap 文件，用于开发调试

![引入SourceMap](../../images/前端模块化/webpack/引入SourceMap.png)

chrome 浏览器打开 index.html 文件，然后 F12 打开控制台 source 面板，可以看到自动请求了 jquery.min.map 文件，然后根据文件内容逆向解析出来源代码 jquery.js 文件，以便于调试

![解析源代码](../../images/前端模块化/webpack/解析源代码.png)

还可以添加一个断点，然后刷新页面进行单点调试，此时调试的就是源代码而非压缩后的代码

![调试源代码](../../images/前端模块化/webpack/调试源代码.png)

### (2) Webpack 配置 SourceMap

使用 Webpack 打包时，同样支持为打包结果生成 SourceMap，并且还支持几种不同的 SourceMap 机制，配置文件 webpack.config.js 有一个 devtool 属性，专门为 webpack-dev-server 提供配置

* **开发环境**：无论是 Vue 项目还是 React 项目，loader 转换前后代码差别很大，而开发者一般是需要`调试 loader 转换前的代码`，一般情况下错误`定位到行`就够了，省略列信息可以提升构建速度，因此推荐 `cheap-module-eval-source-map` 模式
* **生产环境**：SourceMap 会暴露源代码到生产环境，如果没有控制 SourceMap 文件的访问权限，但凡有点技术的人都很容易复原项目中绝大多数源码，这非常不安全也不合理，因此建议选择 `none` 模式

![source_map模式](../../images/前端模块化/webpack/source_map模式.png)

* src/index.js 文件增加一行运行时错误
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'

  // 导入 .md 文件
  import title from './title.md'

  // 运行时错误
  console.log111('index.js running')
  ```

* webpack.config.js 文件配置具体的 SourceMap
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = maps.map(item => ({
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'cheap-module-eval-source-map.js',
      path: path.join(__dirname, 'cheap-module-eval-source-map')
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '..', 'src')
      },
      extensions: ['.js', '.json', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.css$/,   //正则匹配文件路径
          use: [            //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.md$/,
          use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将  ES6代码转换为向后兼容版本的ES5代码
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: 'cheap-module-eval-source-map.html', //文件名
        title: 'Webpack',                              //title属性
        meta: {                                        //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new RemoveCommentsPlugin()
    ],
    devServer: {
      host: '10.20.15.72',
      port: '8081',
      open: true,
      overlay: {errors: true, warnings: false},
      contentBase: './public'
    },
    devtool: 'cheap-module-eval-source-map'
  }))
  module.exports = config
  ```

* npx webpack-dev-server
  
  打包，浏览器打开每个 SourceMap 下的 HTML 文件，控制台查看报错效果
  
  ![cheap-module-eval-source-map打包](../../images/前端模块化/webpack/cheap-module-eval-source-map打包.png)

  ![cheap-module-eval-source-map报错](../../images/前端模块化/webpack/cheap-module-eval-source-map报错.png)

  ![cheap-module-eval-source-map效果](../../images/前端模块化/webpack/cheap-module-eval-source-map效果.png)

## 12. 模块热替换 HMR

### (1) webpack-dev-server 的问题

开发者每次修改完代码，Webpack 都可以监听到变化，然后自动打包，再通知浏览器自动刷新

然而一旦`页面整体刷新`，那么`页面中的任何操作状态都会丢失`，因此 webpack-dev-server 的自动刷新功能并不是那么好用

最好的办法就是能够实现，在页面不刷新的情况下，新增或修改的代码也能够及时更新到浏览器页面中，避免页面状态丢失

* src/index.js 文件添加 textarea 输入框
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)
  ```

* src/style.css 文件添加 textarea 输入框文字样式
  
  ```css
  body {
    color: red;
  }
  textarea {
    color: green;
  }
  ```

* npx webpack-dev-server
  
  浏览器夜间上 textarea 输入框输入 ddddd...
  
  ![no_HMR1](../../images/前端模块化/webpack/no_HMR1.png)

* 修改 src/style.css 文件样式
  
  ```css
  body {
    color: red;
  }
  textarea {
    color: green;
    font-weight: bold;
  }
  ```

### (2) 模块热替换 HMR

模块热替换 HMR 指的是在`应用运行过程`中，开发者修改了某个模块的代码，Webpack 实时替换掉这个修改的模块，而无需完全刷新整个应用，那么应用的运行状态就不会因此而改变

就是在应用程序运行过程中替换、添加、删除模块，而无需重新加载整个页面的功能

* 只更新变更内容，以节省开发时间
* 调整样式更加快速，几乎相当于在浏览器调试器中更改样式
* 保留应用程序状态

在应用程序中

* 应用程序代码要求 HMR runtime 检查更新
* HMR runtime `异步`下载更新，然后通知应用程序代码
* 应用程序代码要求 HMR runtime 应用更新
* HMR runtime `同步`应用更新

步骤

* webpack.config.js 文件配置模块热替换 HMR
  
  ```javascript
  ```

* npx webpack-dev-server
  
  打包之后，在浏览器页面上 textarea 中输入内容



①②③④⑤⑥⑦⑧⑨⑩
