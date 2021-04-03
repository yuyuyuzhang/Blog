# 七、Location 对象

[[_TOC_]]

## 1. URL 对象

### (1) URL 编码

#### ① URL 合法字符

URL 合法字符包括 URL 元字符和语义字符

| URL元字符 | 语义字符 |
| -------- | -------- |
|     /    |    -     |
|     @    |    _     |
|     ?    |    ~     |
|     #    |    ()    |
|     ,    |    !     |
|     ;    |    '     |
|     +    |    .     |
|     =    |    *     |
|     $    |    a-z   |
|     &    |    A-Z   |
|     &    |    0-9   |

#### ② URL 字符转义

除 URL 合法字符外，其他字符出现在 URL 中都必须经过转义，字符的 1 个`字节`被转义为百分号加上 2 个大写的十六进制字母

```javascript
URI(通用资源标识符)编码方法:
encodeURI(url)          //返回编码后的url,转义除URL合法字符外的所有字符
decodeURI(url)          //解码使用encodeURL()编码的url

encodeURIComponent(url) //返回编码后的url,转义除URL合法字符中语义字符外的所有字符
decodeURIComponent(url) //解码使用encodeURLComponent()编码的url
```

```javascript
//默认采用 UTF-8 编码：一个英文字符 1 个字节，一个中文字符 3 个字节
const url = "http://www.b.com #哈";
console.log(encodeURI(url));          //"http://www.b.com%20#%E5%93%88"
console.log(encodeURIComponent(url)); //"http%3A%2F%2Fwww.b.com%20%23%E5%93%88"
```

### (2) URL 对象

URL 全称统一资源定位符，又称网页地址 ( 全球性 )，用于定位浏览器中显示的网页资源

```javascript
定义：const url = new URL(urlStr);
属性：url.href         //完整URL
     url.origin       //源(协议、主机、端口)
     url.protocol     //协议(包含:)
     url.host         //主机、端口
     url.hostname     //主机
     url.port         //端口
     url.pathname     //URL路径
     url.search       //查询字符串(从?开始)
     url.hash         //片段识别符(从#开始)
     用户信息：
     url.username     //用户名
     url.password     //密码
方法：构造函数方法：
     URL.createObjectURL(file) //返回一个URL字符串,为上传/下载的文件、流媒体文件生成一个URL字符串,给File对象、Blob对象使用
     URL.revokeObjectURL(url)  //无返回值,释放浏览器内存中由URL.createObjectURL()方法生成的URL实例
```

#### ① URL 对象属性

```javascript
const url = "http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"

console.log(url.href);     //"http://user:passwd@www.example.com:4097/path/a.html?x=111#part1"
console.log(url.origin);   //"http://user:passwd@www.example.com:4097"
console.log(url.protocol); //"http:"
console.log(url.host);     //"www.example.com:4097"
console.log(url.hostname); //"www.example.com"
console.log(url.port);     //"4097"

console.log(url.pathname); //"/path/a.html"
console.log(url.search);   //"?x=111"
console.log(url.hash);     //"#part1"

console.log(url.username); //"user"
console.log(url.password); //"passwd"
```

#### ② URL 对象方法

```javascript
//通过文件流下载文件
request({
  url: LOAD_URL,
  method: 'get',
  responseType: 'blob',
  params: params
}).then(res => {
  const fileName = decodeURI(res.headers.fileName)
  const url = URL.createObjectURL(res.data)
  const link = document.createElement('a')
  document.body.append(link)
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  link.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(link)
})
```

## 2. URL 查询字符串

### (1) URL 查询字符串

#### ① 原理

查询字符串就是 URL 参数，添加在 URL 末尾的用于向服务器发送信息的字符串（键值对）

#### ② 用途

显示动态页面结果，例如购物页面，添加了活动参数，就可以按照大小过滤产品

```javascript
//基本T恤页面
http://www.example.com/tshirt.html

//s码T恤页面
http://www.example.com/tshirt.html?size=s
```

### (2) URLSearchParams 对象

URLSearchParams 对象表示  `URL 的查询字符串`，用来构造、解析、处理 URL 的查询字符串

```javascript
定义：const urlSearch = new URLSearchParams(urlSearchStr); //自动编码
方法：urlSearch.toString()        //返回urlSearch的字符串形式
     urlSearch.has(key)          //返回布尔值,是否包含指定键名的键值对
     urlSearch.get(key)          //返回指定键名的第一个键值
     urlSearch.getAll(key)       //返回指定键名的所有键值构成的数组
     urlSearch.set(key,value)    //无返回值,设置指定键名的键值
     urlSearch.delete(key)       //无返回值,删除指定键名的键值对
     urlSearch.append(key,value) //无返回值,追加指定键名的键值(允许重复)
     urlSearch.sort()            //无返回值,按照Unicode码点从小到大对键名排序
     遍历方法：
     urlSearch.keys()            //返回键名的遍历器
     urlSearch.values()          //返回键值的遍历器
     urlSearch.entries()         //返回键值对的遍历器
```

方法应用

```javascript
let urlSearch = new URLSearchParams({'f2': 2, 'f1': 1});
urlSearch.append('f2', 3);
console.log(urlSearch.toString());   //"f2=2&f1=1&f2=3"
console.log(urlSearch.get('f1'));    //"1"
console.log(urlSearch.get('f3'));    //null
console.log(urlSearch.get('f2'));    //"2"
console.log(urlSearch.getAll('f2')); //Array ["2", "3"]

urlSearch.set('f2', 4); 
urlSearch.set('f2', 5); 
urlSearch.set('f1', 1); 
console.log(urlSearch.toString());   //"f2=5&f1=1",重复设置则覆盖

urlSearch.sort();
console.log(urlSearch.toString());   //"f1=1&f2=5",同名键则顺序不变

for(let item of urlSearch.keys()){
  console.log(item); //"f1" "f2"
}
for(let item of urlSearch.values()){
  console.log(item); //"1" "5"
}
for(let item of urlSearch.entries()){
  console.log(item); //Array ["f1", "1"] ["f2", "5"]
}
```

## 3. URL 片段识别符

### (1) 原理

片段识别符是 URL 的锚，代表文档中的一个位置，# 号后面的字符就是该位置的标识符

#### ① 为文档指定位置标识符

有两种方式，一是使用 id 属性，而是使用 a 标签的 name 属性

```html
<!-- 方式 1 -->
<div id="part1">part1</div>

<!-- 方式 2 -->
<a name="part3">part2</a>
```

#### ② hashchange 事件

HTML5 新增 hashchange 事件，每当 URL 的片段识别符改变时，就会在 `window 对象`上触发 hashchange 事件

Event 对象相关属性如下

```javascript
e.oldURL    //返回变化前的完整URL
e.newURL    //返回变化后的完整URL
```

#### ③ popstate 事件

每当`同一个文档`的 history 对象变化时，就会在 `window` 对象上触发 popstate 事件，如果浏览历史的切换导致加载不同的文档，不会触发 popstate 事件

由于改变片段识别符会改变 History 对象的浏览记录，因此会在 `window` 对象上触发 `popstate` 事件

Event对象相关属性如下

```javascript
e.state //返回浏览器History对象当前记录的state对象
```

### (3) 用途

#### ① HTTP 请求不包括片段识别符

片段识别符不包含在 HTTP 请求 URL 中，对服务器完全无用，仅仅是用来`指导浏览器动作`的，浏览器读取到 URL 后，会自动根据 URL 的片段识别符滚动到文档指定位置

#### ② 改变片段识别符不触发文档重载

改变 URL 的片段识别符，浏览器只会滚动到文档指定位置，不会重新加载文档

#### ③ 改变片段识别符会改变浏览器访问历史

每次改变 URL 的片段识别符，都会在浏览器的 History 对象中新增一个浏览记录，点击后退按钮，可以回到文档的上一个位置

由于改变片段识别符会改变 History 对象，因此会在 `window` 对象上触发 `popstate` 事件

```html
<button id="btn1">part1</button>
<button id="btn2">part2</button>
<div id="part1" style="height:500px;border:1px solid red;">part1</div>
<div id="part2" style="height:500px;border:1px solid red;">part2</div>
```

```javascript
window.addEventListener('popstate', function(e){
  console.log('state');
});
window.addEventListener("hashchange", function(e) {
  console.log("oldURL: ", e.oldURL);
  console.log("newURL: ", e.newURL);
});

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
btn1.addEventListener('click', function(e){
  location.hash = '#part1';
})
btn2.addEventListener('click', function(e){
  location.hash = '#part2';
})
```

## 4. Location 对象

Location 对象表示`当前浏览器窗口加载的文档地址`

```javascript
定义：window.location
属性：location.href            //完整URL
     location.origin          //源(协议、主机、端口)
     location.protocol        //协议(包含:)
     location.host            //主机、端口
     location.hostname        //主机(服务器名+域名)
     location.port            //端口
     location.pathname        //URL路径
     location.search          //查询字符串(从?开始)
     location.hash            //片段识别符(从#开始)
     用户信息：
     location.username        //用户名
     location.password        //密码
     来源：
     location.ancestorOrigins //返回当前浏览器窗口加载的文档的所有祖先来源
方法：重载：
     location.reload(bool)    //无返回值,浏览器重载该文档(默认false,true:向服务器请求,false:从缓存中加载)
     重定向：
     location.assign(url)     //无返回值,浏览器重定向到新文档
     location.replace(url)    //无返回值,浏览器重定向到新文档,替换当前文档的浏览记录
```

### (1) 属性应用

#### ① location.href

location.href 是浏览器唯一允许`跨域`写入的属性，可以改写非同源的地址，location.href 改写后，浏览器会立即跳转到这个新地址

```html
<button id="btn">跳转</button>
```

```javascript
const btn = document.getElementById('btn')
btn.addEventListener('click', function handleChangeURL(){
  console.log(location.href); //'http://10.20.15.72:8080'
  location.href = 'https://wangdoc.com/javascript/bom/location.html#location-%E5%AF%B9%E8%B1%A1';
})
```

### (2) 方法应用

#### ① 重载方法

```javascript
location.reload(false); //浏览器从本地缓存重载该文档,文档视口不变
location.reload(true);  //浏览器向服务器重新请求并重载该文档,文档视口滚动到头部
```

实例

```html
<button id="btn">重载</button>
```

```javascript
const btn = document.getElementById('btn')
btn.addEventListener('click', function handleReload(){
  location.reload(); //默认从缓存中重载
})
```

#### ② 重定向方法

```javascript
//方法应用
document.location.assign('http://www.example.com');  //当前窗口立刻载入新文档
document.location.replace('http://www.example.com'); //当前窗口立刻载入新文档,在History对象中替换当前URL,故无法后退
```

实例

```html
<button id="btn1">重定向</button>
<button id="btn2">重定向(替换)</button>
```

```javascript
//先点击重定向,再点击后退按钮回到上一文档
const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', function handleAssign(e){
  location.assign("https://wangdoc.com/javascript/bom/location.html#location-%E5%AF%B9%E8%B1%A1");
})

//先点击替换,后退按钮变灰,无法点击
const btn2 = document.getElementById('btn2')
btn2.addEventListener('click', function handleReplace(e){
  location.replace("https://wangdoc.com/javascript/bom/location.html#location-%E5%AF%B9%E8%B1%A1");
})
```
