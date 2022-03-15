import fs from 'fs'

console.log('start')

const sleep = (n) => { 
    const start = new Date().getTime()
    while (true) {
        if (new Date().getTime() - start > n) {
            break
        }
    }
}

setTimeout(() => {
    console.log('1')
    sleep(10000)
    console.log('sleep 10s')
}, 0)

fs.readFile('./test.conf', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err
    console.log('read file success')
})

console.log('end');