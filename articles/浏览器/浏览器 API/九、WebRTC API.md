# 七、WebRTC API

## 1. WebRTC API

### (1) WebRTC API 基本方案

WebRTC（网络实时通信，Web Real Time Communication） API 允许快速轻松地建立与其他浏览器的对等连接，如果从头开始构建这样的应用程序，需要大量的框架和库来处理典型的问题，例如数据丢失、连接丢失、NAT 遍历等，但是这些所有功能都内置于浏览器的 WebRTC API，WebRTC API 包括`媒体捕获、音视频的编码和解码、传输层、会话管理`

* **媒体捕获**：浏览器通过 getUserMedia() 获取多媒体设备麦克风和摄像头
* **音视频的编码和解码**：`编解码器`将`视频帧`和`音频波`分成较小的块并将其压缩，WebRTC 内置了许多编解码器，当 2 个浏览器连接在一起时，WebRTC 自动选择两者之间最受支持的编解码器，并在后台进行了大多数编码
* **传输层**：传输层管理数据包的顺序，处理数据包丢失等问题，WebRTC 提供了许多`事件`在连接出现问题时告知我们
* **会话管理**：会话管理的作用是管理、打开、组织连接，这通常称为`信令`

![WebRTC API 基本方案]()

### (2) WebRTC API 架构

整个 WebRTC 架构具有很高的复杂性，

* **适用于 Web 开发人员的 API**：getUserMedia、RTCPeerConnection、RTCDataChannel
  * getUserMedia：浏览器获取多媒体设备麦克风和摄像头
  * RTCPeerConnection：浏览器之间进行`音视频`通信
  * RTCDataChannel：浏览器之间进行`任意数据`通信
* **浏览器制造商的 API**
* **浏览器制造商的可以挂钩重写的 API**

![WebRTC 架构]()

如果从`客户端/服务端`查看 WebRTC 架构，常用模型有如下 2 种

* **梯字模型**：两个设备都从不同的服务器运行 Web 应用程序，RTCPeerConnection 对象配置流以便彼此点对点连接，信令通过 HTTP 或 WebSocket 完成
  ![梯字模型]()
* **三角模型**：两个设备都使用相同的 Web 应用程序
  ![三角模型]()

### (3) WebRTC API 应用场景

* 实时营销
* 实时广告
* 后台通讯
* 人力资源管理
* 社交网络
* 约会服务
* 在线医疗咨询
* 金融服务
* 监视
* 多人游戏
* 现场直播
* 电子学习

## 2. getUserMedia

### (1) MediaStream 对象

MediaStream 对象表示`媒体流`，一个媒体流包含多个轨道，例如音频轨道、视频轨道

```javascript
属性：stream.id                 //返回当前媒体流对象的唯一标识符ID
     stream.active             //返回布尔值,当前媒体流对象是否处于活动状态
方法：stream.clone()            //返回具有新ID的当前媒体流对象的克隆
     stream.getTrackById(id)   //返回当前媒体流对象指定ID的第一个MediaStreamTrack对象
     stream.getAudioTracks()   //返回当前媒体流对象的音频MediaStreamTrack对象列表
     stream.getVideoTracks()   //返回当前媒体流对象的视频MediaStreamTrack对象列表
     stream.getTracks()        //返回当前媒体流对象的所有MediaStreamTrack对象列表
     stream.addTrack(track)    //无返回值,当前媒体流对象添加指定的MediaStreamTrack对象
     stream.removeTrack(track) //无返回值,当前媒体流对象移除指定的MediaStreamTrack对象


事件：
active      //当前媒体流对象变为活动状态时触发
inactive    //当前媒体流对象变为非活动状态时触发
addtrack    //当前媒体流对象添加新的MediaStreamTrack对象时触发
removetrack //当前媒体流对象移除旧的MediaStreamTrack对象时触发
```

### (2) MediaStreamTrack 对象

MediaStreamTrack 对象表示`媒体流的一个轨道`，例如音频轨道、视频轨道

```javascript
定义：const track = stream.getTrackById(id)
     const tracks = stream.getAudioTracks()
     const tracks = stream.getAudioTracks()
     const tracks = stream.getTracks()
属性：track.id                 //返回当前轨道的唯一标识符ID
     track.label              //返回当前轨道的来源
     track.kind               //返回当前轨道的类型(audio,video)
     track.readystate         //返回当前轨道的状态(live:正在提供实时数据,ended:没有实时数据可以提供)
     track.contentHint        //返回当前轨道的内容提示
     track.enabled            //返回布尔值,当前轨道是否有效
     track.muted              //返回布尔值,当前轨道是否静音
方法：track.clone()            //返回具有新ID的当前轨道的克隆
     track.stop()             //无返回值,停止播放与当前轨道关联的媒体来源
     track.getCapabilities()  //返回浏览器能够支持的属性及范围值
     track.getSettings()      //返回当前轨道设置的属性值
     track.applyConstraints() //无返回值,当前轨道设置特定属性值,浏览器依照能够符合的理想值约束返回的多媒体数据
     track.getConstraints()   //返回通过applyConstraints()设置的属性值


事件：
readystate //当前轨道状态改变时触发
ended      //当前轨道无效时触发
unmute     //当前轨道静音时触发
```

### (3) getUserMedia 方法

`navigator.getUserMedia()` 方法主要用于`浏览器获取多媒体设备麦克风和摄像头`，浏览器会询问用户是否同意浏览器调用麦克风和摄像头，用户同意则执行第一个回调函数，不同意就执行第二个回调函数

* 第一个回调函数参数是一个 MediaStream 对象
* 第二个回调函数参数是一个 Error 对象，其 code 属性有如下 3 种取值说明错误类型
  * MANDATORY_UNSATISFIED_ERROR：浏览器未发现指定硬件设备
  * NOT_SUPPORTED_ERROR：浏览器不支持指定硬件设备
  * PERMISSION_DENIED：用户拒绝浏览器使用指定硬件设备

```javascript
navigator.getUserMedia({
  audio, //麦克风
  video, //摄像头
}, stream => {}, err => {})
```

### (4) 实例：WebRTC 音频源

```html
<video id="video" width="300" height="200" controls></video>
<input type="range" min="0" max="100" step="1" value="20" name="volume" id="volume" />
```

```javascript
navigator.getUserMedia({
  audio: true, //麦克风
  video: true, //摄像头
}, stream => {
  const video = document.getElementById('video')
  video.srcObject = stream //使用 src 属性报错：获取 MediaStream 404

  const audioCtx = new AudioContext()
  const source = audioCtx.createMediaStreamSource(stream)

  //滤波器
  const volume = document.getElementById('volume')
  const biquadFilter = audioCtx.createBiquadFilter()
  biquadFilter.type = "lowshelf"
  biquadFilter.frequency.value = 1000
  biquadFilter.gain.value = volume.value

  source.connect(biquadFilter)
  biquadFilter.connect(audioCtx.destination)

  volume.addEventListener('input', e => {
    biquadFilter.gain.value = volume.value
  })
}, err => console.log('您的浏览器不支持 WebRTC'))
```

## 3. RTCPeerConnection

### (1) RTCPeerConnection 对象

RTCPeerConnection 对象用于`创建浏览器之间的点对点通信（peer to peer），并传递音视频数据`，这里面包含了信号处理、多媒体编码/解码、点对点通信、数据安全、带宽管理等等复杂的工作

通过 WebRTC 在客户端之间创建视频通话，需要以下 3 个步骤

* 每个客户端创建一个 RTCPeerConnection 实例，并通过 navigator.getUserMedia() 获取本地音视频数据流
* 双方交换网络信息，可能成功的连接点被称为 ICE 候选，`寻找候选`是指通过 ICE 框架查找可用网络和端口信息的过程
* 分享 SDP 格式的本地 media 数据

RTCPeerConnection 对象的主要任务是创建对等连接，可以轻松地钩住连接的关键点，因为此对象在出现时会触发一组事件，可以通过这些事件访问连接配置

```javascript
定义：const RTCPeerConnection = new RTCPeerConnection(config)
属性：RTCPeerConnection.canTrickleIceCandidates  //返回远程是否支持UDP打洞或通过中继服务器连接
     
     RTCPeerConnection.currentLocalDescription  //返回当前本地会话描述
     RTCPeerConnection.currentRemoteDescription //返回当前远程会话描述
     RTCPeerConnection.localDescription         //返回本地会话描述,未设置返回null
     RTCPeerConnection.remoteDescription        //返回远程会话描述,未设置返回null
     RTCPeerConnection.connectionState          //返回对等连接状态
     RTCPeerConnection.iceGatheringState        //返回ICE收集状态
     RTCPeerConnection.iceConnectionState       //返回ICE连接状态
     
     RTCPeerConnection.pendingLocalDescription  //
     RTCPeerConnection.pendingRemoteDescription //
     
     RTCPeerConnection.sctp                     //
     RTCPeerConnection.signalingState           //返回本地连接的信令状态
方法：RTCDataChannel API：
     RTCPeerConnection.createDataChannel(label,options)      //返回并创建一个新的RTCDataChannel对象
     MediaStream API：
     RTCPeerConnection.getStreamById(id)        //返回指定ID的MediaStream
     RTCPeerConnection.getLocalStreams()        //返回本地MediaStream的数组
     RTCPeerConnection.getRemoteStreams()       //返回远程MediaStream的数组
     RTCPeerConnection.addStream(MediaStream)   //本地音视频源添加指定MediaStream
     RTCPeerConnection.removeStream(MediaStream)//本地音视频源删除指定MediaStream
     MediaStreamTrack API：
     RTCPeerConnection.addTrack()               //
     RTCPeerConnection.removeTrack()            //

     RTCPeerConnection.getTransceivers()        //
     RTCPeerConnection.addTransceiver()         //

     ICE API：
     RTCPeerConnection.addIceCandidate()        //
     RTCPeerConnection.restartIce()             //
     
     RTCPeerConnection.close()                  //关闭连接
     RTCPeerConnection.createAnswer(successCB,errorCB,options)//创建一个要约协商过程中远程对等方收到的要约答案
     RTCPeerConnection.createDTMFSender()       //
     
     RTCPeerConnection.createOffer(successCB,errorCB,options)//创建请求以查找远程对等方

     RTCPeerConnection.getConfiguration()       //返回当前RTCPeerConnection对象的描述
     RTCPeerConnection.setConfiguration()       //
     
     RTCPeerConnection.setLocalDescription(RTCSessionDescription,successCB,errorCB)    //设置本地连接描述
     RTCPeerConnection.setRemoteDescription(RTCSessionDescription,successCB,errorCB)   //设置远程连接描述
     RTCPeerConnection.getSenders()             //
     RTCPeerConnection.getReceivers()           //
     
     RTCPeerConnection.getStats()               //


事件：
track                    //
signalingstatechange     //
removesstream            //
negotiationneeded        //
icegatheringstatechange  //
iceconnectionstatechange //
icecandidateerror        //
icecandidate             //
datachannel              //
connectionstatechange    //
addstream                //
```

### (2) 实例：视频聊天界面

第一个 video 元素用于展示通过 navigator.getUserMedia() 获取到的本地音视频数据流，第二个 video 元素用于用于展示通过 RTCPeerConnection 接收到的相同音视频数据流，在实际应用中可以参考`微信视频聊天界面`，大视频窗口展示本地视频，小视频窗口展示远程传输的视频

```html

```

```javascript

```

## 4. RTCDataChannel

RTCDataChannel 对象用于`创建基于 RTCPeerConnection 对象的通道，并传递任意数据`

### (1) RTCDataChannel 对象

```javascript
定义：const RTCDataChannel = RTCPeerConnection.createDataChannel(name,options)
属性：RTCDataChannel.id                         //返回通道标识ID
     RTCDataChannel.label                      //返回通道名
     RTCDataChannel.binaryType                 //返回二进制数据类型
     RTCDataChannel.bufferedAmount             //返回缓冲队列中等待发送的字节数
     RTCDataChannel.bufferedAmountLowThreshold //
     RTCDataChannel.maxPacketLifeTime          //返回不可靠模式下消息发送允许时间
     RTCDataChannel.maxRetransmits             //返回不可靠模式下消息允许尝试重发的最大次数
     RTCDataChannel.negotiated                 //返回布尔值,当前通道是否已经通过应用协商
     RTCDataChannel.protocol                   //返回通道正在使用的协议
     RTCDataChannel.readyState                 //返回数据连接状态
方法：RTCDataChannel.send()                     //
     RTCDataChannel.close()                    //


事件：
open    //
message //
close   //
error   //
```

### (2) 实例

```html

```

```javascript

```

## 5. 外部函数库

由于 RTCPeerConnection、RTCDataChannel 这 2 个 API 比较复杂，一般采用外部函数库进行操作，目前视频聊天的函数库有 `SimpleWebRTC、easyRTC、WebRTC.io` 等，点对点通信的函数库有 `PeerJS、Sharefest` 等

WebRTC 面临的真实环境是`客户端程序需要穿透 NAT 网关以及各类防火墙`，所以在直连失败的情况下, peer-to-peer 网络需要一种`回退措施`，为了解决 peer-to-peer 直连通信失败的问题，WebRTC 通过 STUN 服务来获取客户端的公网IP，并使用 TURN 作为中继服务器
