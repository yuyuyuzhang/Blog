import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

// 导入其他类型资源 ( CSS、图片、字体 )
import './style.css'

// 导入其他类型资源 ( 音视频 )
const video = document.createElement('video')
video.src = "./movie.mp4"
document.body.append(video)

// // 导入 .md 文件
// import title from './title.md'

// // 添加 textarea 输入框
// const text = document.createElement('textarea')
// document.body.append(text)

// // head.js HMR 处理函数
// let lastHeading = heading
// if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
//   module.hot.accept('./head.js', function(){
//     console.log(222, createHeading)
//     document.body.removeChild(lastHeading)
//     lastHeading = createHeading()
//     document.body.append(lastHeading)
//   })
// }

// // Tree-shaking
// import { Button } from './component.js'
// document.body.appendChild(Button())

// // sideEffects
// // 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
// // index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
// import { Link } from './commons/index.js'
// document.body.appendChild(Link())

// // sideEffects 必要的副作用
// import './numPad.js' // 内部包含影响全局的副作用
// console.log((8).pad(3))

// // Code-Splitting
// const btn1 = document.createElement('button')
// const btn2 = document.createElement('button')
// btn1.innerHTML = '显示按钮'
// btn2.innerHTML = '显示链接'
// document.body.append(btn1)
// document.body.append(btn2)
// btn1.addEventListener('click', function(e){
//   import('./codeSplitting/buttonA.js')
//     .then(({Button}) => {
//       document.body.append(Button())
//     })
// })
// btn2.addEventListener('click', function(e){
//   import('./codeSplitting/buttonB.js')
//     .then(({Button}) => {
//       document.body.appendChild(Button())
//     })
// })