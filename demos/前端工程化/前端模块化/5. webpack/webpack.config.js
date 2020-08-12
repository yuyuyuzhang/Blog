const config = {
  mode: 'none', //不做任何额外工作的原始打包，方便阅读打包后的JS文件代码
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}

module.exports = config