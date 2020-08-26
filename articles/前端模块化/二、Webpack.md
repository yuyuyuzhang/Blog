# 二、Webpack

[[_TOC_]]

## 1. Webpack

Webpack 本质上是一个现代 JS 应用程序的静态模块打包器，Webpack 处理应用程序时，会递归地构建一个`依赖关系图`，其中包含应用程序需要的每个模块，然后将所有模块打成一或多个包

### (1) 模块化问题解决

Webpack 以模块化思想为核心，帮助开发者更好的管理整个前端工程

* 对于有环境兼容性问题的代码，Webpack 可以在打包过程中通过 Loader 机制对其实现编译转换，然后再进行打包
* 对于零散的 JS 文件，Webpack 可以将其打包到一个 JS 文件中
* 对于不同类型的前端模块，Webpack 支持在 JS 中以模块化的方式载入任意类型的资源文件，如在 JS 中载入 CSS 文件，被载入的 CSS 文件将会以 `<style>` 标签的方式工作

### (2) Webpack 打包原理

Webpack 的工作模式可以理解为针对不同环境的几组预设配置，mode 指示 Webpack 使用相应模式的内置优化

* none：原始模式，`不做任何额外处理`，运行最原始的打包
* production ( 默认 )：生产模式，`自动优化打包结果`，启动内置优化插件，打包速度偏慢
* development：开发模式，`自动优化打包速度`，添加一些调试过程中的辅助插件

![mode](../../images/前端模块化/webpack/mode.png)

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

## 2. 入口 entry

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

## 3. 出口 output

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

## 4. 模块 module

module 配置如何加载项目中不同资源类型的模块，需要配置 loader 机制使用

| 常用属性 | 用途                                   |
| -------- | -------------------------------------- |
| rules    | 配置模块加载规则，配合 loader 机制使用 |

规则数组 rules 包含各个规则对象，每个规则对象都有如下属性

| 常用属性 | 用途                       |
| -------- | -------------------------- |
| test     | 正则匹配文件路径           |
| use      | 指定具体的 loader          |
| include  | 指定 test 需要匹配特定条件 |
| exclude  | 指定 test 需要排除特定条件 |

## 5. 解析器 resolve

解析器 resolve 配置项目中模块如何被解析

| 常用属性   | 用途                                           |
| ---------- | ---------------------------------------------- |
| alias      | 设置导入模块时的路径别名                       |
| extensions | 自动解析指定的扩展，使开发者引入模块时不带扩展 |

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

## 6. 加载器 loader

Webpack 是 JS 模块打包工具，Webpack 自身只理解 JS，默认只能按照 JS 的语法解析模块

Webpack 内部使用加载器 loader 来加载每个模块，而 Webpack 内部默认的 loader 只能导入 JS 模块，因此如果需要导入其他类型的资源模块，就需要配置不同的 loader，loader 机制使 Webpack 可以导入`任意类型的资源文件`，因此 loader 既是加载器，也是`资源管理器`

![loader](../../images/前端模块化/webpack/loader.png)

### (1) 加载 CSS

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
  
  index.html 文件中使用打包后的 dist_css_style_loader/bundle.js 文件，控制台打开 index.html 文件，查看效果，发现样式文件并没有生效

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

### (2) 加载图片

* npm install url-loader --save-dev
* src/style.css
  
  ```css
  body {
    color: red;
    background: url('../public/cat.jpg')
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
      path: path.join(__dirname, 'dist_url_loader_img')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: 'url-loader'
        }
      ]
    }
  }
  module.exports = config
  ```

* npx webpack
  
  ![url_loader_img](../../images/前端模块化/webpack/url_loader_img.png)

### (3) 加载字体

* 下载字体文件
  
  ![font_TJS](../../images/前端模块化/webpack/font_TJS.png)

* src/style.css
  
  ```css
  @font-face {
    font-family: 'myFont';
    src: url('TJS.ttf');
  }

  body {
    color: red;
    background: url('../public/cat.jpg');
    font-family: 'myFont'
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
      path: path.join(__dirname, 'dist_url_loader_font')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          use: 'url-loader'
        },
        {
          test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
          use: 'url-loader'
        }
      ]
    }
  }
  module.exports = config
  ```

* npx webpack
  
  ![url_loader_font](../../images/前端模块化/webpack/url_loader_font.png)

### (4) 加载媒体

* 下载一个视频
  
  ![视频](../../images/前端模块化/webpack/视频.png)

* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  const video = document.createElement('video')
  video.src = "./movie.mp4"
  document.append(video)
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
      path: path.join(__dirname, 'dist_url_loader_video')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          use: 'url-loader'
        },
        {
          test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
          use: 'url-loader'
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //加载媒体
          use: 'url-loader'
        }
      ]
    }
  }
  module.exports = config
  ```

* npx webpack

### (5) loader 的原理

#### ① loader 的原理

loader 的原理是`在 JS 中加载其他资源`，与我们平时所尊崇的`样式和行为分离`的理论相悖

Webpack 的设计哲学是`真正需要引用资源的并不是整个应用，而是你正在编写的 JS 代码`

假设我们在开发某个页面上的局部功能时，需要用到一个 CSS 文件和一个图片文件，如果还是将资源引用到 HTML 文件，然后在 JS 文件中添加需要的逻辑代码，那么如果后期这个局部功能不需要了，我们就需要同时删除 HTML 中的资源引用和 JS 中的逻辑代码，也就是说需要同时维护两条线，如果遵循 Webpack 的设计哲学，所有资源的加载都是由 JS 代码控制，后期也只需要维护 JS 代码这一条线

CSS 被转换成 `<style>` 标签，图片被转换成 `base64` 格式

<!-- 我们做的一个项目中首页用了十多张图片，每张图片都是一个静态资源，所以都会有 http 请求，为了减少请求，我们可以通过 base64 编码的方法来展示图片。webpack 中有一个包叫做 url-loader，他可以将 html 以及 css 中的图片打包成 base64 -->

#### ② loader 的原理优势

loader 的原理就是`建立 JS 代码与资源文件的深度依赖关系`，JS 代码本身负责整个应用的业务功能，放大来说就是驱动了整个前端应用，而 JS 代码在实现业务功能的过程中需要用到样式、图片等资源文件，这种依赖关系具有明显的优势

* 逻辑上比较合理，JS 确实需要这些资源文件配合才能实现业务功能
* 确保项目上线时，资源不会缺失

### (6) loader 的特性

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

![loader分类](../../images/前端模块化/webpack/loader分类.jpg)

**Node 环境**：Node 使用的是 chrome V8 JS 引擎，因此 `Node 环境只有一个 JS 引擎线程`，Webpack 就是工作在 Node 环境

**同步 loader**：同步 loader 指的是同步返回转换后的内容，因此同步 loader 的转换过程会阻塞 Webpack 整个构建，构建缓慢不适用于耗时较长的情况，同步 loader 适用于计算量小、速度快的情况

**异步 loader**：异步 loader 指的是异步返回转换后的内容，因此异步 loader 不会阻塞 Webpack 整个构建，异步 loader 适用于计算量大、耗时长的情况（例如网络请求）

### (7) 开发一个 loader

需求是开发一个可以加载 markdown 文件的 loader，以便在代码中可以直接导入 .md 文件，.md 文件一般是需要转换成 HTML 之后再呈现到页面上的，因此 markdown-loader 的工作原理是`接收 .md 文件，转换成 HTML 字符串，再拼接成 JS 代码`

Webpack 规定 loader 导出一个`函数`，这个函数就是对资源的处理过程，函数的输入就是导入的资源文件内容，函数的输出就是处理后的结果

#### ① 同步 markdown-loader

* src/title.md
  
  ```md
  # 目录

  ## title is a markdown file
  ```

* sync-markdown-loader.js
  
  ```javascript
  // 导出一个处理函数
  module.exports = source => {
    console.log(source)
    // 必须返回 JS 代码
    return "console.log('<h1>hello sync-markdown-loader</h1>')"
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
      path: path.join(__dirname, 'dist_sync_md_loader')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          use: 'url-loader'
        },
        {
          test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
          use: 'url-loader'
        },
        {
          test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载媒体
          use: 'url-loader'
        },
        {
          test: /\.md$/,
          use: './sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  const video = document.createElement('video')
  video.src = "./movie.mp4"
  document.append(video)

  // 导入 .md 文件
  import title from './title.md'
  ```

* npx webpack

  查看 dist_sync_md_loader/bundle.js 文件

  ![sync-markdown-loader-bundle](../../images/前端模块化/webpack/sync-markdown-loader-bundle.png)

  浏览器查看效果
  
  ![sync-markdown-loader效果](../../images/前端模块化/webpack/sync-markdown-loader效果.png)

#### ② 异步 markdown-loader

* async-markdown-loader.js
  
  ```javascript
  // 导出一个处理函数
  module.exports = source => {
    console.log(source)
    // 必须返回 JS 代码
    return "console.log('<h1>hello async-markdown-loader</h1>')"
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
      path: path.join(__dirname, 'dist_async_md_loader')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          use: 'url-loader'
        },
        {
          test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
          use: 'url-loader'
        },
        {
          test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载媒体
          use: 'url-loader'
        },
        {
          test: /\.md$/,
          use: './async-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        }
      ]
    }
  }
  module.exports = config
  ```

* npx webpack

  查看 dist_async_md_loader/bundle.js 文件

  ![async-markdown-loader-bundle](../../images/前端模块化/webpack/async-markdown-loader-bundle.png)

  浏览器查看效果
  
  ![async-markdown-loader效果](../../images/前端模块化/webpack/async-markdown-loader效果.png)

## 7. 插件 plugins

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

## 8. Webpack 工作机制

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

## 9. Webpack Dev Server

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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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

## 10. Webpack SourceMap

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
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_cheap-module-eval-source-map')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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

## 11. 模块热替换 HMR

### (1) devServer 自动刷新页面的问题

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
* 浏览器页面上 textarea 输入框输入 ddddd...
* 修改 src/style.css 文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下
  
  ```css
  body {
    color: red;
  }
  textarea {
    color: blue;
  }
  ```

  ![no_HMR](../../images/前端模块化/webpack/no_HMR.gif)

### (2) HMR

HMR 指的是在`应用运行过程`中，开发者修改了某个模块的代码，Webpack 实时替换掉这个修改的模块，而无需完全刷新整个应用，那么应用的运行状态就不会因此而改变

#### ① HMR 的特性

* 只更新变更内容，以节省开发时间
* 调整样式更加快速，几乎相当于在浏览器调试器中更改样式
* 保留应用程序状态

#### ② HMR 的原理

* 应用程序代码要求 HMR runtime 检查更新
* HMR runtime `异步`下载更新，然后通知应用程序代码
* 应用程序代码要求 HMR runtime 应用更新
* HMR runtime `同步`应用更新

#### ③ HMR 的配置

* 基础步骤同上

* webpack.config.js 文件配置 HMR 需要配置两处地方
  * devServer `hot` 属性设置为 true
  * 导入 webpack 模块，再通过 webpack 模块加载 `HotModuleReplacementPlugin` 插件
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_HMR')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new RemoveCommentsPlugin(),
      new webpack.HotModuleReplacementPlugin() //HMR特性必需的插件
    ],
    devServer: {
      port: '8081',
      open: true,
      hot: true, //HMR
      overlay: {
        errors: true,
        warnings: false
      },
      contentBase: './public'
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack-dev-server

#### ④ HMR 的 CSS 应用

* 浏览器页面上 textarea 输入框输入 ddddd...
* 修改 src/style.css 文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下
  
  ```css
  body {
    color: red;
  }
  textarea {
    color: blue;
  }
  ```
  
  ![HMR_css](../../images/前端模块化/webpack/HMR_css.gif)

#### ⑤ HMR 的 JS 应用

* 浏览器页面上 textarea 输入框输入 ddddd...
* 修改 src/head.js 文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下
  
  ```javascript
  // 导出一个箭头函数
  export default () => {
    const element = document.createElement('h2')
    element.textContent = 'Hello Webpack'
    element.addEventListener('click', () => alert('Hello Webpack'))

    // 测试 JS 文件 HMR
    console.log(555)

    return element
  }
  ```

  ![HMR_js](../../images/前端模块化/webpack/HMR_js.gif)

* 观察得知，CSS 文件 HMR 没有问题，这是因为 CSS 文件 HMR 只需要将更新后的 CSS 代码及时替换到页面中就可以覆盖掉之前的样式从而实现更新，而 CSS 文件会经过 css-loader、style-loader 处理，`style-loader` 中会自动处理 CSS 文件的热替换，无需开发者操心
* 观察得知，JS 文件 HMR 会回退到`自动刷新页面`，这是因为开发者编写的 JS 文件是没有任何规律的，导出的可能是一个对象/字符串/函数，使用时也各不相同，Webpack 面对这些毫无规律的 JS 文件，无法实现一个可以通用所有情况的 HMR 方案
* 因此 JS 文件要实现 HMR 需要开发者`手动通过代码处理`

#### ⑥ HMR 的 JS 处理函数

上面提到的配置 HMR 所需的 `HotModuleReplacementPlugin` 插件为开发者提供了一套用于处理 JS 文件 HMR 的通用 API，由此开发者可以在 JS 文件中通过 API 手动处理模块更新后的热替换

开启 HMR 开发者就可以访问到`全局对象 module 的 hot 属性`，hot 属性提供了一个 `accept 方法`用于注册某个模块更新后的处理函数，第一个参数时监视的依赖模块路径，第二个参数是依赖模块更新后的处理函数

* src.index.js 文件中编写 head.js 模块的 HMR 处理函数
  
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

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)

      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)
    })
  }
  ```

* 浏览器页面上 textarea 输入框输入 ddddd...
* 修改 src/head.js 文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下

  ![HMR_js_accept](../../images/前端模块化/webpack/HMR_js_accept.gif)

#### ⑦ hotOnly

如果 HMR 的处理函数中发生错误则会导致 HMR 失败，HMR 失败则会自动`回退到自动刷新页面`，页面一旦自动刷新，控制台报错信息也会被清除，因此这种情况下的错误很难被发现也不容易定位

* src/index.js 文件中的 head.js 模块的 HMR 处理函数添加一个运行时错误
  
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

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)

      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)

      // 运行时错误
      undefined.f()
    })
  }
  ```

* 浏览器页面上 textarea 输入框输入 ddddd...
* 修改 src/head.js 文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下，这是因为如果 HMR 的处理函数中发生错误则会导致 HMR 失败，HMR 失败则会自动`回退到自动刷新页面`，页面一旦自动刷新，控制台报错信息也会被清除

  ![HMR_js_error](../../images/前端模块化/webpack/HMR_js_error.gif)

* 这种情况可以将配置文件 webpack.config.js 的 devServer 属性的 `hotOnly` 配置为 true 来解决，不再使用 hot 配置，因为 hot 配置 HMR 失败会回退到自动刷新页面，而 hotOnly 配置不会
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_HMR')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new RemoveCommentsPlugin(),
      new webpack.HotModuleReplacementPlugin() //HMR特性必需的插件
    ],
    devServer: {
      port: '8081',
      open: true,
      hotOnly: true, //HMR
      overlay: {
        errors: true,
        warnings: false
      },
      contentBase: './public'
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* 操作同上
  
  ![HMR_js_hotOnly](../../images/前端模块化/webpack/HMR_js_hotOnly.gif)

## 12. Webpack 生产环境高级特性

### (1) Tree Shaking

Tree Shaking 的意思是摇树，伴随着摇树的动作，树上的枯枝和树叶就会掉落下来，Tree Shaking 摇掉的是项目中的`未引用代码 dead-code`

Tree-shaking 并不是指 Webpack 中的某一个配置选项，而是一组功能搭配使用实现的效果，Webpack 使用`生产模式`打包时，会自动开启这组优化功能，检测未引用代码并自动移除

#### ① 生产环境 production

* src/compoennt.js
  
  ```javascript
  export const Button = () => {
    const button = document.createElement('button')
    button.innerHTML = '按钮-component'
    return button
  }
  // 未引用代码
  export const Link = () => {
    const a = document.createElement('a')
    a.innerHTML = '链接-component'
    return a
  }
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

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)

      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)
    })
  }

  // Tree-shaking
  import { Button } from './components'
  document.body.appendChild(Button())
  ```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'production',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_tree_shaking')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' }
        ]
      }),
      new RemoveCommentsPlugin(),
    ],
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* `npx webpack --mode=production`
  
  生产环境下打包，查看 src/bundle.js，从搜索结果来看，并不包含 `document.createElement('a')`，说明生产环境下确实会自动开启摇树功能

  ![treeShaking_prod](../../images/前端模块化/webpack/treeShaking_prod.png)

#### ② optimization.usedExports

在生产环境以外的其他环境下，想要实现摇树功能，需要自行在配置文件 webpack.config.js 中配置 `optimization` 属性，该属性用来集中配置 Webpack 内置优化功能

* webpack.config.js
  
  属性 optimization 配置 `usedExports=true`，可以实现打包结果中模块只导出外部用到的成员（标记枯树枝、树叶）
  
  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_treeShaking_none')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' }
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中的模块只导出外部用到的成员(标记枯树枝、树叶)
    }
  }
  module.exports = config
  ```

* `npx webpack --mode none`
  
  原始环境下打包，查看 src/bundle.js

  ![treeShaking_usedExports](../../images/前端模块化/webpack/treeShaking_usedExports.png)

#### ③ optimization.minimize

* webpack.config.js
  
  属性 optimization 配置 `minimize=true`，可以实现压缩打包结果（摇下枯树枝、树叶）
  
  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_treeShaking_none_minimize')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' }
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中的模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: true //压缩打包结果(摇下枯树枝、树叶)
    }
  }
  module.exports = config
  ```

* `npx webpack --mode none`
  
  原始环境下打包，查看 src/bundle.js

  ![treeShaking_prod](../../images/前端模块化/webpack/treeShaking_prod.png)

#### ④ optimization.concatenateModules

* dist_treeShaking_none_usedExports/bundle.js
  
  先查看上上一个例子，即仅配置 `usedExports=true` 的打包结果，因为压缩后的代码不方便阅读

  ![treeShaking_usedExports_module](../../images/前端模块化/webpack/treeShaking_usedExports_module.png)

* webpack.config.js
  
  属性 optimization 配置 `concatenateModules=true`，可以实现尽可能合并所有模块到一个函数中（合并可用树枝、树叶）

  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_treeShaking_none_concatenateModules')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' } 
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中的模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false, //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: true, //打包结果尽可能合并所有模块到一个函数中(合并可用树枝、树叶)
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  ![treeShaking_none_concatenateModules](../../images/前端模块化/webpack/treeShaking_none_concatenateModules.png)

#### ⑤ Tree Shaking 与 babel-loader

`Tree-shaking 实现的前提是 ES6 Modules`，Tree-shaking 通过 ES6 Modules 的 export、import 判断模块成员是否被引用，从而识别出`未引用代码 dead-code`，也就是说最终交给 Webpack 打包的代码，必须是以 ES6 Modules 的方式组织的模块化

很多资料说配置 `babel-loader`，会导致 Tree-shaking 失效，为什么这么说呢？因为 babel-loader 会在不兼容的环境中转换源代码中的一些 ES6 特性为 ES5 特性，因此 ES6 Modules 部分可能会被转换为 CommonJS

babel-loader 会不会转换 ES6 Modules 取决于开发者是否为其配置转换 ES6 Modules 的插件，很多时候我们为 babel-loader 配置的是一组预设插件集合 `@babel/presert-env`，这个预设里面就有转换 ES6 Modules 的插件，但是目前最新版本的 babel-loader `8.x` 已经已经自动为开发者关闭了转换 ES6 Modules 的插件，因此不会导致 Tree-shaking 失效，但是如果使用的是 babel-loader `7.x` 就会导致 Tree-shaking 失效

### (2) sideEffects

**模块的副作用**：模块执行的时候除了导出成员，是否还做了其他的事情

Webpack 4 中新增了一个 sideEffects 特性来实现`模块无副作用打包`，允许开发者在文件 `package.json` 中通过配置 `sideEffects` 来标识整个项目的代码是否有副作用，从而提供更大的压缩空间，这个特性一般只有在`开发 npm 模块`时才会用到，并且这个特性在`生产环境`下默认自动开启，以下以`原始环境`为例介绍怎样手动开启 sideEffects 功能

#### ① optimization.usedExports

Tree Shaking 配置 `optimization.usedExports` 可以实现打包结果中的模块只导出外部用到的成员（标记枯树枝、树叶），那么需要验证一下，打包结果中的 src/commons/index.js 模块是否只导出了 Link 模块，打包结果是否不包含 src/commons/button.js 模块

* src 下新建 commons 文件夹，文件夹下新建 index.js、button.js、link.js 文件
  
  ![sideEffects目录](../../images/前端模块化/webpack/sideEffects目录.png)

  src/commons/button.js

  ```javascript
  // 副作用代码
  console.log('Button component')

  export const Button = () => {
    const button = document.createElement('button')
    button.innerHTML = '按钮-common'
    return button
  }
  ```

  src/commons/link.js

  ```javascript
  // 副作用代码
  console.log('Link component')

  export const Link = () => {
    const a = document.createElement('a')
    a.innerHTML = '链接-common'
    return a
  }
  ```

  src/commons/index.js

  ```javascript
  export { Button } from './button'
  export { Link } from './link'
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

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)

      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)
    })
  }

  // Tree-shaking
  import { Button } from './component.js'
  document.body.appendChild(Button())

  // sideEffects
  // 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
  // index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
  import { Link } from './common/index.js'
  document.body.appendChild(Link())
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_sideEffects_none_usedExports')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' } 
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中的模块只导出外部用到的成员(标记枯树枝、树叶)
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  ![treeShaking_sideEffects](../../images/前端模块化/webpack/treeShaking_sideEffects.png)

#### ② optimization.sideEffects

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_sideEffects_none')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' } 
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      sideEffects: true, //
    }
  }
  module.exports = config
  ```

* package.json
  
  ```json
  {
    "name": "webpack-front",
    "version": "0.1.0",
    "main": "n/a",
    "author": "yuyuyuzhang",
    "license": "MIT",
    "sideEffects": false, //表示整个项目的所有代码都没有副作用,optimization.sideEffects放心大胆的压缩
    "scripts": {
      "serve": "webpack-dev-server --mode development",
      "build": "webpack --mode production"
    },
    "devDependencies": {
      "@babel/core": "^7.11.4",
      "@babel/preset-env": "^7.11.0",
      "babel-loader": "^8.1.0",
      "clean-webpack-plugin": "^3.0.0",
      "copy-webpack-plugin": "^6.0.3",
      "css-loader": "^4.2.2",
      "html-webpack-plugin": "^4.3.0",
      "mini-css-extract-plugin": "^0.10.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "style-loader": "^1.2.1",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0",
      "webpack-merge": "^5.1.2"
    },
    "dependencies": {}
  }
  ```

* npx webpack --mode none
  
  ![sideEffects](../../images/前端模块化/webpack/sideEffects.png)

#### ③ 必要的副作用

并非所有的副作用都应该被移除，有一些必要的副作用需要被保留下来，例如某个模块不需要导出任何成员，只需要实现一些操作

* src/numPad.js
  
  该模块无需导出任何成员，仅仅只是在 Number 的原型上挂载一个 pad 成员函数，用来为数字添加前导零

  ```javascript
  // 为 Number 的原型添加一个扩展方法
  Number.prototype.pad = function (size) {
    const leadingZeros = Array(size + 1).join(0)
    return leadingZeros + this
  }
  ```

* package.json
  
  package.json 文件中如果还标识 `sideEffects=true` 即整个项目的所有代码都没有副作用，打包就会去掉 src/numPad.js 模块，代码运行就会出错，因此此时应该标识 `sideEffects=需要保留副作用的模块路径`

  ```json
  {
    "name": "webpack-front",
    "version": "0.1.0",
    "main": "n/a",
    "author": "yuyuyuzhang",
    "license": "MIT",
    "sideEffects": [
      "./src/numPad.js",
      "*.css"
    ],
    "scripts": {
      "serve": "webpack-dev-server --mode development",
      "build": "webpack --mode production"
    },
    "devDependencies": {
      "@babel/core": "^7.11.4",
      "@babel/preset-env": "^7.11.0",
      "babel-loader": "^8.1.0",
      "clean-webpack-plugin": "^3.0.0",
      "copy-webpack-plugin": "^6.0.3",
      "css-loader": "^4.2.2",
      "html-webpack-plugin": "^4.3.0",
      "mini-css-extract-plugin": "^0.10.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "style-loader": "^1.2.1",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0",
      "webpack-merge": "^5.1.2"
    },
    "dependencies": {}
  }
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_sideEffects_none_numPad')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' }
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      sideEffects: true, //无副作用打包
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  ![sideEffects_numPad](../../images/前端模块化/webpack/sideEffects_numPad.png)

### (3) Code Splitting

Webpack 会将所有代码打包到`一个 bundle.js 文件`中，这会导致打包结果过大，绝大多数情况下，应用程序刚开始运行时，并非所有模块都是必须的，如果所有模块都被打包到一个 bundle.js 文件，即使应用程序一开始只需要一到两个模块工作，也必须将 bundle.js 文件整体加载进来，前端应用程序一般都是运行在浏览器，因此这种情况会浪费大量流量和带宽，可能也会导致浏览器响应速度变慢

合理的方式是将打包结果按照`一定的规则`分离到多个 bundle.js 文件，然后`根据应用程序的运行按需加载`，这样就可以降低启动成本，提高响应速度，Webpack 由此设计了一种代码分包功能 `Code Splitting`，Code Splitting 会把项目中的资源模块按照我们设计的规则打包到不同的 bundle.js 文件

这与 Webpack 将项目中散落的模块打包到一起，从而提高加载效率，并不自相矛盾，只是物极必反，前端应用程序中的资源受环境所限，太大不行，太碎也不行，需要维持在一个`合理的细粒度`，开发环境中划分模块的颗粒度一般都会非常细，很多时候一个模块只是提供一个小工具函数，并不能形成一个完整的功能单元，如果不将这些资源模块打包，直接按照开发过程划分的模块颗粒度加载，那么运行一个很小的功能，就需要加载非常多的资源模块，因此模块打包肯定是必要的，但是当应用程序体积越来越大时，我们也要学会变通

#### ① Webpack 实现代码分包的方式

* **传统的多页面应用程序**：配置多个打包入口，输出多个打包结果
* **现在的单页面应用程序**：配置一个打包入口，结合 `ES6 Modules import()` 函数动态导入特性，按需加载模块

#### ② import()

代码分包的按需加载，指的是在应用程序运行过程中，需要某个资源模块时，才去加载这个模块，Webpack 支持使用 ES6 Modules import() 函数动态导入的方式实现模块的按需加载，而且所有动态导入的模块都会被自动提取到单独的 bundle.js 文件，从而实现分包

* src 下新建 codeSplitting 文件夹，该文件夹下新建 buttonA.js、buttonB.js 文件
  
  ![codeSplitting文件](../../images/前端模块化/webpack/codeSplitting文件.png)
  
  src/codeSplitting/buttonA.js

  ```javascript
  export const Button = () => {
    const button = document.createElement('button')
    button.innerHTML = '按钮-A'
    return button
  }
  ```

  src/codeSplitting/buttonB.js

  ```javascript
  export const Button = () => {
    const button = document.createElement('button')
    button.innerHTML = '按钮-B'
    return button
  }
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

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)

      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)
    })
  }

  // Tree-shaking
  import { Button } from './component.js'
  document.body.appendChild(Button())

  // sideEffects
  // 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
  // index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
  import { Link } from './commons/index.js'
  document.body.appendChild(Link())

  // sideEffects 必要的副作用
  import './numPad.js'
  console.log((8).pad(3))

  // Code-Splitting
  const btn1 = document.createElement('button')
  const btn2 = document.createElement('button')
  btn1.innerHTML = '显示按钮'
  btn2.innerHTML = '显示链接'
  document.body.append(btn1)
  document.body.append(btn2)
  btn1.addEventListener('click', function(e){
    import('./codeSplitting/buttonA.js')
      .then(({Button}) => {
        document.body.append(Button())
      })
  })
  btn2.addEventListener('click', function(e){
    import('./codeSplitting/buttonB.js')
      .then(({Button}) => {
        document.body.appendChild(Button())
      })
  })
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_codeSplitting_none')
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
            loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new CopyWebpackPlugin({ //生产环境上线打包时需要拷贝到输出目录的资源文件目录
        patterns: [
          { from: './public' } 
        ]
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      sideEffects: true, //无副作用打包
    },
    devServer: {
      port: '8081',
      open: true,
      hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
      overlay: {
        errors: true,
        warnings: false
      },
      contentBase: './public'
    }
  }
  module.exports = config
  ```

* npx webpack-dev-server --mode none
  
  ![codeSplitting_import()](../../images/前端模块化/webpack/codeSplitting_import().gif)
  
* npx webpack --mode none
  
  可以看出，多出了 1.bundle.js、2.bundle.js 文件，这两个文件就是由 import() 函数动态导入代码分包产生的，以上就是动态导入在 Webpack 的使用，整个过程无需任何配置，只需要按照 ES6 Modules import() 函数的方式动态导入模块就可以了，Webpack 内部会自动处理分包和按需加载
  
  ![codeSplitting打包](../../images/前端模块化/webpack/codeSplitting打包.png)

## 13. 开发环境和生产环境

### (1) mode

开发环境我们注重的是`开发效率`，生产环境强调的是以更少量、更高效的代码完成业务功能，也就是注重`运行效率`，因此开发环境和生产环境有很大的差异，Webpack 提供了 mode 配置为开发者提供不同模式下的预设配置

* none：原始模式，`不做任何额外处理`，运行最原始的打包
* production ( 默认 )：生产模式，`自动优化打包结果`，启动内置优化插件，打包速度偏慢
* development：开发模式，`自动优化打包速度`，添加一些调试过程中的辅助插件

![mode](../../images/前端模块化/webpack/mode.png)

### (2) 一个配置文件

配置文件中添加判断条件，根据不同环境导出不同配置
  
```javascript
module.exports = (env, argv) => {
  // 不同模式下的公共配置
  const config = {}

  // 开发环境下的特殊配置
  if (env === 'development') {
    config.mode = 'development'
    config.devtool = 'cheap-eval-module-source-map'
  }

  // 生产环境下的特殊配置
  if (env === 'production') {
    config.mode = 'production'
    config.devtool = 'none'
  }

  return config
}
```

### (3) 多个配置文件

一个环境一个配置文件，还有一个公共配置文件

我们需要一个合适的方法来合并公共配置和每个环境的特殊配置，例如插件数组 plugins，需要在公共配置的基础上添加插件，而不是直接覆盖，因此不能使用 `Object.assign()`，社区提供了模块 `webpack-merge` 专门用来合并 Webpack 配置

* `npm i webpack-merge --save-dev`

* webpack.common.js

  ```javascript
  module.exports = {}
  ```

* webpack.dev.js

  ```javascript
  const merge = require('webpack-merge')
  const common = require('./webpack.common')
  module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-module-source-map'
  })
  ```

  webpack.prod.js

  ```javascript
  const merge = require('webpack-merge')
  const common = require('./webpack.common')
  module.exports = merge(common, {
    mode: 'production',
    devtool: 'none'
  })
  ```

### (4) 生产环境下的优化插件

Webpack 4 的生产环境 production 模式下，Webpack 内部开启了很多通用的优化功能，对于开发者而言，开箱即用十分方便，这里主要介绍 production 环境下的几个主要优化功能

#### ① Define Plugin

插件 Define Plugin 用于为代码注入全局成员，例如 `process.env.NODE_ENV`，很多第三方插件都是通过这个全局成员判断当前运行环境，从而决定是否执行例如打印日志之类的操作

#### ② Mini CSS Extract Plugin

CSS 文件一般会使用 style-loader 处理，最终打包结果就是将 CSS 的代码通过 `<style>` 标签嵌套在 JS 代码中

插件 Mini CSS Extract Plugin 可以将 CSS 代码单独打包成 CSS 文件，通过 `<link>` 标签引入到页面

* `npm i mini-css-extract-plugin --save-dev`

#### ③ Optimize CSS Assets Webpack Plugin

插件 Mini CSS Extract Plugin 将 CSS 代码提取到单独的文件，但是有一个小问题，生产环境下 Webpack 内置的压缩插件只会自动压缩 JS 文件，不会压缩 CSS 文件，因此我们需要通过插件 Optimize CSS Assets Webpack Plugin 来压缩 CSS 文件

* `npm i optimize-css-assets-webpack-plugin --save-dev`

### (5) package.json

* **devDependencies**：Node 项目在开发环境下需要的一些前端依赖
* **dependencies**：Node 项目部署上线后代码执行所需要的第三方依赖包

环境变量

环境变量（environment variables）不属于 Node 范畴，是操作系统用于设定执行环境的参数，会在程序运行时传递给应用程序

node 的 process.env 属性返回包含用户环境的对象
Windows 不支持 NODE_ENV=development的设置方式
cross-env：跨平台设置和使用环境变量 npm install cross-env --save-dev

①②③④⑤⑥⑦⑧⑨⑩
