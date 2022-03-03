import http2 from 'http2'

const clientSession = http2.connect('http://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端成功连接到服务器并可以通信时的回调

    console.log("clientSession:", clientSession)
    console.log("clientSocket:", clientSocket)
})

// 当前客户端向服务器发送请求
const req = clientSession.request({
    
})
