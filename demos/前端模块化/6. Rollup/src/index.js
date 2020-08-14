import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

import { name, version } from '../json/data.json'
console.log(name, version)

// from 后跟模块名导入
// import { camelCase } from 'lodash-es'
// console.log(camelCase('hello Rollup'))

// 存在跨域问题
import('lodash-es').then(() => {
  console.log(camelCase('hello Rollup'))
})