import cluster from 'cluster'
import process from 'process'
import os from 'os'

// 必须判断是否主进程，主进程中才能调用集群创建子进程的方法
if (cluster.isPrimary) {
    console.log(`Master Process ${process.pid} is running`);

    const numCPUs = os.cpus().length
    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking process number ${i + 1}...`);
        cluster.fork();
    }

    // 遍历所有子进程
    const eachWorker = (cb) => {
        for(const id in cluster.workers) {
            cb(cluster.workers[id])
        }
    }
    eachWorker(worker => {
        console.log(`worker[${worker.id}]`)
    })
}