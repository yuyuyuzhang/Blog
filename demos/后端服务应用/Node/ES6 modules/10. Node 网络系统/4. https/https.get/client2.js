import https from 'https'

// TLS 忽略自签名证书错误
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const options2 = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=lisi'
}
const req = https.get(options2, server_res => {
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client2 套接字")
    })
    req.on('error', e => {
        console.error(e); // Error: self signed certificate
    })
})