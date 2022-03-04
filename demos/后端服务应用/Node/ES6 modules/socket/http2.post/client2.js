import http2 from 'http2'

const clientSession = http2.connect('http://localhost:3001', (clientSession, clientSocket) => {
    // 当前客户端会话成功连接到服务器并可以通信时的回调

    // 当前客户端通信流向服务器发送 POST 请求
    const clientStream = clientSession.request({
        ':method': 'POST',
        ':path': '/todos',
        'Content-Type': 'application/json',
    })
    clientStream.write(JSON.stringify({
        name: 'lisi'
    }))

    // 当前客户端通信流接收到服务器返回的 HEADERS 帧的回调
    clientStream.on('response', headers => {
        for (const name in headers) {
            console.log("客户端 client2：接收到服务端响应 HEADERS " + `${name}: ${headers[name]}`)
        }
    })

    // 当前客户端通信流接收到服务器返回的 DATA 帧的回调
    let data = ''
    clientStream.on('data', chunk => { 
        data += chunk
    })

    // 当前客户端通信流关闭时的回调
    clientStream.on('end', () => {
        console.log("客户端 client2：接收到服务端响应 DATA " + data)
        clientStream.close() // 关闭客户端会话
    })

    // 当前客户端通信流销毁时的回调
    clientStream.on('close', () => {
        console.log("客户端 client2 通信流已销毁")
    })

    // 当前客户端通信流发生错误时的回调
    clientStream.on('error', e => {
        console.error(e);
    })
})

