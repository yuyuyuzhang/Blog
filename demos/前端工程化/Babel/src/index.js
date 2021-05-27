const f = a => console.log(a + 1)
f()

new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('我是小可爱')
  }, 1000)
}).then(res => console.log(res))

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
