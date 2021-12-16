import https from 'https'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
}
const req = https.request(options, server_res => {
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
      console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
      req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client1 套接字")
    })
    req.on('error', e => {
        console.error(e); // Error: self signed certificate
    })
})
// 向服务器发送请求，内容必须是 String/Buffer
req.write(JSON.stringify({
    name: 'zhangsan'
}))