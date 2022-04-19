import fs from 'fs'
import { StringDecoder } from 'string_decoder'

fs.readFile('./input.txt', (err, data) => {
    if(err) throw err

    console.log(data) // <Buffer e5 b0 8f e5 8f af e7 88 b1>

    // buffer 转字符串
    console.log(data.toString()) // 小可爱 
    const str = new StringDecoder()
    console.log(str.write(data)) // 小可爱

    // buffer 转 JSON
    console.log(JSON.stringify(data)) // {"type":"Buffer","data":[229,176,143,229,143,175,231,136,177]}
})