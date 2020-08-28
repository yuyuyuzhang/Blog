(function(modules) { // webpackBootstrap
	// The module cache
	var installedModules = {};
	// The require function
	function __webpack_require__(moduleId) {
		// Check if module is in cache
		if(installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		};
		// Execute the module function
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}
	// expose the modules object (__webpack_modules__)
	__webpack_require__.m = modules;
	// expose the module cache
	__webpack_require__.c = installedModules;
	// define getter function for harmony exports
	__webpack_require__.d = function(exports, name, getter) {
		if(!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, { enumerable: true, get: getter });
		}
	};
	// define __esModule on exports
	__webpack_require__.r = function(exports) {
		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
		}
		Object.defineProperty(exports, '__esModule', { value: true });
	};
	// create a fake namespace object
	// mode & 1: value is a module id, require it
	// mode & 2: merge all properties of value into the ns
	// mode & 4: return value when already ns object
	// mode & 8|1: behave like require
	__webpack_require__.t = function(value, mode) {
		if(mode & 1) value = __webpack_require__(value);
		if(mode & 8) return value;
		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
		var ns = Object.create(null);
		__webpack_require__.r(ns);
		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
		return ns;
	};
	// getDefaultExport function for compatibility with non-harmony modules
	__webpack_require__.n = function(module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};
	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__
	__webpack_require__.p = "";
	// Load entry module and return exports
	return __webpack_require__(__webpack_require__.s = 10);
})
([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _public_movie_mp4__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _commons_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);

const heading = Object(_head_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])()
document.body.append(heading)

// 导入其他类型资源 ( CSS、图片、字体 )

// 导入其他类型资源 ( 媒体 )
const video = document.createElement('video')
video.src = _public_movie_mp4__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]
video.controls = 'controls'
document.body.append(video)

// 导入 .md 文件

// 添加 textarea 输入框
const text = document.createElement('textarea')
document.body.append(text)

// head.js HMR 处理函数
let lastHeading = heading
if (false) {}

// Tree-shaking
document.body.appendChild(Object(_component_js__WEBPACK_IMPORTED_MODULE_2__[/* Button */ "a"])())

// sideEffects
// 虽然只希望载入 Link 模块，但实际上载入的是 common/index.js 文件，
// index.js 文件中又载入了 common 目录下的所有组件模块，这会导致所有组件模块都被加载执行
document.body.appendChild(Object(_commons_index_js__WEBPACK_IMPORTED_MODULE_3__[/* Link */ "a"])())

}),
/* 11 */
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
/* 12 */
(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("./media/movie.mp4");

}),
/* 13 */
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
/* 14 */
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

})
]);