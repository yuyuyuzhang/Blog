# 枚举

枚举类型用于限定取值范围的场景

自动赋值：枚举成员从 `0` 开始自动赋值

```typescript
enum Color {red, blue, green};
console.log(Color['red'] === 0); //true
console.log(0 === Color['red']); //true
```

手动赋值：枚举成员可以手动赋值为`小数、负数、非数字`，并且可以`重复`，未手动赋值项会根据上一项递增 `+1`

```typescript
enum Color {red, blue = 0, green = -1.5, gray = "s"}
console.log(Color['red'] === 0);  //true
console.log(0 === Color['red']);  //true
console.log(Color['blue'] === 0); //true
console.log(0 === Color['blue']); //true
console.log(Color['green']);      //-1.5
console.log(Color['gray'])        //"s"
```

常数项：

```typescript
enum Color {red, blue, green}
```

计算所得项：计算所得项若后跟未手动赋值项，则会因为无法获得初始值而报错

```typescript
enum Color {red, blue, green = "green".length, gray}; //error: Enum member must have initializer
```

常数枚举：只能包含常数项不能包含计算所得项（所有枚举成员可以在编译阶段计算出枚举值），会在使用的地方被`内联`进去，因此会在`编译阶段被删除`

```typescript
const enum Color {red, blue, green};
const directions = [Color.red];

//编译结果如下：
var directions = [0]; //内联
```

普通枚举：可以包含常数项和计算所得项，会`被编译成一个包含双向映射的对象`，引用普通枚举成员总会生成一次`属性访问`并且永远不会被内联

```typescript
enum Color {red, blue, green};
const directions = [Color.red];

//编译结果如下：
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["green"] = 2] = "green";
})(Color || (Color = {}));
var directions = [Color.red]; //属性引用
```

外部枚举：描述`当前环境已经存在`的枚举类型，避免当前环境定义的`相同枚举对象`包含的`相同枚举名称`带来的冲突

外部枚举会在`编译阶段被删除`

```typescript

```

* 外部常数枚举

    ```typescript
    declare const enum Color {red, blue, green};
    const directions = [Color.red];

    //编译结果如下：
    var directions = [0];
    ```

* 外部普通枚举

    ```typescript
    declare enum Color {red, blue, green};
    const directions = [Color.red];

    //编译结果如下：
    var directions = [Color.red];
    ```

# 函数

TS 中函数声明的类型定义，需要考虑到`输入和输出`

* 函数声明

    ```typescript
    function f(x: number, y: number): number {
        return x + y;
    }
    ```

* 函数表达式

    ```typescript
    const f: (x: number, y: number) => number = function (x: number, y: number): number {
        return x + y;
    }
    ```

* 接口定义函数类型

    ```typescript
    interface F {
        (x: number, y: number): number
    }
    const f: F = function(x: number, y: number): number {
        return x + y;
    }
    ```

* 注意事项
  * 不能多参也不能少参

    ```typescript
    function f(x: number, y: number): number {
        return x + y;
    }
    f(1);       //error: Supplied parameters do not match any signature of call target
    f(1, 2);    //3
    f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
    ```

  * 可选参数：可选参数必须在必须参数后面

    ```typescript
    function f(x: number, y?: number): number {
        return y ? x + y : x;
    }
    f(1);       //1
    f(1, 2);    //3
    f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
    ```

  * 参数默认值：TS 会将设置了默认值的参数识别为`可选参数`，此时不受 可选参数必须在必须参数后面 的限制

    ```typescript
    function f(x: number, y: number = 2): number {
        return x + y;
    }
    f(1);       //3
    f(1, 2);    //3
    f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
    ```

  * 剩余参数：TS 支持 ES6 `rest 对象`获取剩余参数

    ```typescript
    function f(arr: any[] , ...items: any[]) {
        return arr.concat(...items)
    }
    f([1], 'a', 3, 4); //Array [1, 'a', 3, 4]
    ```

  * 函数重载：TS 支持函数重载，针对不同数量和类型的参数时，使用多个函数定义，TS 优先从`最前面的函数定义`开始匹配

    ```typescript
    function f(x: number): number;
    function f(x: string): string;
    function f(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else {
            return x.split('').reverse().join('');
        }
    }
    ```

# 类型断言

类型断言用来`手动指定值的类型`，由于 tsx 语法必须使用 `值 as 类型`，因此建议使用类型断言时统一使用 值 as 类型 语法

类型断言不是类型转换，不会影响到变量的类型，只会影响 TS 编译时的类型，类型断言语句会在编译结果中删除

```typescript
值 as 类型
```

* 将联合类型断言为其中一个类型

  联合类型上只能访问所有类型共有的属性和方法，断言为具体类型后就可以访问当前类型上特有的属性和方法

    ```typescript
    function isString(x: number | string): boolean {
        if(typeof (x as string).charAt === 'function'){
            return true;
        }
        return false;
    }

    //编译结果如下：
    function isString(x) {
        //类型断言语句在编译结果中被删除
        if (typeof x.charAt === 'function') {
            return true;
        }
        return false;
    }
    ```

* 将父类断言为具体的子类

    ```typescript
    class ApiError extends Error {
        code: number = 0;
    }
    class HttpError extends Error {
        statusCode: number = 200;
    }
    function isApiError(error: Error): boolean {
        if (typeof (error as ApiError).code === 'number') {
            return true;
        }
        return false;
    }
    ```

* 将 any 断言为具体类型

    ```typescript
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }
    const data = getCacheData('tom') as String;
    ```

* 将任意类型断言为 any

    ```typescript
    window.a = 1; //error: Property 'a' does not exist on type 'Window & typeof globalThis'.
    (window as any).a = 1;
    ```

# 双重断言


