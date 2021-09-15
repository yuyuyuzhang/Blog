# 八、Node 网络系统

## 1. url 模块

### (1) url 模块

url 模块用于`处理和解析网址`，Node 实现了浏览器使用的 `WHATWG 网址标准`的新版 API

![url]()

WHATWG 网址标准的`特殊协议方案`有如下 6 种，WHATWG 网址标准认为特殊协议在解析和序列化方面具有特殊性，不能通过 url.protocol 属性将特殊协议更改为非特殊协议，或将非特殊协议更改为特殊协议，6 种特殊协议的默认端口如下

|协议|端口|
|:---|:--|
|http|80|
|https|443|
|ws|80|
|wss|443|
|file||
|ftp|21|

### (2) URL 类

```js
定义：import { URL } from 'url'
     const url = new URL(input,[base])
属性：url.href                    //返回/设置完整 URL
     url.origin                  //返回源(协议、主机、端口)
     url.protocol                //返回/设置协议(包含:)
     url.username                //返回/设置用户名
     url.password                //返回/设置密码
     url.host                    //返回/设置主机、端口
     url.hostname                //返回/设置主机
     url.port                    //返回/设置端口
     url.pathname                //返回/设置 URL 路径
     url.search                  //返回/设置查询字符串(从?开始)
     url.searchParams            //返回 URLSearchParams 对象
     url.hash                    //返回/设置片段识别符(从#开始)
方法：静态方法：
     URL.createObjectURL(blob)   //返回一个URL字符串,为上传/下载的文件、流媒体文件生成一个URL字符串,给File对象、Blob对象使用
     URL.revokeObjectURL(id)     //无返回值,释放浏览器内存中由URL.createObjectURL()方法生成的URL实例
     实例方法：
     url.urlToHttpOptions(url)   //返回指定 url 字符串序列化后的 WHATWG 网址对象
     url.format(URL,[options])   //返回指定 WHATWG 网址对象解析后的 url 字符串
     url.fileURLToPath(url)      //返回指定文件路径 url 的特定于平台的 Node 文件绝对路径
     url.pathToFileURL(path)     //返回指定
     url.domainToASCII(domain)   //返回指定域名的 ASCII 序列化
     url.domainToUnicode(domain) //返回指定域名的 Unicode 序列化 
```

#### ① URL 对象属性

```js
import { URL } from 'url'

const url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1')
console.log(url)
// URL {
//   href: 'http://user:passwd@www.example.com:4097/path/a.html?x=111#part1',
//   origin: 'http://www.example.com:4097',
//   protocol: 'http:',
//   username: 'user',
//   password: 'passwd',
//   host: 'www.example.com:4097',
//   hostname: 'www.example.com',
//   port: '4097',
//   pathname: '/path/a.html',
//   search: '?x=111',
//   searchParams: URLSearchParams { 'x' => '111' },
//   hash: '#part1'
// }
```

#### ② URL 对象静态方法

```js
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

#### ③ URL 对象实例方法

```js
import { urlToHttpOptions } from 'url'

const url = new URL('http://user:passwd@www.example.com:4097/path/a.html?x=111#part1')
const urlObj = urlToHttpOptions(url)
console.log(urlObj)
// {
//   protocol: 'http:',
//   hostname: 'www.example.com',
//   hash: '#part1',
//   search: '?x=111',
//   pathname: '/path/a.html',
//   path: '/path/a.html?x=111',
//   href: 'http://user:passwd@www.example.com:4097/path/a.html?x=111#part1',
//   port: 4097,
//   auth: 'user:passwd'
// }
```

### (3) URLSearchParams 类

URLSearchParams 类表示 `URL 的查询字符串`，用来构造、解析、处理 URL 的查询字符串

查询字符串就是 `URL 参数`，添加在 URL 末尾的用于向服务器发送信息的字符串（键值对），常用于`显示动态页面结果`，例如购物页面，添加了活动参数，就可以按照大小过滤产品

```js
定义：import { URLSearchParams } from 'url'
     const searchParams = url.searchParams
     const searchParams = new URLSearchParams()
     const searchParams = new URLSearchParams(searchParamsStr)
     const searchParams = new URLSearchParams(searchParamsObj)
     const searchParams = new URLSearchParams(iterable)
方法：searchParams.toString()        //返回searchParams的字符串形式
     操作方法：
     searchParams.has(key)          //返回布尔值,是否包含指定键名的键值对
     searchParams.get(key)          //返回指定键名的第一个键值
     searchParams.getAll(key)       //返回指定键名的所有键值构成的数组
     searchParams.set(key,value)    //无返回值,设置指定键名的键值
     searchParams.append(key,value) //无返回值,追加指定键名的键值(允许重复)
     searchParams.delete(key)       //无返回值,删除指定键名的键值对
     排序方法：
     searchParams.sort()            //无返回值,按照Unicode码点从小到大对键名排序
     遍历方法：
     searchParams.keys()            //返回键名的遍历器
     searchParams.values()          //返回键值的遍历器
     searchParams.entries()         //返回键值对的遍历器
```

实例

```js
let urlSearch = new URLSearchParams({'f2': 2, 'f1': 1})

urlSearch.append('f2', 3);
console.log(urlSearch.toString());   //"f2=2&f1=1&f2=3"
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

## 2. 

①②③④⑤⑥⑦⑧⑨⑩
