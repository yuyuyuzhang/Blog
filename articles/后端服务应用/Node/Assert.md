# Assert

## 1. Assert

Assert 模块提供了一组断言函数，用于验证`常量`

```js
//非严格的断言模式
const assert = require('assert')

//严格的断言模式
const assert = require('assert').strict
```

```js
属性：
方法：assert.equal()        //
     assert.deepEqual()    //
     assert.notEqual()     //
     assert.notDeepEqual() //
```

## 2. assert.AssertionError

assert 模块抛出的所有错误都是 AssertionError 类的实例，表明断言的失败

```js
定义：new assert.AssertionError(options)

options：
message      //
actual       //
expected     //
operator     //
stackStartFn //
```
