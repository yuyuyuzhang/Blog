# 十、ArrayBuffer 对象

[[_TOC_]]

## 1. 二进制数组 API

### (1) 诞生原因

WebGL 是浏览器与显卡间的通信接口，为了满足 JS 与显卡间大量实时的数据交换，两者之间的数据通信必须是`二进制`而非传统的`文本格式`，由此 ES6 新增了二进制数组 API，允许开发者以数组下标的形式直接操作内存，与操作系统的原生接口进行二进制通信

* **文本格式**：传递一个 `32 位整数`，JS 脚本与显卡都要进行数据转换，非常耗时
* **二进制数据**：直接操作字节，将 4 个字节的 32 位整数，以二进制形式原封不动地送入显卡，JS 脚本的性能将大幅度提升

### (2) 操作接口

二进制数组由以下三类对象构成，而它们也就是 JS 操作二进制数据的接口

* ArrayBuffer 对象
* TypedArray 视图
* DataView 视图

## 2. ArrayBuffer 对象

ArrayBuffer 对象表示`存储二进制数据的一段连续内存`，不能直接读写，只能通过 `TypedArray/DataView 视图`读写

### (1) ArrayBuffer 构造函数

ArrayBuffer 构造函数用来`分配一段指定字节大小的连续内存区域`，每个字节的值默认为 `0`

```javascript
定义：const buffer = new ArrayBuffer(n); //分配一段n字节的连续内存
属性：buffer.byteLength                  //返回buffer的字节长度
方法：静态方法
     ArrayBuffer.isView(param)          //返回布尔值,param是否为ArrayBuffer对象的视图实例
     实例方法
     buffer.slice(n1,n2)                //返回新ArrayBuffer实例,拷贝buffer字节索引n1到字节索引n2前一项字节
```

### (2) 检测内存是否分配成功

如果分配的内存区域很大，有可能分配失败，通过 byteLength 属性检查是否分配成功

```javascript
//分配一段 100 字节的连续内存
const buf = new ArrayBuffer(100);

if(buf.byteLength === 100){
  console.log('分配成功');
} else{
  console.log('分配失败');
}
```

## 3. TypedArray 视图

### (1) TypedArray 视图类型

ArrayBuffer 对象作为内存区域可以存放`多种类型的数据`，视图就是同一段内存的不同数据可以有不同的解读格式，视图的作用是`以指定格式解读二进制数据`

TypedArray 视图包括如下 9 种类型

|数据类型|字节长度|含义               |对应的C语言类型|
|-------|-------|-------------------|--------------|
|Int8   |1|8位有符号整数             |signed char   |
|Uint8  |1|8位无符号整数             |unsigned char |
|Uint8C |1|8位无符号整数(自动过滤溢出)|unsigned char |
|Int16  |2|16位有符号整数            |short         |
|Uint16 |2|16位无符号整数            |unsigned short|
|Int32  |4|32位有符号整数            |int           |
|Uint32 |4|32位无符号整数            |unsigned int  |
|Float32|4|32位浮点数                |float         |
|Float64|8|64位浮点数                |double        |

### (2) TypedArray 构造函数

TypedArray 每种视图都是一种构造函数，用来读写`简单类型`的二进制数据，TypedArray 构造函数有如下 4 种使用方式

#### ① TypedArray(buffer,byteOffset,length)

TypedArray 构造函数需要通过如下 3 个参数，生成一个`类数组对象`

* 第一个参数（必需）：视图对应的底层 `ArrayBuffer 对象`
* 第二个参数（可选）：视图开始的`字节序号`，默认从 0 开始
* 第三个参数（可选）：视图包含的`数据成员个数`，默认直到本段内存区域结束

```javascript
定义
const tv = new Int8Array(buffer,byteOffset,length)
const tv = new Uint8Array(buffer,byteOffset,length);
const tv = new Uint8CArray(buffer,byteOffset,length);
const tv = new Int16Array(buffer,byteOffset,length);
const tv = new Uint16Array(buffer,byteOffset,length);
const tv = new Int32Array(buffer,byteOffset,length);
const tv = new Uint32Array(buffer,byteOffset,length);
const tv = new Float32Array(buffer,byteOffset,length);
const tv = new Float64Array(buffer,byteOffset,length);
```

```javascript
//分配 8 字节的连续内存
const buffer = new ArrayBuffer(8);

//创建一个指向 buffer 的 Int8 视图，开始于字节 0，直到缓冲区的末尾
const tv1 = new Int8Array(buffer);
console.log(tv1)
console.log(tv1.byteLength) //字节个数 
console.log(tv1.length)     //数据成员个数

//创建一个指向 buffer 的 Int16 视图，开始于字节 0，直到缓冲区的末尾
const tv2 = new Int16Array(buffer);
console.log(tv2)
console.log(tv2.byteLength)
console.log(tv2.length)
```

![TypedArray(buffer)]()

#### ② TypedArray(length)

TypedArray 构造函数还可以不通过 ArrayBuffer 对象，接受`数组成员个数`作为参数，直接分配内存生成

```javascript
定义
const tv = new Int8Array(length)
const tv = new Uint8Array(length);
const tv = new Uint8CArray(length);
const tv = new Int16Array(length);
const tv = new Uint16Array(length);
const tv = new Int32Array(length);
const tv = new Uint32Array(length);
const tv = new Float32Array(length);
const tv = new Float64Array(length);
```

```javascript
//创建一个包含 8 个数据成员的 Float64 视图，基于 64 字节的连续内存
const tv = new Float64Array(8);
tv[0] = 10;
tv[1] = 20;
tv[2] = tv[0] + tv[1];
```

![TypedArray(length)]()

#### ③ TypedArray(typedArray)

TypedArray 构造函数还可以接受`另一个 TypedArray 实例`作为参数，此时生成的新的类数组对象只是复制了参数的值，对应的底层内存是不一样的，会`另外开辟一段新的内存储存数据`

```javascript
定义
const tv = new Int8Array(typedArrayOther)
const tv = new Uint8Array(typedArrayOther);
const tv = new Uint8CArray(typedArrayOther);
const tv = new Int16Array(typedArrayOther);
const tv = new Uint16Array(typedArrayOther);
const tv = new Int32Array(typedArrayOther);
const tv = new Uint32Array(typedArrayOther);
const tv = new Float32Array(typedArrayOther);
const tv = new Float64Array(typedArrayOther);
```

```javascript
//创建一个包含 4 个数据成员的 Int8 视图，基于 4 字节的连续内存
const tv1 = new Int8Array(4);

//创建一个包含 4 个数据成员的 Int8 视图，基于 4 字节的连续内存
const tv2 = new Int8Array(tv1);

tv1[0] = 2;
console.log(tv1)
console.log(tv2)
```

![TypedArray(typedArray)]()

#### ④ TypedArray(array)

TypedArray 构造函数还可以接受`一个数据成员值的数组`作为参数，此时 TypedArray 视图会`重新开辟内存`，不会在原数组的内存上建立视图

```javascript
定义
const tv = new Int8Array(typedArrayOther)
const tv = new Uint8Array(typedArrayOther);
const tv = new Uint8CArray(typedArrayOther);
const tv = new Int16Array(typedArrayOther);
const tv = new Uint16Array(typedArrayOther);
const tv = new Int32Array(typedArrayOther);
const tv = new Uint32Array(typedArrayOther);
const tv = new Float32Array(typedArrayOther);
const tv = new Float64Array(typedArrayOther);
```

```javascript
//创建一个包含数据成员 [1,2,3,4] 的 Int16 视图，基于 8 字节的连续内存
const tv = new Uint16Array([1, 2, 3, 4]);
console.log(tv)
```

![TypedArray(array)]()

### (3) TypedArray 属性和方法

TypedArray 类数组对象与普通数组的区别如下

* TypedArray 类数组对象只是一层视图，`本身不存储数据`，数据本身存储在底层的 ArrayBuffer 对象
* 所有成员都是`同一种类型`
* 所有成员的默认值为 `0`
* 所有成员是`连续`的，不会有空位

```javascript
属性：实例属性
      tv.buffer             //返回tv整段内存区域对应的ArrayBuffer对象
      tv.byteOffset         //返回tv从底层ArrayBuffer对象的哪个字节开始
      tv.byteLength         //返回tv字节长度
      tv.length             //返回tv成员个数
      普通数组所有属性
方法：静态方法
      TypedArray.of(n1,...) //返回将参数n1,...等转换成的typedArray实例
      TypedArray.from(ite)  //返回将具有iterator接口的参数转换成的typedArray实例
      实例方法
      tv.subarray(a,b)      //返回基于tv的成员索引a到b前一项建立的新typedArray实例
      tv.set(tv1,n)         //无返回值,将tv1内容复制到tv从成员索引n开始的内容,整段内存的复制比一个个拷贝成员快得多
      普通数组除 concat 外所有方法
```

#### ① TypedArray 字节序

**小端字节序（little endian）**：相对重要的字节排在后面的内存地址，相对不重要字节排在前面的内存地址

目前所有个人电脑几乎都是小端字节序，所以 TypedArray 类数组对象内部也采用`小端字节序`读写数据，然而很多网络设备和特定的操作系统采用的是大端字节序，这就导致一个严重问题：`TypedArray 视图无法正确解析大端字节序的数据`，因为它只能处理小端字节序，为了解决这个问题，JS 引入 DataView 视图可以设定字节序

```javascript
const buffer = new ArrayBuffer(16);
const tv1 = new Int32Array(buffer);
const tv2 = new Int16Array(buffer);

for (let i = 0; i < tv1.length; i++) {
  tv1[i] = i * 2;
}

console.log(tv1)
console.log(tv2)
```

![TypedArray 字节序]()

**确定计算机字节序**：可通过如下方法确定计算机字节序，true 为小端字节序，false 为大端字节序

```javascript
const littleEndian = (function() {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(0, 256, true);
  return new Int16Array(buffer)[0] === 256;
})();
```

#### ② TypedArray 溢出

不同的视图类型所能容纳的数值范围是确定的，超出这个范围就会出现溢出，TypedArray 类数组对象的溢出处理规则就是`抛弃溢出的位`，然后按照视图类型解释

```javascript
const tv = new Uint8Array(1);

//tv 是一个 8 位视图，而 256 的二进制形式是一个 9 位值 100000000
//根据溢出规则只保留后 8 位 00000000，uint8 视图的解释规则是无符号 8 位整数，所以 00000000 就是 0
tv[0] = 256;
console.log(tv[0]) //0
```

#### ③ TypedArray 重叠

同一个 ArrayBuffer 对象之上，可以根据不同的数据类型，建立多个视图

```javascript
const buffer = new ArrayBuffer(8); //创建一个 8 字节的 ArrayBuffer

//以下 3 个视图是重叠的，任何一个视图对内存有所修改，另外 2 个视图都会反应出来
const tv1 = new Int32Array(b);       //创建一个指向 buffer 的 Int32 视图，开始于字节 0，直到缓冲区的末尾
const tv2 = new Uint8Array(b, 2);    //创建一个指向 buffer 的 Uint8 视图，开始于字节 2，直到缓冲区的末尾
const tv3 = new Int16Array(b, 2, 2); //创建一个指向 buffer 的 Int16 视图，开始于字节 2，长度为 2
```

#### ④ TypedArray 合并

TypedArray 类数组对象不适用于数组的 `concat()` 方法，因此想要合并多个 TypedArray 类数组对象，可以使用如下函数

```javascript
function concatenate(resultConstructor, ...arrays) {
  let totalLength = 0;
  for (let arr of arrays) {
    totalLength += arr.length;
  }
  let result = new resultConstructor(totalLength);
  let offset = 0;
  for (let arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

concatenate(Uint8Array, Uint8Array.of(1, 2), Uint8Array.of(3, 4)) //Uint8Array [1, 2, 3, 4]
```

#### ⑤ TypedArray 遍历

TypedArray 类数组对象与普通数组一样，都部署了 Iterator 接口，可以被遍历

```javascript
let tv = Uint8Array.of(0, 1, 2);
for (let byte of tv) {
  console.log(tv); //0 1 2
}
```

#### ⑥ TypedArray.of()

```javascript
const tv = Float32Array.of(0.151, -8, 3.7)
console.log(tv)
```

![TypedArray.of()]()

#### ⑦ TypedArray.from()

```javascript
const tv = Uint16Array.from([0, 1, 2])
console.log(tv)
```

![TypedArray.from()]()

#### ⑧ typedArray.subarray()

```javascript
const tv1 = Uint16Array.from([1, 2, 3])
const tv2 = tv1.subarray(2,3);

console.log(tv1)
console.log(tv2)
```

![typedArray.subarray()]()

#### ⑨ typedArray.set()

```javascript
const tv1 = Uint16Array.from([1, 2, 3])
const tv2 = new Uint16Array(5);
tv2.set(tv1, 2)

console.log(tv1)
console.log(tv2)
```

![typedArray.set()]()

### (4) TypedArray 复合视图

TypedArray 视图的构造函数可以指定`起始位置`和`长度`，所以同一段内存可以依次存放不同类型的数据，这叫做复合视图

```javascript
const buffer = new ArrayBuffer(24);

const tv1 = new Uint32Array(buffer, 0, 1);   //字节 0 到字节 3，1 个 32 位无符号整数
const tv2 = new Uint8Array(buffer, 4, 16);   //字节 4 到字节 19，16 个 8 位整数
const tv3 = new Float32Array(buffer, 20, 1); //字节 20 到字节 23，1 个 32 位浮点数
```

## 4. DataView 视图

### (1) DataView 复合视图

如果一段数据包含多种类型，例如服务器返回的 HTTP 响应数据，这时除了 TypedArray 复合视图以外，还可以使用 DataView 视图进行操作

* **TypedArray 视图的设计目的**：用来`向网卡、声卡之类的本机设备传送数据`，因此只能使用本机的`小端字节序`
* **DataView 视图的设计目的**：用来`处理网络设备传来的数据`，因此可以`自行设定`大端字节序或小端字节序

DataView 视图支持`除 Uint8C 外`的其他 8 种

|数据类型|字节长度|含义               |对应的C语言类型|
|-------|-------|-------------------|--------------|
|Int8   |1|8位有符号整数             |signed char   |
|Uint8  |1|8位无符号整数             |unsigned char |
|Int16  |2|16位有符号整数            |short         |
|Uint16 |2|16位无符号整数            |unsigned short|
|Int32  |4|32位有符号整数            |int           |
|Uint32 |4|32位无符号整数            |unsigned int  |
|Float32|4|32位浮点数                |float         |
|Float64|8|64位浮点数                |double        |

### (2) DataView 构造函数

DataView 视图可以自定义复合格式的视图，用来读写`复杂类型`的二进制数据，可以从`任意字节`开始解读 ArrayBuffer 对象

#### ① DataView(buffer,byteOffset,length)

DataView 视图本身也是构造函数，DataView 构造函数需要通过如下 3 个参数，生成一个`类数组对象`

* 第一个参数（必需）：视图对应的底层 `ArrayBuffer 对象`
* 第二个参数（可选）：视图开始的`字节序号`，默认从 0 开始
* 第三个参数（可选）：视图包含的`数据成员个数`，默认直到本段内存区域结束

```javascript
定义：const dv = new DataView(buffer,byteOffset,length);
```

### (3) DataView 属性和方法

```javascript
定义：const dv = new DataView(buffer);
属性：实例属性
      dv.buffer                    //返回typedArray整段内存区域对应的ArrayBuffer对象
      dv.byteOffset                //返回typedArray从底层ArrayBuffer对象的哪个字节开始
      dv.byteLength                //返回typedArray字节长度
      dv.length                    //返回typedArray成员个数
      普通数组所有属性
方法：实例方法
      dv.getInt8(byte,flag)        //返回一个有符号8位整数,从指定字节byte开始读取1个字节,flag默认false大端字节序
      dv.getUint8(byte,flag)       //返回一个无符号8位整数,从指定字节byte开始读取1个字节
      dv.getInt16(byte,flag)       //返回一个有符号16位整数,从指定字节byte开始读取2个字节
      dv.getUint16(byte,flag)      //返回一个无符号16位整数,从指定字节byte开始读取2个字节
      dv.getInt32(byte,flag)       //返回一个有符号32位整数,从指定字节byte开始读取4个字节
      dv.getUint32(byte,flag)      //返回一个无符号32位整数,从指定字节byte开始读取4个字节
      dv.getFloat32(byte,flag)     //返回一个32位浮点数,从指定字节byte开始读取4个字节
      dv.getFloat64(byte,flag)     //返回一个64位浮点数,从指定字节byte开始读取8个字节
      dv.setInt8(byte,val,flag)    //无返回值,从指定字节byte开始写入1个字节的有符号8位整数
      dv.setUint8(byte,val,flag)   //无返回值,从指定字节byte开始写入1个字节的无符号8位整数
      dv.setInt16(byte,val,flag)   //无返回值,从指定字节byte开始写入2个字节的有符号16位整数
      dv.setUint16(byte,val,flag)  //无返回值,从指定字节byte开始写入2个字节的无符号16位整数
      dv.setInt32(byte,val,flag)   //无返回值,从指定字节byte开始写入4个字节的有符号32位整数
      dv.setUint32(byte,val,flag)  //无返回值,从指定字节byte开始写入4个字节的无符号32位整数
      dv.setFloat32(byte,val,flag) //无返回值,从指定字节byte开始写入4个字节的有符号32位整数
      dv.setFloat64(byte,val,flag) //无返回值,从指定字节byte开始写入8个字节的有符号64位整数
      普通数组的所有方法
```

#### ① DataView 实例方法

```javascript
const buffer = new ArrayBuffer(10); //分配一段10字节的连续内存
const dv = new DataView(buffer);    //基于buffer创建一个DataView视图

dv.setInt32(1, 25); //大端字节序：从第2个字节开始写入值为25的有符号32位整数
dv.setFloat32(6, 2.5, true); //小端字节序：从第7个字节开始写入值为2.5的32位浮点数

console.log(dv)
```

![dataView实例方法]()
