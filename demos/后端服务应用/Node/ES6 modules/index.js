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


import Stream from 'stream'

const writeStream = new Stream.Writable({
  write(chunk, encoding, next) {
    console.log(chunk.toString())
    next()
  }
})
// writeStream.write('hello')
// writeStream.write('world!')

writeStream.write('hello')
writeStream.cork()
writeStream.write('world!')

// writeStream.write('hello')
// writeStream.cork()
// writeStream.write('world!')
// writeStream.uncork()
  
  

