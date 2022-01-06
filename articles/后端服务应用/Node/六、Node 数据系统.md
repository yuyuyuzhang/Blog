# 六、Node 数据系统

## 1. stream 模块

### (1) stream

流最初是几十年前在 `Unix 操作系统`引入的，流是一种`数据处理方式`，以高效的方式处理读写文件、网络通信、任何类型的端到端的信息交互

相较于其他数据处理方式，流主要有以下 2 个优点

* **内存效率**：无需一次性加载大量数据到内存，可以逐个片段读取并处理数据
* **时间效率**：获得数据块后即可立刻处理数据，无需等待整个数据有效负载可用时才开始

### (2) stream 模块

Node 通过 stream 模块提供流 API，所有流都是 `EevntEmitter` 类的实例

```js
定义：import stream from 'stream'
方法：构造函数：
     stream.Readable()    //返回只读流实例,只读流构造函数,通过new命令调用
     stream.Writable()    //返回只写流实例,只写流构造函数,通过new命令调用
     stream.Duplex()      //返回双工流实例,双工流构造函数,通过new命令调用
     stream.Transform()   //返回转换流实例,转换流构造函数,通过new命令调用
     stream.PassThrough() //返回转换流实例,转换流的简单实现,只是将输入字节传到输出
     实例方法：
     stream.pipeline(source,[...trans],des,cb) //无返回值,在流之间进行管道转发,并在管道完成时提供回调
     stream.finished(stream,[options],cb)      //无返回值,当前流不再可读、可写、遇到错误、过早关闭得到通知
     stream.addAbortSignal(signal,stream)      //无返回值,将中止信号绑定到当前流,让代码可以使用AbortController控制销毁流,不常用
```

#### ① 流的类型

Node 包含以下 4 种流类型

* **Readable**：只读流
* **Writable**：只写流
* **Duplex**：双工流 - 可读可写
* **Transform**：转换流 - 可读可写，且`输出为输入的转换`

#### ② 流的对象模式

Node stream API 只能对`字符串、Buffer` 操作，但是创建流实例时只要使用 objectMode 选项切换为对象模式，流就可以使用`其他类型 JS 值`实现

#### ③ 流的内部缓冲

只读流和只写流都将数据存储在`内部缓冲`，highWaterMark 选项指定内部缓冲的数据量`阈值`，普通流为`字节总数`，对象模式流为`对象总数`

一旦内部缓冲已使用大小达到 highWaterMark 选项指定的阈值，只读流将停止从底层资源读取数据，直到可以消费内部缓冲的数据，`readStream.pipe(des,[{endFlag}])` 方法内部实现了将数据缓冲限制在可接受水平，以便不同速度的来源和目标不会压倒可用缓冲

双工流和转换流都是可读可写的，因此内部都维护 `2 个独立的内部缓冲`，用于读取和写入，允许每一端独立操作，同时保持适当且高效的数据流

#### ④ 流驱动的 Node API

```js
zlib 模块

fs.createReadStream()  //创建文件的可读流
fs.createWriteStream() //创建到文件的可写流

net.connect()          //启动基于流的连接
http.request()         //返回 http.ClientRequest 类的实例，该实例是可写流

process.stdin          //返回当前 Node 进程的标准输入流
process.stdout         //返回当前 Node 进程的标准输出流
process.stderr         //返回当前 Node 进程的错误输出流
```

#### ⑤ stream.pipeline(source,[...trans],des,cb)

```js
import fs from 'fs'
import zlib from 'zlib'
import { pipeline } from 'stream'

pipeline(
  fs.createReadStream('input.txt'),
  zlib.createGzip(),
  fs.createWriteStream('output.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
)
```

![stream_pipeline1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/stream_pipeline1.png)

![stream_pipeline2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/stream_pipeline2.png)

#### ⑥ stream.finished(stream,[options],cb)

```js
import fs from 'fs'
import { finished } from 'stream'

const rs = fs.createReadStream('input.txt')
finished(rs, (err) => {
  if (err) {
    console.error('input.txt read failed', err)
  } else {
    console.log('input.txt read successfully')
  }
})
rs.resume()
```

![stream_finished](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/stream_finished.png)

### (3) stream.Readable 类

stream.Readable 类表示`只读流`

```js
定义：const readStream = new stream.Readable([options])
属性：readStream.readableObjectMode        //返回/设置当前只读流是否为对象模式
     readStream.readableHighWaterMark     //返回当前只读流内部缓冲的最大字节数
     readStream.readableLength            //返回当前只读流内部缓冲的字节数
     readStream.readableEncoding          //返回当前只读流内部缓冲使用的编码
     readStream.readableFlowing           //返回当前只读流的可读流动状态
     readStream.readStream                //返回当前只读流内部缓冲是否存在数据可被消费
     readStream.readableEnded             //返回当前只读流内部缓冲的数据是否被完全消费
     readStream.destroyed                 //返回当前只读流是否被销毁
方法：readable.setEncoding(encoding)       //返回当前只读流,为当前只读流设置字符编码,未设置字符编码则流数据默认返回buffer对象,否则返回对应字符编码的字符串
     readStream.resume()                  //返回当前只读流,将当前只读流切换为流动模式,恢复触发data事件
     readStream.pause()                   //返回当前只读流,将当前只读流切换为暂停模式,停止触发data事件
     readStream.isPaused()                //返回当前只读流是否暂停
     readStream.read([size])              //返回读取的指定字节数据(size<=1GB),默认返回buffer对象,没有指定size返回所有可读数据,没有可读数据返回null
     readStream.push(chunk,[encoding])    //返回当前只读流内部缓冲是否未满,以指定字符编码将额外数据块chunk推入只读流内部缓冲
     readStream.unshift(chunk,[encoding]) //无返回值,将已经消费的数据块chunk推回只读流内部缓冲,用于已消费数据但反悔的情况
     readStream.pipe(des,[{endFlag}])     //返回目标流des,将当前只读流切换到流动模式并将其所有数据推送到绑定的目标流,可选参数endFlag表示读取结束时是否结束写入(默认true)
     readStream.unpipe([des])             //返回当前只读流,解绑通过readable.pipe()绑定的目标流des
     readStream.destroy()                 //返回并销毁当前只读流,触发close事件


options：
objectMode    //当前只读流是否为对象模式(默认false)
highWaterMark //当前只读流内部缓冲的最大字节数(默认16384,16KB)
encoding      //当前只读流内部缓冲使用的字符编码(默认null)
autoDestroy   //当前只读流结束后是否应该自动调用readStream.destroy()方法(默认false)
emitClose     //当前只读流销毁后是否应该触发close事件(默认true)
signal        //当前只读流可能取消的信号
construct     //readStream._construct() 方法的实现
read          //readStream._read() 方法的实现
destroy       //readStream._destroy() 方法的实现


Readable 事件：
readStream.ondata     //当只读流将数据块发送给消费者时触发
readStream.onreadable //当只读流内部缓冲存在数据可被消费时触发
readStream.onend      //当只读流内部缓冲的数据被完全消费后触发
readStream.onpause    //当只读流切换成暂停模式时触发
readStream.onresume   //当只读流切换成流动模式时触发
readStream.onerror    //当只读流发生错误时触发,error事件触发后除close事件外不再触发其他事件
readStream.onclose    //当只读流销毁时触发,不会再触发其他事件
```

#### ① 只读流的自定义创建

自定义创建只读流必须调用 `new stream.Readable([options])` 构造函数，并且需要实现 `readStream._read()` 方法

```js
import stream from 'stream'

const readStream = new stream.Readable({
  read() {}
})
readStream.push('hello')
readStream.push('world!')

const writeStream = new stream.Writable({
  write(chunk, encoding, next) {
    next()
  }
})
readStream.pipe(writeStream)
writeStream.end()
```

![只读流的自定义创建](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%8F%AA%E8%AF%BB%E6%B5%81%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%9B%E5%BB%BA.png)

#### ② 只读流的可读流动状态

只读流的可读流动状态有如下 3 种

* **readStream.readableFlowing === null**：当前只读流不可读，不会读取数据
* **readStream.readableFlowing === true（流动模式）**：当前只读流可读且流动，读取数据且主动触发事件流动被消费
  * `自动`从底层系统读取数据块，并通过 `EventEmitter` 接口的事件尽可能快的被提供给应用程序
* **readStream.readableFlowing === false（暂停模式）**：当前只读流可读但不流动，读取数据但暂停事件流动数据未被消费，因此数据可能会堆积在只读流的`内部缓冲`
  * `手动`调用 `readStream.read()` 读取数据块

所有只读流都开始于`暂停模式`，从暂停模式切换到流动模式有如下 3 种方式，如果只读流切换到流动模式但是没有消费者处理数据，`数据将会丢失`

* 添加 data 事件监听
* 调用 readStream.pipe() 方法
* 调用 readStream.resume() 方法

从流动模式切换回暂停模式

* 如果有管道目标，则调用 readStream.unpipe() 方法移除所有管道目标
* 如果没有管道目标，则调用 readStream.pause() 方法

#### ③ 只读流的消费 API

只读流的消费 API 跨越多个 Node 版本的迭代，提供了多种消费只读流数据的方法，一般情况下，开发者应该只选择一种数据消费方法，切忌使用多种方式消费同一只读流的数据，这可能会导致不直观的行为，建议大家使用 `readStream.pipe(des,[{endFlag}])` 方法，因为这是消费只读流数据的最简单方法

实例见下方只写流

### (4) stream.Writable 类

stream.Writable 类表示`只写流`

```js
定义：const writeStream = new stream.Writable([options])
属性：writeStream.writableObjectMode           //返回/设置当前只写流是否为对象模式
     writeStream.writableHighWaterMark        //返回当前只写流内部缓冲的最大字节数
     writeStream.writableLength               //返回当前只写流内部缓冲的字节数
     writeStream.writableCorked               //返回为了完全unlock当前只写流需要调用writable.unlock()的次数
     writeStream.writableEnded                //返回当前只写流是否已关闭
     writeStream.writableFinished             //返回当前只写流是否是否数据均已刷新到底层系统
     writeStream.writable                     //返回当前只写流内部缓冲是否未满可写入
     writeStream.writableNeedDrain            //返回当前只写流的缓冲区是否已满且即将排空并触发drain事件
     writeStream.destroyed                    //返回当前只写流是否已销毁
方法：writeStream.setDefaultEncoding(encoding) //返回当前只写流,为当前只写流设置默认字符编码 
     writeStream.write(chunk,[encoding],[cb]) //返回当前只写流内部缓冲是否未满,写入数据块chunk到当前只写流(true:未满,false:已满),该方法一旦返回false则不建议再写入数据
     writeStream.cork()                       //无返回值,强制将调用该方法之后写入的所有数据都添加到内部缓冲而不输出到目标
     writeStream.uncork()                     //无返回值,将调用stream.cork()以来缓冲的所有数据输出到目标,建议使用process.nextTick()延迟writable.uncork()的调用
     writeStream.end([chunk],[encoding],[cb]) //返回并关闭当前只写流,可选参数chenk,encoding允许在关闭前写入最后一个额外数据块
     writeStream.destroy([error])             //返回并销毁当前只写流,触发close事件


options：
objectMode      //当前只写流是否为对象模式(默认false)
highWaterMark   //当前只写流内部缓冲的最大字节数(默认16384,16KB)
decodeStrings   //当前只写流调用writeStream.write()方法时是否将字符串编码为buffer(默认true)
defaultEncoding //当前只写流调用writeStream.write()方法时使用的默认字符串编码(默认utf8,优先级低于decodeStrings)
autoDestroy     //当前只读流结束后是否应该自动调用writeStream.destroy()方法(默认false)
emitClose       //当前只写流销毁后是否应该触发close事件(默认true)
signal          //当前只写流可能取消的信号
construct       //writeStream._construct()方法的实现
write           //writeStream._write()方法的实现
writev          //writeStream._writev()方法的实现
final           //writeStream._final()方法的实现
destroy         //writeStream._destroy() 法的实现


Writable 事件：
writeStream.ondrain  //当只写流内部缓冲排空都交付给底层系统时触发
writeStream.onpipe   //当某个只读流调用readStream.pipe()将当前只写流添加到其目标集时触发
writeStream.onunpipe //当某个只读流调用readStream.unpipe()将当前只写流从其目标集移除时触发
writeStream.onerror  //当只写流发生错误时触发,error事件触发后除close事件外不再触发其他事件
writeStream.onfinish //当只写流关闭且所有数据都交付给操作系统后触发
writeStream.onclose  //当只写流销毁时触发,不会再触发其他事件
```

#### ① 只写流的自定义创建

自定义创建只写流必须调用 `new stream.Writable([options])` 构造函数，并且需要实现 `writeStream.write()` 方法

```js
import stream from 'stream'

const writeStream = new stream.Writable({
  write(chunk, encoding, next) {
    next()
  }
})

writeStream.write('hello world!')
```

![只写流的自定义创建](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%8F%AA%E5%86%99%E6%B5%81%E7%9A%84%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%9B%E5%BB%BA.png)

#### ② writeStream.cork()/uncork()

```js
const writeStream = new stream.Writable({
  write(chunk, encoding, next) {
    console.log(chunk.toString())
    next()
  }
})
writeStream.write('hello')
writeStream.write('world!')
```

![writeStream_cork1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/writeStream_cork1.png)

```js
const writeStream = new stream.Writable({
  write(chunk, encoding, next) {
    console.log(chunk.toString())
    next()
  }
})
writeStream.write('hello')
writeStream.cork()
writeStream.write('world!')
```

![writeStream_cork2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/writeStream_cork2.png)

```js
const writeStream = new stream.Writable({
  write(chunk, encoding, next) {
    console.log(chunk.toString())
    next()
  }
})
writeStream.write('hello')
writeStream.cork()
writeStream.write('world!')
writeStream.uncork()
```

![writeStream_cork1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/writeStream_cork1.png)

### (5) stream.Duplex 类

stream.Duplex 类同时实现了 stream.Readable 类的接口与 stream.Writable 类的接口，由于 JS 不支持多重继承，因此扩展了 stream.Duplex 类以实现双工流

双工流既可以作为上游产生数据，也可以作为下游消费数据，因此常处于`数据流动管道的中间部分`

```js
rs.pipe(rws1).pipe(rws2).pipe(rws3).pipe(ws);
```

双工流的来源有以下 3 种

* 压缩流
* 加密流
* TCP 套接字

双工流除只读流和只写流以外的其他 API 如下

```js
定义：const duplexStream = new stream.Duplex([options])


options：
readable              //当前双工流是否可读(默认true)
writable              //当前双工流是否可写(默认true)
readableHighWaterMark //当前双工流可读端内部缓冲最大字节数
writableHighWaterMark //当前双工流可写端内部缓冲最大字节数
readableObjectMode    //当前双工流可读端是否为对象模式(默认false)
writableObjectMode    //当前双工流可写端是否为对象模式(默认false)
allowHalfOpen         //当前双工流可读端结束时是否不自动结束可写端(默认true)
```

### (6) stream.Transform 类

stream.Transform 类同时实现了 stream.Readable 类的接口与 stream.Writable 类的接口，由于 JS 不支持多重继承，因此扩展了 stream.Transform 类以实现转换流，转换流与双工流不同的是，转换流的`输出是输入的转换`

stream.PassThrough 类是转换流的简单实现，只是`将输入传到输出`，没有做任何计算和转换，主要目的是用于示例和测试

转换流既可以作为上游产生数据，也可以作为下游消费数据，因此常处于`数据流动管道的中间部分`

```js
rs.pipe(rws1).pipe(rws2).pipe(rws3).pipe(ws);
```

转换流的来源有以下 2 种

* 压缩流
* 加密流

转换流除只读流和只写流以外的其他 API 如下

```js
定义：const transStream = new stream.Transform([options])
     const transStream = new stream.PassThrough()


options：
transform //transStream._transform() 方法的实现
flush     //transStream._flush() 方法的实现
```

## 2. zlib 模块

### (1) zlib 模块

zlib 模块提供了使用 `Deflate/Inflate、Brotli、Gzip` 算法实现的压缩功能，压缩和解压都是围绕 `Node stream API` 构建的，压缩和解压流是将源流通过`转换流`管道传输到目标流完成

Deflate/Inflate 压缩算法是一种`过时`的压缩算法，浏览器对其支持并不好，`不建议使用`

### (2) zlib 常量

压缩策略

zlib.constants.Z_FILTERED
zlib.constants.Z_HUFFMAN_ONLY
zlib.constants.Z_RLE
zlib.constants.Z_FIXED
zlib.constants.Z_DEFAULT_STRATEGY

压缩级别

zlib.constants.Z_NO_COMPRESSION
zlib.constants.Z_BEST_SPEED
zlib.constants.Z_BEST_COMPRESSION
zlib.constants.Z_DEFAULT_COMPRESSION

压缩/解压函数的返回代码

zlib.constants.Z_OK
zlib.constants.Z_STREAM_END
zlib.constants.Z_NEED_DICT
zlib.constants.Z_ERRNO
zlib.constants.Z_STREAM_ERROR
zlib.constants.Z_DATA_ERROR
zlib.constants.Z_MEM_ERROR
zlib.constants.Z_BUF_ERROR
zlib.constants.Z_VERSION_ERROR

允许的刷新值

zlib.constants.Z_NO_FLUSH
zlib.constants.Z_PARTIAL_FLUSH
zlib.constants.Z_SYNC_FLUSH
zlib.constants.Z_FULL_FLUSH
zlib.constants.Z_FINISH
zlib.constants.Z_BLOCK
zlib.constants.Z_TREES

### (3) zlib 压缩和解压类

* **zlib.Deflate 类**：使用 Deflate 算法压缩数据
* **zlib.Inflate 类**：使用 Inflate 算法解压数据
* **zlib.DeflateRaw 类**：使用 Deflate 算法压缩数据，不附加 zlib 标头
* **zlib.InflateRaw 类**：使用 Inflate 算法解压不附加 zlib 标头的数据
* **zlib.BrotliCompress 类**：使用 Brotli 算法压缩数据
* **zlib.BrotliDecompress 类**：使用 Brotli 算法解压数据
* **zlib.Gzip 类**：使用 Gzip 算法压缩数据
* **zlib.Gunzip 类**：使用 Gzip 算法解压数据
* **zlib.Unzip 类**：通过`自动检测标头`来解压 Gzip、Deflate 算法压缩的数据

### (4) zlib Options 类

每个基于 zlib 的类都有一个 options 对象

* Options 类

  ```js
  flush
  finishFlush
  chunkSize
  windowBits
  level
  memLevel
  strategy
  dictionary
  info
  maxOutputLength
  ```

* BrotliOptions 类

  ```js
  flush 
  finishFlush 
  chunkSize
  params
  maxOutputLength 
  ```

### (5) zlib API

```js
定义：import zlib from 'zlib'
属性：zlib.constants                              //返回 zlib 相关常量
     zlib.bytesWritten                           //返回/设置压缩或解压之前写入引擎的字节数
方法：管道 API：
     zlib.createDeflate([options])               //返回并创建新的 Deflate 对象
     zlib.createInflate([options])               //返回并创建新的 Inflate 对象
     zlib.createDeflateRaw([options])            //返回并创建新的 DeflateRaw 对象
     zlib.createInflateRaw([options])            //返回并创建新的 InflateRaw 对象
     zlib.createBrotliCompress([options])        //返回并创建 BrotliCompress 对象
     zlib.createBrotliDecompress([options])      //返回并创建新的 BrotliDecompress 对象
     zlib.createGzip([options])                  //返回并创建新的 Gzip 对象
     zlib.createGunzip([options])                //返回并创建新的 Gunzip 对象
     zlib.createUnzip([options])                 //返回并创建新的 Unzip 对象
     同步 API：
     zlib.deflateSync(buffer,[options])          //返回压缩后的 buffer,使用 Deflate 算法压缩 buffer
     zlib.inflateSync(buffer,[options])          //返回解压后的 buffer,使用 Inflate 算法解压 buffer
     zlib.deflateRawSync(buffer,[options])       //返回压缩后的 buffer,使用 Deflate 算法压缩 buffer，不附加 zlib 标头
     zlib.inflateRawSync(buffer,[options])       //返回解压后的 buffer,使用 Inflate 算法解压不附加 zlib 标头的 buffer
     zlib.brotliCompressSync(buffer,[options])   //返回压缩后的 buffer,使用 Brotli 算法压缩 buffer
     zlib.brotliDecompressSync(buffer,[options]) //返回解压后的 buffer,使用 Brotli 算法解压 buffer
     zlib.gzipSync(buffer,[options])             //返回压缩后的 buffer,使用 Gzip 算法压缩 buffer
     zlib.gunzipSync(buffer,[options])           //返回解压后的 buffer,使用 Gzip 算法解压 buffer
     zlib.unzipSync(buffer,[options])            //返回解压后的 buffer,通过自动检测标头来解压 Gzip、Deflate 算法压缩的 buffer
     异步 API：
     zlib.deflate(buffer,[options],cb)           //无返回值,使用 Deflate 算法压缩 buffer
     zlib.inflate(buffer,[options],cb)           //无返回值,使用 Inflate 算法解压 buffer
     zlib.deflateRaw(buffer,[options],cb)        //无返回值,使用 Deflate 算法压缩 buffer，不附加 zlib 标头
     zlib.inflateRaw(buffer,[options],cb)        //无返回值,使用 Inflate 算法解压不附加 zlib 标头的 buffer
     zlib.brotliCompress(buffer,[options],cb)    //无返回值,使用 Brotli 算法压缩 buffer
     zlib.brotliDecompress(buffer,[options],cb)  //无返回值,使用 Brotli 算法解压 buffer
     zlib.gzip(buffer,[options],cb)              //无返回值,使用 Gzip 算法压缩 buffer
     zlib.gunzip(buffer,[options],cb)            //无返回值,使用 Gzip 算法解压 buffer
     zlib.unzip(buffer,[options],cb)             //无返回值,通过自动检测标头来解压 Gzip、Deflate 算法压缩的 buffer
     其他方法：
     zlib.params(level,strategy,cb)              //无返回值,动态更新压缩策略和压缩级别(deflate)
     zlib.reset()                                //无返回值,将压缩器或解压器重置为出厂默认设置(deflate、inflate)
     zlib.flush([kind],cb)                       //无返回值,刷新挂起数据
     zlib.close([cb])                            //无返回值,关闭底层句柄
```

### (6) 实例

* 管道 API

  ```js
  import fs from 'fs'
  import zlib from 'zlib'

  fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('output.gz'))
  ```

  ![zlib管道API](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/zlib%E7%AE%A1%E9%81%93API.png)

* 同步 API

  ```js
  import fs from 'fs'
  import zlib from 'zlib'

  const buffer = zlib.gzipSync('hello world!')
  fs.writeFile('output2.gz', buffer, null, err => {
    if(err){
      console.log('failed')
    } else {
      console.log('succed')
    }
  })
  ```

  ![zlib同步API](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/zlib%E5%90%8C%E6%AD%A5API.png)

* 异步 API

  ```js
  import fs from 'fs'
  import zlib from 'zlib'

  zlib.gzip('hello world!', null, (err, buffer) => {
    if(!err) {
      fs.writeFile('output3.gz', buffer, null, err => {
        if(err){
          console.log('failed')
        } else {
          console.log('succed')
        }
      })
    }
  }) 
  ```

  ![zlib异步API](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/zlib%E5%BC%82%E6%AD%A5API.png)

## 3. crypto 模块

### (1) crypto 模块

Node crypto 模块提供了`加密解密功能`，实现了对 `OpenSSL` 的哈希、HMAC、加密、解密、签名、验证功能的一整套封装

### (2) crypto API

```js
定义：import crypto from 'crypto'
属性：crypto.constants
     crypto.webcrypto
方法：crypto.checkPrime(candidate,[options],[cb])
     crypto.checkPrimeSync(candidate,[options])
     crypto.createCipheriv(algorithm,key,iv,[options])
     crypto.createDecipheriv(algorithm,key,iv,[options])
     crypto.createDiffieHellman(prime,[primeEncoding],[generator],[generatorEncoding])
     crypto.createDiffieHellman(primeLength,[generator])
     crypto.createDiffieHellmanGroup(name)
     crypto.createECDH(curveName)
     crypto.createHash(algorithm,[options])
     crypto.createHmac(algorithm,key,[options])
     crypto.createPrivateKey(key)
     crypto.createPublicKey(key)
     crypto.createSecretKey(key,[encoding])
     crypto.createSign(algorithm,[options])
     crypto.createVerify(algorithm,[options])
     crypto.diffieHellman(options)
     crypto.generateKey(type,options,cb)
     crypto.generateKeyPair(type,options,cb)
     crypto.generateKeyPairSync(type,options)
     crypto.generateKeySync(type,options)
     crypto.generatePrime(size,[options,[cb]])
     crypto.generatePrimeSync(size,[options])
     crypto.getCipherInfo(nameOrNid,[options])
     crypto.getCiphers()
     crypto.getCurves()
     crypto.getDiffieHellman(groupName)
     crypto.getFips()
     crypto.getHashes()
     crypto.hkdf(digest,ikm,salt,info,keylen,cb)
     crypto.hkdfSync(digest,ikm,salt,info,keylen)
     crypto.pbkdf2(password,salt,iterations,keylen,digest,cb)
     crypto.pbkdf2Sync(password,salt,iterations,keylen,digest)
     crypto.privateDecrypt(privateKey,buffer)
     crypto.privateEncrypt(privateKey,buffer)
     crypto.publicDecrypt(key,buffer)
     crypto.publicEncrypt(key,buffer)
     crypto.randomBytes(size,[cb])
     crypto.randomFillSync(buffer,[offset],[size])
     crypto.randomFill(buffer,[offset],[size],cb)
     crypto.randomInt([min],max,[cb])
     crypto.randomUUID([options])
     crypto.scrypt(password,salt,keylen,[options],cb)
     crypto.scryptSync(password,salt,keylen,[options])
     crypto.secureHeapUsed()
     crypto.setEngine(engine,[flags])
     crypto.setFips(bool)
     crypto.sign(algorithm,data,key,[cb])
     crypto.timingSafeEqual(a,b)
     crypto.verify(algorithm,data,key,signature,[cb])
```

## 4. buffer 模块

### (1) 字符编码

#### ① 字符集

计算机内部所有信息都是一个`二进制值`，二进制值的每个二进制位 bit 都有 0 和 1 两种状态，一个字节 byte 具有 8 个二进制位 bit，可以组合成 256 种状态，每个状态对应一个符号，从 00000000 ~ 11111111

字符集定义了`字符和二进制位`之间的对应关系，字符集为每个字符分配唯一的`字符编号`

* **ASCII 字符集**：使用 `1` 个字节给各个字符编号，最高位为 0，剩下 7 位可表示 `128` 个英文字符
  * 上世纪 60 年代，美国制定了 ASCII 字符集，统一规定了英文字符和二进制位的关系，一直沿用至今
* **Unicode 字符集**：使用 `1~6` 个字节给各个字符编号，可表示`上百万个世界上所有字符`
  * 英文字符 128 个字符编码当然够用，但是其他语言是不够的，例如汉字多达十万左右
  * 世界上存在多种编码方式，同一个二进制数字使用不同的编码方式可以被解释成不同的符号，因此想要打开一个文件，就必须知道它的编码方式，否则用错误的编码方式解读就会出现乱码，电子邮件常出现乱码就是因为发件人和收件人使用的编码不一样
  * Unicode 字符集现在的规模可以容纳 `100 多万`个符号，也就可以容纳世界上所有的符号，每个符号都给予一个独一无二的编码，乱码问题因此而消失

#### ② Unicode 字符编码

字符编码定义了如何将字符编号存储到`内存`，故而存储在内存的仅仅是字符编号，而不是真正的字符实体

Unicode 字符集有如下 3 种字符编码方式，数字表示每种字符编码存储所需的`最少比特位数`，`UTF-8` 是互联网使用最广的一种编码方式，UTF-16、UTF-32 在互联网基本不用

* **UTF-8**：`变长`，使用 `1~6` 个字节存储字符编号，如果只有一个字节，那么最高的比特位为 0，如果有多个字节，那么第一个字节从最高位开始，使用几个字节编码，就连续有几个比特位的值为 1，剩下的字节均以 10 开头
* **UTF-16**：`既固长又变长`，使用 `2~4` 个字节存储字符编号，对于字符编号在 0~FFFF 之间的字符，使用 2 个字节直接存储字符编号，无需任何编码转换，对于字符编号在 10000~10FFFF 之间的字符，使用 4 个字节存储，将字符编号的所有比特位分成两部分
* **UTF-32**：`固长`，使用 `4` 个字节存储字符编号，足以容纳所有的字符编号，所以直接存储字符编号即可，无需任何编码转换，浪费了空间，提高了效率

Global 对象是 ES 中的`全局对象`，浏览器和 Node 对 Global 对象的实现不同，Global 对象上具有以下编码/解码方法

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

#### ③ Node 支持的字符编码

Node 目前支持以下 `4` 种类型的`字符编码`

* 编码：字符串转 buffer
* 解码：buffer 转字符串

|字符编码|描述|
|:------|:---|
|ascii|ASCII 编码|
|utf8|UTF-8 编码：互联网最常用的编码方式|
|utf16le、ucs2（别名）|UTF-16 编码：不常用|
|latin1、binary（别名）|latin1 编码：不常用|

Node 还支持以下 `3` 种类型的`二进制转文本编码`

* 编码：buffer 转字符串
* 解码：字符串转 buffer

|二进制转文本编码|描述|
|:------|:---|
|base64|Base64 编码：常用于加密|
|base64url|base64url 编码：常用于加密 url|
|hex|hex 编码：不常用|

### (2) buffer 模块

ES 没有二进制数据类型，但是 Node 处理`文件流或 TCP 流`时必须使用二进制数据，因此 Node 提供了 buffer 模块用于创建一个专门存放二进制数据的缓存区，buffer 对应 `V8 堆内存之外的一块原始内存`

#### ① 二进制数组 API

WebGL 是浏览器与显卡间的通信接口，为了满足 JS 与显卡间大量实时的数据交换，两者之间的数据通信必须是`二进制`而非传统的`文本格式`，由此 ES6 新增二进制数组 API，允许开发者以`数组下标`的形式直接操作内存，与操作系统的原生接口进行`二进制通信`

* **文本格式**：传递一个 `32 位整数`，JS 脚本与显卡都要进行数据转换，非常耗时
* **二进制数据**：直接操作字节，将 4 个字节的 32 位整数，以`二进制形式`原封不动地送入显卡，JS 脚本的性能将大幅度提升

二进制数组 API 如下

* ArrayBuffer 对象
* TypedArray 视图
* DataView 视图

#### ② ArrayBuffer 对象

ArrayBuffer 对象表示`存储二进制数据的一段连续内存`，不能直接读写，只能通过 `TypedArray/DataView 视图`读写

#### ③ TypedArray 视图

ArrayBuffer 对象作为内存区域可以存放`多种类型的数据`，视图就是同一段内存区域的数据可以有`不同的解读格式`，视图的作用是`以指定格式解读二进制数据`

* TypedArray 类数组对象只是视图，`本身不存储数据`，数据存储在底层的 ArrayBuffer 对象
* 所有成员都是`同一类型`
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

#### ④ Uint8Array 视图

Uint8Array 视图就是 `8 位无符号整数`，Node Buffer 类就是 ES6 Uint8Array 类的`子类`，Node 在支持 buffer 的地方也支持普通的 Uint8Array

### (3) buffer.Buffer 类

Node Buffer 类是 ES6 Uint8Array 类、TypedArray 类的子类，因此所有 ES6 TypedArray 方法都可以在 Node buffer 上使用，但是 Node buffer API 与 ES6 TypedArray API 存在`细微的不兼容`

```js
定义：import { Buffer } from 'buffer'
     Buffer.alloc(len,val,enc)              //返回buffer实例,使用enc编码,val填充到指定长度len
     Buffer.from(str,enc)                   //返回buffer实例,使用enc编码str
     Buffer.from(arr)                       //返回buffer实例,使用0-255范围内的字节数组分配buffer
     Buffer.from(arrayBuffer,n,len)         //返回buffer实例,创建arrayBuffer从索引n开始的len字节的视图,buffer实例与arrayBuffer共享相同的底层内存
     Buffer.from(buffer)                    //返回buffer实例,复制传入的buffer实例数据,重新分配新的内存
属性：常量属性：
     Buffer.poolSize                        //返回用于池的预分配内部buffer实例的字节大小
     Buffer.INSPECT_MAX_BYTES               //返回调用buffer.inspect()时将返回的最大字节数
     Buffer.constants.MAX_LENGTH            //返回单个buffer实例允许的最大大小
     Buffer.constants.MAX_STRING_LENGTH     //返回单个string实例允许的最大大小
     实例属性：
     buffer.buffer                          //返回buffer基于的底层ArrayBuffer对象
     buffer.byteOffset                      //返回buffer基于的底层ArrayBuffer对象的字节偏移量byteOffset
     buffer.length                          //返回buffer的字节数
     buffer[index]                          //返回buffer指定索引处的字节
方法：静态方法：
     Buffer.isBuffer(obj)                   //返回obj是否为Buffer
     Buffer.isEncoding(enc)                 //返回Buffer是否支持encoding
     Buffer.byteLength(str,enc)             //返回str使用encoding编码后的字节长度
     Buffer.concat(arr,len)                 //返回新buffer,连接arr数组内的所有buffer,并截断为总长度len
     Buffer.compare(buf1,buf2)              //返回数字,表示buf1和buf2的字符编码位置关系(-1:buf1位于buf2之前,0:buf1与buf2相同,1:buf1位于buf2之后)
     实例方法：
     buffer.toJSON()                        //返回buffer的JSON表示,JSON.stringify(buffer)时隐式调用此方法
     buffer.toString(enc,n1,n2)             //返回根据指定字符编码解码buffer索引n1到索引n2前一项后的字符串
     查询方法：
     buffer.includes(val,n,enc)             //返回buffer是否包含val,从索引n处开始搜索
     buffer.indexOf(val,n,enc)              //返回查找到的第一个val的索引,由索引n处或buffer头部从前往后搜索
     buffer.lastIndexOf(val,n,enc)          //返回查找到的第一个val的索引,由索引n处或buffer尾部从后往前搜索
     操作方法：
     buffer.fill(val,n1,n2,enc)             //返回buffer,使用val填充buffer的索引n1处到索引n2前一项
     buffer.copy(target,tn1,sn1,sn2)        //返回从buffer复制的字节数量,将buffer索引sn1到索引sn2前一项复制到从target索引tn1开始
     buffer.subarray(n1,n2)                 //返回新buffer,由buffer索引n1到索引n2前一项构成,共享底层内存
     buffer.slice(n1,n2)                    //返回新buffer,由buffer索引n1到索引n2前一项构成,共享底层内存
     比较方法：
     buffer.equals(buffer1)                 //返回buffer与buffer1是否具有完全相同的字节
     buffer.compare(target,tn1,tn2,sn1,sn2) //返回数字,表示buffer索引sn1到索引sn2前一项与target索引tn1到索引tn2前一项的字符编码位置关系(-1:buffer位于target之前,0:buffer与target相同,1:buffer位于target之后)
     遍历方法：
     buffer.keys()                          //返回索引的遍历器对象,可使用for-of循环遍历
     buffer.values()                        //返回值的遍历器对象,可使用for-of循环遍历
     buffer.entries()                       //返回[索引,值]的遍历器对象,可使用for-of循环遍历
     解读交换方法：
     buffer.swap16()                        //返回buffer的引用,将buffer解读为无符号16位整数数组,并交换字节顺序
     buffer.swap32()                        //返回buffer的引用,将buffer解读为无符号32位整数数组,并交换字节顺序
     buffer.swap64()                        //返回buffer的引用,将buffer解读为64位数字数组,并交换字节顺序
     读取方法：
     buffer.readIntBE(n,len)                //返回从buffer索引n处读取的len个字节,并将结果解读为支持最高48位精度的有符号大端序整数
     buffer.readIntLE(n,len)                //返回从buffer索引n处读取的len个字节,并将结果解读为支持最高48位精度的有符号小端序整数
     buffer.readUIntBE(n,len)               //返回从buffer索引n处读取的len个字节,并将结果解读为支持最高48位精度的无符号大端序整数
     buffer.readUIntLE(n,len)               //返回从buffer索引n处读取的len个字节,并将结果解读为支持最高48位精度的无符号小端序整数
     buffer.readInt8(n)                     //返回从buffer索引n处读取的有符号8位整数
     buffer.readUInt8(n)                    //返回从buffer索引n处读取的无符号8位整数
     buffer.readInt16BE(n)                  //返回从buffer索引n处读取的有符号大端序16位整数
     buffer.readInt16LE(n)                  //返回从buffer索引n处读取的有符号小端序16位整数
     buffer.readUInt16BE(n)                 //返回从buffer索引n处读取的无符号大端序16位整数
     buffer.readUInt16LE(n)                 //返回从buffer索引n处读取的无符号小端序16位整数
     buffer.readInt32BE(n)                  //返回从buffer索引n处读取的有符号大端序32位整数
     buffer.readInt32LE(n)                  //返回从buffer索引n处读取的有符号小端序32位整数
     buffer.readUInt32BE(n)                 //返回从buffer索引n处读取的无符号大端序32位整数
     buffer.readUInt32LE(n)                 //返回从buffer索引n处读取的无符号小端序32位整数
     buffer.readBigInt64BE(n)               //返回从buffer索引n处读取的有符号大端序64位整数
     buffer.readBigInt64LE(n)               //返回从buffer索引n处读取的有符号小端序64位整数
     buffer.readBigUInt64BE(n)              //返回从buffer索引n处读取的无符号大端序64位整数
     buffer.readBigUInt64LE(n)              //返回从buffer索引n处读取的无符号小端序64位整数
     buffer.readFloatBE(n)                  //返回从buffer索引n处读取的大端序32位浮点数
     buffer.readFloatLE(n)                  //返回从buffer索引n处读取的小端序32位浮点数
     buffer.readDoubleBE(n)                 //返回从buffer索引n处读取的大端序64位双精度值
     buffer.readDoubleLE(n)                 //返回从buffer索引n处读取的小端序64位双精度值
     写入方法：
     buffer.write(str,n,len,enc)            //返回写入的字节数量,根据字符编码enc将str写入buffer的索引n处,若没有足够空间则只写入str的一部分
     buffer.writeIntBE(val,n,len)           //返回索引n加上写入的字节数量,将val的len个字节作为有符号大端序写入buffer的索引n处
     buffer.writeIntLE(val,n,len)           //返回索引n加上写入的字节数量,将val的len个字节作为有符号小端序写入buffer的索引n处
     buffer.writeUIntBE(val,n,len)          //返回索引n加上写入的字节数量,将val的len个字节作为无符号大端序写入buffer的索引n处
     buffer.writeUIntLE(val,n,len)          //返回索引n加上写入的字节数量,将val的len个字节作为无符号小端序写入buffer的索引n处
     buffer.writeInt8(val,n)                //返回索引n加上写入的字节数量,将val作为有符号8位整数写入buffer的索引n处
     buffer.writeUInt8(val,n)               //返回索引n加上写入的字节数量,将val作为无符号8位整数写入buffer的索引n处
     buffer.writeInt16BE(val,n)             //返回索引n加上写入的字节数量,将val作为有符号大端序16位整数写入buffer的索引n处
     buffer.writeInt16LE(val,n)             //返回索引n加上写入的字节数量,将val作为有符号小端序16位整数写入buffer的索引n处
     buffer.writeUInt16BE(val,n)            //返回索引n加上写入的字节数量,将val作为无符号大端序16位整数写入buffer的索引n处
     buffer.writeUInt16LE(val,n)            //返回索引n加上写入的字节数量,将val作为无符号小端序16位整数写入buffer的索引n处
     buffer.writeInt32BE(val,n)             //返回索引n加上写入的字节数量,将val作为有符号大端序32位整数写入buffer的索引n处
     buffer.writeInt32LE(val,n)             //返回索引n加上写入的字节数量,将val作为有符号小端序32位整数写入buffer的索引n处
     buffer.writeUInt32BE(val,n)            //返回索引n加上写入的字节数量,将val作为无符号大端序32位整数写入buffer的索引n处
     buffer.writeUInt32LE(val,n)            //返回索引n加上写入的字节数量,将val作为无符号小端序32位整数写入buffer的索引n处
     buffer.writeBigInt64BE(val,n)          //返回索引n加上写入的字节数量,将val作为有符号大端序64位整数写入buffer的索引n处
     buffer.writeBigInt64LE(val,n)          //返回索引n加上写入的字节数量,将val作为无符号小端序64位整数写入buffer的索引n处
     buffer.writeBigUInt64BE(val,n)         //返回索引n加上写入的字节数量,将val作为有符号大端序64位整数写入buffer的索引n处
     buffer.writeBigUInt64LE(val,n)         //返回索引n加上写入的字节数量,将val作为无符号小端序64位整数写入buffer的索引n处
     buffer.writeFloatBE(val,n)             //返回索引n加上写入的字节数量,将val作为大端序32位浮点数写入buffer的索引n处
     buffer.writeFloatLE(val,n)             //返回索引n加上写入的字节数量,将val作为小端序32位浮点数写入buffer的索引n处
     buffer.writeDoubleBE(val,n)            //返回索引n加上写入的字节数量,将val作为大端序64位双精度值写入buffer的索引n处
     buffer.writeDoubleLE(val,n)            //返回索引n加上写入的字节数量,将val作为小端序64位双精度值写入buffer的索引n处
```

#### ① 创建 buffer 实例

```js
import { Buffer } from 'buffer'

//ArrayBuffer对象表示存储二进制数据的一段连续内存,不能直接读写,只能通过TypedArray/DataView视图读写
const arraybuffer = new ArrayBuffer(6) //分配一段6字节的连续内存
const buf1 = Buffer.alloc(6)
const buf2 = Buffer.alloc(6, 'a')
const buf3 = Buffer.from('this is a example')
const buf4 = Buffer.from([0x61, 0x61, 0x61, 0x61, 0x61, 0x61])
const buf5 = Buffer.from(arraybuffer, 1, 2)
const buf6 = Buffer.from(buf2) //值传递而非引用传递
buf2[1] = 0x72

console.log(buf1) //<Buffer 00 00 00 00 00 00>
console.log(buf2) //<Buffer 61 72 61 61 61 61>
console.log(buf3) //<Buffer 74 68 69 73 20 69 73 20 61 20 65 78 61 6d 70 6c 65>
console.log(buf4) //<Buffer 61 61 61 61 61 61>
console.log(buf5) //<Buffer 00 00>
console.log(buf6) //<Buffer 61 61 61 61 61 61>
```

#### ② 实例方法

```js
import { Buffer } from 'buffer'

const buf2 = Buffer.alloc(6, 'a')
buf2[1] = 0x72
console.log(buf2.toJSON())   //{type: 'buffer', data:[ 97, 114, 97, 97, 97, 97 ]}
console.log(buf2.toString()) //'araaaa'
```

#### ③ 查询方法

```js
str.indexOf(str1,n)     //返回查到的第一个子串str1的索引,由索引n处或字符串头部从前往后搜索
str.lastIndexOf(str1,n) //返回查到的第一个子串str1的索引,由索引n处或字符串尾部从后往前搜索

arr.indexOf(a,n)     //返回查找到的第一个数组项a的索引,由索引n处或数组头部从前往后搜索
arr.lastIndexOf(a,n) //返回查找到的第一个数组项a的索引,由索引n处或数组尾部从后往前搜索

buffer.indexOf(val,n,enc)     //返回查找到的第一个val的索引,由索引n处或buffer头部从前往后搜索
buffer.lastIndexOf(val,n,enc) //返回查找到的第一个val的索引,从索引n处或buffer尾部从后往前搜索


const str = "hello world"
console.log(str.indexOf("o"))         //4
console.log(str.lastIndexOf("o"))     //7
console.log(str.indexOf("o", 6))      //7
console.log(str.lastIndexOf("o", 6))  //4


const arr =[1, 2, NaN, 4, -5, 4, 3, 2, 1]
console.log(arr.indexOf(4))         //3
console.log(arr.lastIndexOf(4))     //5
console.log(arr.indexOf(4, 4))      //5
console.log(arr.lastIndexOf(4, 4))  //3
console.log(arr.indexOf(4, -1))     //-1  index(a, -1)=index(a, 8)
console.log(arr.lastIndexOf(4, -1)) //5   index(a, -1)=index(a, 8)


import { Buffer } from 'buffer'
const buf3 = Buffer.from('this is a example')
console.log(buf3.includes('this'))     //true
console.log(buf3.includes(97))         //true, 97 是 'a' 的十进制 ASCII 值
console.log(buf3.indexOf('a'))         //8
console.log(buf3.lastIndexOf('a'))     //12
console.log(buf3.indexOf('a', 10))     //12
console.log(buf3.lastIndexOf('a', 10)) //8
```

#### ④ 操作方法

buffer.subarray()、buffer.slice() 复制得到的新 buffer 与旧 buffer `共享相同的底层内存`

```js
import { Buffer } from 'buffer'

const buf1 = Buffer.alloc(6)
const buf2 = Buffer.alloc(6, 'a')
buf2[1] = 0x72

console.log(buf1.fill(1, 2, 4))       //buf1 <Buffer 00 00 01 01 00 00>
console.log(buf2.copy(buf1, 4, 1, 3)) //2
console.log(buf1)                     //buf1 <Buffer 00 00 01 01 72 61>

const buf = buf1.subarray()
console.log(buf) //buf <Buffer 00 00 01 01 72 61>
buf1[0] = 32
console.log(buf) //buf <Buffer 20 00 01 01 72 61>
```

#### ⑤ 比较方法

```js
import { Buffer } from 'buffer'

const buf1 = Buffer.from('B')
const buf2 = Buffer.from('A')
const buf3 = Buffer.from('C')
console.log(buf1.compare(buf2)) //1
console.log(buf2.compare(buf3)) //-1
```

由此可以实现 buffer 实例数组的排序 sort

```js
console.log([buf1, buf2, buf3].sort(buffer.compare)) 
//[buf2, buf1, buf3] =[<Buffer 41>, <Buffer 42>, <Buffer 43>]
```

#### ⑥ 遍历方法

```js
import { Buffer } from 'buffer'

const buf = Buffer.from('this')
console.log(buf) //buf <Buffer 74 68 69 73>

for(const item of buf.entries()){
    console.log(item) //Array[0, 116][1, 104][2, 105][3, 115]
}
```

#### ⑦ 解读交换方法

```js
import { Buffer } from 'buffer'

const buf1 = Buffer.from([0x1, 0x2, 0x3, 0x4])
const buf2 = Buffer.from([0x1, 0x2, 0x3])
console.log(buf1) //buf1 <Buffer 01 02 03 04>
console.log(buf2) //buf2 <Buffer 01 02 03>
buf1.swap16()
buf2.swap16()
console.log(buf1) //buf1 <Buffer 02 01 04 03>
console.log(buf2) //buf2 抛出 ERR_INVALID_BUFFER_SIZE 异常

const buf3 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8])
const buf4 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5])
console.log(buf3) //buf3 <Buffer 01 02 03 04 05 06 07 08>
console.log(buf4) //buf4 <Buffer 01 02 03 04 05>
buf3.swap32()
buf4.swap32()
console.log(buf3) //buf4 <Buffer 04 03 02 01 08 07 06 05>
console.log(buf4) //buf3 抛出 ERR_INVALID_BUFFER_SIZE 异常

const buf5 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8])
const buf6 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9])
console.log(buf5) //buf5 <Buffer 01 02 03 04 05 06 07 08>
console.log(buf6) //buf6 <Buffer 01 02 03 04 05 06 07 08 09>
buf5.swap64()
buf6.swap64()
console.log(buf5) //buf5 <Buffer 08 07 06 05 04 03 02 01>
console.log(buf6) //buf6 抛出 ERR_INVALID_BUFFER_SIZE 异常
```

### (4) buffer.Blob 类

Node Buffer 类用来`操作内存`，Node Blob 类用来`操作二进制文件`

* Node Buffer 类表示`存储二进制数据的一段连续内存`，不能直接读写，只能通过 `TypedArray Uint8Array 视图`读写
* Node Blob 类表示`一个二进制文件的数据内容`，常用来读写文件

```js
定义：import { Blob } from 'buffer'
     const blob = new Blob(array, {type: MIME})
属性：blob.type                    //返回blob的MIME类型
     blob.size                    //返回blob的字节大小
方法：ES6 Blob 方法：
     blob.slice([n1],[n2],[MIME]) //返回新Blob实例,拷贝字节索引n1到字节索引n2前一项字节
     Node Blob 方法：
     blob.stream()                //返回读取blob内容的只读流
     blob.text()                  //返回Promsie实例,返回将blob内容解码成的UTF-8字符串
     blob.arrayBuffer()           //返回Promise实例,返回并创建使用blob数据副本的ArrayBuffer实例
```

实例

```js
import { Blob } from 'buffer'

const buf = new ArrayBuffer(100); //分配一段 100 字节的连续内存
const blob = new Blob([buf])
const copyBlob = blob.slice(20, 30)

console.log(blob.size) //100
console.log(blob.type) //''
console.log(blob)      //Blob {size: 100, type: ''}
console.log(copyBlob)  //Blob {size: 10, type: ''}
```

## 5. string_decoder 模块

### (1) string_decoder API

string_decoder 模块用于`将 buffer 对象解码为字符串`

```js
定义：import { StringDecoder } from 'string_decoder'
     const sd = new StringDecoder([encoding]) 
方法：sd.write(buffer) //返回将buffer解码后的字符串,并将其存储在内部缓冲区直到下次调用sd.write(buffer)或sd.end([buffer])
     sd.end([buffer]) //返回内部缓冲区的所有剩余输入,若提供buffer参数则在返回之前最后调用一次sd.write(buffer)
```

### (2) 实例

```js
import { StringDecoder } from 'string_decoder'

const decoder = new StringDecoder() //无参则默认UTF-8
decoder.write(Buffer.from('小'))
decoder.write(Buffer.from('可'))

// 情况1
console.log(decoder.end()) //''

// 情况2
console.log(decoder.end(Buffer.from('爱'))) //'爱'
```
