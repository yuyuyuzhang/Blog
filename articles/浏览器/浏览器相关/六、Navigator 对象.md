# 六、Navigator 对象

[[_TOC_]]

## 1. Navigator 对象

Navigator 对象表示`当前浏览器信息`，包含与浏览器相关的各种信息

```javascript
属性：navigator.userAgent            //返回浏览器的user agent字符串,表示浏览器厂商和版本信息
     navigator.appCodeName          //返回浏览器代码名
     navigator.appName              //返回浏览器名称
     navigator.appVersion           //返回浏览器平台和版本信息
     navigator.platform             //返回运行浏览器的操作系统平台
     navigator.onLine               //返回布尔值,表示浏览器当前是否在线
     navigator.language             //返回浏览器的首选语言(只读)
     navigator.languages            //返回用户可以接受的语言的数组
     navigator.plugins              //返回PluginArray实例,表示浏览器安装的插件
     Cookie 属性：
     navigator.cookieEnabled        //返回布尔值,浏览器是否启用cookie
     Service Worker API：
     navigator.serviceWorker        //返回 Service Worker API
     地理位置 API：
     navigator.geoloacation         //返回一个 Geolocation API
     剪贴板 API：
     navigator.clipboard            //返回一个 Clipboard API
方法：navigator.javaEnabled()        //返回布尔值,浏览器是否启用java
     navigator.taintEnabled()       //返回布尔值,浏览器是否启用数据污点
     Beacon API：
     navigator.sendBeacon(url,data) //返回布尔值,浏览器是否成功向服务器发送数据,用户卸载网页时,浏览器向服务器发送异步请求并携带少量数据
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
