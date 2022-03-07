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