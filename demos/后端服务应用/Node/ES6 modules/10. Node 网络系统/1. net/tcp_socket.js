import net from 'net'

// Server
const server = net.createServer(server_socket => {
    // 当前服务器建立新连接的回调

    server_socket.on('data', data => {
        console.log("服务端：接收到客户端" + "(" + server_socket.remoteAddress + ":" + server_socket.remotePort + ")" + "请求 " + data)
        server_socket.write('world') // 向客户端发送响应
    })
}).listen(8124, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})

// Client
const client_socket = net.createConnection(8124, () => {
    // 当前套接字与远程套接字成功建立连接的回调

    client_socket.write('hello') // 向服务器发送请求
    client_socket.on('data', data => {
        console.log("客户端：接收到服务端" + "(" + client_socket.remoteAddress + ":" + client_socket.remotePort + ")" + "响应 " + data)
        client_socket.destroy() // 关闭客户端连接
    })
    client_socket.on('close', () => {
        console.log("客户端：已关闭客户端套接字")
    })    
})