"use strict";
//自动赋值
// enum Color {red, blue, green};
// console.log(Color['red'] === 0); //true
// console.log(0 === Color['red']); //true
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//手动赋值
// enum Color {red, blue = 0, green = -1.5, gray = "s"}
// console.log(Color['red'] === 0);  //true
// console.log(0 === Color['red']);  //true
// console.log(Color['blue'] === 0); //true
// console.log(0 === Color['blue']); //true
// console.log(Color['green']);      //-1.5
// console.log(Color['gray'])        //"s"
//常数项
// enum Color {red, blue, green}
//计算所得项
// enum Color {red, blue, green = "green".length, gray}; //error: Enum member must have initializer
//常数枚举
// const enum Color {red, blue, green};
// const directions = [Color.red];
//编译结果如下：
// var directions = [0];
//普通枚举
// enum Color {red, blue, green};
// const directions = [Color.red];
//编译结果如下：
// var Color;
// (function (Color) {
//     Color[Color["red"] = 0] = "red";
//     Color[Color["blue"] = 1] = "blue";
//     Color[Color["green"] = 2] = "green";
// })(Color || (Color = {}));
// var directions = [Color.red];
//外部枚举
// const enum Color {red, blue, green};
// declare enum ColorA {red, blue, green, gray};
// enum Color {red};
// declare enum Color {red};
// enum Color {red};
// enum Color {red};
//外部常数枚举
// declare const enum Color {red, blue, green};
// const directions = [Color.red];
//编译结果如下：
// var directions = [0];
//外部普通枚举
// declare enum Color {red, blue, green};
// const directions = [Color.red];
//编译结果如下：
// var directions = [Color.red];
//函数声明
// function f(x: number, y: number): number {
//     return x + y
// }
// f(1);       //error: Supplied parameters do not match any signature of call target
// f(1, 2);    //3
// f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
//函数表达式
// const f: (x: number, y: number) => number = function (x: number, y: number): number {
//     return x + y;
// }
//接口定义函数类型
// interface F {
//     (x: number, y: number): number
// }
// const f: F = function(x: number, y: number): number {
//     return x + y;
// }
//不能多参也不能少参
// function f(x: number, y: number): number {
//     return x + y;
// }
// f(1);       //error: Supplied parameters do not match any signature of call target
// f(1, 2);    //3
// f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
//可选参数
// function f(x: number, y?: number): number {
//     return y ? x + y : x;
// }
// f(1);    //1
// f(1, 2); //3
// f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
//参数默认值
// function f(x: number, y: number = 2): number {
//     return x + y;
// }
// f(1);
// f(1, 2);
// f(1, 2, 3); //error: Supplied parameters do not match any signature of call target
//剩余参数
// function f(arr: any[] , ...items: any[]) {
//     return arr.concat(...items)
// }
// f([1], 'a', 3, 4); //Array [1, 'a', 3, 4]
//函数重载
// function f(x: number): number;
// function f(x: string): string;
// function f(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else {
//         return x.split('').reverse().join('');
//     }
// }
//将联合类型断言为具体类型
// function isString(x: number | string): boolean {
//     if(typeof (x as string).charAt === 'function'){
//         return true;
//     }
//     return false;
// }
//将父类断言为具体的子类
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 0;
        return _this;
    }
    return ApiError;
}(Error));
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusCode = 200;
        return _this;
    }
    return HttpError;
}(Error));
function isApiError(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    return false;
}
//将 any 断言为具体类型
// window.a = 1; //error: Property 'a' does not exist on type 'Window & typeof globalThis'.
// (window as any).a = 1;
//将任意类型断言为 any
// function getCacheData(key: string): any {
//     return (window as any).cache[key];
// }
// const data = getCacheData('tom') as String;
