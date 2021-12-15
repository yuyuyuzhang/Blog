import https from 'https'
import fs from 'fs'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// Server
const options1 = {
    // 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
    key: fs.readFileSync('./keys/server_rsa_private_key.pem'), // 服务器私钥
    cert: fs.readFileSync('./keys/server_cert.pem'), // 服务器证书
}
const server = https.createServer(options1, (req, res) => {
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
const options2 = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=zhangsan'
}
const req = https.get(options2, res => {
    console.log("客户端：接收到服务端响应 " + res.statusCode + ':' + res.statusMessage)
    req.end()
})
req.on('close', () => {
    console.log("客户端：已关闭客户端套接字")
})
req.on('error', e => {
    console.error(e); // Error: self signed certificate
})


