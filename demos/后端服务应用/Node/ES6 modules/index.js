import person from './person.js'
import { count, incCount } from './count.js'

// console.log(person) //{ name: '张三', age: 20 }

// console.log(count) //1
// incCount()
// console.log(count) //2

// process
console.log(process.cwd()) //"E:\Blog\demos\后端服务应用\Node\ES6 modules"

console.log(process.chdir("E:\\Blog\\demos\\后端服务应用\\Node\\ES6 modules\\file"))
console.log(process.cwd()) //"E:\Blog\demos\后端服务应用\Node\ES6 modules\file"