const f = () => {
  const element = document.createElement('textarea')

  // 保存后自动编译打包 - watch
  // console.log('watch 模式')

  // 保存后自动编译打包且自动刷新浏览器 - devServer
  // HMR
  element.style.color = 'blue'

  return element
}

// Tree Shaking
const trim = str => str.trim()

export { f, trim }
