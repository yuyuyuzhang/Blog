import fs from 'fs'
import zlib from 'zlib'

fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('output.gz'))