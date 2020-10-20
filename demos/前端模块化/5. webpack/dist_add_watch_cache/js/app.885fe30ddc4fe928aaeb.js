(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

"7q1d":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("./media/movie.3b89bb898dd9d9de98e0fd29c8075e2d.mp4");

}),

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

"cXID":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Link; });
// 副作用代码
console.log('Link component')

const Link = () => {
  const a = document.createElement('a')
  a.innerHTML = '链接-common'
  return a
}

}),

"gdao":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 导出一个箭头函数
/* harmony default export */ __webpack_exports__["a"] = (() => {
  const element = document.createElement('h2')
  element.textContent = 'Hello Webpack'
  element.addEventListener('click', () => alert('Hello Webpack'))
  
  // 测试 JS 文件 HMR
  // console.log(555)
  
  return element 
});

}),

"opCo":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* unused harmony export Link */
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

}),

"tjUo":
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("gdao");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("OMi8");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _public_movie_mp4__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7q1d");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("J2m7");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("opCo");
/* harmony import */ var _commons_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("cXID");
/* harmony import */ var _numPad_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("Rok0");
/* harmony import */ var _numPad_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_numPad_js__WEBPACK_IMPORTED_MODULE_7__);

const heading = Object(_head_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])()
document.body.append(heading)

// 导入其他类型资源 ( CSS、图片、字体 )


// 导入其他类型资源 ( 多媒体 )

const video = document.createElement('video')
video.src = _public_movie_mp4__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
video.controls = 'controls'
document.body.append(video)

// 导入 .md 文件


// 添加 textarea 输入框
const text = document.createElement('textarea')
document.body.append(text)

// 测试 watch 模式
// console.log('watch 模式')

// head.js HMR 处理函数
let lastHeading = heading
if (false) {}

// IngorePlugin

__webpack_require__.e(/* import() */ "XDpg").then(__webpack_require__.t.bind(null, "XDpg", 7)) //手动引入所需的语言包
moment__WEBPACK_IMPORTED_MODULE_3___default.a.locale('zh-cn');
let r = moment__WEBPACK_IMPORTED_MODULE_3___default()().endOf('day').fromNow();
console.log(r)

// 测试按需引入模块内导出
// import _ from 'lodash'; // 全部引入
 //按需引入
const users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred', 'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1, 'active': true }
]
const res = lodash_find__WEBPACK_IMPORTED_MODULE_4___default()(users, o => o.age < 40)
console.log('res', res)

// Tree-shaking

document.body.appendChild(Object(_component_js__WEBPACK_IMPORTED_MODULE_5__[/* Button */ "a"])())

// sideEffects
// 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
// index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行

document.body.appendChild(Object(_commons_index_js__WEBPACK_IMPORTED_MODULE_6__[/* Link */ "a"])())

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