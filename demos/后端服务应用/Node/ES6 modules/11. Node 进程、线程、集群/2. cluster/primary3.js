import cluster from 'cluster'

if(cluster.isPrimary) {
    // 创建子进程
    cluster.setupPrimary({
        exec: './worker3.js',
        args: ['--use', 'https'],
        silent: true
    })
    const worker = cluster.fork()

    //子进程开始监听父进程时触发
    worker.on('listening', address => {
        console.log(`worker - listening - ${address.address} : ${address.port}`)
    })

    //子进程开始监听父进程时触发
    cluster.on('listening', (worker, address) => {
        console.log(`cluster - listening - ${address.address} : ${address.port}`)
    })

    // 子进程向父进程发送消息时触发
    worker.on('message', message => {
        console.log(`message: ${message}`)
    })
}