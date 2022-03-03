import http2 from 'http2'

const server = http2.createServer((request, response) => {
    // 当前服务器接收到请求的回调

    console.log("服务端：接收到客户端请求 " + req_msg.url)

    console.log("request:", request)
    console.log("response:", response)

    // server.on('stream', (stream, headers) => {
    //     stream.respond({
    //       'content-type': 'text/html; charset=utf-8',
    //       ':status': 200
    //     });
    //     stream.end('<h1>Hello World</h1>');
    // });


}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})