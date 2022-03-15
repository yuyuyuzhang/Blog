import http from 'http'

const startCount = () => {
    let sum = 0;
    for(let i=0; i<500000000; i++){
        sum = sum + i;
    }
    return sum;
}

const endCount = () => {
    let sum = 0;
    for(let i=500000000; i<1000000000; i++){
        sum = sum + i;
    }
    return sum;
}

const server = http.createServer((req, res) => {
    res.write(`${startCount() + endCount()}`)
    res.end()
}).listen(4000, () => {
    console.log("server start at http://127.0.0.1:4000")
})