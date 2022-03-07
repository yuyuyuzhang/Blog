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