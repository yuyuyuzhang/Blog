# 十五、Node 实用工具

## 1. util 模块

util 模块支持对 `Node 内部模块的需求`，许多实用工具对应用程序和模块开发者也很有用

## 2. util API

```js
定义：import util from 'util'
方法：回调方法：
     util.callbackify(f)      //返回遵循错误优先回调风格的函数 f
     util.promisify(original) //返回 util.callbackify(f) 的 promise 版本
     其他方法：
     util.toUSVString(string)
     util.stripVTControlCharacters(str)
     util.isDeepStrictEqual(val1,val2)
     util.inspect(object,[options])
     util.inspect(object,[showHidden,[depth,[colors]]])
     util.debug(section)
     util.deprecate(fn,msg,[code])
     util.format(format,[...args])
     util.formatWithOptions(inspectOptions,format,[...args])
     util.getSystemErrorName(err)
     util.getSystemErrorMap()
     util.debuglog(section,[callback])
```

## 3. util.types

util.types 为不同种类的`内置对象`提供`类型检查`

```js
ArrayBuffer：
util.types.isArrayBuffer(value)           //返回 value 是否为 ArrayBuffer 实例
util.types.isSharedArrayBuffer(value)     //返回 value 是否为 SharedArrayBuffer 实例
util.types.isAnyArrayBuffer(value)        //返回 value 是否为 ArrayBuffer 或 SharedArrayBuffer 实例
util.types.isArrayBufferView(value)       //返回 value 是否为 ArrayBuffer 视图的实例
util.types.isTypedArray(value)            //返回 value 是否为 TypedArray 实例
util.types.isInt8Array(value)             //返回 value 是否为 Int8Array 实例
util.types.isInt16Array(value)            //返回 value 是否为 Int8Array 实例
util.types.isInt32Array(value)            //返回 value 是否为 Int8Array 实例
util.types.isUint8Array(value)            //返回 value 是否为 Uint8Array 实例
util.types.isUint16Array(value)           //返回 value 是否为 Uint16Array 实例
util.types.isUint32Array(value)           //返回 value 是否为 Uint32Array 实例
util.types.isUint8ClampedArray(value)     //返回 value 是否为 Uint8ClampedArray 实例
util.types.isBigInt64Array(value)         //返回 value 是否为 BigInt64Array 实例
util.types.isBigUint64Array(value)        //返回 value 是否为 BigUint64Array 实例
util.types.isFloat32Array(value)          //返回 value 是否为 Float32Array 实例
util.types.isFloat64Array(value)          //返回 value 是否为 Float64Array 实例 
util.types.isDataView(value)              //返回 value 是否为 DataView 视图的实例

JS 数据类型：
util.types.isExternal(value)              //返回 value 是否为原生的 External 值
util.types.isBoxedPrimitive(value)        //返回 value 是否为封装的原始对象
util.types.isBooleanObject(value)         //返回 value 是否为 Boolean 对象
util.types.isNumberObject(value)          //返回 value 是否为 Number 对象
util.types.isStringObject(value)          //返回 value 是否为 String 对象
util.types.isSymbolObject(value)          //返回 value 是否为 Symbol 对象
util.types.isMap(value)                   //返回 value 是否为 Map 对象
util.types.isWeakMap(value)               //返回 value 是否为 WeakMap 对象
util.types.isMapIterator(value)           //返回 value 是否为内置的 Map 实例返回的迭代器
util.types.isSet(value)                   //返回 value 是否为 Set 对象
util.types.isWeakSet(value)               //返回 value 是否为 WeakSet 对象
util.types.isSetIterator(value)           //返回 value 是否
util.types.isDate(value)                  //返回 value 是否为 Date 对象
util.types.isRegExp(value)                //返回 value 是否为正则表达式

JS 其他类型：
util.types.isGeneratorFunction(value)     //返回 value 是否为 Generator 生成器函数
util.types.isGeneratorObject(value)       //返回 value 是否为 Generator 生成器函数返回的生成器对象
util.types.isModuleNamespaceObject(value) //返回 value 是否为模块命名空间对象的实例
util.types.isNativeError(value)           //返回 value 是否为内置 Error 类型实例
util.types.isPromise(value)               //返回 value 是否为 Promise 实例
util.types.isProxy(value)                 //返回 value 是否为 Proxy 实例
util.types.isArgumentsObject(value)       //返回 value 是否为 arguments 对象
util.types.isAsyncFunction(value)         //返回 value 是否为异步函数
util.types.isKeyObject(value)             //返回 value 是否为 KeyObject 实例
util.types.isCryptoKey(value)             //返回 value 是否为 CryptoKey 实例
```

## 4. util.TextEncoder 类

util.TextEncoder 类用于 `UTF-8 编码`，是 WHATWG 编码标准 TextEncoder API 的实现

```js
定义：import util from 'util'
     const textEncoder = new util.TextEncoder()
属性：textEncoder.encoding             //返回 util.TextEncoder 支持的编码，始终为 utf-8
方法：textEncoder.encode([input])      //返回包含编码字节的 Uint8Array,对 input 字符串进行 UTF-8 编码
     textEncoder.encodeInto(src,dest) //返回包含读取的 Unicode 代码单元和写入的 UTF-8 字节的对象,将 src 字符串 UTF-8 编码为 dest Uint8Array
```

## 5. util.TextDecoder 类

util.TextDecoder 类用于`解码`

```js
定义：import util from 'util'
     const textDecoder = new TextDecoder([encoding,[options]])
属性：textDecoder.encoding                  //返回 util.TextDecoder 支持的编码，始终为 utf-8
     textDecoder.fatal                     //返回解码是否发生错误
     textDecoder.ignoreBOM                 //返回解码结果是否包含字节顺序标记
方法：textDecoder.decode([input,[options]]) //返回 input 解码后的字符串

```
