//Worker 线程监听 JS 引擎线程发送的消息
this.addEventListener('message', function(e){
  switch(e.data){
    case 'work start':
      //传输文本
      this.postMessage('ok, work is done, the result is 10')

      //传输二进制对象
      const buf = new ArrayBuffer(500)
      this.postMessage(buf, [buf])
      break;
    case 'work done':
      //Worker 线程中关闭自身
      this.close()
      break;
  }
})