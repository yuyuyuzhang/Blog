import cluster from 'cluster'
import process from 'process'
import http from 'http'

if(cluster.isWorker) {
    // 创建 HTTP 服务器并开始监听
    const server = http.createServer().listen(3001, '127.0.0.1')
}