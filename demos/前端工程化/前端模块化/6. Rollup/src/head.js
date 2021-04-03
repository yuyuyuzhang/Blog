// 导出一个箭头函数
export default () => {
  const element = document.createElement('h2')
  element.textContent = 'Hello Rollup'
  element.addEventListener('click', () => alert('Hello Rollup'))
  return element
}