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


const path = require('path')
const config = {
  mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist_loader')
  },
  module: {
    rules: [
      {
        test: /\.css$/,   //正则匹配文件路径
        use: [            //指定具体的loader,多个loader需要注意顺序
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
module.exports = config