// const fs = require('fs')
// const readeStream = fs.createReadStream('input.txt')
// const writeStream = fs.createWriteStream('output.txt')
// readeStream.pipe(writeStream)
// console.log('input.txt 复制完毕')


// const fs = require('fs')
// const zlib = require('zlib')
// fs.createReadStream('input.txt')
//   .pipe(zlib.createGzip())
//   .pipe(fs.createWriteStream('output.gz'))
// console.log('input.txt 复制并压缩完毕')


// const arraybuffer = new ArrayBuffer(6) //分配一段6字节的连续内存
// const buf1 = Buffer.alloc(6)
// const buf2 = Buffer.alloc(6, 'a')
// const buf3 = Buffer.from('this is a example')
// const buf4 = Buffer.from([0x61, 0x61, 0x61, 0x61, 0x61, 0x61])
// const buf5 = Buffer.from(arraybuffer, 1, 2)
// const buf6 = Buffer.from(buf2) //值传递而非引用传递
// buf2[1] = 0x72

// const buf = Buffer.from('this')
// console.log(buf) //buf <Buffer 74 68 69 73>
// for(const item of buf.entries()){
//     console.log(item, item[1].toString()) //Array [0, 116] [1, 104] [2, 105] [3, 115]
// }


