import cluster from 'cluster'

if(cluster.isMaster) {
    // 创建子进程
    cluster.setupMaster({
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
}