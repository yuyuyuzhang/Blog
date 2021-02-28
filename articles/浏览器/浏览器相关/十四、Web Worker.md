# 十四、Web Worker

## 1. JS 引擎线程

### (1) 浏览器进程

浏览器会为`每个标签页`单独启动一个渲染进程

渲染进程主要负责将 HTML、CSS、JS 转化为用户可以与之交互的网页，每个渲染进程都会启动单独的渲染引擎线程、JS 引擎线程、事件触发线程、定时器计数线程、异步请求线程

![渲染进程](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3/%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B.png)

### (2) 标签页渲染进程

浏览器会为`每个标签页`单独启动一个渲染进程

渲染进程主要负责将 HTML、CSS、JS 转化为用户可以与之交互的网页，每个渲染进程都会启动单独的渲染引擎线程、JS 引擎线程、事件触发线程、定时器计数线程、异步请求线程

![渲染进程](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9B%B8%E5%85%B3/%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B.png)

### (3) JS 引擎单线程实现异步

JS 引擎线程作为一个单线程为什么能够实现异步？

因为标签页渲染进程除了 JS 引擎线程，还有事件触发线程、异步请求线程、定时器计数线程，将一些异步操作交给其他线程处理，然后采用`事件循环机制`处理返回结果

## 2. Web Worker

### (1) Worker 线程

随着电脑计算能力的增强，尤其是多核 CPU 的出现，JS 引擎单线程模型无法充分发挥计算机的计算能力，带来很大的不便

Web Worker 就是为 JS 语言创造多线程环境，`允许 JS 引擎线程创建 Wroker 线程`，将一些任务分配给 Worker 线程运行，JS 引擎线程运行的同时，Wroker 线程在后台运行，两者互不干扰，Worker 线程完成计算任务再将结果返回给 JS 引擎线程，这样的好处是一些计算密集型或高延迟任务可以交给 Worker 线程运行，JS 引擎线程能够保持流畅不被阻塞或拖慢

Werker 线程一旦被创建，就会始终运行，不会被 JS 引擎线程上的活动打断，这样有利于随时响应 JS 引擎线程的通信，但也导致了 Worker 线程比较耗费资源，不应该过度使用，而且一旦使用完毕就应该关闭

### (2) Worker 线程注意事项

#### ① 同源限制

分配给 Worker 线程运行的脚本文件，必须与 JS 引擎线程`同源（协议、域名、端口）`

#### ② 全局对象限制

Worker 线程所在的全局对象是 `WorkerGlobalScope`，不同于 JS 引擎线程所在的全局对象 `Window`，因此很多接口拿不到例如 window、parent 等等，WorkerGlobalScope 对象上只定义了 `navigator、location` 接口

#### ③ DOM 限制

由于 Worker 线程的全局对象限制，因此 Worker 线程无法读取 JS 引擎线程所在网页的 `DOM 对象`，也无法访问 `document` 对象

#### ④ 脚本限制

由于 Worker 线程的全局对象限制，因此 Worker 线程不能执行 Window 对象上的 `console、alert()、confirm()` 方法，但可以使用 XMLHttpRequest 对象发出 `AJAX 请求`

#### ⑤ 通信联系

Worker 线程和 JS 引擎线程不在同一个上下文环境，因此不能直接通信，必须通过`消息`通信

#### ⑥ 文件限制

Worker 线程`无法读取本地文件`，即不能打开本机的文件系统（file://），它所`加载的脚本必须来自网络`

### (3) Worker 线程使用

#### ① JS 引擎线程属性和方法

```javascript
定义：const worker = new Worker(js)
方法：worker.postMessage(msg) //JS引擎线程向Worker线程发送消息
     worker.terminate()      //JS引擎线程中关闭Worker线程

事件：worker.onmessage        //JS引擎线程监听Worker线程返回的消息
     worker.onerror          //JS引擎线程监听Worker线程是否发生错误
```

#### ② Worker 线程属性和方法

```javascript
方法：this.postMessage(msg)       //Worker线程向JS引擎线程返回消息
     this.importScripts(js1,...) //Worker线程内部同时加载多个其他JS脚本,Worker线程无法读取本地文件,该脚本必须来自网络
     this.close()                //Worker线程中关闭自身

事件：this.onmessage             //Worker线程监听JS引擎线程发送的消息
     this.onerror               //Worker线程监听自身是否发生错误
```

#### ③ JS 引擎线程和 Worker 线程的通信关系

**拷贝传值**：JS 引擎线程和 Worker 线程的通信内容可以是文本、对象，甚至是二进制数据 ArrayBuffer、Blob、File，这种通信关系是`拷贝传值`，Worker 线程对通信内容的修改不会影响到 JS 引擎线程，浏览器的内部运行机制是先将通信内容串行化，再将串行化后的字符串发送给对方，后者将其还原

**Transferable Objects**：拷贝发送二进制数据可能会造成`性能问题`，例如 JS 引擎线程向 Worker 线程发送一个 500MB 的文件，默认情况下浏览器会生成一个原文件的拷贝，但这会造成很大的性能问题，解决方式是 `JS 引擎线程直接将二进制数据转移给 Worker 线程`，但是这样 JS 引擎线程就无法再使用转移后的二进制数据了，这时为了防止多个线程同时修改文件，这对于影像处理、声音处理、3D 运算就非常方便，不会产生性能负担

```javascript
//Transferable Objects 格式
worker.postMessage(arrayBuffer, [arrayBuffer]);
```

### (4) Worker 线程实例

JS 引擎线程.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="renderer" content="webkit" />
  <title>JS 引擎线程</title>
</head>
<body>
<script>

const worker = new Worker('Worker 线程.js')

worker.postMessage('work start')

//JS 引擎线程监听 Worker 线程返回的消息
worker.addEventListener('message', function(e){
  console.log(e.data)

  //JS 引擎线程中关闭 Worker 线程
  worker.postMessage('work done')
  worker.terminate()
})

</script>
</body>
</html>
```

Worker 线程.js

```javascript
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
```

进入到 JS 引擎线程.html 文件所在目录，控制台输入 http-server -c-l
