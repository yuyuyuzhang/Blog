const tls = require('tls')
const fs = require('fs')

// Server
const options1 = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  ca: [ fs.readFileSync('client-cert.pem') ],
  requestCert: true,
}
const server = tls.createServer(options1, server_socket => {
  console.log('server connected', server_socket.authorized ? 'authorized' : 'unauthorized')

  server_socket.write('welcome!\n')
  server_socket.setEncoding('utf8')
  server_socket.pipe(server_socket)

//   server_socket.on('data', data => {
//     console.log("服务端：接收到客户端" + "(" + server_socket.remoteAddress + ":" + server_socket.remotePort + ")" + "请求 " + data)
//     server_socket.write('world') // 向客户端发送响应
//   })
}).listen(8000, () => {
  const address = server.address()
  console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})

// Client
const options2 = {
  key: fs.readFileSync('client-key.pem'),
  cert: fs.readFileSync('client-cert.pem'),
  ca: [ fs.readFileSync('server-cert.pem') ],
  checkServerIdentity: () => { return null; },
}
const socket = tls.connect(8000, options2, () => {
  console.log('client connected', socket.authorized ? 'authorized' : 'unauthorized')
  process.stdin.pipe(socket)
  process.stdin.resume()
})
socket.setEncoding('utf8')
socket.on('data', data => {
    console.log(data)
})
socket.on('end', () => {
    console.log('server ends connection')
})