import http from 'http'
import requestPromise from 'request-promise'

const startCount = async () => {
    await requestPromise.get('http://127.0.0.1:4001')
}
const endCount = async () => {
    await requestPromise.get('http://127.0.0.1:4002')
}

const server = http.createServer((req, res) => {
    Promise.all([
        startCount(),
        endCount()
    ]).then(values => {
        let sum = values.reduce((prev, curr) => {
            return parseInt(prev) + parseInt(curr);
        })
        res.write(`${sum}`);
        res.end(); 
    })
}).listen(4000, () => {
    console.log('server start at http://127.0.0.1:4000')
})