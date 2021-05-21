const webpack = require('webpack')
const path = require('path')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = (env, argv) => {
  const config = {
    mode: argv.nodeEnv,
    devtool: argv.nodeEnv == 'development' ? 'eval-cheap-module-source-map' : false,
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
    module: {
      rules: [
        {
          test: /\.css$/i, // 正则匹配文件路径
          include: [resolve('src')],
          // exclude: /(node_modules)/, //提高构建速度
          use: ["style-loader", "css-loader"] // 一组链式 loader 按相反顺序执行
        },
      ]
    }
  }

  // 开发环境
  if (argv.nodeEnv === 'development') {
    config.devServer = {
      port: '8081',
      // open: true,
      hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
      overlay: { errors: true, warnings: false },
    }
    // config.plugins = [
    //   ...config.plugins,
    //   // new webpack.HotModuleReplacementPlugin(), //HMR 特性必需的插件，与 chunkhash/contenthash 冲突
    // ]
  }

  return config
}

// module.exports = () => {
//   //公共配置
//   const config = {
//     mode: JSON.stringify(env),
//     devtool: env === 'development' ? 'cheap-eval-module-source-map' : 'none',
//     entry: {
//       app: './src/index.js'
//     },
//     output: {
//       filename: 'js/[name].[chunkhash].js',
//       path: path.join(__dirname, 'dist_aaa')
//     },
//     resolve: {
//       alias: {
//         '@': path.join(__dirname, 'src')
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
//   }

//   // 开发环境
//   if (env === 'development') {
//     config.devServer = {
//       port: '8081',
//       open: true,
//       hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
//       overlay: { errors: true, warnings: false },
//     },
//     config.plugins = [
//       ...config.plugins,
//       // new webpack.HotModuleReplacementPlugin(), //HMR 特性必需的插件，与 chunkhash/contenthash 冲突
//     ]
//   }

//   // 生产环境
//   if (env === 'production') {
//     config.plugins = [
//       ...config.plugins,
//       new CleanWebpackPlugin(),
//     ]
//   }
//   return config
// }