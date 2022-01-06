// const ename = new Event('MOUSE_DOWN')
// const target = new EventTarget();

// target.addEventListener(ename, e => {
//   console.log('foo event happened!');
//   console.log(e)
// });
// target.dispatchEvent(ename)

import process from 'process'

console.log(process.argv)
// node index.js
// [
//   'D:\\nvm\\nodejs\\node.exe',
//   'E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\index.js'
// ]


// node index.js a b=2
// [
//   'D:\\nvm\\nodejs\\node.exe',
//   'E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\index.js',
//   'a',
//   'b=2'
// ]

console.log(process.execArgv)
// []