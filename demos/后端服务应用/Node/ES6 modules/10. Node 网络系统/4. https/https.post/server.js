import https from 'https'
import fs from 'fs'

// 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
const options = {
    key: fs.readFileSync('../../keys/server_rsa_private_key.pem'), // 服务器私钥
    cert: fs.readFileSync('../../keys/server_cert.pem'), // 服务器证书
}
const server = https.createServer(options, (req_msg, server_res) => {
    // 当前服务器接收到请求的回调
    
    // POST 请求体参数需要通过 data 事件接收
    req_msg.on('data', data => {
        const paramStr = data.toString()
        console.log("服务端：接收到客户端请求 " + req_msg.url + ' ' + paramStr)
  
        const name = JSON.parse(paramStr).name
        let returnData = ''
        switch(name) {
            case 'zhangsan':
                returnData = [
                    {
                        name: 'birth',
                        introduce: '过生日'
                    }
                ]
                break;
            case 'lisi':
                returnData = [
                    {
                        name: 'hospital',
                        introduce: '医院复诊'
                    }
                ]
                break;
        }
        
        // 向客户端发送响应
        server_res.statusCode = 200
        server_res.setHeader('Content-Type', 'text/plain')
        server_res.end(JSON.stringify(returnData))
      })
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})