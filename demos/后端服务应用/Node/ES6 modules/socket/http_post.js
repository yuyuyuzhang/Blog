import http from 'http'

const data = JSON.stringify({ todo: '做点事情' })
const options = {
  protocol: 'http:',
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}
const req = http.request(options,res => {
  console.log("res:",res)

  res.on('data',d => {
    process.stdout.write(d)
  })
})
req.on('error',err => {
  console.log("err:",err)
})
req.end(data)