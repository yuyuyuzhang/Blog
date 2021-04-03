// 副作用代码
console.log('Link component')

export const Link = () => {
  const a = document.createElement('a')
  a.innerHTML = '链接-common'
  return a
}