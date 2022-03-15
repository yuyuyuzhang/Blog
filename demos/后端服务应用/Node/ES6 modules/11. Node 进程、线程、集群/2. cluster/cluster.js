import cluster from 'cluster'
import process from 'process'
import os from 'os'

// 必须判断是否主进程，主进程中才能调用集群创建子进程的方法
if (cluster.isPrimary) {
    console.log(`Master Process ${process.pid} is running`);

    // 按照 CPU 数量创建子进程
    const numCPUs = os.cpus().length
    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i + 1}...`);
        cluster.fork();
    }

    // 父进程接收到子进程发送的消息时触发
    cluster.on('message', (worker, message) => {
        console.log(`${worker.id}: ${message}`)
    }) 

    //子进程开始监听父进程时触发
    cluster.on('listening', (worker, address) => {
        console.log(`cluster - listening - ${address.address} : ${address.port}`)
    })
} else if(cluster.isWorker) {
    import('./worker.js')
} 