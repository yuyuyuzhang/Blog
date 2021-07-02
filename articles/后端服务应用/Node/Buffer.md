# Buffer

## 1. 字符编码

### (1) 字符集

计算机内部所有信息都是一个`二进制值`，二进制值的每个二进制位 bit 都有 0 和 1 两种状态，一个字节 byte 具有 8 个二进制位 bit，可以组合成 256 种状态，每个状态对应一个符号，从 00000000 ~ 11111111

字符集定义了`字符和二进制位`之间的对应关系，为每个字符分配唯一的`字符编号`

* **ASCII 字符集**：使用 `1` 个字节给各个字符编号，最高位为 0，剩下 7 位可表示 `128` 个英文字符
  * 上世纪 60 年代，美国制定了 ASCII 字符集，统一规定了英文字符和二进制位的关系，一直沿用至今
* **Unicode 字符集**：使用 `1~6` 个字节给各个字符编号，可表示`上百万个世界上所有字符`
  * 英文字符 128 个字符编码当然够用，但是其他语言是不够的，例如汉字多达十万左右
  * 世界上存在多种编码方式，同一个二进制数字使用不同的编码方式可以被解释成不同的符号，因此想要打开一个文件，就必须知道它的编码方式，否则用错误的编码方式解读就会出现乱码，电子邮件常出现乱码就是因为发件人和收件人使用的编码不一样
  * Unicode 字符集现在的规模可以容纳 `100 多万`个符号，也就可以容纳世界上所有的符号，每个符号都给予一个独一无二的编码，乱码问题因此而消失

### (2) Unicode 字符编码

字符编码定义了如何将字符编号存储到内存，故而存储在内存的仅仅是字符编号，而不是真正的字符实体

Unicode 字符集有如下 3 种字符编码方式，数字表示每种字符编码存储所需的`最少比特位数`，`UTF-8` 是互联网使用最广的一种编码方式，UTF-16、UTF-32 在互联网基本不用

* **UTF-8**：`变长`，使用 `1~6` 个字节存储字符编号，如果只有一个字节，那么最高的比特位为 0，如果有多个字节，那么第一个字节从最高位开始，使用几个字节编码，就连续有几个比特位的值为 1，剩下的字节均以 10 开头
* **UTF-16**：`既固长又变长`，使用 `2~4` 个字节存储字符编号，对于字符编号在 0~FFFF 之间的字符，使用 2 个字节直接存储字符编号，无需任何编码转换，对于字符编号在 10000~10FFFF 之间的字符，使用 4 个字节存储，将字符编号的所有比特位分成两部分
* **UTF-32**：`固长`，使用 `4` 个字节存储字符编号，足以容纳所有的字符编号，所以直接存储字符编号即可，无需任何编码转换，浪费了空间，提高了效率

Global 对象是 ES 中的`全局对象`，浏览器和 Node 对 Global 对象的实现不同

```js
Unicode 编码/解码方法：
escape(str)             //返回编码后的字符串,转义除ASCII字母、数字、标点符号* @ - _ + . /外的其他所有字符
unescape(str)           //解码使用escape()编码的字符串
encodeURI(url)          //返回编码后的url,转义除URL合法字符外的所有字符
decodeURI(url)          //解码使用encodeURL()编码的url
encodeURIComponent(url) //返回编码后的url,转义除语义字符外的所有字符
decodeURIComponent(url) //解码使用encodeURLComponent()编码的url
Base64 编码解码方法：
btoa(str)               //返回Base64编码后的字符串
atob(encodedStr)        //返回Base64解码后的字符串
```

### (3) Node 支持的字符编码

Node 目前支持以下 `6` 种类型的字符编码，通过显式地使用字符编码可以在 `buffer 实例和 JS 字符串`之间相互转换

|字符编码|描述|
|:------|:---|
|ascii|ASCII 编码|
|utf8|UTF-8 编码：互联网最常用的编码方式|
|utf16le、ucs2（别名）|UTF-16 编码：不常用|
|base64|Base64 编码：常用于加密|
|base64url|base64url 编码：常用于加密 url|
|latin1、binary（别名）|latin1 编码：不常用|
|hex|hex 编码：不常用|

## 2. Buffer 类

ES 没有二进制数据类型，但是 Node 处理`文件流或 TCP 流`时必须使用二进制数据，因此 Node 定义了一个 Buffer 类用于创建一个专门存放二进制数据的缓存区，Buffer 对应 `V8 堆内存之外的一块原始内存`

### (1) 二进制数组 API

WebGL 是浏览器与显卡间的通信接口，为了满足 JS 与显卡间大量实时的数据交换，两者之间的数据通信必须是`二进制`而非传统的`文本格式`，由此 ES6 新增二进制数组 API，允许开发者以`数组下标`的形式直接操作内存，与操作系统的原生接口进行`二进制通信`

* **文本格式**：传递一个 `32 位整数`，JS 脚本与显卡都要进行数据转换，非常耗时
* **二进制数据**：直接操作字节，将 4 个字节的 32 位整数，以`二进制形式`原封不动地送入显卡，JS 脚本的性能将大幅度提升

二进制数组 API 如下

* ArrayBuffer 对象
* TypedArray 视图
* DataView 视图

### (2) ArrayBuffer 对象

ArrayBuffer 对象表示`存储二进制数据的一段连续内存`，不能直接读写，只能通过 `TypedArray/DataView 视图`读写

### (3) TypedArray 视图

ArrayBuffer 对象作为内存区域可以存放`多种类型的数据`，视图就是同一段内存区域的数据可以有`不同的解读格式`，视图的作用是`以指定格式解读二进制数据`

* TypedArray 类数组对象只是一层视图，`本身不存储数据`，数据存储在底层的 ArrayBuffer 对象
* 所有成员都是`同一种类型`
* 所有成员的默认值为 `0`
* 所有成员是`连续`的，不会有空位

TypedArray 视图包括如下 9 种类型

| 数据类型 | 字节长度 | 含义                        | 对应的C语言类型 |
| -------- | -------- | --------------------------- | --------------- |
| Int8     | 1        | 8位有符号整数               | signed char     |
| Uint8    | 1        | 8位无符号整数               | unsigned char   |
| Uint8C   | 1        | 8位无符号整数(自动过滤溢出) | unsigned char   |
| Int16    | 2        | 16位有符号整数              | short           |
| Uint16   | 2        | 16位无符号整数              | unsigned short  |
| Int32    | 4        | 32位有符号整数              | int             |
| Uint32   | 4        | 32位无符号整数              | unsigned int    |
| Float32  | 4        | 32位浮点数                  | float           |
| Float64  | 8        | 64位浮点数                  | double          |

### (4) Uint8Array 视图

Uint8Array 视图就是 `8 位无符号整数`，Node Buffer 类就是 ES6 Uint8Array 类的`子类`，Node 在支持 Buffer 的地方也支持普通的 Uint8Array

### (5) Buffer API

```js
定义：Buffer.alloc(size,value,encoding)      //返回buffer实例,使用encoding编码,value填充到指定长度size
     Buffer.from(string,encoding)           //返回buffer实例,使用encoding编码string
     Buffer.from(array)                     //返回buffer实例,使用0-255范围内的字节数组分配buffer
     Buffer.from(arrayBuffer,n,len)         //返回buffer实例,创建arrayBuffer从索引n开始的len字节的视图,buffer实例与arrayBuffer共享相同的底层内存
     Buffer.from(buffer)                    //返回buffer实例,复制传入的buffer实例
属性：常量属性：
     Buffer.poolSize                        //返回用于池的预分配内部buffer实例的字节大小
     buffer.INSPECT_MAX_BYTES               //返回调用buffer.inspect()时将返回的最大字节数
     buffer.constants.MAX_LENGTH            //返回单个buffer实例允许的最大大小
     buffer.constants.MAX_STRING_LENGTH     //返回单个string实例允许的最大大小
     实例属性：
     buffer.buffer                          //返回buffer基于的底层ArrayBuffer对象
     buffer.byteOffset                      //返回buffer基于的底层ArrayBuffer对象的字节偏移量byteOffset
     buffer.length                          //返回buffer的字节数
     buffer[index]                          //返回buffer指定索引处的字节
方法：静态方法：
     Buffer.isBuffer(obj)                   //返回obj是否为Buffer
     Buffer.isEncoding(encoding)            //返回Buffer是否支持encoding
     Buffer.byteLength(string,encoding)     //返回string使用encoding编码后的字节长度
     Buffer.concat(list,totalLength)        //返回新buffer,连接list数组内的所有buffer,并截断为总长度totalLength
     Buffer.compare(buf1,buf2)              //返回数字,表示buffer1和buffer2的位置关系(-1:buffer1位于buffer2之前,0:buffer1与buffer2相同,1:buffer1位于buffer2之后)
     实例方法：
     buffer.toJSON()                        //返回buffer的JSON表示,JSON.stringify(buffer)时隐式调用此方法
     buffer.toString(encoding,n1,n2)        //返回根据encoding解码buffer索引n1到索引n2前一项后的字符串
     buffer.transcode(source,fromEnc,toEnc) //返回新buffer实例,将buffer从一种字符编码重新编码为另一种
     查询方法：
     buffer.includes(value,n,encoding)      //返回buffer是否包含value,从索引n处开始搜索
     buffer.indexOf(value,n,encoding)       //返回buffer第一次出现value的索引,从索引n处开始搜索
     buffer.lastIndexOf(value,n,encoding)   //返回buffer最后一次出现value的索引,从索引n处开始搜索
     操作方法：
     buffer.fill(value,n1,n2,encoding)      //返回buffer,使用value填充buffer的索引n1处到索引n2前一项
     buffer.copy(target,tn1,sn1,sn2)        //返回从buffer复制的字节数量,将buffer索引sn1到索引sn2前一项复制到从target索引tn1开始
     buffer.subarray(n1,n2)                 //返回新buffer,由buffer索引n1到索引n2前一项构成
     buffer.slice(n1,n2)                    //返回新buffer,由buffer索引n1到索引n2前一项构成
     比较方法：
     buffer.equals(buffer1)                 //返回buffer与buffer1是否具有完全相同的字节
     buffer.compare(target,tn1,tn2,sn1,sn2) //返回数字,表示buffer索引sn1到索引sn2前一项与target索引tn1到索引tn2前一项的位置关系(-1:buffer位于target之前,0:buffer与target相同,1:buffer位于target之后)
     遍历方法：
     buffer.keys()                          //返回索引的遍历器对象,可使用for-of循环遍历
     buffer.values()                        //返回值的遍历器对象,可使用for-of循环遍历
     buffer.entries()                       //返回[索引,字节]的遍历器对象,可使用for-of循环遍历
     解读交换方法：
     buffer.swap16()                        //返回buffer的引用,将buffer解读为无符号16位整数数组,并交换字节顺序
     buffer.swap32()                        //返回buffer的引用,将buffer解读为无符号32位整数数组,并交换字节顺序
     buffer.swap64()                        //返回buffer的引用,将buffer解读为64位数字数组,并交换字节顺序
     读取方法：
     buffer.readBigInt64BE(offset)
     buffer.readBigInt64LE(offset)
     buffer.readBigUInt64BE(offset)
     buffer.readBigUInt64LE(offset)
     buffer.readDoubleBE(offset)
     buffer.readDoubleLE(offset)
     buffer.readFloatBE(offset)
     buffer.readFloatLE(offset)
     buffer.readInt8(offset)
     buffer.readInt16BE(offset)
     buffer.readInt16LE(offset)
     buffer.readInt32BE(offset)
     buffer.readInt32LE(offset)
     buffer.readIntBE(offset)
     buffer.readIntLE(offset)
     buffer.readUInt8(offset)
     buffer.readUInt16BE(offset)
     buffer.readUInt16LE(offset)
     buffer.readUInt32BE(offset)
     buffer.readUInt32LE(offset)
     buffer.readUIntBE(offset, byteLength)
     buffer.readUIntLE(offset, byteLength)
     写入方法：
     buffer.write(string,offset,length,encoding)
     buffer.writeBigInt64BE(value,offset)
     buffer.writeBigInt64LE(value,offset)
     buffer.writeBigUInt64BE(value,offset)
     buffer.writeBigUInt64LE(value,offset)
     buffer.writeDoubleBE(value,offset)
     buffer.writeDoubleLE(value,offset)
     buffer.writeFloatBE(value,offset)
     buffer.writeFloatLE(value,offset)
     buffer.writeInt8(value,offset)
     buffer.writeInt16BE(value,offset)
     buffer.writeInt16LE(value,offset)
     buffer.writeInt32BE(value,offset)
     buffer.writeInt32LE(value,offset)
     buffer.writeIntBE(value,offset,byteLength)
     buffer.writeIntLE(value,offset,byteLength)
     buffer.writeUInt8(value,offset)
     buffer.writeUInt16BE(value,offset)
     buffer.writeUInt16LE(value,offset)
     buffer.writeUInt32BE(value,offset)
     buffer.writeUInt32LE(value,offset)
     buffer.writeUIntBE(value,offset,byteLength)
     buffer.writeUIntLE(value,offset,byteLength)
```

## 3. Blob 类

```js
定义：new buffer.Blob(source,{encoding,type})
属性：blob.type                  //返回blob的MIME类型
     blob.size                  //返回blob字节大小  
方法：blob.slice(start,end,type) //返回新blob,由blob的索引start到索引end前一项构成
     blob.arrayBuffer()         //返回Promise实例,blob对应的ArrayBuffer对象
     blob.text()                //返回Promise实例,将blob内容解码为utf-8字符串
```
