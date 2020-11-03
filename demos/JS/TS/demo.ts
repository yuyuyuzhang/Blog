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


// function f(): void {
//     const args: IArguments = arguments
// }
// const a: NodeList = document.querySelectorAll('div');
// const b: HTMLCollection = document.getElementsByClassName('red');


// //基本数据类型
// const arr1: any[] = [void 1, new Error(), undefined, null, true, 0, 'a', { a: 1 }, [1, 2], new Date(), /12/g, , function f(): void { console.log(1) }];
// const arr2: void[] = [undefined, void 1];
// const arr3: undefined[] = [undefined, void 1];
// const arr4: null[] = [null, null];
// const arr5: boolean[] = [true, false];
// const arr6: number[] = [1, 2];
// const arr7: string[] = ['a', 'b'];
// const arr8: symbol[] = [Symbol.for('a'), Symbol.for('b')];

// //引用数据类型
// const arr9: object[] = [{ a: 1 }, [1, 2], new Date(), /12/g, function f(): void { console.log(1) }];


// const tuple: [void, symbol, object] = [undefined, Symbol.for('a'), [1, 2]]
// tuple[3] = undefined; //error: 长度为 3 的元组类型 void|symbol|obejct 在索引 3 处没有元素


// enum Color { red, blue, green };
// console.log(Color['red'] === 0);
// console.log(0 === Color['red']);


enum Color { red = 4, blue = 3, green };
console.log(Color['red'] === 4);
console.log(4 === Color['red']);
console.log(Color['green'] === 4);
console.log(4 === Color['green']);


// const a: Boolean = new Boolean(true);
// const b: Number = new Number(1);
// const c: String = new String('a');


// const a: Map<string, number> = new Map([['a', 1], ['b', 2]]);
// const b: WeakMap<object, number> = new WeakMap([[{ a: 1 }, 1], [{ b: 2 }, 2]])
// const c: Set<number> = new Set([1, 2, 3]);
// const d: WeakSet<object> = new WeakSet([{ a: 1 }, [1, 2]]);
// const e: Date = new Date();
// const f: RegExp = /12/g;


// const a: Error = new Error();
// const b: Event = new Event('a');
// const c: Document = document;
// const d: HTMLElement = document.body;


// const a: any = 'aaaaa';
// const len: number = (a as string).length;

