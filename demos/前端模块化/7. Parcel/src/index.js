import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

// 导入其他类型资源
import './style.css'

// 自动安装依赖
// import $ from 'query'

// 动态导入
// import('jquery').then($ => {
//   $(document.body).append('<h1>我是小可爱</h1>')
// })

// 检查 HMR API 是否存在
if(module.hot){
  module.hot.accept(() => {
    console.log('HMR')
  })
}
