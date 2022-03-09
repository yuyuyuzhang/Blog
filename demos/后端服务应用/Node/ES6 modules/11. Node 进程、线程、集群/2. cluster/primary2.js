import cluster from 'cluster'

if(cluster.isPrimary) {
    // 创建子进程
    cluster.setupPrimary({
        exec: './worker2.js',
        args: ['--use', 'http'],
        silent: true
    })
    const worker = cluster.fork()

    // 子进程向父进程发送消息时触发
    worker.on('message', message => {
        console.log(`message: ${message}`)
    })

    // 父进程接收到子进程发送的消息时触发
    cluster.on('message', (worker, message) => {
        console.log(`${worker.id}: ${message}`)
    }) 
}