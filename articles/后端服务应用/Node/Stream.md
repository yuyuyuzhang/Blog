# Stream

## 1. 文件系统模块 fs

Node 的文件系统模块 fs 提供了一组标准的文件操作 API

fs 模块的所有方法均有同步和异步两个版本，异步方法性能更高，速度更快，而且没有阻塞，建议使用异步版本

* **异步**：
* **同步**：

## 2. Stream

Node 包含 4 种流类型

* Readable：可读
* Writable：可写
* Duplex：可读可写
* Transform：操作被写入数据，然后读出结果

### (1) 管道流

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

### (2) 链式流

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

### (3) Stream 事件

```js
data   //有数据可读时触发
end    //没有更多数据可读时触发
error  //接收和写入数据过程中发生错误时触发
finish //所有数据都被写入到底层系统时触发
```

## 3. Buffer
