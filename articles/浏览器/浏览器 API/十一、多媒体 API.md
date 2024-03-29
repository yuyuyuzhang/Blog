# 十一、多媒体 API

## 1. audio & video 标签

H5 新增 audio、video 标签用于显示`音视频`

```html
<video id="video" src="./movie.mp4" controls></video>

<audio id="audio" src="./movie.mp4" controls></audio>
```

### (1) audio、video 属性和方法

```js
属性：读写属性：
     video.mediaGroup          //返回/设置音视频所属的组合(组合用于连接多个音视频)
     video.src                 //返回/设置音视频的当前来源
     video.crossOrigin         //返回/设置音视频的跨域CORS设置
     video.controls            //返回/设置音视频是否显示控件
     video.preload             //返回/设置音视频是否在页面加载后加载
     video.autoplay            //返回/设置音视频是否在加载完成后自动播放
     video.loop                //返回/设置音视频是否循环播放
     video.readyState          //返回/设置音视频的当前就绪状态
     video.currentTime         //返回/设置音视频的当前播放位置(以秒计)
     video.volume              //返回/设置音视频的当前音量
     video.paused              //返回/设置音视频是否暂停
     video.muted               //返回/设置音视频是否静音
     video.defaultMuted        //返回/设置音视频默认是否静音
     video.playbackRate        //返回/设置音视频的播放速度
     video.defaultPlaybackRate //返回/设置音视频的默认播放速度
     只读属性：
     video.startDate           //返回当前时间偏移量
     video.seeking             //返回用户是否正在音视频中进行查找
     video.networkState        //返回音视频的当前网络状态
     video.duration            //返回音视频的长度(以秒计)
     video.ended               //返回音视频是否播放结束
     video.error               //返回MediaError对象,音视频发生错误
     video.controller          //返回MediaController对象,表示当前媒体控制器
     video.played              //返回TimeRanges对象,包含音视频已播放部分
     video.buffered            //返回TimeRanges对象,包含音视频已缓存部分
     video.seekable            //返回TimeRanges对象,包含音视频可寻址部分
     video.textTracks          //返回TextTrackList对象,包含所有可用文本轨道
     video.audioTracks         //返回AudioTrackList对象,包含所有可用音频轨道
     video.videoTracks         //返回VideoTrackList对象,包含所有可用视频轨道 
方法：video.canPlayType(type)   //检测浏览器能否播放指定音视频类型
     video.load()              //重新加载音视频
     video.play()              //开始播放音视频
     video.pause()             //暂停播放音视频
```

### (2) audio、video 事件

```js
加载事件：
audio/video.onloadstart      //当浏览器开始加载音视频时触发
audio/video.onloadeddata     //当浏览器已加载音视频的当前帧时触发
audio/video.onloadedmetadata //当浏览器已加载音视频的元数据时触发
audio/video.onprogress       //当浏览器正在加载音视频时触发
audio/video.onsuspend        //当浏览器被阻止加载音视频时触发
audio/video.onabort          //当浏览器终止加载音视频时触发
audio/video.onerror          //当浏览器加载音视频期间发生错误时触发
audio/video.onstalled        //当浏览器加载到的音视频数据不可用时触发

状态事件：
audio/video.oncanplay        //当浏览器可以播放音视频时触发
audio/video.oncanplaythrough //当浏览器不因缓冲而暂停的情况下可以播放时触发
audio/video.onwaiting        //当音视频由于需要缓冲下一帧而暂停时触发
audio/video.onpause          //当音视频暂停时触发
audio/video.onplaying        //当音视频因暂停而就绪时触发
audio/video.onplay           //当音视频因暂停而开始播放时触发

变化事件：
audio/video.onemptied        //当目前的播放列表为空时触发
audio/video.onended          //当目前的播放列表结束时触发
audio/video.ontimeupdate     //当音视频的当前播放位置变化时触发
audio/video.onseeking        //当用户开始移动音视频的位置播放位置时触发
audio/video.onseeked         //当用户已经移动音视频到新的播放位置时触发
audio/video.ondurationchange //当音视频的时长变化时触发
audio/video.onratechange     //当音视频的播放速度变化时触发
audio/video.onvolumechange   //当音视频的音量变化时触发
```

## 2. Web Audio API

Web Audio API 用于操作声音，可以让网页发出声音

音频源（audio、video） -> 中间处理模块（滤波器 BiquadFilterNode、音量控制器 GainNode）-> 音频目的地（扬声器）

* 创建音频上下文 AudioContext
* 创建音频源
* 创建音效
* 选择音频目的地
* 连接音频源和音频目的地，输出音效

![Web Audio 流程](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/Web%20Audio%20%E6%B5%81%E7%A8%8B.svg)

### (1) AudioContext 对象

浏览器原生提供 AudioContext() 构造函数，用于生成 AudioContext 对象，表示一个`音频上下文`，音频相关的一切操作都在音频上下文这个环境中操作

```js
定义：const audioCtx = new AudioContext()
属性：audioCtx.state                           //返回audioCtx当前状态(running,suspended,closed)
     audioCtx.destination                     //返回AudioDestinationNode实例,表示音频目的地
     audioCtx.listener                        //返回AudioListener对象,表示收听者的位置
     audioCtx.sampleRate                      //返回audioCtx的采样率,所有音频节点的采样率相同
     audioCtx.baseLatency                     //返回audioCtx从音频目的地到播放硬件的延迟秒数
     audioCtx.currentTime                     //返回audioCtx创建后经过的时间
方法：音频上下文：
     audioCtx.getOutputTimestamp()            //返回audioCtx的音频时间戳contextTime、performanceTime
     audioCtx.suspend()                       //返回Promise实例,暂停audioCtx,暂停音频硬件访问并减少进程中的CPU/电池使用
     audioCtx.remuse()                        //返回Promise实例,恢复audioCtx
     audioCtx.close()                         //返回Promise实例,关闭audioCtx,强制释放所有音频资源
     音频源：
     audioCtx.createBuffer()                  //返回AudioBuffer对象,创建一段内存中的音频数据
     audioCtx.decodeAudioData(arraybuffer)    //返回AudioBuffer对象,异步解码arraybuffer音频文件数据
     audioCtx.createBufferSource()            //返回AudioBufferSourceNode对象,从AudioBuffer音频文件生成音频源
     audioCtx.createMediaElementSource(node)  //返回MediaElementAudioSourceNode对象,从页面audio&video元素生成音频源
     audioCtx.createMediaStreamSource(stream) //返回MediaStreamAudioSourceNode对象,从WebRTC摄像头或麦克风生成音频源
     audioCtx.createConstantSource()          //返回ConstantSourceNode对象,创建一个恒定输出的音频源
     音效：
     audioCtx.createGain()                    //返回GainNode对象,用于音量控制
     audioCtx.createBiquadFilter()            //返回BiquadFilterNode对象,用于音频滤波
     audioCtx.createIIRFilter()               //返回IIRFilterNode对象,用于无限脉冲响应的音频滤波
     audioCtx.createDelay(second)             //返回DelayNode对象,用于设置音频输出的指定延迟
     audioCtx.createStereoPanner()            //返回StereoPannerNode对象,用于左右移动音频流
     audioCtx.createDynamicsCompressor()      //返回DynamicsCompressorNode对象,用于压缩音频信号
     audioCtx.createWaveShaper()              //返回WaveShaperNode对象,用于实现音频的非线性扭曲效果
     audioCtx.createConvolver()               //返回ConvolverNode对象,用于给音频添加混响效果
     audioCtx.createOscillator()              //返回OscillatorNode对象,用于产生指定频率波形的音频处理
     audioCtx.createPeriodicWave()            //返回PeriodicWaveNode对象,用于定义周期性的波形
     audioCtx.createChannelSplitter()         //返回ChannelSplitterNode对象,用于拆分声道
     audioCtx.createChannelMerger()           //返回ChannelMergerNode对象,用于合并声道
     audioCtx.createAnalyser()                //返回AnalyserNode对象,用于从音频中提取时间、频率、其他数据,实现数据分析和可视化
     audioCtx.createPanner()                  //返回PannerNode对象,用于获取右手笛卡尔坐标系里音频源的位置、运动、方向信息
     音频目的地：
     audioCtx.createMediaStreamDestination()  //返回MediaStreamAudioDestinationNode对象,创建与WebRTC摄像头或麦克风生成的音频源关联的音频目的地


事件：
audioCtx.onstatechange //audioCtx.state 属性值改变时触发
```

### (2) AudioNode 对象

Web Audio API 中每个组件都是一个音频节点 AudioNode，声音从第一个 AudioNode 流过第二个、第三个、...直到最后一个 AudioNode（扬声器），以`串联或并联`的方式进行信号传输，因此音频节点包括`音频源、音效、音频目的地`

#### ① 音频源

* **AudioBufferSourceNode**：由`内存中的一段音频数据`组成的音频源
  * **AudioBuffer**：内存中的一段音频数据
* **MediaElementAudioSourceNode**：由 `<audio>、<video>` 元素生成的音频源
* **MediaStreamAudioSourceNode**：由 `WebRTC 摄像头或麦克风`生成的音频源
* **ConstantSourceNode**：`恒定输出`的音频源

```js
定义：const source = audioCtx.createBufferSource()           //返回AudioBufferSourceNode对象,从AudioBuffer音频文件生成音频源
     const source = audioCtx.createMediaElementSource(node)  //返回MediaElementAudioSourceNode对象,从页面audio&video元素生成音频源
     const source = audioCtx.createMediaStreamSource(stream) //返回MediaStreamAudioSourceNode对象,从WebRTC摄像头或麦克风生成音频源
     const source = audioCtx.createConstantSource()          //返回ConstantSourceNode对象,创建一个恒定输出的音频源
属性：source.context                 //返回AudioContext对象,当前音频源所属的音频上下文
     source.buffer                  //返回AudioBuffer对象,当前音频源对应的内存中的音频数据
     source.playbackRate            //返回/设置当前音频源的播放速度
     source.mediaElement            //返回当前音频源对应的页面audio&video节点
     source.offset                  //返回/设置当前恒定音频源连续输出的值
     source.channelCount            //返回/设置当前音频源声道数量
     source.channelCountMode        //返回/设置当前音频源声道计数模式(max,clamped-max,explicit)
     source.channelInterpretation   //返回/设置当前音频源声道含义(speakers,discrete)
     source.numberOfInputs          //返回当前音频源的输入数量
     source.numberOfOutputs         //返回当前音频源的输出数量
     source.loop                    //返回/设置播放结束时是否循环
     source.loopStart               //返回/设置循环播放的首位置
     source.loopEnd                 //返回/设置循环播放的尾位置
方法：source.connect(destination)    //无返回值,连接音频源和音频目的地
     source.disconnect(destination) //无返回值,取消连接音频源和音频目的地
     source.start(time)             //无返回值,设置音频在指定时间开始播放
     source.stop(time)              //无返回值,设置音频在指定时间结束播放


事件：
source.onend //音频源播放结束时触发
```

#### ② 音效

* **GainNode**：音量控制器
* **BiquadFilterNode**：音频滤波器
* **IIRFilter**：无限脉冲响应的音频滤波器
* **DelayNode**：用于设置音频延时输出
* **StereoPannerNode**：用于左右移动音频流
* **DynamicsCompressorNode**：用于压缩音频信号，当多个音频同时播放且混合时通过降低音量最大部分的音量来避免发生削波和失真
* **WaveShaperNode**：用于实现非线性扭曲效果
* **ConvolverNode**：用于实现混响效果，对给定的 ArrayBuffer 执行线性卷积
* **OscillatorNode**：用于产生指定频率波形的音频处理
* **PeriodicWaveNode**：用于定义周期性的波形，常用于重塑 OscillatorNode 的输出
* **ChannelSplitterNode**：用于拆分声道
* **ChannelMergerNode**：用于合并声道
* **AnalyserNode**：用于从音频中提取时间、频率、其他数据，实现数据分析和可视化
* **PannerNode**：用于获取右手笛卡尔坐标系里音频源的位置、运动、方向信息

#### ③ 音频目的地

* **AudioDestinationNode**：定义音频输出到哪里，通常是扬声器、耳机
* **MediaStreamAudioDestinationNode**：定义 WebRTC getUserMedia API 的音频输出

```js
定义：const destination = audioCtx.destination
     const destination = audioCtx.createMediaStreamDestination()
属性：destination.context                 //返回AudioContext对象,当前音频源所属的音频上下文
     destination.channelCount            //返回/设置当前音频目的地声道数量
     destination.channelCountMode        //返回/设置当前音频目的地声道计数模式(max,clamped-max,explicit)
     destination.channelInterpretation   //返回/设置当前音频目的地声道含义(speakers,discrete)
     destination.numberOfInputs          //返回当前音频目的地的输入数量
     destination.numberOfOutputs         //返回当前音频目的地的输入数量
方法：destination.connect(source)         //无返回值,连接音频源和音频目的地
     destination.disconnect(source)      //无返回值,取消连接音频源和音频目的地
```

### (3) 实例

#### ① AudioBufferSourceNode（ArrayBuffer 音频源）

由于 Chrome 的安全性策略，使用 AudioContext 网页不会发出声音，控制台报出警告：The AudioContext was not allowed to start. It must be resume (or created) after a user gesture on the page

* 要么在网页的用户手势之后`创建` AudioContext

  ```html
  <button id="btn">点击</button>
  ```
  
  ```js
  //a user gesture on the page
  const btn = document.getElementById('btn')
  btn.addEventListener('click', e => {
     //创建 AudioContext
     const audioCtx = new AudioContext()
     fetch('./movie.mp4')
     .then(res => res.arrayBuffer())
     .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
     .then(audioBuffer => {
          const source = audioCtx.createBufferSource()
          source.buffer = audioBuffer //将内存中的一段音频数据放入这个音频源节点
          source.connect(audioCtx.destination) //将音频源连接到音频目的地
          source.start(audioCtx.currentTime) //开始播放声音
     })
  })
  ```

* 要么先创建 AudioContext，然后在网页的用户手势之后`恢复` AudioContext

  ```html
  <button id="btn">点击</button>
  ```
  
  ```js
  const audioCtx = new AudioContext()
  fetch('./movie.mp4')
     .then(res => res.arrayBuffer())
     .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
     .then(audioBuffer => {
     const source = audioCtx.createBufferSource()
     source.buffer = audioBuffer //将内存中的一段音频数据放入这个音频源节点
     source.connect(audioCtx.destination) //将音频源连接到音频目的地
     source.start(audioCtx.currentTime) //开始播放声音
  })

  //a user gesture on the page
  const btn = document.getElementById('btn')
  btn.addEventListener('click', function(e){
     //恢复 AudioContext
     audioCtx.resume()
  })
  ```

#### ② MediaElementAudioSourceNode（audio&video 音频源）

```html
<video id="video" src="./movie.mp4" width="300" height="200" controls ></video>
<button id="btn">播放</button>
<canvas id="canvas" width="300" height="150" style="border:1px solid red;"></canvas>
```

```js
//a user gesture on the page
const btn = document.getElementById('btn')
btn.addEventListener('click', e => {
  //播放
  const movie = document.getElementById('movie')
  movie.play()

  //音频可视化
  const audioCtx = new AudioContext()
  const source = audioCtx.createMediaElementSource(movie)
  const analyser = audioCtx.createAnalyser()
  const canvas = document.getElementById('canvas')
  const canvasCtx = canvas.getContext('2d')
  source.connect(analyser)
  analyser.connect(audioCtx.destination)

  //绘图
  draw()
  function draw(){
    const width = canvas.width
    const height = canvas.height
    const arr = new Uint8Array(128)
    analyser.getByteFrequencyData(arr)
    canvasCtx.clearRect(0, 0, width, height)
    for(let i=0; i<arr.length; i++){
      canvasCtx.fillRect(i*5, height-arr[i], 3, height);
    }
    requestAnimationFrame(draw)
  }
})
```

#### ③ MediaStreamAudioSourceNode（WebRTC 音频源）

通过 WebRTC 获取媒体流，然后传入页面的 video 标签中展示和播放

```html
<video id="video" width="300" height="200" controls></video>
<input type="range" min="0" max="100" step="1" value="20" name="volume" id="volume" />
```

```js
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

#### ④ ConstantSourceNode（恒定输出音频源）

```html
<button id="btn">播放</button>
<input type="range" min="0" max="1" step="0.1" value="0.5" name="volume" id="volume" />
```

```js
//a user gesture on the page
const btn = document.getElementById('btn')
btn.addEventListener('click', e => {
  const audioCtx = new AudioContext()
  const source = audioCtx.createConstantSource()
  source.connect(audioCtx.destination)
  source.start()

  //音量控制
  const volume = document.getElementById('volume')
  volume.addEventListener('input', e => {
    source.offset.value = volume.value
  })
})
```

## 3. MediaCapabilities API

navigator.mediaCapabilities 属性返回 MediaCapabilities API，表示`浏览器对指定多媒体格式的支持能力`

```js
定义：const mediaCapabilities = navigator.mediaCapabilities
方法：mediaCapabilities.decodingInfo(config) //返回Promise实例,当前浏览器对config提供的视频格式和编码信息的支持能力
```

### (1) 当前浏览器对指定多媒体格式的支持能力

```js
const mediaConfig = {  
  type: 'media-source',
  audio: {
    contentType: 'audio/webm; codecs=opus',
    channels: '2',    //音轨使用的通道
    bitrate: 132266,  //比特率
    samplerate: 48000 //采样率
  },
  video: {
    contentType: 'video/webm; codecs="vp09.00.10.08"',
    width: 1920,
    height: 1080,
    bitrate: 2646242, //比特率
    framerate: '25'   //帧率
  }
};
const f = async () => {
  const isSupport = await navigator.mediaCapabilities.decodingInfo(mediaConfig)
  console.log(isSupport)
}
f()
```

![mediaCapabilities]()

## 4. MediaDevices API

navigator.mediaDevices 属性返回 MediaDevices API，表示`可用的多媒体设备`

```js
定义：const mediaDevices = navigator.mediaDevices
方法：mediaDevices.getSupportedConstraints() //返回MediaTrackSupportedConstraints对象,包含当前浏览器支持的所有约束属性
     mediaDevices.enumerateDevices()        //返回Promise实例,枚举所有可用的多媒体设备
     mediaDevices.getUserMedia()            //返回Promise实例,当前浏览器获取多媒体设备麦克风和摄像头
     mediaDevices.getDisplayMedia()         //返回Promise实例,当前浏览器获取显示的内容并指定共享屏幕
     

事件：
mediaDevices.ondevicechange //可用的多媒体设备列表改变时触发,可以使用enumerateDevices()获取设备的更新列表
```

### (1) 可用的多媒体设备列表

```js
const updateDeviceList = async () => {
  const deviceList = await navigator.mediaDevices.enumerateDevices()
  console.log(deviceList)
}

//初始显示设备列表
updateDeviceList() 

//更新设备列表
navigator.mediaDevices.addEventListener('devicechange', e => {
  updateDeviceList()
})
```

![mediaDevices.enumerateDevices()]()

### (2) WebRTC 音频源

```html
<video id="video" width="300" height="200" controls></video>
<input type="range" min="0" max="100" step="1" value="20" name="volume" id="volume" />
```

```js
const f = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
     audio: true, //麦克风
     video: true  //摄像头
  })

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
}
f()
```

### (3) 共享屏幕

mediaDevices.getDisplayMedia() API 支持共享`整个屏幕、应用窗口、Chrome 标签页`

```js
const f = async () => {
  const displayMedia = await navigator.mediaDevices.getDisplayMedia()
  console.log(displayMedia) //MediaStream {}
}
f()
```

![共享屏幕]()

## 5. getUserMedia API

### (1) getUserMedia 方法

`navigator.getUserMedia()` 方法主要用于`浏览器获取多媒体设备麦克风和摄像头`，浏览器会询问用户是否同意浏览器调用麦克风和摄像头，用户同意则执行第一个回调函数，不同意就执行第二个回调函数

* 第一个回调函数参数是一个 MediaStream 对象
* 第二个回调函数参数是一个 Error 对象，其 code 属性有如下 3 种取值说明错误类型
  * MANDATORY_UNSATISFIED_ERROR：浏览器未发现指定硬件设备
  * NOT_SUPPORTED_ERROR：浏览器不支持指定硬件设备
  * PERMISSION_DENIED：用户拒绝浏览器使用指定硬件设备

```js
navigator.getUserMedia({
  audio, //麦克风
  video, //摄像头
}, stream => {}, err => {})
```

### (2) MediaStream 对象

MediaStream 对象表示`媒体流`，一个媒体流包含多个轨道，例如音频轨道、视频轨道

```js
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
stream.onactive      //当前媒体流对象变为活动状态时触发
stream.oninactive    //当前媒体流对象变为非活动状态时触发
stream.onaddtrack    //当前媒体流对象添加新的MediaStreamTrack对象时触发
stream.onremovetrack //当前媒体流对象移除旧的MediaStreamTrack对象时触发
```

### (3) MediaStreamTrack 对象

MediaStreamTrack 对象表示`媒体流的一个轨道`，例如音频轨道、视频轨道

```js
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
track.onreadystate //当前轨道状态改变时触发
track.onended      //当前轨道无效时触发
track.onunmute     //当前轨道静音时触发
```

### (4) 实例：WebRTC 音频源

```html
<video id="video" width="300" height="200" controls></video>
<input type="range" min="0" max="100" step="1" value="20" name="volume" id="volume" />
```

```js
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
