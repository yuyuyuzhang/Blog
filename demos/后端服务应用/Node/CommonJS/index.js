const modulePerson = require('./person.js')
const { count, incCount } = require('./count.js')

console.log(modulePerson) //[Function (anonymous)]

console.log(count) //1
incCount()
console.log(count) //1，count 模块内部的变化无法影响输出的变量
