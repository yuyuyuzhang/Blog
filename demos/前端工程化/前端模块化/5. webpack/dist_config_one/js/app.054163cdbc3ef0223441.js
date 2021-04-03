(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

"OMi8":
(function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

}),

"Rok0":
(function(module, exports) {

// 为 Number 的原型添加一个扩展方法
Number.prototype.pad = function (size) {
  const leadingZeros = Array(size + 1).join(0)
  return leadingZeros + this
}

}),

"tjUo":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/head.js
// 导出一个箭头函数
/* harmony default export */ var head = (() => {
  const element = document.createElement('h2')
  element.textContent = 'Hello Webpack'
  element.addEventListener('click', () => alert('Hello Webpack'))
  
  // 测试 JS 文件 HMR
  // console.log(555)
  
  return element 
});
// EXTERNAL MODULE: ./src/style.css
var style = __webpack_require__("OMi8");

// CONCATENATED MODULE: ./public/movie.mp4
/* harmony default export */ var movie = ("./media/movie.3b89bb898dd9d9de98e0fd29c8075e2d.mp4");
// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("wd/R");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/lodash/find.js
var find = __webpack_require__("J2m7");
var find_default = /*#__PURE__*/__webpack_require__.n(find);

// CONCATENATED MODULE: ./src/component.js
const Button = () => {
  const button = document.createElement('button')
  button.innerHTML = '按钮-component'
  return button
}
// 未引用代码
const Link = () => {
  const a = document.createElement('a')
  a.innerHTML = '链接-component'
  return a
}
// CONCATENATED MODULE: ./src/commons/link.js
// 副作用代码
console.log('Link component')

const link_Link = () => {
  const a = document.createElement('a')
  a.innerHTML = '链接-common'
  return a
}
// EXTERNAL MODULE: ./src/numPad.js
var numPad = __webpack_require__("Rok0");

// CONCATENATED MODULE: ./src/index.js

const heading = head()
document.body.append(heading)

// 导入其他类型资源 ( CSS、图片、字体 )


// 导入其他类型资源 ( 多媒体 )

const video = document.createElement('video')
video.src = movie
video.controls = 'controls'
document.body.append(video)

// 导入 .md 文件


// 添加 textarea 输入框
const src_text = document.createElement('textarea')
document.body.append(src_text)

// 测试 watch 模式
// console.log('watch 模式')

// head.js HMR 处理函数
let lastHeading = heading
if (false) {}

// IngorePlugin

__webpack_require__.e(/* import() */ "XDpg").then(__webpack_require__.t.bind(null, "XDpg", 7)) //手动引入所需的语言包
moment_default.a.locale('zh-cn');
let r = moment_default()().endOf('day').fromNow();
console.log(r)

// 测试按需引入模块内导出
// import _ from 'lodash'; // 全部引入
 //按需引入
const users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred', 'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1, 'active': true }
]
const res = find_default()(users, o => o.age < 40)
console.log('res', res)

// Tree-shaking

document.body.appendChild(Button())

// sideEffects
// 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
// index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行

document.body.appendChild(link_Link())

// sideEffects 必要的副作用

console.log((8).pad(3))

// 按需加载
const btn1 = document.createElement('button')
const btn2 = document.createElement('button')
btn1.innerHTML = '显示按钮'
btn2.innerHTML = '显示链接'
document.body.append(btn1)
document.body.append(btn2)
btn1.addEventListener('click', function(e){
  __webpack_require__.e(/* import() */ "QAPJ").then(__webpack_require__.bind(null, "QAPJ"))
    .then(({Button}) => {
      document.body.append(Button())
    })
})
btn2.addEventListener('click', function(e){
  __webpack_require__.e(/* import() */ "MZRe").then(__webpack_require__.bind(null, "MZRe"))
    .then(({Button}) => {
      document.body.appendChild(Button())
    })
})

// 测试增量构建
console.log('增量构建')

})

},[["tjUo","runtime","chunk-libs"]]]);