# 六、Clipboard API

[[_TOC_]]

## 1. Clipboard API 安全限制

由于用户可能将`敏感数据`例如密码放入剪贴板，故而允许 JS 脚本任意读取剪贴板会有安全风险，因此 Clipboard API 的安全限制比较多

* Chrome 浏览器规定只有 `HTTPS` 协议页面才能使用 Clipboard API，不过开发环境 `locahost` 允许在非加密协议 HTTP 下使用 Clipboard API
* Clipboard API 权限的具体实现使用了 Permissions API，写权限 clipboard-write 自动授予 JS 脚本，读权限 clipboard-read 必须用户明确同意给予，也就是说，写入剪贴板可以脚本自动完成，读取剪贴板浏览器会弹出对话框询问用户是否同意读取

## 2. Clipboard 对象

Clipboard 对象表示`当前页面的剪贴板`，Clipboard API 是剪贴板操作方法，navigator.clipboard 属性返回 Clipboard 对象，所有操作都通过这个对象进行

Clipboard API 的所有操作都是`异步`的，返回 `Promise 实例`，不会造成页面卡顿，并且可以将任意内容放入剪贴板

```javascript
定义：const clipboard = navigator.Clipboard //返回一个 Clipboard API
方法：clipboard.readText()                  //返回Promise实例,读取剪贴板的文本数据
     clipboard.read()                      //返回Promise实例,读取剪贴板的任意类型数据,需要用户明确给予许可
     clipboard.writeText(txt)              //返回Promise实例,向剪贴板写入文本数据(覆盖而非追加)
     clipboard.write(clipboardItem)        //返回Promise实例,向剪贴板写入任意类型数据
```

## 3. ClipboardItem 对象

ClipboardItem 对象表示`一个单独的剪贴项`

ClipboardItem() 是浏览器原生提供的构造函数，用来生成 ClipboardItem 实例，参数是一个对象，键名是数据的 MIME 类型，键值是数据值，`同一个剪贴项可以有多种格式的值`

```javascript
定义：const clipboardItem = new ClipboardItem(MIME,data)
属性：clipboardItem.types          //返回clipboardItem所有可用MIME类型的数组
方法：clipboardItem.getType(MIMIE) //返回Promise实例,以指定MIME类型读取clipboardItem数据
```

Clipboard API 实例

```javascript
async function addClip(){
  const img = await fetch('https://dummyimage.com/300.png');
  const imgBlob = await img.blob()
  const clipboardItem = new ClipboardItem({
    [imgBlob.type]: imgBlob,
    'text/plain': new Blob(['小可爱'], {type: 'text/plain'})
  })
  console.log(imgBlob)

  const clipboard = navigator.clipboard
  if(typeof clipboard !== 'undefined'){
    await clipboard.write([clipboardItem])

    console.log(await clipboard.read())
  }
}
addClip()
```

![Clipboard API]()

## 4. 剪贴板事件

```javascript
剪贴板事件：
contextmenu //按下鼠标右键时触发
copy        //复制时触发
cut         //剪切时触发
paste       //粘贴时触发
```

ClipboardEvent 对象表示`剪贴板事件`，继承了 Event 对象

ClipboardData 对象表示`剪贴板数据`，继承了 DataTransfer 对象

```javascript
定义：const clip = e.clipboardData || window.clipboardData;
方法：clip.getDate("text/plain")     //返回剪贴板中指定格式的数据
     clip.setData("text/plain",str) //返回布尔值,是否成功设置剪贴板中指定格式数据
     clip.clearData()               //无返回值,清除剪贴板中的数据
```

### (1) 显示自定义菜单

需要显示自定义菜单，需要先阻止浏览器默认行为，不显示浏览器默认菜单

```html
<div id="block">右键单击显示自定义菜单</div>
<ul id="menu" style="position:absolute;background-color:#666;visibility:hidden;">
  <li><a href="http://www.baidu.com"></a>百度</li>
  <li><a href="http://www.sina.com"></a>新浪</li>
  <li><a href="http://www.qq.com"></a>腾讯</li>
</ul>
```

```javascript
const div = document.querySelector('#block');
div.addEventListener('contextmenu', function(e){
  //取消浏览器默认行为,不显示浏览器默认菜单
  e.preventDefault();

  const menu = document.querySelector('#menu');
  menu.style.top = e.clientY + 'px';
  menu.style.left = e.clientX + 'px';
  menu.style.visibility = 'visible';
});

document.addEventListener('click', function(e){
  const menu = document.querySelector('#menu');
  menu.style.left = '0px';
  menu.style.top = '0px';
  menu.style.visibility = 'hidden';
});
```

### (2) 复制时添加版权信息

监听剪贴板的 copy 事件，用户复制时向剪贴板添加版权信息，避免随意转载

```html
<input type="text" value="我是小可爱">
```

```javascript
document.addEventListener('copy', addLink);
function addLink(e){
  const text = document.getSelection().toString();
  const info = "原文出自【张钰的个人博客】";
  const clip = e.clipboardData;
  clip.setData("text/plain", text + info);

  //阻止浏览器默认行为,使setData()添加信息成功
  e.preventDefault();
}
```

### (3) 粘贴时过滤字符

确保粘贴到文本框中的文本中必须包含某些字符，或者符合某种形式

```html
<input id="text" type="text" value="我是小可爱111"/>
```

```javascript
const text = document.querySelector('#text');
text.addEventListener('paste', function(e){
  const clip = e.clipboardData || window.clipboardData;
  const text = clip.getData("text");

  //剪贴板中的数据如果不是数字则不粘贴
  if(!/^\d+$/.test(text)){
      e.preventDefault();
  }
});
```

### (4) 屏蔽剪贴板

对于受保护的文档，可以通过阻止默认行为来屏蔽剪贴板

```javascript
document.addEventListener('copy', forbidClip);
document.addEventListener('cut', forbidClip);
document.addEventListener('paste', forbidClip);
function forbidClip(e){
  e.preventDefault();
}
```
