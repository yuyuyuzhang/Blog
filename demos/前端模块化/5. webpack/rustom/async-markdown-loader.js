// 导出一个处理函数
module.exports = function(source){
  console.log(source)

  // 获取 callback() 函数（箭头函数取不到 this），通过 Webpack 异步返回
  const cb = this.async()

  new Promise(resolve => {
    setTimeout(() => {
      resolve("console.log('<h1>hello async-markdown-loader</h1>')")
    }, 3000);
  }).then(res => {
    // 必须返回 JS 代码
    cb(null, res)
  })
}