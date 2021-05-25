const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const pathResolve = dir => path.resolve(__dirname, dir) // 将第二个参数解析为绝对路径
const pathJoin = dir => path.join(__dirname, dir) // 连接路径

module.exports = (env, argv) => {
  const config = {
    // mode: argv.nodeEnv,
    mode: 'development',
    devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
    // context: pathResolve('./'), // 设置项目根目录为环境上下文
    entry: {
      app: './src/index.js' // 相对 context 配置
    },
    output: {
      filename: 'js/[name].[chunkhash].js', // 输出 JS 文件名
      path: pathJoin('dist'), // 输出目录
      publicPath: '/', // 输出目录中相对该目录加载资源、启动服务
    },
    // resolve: {
    //   alias: {
    //     '@': pathJoin('src')
    //   },
    //   extensions: ['.js', '.vue', '.json'],
    // },
    // module: {
    //   rules: [
    //     {
    //       test: /\.css$/i, // 正则匹配文件路径
    //       use: ['style-loader', 'css-loader'] // 一组链式 loader 按相反顺序执行
    //     },
    //   ]
    // },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html', //文件名
        title: 'Webpack',       //title属性
        meta: {                 //meta标签
          viewPort: 'width=device-width'
        }
      }),
    ]
  }

  // 开发环境
  if (argv.nodeEnv === 'development') {
    config.devServer = {
      port: '8081',
      overlay: { errors: true, warnings: false },
    }
  }

  return config
}



// const webpack = require('webpack')
// const path = require('path')
// const { CleanWebpackPlugin} = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// // const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const seen = new Set(); //用于NamedChunksPlugin插件固定chunkId
// const nameLength = 4;   //用于NamedChunksPlugin插件固定chunkId
// module.exports = (env, argv) => {
//   //公共配置
//   const config = {
//     entry: {
//       app: './src/index.js'
//     },
//     output: {
//       filename: 'js/[name].[chunkhash].js',
//       path: path.join(__dirname, 'dist_config_one')
//     },
//     resolve: {
//       alias: {
//         '@': path.join(__dirname, '..', 'src')
//       },
//       extensions: ['.js', '.json', '.vue']
//     },
//     module: {
//       rules: [
//         {
//           test: /\.css$/, //正则匹配文件路径
//           use: [ //指定具体的loader,一组链式loader按相反顺序执行
//             MiniCssExtractPlugin.loader,
//             'css-loader'
//           ]
//         },
//         {
//           test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//           exclude: /(node_modules)/, //提高构建速度
//           use: {
//             loader: 'url-loader',
//             options: {
//               limit: 20000,                    //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//               name: 'img/[name].[hash].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//               publicPath: './'                 //打包后引用地址(相对name)
//             }
//           }
//         },
//         {
//           test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//           exclude: /(node_modules)/,
//           use: {
//             loader: 'url-loader',
//             options: {
//               limit: 20000, 
//               name: 'fonts/[name].[hash].[ext]',
//               publicPath: '../'
//             }
//           }
//         },
//         {
//           test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//           exclude: /(node_modules)/,
//           use: {
//             loader: 'url-loader',
//             options: {
//               limit: 20000, 
//               name: 'media/[name].[hash].[ext]',
//               publicPath: './'
//             }
//           }
//         },
//         {
//           test: /\.md$/,
//           use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//         }
//       ]
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         filename: 'index.html', //文件名
//         title: 'Webpack',       //title属性
//         meta: {                 //meta标签
//           viewPort: 'width=device-width'
//         }
//       }),
//       new RemoveCommentsPlugin(),
//       new webpack.IgnorePlugin({ //构建时忽略指定目录
//         resourceRegExp: /^\.\/locale$/,
//         contextRegExp: /moment$/
//       }),
//       new MiniCssExtractPlugin({
//         filename: 'css/[name].[contenthash].css',     //入口文件中引入的CSS文件
//         chunkFilename: 'css/[name].[contenthash].css' //入口文件中未引入,通过按需加载引入的CSS文件
//       }),
//       new webpack.HashedModuleIdsPlugin(), //固定hash之后的文件路径作为moduleId
//       new webpack.NamedChunksPlugin(chunk => { //固定chunkId
//         if (chunk.name) {
//           return chunk.name;
//         }
//         const modules = Array.from(chunk.modulesIterable);
//         if (modules.length > 1) {
//           const hash = require("hash-sum");
//           const joinedHash = hash(modules.map(m => m.id).join("_"));
//           let len = nameLength;
//           while (seen.has(joinedHash.substr(0, len))) len++;
//           seen.add(joinedHash.substr(0, len));
//           return `chunk-${joinedHash.substr(0, len)}`;
//         } else {
//           return modules[0].id;
//         }
//       }),
//       new ScriptExtHtmlWebpackPlugin({ //将提取的manifest内联到index.html
//         inline: /runtime\..*\.js$/
//       })
//     ],
//     optimization: {
//       minimizer: [
//         // new UglifyJsWebpackPlugin(), //压缩JS文件
//         new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
//       ],
//       runtimeChunk: 'single', //提取manifest
//       splitChunks: { //codeSplitting
//         chunks: 'all',
//         cacheGroups: {
//           libs: { //基础类库
//             name: 'chunk-libs',
//             test: /[\\/]node_modules[\\]/,
//             priority: 10,
//             chunks: 'initial' //只打包初始时依赖的第三方
//           },
//           elementUI: { //UI组件库
//             name: 'chunk-elementUI', //elementUI单独拆包
//             test: /[\\]node_modules[\\]element-ui[\\]/, //权重需大于libs和app不然会被打包进libs或app
//             priority: 20,
//           },
//           commons: { //自定义组件/函数
//             name: 'chunk-commons',
//             test: path.resolve(__dirname, 'src/components'),
//             priority: 5,
//             minChunks: 3, //最小共用次数
//             reuseExistingChunk: true
//           }
//         }
//       }
//     }
//   }

//   // 开发环境下的特殊配置
//   if (env === 'development') {
//     config.mode = 'development'
//     config.devtool = 'cheap-eval-module-source-map',
//     config.devServer = {
//       port: '8081',
//       open: true,
//       // hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
//       overlay: { errors: true, warnings: false },
//     },
//     config.plugins = [
//       ...config.plugins,
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify('development')
//       }),
//       // new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
//     ]
//   }

//   // 生产环境下的特殊配置
//   if (env === 'production') {
//     config.mode = 'production'
//     config.devtool = 'none',
//     config.plugins = [
//       ...config.plugins,
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify('production')
//       }),
//       new CleanWebpackPlugin(),
//     ]
//   }
//   return config
// }
