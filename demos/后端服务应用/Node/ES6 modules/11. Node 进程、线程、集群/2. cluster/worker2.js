import cluster from 'cluster'
import process from 'process'

if(cluster.isWorker) {
    process.send('hello, I am worker2')

    process.on('message', message => {
        console.log(`${message}`)
    })
}