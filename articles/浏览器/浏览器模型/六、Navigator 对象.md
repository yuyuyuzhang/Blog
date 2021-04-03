# 六、Navigator 对象

[[_TOC_]]

## 1. Navigator 对象

Navigator 对象表示`当前浏览器信息`，包含与浏览器相关的各种信息

```javascript
属性：navigator.platform             //返回运行浏览器的操作系统平台
     浏览器：
     navigator.appCodeName          //返回浏览器代码名
     navigator.appName              //返回浏览器官方名称
     navigator.appVersion           //返回浏览器版本信息 
     navigator.language             //返回浏览器的首选语言(只读)
     navigator.languages            //返回浏览器提供的用户可以接受的语言数组
     navigator.userAgent            //返回浏览器的用户代理字符串,表示浏览器厂商和版本信息
     navigator.onLine               //返回布尔值,浏览器当前是否在线
     navigator.cookieEnabled        //返回布尔值,浏览器是否启用cookie
     浏览器插件：
     navigator.plugins              //返回PluginArray实例,表示浏览器安装的插件

     用户属性：
     navigator.userActivation
     
     navigator.deviceMemory //返回当前设备的大概内存
     navigator.doNotTrack //返回用户是否允许网址、广告等跟踪
     navigator.hardwareConcurrency //返回当前浏览器环境拥有的CPU核心数
     navigator.hid
     navigator.keyboard
     navigator.maxTouchPoints
     navigator.mediaCapabilities
     navigator.mediaDevices
     navigator.mediaSession
     navigator.mimeTypes
     navigator.scheduling
     navigator.serial
     
     navigator.vendor
     navigator.vendorSub
     navigator.wakeLock
     navigator.webdriver
     navigator.webkitPersistentStorage
     navigator.webkitTemporaryStorage
     navigator.xr

     navigator.locks
          
     ServiceWorker API：
     navigator.serviceWorker        //返回 Service Worker API
     Geolocation API：
     navigator.geoloacation         //返回一个 Geolocation API
     Clipboard API：
     navigator.clipboard            //返回一个 Clipboard API
     StorageManager API：
     navigator.storage
     USB API：
     navigator.usb
     permission API：
     navigator.permissions
     NetworkInformation API：
     navigator.connection
方法：navigator.javaEnabled()        //返回布尔值,浏览器是否启用java
     navigator.taintEnabled()       //返回布尔值,浏览器是否启用数据污点
     Beacon API：
     navigator.sendBeacon(url,data) //返回布尔值,浏览器是否成功向服务器发送数据,用户卸载网页时浏览器向服务器发送异步请求并携带少量数据
     Web Share API：
     navigator.share(options)       //返回一个Promise实例,Web Share API 分享网页或文件
     WebRTC API
     navigator.getUserMedia()         //返回 getUserMedia API

     navigator.unregisterProtocolHandler()
     navigator.canShare()
     navigator.clearAppBadge()
     navigator.getBattery()
     navigator.getGamepads()
     navigator.getInstalledRelatedApps()
     navigator.registerProtocolHandler()
     navigator.requestMIDIAccess()
     navigator.requestMediaKeySystemAccess()
     navigator.setAppBadge()
     navigator.vibrate()
     navigator.webkitGetUserMedia()
```

属性实例

```javascript
console.log(navigator.userAgent);      //Mozilla/5.0(Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0
console.log(navigator.appCodeName);    //Mozilla
console.log(navigator.appName);        //Netscape
console.log(navigator.appVersion);     //5.0 (Windows)
console.log(navigator.platform);       //Win64
console.log(navigator.cookieEnabled);  //true
console.log(navigator.onLine);         //false(浏览器离线=用户离线,true:浏览器在线!=用户在线,浏览器连接局域网,局域网不能连接外网)
console.log(navigator.language);       //zh-CN
console.log(navigator.languages);      //Array ["zh-CN","zh","zh-TW","zh-HK","en-US","en"]

const plugins = navigator.plugins;
console.log(plugins);                  //PluginArray { ... }
for(let i=0; i<plugins.length; i++){
  console.log(navigator.plugins[i].name);
  console.log(navigator.plugins[i].filename);
  console.log(navigator.plugins[i].description);
  console.log(navigator.plugins[i].version);
}
```

## 2. 客户端检测

不到万不得已，不要使用客户端检测，应该优先使用更通用的方法，一言以蔽之，先设计最通用的方案，再使用特定于浏览器的技术增强该方案，以下3种客户端检测方法从上到下优先级依次降低

### (1) 能力检测

测试当前浏览器是否支持要使用的 JavaScript 功能，尽量使用 `typeof` 进行能力检测

```javascript
//检测是否存在sort()方法,然而任何包含sort属性的对象同样返回true
function isSortable(obj){
  return !!obj.sort;
}

//检测sort是否为函数,可否调用其对数据进行排序
function isSortable(obj){
  return typeof obj.sort == 'function';
}
```

### (2) 怪癖检测

识别浏览器存在的缺陷

### (3) 用户代理检测

通过检测用户代理字符串 user agent 来识别具体的浏览器，这不是一个好方法，

① Navigator 对象的数据可被浏览器使用者更改，浏览器在自己的用户代理字符串中加入一些错误或误导性信息，来欺骗服务器

② 浏览器无法报告晚于浏览器发布的新操作系统

③ 用户代理字符串并无统一格式，也无法保证未来的适用性，各种上网设备层出不穷
