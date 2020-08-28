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
//     path: path.join(__dirname, 'dist_url_loader_img')
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
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
//     path: path.join(__dirname, 'dist_url_loader_font')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
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
//     path: path.join(__dirname, 'dist_url_loader_media')
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
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
//     path: path.join(__dirname, 'dist_sync_md_loader')
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性既可以使用模块名称,也可以使用模块路径
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
//     path: path.join(__dirname, 'dist_async_md_loader')
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/async-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(), //clean-webpack-plugin插件
//     new HtmlWebpackPlugin({   //html-webpack-plugin插件
//       filename: 'index.html', //文件名
//       title: 'Webpack',       //title属性
//       meta: {                 //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//   ]
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   ]
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       },
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
//     port: '8081',
//     open: true,
//     overlay: {errors: true, warnings: false},
//   },
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_cheap_module_eval_source_map')
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
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//     port: '8081',
//     open: true,
//     overlay: {errors: true, warnings: false},
//   },
//   devtool: 'cheap-module-eval-source-map'
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_no_HMR')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提高构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//     port: '8081',
//     open: true,
//     overlay: { errors: true, warnings: false },
//   },
//   devtool: 'none' //构建速度很快，方便观察页面变化
// }
// module.exports = config


// const webpack = require('webpack')
// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
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
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//     new RemoveCommentsPlugin(),
//     new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
//   ],
//   devServer: {
//     port: '8081',
//     open: true,
//     hot: true, //HMR
//     overlay: { errors: true, warnings: false },
//   },
//   devtool: 'none' //构建速度很快，方便观察页面变化
// }
// module.exports = config


// const webpack = require('webpack')
// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
//   entry: {
//     app: './src/index.js'
//   },
//   output: { //devServer在内存中构建，不会产生dist文件夹写入磁盘
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_HMR_hotOnly')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//     new RemoveCommentsPlugin(),
//     new webpack.HotModuleReplacementPlugin() //HMR特性必需的插件
//   ],
//   devServer: {
//     port: '8081',
//     open: true,
//     hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
//     overlay: { errors: true, warnings: false },
//   },
//   devtool: 'none' //构建速度很快，方便观察页面变化
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'production',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_treeShaking_prod')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none' //构建速度很快，方便观察页面变化
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_treeShaking_none_usedExports')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true, //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_treeShaking_none_minimize')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       filename: 'index.html', //文件名
//       title: 'Webpack', //title属性
//       meta: { //meta标签
//         viewPort: 'width=device-width'
//       }
//     }),
//     new RemoveCommentsPlugin()
//   ],
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true, //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: true //压缩打包结果(摇下枯树枝、树叶)
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_treeShaking_none_concatenateModules')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true, //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: false, //暂不压缩打包结果,压缩后不方便阅读代码
//     concatenateModules: true, //打包结果中尽可能合并所有模块到一个函数中(合并可用树枝、树叶)
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_sideEffects_none_usedExports')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true,         //打包结果中的模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
//     concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin} = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_sideEffects_none')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
//     concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
//     sideEffects: true,         //无副作用打包
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_sideEffects_none_numPad')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
//     concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
//     sideEffects: true,         //无副作用打包
//   }
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin} = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.join(__dirname, 'dist_importDemand_none')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,             //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'          //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
//     concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
//     sideEffects: true,         //无副作用打包
//   },
// }
// module.exports = config


// const path = require('path')
// const { CleanWebpackPlugin} = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// const config = {
//   mode: 'none',
//   entry: {
//     app: './src/index.js'
//   },
//   output: {
//     filename: 'js/[name].[chunkhash].js',
//     path: path.join(__dirname, 'dist_hash_and_css')
//   },
//   resolve: {
//     alias: {
//       '@': path.join(__dirname, '..', 'src')
//     },
//     extensions: ['.js', '.json', '.vue']
//   },
//   module: {
//     rules: [{
//         test: /\.css$/, //正则匹配文件路径
//         use: [ //指定具体的loader,一组链式loader按相反顺序执行
//           'style-loader',
//           'css-loader'
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//         exclude: /(node_modules)/, //提供构建速度
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000,                    //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//             name: 'img/[name].[hash].[ext]', //文件名合并资源文件输出目录(相对dist目录)
//             publicPath: './'                 //打包后引用地址(相对name)
//           }
//         }
//       },
//       {
//         test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'fonts/[name].[hash].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'url-loader',
//           options: {
//             limit: 20000, 
//             name: 'media/[name].[hash].[ext]',
//             publicPath: './'
//           }
//         }
//       },
//       {
//         test: /\.md$/,
//         use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
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
//     new RemoveCommentsPlugin(),
//     new MiniCssExtractPlugin({
//       filename: 'css/[name].[contenthash].css',     //入口文件中引入的CSS文件
//       chunkFilename: 'css/[name].[contenthash].css' //入口文件中未引入,通过按需加载引入的CSS文件
//     })
//   ],
//   devtool: 'none', //构建速度很快，方便观察页面变化
//   optimization: {
//     usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
//     minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
//     concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
//     sideEffects: true,         //无副作用打包
//     minimizer: [
//       new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
//     ]
//   },
// }
// module.exports = config


const path = require('path')
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { dirname } = require('path')
const config = {
  mode: 'none',
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.join(__dirname, 'dist_test')
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',     //入口文件中引入的CSS文件
      chunkFilename: 'css/[name].[contenthash].css' //入口文件中未引入,通过按需加载引入的CSS文件
    })
  ],
  devtool: 'none', //构建速度很快，方便观察页面变化
  optimization: {
    usedExports: true,         //打包结果中模块只导出外部用到的成员(标记枯树枝、树叶)
    minimize: false,           //暂不压缩打包结果,压缩后不方便阅读代码
    concatenateModules: false, //暂不合并可用模块,合并后不容易找到对应模块
    sideEffects: true,         //无副作用打包
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin() //压缩CSS文件
    ],
    splitChunks: {
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
          test: path.resolve(dirname, 'src/components'),
          priority: 5,
          minChunks: 3, //最小共用次数
          reuseExistingChunk: true
        }
      }
    }
  },
}
module.exports = config


// const webpack = require('webpack')
// const path = require('path')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const RemoveCommentsPlugin = require('./rustom/remove-comments-plugin.js')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// module.exports = (env, argv) => {
//   //公共配置
//   const config = {
//     entry: {
//       app: './src/index.js'
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
//             'style-loader',
//             'css-loader'
//           ]
//         },
//         {
//           test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //加载图片
//           use: {
//             loader: 'url-loader',
//             options: {
//               limit: 20000, //文件小于20KB url-loader将文件转换为DataURL,否则file-loader拷贝文件到输出目录
//               name: '[name].[ext]',
//               outputPath: 'img/', //资源文件输出目录
//               publicPath: './img/' //打包后引用地址
//             }
//           }
//         },
//         {
//           test: /\.(woff2|eot|ttf|otf)(\?.*)?$/, //加载字体
//           use: {
//             loader: 'url-loader',
//             options: {
//               limit: 20000,
//               name: '[name].[ext]',
//               outputPath: 'fonts/', 
//               publicPath: './fonts/'
//             }
//           }
//         },
//         {
//           test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)(\?.*)?$/, //加载多媒体
//           use: {
//             loader: 'url-loader',
//             options: {
//               limit: 20000,
//               name: '[name].[ext]',
//               outputPath: 'media/', 
//               publicPath: './media/'
//             }
//           }
//         },
//         {
//           test: /\.md$/,
//           use: './rustom/sync-markdown-loader.js' //use属性即可以使用模块名称,也可以使用模块路径
//         },
//         {
//           test: /\.js$/,
//           include: path.resolve(__dirname, "src"),
//           loader: "babel-loader"
//         },
//         // {
//         //   test: /\.js$/,
//         //   use: {
//         //     loader: 'babel-loader', //babel主要用于在旧的浏览器或环境中将ES6代码转换为ES5代码
//         //     options: {
//         //       presets: ['@babel/preset-env']
//         //     }
//         //   }
//         // }
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
//       new webpack.HotModuleReplacementPlugin(), //HMR特性必需的插件
//     ],
//   }
//   // 开发环境下的特殊配置
//   if (env === 'development') {
//     config.mode = 'development'
//     config.devtool = 'cheap-eval-module-source-map',
//     config.devServer = {
//       port: '8081',
//       open: true,
//       hotOnly: true, //避免 JS 模块 HMR 处理函数出现错误导致回退到自动刷新页面
//       overlay: { errors: true, warnings: false },
//     },
//     config.plugins = [
//       ...config.plugins,
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify('development')
//       }),
//     ]
//   }
//   // 生产环境下的特殊配置
//   if (env === 'production') {
//     config.mode = 'production'
//     config.devtool = 'none',
//     config.output = {
//       filename: '[name].bundle.js',
//       path: path.join(__dirname, 'dist_one_config')
//     },
//     config.plugins = [
//       ...config.plugins,
//       new webpack.DefinePlugin({
//         'process.env.NODE_ENV': JSON.stringify('production')
//       }),
//       new CleanWebpackPlugin(), //每次打包前清空dist文件夹
//       new MiniCssExtractPlugin(), //提取CSS代码到单独的CSS文件,通过<link>标签引入到页面
//       new OptimizeCssAssetsWebpackPlugin(), //压缩CSS文件代码
//     ]
//   }
//   return config
// }