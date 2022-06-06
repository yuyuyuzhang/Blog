// Worker 线程监听 JS 引擎线程发送的消息
this.addEventListener('message', function(e){
  console.log(e.data)

  switch(e.data){
    case 'work start':
      // 传输文本
      this.postMessage('ok, work is done, the result is 10')
      break;
    case 'work done':
      // Worker 线程中关闭自身
      this.close()
      break;
  }
})