# 六、Navigator 对象

[[_TOC_]]

## 1. Navigator 对象

Navigator 对象表示`当前浏览器信息`，包含与浏览器相关的各种信息

### (1) Navigator 对象属性

```js
主机信息：
navigator.platform                //返回当前主机运行当前浏览器的操作系统平台(不推荐使用)
navigator.hardwareConcurrency     //返回当前主机的CPU核心数
navigator.deviceMemory            //返回当前主机的大概内存
navigator.maxTouchPoints          //返回当前主机能够支持的同时最大触摸点数
浏览器信息：
navigator.appCodeName             //返回当前浏览器代码名(不推荐使用)
navigator.appName                 //返回当前浏览器官方名称(不推荐使用)
navigator.appVersion              //返回当前浏览器版本信息(不推荐使用)
navigator.language                //返回当前浏览器的首选语言(只读)
navigator.languages               //返回当前浏览器提供的用户可以接受的语言数组
navigator.userAgent               //返回当前浏览器的用户代理字符串,表示浏览器厂商和版本信息
navigator.product                 //返回当前浏览器的引擎名称(不推荐使用)
navigator.productSub              //返回当前浏览器的编译版本号(不推荐使用)
navigator.vendor                  //返回当前浏览器的浏览器供应商名称(不推荐使用)
navigator.vendorSub               //返回当前浏览器的浏览器供应商供应的浏览器版本号(不推荐使用)
浏览器状态：
navigator.onLine                  //返回布尔值,当前浏览器当前是否在线
navigator.cookieEnabled           //返回布尔值,当前浏览器是否启用cookie
navigator.webdriver               //返回布尔值,当前浏览器的用户代理是否自动化控制
navigator.doNotTrack              //返回用户是否允许网址、广告跟踪    
navigator.plugins                 //返回PluginArray对象,当前浏览器安装的所有插件列表
navigator.mimeTypes               //返回MimeTypeArray对象,当前浏览器识别的MIME类型列表
客户端存储：
navigator.storage                 //返回 StorageManager API
硬件设备 API：
navigator.keyboard                //返回Keyboard对象,键盘
navigator.bluetooth               //返回Bluetooth对象,蓝牙
navigator.usb                     //返回USB对象,USB
多媒体 API：
navigator.mediaCapabilities       //返回MediaCapabilities对象,表示浏览器对指定多媒体格式的支持能力
navigator.mediaDevices            //返回MediaDevices对象,表示可用的多媒体设备
navigator.mediaSession            //返回MediaSession对象,表示媒体会话（移动端）
浏览器 API：
navigator.connection              //返回 NetworkInformation API
navigator.credentials             //返回 Credentials API
navigator.permissions             //返回 Permissions API
navigator.wakeLock                //返回 WakeLock API
navigator.serial                  //返回 Web Serial API
navigator.locks                   //返回 Web Locks API
navigator.presentation            //返回 Presentation API
navigator.hid                     //返回 Web HID API
navigator.xr                      //返回 WebXR API
navigator.serviceWorker           //返回 Service Worker API
navigator.geoloacation            //返回 Geolocation API
navigator.clipboard               //返回 Clipboard API
```

### (2) Navigator 对象方法

```js
浏览器信息：
navigator.javaEnabled()                 //返回布尔值,浏览器是否启用java
navigator.taintEnabled()                //返回布尔值,浏览器是否启用数据污点
硬件设备 API：
navigator.getBattery()                  //返回Promise实例,Battery Status API 当前主机的电量信息
多媒体 API：
navigator.getUserMedia()                //返回获取到的多媒体设备,WebRTC getUserMedia 当前浏览器获取多媒体设备麦克风和摄像头
浏览器 API：
navigator.sendBeacon(url,data)          //返回布尔值,用户卸载网页时浏览器是否成功向服务器发送异步请求并携带少量数据
navigator.vibrate(pattern)              //返回布尔值,是否成功使当前设备产生间隔频率的震动(设备不支持震动则方法无效,已存在震动则取代前一个震动)
navigator.getGamepads()                 //返回所有已连接的游戏手柄数组
navigator.canShare({files})             //返回布尔值,目标文件files是否可以被分享
navigator.share(options)                //返回Promise实例,Web Share API 分享网页或文件
navigator.setAppBadge(number)           //返回Promise实例,设置当前应用程序图标上的徽章
navigator.clearAppBadge()               //返回Promise实例,清除当前应用程序图标上的徽章
```

## 2. 客户端检测

不到万不得已，不要使用客户端检测，应该优先使用更通用的方法，一言以蔽之，先设计最通用的方案，再使用特定于浏览器的技术增强该方案，以下3种客户端检测方法从上到下优先级依次降低

### (1) 能力检测

测试当前浏览器是否支持要使用的 JavaScript 功能，尽量使用 `typeof` 进行能力检测

```js
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
