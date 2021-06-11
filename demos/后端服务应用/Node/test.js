// const fs = require('fs')
// const readerStream = fs.createReadStream('input.txt')
// const writeStream = fs.createWriteStream('output.txt')
// readerStream.pipe(writeStream)
// console.log('input.txt 复制完毕')


const fs = require('fs')
const zlib = require('zlib')
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('output.gz'))
console.log('input.txt 复制并压缩完毕')