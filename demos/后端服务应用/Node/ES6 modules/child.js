import process from 'process'

process.send({ name: 'child' })
process.on('message', parentMsg => {
    console.log('parentMsg:', parentMsg)
})
