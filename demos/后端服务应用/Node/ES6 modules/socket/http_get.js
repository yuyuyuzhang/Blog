import http from 'http'

// Server
const server = http.createServer((req, res) => {
    console.log("服务端：接收到客户端请求 " + req.url)

    // 向客户端发送响应
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('world')
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})

// Client
const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=zhangsan'
}
const req = http.get(options, res => {
    console.log("客户端：接收到服务端响应 " + res.statusCode + ':' + res.statusMessage)
    req.end()
})
req.on('close', () => {
    console.log("客户端：已关闭客户端套接字")
})


