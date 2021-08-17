const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {
        'content-type': 'text/plain'
    })
    res.end('hello world')
}).listen(8124)

console.log('server running at 8124')