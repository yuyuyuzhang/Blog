const http = require('http')

http.createServer(function(req, res){
  res.write('<head><meta charset="utf-8" /></head>')
  res.write('搭建node服务器成功')
  res.end()
}).listen(18088)