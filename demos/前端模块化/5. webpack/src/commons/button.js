// 副作用代码
console.log('Button component')

export const Button = () => {
  const button = document.createElement('button')
  button.innerHTML = '按钮-common'
  return button
}