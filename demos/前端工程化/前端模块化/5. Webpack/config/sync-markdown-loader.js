// 导出一个处理函数
module.exports = function(source) {
  // 必须返回 JS 代码
  return `console.log("${source}")`
}
