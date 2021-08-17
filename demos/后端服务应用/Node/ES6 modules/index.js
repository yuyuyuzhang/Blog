import person from './person.js'
import { count, incCount } from './count.js'

console.log(person) //{ name: '张三', age: 20 }

console.log(count) //1
incCount()
console.log(count) //2

