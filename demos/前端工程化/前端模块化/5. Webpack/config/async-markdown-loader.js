// 此处不能使用箭头函数，否则函数内部取不到正确的 this
module.exports = function(source) {
  console.log('source:', source) // 以字符串的形式获取资源 "# Hello markdown"

  // 获取 callback() 函数
  const cb = this.async()

  new Promise(resolve => {
    setTimeout(() => {
      resolve('hello async-markdown-loader')
    }, 1000)
  }).then(res => {
    // cb(null, res)
    cb(res)
  })
}
