# 二十四、Web Share API

## 1. Web Share API

网页如果要分享给其他应用，通常需要自己实现分享接口，逐一给出目标应用的连接方式，这样不但麻烦而且对网页性能也有一定影响

Web Share API 允许网页调用操作系统的分享接口，实质是 Web App 与本机应用程序交换信息的一种方式

* Web Share API `不限制分享目标的数量和性能`，社交媒体、电子邮件、即时消息、本地系统安装的接受分享的应用都会出现在系统的分享弹窗，这对手机网页尤其有用
* Web Share API `只需要一个分享按钮`，传统网页分享有多少个分享目标，就需要多少个分享按钮
* Web Share API 要求网站必须使用 `HTTPS` 协议，但是本地 localhost 可以使用 HTTP 协议
* Web Share API 不能直接调用，只能用来`响应用户操作`

```js
navigator.canShare({files: []}) //返回布尔值,指定的所有文件是否都可以被分享
navigator.share(options)        //返回Promise实例,分享指定文件或网页

options：
title //要分享的网页或文件标题
url   //要分享的网页 URL
files //要分享的文件 URL 数组
```

## 2. 分享当前网页

* 使用 navigator.share({title, url}) 方法分享网页，方法调用后立刻弹出`分享弹窗`，用户操作完毕后 Promise 实例状态变为 resolved/rejected

```html
<button id="btn">分享当前网页</button>
```

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', function(e){
  const title = document.title
  const url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href

  navigator.share({
    title: title,
    url: url
  }).then(res => console.log('分享成功'))
    .catch(err => console.log('分享失败'))
})
```

## 3. 分享文件

* 使用 navigator.canShare({files}) 方法判断目标文件是否可以被分享，目前`图像文件、音视频文件、文本文件`可以被分享
* 使用 navigator.share({title, files}) 方法分享文件

```html
<video width="300" height="200" controls>
  <source src="movie.mp4" type="video/mp4">
</video>
<button id="btn">分享视频文件</button>
```

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', function(e){
  if(navigator.canShare && navigator.canShare({files: ['./movie.mp4']})){
    navigator.share({
      title: 'movie',
      files: ['./movie.mp4'],
    })
    .then(res => console.log('分享成功'))
    .catch(err => console.log('分享失败'));
  } else{
    console.log('该文件无法被分享')
  }
})
```
