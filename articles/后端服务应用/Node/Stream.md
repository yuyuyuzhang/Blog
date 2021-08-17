# Stream

## 1. Stream

Node 提供 Stream 接口处理流数据，Node 包含以下 4 种流类型

* Readable：只读流
* Writable：只写流
* Duplex：双工流 - 可读可写，同时实现了 Readable 和 Writable 接口
* Transform：转换流 - 可读可写，且读写过程中可以修改或转换数据，实现了 Duplex 接口

```js
属性：
方法：stream.finished(stream,{error,readable,writable},cb) //无返回值,目标流不再可读、可写、遇到错误、过早关闭事件时执行回调
     stream.pipeline(streams,cb) //使用管道传送多个流和生成器,管道完成时执行回调
     stream.pipeline(source,transforms,destination,cb) //使用管道传送多个流和生成器,管道完成时执行回调
```

## 2. stream.Readable 类

### (1) 读取模式

可读流具有以下 2 种模式，可读流的 2 种模式是对发生在可读流中更加复杂的内部状态管理的一种简化的抽象

* **流动模式**：数据`自动`从底层系统读取，并通过 `EventEmitter` 接口的事件尽可能快的被提供给应用程序
* **暂停模式**：数据必须`手动`显式调用 `stream.read()` 读取

所有可读流都开始于暂停模式，可通过以下方式从暂停模式切换到流动模式

* 添加 data 句柄
* 调用 stream.resume() 方法
* 调用 stream.pipe() 方法

从流动模式切换回暂停模式

* 如果有管道目标，则调用 stream.unpipe() 方法移除所有管道目标
* 如果没有管道目标，则调用 stream.pause() 方法

只有提供了消费或忽略数据的机制后，可读流才能产生数据，

### (2) 读取状态

可读流在任意时刻会处于以下 3 种状态之一

* **readable.readableFlowing === null**：可读流不会产生数据
* **readable.readableFlowing === true**：可读流开始主动产生数据并触发事件
* **readable.readableFlowing === false**：数据可能会堆积在可读流的内部缓冲

### (3) stream.Readable API

```js
定义：
属性：readable.readableHighWaterMark     //返回构造当前可读流时传入的highWaterMark值
     readable.readableEncoding          //返回当前可读流指定的encoding编码
     readable.readableObjectMode        //返回当前可读流指定的objectMode属性
     readable.readableFlowing           //返回当前可读流的读取状态
     readable.readable                  //返回当前可读流是否有数据可被消费
     readable.readableEnded             //返回当前可读流是否数据被完全消费
     readable.readableLength            //返回当前可读流准备读取的字节数
     readable.destroyed                 //返回当前可读流是否被销毁
方法：readable.setEncoding(encoding)     //返回当前可读流,为从当前可读流读取的数据设置字符编码,未设置字符编码流数据默认返回buffer对象,否则返回对应字符编码的字符串
     readable.read(size)                //返回读取的指定字节数据(size<=1GB),默认返回buffer对象,没有指定size返回所有可读数据,没有可读数据返回null,只有在返回null后才会触发readable事件,应该只对暂停模式的可读流调用,流动模式的可读流会自动调用该方法直到内部缓冲的数据完全耗尽
     readable.isPaused()                //返回布尔值,当前可读流的操作状态
     readable.pause()                   //返回当前可读流,使当前可读流切换为暂停模式,则会停止触发data事件
     readable.resume()                  //返回当前可读流,使当前可读流切换为流动模式,则会恢复触发data事件
     readable.pipe(writable,{end})      //返回目标可写流,将当前可读流切换到流动模式,并将其所有数据推送到绑定的可写流
     readable.unpipe(writable)          //返回当前可读流,解绑通过readable.pipe()绑定的可写流
     readable.unshift(chunk,{encoding}) //无返回值,将读取的数据块chunk推回内部缓冲
     readable.destroy()                 //返回当前可读流,销毁当前可读流
```

readable.pipe(writable,{end})

默认情况下，当前可读流触发 end 事件时，目标可写流也会调用 stream.end() 方法结束写入，可以设置 end=false 来禁用该默认行为，这样目标可写流就会保持打开

### (4) stream.Readable 事件

```js
.ondata     //当调用readable.read()有数据返回时触发,当流将数据发送给消费者后触发
.onreadable //当可读流中有数据可被消费时触发,当到达可读流数据的尽头时在end事件之前触发
.onend      //当可读流中数据被完全消费后触发
.onpause    //当readsFlowing不为false且调用stream.pause()时触发
.onresume   //当readsFlowing不为true且调用stream.resume()时触发
.onerror    //当由于底层内部故障可读流无法生成数据时触发,或者可读流尝试推送无效数据时触发,error事件之后除close事件外不再触发其他事件
.onclose    //当可读流或其底层资源如文件描述符被关闭时触发,不会再触发其他事件,也不会再发生操作
```

## 3. stream.Writable 类

### (1) stream.Writable API

```js
定义：
属性：writable.writableHighWaterMark        //返回构造当前可写流时传入的highWaterMark值
     writable.writableObjectMode           //返回当前可写流指定的objectMode属性
     writable.writable                     //返回当前可写流是否可写
     writable.writableLength               //返回当前可写流准备写入的字节数
     writable.writableCorked               //返回为了完全unlock当前可写流需要调用writable.unlock()的次数
     writable.writableNeedDrain            //返回当前可写流的缓冲区是否已满且即将触发drain事件
     writable.writableEnded                //返回当前可写流是否已关闭
     writable.writableFinished             //返回当前可写流是否已关闭且数据都已传给底层系统
     writable.destroyed                    //返回当前可写流是否已销毁
方法：writable.setDefaultEncoding(encoding) //返回当前可写流,为当前可写流设置默认字符编码
     writable.write(chunk,encoding,cb)     //返回当前可写流是否需要等待drain事件才能继续写入数据,写入数据块chunk到当前可写流
     writable.end(chunk,encoding,cb)       //返回当前可写流,写入数据块chunk后关闭当前可写流
     writable.cork()                       //无返回值,强制将所有写入数据都缓冲到内存
     writable.uncork()                     //无返回值,将调用stream.cork()后缓冲的所有数据输出到目标
     writable.destroy({error})             //返回当前可写流,销毁当前可写流
```

### (2) stream.Writable 事件

```js
.ondrain  //当可以继续写入数据到当前可写流时触发
.onpipe   //当在某个可读流上调用readable.pipe()将当前可写流添加到其目标集时触发
.onunpipe //当在某个可读流上调用readable.unpipe()将当前可写流从其目标集移除时触发
.onfinish //当前可写流关闭且数据都已传给底层系统后触发
.onerror  //当写入数据发生错误时触发,error事件之后除close事件外不再触发其他事件
.onclose  //当前可写流或其底层资源如文件描述符被关闭时触发,不会再触发其他事件,也不会再发生操作
```

## 4. Stream.Duplex 类

### (1) Stream.Duplex API

```js

```

### (2) Stream.Duplex 事件

```js

```

## 5. Stream.Transform 类

### (1) Stream.Transform API

```js
定义：
属性：
方法：transform.destroy(error) //返回当前转换流,销毁当前转换流
```

### (2) Stream.Transform 事件

```js

```

## 6. 管道流

管道提供了一个输出流到输入流的机制，通常用于从一个流中获取数据并将其传递到另一个流

例如大文件的复制过程

* input.txt

  ```txt
  我是小可爱
  ```

* test.js

  ```js
  const fs = require('fs')
  const readerStream = fs.createReadStream('input.txt')
  const writeStream = fs.createWriteStream('output.txt')
  readerStream.pipe(writeStream)
  console.log('input.txt 复制完毕')
  ```

* node test.js

  ![]()

## 7. 链式流

链式流就是通过管道流来创建多个流操作链机制

* test.js

  ```js
  const fs = require('fs')
  const zlib = require('zlib')
  fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('output.gz'))
  console.log('input.txt 复制并压缩完毕')
  ```

* node test.js

  ![]()
