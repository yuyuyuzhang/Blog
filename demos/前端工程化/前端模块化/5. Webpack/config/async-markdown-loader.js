// 此处不能使用箭头函数，否则函数内部取不到正确的 this
module.exports = function(source) {
  // this.callback(
  //   err: Error | null,
  //   content: string | Buffer,
  //   sourceMap?: SourceMap,
  //   meta?: any
  // );
  const cb = this.async()

  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 3000)
  }).then(res => {
    cb(null, `console.log("${source}")`)
  })
}
