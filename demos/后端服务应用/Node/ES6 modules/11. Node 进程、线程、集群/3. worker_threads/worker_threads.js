import assert from 'assert'
import worker_threads, { Worker, MessageChannel } from 'worker_threads'

if(worker_threads.isMainThread) {
    const worker = new Worker('./worker_threads.js')
    const { port1, port2 } = new MessageChannel()

    // 主线程向 worker 线程发送消息
    worker.postMessage(
        { 
            workerPort: port2,
            msg: 'hello, I am mainThread'
        }, 
        [port2]
    )

    // 主线程监听来自 worker 线程的消息
    port1.on('message', message => {
        console.log("port1:", message)
    })
} else {
    // worker 线程监听来自主线程的消息
    worker_threads.parentPort.on('message', value => {
        assert(value.workerPort instanceof MessagePort)
        console.log('port2:', value.msg)

        // worker 线程向主线程发送消息
        value.workerPort.postMessage('hello, I am workerThread')
    })
}