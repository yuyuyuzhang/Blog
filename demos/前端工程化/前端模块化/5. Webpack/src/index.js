const Title = document.createElement('h2')
Title.textContent = 'Hello Webpack'
document.body.append(Title)

// import createTextarea from './components/textarea.js'
import { f as createTextarea } from './components/textarea.js' // Tree Shaking
const Textarea = createTextarea()
document.body.append(Textarea)

// HMR 处理函数
let lastTextarea = Textarea
if (module.hot) { // 加上判断防止未开启 HMR 时没有 module.hot API 导致打包出错
  module.hot.accept('./components/textarea.js', () => {
    const value = lastTextarea.value
    document.body.removeChild(lastTextarea)
    lastTextarea = createTextarea()
    lastTextarea.value = value
    document.body.append(lastTextarea)
  })
}

// 加载 CSS 模块
import './style/index.css'

// 加载多媒体模块
import movie from './assets/movie.mp4'
const video = document.createElement('video')
video.src = movie
video.controls = 'controls'
document.body.append(video)

// 加载 JSON 模块
import Person from './assets/data1.json'
console.log(Person)

// 加载 XML 模块
import Info from './assets/data2.xml'
console.log(Info)

// 加载 markdown 模块
import Hello from './md/hello.md'
console.log(Hello)

// 按需引入模块
const btn = document.createElement('button')
btn.innerHTML = '显示链接'
document.body.append(btn)
btn.addEventListener('click', e => {
  import('./components/link.js')
    .then(Link => {
      document.body.append(Link.default)
    })
})

// // IngorePlugin
// import moment from 'moment'
// import('moment/locale/zh-cn') //手动引入所需的语言包
// moment.locale('zh-cn');
// let r = moment().endOf('day').fromNow();
// console.log(r)

// // 测试按需引入模块内导出
// // import _ from 'lodash'; // 全部引入
// import find from 'lodash/find'; //按需引入
// const users = [
//   { 'user': 'barney', 'age': 36, 'active': true },
//   { 'user': 'fred', 'age': 40, 'active': false },
//   { 'user': 'pebbles', 'age': 1, 'active': true }
// ]
// const res = find(users, o => o.age < 40)
// console.log('res', res)

// // Tree-shaking
// import { Button } from './component.js'
// document.body.appendChild(Button())

// // sideEffects
// // 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
// // index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
// import { Link } from './commons/index.js'
// document.body.appendChild(Link())

// // sideEffects 必要的副作用
// import './numPad.js'
// console.log((8).pad(3))

