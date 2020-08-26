export const Button = () => {
  const button = document.createElement('button')
  button.innerHTML = '按钮-component'
  return button
}
// 未引用代码
export const Link = () => {
  const a = document.createElement('a')
  a.innerHTML = '链接-component'
  return a
}