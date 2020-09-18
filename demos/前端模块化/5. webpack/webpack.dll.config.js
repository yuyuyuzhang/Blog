const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    // vendor: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui'] // 推荐将vue全家桶单独打包
    vendor: ['vue'],
  },
  output: {
    path: path.join(__dirname, 'dist_DllPlugin/dll'),
    filename: '[name].dll.js',
    library: '[name]_dll_[hash]'
  },
  plugins: [
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist_DllPlugin/dll', '[name].manifest.json'),
      name: '[name]_dll_[hash]',
      context: __dirname
    })
  ]
}