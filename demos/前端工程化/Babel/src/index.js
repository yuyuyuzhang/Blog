const [x, y, ...z] = [1]
console.log(x, y, z)

const f = async() => {
  return await new Promise((resolve, reject) => {
    resolve('success')
  })
}
f().then(val => console.log(val))

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
}
const person = new Person('张三', 20)
console.log(person.getName())

import { unique } from './components/base.js'
console.log(unique([1, 1, 2]))
