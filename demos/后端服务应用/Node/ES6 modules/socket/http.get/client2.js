import http from 'http'

const options = {
    host: '127.0.0.1',
    port: 3001,
    path: '/todos?name=lisi' // URL 若包含中文则需要转义
}
const req = http.get(options, server_res => {    
    // 当前客户端请求接收到响应的回调
    
    server_res.on('data', data => {
        console.log("客户端：接收到服务端响应 " + server_res.statusCode + ':' + server_res.statusMessage + ' ' + data)
        req.end()
    });
    req.on('close', () => {
        console.log("客户端：已关闭客户端 client2 套接字")
    })
    req.on('error', e => {
        console.error(e); 
    })
})