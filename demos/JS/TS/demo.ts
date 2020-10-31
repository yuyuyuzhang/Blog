// let a: any = undefined;
// a = null;
// a = 1;
// a = 'aaa';


// let a;
// a = 'aaa';
// a = 111;

// //等价于
// let a: any;
// a = 'aaa';
// a = 111;


// const a: any = undefined
// console.log(a.name)
// console.log(a.getName())


// const a: void = undefined;

// let b: void;
// b = undefined;

// function f(x: void): void {
//   console.log(x)
// }
// f();
// f(undefined);
// f(void 1);


// interface A {
//     type: 'a'
// }
// interface B {
//     type: 'b'
// }
// type All = A | B;
// function handleValue(val: All) {
//     switch (val.type) {
//         case 'a':
//             break
//         case 'b':
//             break
//         default:
//             // val 在这里是 never
//             const c: never = val
//             break
//     }
// }


// const a: undefined = function f1(): never {
//     throw new Error()
// }()


// function f1(): never {
//     throw new Error()
// }
// function f2(): never {
//     while (true) {
//         console.log(111)
//     }
// }


// const a: undefined = undefined;
// const a: null = null;
// const a: boolean = true;
// const a: number = NaN;
// const a: string = 'aaa';
// const a: symbol = Symbol.for('name');


aaa


// let a;
// a = 'aaa';
// a = 111;

// //等价于
// let a: any;
// a = 'aaa';
// a = 111;


// let a: string | number;
// a = 'aaa';
// a = 111;


// const propName2: unique symbol = Symbol.for('hhh');

// interface Person {
//   name: string;
//   age: number;
//   job?: string; //可选属性
//   readonly id: number; //只读属性
//   [propName1: string]: any; //任意string属性，一个接口只能定义一个任意属性，一旦定义则确定属性和可选属性的类型都必须是任意属性类型的子集
//   // [propname: symbol]: any; //error: 微软没有处理这个问题
//   [propName2]: any; //勉强达到任意symbol属性的效果
// }

// //p 的形状必须和 Person 一致，不能少属性也不能多属性
// const p: Person = {
//   name: '张三',
//   age: 20,
//   id: 1,
//   [propName2]: true
// }


// interface Person {
//   name: string;
//   age?: number; //error: string|undefined 不是 string|number 的子集
//   [propName: string]: string | number;
// }


// const arr = ['aaa', 2, true]
// const arr1: number[] = ['aaa', 1]


