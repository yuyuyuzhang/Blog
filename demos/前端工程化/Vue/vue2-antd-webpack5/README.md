# 新建一个 vue2 + webpck5 项目

## 1、vue2

* npm init
* npm i vue vue-router vuex
* npm i vue-loader@14 vue-template-compiler -D
  最新版本的 vue-loader 有 bug 无法使用

## 2、业务代码

* index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vue2-antd-webpack5 APP</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./src/index.js"></script>
  </body>
  </html>
  ```

* src/App.vue

  ```vue
  <template>
    <div>小可爱</div>
  </template>

  <script>
  export default {
    name: 'App'
  }
  </script>
  ```

* src/index.js

  ```js
  import Vue from 'vue'
  import App from './App.vue'

  new Vue({
    el: '#app',
    render: h => h(App)
  })
  ```

## 3、webpack5

* npm i webpack webpack-cli webpack-dev-server -D
* npm i style-loader css-loader postcss-loader sass-loader file-loader url-loader -D

  postcss-loader 用于自动补全不同浏览器的兼容性前缀

* npm i clean-webpack-plugin html-webpack-plugin copy-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin terser-webpack-plugin script-ext-html-webpack-plugin friendly-errors-webpack-plugin -D
* 项目根目录下新建 webpack.config.js

  ```js
  const webpack = require('webpack')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const TerserWebpackPlugin = require('terser-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            exclude: /(node_modules)/,
            use: 'vue-loader',
          },
          {
            test: /\.(css|postcss)$/,
            exclude: /(node_modules)/,
            use: [ // CSS 代码单独拆包，一组链式 loader 按相反顺序执行
              MiniCssExtractPlugin.loader, 
              'css-loader'
            ] 
          },
          {
            test: /\.(sass|scss)$/,
            exclude: /(node_modules)/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'] 
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
          }
        ]
      },
      plugins: [
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

* package.json

  ```json
  {
    "scripts": {
      "serve": "webpack serve --node-env=development",
      "build": "webpack --node-env=production"
    }
  }
  ```
  
## 4、eslint

* npm i eslint eslint-webpack-plugin @babel/core @babel/eslint-parser -D
* npm i eslint-plugin-vue -D
* eslint init：项目根目录下新建 .eslintrc.js 配置文件

  ```js
  module.exports = {
    root: true,
    env: {
      'browser': true,
      'es2021': true,
      'node': true
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],
    parserOptions: {
      'ecmaVersion': 12, // ES6 语法版本
      'sourceType': 'module', // ES6 模块
      'parser': '@babel/eslint-parser' // 指定解析器
    }
  }
  ```

* 项目根目录下新建 .eslintignore 文件，配置 ESLint 需要`忽略`的目录和文件

  ```eslintignore
  node_modules
  dist
  config/*.js
  src/assets
  src/public
  ```

* webpack.config.js 配置 ESLintWebpackPlugin 插件，代替已废弃的 eslint-loader

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const TerserWebpackPlugin = require('terser-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            exclude: /(node_modules)/,
            use: 'vue-loader',
          },
          {
            test: /\.(css|postcss)$/,
            exclude: /(node_modules)/,
            use: [ // CSS 代码单独拆包，一组链式 loader 按相反顺序执行
              MiniCssExtractPlugin.loader, 
              'css-loader'
            ] 
          },
          {
            test: /\.(sass|scss)$/,
            exclude: /(node_modules)/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'] 
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
          }
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

## 5、babel

* npm i babel-loader @babel/preset-env @babel/plugin-transform-runtime -D
* npm i babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx -D
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
        debug: true,          // 保留 console.log 到输出文件，方便调试
        useBuiltIns: 'entry', // 按需导入 core-js 支持的 ES6 新 API
        corejs: {             // 指定 core-js 版本
          version: "3.13", 
          proposals: true 
        },          
      }]
    ],
    plugins: ["babel-plugin-transform-vue-jsx", "@babel/plugin-transform-runtime"],
  }
  ```

* webpack.config.js 配置 babel-loader

  ```js
  const webpack = require('webpack')
  const ESLintWebpackPlugin = require('eslint-webpack-plugin')
  const MiniCssExtractPlugin = require('mini-css-extract-plugin')
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
  const TerserWebpackPlugin = require('terser-webpack-plugin')
  const { CleanWebpackPlugin } = require('clean-webpack-plugin')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

  const path = require('path')
  const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
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
        path: pathResolve('./dist'), // 输出目录
        publicPath: '/' // 输出目录中相对该目录加载资源、启动服务
      },
      resolve: {
        alias: {
          '@': pathJoin('src')
        },
        extensions: ['.js', '.vue', '.json']
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            exclude: /(node_modules)/,
            use: 'vue-loader',
          },
          {
            test: /\.js$/,
            include: /(src)/,
            use: 'babel-loader'
          },
          {
            test: /\.(css|postcss)$/,
            exclude: /(node_modules)/,
            use: [ // CSS 代码单独拆包，一组链式 loader 按相反顺序执行
              MiniCssExtractPlugin.loader, 
              'css-loader'
            ] 
          },
          {
            test: /\.(sass|scss)$/,
            exclude: /(node_modules)/,
            use: [MiniCssExtractPlugin.loader, 'css-loader'] 
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
          }
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
