const Title = document.createElement('h2')
Title.textContent = 'Hello Webpack'
document.body.append(Title)

import createTextarea from './components/textarea.js'
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
