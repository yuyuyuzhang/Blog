import { Blob } from 'buffer'

const buf = new ArrayBuffer(100); //分配一段 100 字节的连续内存
const blob = new Blob([buf])
const copyBlob = blob.slice(20, 30)

console.log(blob.size) //100
console.log(blob.type) //''
console.log(blob)      //Blob {size: 100, type: ''}
console.log(copyBlob)  //Blob {size: 10, type: ''}