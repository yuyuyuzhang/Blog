class Person {
    constructor(name, friends){
        this.name = name;
        this.friends = friends;
    }
    sayFriends = () => this.friends
}
const person1 = new Person('张三', ['王五']);
const person2 = new Person('李四', ['赵六']);

export default Person;
export { person1, person2};