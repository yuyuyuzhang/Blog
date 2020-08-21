// const path = require('path')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_none')
//   }
// }
// module.exports = config


// const path = require('path')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_css_style_loader')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       }
//     ]
//   }
// }
// module.exports = config


// const path = require('path')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_md_loader')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_clean_plugin')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(), //clean-webpack-plugin插件
//   ]
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_html_plugin')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(), //clean-webpack-plugin插件
//     new HtmlWebpackPlugin({ //html-webpack-plugin插件
//       filename: 'index.html',
//       title: 'Webpack',
//       meta: {
//         viewPort: 'width=device-width'
//       }
//     }),
//   ]
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_copy_plugin')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'index.html', //文件名
//       title: 'Webpack',       //title属性
//       meta: {                 //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: './public' } //需要拷贝的目录或者路径通配符
//       ]
//     })
//   ]
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_comments_plugin')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'index.html', //文件名
//       title: 'Webpack',       //title属性
//       meta: {                 //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: './public' } //需要拷贝的目录或者路径通配符
//       ]
//     }),
//     new RemoveCommentsPlugin()
//   ]
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_devServer')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       },
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为向后兼容版本的ES5代码
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'index.html', //文件名
//       title: 'Webpack',       //title属性
//       meta: {                 //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//     new RemoveCommentsPlugin()
//   ],
//   devServer: {
//     host: '10.20.15.72',
//     port: '8081',
//     open: true,
//     overlay: {errors: true, warnings: false},
//   },
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'cheap-module-eval-source-map.js',
//     path: path.join(__dirname, 'cheap-module-eval-source-map')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       },
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为向后兼容版本的ES5代码
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'cheap-module-eval-source-map.html', //文件名
//       title: 'Webpack',         //title属性
//       meta: {                   //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//     new RemoveCommentsPlugin()
//   ],
//   devServer: {
//     host: '10.20.15.72',
//     port: '8081',
//     open: true,
//     overlay: {errors: true, warnings: false},
//     contentBase: './public'
//   },
//   devtool: 'cheap-module-eval-source-map'
// }
// module.exports = config


const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
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
    contentBase: './public'
  },
  devtool: 'cheap-module-eval-source-map'
}
module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_HMR')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,   //正则匹配文件路径
//         use: [            //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: './markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       },
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为向后兼容版本的ES5代码
//           options: {
//             presets: ['@babel/preset-env']
//           }
//         }
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'index.html', //文件名
//       title: 'Webpack',       //title属性
//       meta: {                 //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//     new RemoveCommentsPlugin()
//   ],
//   devServer: {
//     host: '10.20.15.72',
//     port: '8081',
//     open: true,
//     overlay: {errors: true, warnings: false},
//     contentBase: './public'
//   },
//   devtool: 'cheap-module-eval-source-map'
// }
// module.exports = config