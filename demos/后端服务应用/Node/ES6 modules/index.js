import { StringDecoder } from 'string_decoder'

const decoder = new StringDecoder() //无参则默认UTF-8
decoder.write(Buffer.from('小'))
decoder.write(Buffer.from('可'))
console.log(decoder.end())
console.log(decoder.end(Buffer.from('爱')))