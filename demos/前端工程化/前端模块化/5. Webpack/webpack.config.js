const webpack = require('webpack')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const RemoveCommentsPlugin = require('./config/remove-comments-plugin.js')
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
        title: 'Webpack', // title 属性
        meta: { // meta 标签
          viewPort: 'width=device-width'
        }
      })
    ]
  }

  // watch 模式
  // if (argv.watch) {
  //   config.watchOptions = {
  //     aggregateTimeout: 300, // 将指定延迟内的所有更改都聚合到这次的重新构建
  //     ignored: /node_modules/, // 不监听 node_modules 文件夹，避免占用大量 CPU 和内存
  //   }
  // }

  // 开发环境
  if (argv.nodeEnv === 'development') {
    config.target = 'web'
    config.devServer = {
      port: '8082',
      // open: true,
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
      }),
      new RemoveCommentsPlugin()
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
