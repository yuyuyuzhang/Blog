import dgram from 'dgram'

// Server
const server = dgram.createSocket('udp4').bind(41234, 'localhost')
server.on('listening', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})
server.on('message', (req_msg, remoteAddress) => {
    console.log("服务端：接收到客户端" + "(" + remoteAddress.address + ":" + remoteAddress.port + ")" + "请求 " + req_msg)
    server.send('world', remoteAddress.port, remoteAddress.address) // 向客户端发送响应
})

// Client
const client = dgram.createSocket('udp4')
client.connect(41234, 'localhost', () => {
    // 当前套接字与远程套接字成功建立连接的回调

    client.send('hello') // 向服务端发送请求
    client.on('message', (server_res, remoteAddress) => {
        console.log("客户端：接收到服务端" + "(" + remoteAddress.address + ":" + remoteAddress.port + ")" + "响应 " + server_res)
        if(server_res.toString() == 'world'){
            client.close()
        }
    })  
    client.on('close', () => {
        console.log("客户端：已关闭客户端套接字")
    })
})