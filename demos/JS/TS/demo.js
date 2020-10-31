"use strict";
var a = undefined;
var b;
b = undefined;
function f(x) {
    console.log(x);
}
f();
f(undefined);
f(void 1);
var c = null;
var d = undefined;
console.log(c.name);
console.log(c.getName());
var e;
e = 'aaa';
e = 111;
var g;
g = 'aaa';
g = 111;
var h = Symbol.for('name');
//# sourceMappingURL=demo.js.map