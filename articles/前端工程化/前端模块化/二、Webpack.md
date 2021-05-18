# 二、Webpack

[[_TOC_]]

## 1. Webpack

Webpack 本质上是一个现代 JS 应用程序的静态模块打包器，Webpack 处理应用程序时，会递归地构建一个`依赖关系图`，其中包含应用程序需要的每个模块，然后将所有模块打成一或多个包

### (1) 模块化问题解决

#### ① 模块化的问题

模块化可以更好地解决复杂项目开发过程中的代码组织问题，但随着模块化思想的引入，前端应用又产生了一些新的问题

* ES6 Modules 模块系统本身存在环境兼容性问题，尽管主流浏览器的最新版本都支持，但是无法保证用户的浏览器使用情况
* 模块化方式划分出来的模块文件过多，前端应用运行在浏览器中，每个模块文件都需要从服务器请求，零散的模块文件会导致浏览器频繁发送请求，影响应用的工作效率
* 前端应用开发过程中，不仅仅 JS 文件需要模块化，HTML 和 CSS 这些资源文件也会面临模块化的问题

#### ② Webpack 针对模块化问题的解决方式

* 对于有环境兼容性问题的代码，Webpack 可以在打包过程中通过 babel-loader 对其实现编译转换，然后再进行打包
* 对于零散的 JS 文件，Webpack 可以将其打包到一个 JS 文件中
* 对于不同类型的前端模块，Webpack 支持在 JS 文件中以模块化的方式载入任意类型的资源文件，如在 JS 文件中载入 CSS 文件，就是通过 css-loader、style-loader 将 CSS 文件转换成 `<style>` 标签加载到 JS 文件代码中

### (2) Webpack 打包原理

* 项目结构
  
  ![none](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/none.png)

* `npm install webpack webpack-cli --save-dev`

* webpack.config.js
  
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

  ![none打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/none%E6%89%93%E5%8C%85.png)

* dist_none/bundle.js
  
  VSCode 中折叠代码的快捷键是 `Ctrl + K，Ctrl + 0`，折叠文件方便了解整体结构
  
  整体代码是一个立即执行函数表达式，接收一个 modules 参数，调用时传入了一个参数数组
  
  ![bundle1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/bundle1.png)
  
  展开调用的参数数组，数组有两项，每项是一个函数表达式，一个函数表达式对应源代码中的一个模块，从而让模块具有`函数作用域`
  
  ![bundle2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/bundle2.png)
  
  展开入口的立即执行函数表达式，开始定义一个 `installedModules` 数组用于存放或缓存加载过的模块，紧接着定义一个 `__webpack_require__` 函数用于加载模块，然后就是 `__webpack_require__` 函数上挂载一些工具函数和数据，最后就是调用 `__webpack_require__` 函数开始加载第一个模块
  
  ![bundle3](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/bundle3.png)

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

出口指示 Webpack 在磁盘哪里输出创建的 bundles，如何向`磁盘`写入编译文件，以及如何命名这些文件

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

loader 机制是为了完成项目中各种类型资源模块的加载，从而实现项目的整体模块化

### (1) 加载 CSS

* `npm install css-loader --save-dev`
* `npm install style-loader --save-dev`
* src/style.css
  
  ```css
  body {
    color: red;
  }
  ```

* src/index.js
  
  使用 ES6 Modules import 语法直接导入 CSS 文件

  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源
  import './style.css'
  ```

* webpack.config.js

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
          test: /\.css$/, //正则匹配文件路径
          use: [          //指定具体的loader
            'css-loader',
            'style-loader'
          ]
        }
      ]
    }
  };
  module.exports = config;
  ```

* npx webpack
  
  由下图可知，CSS 文件并没有单独打包，而是被一起打包到 bundle.js 文件

  ![css_style_loader打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/css_style_loader%E6%89%93%E5%8C%85.png)
  
  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果

  ![css_style_loader效果](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/css_style_loader%E6%95%88%E6%9E%9C.png)

* dist_css_style_loader/bundle.js

  阅读以下代码可知，css-loader 原理就是`将 CSS 模块转换为 JS 模块`，具体实现方式是将 CSS 代码 push 到一个数组中，数组是由 css-loader 内部一个模块提供的，`css-loader 只是将 CSS 模块加载到 JS 代码中，但并没有使用这个模块`

  ![css_loader_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/css_loader_bundle.png)

  style-loader 的作用就是将 css-loader 转换后的结果通过 `<style>` 标签追加到页面
  
  ![style_loader_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/style_loader_bundle.png)

### (2) 加载图片

* npm install url-loader --save-dev
* npm install file-loader --save-dev
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
            }
          }
        },
      ]
    }
  }
  module.exports = config
  ```

* npx webpack

  图片文件 cat.jpg 大小为 `15.7KB`，未超过设置的 20KB，因此 url-loader 将字体文件转换成 `base64 格式编码的 DataURL`，一起打包到 JS 文件
  
  ![url_loader_img打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_img%E6%89%93%E5%8C%85.png)
  
  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果
  
  ![url_loader_img](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_img.png)

* dist_url_loader_img/bundle.js
  
  由以下代码可知，url-loader 将图片转换成 `base64 格式编码的 DataURL`，加载到 JS 文件代码中，因此项目部署上线后，只需要向服务器请求 JS 文件，无需再单独请求图片文件
  
  ![url_loader_img_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_img_bundle.png)

### (3) 加载字体

* 下载字体文件
  
  ![font_TJS](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/font_TJS.png)

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
          test: /\.css$/, //正则匹配文件路径
          use: [ //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
            }
          }
        },
      ]
    }
  }
  module.exports = config
  ```

* npx webpack
  
  字体文件 TJS.ttf 大小为 `15MB`，超过设置的 20KB，因此 url-loader 将字体文件交给 file-loader，file-loader 将字体文件拷贝到指定输出目录，然后修改打包后的 JS 文件的引用路径
  
  ![url_loader_font打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_font%E6%89%93%E5%8C%85.png)

  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果
  
  ![url_loader_font](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_font.png)
  
* dist_url_loader_font/bundle.js
  
  ![url_loader_font_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_font_bundle.png)

### (4) 加载多媒体

* 下载一个视频
  
  ![font_TJS](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/font_TJS.png)

* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from './movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)
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
      path: path.join(__dirname, 'dist_url_loader_media')
    },
    module: {
      rules: [
        {
          test: /\.css$/, //正则匹配文件路径
          use: [ //指定具体的loader,一组链式loader按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
              publicPath: './'
            }
          }
        },
      ]
    }
  }
  module.exports = config
  ```

* npx webpack
  
  视频文件 movie.mp4 大小为 `311KB`，超过设置的 20KB，因此 url-loader 将视频文件交给 file-loader，file-loader 将视频文件拷贝到指定输出目录，然后修改打包后的 JS 文件的引用路径
  
  ![url_loader_media打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_media%E6%89%93%E5%8C%85.png)

  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果
  
  ![url_loader_media](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_media.png)

* dist_url_loader_media/bundle.js
  
  ![url_loader_media_bundle1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_media_bundle1.png)

  ![url_loader_media_bundle2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/url_loader_media_bundle2.png)

### (5) loader 的特性

#### ① loader 支持链式传递
  
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

* **最后返回 JS 代码**：loader 的原理是`在 JS 中加载其他资源`，因此一组链式 loader 中`最终 loader` 的返回结果必须是 `JS 代码`
  
  ![链式loader](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E9%93%BE%E5%BC%8Floader.png)

#### ② loader 支持同步和异步

![loader分类](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/loader%E5%88%86%E7%B1%BB.jpg)

**Node 环境**：Node 使用的是 chrome V8 JS 引擎，因此 `Node 环境只有一个 JS 引擎线程`，Webpack 就是工作在 Node 环境

**同步 loader**：同步 loader 指的是同步返回转换后的内容，因此同步 loader 的转换过程会阻塞 Webpack 整个构建，构建缓慢不适用于耗时较长的情况，同步 loader 适用于计算量小、速度快的情况

**异步 loader**：异步 loader 指的是异步返回转换后的内容，因此异步 loader 不会阻塞 Webpack 整个构建，异步 loader 适用于计算量大、耗时长的情况（例如网络请求）

### (6) loader 的作用

#### ① 加载任意类型资源文件
  
Webpack 本身是 JS 模块打包器，自身只能理解 JS，默认只能按照 JS 的语法加载模块，Webpack 使用加载器 `loader` 来加载模块，而 Webpack 内部默认的 loader 只能加载 JS 模块，因此如果需要加载其他类型的资源模块，就需要配置不同的 loader

Webpack 规定 loader 导出一个`函数`，这个函数就是对资源的处理过程，函数的输入是加载的资源文件内容，函数的输出是处理后的结果，`loader 的原理是在 JS 文件代码中加载其他类型资源`，而 loader 支持链式传递，因此`一组链式 loader 的最后一个必须返回 JS 代码`

![loader](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/loader.png)

#### ② 便于开发者维护

Webpack 的设计哲学是`真正需要引用资源的并不是整个应用，而是你正在编写的 JS 代码`
  
假设我们在开发某个页面上的局部功能时，需要用到一个 CSS 文件和一个图片文件，如果还是将资源引用到 HTML 文件然后在 JS 文件中添加需要的逻辑代码，那么后期如果这个局部功能不需要了，我们就需要同时删除 HTML 中的资源引用和 JS 中的逻辑代码，也就是说需要同时维护两条线，但是如果遵循 Webpack 的设计哲学，所有资源的加载都是由 JS 代码控制，后期只需要维护 JS 代码这一条线

#### ③ 减少网络请求
  
正常情况下，项目部署上线后，CSS 文件、图片文件、字体文件、多媒体文件等静态资源都是需要向服务器请求的

而使用 Webpack 打包后的项目，CSS 文件被 css-loader、style-loader 转换成 `<style>` 标签加载到 JS 文件代码中，图片文件、字体文件、多媒体文件等，文件大小若小于 limit 参数，都被 url-loader 转换成 `base64` 格式编码加载到 JS 文件代码中，这些静态资源都不再需要单独向服务器请求了，只要请求到了 JS 文件，这些资源就都存在，因此能够显著减少网络请求

* **style-loader**：将 CSS 文件转换成 `<style>` 标签
* **url-loader**：url-loader 包含 file-loader，url-loader 工作分两种情况
  * **文件大小小于 limit 参数**：url-loader 将资源文件转换成 `base64 格式编码的 DataURL`
  * **文件大小大于 limit 参数**：url-loader 调用`内置 file-loader`，file-loader 根据配置将资源文件`拷贝至输出目录`，再修改打包后 JS 文件引用路径，使之指向拷贝后的资源文件，这种情况下，项目部署上线后，就需要向服务器请求资源文件

### (7) 开发一个 loader

需求是开发一个可以加载 markdown 文件的 loader，以便在代码中可以直接导入 .md 文件，.md 文件一般是需要转换成 HTML 之后再呈现到页面上的，因此 markdown-loader 的工作原理是`接收 .md 文件，转换成 HTML 字符串，再拼接成 JS 代码`

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
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
              publicPath: './'
            }
          }
        },
        {
          test: /\.md$/,
          use: './rustom/sync-markdown-loader.js' //use属性既可以使用模块名称,也可以使用模块路径
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
  import movie from './movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'
  ```

* npx webpack

  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果
  
  ![sync_md_loader](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/sync_md_loader.png)

* dist_sync_md_loader/bundle.js

  ![sync_md_loader_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/sync_md_loader_bundle.png)

#### ② 异步 markdown-loader

* async-markdown-loader.js
  
  ```javascript
  // 导出一个处理函数
  module.exports = function(source){
    console.log(source)

    // 获取 callback() 函数（箭头函数取不到 this），通过 Webpack 异步返回
    const cb = this.async()

    new Promise(resolve => {
      setTimeout(() => {
        resolve("console.log('<h1>hello async-markdown-loader</h1>')")
      }, 3000);
    }).then(res => {
      // 必须返回 JS 代码
      cb(null, res)
    })
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
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
              publicPath: './'
            }
          }
        },
        {
          test: /\.md$/,
          use: './rustom/async-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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

  // 导入其他类型资源 ( 多媒体 )
  const video = document.createElement('video')
  video.src = "./movie.mp4"
  document.append(video)

  // 导入 .md 文件
  import title from './title.md'
  ```

* npx webpack

  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果
  
  ![async_md_loader](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/async_md_loader.png)

* dist_async_md_loader/bundle.js

  ![async_md_loader_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/async_md_loader_bundle.png)

## 7. 插件 plugins

loader 机制是为了完成项目中各种类型资源模块的加载，从而实现项目的整体模块化

plugin 机制是为了解决项目中除资源模块打包以外的其他自动化工作，因此 plugin 的能力范围更广用途更多，`plugin 是一个具有 apply 方法的 JS 对象`，apply 方法会被 webpack `compiler` 调用，并且在整个编译生命周期都可以访问 compiler 对象

* 打包之前自动清除 dist 目录
* 打包时自动生成使用打包结果的 HTML 文件到 dist 目录
* 打包时将`无需 file-loader 处理的`资源文件拷贝到输出目录（一般放在 static 文件夹），绝大多数情况下都使用 file-loader 而非 copyWebpackPlugin
* 压缩打包后输出的文件

### (1) clean-webpack-plugin

Webpack 每次打包的结果都是直接覆盖到 dist 目录，因此打包之前 dist 目录就可能存在上次打包遗留的文件，再次打包时只能覆盖同名文件，故而已经移除的资源文件就会一直积累在里面，导致部署上线时出现多余文件，这显然非常不合理

clean-webpack-plugin 插件就是在每次打包之前，清除 dist 目录

* `npm install clean-webpack-plugin --save-dev`
* webpack.config.js
  
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
      path: path.join(__dirname, 'dist_clean_plugin')
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
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new CleanWebpackPlugin(), //clean-webpack-plugin插件
    ]
  }
  module.exports = config
  ```

* npx webpack

  ![clean_plugin打包1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/clean_plugin%E6%89%93%E5%8C%851.png) ![clean_plugin打包2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/clean_plugin%E6%89%93%E5%8C%852.png)

  index.html 文件中使用打包后的 bundle.js 文件，控制台打开 index.html 文件，查看效果
  
  ![clean_plugin](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/clean_plugin.png)

### (2) html-webpack-plugin

HTML 文件一般是单独存放在项目根目录下，这回导致以下两个问题

* 项目发布时需要同时发布项目根目录下的 HTML 文件和 dist 目录下的打包结果，并且需要修改 HTML 文件下的引用为打包后的 bundle.js 文件
* 打包结果输出的目录或者文件名改变，需要手动修改 HTML 文件中对应的 script 标签 ( 其他类型资源文件都通过 loader 加载到 JS 文件代码中 )

html-webpack-plugin 插件能够在 Webpack 打包的同时，自动生成使用打包结果的 HTML 文件到 dist 目录，让 HTML 文件也参与到整个项目的构建过程

* 项目发布时只需要发布 dist 目录
* 新生成的 HTML 文件中 script 标签是自动引入的，因此可以确保 JS 文件的路径和名称正确

html-webpack-plugin 插件的使用如下

* `npm install html-webpack-plugin --save-dev`
* webpack.config.js
  
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
      path: path.join(__dirname, 'dist_html_plugin')
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
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
    ]
  }
  module.exports = config
  ```

* npx webpack
  
  ![html_plugin打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/html_plugin%E6%89%93%E5%8C%85.png)

* dist_html_plugin/index.html

  ![html_plugin_html](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/html_plugin_html.png)

### (3) plugin 机制

#### ① 钩子机制

Webpack 的 plugin 机制就是软件开发中常见的`钩子机制`，钩子机制类似于 `DOM 的事件`，`钩子函数`类似于 `DOM 的事件回调函数`

Webpack 的整个工作过程会有很多环节，为了便于插件的扩展，Webpack 几乎在每个环节都埋下了一个钩子，这样开发 plugin 时就可以通过往这些不同钩子上挂载不同的钩子函数，实现扩展 Webpack 的能力

![钩子机制](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E9%92%A9%E5%AD%90%E6%9C%BA%E5%88%B6.gif)

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

### (4) 开发一个 plugin

需求是开发一个打包时能够自动清除注释的插件，这样 bundle.js 文件将更易阅读

![comments](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/comments.png)

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
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_comments_plugin')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new RemoveCommentsPlugin()
    ]
  }
  module.exports = config
  ```

* npx webpack
  
  ![comments_plugin打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/comments_plugin%E6%89%93%E5%8C%85.png)

* dist_comments_plugin/bundle.js

  ![comments_plugin_bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/comments_plugin_bundle.png)

## 8. Webpack 工作机制

### (1) 打包流程

前端项目中散落着各种各样的代码和资源文件，例如 JS、CSS、图片、字体等等，这些文件在 Webpack 中都属于当前项目的一个模块，Webpack 通过打包将它们聚集在一起

* loader 机制处理除 JS 以外其他类型资源的加载，例如 CSS、图片等
* plugin 机制实现各种自动化的构建任务，例如自动压缩、自动发布等

Webpack 启动后，根据配置找到项目中的指定入口文件，然后顺着文件的代码，根据代码中出现的 `import、require` 之类的语句，解析推断出这个文件依赖的模块资源，然后再分别去解析每个资源模块的依赖，周而复始，最终形成整个项目中所有用到的文件的依赖关系树

![依赖关系树](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB%E6%A0%91.gif)

Webpack 遍历整个依赖关系树，找到每个节点对应的资源文件，然后根据配置文件中的 loader 配置，交给对应的 loader 去加载这个模块，最后将加载的结果放入 bundle.js 文件

对于无法通过 JS 代码表示的资源文件，例如图片、字体，对应的 loader 会将其单独作为资源拷贝到输出目录，然后将这个资源文件的访问路径作为这个模块的导出成员暴露给外部

![打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E6%89%93%E5%8C%85.gif)

### (2) 关键环节

Webpack 构建是一个`串行`的过程

* 初始化参数：从配置文件和 Shell 语句中读取并合并参数，得出最终的参数
* 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
* 确定入口：根据配置中的 entry 找出所有的入口文件
* 编译模块：从入口文件出发，调用所有配置的 Loader 加载模块，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
* 完成模块编译：使用 Loader 加载完所有模块后，得到了每个模块处理后的最终内容以及它们之间的依赖关系树
* 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
* 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

#### ① Webpack Cli

从 Webpack 4 开始 Cli 部分被单独抽象到了 webpack-cli 模块，目的是为了增强 Webpack 本身的灵活性

webpack-cli 的作用就是将 CLI 参数（运行 webpack 命令时通过命令行传入的参数，例如 --mode=production）和 Webpack 配置文件中的配置整合，得到一个完整的配置对象

node_modules/webpack-cli/cli.js

![cli](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/cli.png)

调用 bin/utils/convert-argv.js 模块，将得到的命令行参数转换为 Webpack 的配置选项对象

![调用convert-argv](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E8%B0%83%E7%94%A8convert-argv.png)

convert-argv.js 工作过程中，首先判断命令行参数中是否指定了具体的配置文件路径，如果指定了就加载指定配置文件，否则就需要根据默认配置文件加载规则找到配置文件

node_modules/webpack-cli/utils/convert-argv.js

![convert-argv](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/convert-argv.png)

找到配置文件后，将 CLI 参数中的配置和配置文件中的配置合并，最终得到一个完整的配置选项，有了配置选项，就开始载入 Webpack 核心模块，创建 Compiler 实例，Compiler 实例负责完成整个项目的构建工作，是 Webpack 工作过程中最核心的对象

![Compiler实例](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/Compiler%E5%AE%9E%E4%BE%8B.png)

#### ② 创建 Compiler 实例

随着 Webpack-cli 载入 Webpack 核心模块，整个执行过程就到了 Webpack 模块，webpack.js 文件导出一个用于创建 Compiler 实例的函数，

node_modules/webpack/lib/webpack.js

![webpack](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/webpack.png)

导出函数中首先判断参数 options，options 既可以是对象也可以是数组，配置数组中的每个成员都是一个独立的配置选项，Webpack 既支持`单线打包`也支持`多路打包`

![多路打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E5%A4%9A%E8%B7%AF%E6%89%93%E5%8C%85.png)

顺着单线打包往下看，创建 Compiler 实例后，Webpack 就开始注册配置的每个插件，再往后 Webpack 工作过程的生命周期就要开始了，所以必须先注册，这样才能确保插件中的钩子函数都能挂载到指定钩子上

![注册插件](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E6%B3%A8%E5%86%8C%E6%8F%92%E4%BB%B6.png)

#### ③ 开始构建

完成 Compiler 实例的创建后，再次进入 webpack-cli 模块，开始判断配置选项中是否启用了监视模式

* 如果是监视模式就调用 Compiler 实例的 watch 方法，以监视模式启动构建，但这不是我们主要关心的主线
* 如果不是监视模式就调用 Compiler 实例的 run 方法，开始构建整个应用

node_modules/webpack-cli/cli.js

![判断监视模式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E5%88%A4%E6%96%AD%E7%9B%91%E8%A7%86%E6%A8%A1%E5%BC%8F.png)

Compiler.run() 方法定义在 Compiler 类上，具体文件在 node_modules/webpack/lib/Compiler.js，run() 方法内部先后触发了 beforeRun、run 两个钩子，最关键的是调用了 this.compile() 方法，正式开始编译整个项目

![Compiler.run](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/Compiler.run.png)

再往下看，找到 Compiler.compile() 方法，compile() 方法内部先后触发了 beforeCompile、compile、make、afterCompile 四个钩子，最主要的是创建了一个 compilation 实例，compilation 可以理解为一次构建过程中的上下文对象，里面包含了这次构建的全部资源和信息

![Compiler.compile](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/Compiler.compile.png)

#### ④ make 阶段

随着 Compiler.compile() 方法内触发 make 钩子，由此进入了 make 阶段，make 阶段的主要目标就是：根据 entry 配置找到入口模块，开始依次递归遍历出所有依赖，形成依赖关系树，然后将每个模块交给对应的 loader 处理

触发 make 钩子之后就开始执行所有同步和异步 make 钩子函数，VSCode 搜索 make.tap，找到所有注册的 make 钩子函数

![make钩子函数](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/make%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0.png)

* SingleEntryPlugin.js 插件中调用了 Compilation 对象的 addEntry 方法，开始解析入口
* addEntry 方法中又调用了 _addModuleChain 方法，将入口模块添加到模块依赖列表中
* 紧接着通过 Compilation 对象的 buildModule 方法进行模块构建
* buildModule 方法中执行具体的 Loader，处理特殊资源加载
* build 完成过后，通过 acorn 库生成模块代码的 AST 语法树
* 根据语法树分析这个模块是否还有依赖的模块，如果有则继续循环 build 每个依赖
* 所有依赖解析完成，build 阶段结束
* 最后合并生成需要输出的 bundle.js 写入 dist 目录

## 9. Webpack devServer

编写源代码 - Webpack 打包 - 运行应用程序 - 浏览器查看，这种周而复始的开发方式过于原始，开发效率十分低下

Webpack devServer 是 Webpack 官方推出的一款开发工具，提供了一个 Web 服务器，并且将自动打包、自动刷新浏览器等一系列对开发友好的功能全部集成到了一起

### (1) webpack devServer

* `npm install webpack-dev-server --save-dev`
* webpack.config.js
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
              publicPath: './'
            }
          }
        },
        {
          test: /\.md$/,
          use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
        },
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

  ![webpack-dev-server流程](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/webpack-dev-server%E6%B5%81%E7%A8%8B.png)

  Webpack-dev-server 为了提高工作效率，并没有将打包结果写入磁盘，不会产生 dist 文件夹，而是暂时存放在`内存`，内部的 Web 服务器也是从内存中读取文件的，这样可以减少很多不必要的磁盘操作，大大提高整体的构建效率

  ![webpack-dev-server内存](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/webpack-dev-server%E5%86%85%E5%AD%98.png)

  ![devServer预览](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/devServer%E9%A2%84%E8%A7%88.png)

* src/index.js
  
  修改文件代码，新增 `console.log(111)`
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 新增代码
  console.log(111)
  ```

  查看浏览器，效果自动更新

  ![devServer预览更新](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/devServer%E9%A2%84%E8%A7%88%E6%9B%B4%E6%96%B0.png)

### (2) proxy 代理

webpack-dev-server 是一个本地 Web 服务器，所以开发阶段前端应用程序独立运行于前端人员电脑的 localhost 的一个端口上，后端应用程序运行于后端人员的电脑上，因此前后端是`跨域`的，而最终上线后，前端应用程序和后端应用程序一般会部署到同一个服务器的同一个 IP 地址的不同端口上，也是`跨域`的

解决`开发阶段`跨域请求的最好办法，就是在本地 Web 服务器中配置一个后端 API 的代理服务，具体方法是在配置文件 webpack.config.js 的 devServer 属性，添加一个 `proxy` 属性

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

Webpack 将开发阶段编写的源代码打包成客户端浏览器实际运行的代码，也就意味着实际运行的代码和真正编写的代码之间存在很大的差异（`loader、压缩`），这种情况下，打包后应用程序运行过程中出现意料之外的错误，将无从下手，因为只能在浏览器控制台看到错误信息定位在打包后的代码中的位置，而无法直接定位到源代码的位置

### (1) SourceMap

源代码地图 SourceMap 就是解决此类问题的最好办法，`SourceMap 文件就是源代码和打包后代码的映射关系表`，打包后的代码通过 SourceMap 文件就可以逆向解析得到源代码

![SourceMap](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/SourceMap.png)

目前很多第三方库都会在发布的文件中同时提供一个 `.map` 后缀的 SourceMap 文件，这是一个 `JSON 格式`的文件，记录了转换前后代码的映射关系，主要存在以下几个属性

* **version**：使用的 SourceMap 标准版本
* **sources**：转换前的源文件名称
* **names**：源代码中使用的一些成员名称
* **mappings**： base64-VLQ 编码字符串，记录转换后代码的字符与转换前代码的字符之间的映射关系

### (2) jquery SourceMap

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

### (3) Webpack 配置 SourceMap

使用 Webpack 打包时，同样支持为打包结果生成 SourceMap，并且还支持几种不同的 SourceMap 机制，配置文件 webpack.config.js 有一个 devtool 属性，专门为 webpack-dev-server 提供配置

* **开发环境**：无论是 Vue 项目还是 React 项目，loader 转换前后代码差别很大，而开发者一般是需要`调试 loader 转换前的代码`，一般情况下错误`定位到行`就够了，省略列信息可以提升构建速度，因此推荐 `cheap-module-eval-source-map` 模式
* **生产环境**：SourceMap 会暴露源代码到生产环境，如果没有控制 SourceMap 文件的访问权限，但凡有点技术的人都很容易复原项目中绝大多数源码，这非常不安全也不合理，因此建议选择 `none` 模式

![source_map模式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/source_map%E6%A8%A1%E5%BC%8F.png)

以下以开发环境为例

* src/index.js
  
  文件增加一行运行时错误代码
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 运行时错误
  console.log111('index.js running')
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_cheap_module_eval_source_map')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new RemoveCommentsPlugin()
    ],
    devServer: {
      port: '8081',
      open: true,
      overlay: {errors: true, warnings: false},
    },
    devtool: 'cheap-module-eval-source-map'
  }
  module.exports = config
  ```

* npx webpack-dev-server

  ![cheap_module_eval_source_map报错](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/cheap_module_eval_source_map%E6%8A%A5%E9%94%99.png)

  ![cheap_module_eval_source_map效果](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/cheap_module_eval_source_map%E6%95%88%E6%9E%9C.png)

## 11. 模块热替换 HMR

### (1) 浏览器的热更新

浏览器的热更新指的是本地开发的同时打开浏览器进行预览，当代码文件发生变化时，`浏览器自动更新页面内容`的技术，有以下 2 种更新方式

* 自动刷新整个页面
* 页面整体无刷新而自动更新页面的部分内容

#### ① 保存后自动编译（Auto Compile）— watch 模式

Webpack 的 `watch 模式`在`打包后并未退出当前 node 进程`，而是继续监控源文件内容是否发生变化，当源文件内容发生变更后自动再次执行该流程实现自动编译，直到用户主动退出

**缺陷**：通过 watch 模式，开发者无需每次手动执行打包，但问题并未解决，在浏览器预览时我们仍然需要`手动刷新页面`后才能看到变更后的效果

* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)
  ```

* webpack.config.js
  
  watch 模式下需要配置 CleanWebpackPlugin 插件，避免改变代码后重新打包丢失 index.html 文件
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    watch: true, //开启watch模式
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_watch')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false //避免watch模式下重新打包会丢失index.html文件,devServer修复
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html', //文件名
        title: 'Webpack',       //title属性
        meta: {                 //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new RemoveCommentsPlugin()
    ],
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack
  
  ![watch_before](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/watch_before.png)
  
* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // 测试 watch 模式
  console.log('watch 模式')
  ```

* 手动刷新浏览器
  
  ![watch_after](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/watch_after.png)

#### ② 自动刷新浏览器（Live Reload）— devServer 服务器

Webpack 的 `devServer` 服务器就是一种 `WebSocket` 通信机制，用来连接`浏览器预览页面`与`本地监控代码变更的 node 进程`，实现本地代码变更后的浏览器自动刷新，Webpack devServer 里 `watch 模式默认开启`，本地代码变更时，将变更内容推送到浏览器

**缺陷**：但是 devServer 自动刷新页面会`丢失页面的操作状态`

* src/index.js
  
  文件添加 textarea 输入框
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)
  ```

* src/style.css
  
  ```css
  @font-face {
    font-family: 'myFont';
    src: url('../public/TJS.ttf');
  }
  body {
    color: red;
    background: url('../public/cat.jpg');
    font-family: 'myFont'
  }
  textarea {
    color: green;
  }
  ```

* webpack.config.js
  
  ```javascript
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_no_HMR')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new RemoveCommentsPlugin()
    ],
    devServer: {
      port: '8081',
      open: true,
      overlay: { errors: true, warnings: false },
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack-dev-server
* 浏览器页面上 textarea 输入框输入 ddddd...
* src/style.css
  
  修改文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下
  
  ```css
  @font-face {
    font-family: 'myFont';
    src: url('../public/TJS.ttf');
  }
  body {
    color: red;
    background: url('../public/cat.jpg');
    font-family: 'myFont'
  }
  textarea {
    color: blue;
  }
  ```

  ![HMR_no](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR_no.png)

#### ③ 模块热替换（Hot Module Replacement，HMR）— HMR

Webpack 的 `HMR` 就是为了解决 devServer 页面刷新导致的状态丢失问题

### (2) HMR 应用

HMR 指的是在`应用程序运行过程`中，开发者修改了某个模块的代码，Webpack 实时替换掉这个修改的模块，而无需完全刷新整个应用，那么应用的运行状态就不会因此而改变

#### ① HMR 的特性

* 只更新变更内容，以节省开发时间
* 调整样式更加快速，几乎相当于在浏览器调试器中更改样式
* 保留应用程序状态

#### ② HMR 的 CSS 应用

* webpack.config.js 文件配置 HMR 需要配置两处地方
  * devServer `hot` 属性设置为 true
  * 导入 webpack 模块，再通过 webpack 模块加载 `HotModuleReplacementPlugin` 插件
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
    ],
    devServer: {
      port: '8081',
      open: true,
      hot: true, //HMR
      overlay: { errors: true, warnings: false },
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack-dev-server
* 浏览器页面上 textarea 输入框输入 ddddd...
* src/style.css
  
  修改文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下
  
  ```css
  @font-face {
    font-family: 'myFont';
    src: url('../public/TJS.ttf');
  }
  body {
    color: red;
    background: url('../public/cat.jpg');
    font-family: 'myFont'
  }
  textarea {
    color: blue; /* 修改之前为 green */
  }
  ```

  ![HMR_css](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR_css.png)

#### ③ HMR 的 JS 应用

* 浏览器页面上 textarea 输入框输入 ddddd...
* src/head.js
  
  修改文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下
  
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

  ![HMR_js](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR_js.png)

* 观察得知，CSS 文件 HMR 没有问题，这是因为 CSS 文件 HMR 只需要将更新后的 CSS 代码及时替换到页面中就可以覆盖掉之前的样式从而实现更新，而 CSS 文件会经过 css-loader、style-loader 处理，`style-loader` 中会自动处理 CSS 文件的热替换，无需开发者操心
  
  查看 style-loader 与模块热替换相关的代码

  ```javascript
  // 为了清晰起见将模块名称注释以及与热更新无关的逻辑省略，并将 css 内容模块路径赋值为变量 cssContentPath 以便多处引用
  var cssContentPath = "./node_modules/css-loader/dist/cjs.js!./src/style.css"
  var content = __webpack_require__(cssContentPath);
  // 将样式注入新生成的 style 标签
  var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")
  ...
  var update = api(content, options);
  ...
  module.hot.accept(
    cssContentPath,
    function(){
      content = __webpack_require__(cssContentPath);
      ...
      update(content); // 将新的样式内容更新到原 style 标签
    }
  )
  module.hot.dispose(function() {
    update(); // 移除注入的 style 标签
  });
  ```

* 观察得知，JS 文件 HMR 会回退到`自动刷新页面`，这是因为开发者编写的 JS 文件是没有任何规律的，导出的可能是一个对象/字符串/函数，使用时也各不相同，Webpack 面对这些毫无规律的 JS 文件，无法实现一个通用所有情况的 HMR 方案
* 因此 JS 文件要实现 HMR 需要`开发者调用插件 HotModuleReplacementPlugin API 手动处理`

#### ④ HMR 的 JS 处理函数

上面提到的配置 HMR 所需的 `HotModuleReplacementPlugin` 插件为开发者提供了一套用于处理 JS 文件 HMR 的通用 API，由此开发者可以在 JS 文件中通过 API 手动处理模块更新后的热替换

开启 HMR 开发者就可以访问到`全局对象 module 的 hot 属性`，hot 属性提供了一个 `accept 方法`用于注册某个模块更新后的处理函数，第一个参数时监视的依赖模块路径，第二个参数是依赖模块更新后的处理函数

* src.index.js
  
  文件中编写 head.js 模块的 HMR 处理函数
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

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
* src/head.js
  
  修改文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下

  ![HMR_js_accept](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR_js_accept.png)

#### ⑤ hotOnly

如果 HMR 的处理函数中发生错误则会导致 HMR 失败，HMR 失败则会自动`回退到自动刷新页面`，页面一旦自动刷新，控制台报错信息也会被清除，因此这种情况下的错误很难被发现也不容易定位

* src/index.js
  
  文件中的 head.js 模块的 HMR 处理函数添加一个运行时错误
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

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
* src/head.js
  
  修改文件代码，Ctrl + S 保存文件，观察浏览器页面变化如下，这是因为如果 HMR 的处理函数中发生错误则会导致 HMR 失败，HMR 失败则会自动`回退到自动刷新页面`，页面一旦自动刷新，控制台报错信息也会被清除

  ![HMR_js_error](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR_js_error.png)

* 这种情况可以将配置文件 webpack.config.js 的 devServer 属性的 `hotOnly` 配置为 true 来解决，不再使用 hot 配置，因为 hot 配置 HMR 失败会回退到自动刷新页面，而 hotOnly 配置不会
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_HMR_hotOnly')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new webpack.HotModuleReplacementPlugin() //HMR特性必需的插件
    ],
    devServer: {
      port: '8081',
      open: true,
      hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
      overlay: { errors: true, warnings: false },
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* 操作同上
  
  ![HMR_js_hotOnly](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR_js_hotOnly.png)

### (3) HMR 原理

Webpack HMR 完整功能主要包含了 3 方面的技术

* watch 模式：对本地源代码文件变更的监控 node 进程
* devServer 服务器：浏览器预览页面与本地服务器的 `WebSocket 通信`，本地代码变更时，将变更内容推送到浏览器
* HMR 功能：模块解析与替换

![HMR原理](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/HMR%E5%8E%9F%E7%90%86.png)

* 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 `JS 对象`保存在内存
* 第二步是 webpack devServer 和 webpack 之间的接口交互，而在这一步，主要是 devServer 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API 对代码变化进行监控，并且告诉 webpack 将代码打包到内存
* 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包，当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload，注意，这儿是浏览器刷新，和 HMR 是两个概念
* 第四步也是 webpack devServer 代码的工作，该步骤主要是通过 sockjs（webpack devServer 的依赖）在浏览器端和服务端之间建立一个 `websocket 长连接`，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息，浏览器端根据这些 socket 消息进行不同的操作，当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换
* webpack devServer/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/devServer 的工作就是根据 webpack devServer/client 传给它的信息以及 devServer 的配置决定是刷新浏览器还是进行模块热更新，如果仅仅是刷新浏览器，也就没有后面那些步骤了
* HotModuleReplacement.runtime 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码，这就是上图中 7、8、9 步骤
* 而第十步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用
* 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码

### (4) 路由懒加载导致 HMR 慢

Webpack 4 更好地利用缓存提高了编译速度，但是当项目中`路由懒加载`的页面多了之后 （50+），模块热替换慢的问题会很明显

babel plugins 的 `babel-plugin-dynamic-import-node` 只做一件事，将所有的 import() 转换为 require()，这样就可以用插件将所有异步组件都用同步的方式引入，并结合 `BABEL_ENV` 这个 bebel 环境变量，让它只作用于`开发环境`下

* `npm install babel-plugin-dynamic-import-node --save-dev`
* package.json
  
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
      "serve": "BABEL_ENV=development webpack-dev-server --mode development", //添加环境变量BABEL_ENV
      "build": "webpack --mode production"
    },
    "devDependencies": {
      "@babel/core": "^7.11.4",
      "@babel/preset-env": "^7.11.0",
      "babel-loader": "^8.1.0",
      "babel-plugin-dynamic-import-node": "^2.3.3",
      "clean-webpack-plugin": "^3.0.0",
      "copy-webpack-plugin": "^6.0.3",
      "css-loader": "^4.2.2",
      "file-loader": "^6.0.0",
      "html-webpack-plugin": "^4.3.0",
      "mini-css-extract-plugin": "^0.10.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "style-loader": "^1.2.1",
      "url-loader": "^4.1.0",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0",
      "webpack-merge": "^5.1.2"
    },
    "dependencies": {}
  }
  ```

* .babelrc
  
  ```babelrc
  {
    "presets": [
      ["env", {
          "modules": false,
          "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }
      ],
      "stage-2"
    ],
    "plugins": ["transform-runtime"],
    "env": {
      "development": {
        "plugins": ["dynamic-import-node"]
      }
    }
  }
  ```

* 之后就可以像平时一样写路由懒加载
  
  ```javascript
  { path: '/login', component: () => import('@/views/login/index')}
  ```

## 12. Webpack 编译阶段优化

### (1) 减少执行编译的模块

#### ① 剔除类库中无需构建的模块

有的第三方库，除了项目所需的模块内容外，还会附带一些多余的模块

例如 moment 库主要是对时间进行格式化，并且支持多国语言，一般在项目中只需要引入本国语言包，但是 Webpack 构建时会自动引入 locale 目录下的所有多国语言包

Webpack 插件 `IgnorePlugin` 可以在编译时`忽略指定目录`，从而提升构建速度，减少产物体积

配置 IngorePlugin 插件前

* `npm install moment --save-dev`

* index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // 测试 watch 模式
  // console.log('watch 模式')

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)
      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)

      // 运行时错误
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)
  ```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_no_ingorePlugin')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提供构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
    ],
    devServer: {
      port: '8081',
      open: true,
      hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
      overlay: { errors: true, warnings: false },
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack
  
  ![no_ingorePlugin](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/no_ingorePlugin.png)

配置 IngorePlugin 插件后

* index.js
  
  按照上述配置 Webpack 构建时忽略了包含 ./locale 字段的目录，但也导致使用时不能显示中文语言，因此需要手动引入
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // 测试 watch 模式
  // console.log('watch 模式')

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)
      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)

      // 运行时错误
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)
  ```

* webpack.config.js

  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_ingorePlugin')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提供构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
      new webpack.IgnorePlugin({ //构建时忽略指定目录
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],
    devServer: {
      port: '8081',
      open: true,
      hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
      overlay: { errors: true, warnings: false },
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack
  
  ![ingorePlugin](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/ingorePlugin.png)

#### ② 按需引入类库模块内的导出

按需引入类库模块适用于工具类库性质的依赖包的优化

例如 lodash 库包含很多方法，但一般在项目中只用到少数几个方法，Webpack 构建时却引入了整个 lodash 库

* `npm install lodash --save-dev`

* index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 多媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // 测试 watch 模式
  // console.log('watch 模式')

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)
      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)

      // 运行时错误
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入
  import _ from 'lodash'; // 全部引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = _.find(users, o => o.age < 40)
  console.log('res', res)
  ```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
    entry: {
      app: './src/index.js'
    },
    output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_no_lodash') //no_lodash && lodash
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提供构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
      new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
      new webpack.IgnorePlugin({ //构建时忽略指定目录
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      })
    ],
    devServer: {
      port: '8081',
      open: true,
      hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
      overlay: { errors: true, warnings: false },
    },
    devtool: 'none' //构建速度很快，方便观察页面变化
  }
  module.exports = config
  ```

* npx webpack
  
  ![no_lodash](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/no_lodash.png)

按需引入模块内导出：import 后跟文件路径，写到文件模块内导出的具体方法

* index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 多媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // 测试 watch 模式
  // console.log('watch 模式')

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)
      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)

      // 运行时错误
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入
  // import _ from 'lodash'; // 全部引入
  import find from 'lodash/find'; //按需引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = find(users, o => o.age < 40)
  console.log('res', res)
  ```

* webpack.config.js
  
  和上述配置并无不同，除了输出目录改为 dist_lodash

* npx webpack
  
  ![lodash](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/lodash.png)

### (2) 提高单个模块的构建速率

#### ① Resolve

resolve 选项配置模块如何解析

```javascript
module.exports = {
  ...
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src') // 创建 import/require 别名
    },
    extensions: ['.js', '.json', '.vue'] // 自动解析确定的扩展
  },
  ...
}
```

#### ② include/exclude

include 只对符合条件的模块使用指定的 loader 处理，exclude 不对符合条件的模块使用指定的 loader 处理，通常建议使用 exclude 排除 node_modules 目录下的文件

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
        exclude: /(node_modules)/, //提高构建速度
        use: {
          loader: 'url-loader',
          options: {
            limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
            name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
            publicPath: './'          //打包后引用地址(相对name)
          }
        }
      },
    ]
  }
  ...
}
```

#### ③ noParse

module.noParse 可以配置某些模块不使用 JS 模块编译器进行编译，例如 jQuery

```javascript
module.exports = {
  ...
  module: {
    noParse: /jquery/, //不使用webpack解析jquery
    rules: [
      ...
    ]
  }
  ...
}
```

#### ④ TypeScript 优化

Webpack 编译 TS 文件有两种方式，ts-loader、babel-loader

* ts-loader 默认在编译前进行类型检查，因此编译时间往往较慢，但是可以通过配置项 `transpileOnly: true` 忽略类型检查
* babel-loader 需要单独安装 `@babel/preset-typescript` 来支持编译 TS，babel-loader 的编译效率与 ts-loader 优化后的效率相当

### (3) 并行构建以提升总体效率

中小型项目并不适用于并行构建的思路，因为这种情况下，并发所需的多进程管理与通信带来的额外时间成本，可能会超过使用工具带来的收益，而在大型项目的生产环境构建时，并行构建工具才具有发挥作用的空间

#### ① thread-loader

thread-loader 作用于编译模块的 loader 上，用于在特定 loader 的编译过程中开启`多进程`的方式加速编译

thread-loader 应该放置在其他 loader 之前，之后的 loader 就会在一个单独的 worker 池中运行，并且运行是受限制的

* 这些 loader 不能产生新的文件
* 这些 loader 不能使用定制的 loader API
* 这些 loader 无法获取 webpack 的选项设置

#### ② parallel-webpack

parallel-webpack 针对多配置构建，Webpack 的配置文件可以是包含多个子配置对象的数组，在执行这类多配置对象时默认串行执行，而 parallel-webpack 能实现相关配置的`并行处理`

## 13. Webpack 打包阶段优化

### (1) Tree Shaking

Tree Shaking 的意思是摇树，伴随着摇树的动作，树上的枯枝和树叶就会掉落下来，Tree Shaking 摇掉的是项目中的`未引用代码 dead-code`

Webpack Tree-shaking 功能并不是指某一个配置选项，而是一组功能搭配使用实现的效果，Webpack 使用`生产模式`打包时，会自动开启这组优化功能，检测未引用代码并自动移除

#### ① optimization.usedExports

在生产环境以外的其他环境下，想要实现摇树功能，需要自行在配置文件 webpack.config.js 中配置 `optimization` 属性，该属性用来集中配置 Webpack 内置优化功能

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

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

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
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入模块内导出
  // import _ from 'lodash'; // 全部引入
  import find from 'lodash/find'; //按需引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = find(users, o => o.age < 40)
  console.log('res', res)

  // Tree-shaking
  import { Button } from './component.js'
  document.body.appendChild(Button())
  ```

* webpack.config.js
  
  属性 optimization 配置 `usedExports=true`，可以实现打包结果中模块只导出外部用到的成员（标记枯树枝、树叶）
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_treeShaking_none_usedExports')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
* dist_treeShaking_none_usedExports/bundle.js

  ![treeShaking_none_usedExports](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/treeShaking_none_usedExports.png)

#### ② optimization.minimize

* webpack.config.js
  
  属性 optimization 配置 `minimize=true`，可以实现压缩打包结果（摇下枯树枝、树叶）
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        title: 'Webpack', //title属性
        meta: { //meta标签
          viewPort: 'width=device-width'
        }
      }),
      new RemoveCommentsPlugin(),
      new webpack.IgnorePlugin({ //构建时忽略指定目录
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: true //压缩打包结果(摇下枯树枝、树叶)
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
* dist_treeShaking_none_minimize/bundle.js

  ![treeShaking_prod](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/treeShaking_prod.png)

#### ③ optimization.concatenateModules

* dist_treeShaking_none_usedExports/bundle.js
  
  先查看上上一个例子，即仅配置 `usedExports=true` 的打包结果，因为压缩后的代码不方便阅读

  ![treeShaking_usedExports_module](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/treeShaking_usedExports_module.png)

* webpack.config.js
  
  属性 optimization 配置 `concatenateModules=true`，可以实现尽可能合并所有模块到一个函数中（合并可用树枝、树叶）

  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true, //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false, //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: true, //打包结果中尽可能合并所有模块到一个函数中(合并可用树枝、树叶)
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  ![treeShaking_none_concatenateModules](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/treeShaking_none_concatenateModules.png)

#### ④ Tree Shaking 与 babel-loader

`Tree-shaking 实现的前提是 ES6 Modules`，Tree-shaking 通过 ES6 Modules 的 `export、import` 判断模块成员是否被引用，从而识别出`未引用代码 dead-code`，也就是说最终交给 Webpack 打包的代码，必须是以 ES6 Modules 的方式组织的模块化

很多资料说配置 `babel-loader`，会导致 Tree-shaking 失效，为什么这么说呢？因为 babel-loader 会在不兼容的环境中转换源代码中的一些 ES6 特性为 ES5 特性，因此 ES6 Modules 部分可能会被转换为 CommonJS

babel-loader 会不会转换 ES6 Modules 取决于开发者是否为其配置转换 ES6 Modules 的插件，很多时候我们为 babel-loader 配置的是一组预设插件集合 `@babel/presert-env`，这个预设里面就有转换 ES6 Modules 的插件，但是目前最新版本的 babel-loader `8.x` 已经已经自动为开发者关闭了转换 ES6 Modules 的插件，因此不会导致 Tree-shaking 失效，但是如果使用的是 babel-loader `7.x` 就会导致 Tree-shaking 失效

### (2) sideEffects

**模块的副作用**：模块执行的时候除了导出成员，是否还做了其他的事情

Webpack 4 中新增了一个 `optimization.sideEffects` 特性来实现`模块无副作用打包`，允许开发者在文件 `package.json` 中通过配置 `sideEffects` 来标识整个项目的代码是否有副作用，从而提供更大的压缩空间，这个特性一般只有在`开发 npm 模块`时才会用到，并且这个特性在`生产环境`下默认自动开启，以下以`原始环境`为例介绍怎样手动开启 sideEffects 功能

#### ① optimization.usedExports

Tree Shaking 配置 `optimization.usedExports` 可以实现打包结果中的模块只导出外部用到的成员（标记枯树枝、树叶），那么需要验证一下，打包结果中的 src/commons/index.js 模块是否只导出了 Link 模块，打包结果是否不包含 src/commons/button.js 模块

* src 下新建 commons 文件夹，文件夹下新建 index.js、button.js、link.js 文件
  
  ![commons目录](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/commons%E7%9B%AE%E5%BD%95.png)

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

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

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
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入模块内导出
  // import _ from 'lodash'; // 全部引入
  import find from 'lodash/find'; //按需引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = find(users, o => o.age < 40)
  console.log('res', res)

  // Tree-shaking
  import { Button } from './component.js'
  document.body.appendChild(Button())

  // sideEffects
  // 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
  // index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
  import { Link } from './commons/index.js'
  document.body.appendChild(Link())
  ```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true,         //打包结果中的模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  ![sideEffects_none_usedExports](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/sideEffects_none_usedExports.png)

#### ② optimization.sideEffects

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      sideEffects: true, //无副作用打包
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
    "sideEffects": false,
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
      "file-loader": "^6.0.0",
      "html-webpack-plugin": "^4.3.0",
      "mini-css-extract-plugin": "^0.10.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "style-loader": "^1.2.1",
      "url-loader": "^4.1.0",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0",
      "webpack-merge": "^5.1.2"
    },
    "dependencies": {}
  }
  ```

* npx webpack --mode none
  
  ![sideEffects_none](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/sideEffects_none.png)

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

* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

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
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入模块内导出
  // import _ from 'lodash'; // 全部引入
  import find from 'lodash/find'; //按需引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = find(users, o => o.age < 40)
  console.log('res', res)

  // Tree-shaking
  import { Button } from './component.js'
  document.body.appendChild(Button())

  // sideEffects
  // 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
  // index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
  import { Link } from './commons/index.js'
  document.body.appendChild(Link())

  // sideEffects 必要的副作用
  import './numPad.js' // 内部包含影响全局的副作用
  console.log((8).pad(3))
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
      "file-loader": "^6.0.0",
      "html-webpack-plugin": "^4.3.0",
      "mini-css-extract-plugin": "^0.10.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "style-loader": "^1.2.1",
      "url-loader": "^4.1.0",
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
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,         //无副作用打包
    }
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  ![sideEffects_none_numPad](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/sideEffects_none_numPad.png)

### (3) 按需引入模块

Webpack 会将所有代码打包到`一个 bundle.js 文件`中，这会导致打包结果过大，绝大多数情况下，应用程序刚开始运行时，并非所有模块都是必须的，如果所有模块都被打包到一个 bundle.js 文件，即使应用程序一开始只需要一到两个模块工作，也必须将 bundle.js 文件整体加载进来，前端应用程序一般都是运行在浏览器，因此这种情况会浪费大量流量和带宽，也会导致浏览器响应速度变慢

合理的方式是将打包结果按照一定的规则分离到`多个 bundle.js 文件`，然后`根据应用程序的运行按需加载`，这样就可以降低启动成本，提高响应速度

这与 Webpack 将项目中散落的模块打包到一起，从而提高加载效率，并不自相矛盾，只是物极必反，前端应用程序中的资源受环境所限，太大不行，太碎也不行，需要维持在一个`合理的细粒度`，开发环境中划分模块的颗粒度一般都会非常细，很多时候一个模块只是提供一个小工具函数，并不能形成一个完整的功能单元，如果不将这些资源模块打包，直接按照开发过程划分的模块颗粒度加载，那么运行一个很小的功能，就需要加载非常多的资源模块，因此模块打包肯定是必要的，但是当应用程序体积越来越大时，我们也要学会变通

Webpack 由此提供了 `ES6 Modules import() 按需加载功能`，所有动态导入的模块都会被自动提取到`单独的 bundle.js 文件`

* src 下新建 importDemand 文件夹，该文件夹下新建 buttonA.js、buttonB.js 文件
  
  ![importDemand目录](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/importDemand%E7%9B%AE%E5%BD%95.png)
  
  src/importDemand/buttonA.js

  ```javascript
  export const Button = () => {
    const button = document.createElement('button')
    button.innerHTML = '按钮-A'
    return button
  }
  ```

  src/importDemand/buttonB.js

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

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

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
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入模块内导出
  // import _ from 'lodash'; // 全部引入
  import find from 'lodash/find'; //按需引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = find(users, o => o.age < 40)
  console.log('res', res)

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

  // 按需加载
  const btn1 = document.createElement('button')
  const btn2 = document.createElement('button')
  btn1.innerHTML = '显示按钮'
  btn2.innerHTML = '显示链接'
  document.body.append(btn1)
  document.body.append(btn2)
  btn1.addEventListener('click', function(e){
    import('./importDemand/buttonA.js')
      .then(({Button}) => {
        document.body.append(Button())
      })
  })
  btn2.addEventListener('click', function(e){
    import('./importDemand/buttonB.js')
      .then(({Button}) => {
        document.body.appendChild(Button())
      })
  })
  ```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist_importDemand_none')
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
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'url-loader',
            options: {
              limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
              name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
              publicPath: './'          //打包后引用地址(相对name)
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
              name: 'fonts/[name].[ext]',
              publicPath: './'
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
              name: 'media/[name].[ext]',
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
        resourceRegExp: /^\.\/locale$/,       contextRegExp: /moment$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,         //无副作用打包
    },
  }
  module.exports = config
  ```

* npx webpack --mode none
  
  可以看出，多出了 1.bundle.js、2.bundle.js 文件，这两个文件就是由 import() 函数动态导入代码分包产生的，以上就是动态导入在 Webpack 的使用，整个过程无需任何配置，只需要按照 ES6 Modules import() 函数的方式动态导入模块就可以了，Webpack 内部会自动处理分包和按需加载
  
  ![importDemand_none打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/importDemand_none%E6%89%93%E5%8C%85.png)

  ![importDemand_none](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/importDemand_none.png)

### (4) CSS 提取压缩

#### ① MiniCSSExtractPlugin

CSS 文件一般会使用 css-loader、style-loader 处理，最终打包结果就是将 CSS 代码通过 `<style>` 标签嵌套在 JS 文件代码中

MiniCSSExtractPlugin 插件可以将 CSS 代码单独打包成 CSS 文件，通过 `<link>` 标签引入到页面

CSS 独立拆包的最大好处就是 JS 和 CSS 的改动，不会影响对方，例如修改 JS 文件不会导致 CSS 文件缓存失效

* `npm i mini-css-extract-plugin --save-dev`

#### ② OptimizeCSSAssetsWebpackPlugin

MiniCSSExtractPlugin 插件只负责将 CSS 代码提取到单独的 CSS 文件，但是生产环境下 Webpack 内置压缩插件只会自动压缩 JS 文件，不会压缩 CSS 文件，因此我们需要通过 OptimizeCSSAssetsWebpackPlugin 插件来压缩 CSS 文件

* `npm i optimize-css-assets-webpack-plugin --save-dev`
  
  Webpack 建议将压缩插件配置到 `optimization.minimizer`，便于 minimize 选项的统一控制

* `npm i uglifyjs-webpack-plugin --save-dev`
  
  我们配置了插件 OptimizeCSSAssetsWebpackPlugin 到 optimization.minimizer 之后，Webpack 会认为我们需要使用自定义压缩插件，Webpack 内置的 JS 压缩插件就会被覆盖掉，因此需要重新下载引入一个 JS 文件压缩插件

### (5) 缓存

当我们把打包后的 dist 目录部署到服务器上后，客户端浏览器就能够访问该服务器的网站和资源，而获取资源是比较耗时的，因此浏览器使用一种名为`缓存`的技术，可以通过命中缓存，降低网络流量，使网站加载速度更快

然而如果我们在部署新版本时，未更改资源文件名，浏览器很可能会认为其未更新，转而使用缓存版本，如果新版本和缓存版本资源内容不同，就需要用户手动清除浏览器缓存之后才能访问新版本，这对于用户来说并不方便

Webpack 提供一种在`文件名里嵌入 hash` 的方式，使得每次打包都生成新的文件名，从而告诉浏览器是否要读取缓存

#### ① module vs chunk

一个 chunk 包含一或多个 module

* **module**：模块化编程中我们把应用程序分割成的具有独立功能的`代码模块`，`一个 import 就是 module（JS 文件、CSS 文件、图片文件、字体文件、多媒体文件）`
* **chunk**：代码中引用的文件根据配置合并成一或多个包，`一个包就是 chunk（输出的 bundle.js 文件）`

#### ② hash vs chunkhash vs contenthash

* **hash**：hash 是`项目级别`的，整个项目的所有文件共用一个 hash，Webpack 每次重新构建打包时，如果项目没有任何更改，其 hash 值就不会改变，否则就会改变
  
  `url-loader 管理的图片文件、字体文件、多媒体文件`等静态资源，应该在打包的文件名里嵌套 hash

* **chunkhash**：chunkhash 是 `JS 文件级别`的，每个 JS 模块及其依赖的任意类型模块共用一个 chunkhash，如果某个 JS 模块及其依赖的任意类型模块内容改变，其共用的 chunkhash 值就会改变，否则不会改变
  
  `output 输出的 JS 文件`，应该在打包的文件名里嵌套 chunkhash

* **contenthash**：contenthash 是 `CSS 文件级别`的，每个 CSS 模块一个 contenthash，只要 CSS 模块内容不变，其 contenthash 值不会改变，否则就会改变
  
  contenthash 值的出现主要是为了让 CSS 文件不受 JS 文件的影响，比如 foo.css 被 foo.js 引用了，所以它们共用相同的 chunkhash，但这样是有问题的，如果 foo.js 修改了代码，foo.css 文件就算内容没有任何改变，其 hash、chunkhash 也会随之改变
  
  `MiniCSSExtractPlugin 插件输出的 CSS 文件`，应该在打包的文件名里嵌套 contenthash

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
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, 'dist_hash_chunkhash_contenthash')
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
          test: /\.css$/, //正则匹配文件路径
          use: [ //指定具体的loader,一组链式loader按相反顺序执行
            MiniCssExtractPlugin.loader, //通过MiniCssExtractPlugin插件将样式提取成单独的CSS文件通过<link>标签嵌入HTML文件
            'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
          exclude: /(node_modules)/, //提供构建速度
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
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    optimization: {
      usedExports: true,        //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: true,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: true, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,        //无副作用打包
      minimizer: [
        // new UglifyJsWebpackPlugin(),    
        new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
      ]
    },
  }
  module.exports = config
  ```

  * npx webpack
  
  ![hash_chunkhash_contenthash打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/hash_chunkhash_contenthash%E6%89%93%E5%8C%85.png)

#### ③ moduleId vs chunkId

* **moduleId**：Webpack 内部为每个 module 维护了一个递增的 moduleId，当增加或删除 moudle 的时候，就需要增加或删除 moduleId，导致其他 module 虽然内容没有变化，但由于 moduleId 被强占，自身 moduleId 只能自增或自减，因此整个 moduleId 表的顺序都错乱了
  
  chunk 内部的每个 module 都有一个 moduleId，如果引用一个新文件或删除一个旧文件，都可能导致其他文件的 moduleId 变化，这样缓存就失效了
  
  ![moduleId表](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/moduleId%E8%A1%A8.png)
  
  Webpack 提供 `HashedModuleIdsPlugin` 插件解决这个问题，
  不使用自增的 moudleId，使用 `hash 之后的文件路径`作为 moudleId
  
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

#### ④ manifest

使用 Webpack 构建的应用程序中，主要存在三种代码类型

* 第三方库
* 开发者编写的源代码
* webpack 的 runtime 和 manifest

manifest 和 runtime 的概念如下

* **manifest**：Webpack compiler 开始执行、解析、映射应用程序时，保留所有模块的详细要点的`数据集合`，所有 import/require 语句都转换为 `__webpack_require__` 方法，并指向模块标识符

* **runtime**：应用程序打包完成在浏览器运行时，webpack 用来连接所有模块所需的`逻辑代码`，通过 manifest 中的数据，runtime 能够查询模块标识符，检索出对应的模块

Webpack 4 提供 `optimization.runtimeChunk` 让开发者方便地配置如何提取 manifest，作用是将包含 chunks 映射关系的 list 从 app.js 提取出来单独生成一个 `runtimeChunk.xxx.js`，但是该 JS 文件非常小，又经常会改变，每次都需要重新请求，其 HTTP 耗时远大于执行时间，因此建议不要单独拆包，而是使用插件 `ScriptExtHtmlWebpackPlugin` 将其内联到 `index.html`，index.html 本来每次打包都会变

* `npm install script-ext-html-webpack-plugin --save-dev`

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
  const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, 'dist_manifest_111')
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
      }),
      new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
        inline: /runtime\..*\.js$/
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
      ],
      runtimeChunk: 'single' //提取manifest
    },
  }
  module.exports = config
  ```

* npx webpack
  
  ![manifest打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/manifest%E6%89%93%E5%8C%85.png)
  
* dist_manifest/index.html
  
  ![manifest_index](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/manifest_index.png)

### (6) Code Splitting

Webpack 4 中新增了一个 `optimization.splitChunks` 特性来实现`代码分包`，并且这个特性在`生产环境`下默认自动开启，以下以`原始环境`为例介绍怎样手动开启 splitChunks 功能

Webpack 4 代码分包策略如下

* 新的 chunk 是否被共享或者是来自 node_modules 的模块
* 新的 chunk 体积在压缩之前是否大于 30kb
* 按需加载 chunk 的并发请求数量小于等于 5 个
* 页面初始加载时的并发请求数量小于等于 3 个

![分包策略](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/%E5%88%86%E5%8C%85%E7%AD%96%E7%95%A5.png)

webpack.config.js

```javascript
const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
const config = {
  mode: 'none',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.join(__dirname, 'dist_codeSplitting')
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
    }),
    new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
      inline: /runtime\..*\.js$/
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
    ],
    runtimeChunk: 'single', //提取manifest
    splitChunks: { //codeSplitting
      chunks: 'all',
      cacheGroups: {
        libs: { //基础类库
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\]/,
          priority: 10,
          chunks: 'initial' //只打包初始时依赖的第三方
        },
        elementUI: { //UI组件库
          name: 'chunk-elementUI', //elementUI单独拆包
          test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于libs和app不然会被打包进libs或app
          priority: 20,
        },
        commons: { //自定义组件/函数
          name: 'chunk-commons',
          test: path.resolve(__dirname, 'src/components'),
          priority: 5,
          minChunks: 3, //最小共用次数
          reuseExistingChunk: true
        }
      }
    }
  },
}
module.exports = config
```

## 14. Webpack 生产环境下增量构建

Webpack 增量构建就是`只编译打包改动后的文件`的操作

### (1) devServer

开发环境的 devServer 状态下，Webpack 会进行一次初始化构建，构建完成后启动服务并进入到等待更新的状态，当本地文件有变更时，Webpack 瞬间将`变更文件`编译，并将编译后的文件通过 `Websocket` 推送到浏览器，因此开发环境下 derServer 就是增量构建

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
  const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
  const config = {
    mode: 'none',
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, 'dist_add_devServer')
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
      }),
      new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
        inline: /runtime\..*\.js$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    devServer: {
      port: '8081',
      open: true,
      // hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面,HMR会影响chunkhash contenthash
      overlay: { errors: true, warnings: false },
    },
    optimization: {
      usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,         //无副作用打包
      minimizer: [
        // new UglifyJsWebpackPlugin(), //Webpack内置JS压缩插件
        new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
      ],
      runtimeChunk: 'single', //提取manifest
      splitChunks: { //codeSplitting
        chunks: 'all',
        cacheGroups: {
          libs: { //基础类库
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\]/,
            priority: 10,
            chunks: 'initial' //只打包初始时依赖的第三方
          },
          elementUI: { //UI组件库
            name: 'chunk-elementUI', //elementUI单独拆包
            test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于libs和app不然会被打包进libs或app
            priority: 20,
          },
          commons: { //自定义组件/函数
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            priority: 5,
            minChunks: 3, //最小共用次数
            reuseExistingChunk: true
          }
        }
      }
    },
  }
  module.exports = config
  ```

* npx webpack-dev-server
  
  ![add_devServer_1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/add_devServer_1.png)

* src/index.js
  
  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  // 导入其他类型资源 ( CSS、图片、字体 )
  import './style.css'

  // 导入其他类型资源 ( 多媒体 )
  import movie from '../public/movie.mp4'
  const video = document.createElement('video')
  video.src = movie
  video.controls = 'controls'
  document.body.append(video)

  // 导入 .md 文件
  import title from './title.md'

  // 添加 textarea 输入框
  const text = document.createElement('textarea')
  document.body.append(text)

  // 测试 watch 模式
  // console.log('watch 模式')

  // head.js HMR 处理函数
  let lastHeading = heading
  if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
    module.hot.accept('./head.js', function(){
      console.log(222, createHeading)
      document.body.removeChild(lastHeading)
      lastHeading = createHeading()
      document.body.append(lastHeading)

      // 运行时错误
      // undefined.f()
    })
  }

  // IngorePlugin
  import moment from 'moment'
  import('moment/locale/zh-cn') //手动引入所需的语言包
  moment.locale('zh-cn');
  let r = moment().endOf('day').fromNow();
  console.log(r)

  // 测试按需引入模块内导出
  // import _ from 'lodash'; // 全部引入
  import find from 'lodash/find'; //按需引入
  const users = [
    { 'user': 'barney', 'age': 36, 'active': true },
    { 'user': 'fred', 'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1, 'active': true }
  ]
  const res = find(users, o => o.age < 40)
  console.log('res', res)

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

  // 按需加载
  const btn1 = document.createElement('button')
  const btn2 = document.createElement('button')
  btn1.innerHTML = '显示按钮'
  btn2.innerHTML = '显示链接'
  document.body.append(btn1)
  document.body.append(btn2)
  btn1.addEventListener('click', function(e){
    import('./importDemand/buttonA.js')
      .then(({Button}) => {
        document.body.append(Button())
      })
  })
  btn2.addEventListener('click', function(e){
    import('./importDemand/buttonB.js')
      .then(({Button}) => {
        document.body.appendChild(Button())
      })
  })

  // 测试增量构建
  console.log('增量构建')
  ```

* 保存，查看
  
  ![add_devServer_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/add_devServer_2.png)

### (2) 生产环境下 watch 配置

devServer 模式下默认开启 watch 配置，watch 配置下初始构建完成后并不会退出当前 node 进程，因此构建上下文的对象包括上次构建的缓存数据对象都可以保存在内存中，供下次构建时重复使用，如果在生产环境下开启 watch 配置是否能实现增量构建呢，如下所示

watch 配置的源码在 webpack/lib/Watching.js 文件

```javascript
...
_go() {
  ...
  this.compiler.hooks.watchRun.callAsync(this.compiler, err => {
    const onCompiled = (err, compilation) => {
      ...
    }
    this.compiler.compile(onCompiled);
  }
}
```

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
  const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
  const config = {
    mode: 'none',
    watch: true, //watch配置测试增量构建
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, 'dist_add_watch')
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
      }),
      new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
        inline: /runtime\..*\.js$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    devServer: {
      port: '8081',
      open: true,
      // hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面,HMR会影响chunkhash contenthash
      overlay: { errors: true, warnings: false },
    },
    optimization: {
      usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,         //无副作用打包
      minimizer: [
        // new UglifyJsWebpackPlugin(), //Webpack内置JS压缩插件
        new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
      ],
      runtimeChunk: 'single', //提取manifest
      splitChunks: { //codeSplitting
        chunks: 'all',
        cacheGroups: {
          libs: { //基础类库
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\]/,
            priority: 10,
            chunks: 'initial' //只打包初始时依赖的第三方
          },
          elementUI: { //UI组件库
            name: 'chunk-elementUI', //elementUI单独拆包
            test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于libs和app不然会被打包进libs或app
            priority: 20,
          },
          commons: { //自定义组件/函数
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            priority: 5,
            minChunks: 3, //最小共用次数
            reuseExistingChunk: true
          }
        }
      }
    },
  }
  module.exports = config
  ```

* npx webpack
  
  ![add_watch_1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/add_watch_1.png)

* src/index.js

* npx webpack
  
  如下图所示，虽然构建时间大幅减少，但是构建模块数量并没有减少，因此并未实现增量构建
  
  ![add_watch_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/add_watch_2.png)

### (3) 生产环境下 cache 配置

cache 配置的源码文件主要涉及到 2 个文件 CachePlugin.js、Compilation.js

webpack/lib/CachePlugin.js

* 主要是将 CachePlugin 插件的 cache 属性传入 compilation 实例

```javascript
...
compiler.hooks.thisCompilation.tap("CachePlugin", compilation => {
  compilation.cache = cache;
  ...
}
```

webpack/lib/Compilation.js

* 编译阶段添加 module 时，若命中缓存 module，直接跳过该 module 的编译过程
* 创建 chunk 产物代码阶段，若命中缓存 chunk，直接跳过该 chunk 产物代码的生成过程

```javascript
...
addModule(module, cacheGroup) {
  ...
  if (this.cache && this.cache[cacheName]) {
    const cacheModule = this.cache[cacheName];
    ...
    //缓存模块存在情况下判断是否需要rebuild
    rebuild = ...
    if (!rebuild) {
      ...
      //无须rebuild情况下返回cacheModule，并标记build:false
      return {
		module: cacheModule,
		issuer: true,
		build: false,
		dependencies: true
	  }      
    }
    ...
  }
  if (this.cache) {
    this.cache[cacheName] = module;
  }
  ...
  //无缓存或需要rebuild情况下返回module，并标记build:true
  return {
	module: module,
	issuer: true,
	build: true,
	dependencies: true
  };
}
...
createChunkAssets() {
  ...
  if ( this.cache && this.cache[cacheName] && this.cache[cacheName].hash === usedHash ) {
    source = this.cache[cacheName].source;
  } else {
	source = fileManifest.render();
    ...
  }
}
```

测试过程如下

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
  const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
  const config = {
    mode: 'none',
    watch: true, //watch配置测试增量构建
    cache: true, //cache配置测试增量构建
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js',
      path: path.join(__dirname, 'dist_add_watch_cache')
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
      }),
      new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
        inline: /runtime\..*\.js$/
      })
    ],
    devtool: 'none', //构建速度很快，方便观察页面变化
    devServer: {
      port: '8081',
      open: true,
      // hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面,HMR会影响chunkhash contenthash
      overlay: { errors: true, warnings: false },
    },
    optimization: {
      usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
      minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
      concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
      sideEffects: true,         //无副作用打包
      minimizer: [
        // new UglifyJsWebpackPlugin(), //Webpack内置JS压缩插件
        new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
      ],
      runtimeChunk: 'single', //提取manifest
      splitChunks: { //codeSplitting
        chunks: 'all',
        cacheGroups: {
          libs: { //基础类库
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\]/,
            priority: 10,
            chunks: 'initial' //只打包初始时依赖的第三方
          },
          elementUI: { //UI组件库
            name: 'chunk-elementUI', //elementUI单独拆包
            test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于libs和app不然会被打包进libs或app
            priority: 20,
          },
          commons: { //自定义组件/函数
            name: 'chunk-commons',
            test: path.resolve(__dirname, 'src/components'),
            priority: 5,
            minChunks: 3, //最小共用次数
            reuseExistingChunk: true
          }
        }
      }
    },
  }
  module.exports = config
  ```

* npx webpack
  
  ![add_watch_cache_1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/add_watch_cache_1.png)

* src/index.js

* npx webpack
  
  如下图所示，不但构建时间大幅减少，并且再次构建模块数只有 1 个，这就实现了生产环境下的增量构建
  
  ![add_watch_cache_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/add_watch_cache_2.png)

## 15. 开发环境和生产环境

### (1) mode

开发环境我们注重的是`开发效率`，生产环境强调的是以更少量、更高效的代码完成业务功能，也就是注重`运行效率`，因此开发环境和生产环境有很大的差异，Webpack 提供了 mode 配置为开发者提供不同模式下的预设配置

* none：原始模式，`不做任何额外处理`，运行最原始的打包
* production ( 默认 )：生产模式，`自动优化打包结果`，启动内置优化插件，打包速度偏慢
* development：开发模式，`自动优化打包速度`，添加一些调试过程中的辅助插件

![mode](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/mode.png)

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

### (4) 以一个配置文件为例

插件 DefinePlugin 用于为代码注入全局成员，例如 `process.env.NODE_ENV`，很多第三方插件都是通过这个全局成员判断当前运行环境，从而决定是否执行例如打印日志之类的操作

* webpack.config.js
  
  ```javascript
  const webpack = require('webpack')
  const path = require('path')
  const { CleanWebpackPlugin} = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
  const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
  module.exports = (env, argv) => {
    //公共配置
    const config = {
      entry: {
        app: './src/index.js'
      },
      output: {
        filename: 'js/[name].[chunkhash].js',
        path: path.join(__dirname, 'dist_config_one')
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
        }),
        new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
          inline: /runtime\..*\.js$/
        })
      ],
      optimization: {
        minimizer: [
          // new UglifyJsWebpackPlugin(), //压缩JS文件
          new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
        ],
        runtimeChunk: 'single', //提取manifest
        splitChunks: { //codeSplitting
          chunks: 'all',
          cacheGroups: {
            libs: { //基础类库
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\]/,
              priority: 10,
              chunks: 'initial' //只打包初始时依赖的第三方
            },
            elementUI: { //UI组件库
              name: 'chunk-elementUI', //elementUI单独拆包
              test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于libs和app不然会被打包进libs或app
              priority: 20,
            },
            commons: { //自定义组件/函数
              name: 'chunk-commons',
              test: path.resolve(__dirname, 'src/components'),
              priority: 5,
              minChunks: 3, //最小共用次数
              reuseExistingChunk: true
            }
          }
        }
      }
    }

    // 开发环境下的特殊配置
    if (env === 'development') {
      config.mode = 'development'
      config.devtool = 'cheap-eval-module-source-map',
      config.devServer = {
        port: '8081',
        open: true,
        // hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
        overlay: { errors: true, warnings: false },
      },
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
      ]
    }

    // 生产环境下的特殊配置
    if (env === 'production') {
      config.mode = 'production'
      config.devtool = 'none',
      config.plugins = [
        ...config.plugins,
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin(),
      ]
    }
    return config
  }
  ```

* package.json
  
  * **devDependencies**：Node 项目在开发环境下需要的一些前端依赖
  * **dependencies**：Node 项目部署上线后代码执行所需要的第三方依赖包
  
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
      "serve": "webpack-dev-server --mode development --env development", //加上--env环境参数
      "build": "webpack --mode production --env production"
    },
    "devDependencies": {
      "@babel/core": "^7.11.4",
      "@babel/preset-env": "^7.11.0",
      "babel-loader": "^8.1.0",
      "babel-plugin-dynamic-import-node": "^2.3.3",
      "clean-webpack-plugin": "^3.0.0",
      "copy-webpack-plugin": "^6.0.3",
      "css-loader": "^4.2.2",
      "file-loader": "^6.0.0",
      "html-webpack-plugin": "^4.3.0",
      "mini-css-extract-plugin": "^0.10.0",
      "optimize-css-assets-webpack-plugin": "^5.0.3",
      "script-ext-html-webpack-plugin": "^2.1.4",
      "style-loader": "^1.2.1",
      "url-loader": "^4.1.0",
      "webpack": "^4.44.1",
      "webpack-cli": "^3.3.12",
      "webpack-dev-server": "^3.11.0",
      "webpack-merge": "^5.1.2"
    },
    "dependencies": {}
  }
  ```

* npm run build
  
  ![config_one打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/config_one%E6%89%93%E5%8C%85.png)

* npm run serve
  
  ![config_one效果](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/Webpack/config_one%E6%95%88%E6%9E%9C.png)
