import cluster from 'cluster'
import process from 'process'
import https from 'https'
import fs from 'fs'

if(cluster.isWorker) {
    // 读取关键的配置文件时使用同步方法阻塞其他进程直到文件读取完毕
    const options = {
        key: fs.readFileSync('../../9. 网络系统/keys/server_rsa_private_key.pem'), // 服务器私钥
        cert: fs.readFileSync('../../9. 网络系统/keys/server_cert.pem'), // 服务器证书
    }

    // 创建服务器并开始监听
    // const server = https.createServer(options).listen(3001, '127.0.0.1')
    const server = https.createServer(options).listen(3001, 'localhost')

    // 子进程向父进程发送消息
    process.send('hello, I am worker3')
}