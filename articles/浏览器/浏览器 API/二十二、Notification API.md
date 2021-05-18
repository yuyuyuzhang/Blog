# 二十二、Notification API

## 1. Notification 对象

在获得让浏览器显示通知的权限后，可以通过创建 Notification 对象来让浏览器向用户显示通知

```javascript
定义：const notify = new Notification(title, options)
属性：Notification.permission                  //返回字符串,用户是否允许浏览器显示通知(default:未请求,granted:允许,denied:拒绝)
方法：Notification.requestPermission(callback) //无返回值,向用户请求让浏览器显示通知的权限
     notify.close()                           //无返回值,关闭通知


options：
lang //指定通知的语言
dir  //指定通知中的文字方向,默认ltr
icon //指定通知使用的图标来源(url地址)
tag  //指定通知的ID,即唯一标识符
body //指定通知显示的内容
```

## 2. Notification 事件

```javascript
notify.onshow  //通知被显示时触发
notify.onclick //通知被点击时触发
notify.onclose //通知被关闭时触发
notify.onerror //通知发生错误时触发
```

## 2. 实例

```html
<button id="btn">浏览器显示通知</button>
```

```javascript
const btn = document.getElementById('btn')  
btn.addEventListener('click', function (e) {    
  if (Notification.permission !== 'granted') {  
    Notification.requestPermission()       
  }
  
  const notify = new Notification('通知', { body: '我是小可爱' })
  notify.onshow = function (e) {        
    console.log('通知被显示')      
  }      
  notify.onclose = function (e) {        
    console.log('通知被关闭')      
  }      
  notify.onclick = function (e) {        
    console.log('通知被点击')      
  }      
  notify.onerror = function (e) {        
    console.log('通知发生错误')     
  }    
})
```
