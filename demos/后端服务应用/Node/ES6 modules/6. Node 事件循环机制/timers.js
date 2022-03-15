console.log('start')

setTimeout(() => {
    console.log('timeout')
}, 500)

setInterval((a) => {
    console.log('interval ' + a)
}, 500, 'zhangyu')

setImmediate(() => {
    console.log('immediate')
})

console.log('end')