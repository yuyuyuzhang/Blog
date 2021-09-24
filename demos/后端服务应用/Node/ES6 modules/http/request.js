import https from 'https'

// const options = {
//   protocol: 'https:',
//   hostname: 'nodejs.cn',
//   port: 443,
//   path: '/todos',
//   method: 'GET'
// }
// const req = https.request(options, res => {
//   console.log("res:", res)

//   res.on('data', d => {
//     process.stdout.write(d)
//   })
// })
// req.on('error', err => {
//   console.log("err:", err)
// })
// req.end()


const data = JSON.stringify({ todo: '做点事情' })
const options = {
  protocol: 'https:',
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}
const req = https.request(options, res => {
  console.log("res:", res)

  res.on('data', d => {
    process.stdout.write(d)
  })
})
req.on('error', err => {
  console.log("err:", err)
})
req.end(data)
