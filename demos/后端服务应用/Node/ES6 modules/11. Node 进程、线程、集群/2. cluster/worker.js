import http from 'http'

// 子进程向主进程发送消息
process.send('hello, I am worker')

const server = http.createServer((req, res) => {
    res.write('hello world')
    res.end()
})

server.listen(3000, 'localhost', () => {
    const address = server.address()
    console.log(`listening at http://${address.address}:${address.port}`)
})