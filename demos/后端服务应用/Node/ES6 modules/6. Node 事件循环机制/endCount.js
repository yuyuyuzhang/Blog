import http from 'http'

const server = http.createServer((req, res) => {
    let sum = 0;
    for(let i=500000000; i<1000000000; i++){
        sum = sum + i;
    }
    res.write(`${sum}`);
    res.end()
}).listen(4002, () => {
    console.log('server start at http://127.0.0.1:4002')
})