const webpack = require('webpack')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
const pathJoin = dir => path.join(__dirname, dir) // 连接路径

module.exports = (env, argv) => {
  //公共配置
  const config = {
    mode: env,
    entry: {
      app: './src/main.js'
    },
    output: {
      filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
      path: pathResolve('./dist'), // 输出目录
      publicPath: '/', // 输出目录中相对该目录加载资源、启动服务
    },
    resolve: {
      alias: {
        '@': pathJoin('src')
      },
      extensions: ['.js', '.json', '.vue']
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /(node_modules)/, //提高构建速度
          use: {
            loader: 'vue-loader',
          }
        },
        {
          test: /\.css$/,
          use: [ //指定具体的 loader，一组链式 loader 按相反顺序执行
            'style-loader',
            'css-loader'
          ]
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: './index.html',
        title: 'Webpack App',
        meta: {
          viewPort: 'width=device-width'
        }
      }),
    ],
  }

  // // 开发环境下的特殊配置
  // if (env === 'development') {
  //   config.devtool = 'cheap-eval-module-source-map',
  //   config.devServer = {
  //     port: '8081',
  //     open: true, 
  //     hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
  //     overlay: { errors: true, warnings: false },
  //   }
  // }

  // // 生产环境下的特殊配置
  // if (env === 'production') {
  //   config.devtool = 'none'
  // }

  return config
}