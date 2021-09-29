import net from 'net'

// Client
const client_socket = net.createConnection(8124, () => {
    console.log('客户端：向服务器发起请求')
    client_socket.write('hello')
})
client_socket.on('data', data => {
    console.log("客户端：接收到服务器响应，内容为：" + data)
    client_socket.end() // 关闭客户端连接
})

// Server
const server = net.createServer(server_socket => {
    console.log('服务端：客户端建立连接')
    server_socket.on('data', data => {
        console.log('服务端：接收到客户端请求，内容为：' + data);
        server_socket.write('world') // 向客户端返回数据
    })
    server_socket.on('close', () => {
        console.log("服务端：客户端断开连接")
    })
}).listen(8124)

