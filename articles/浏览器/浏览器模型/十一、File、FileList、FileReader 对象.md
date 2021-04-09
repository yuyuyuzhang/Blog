# 十一、File、FileList、FileReader 对象

## 1. File 对象

### (1) File 对象

File 对象表示`一个文件`，用来读写文件信息

File 对象`继承了 Blob 对象`，所有可以使用 Blob 对象的场合都可以使用 File 对象

* 第一个参数（必需）：数组，数组成员可以是`字符串`或者 `ArrayBuffer 实例`
* 第二个参数（必需）：字符串，文件名或文件路径
* 第三个参数（可选）：配置对象，type 属性为文件的 `MIME 类型`（默认`空字符串`），lastModified 属性为文件的`最后修改时间`

```javascript
定义：const file = new File(array,name,{type:MIME,lastModified:Date})
属性：file.size              //返回file的字节大小
     file.type              //返回file的MIME类型
     file.name              //返回file的文件名或文件路径
     file.lastModified      //返回file的最后修改时间
方法：file.slice(n1,n2,MIME) //返回新File实例,拷贝字节索引n1到字节索引n2前一项字节
```

## 2. FileList 对象

### (1) FileList 对象

FileList 对象表示`一组文件`，是一个`类数组对象`，每个成员都是一个 File 实例

* 文件上传功能的文件控件节点 `<input type="file">` 的 files 属性
* 拖动一组文件时目标区的 DataTransfer.files 属性

### (2) 文件上传

使用 e.target.files 获取上传的文件列表，`change` 事件监听文件上传

```html
<input id="file" type="file">
```

```javascript
const fileBtn = document.getElementById('fileBtn')
fileBtn.addEventListener('change', function(e){
  const files = e.target.files
  console.log(files)
})
```

![文件上传](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.png)

### (3) 文件拖动

使用 e.dataTransfer.files 获取拖动的文件列表

```html
<div id="target" style="width:200px;height:200px;border:1px solid red;"></div>
```

```javascript
const target = document.getElementById("target");      
target.addEventListener("dragenter", function(e) {        
  e.preventDefault(); //目标节点默认不允许放下拖动节点,阻止默认行为        
  e.dataTransfer.dropEffect = "copy"; //拖动节点允许的放置效果      
});      
target.addEventListener("dragover", function(e) {        
  e.preventDefault(); //目标节点默认不允许放下拖动节点,阻止默认行为        
  e.dataTransfer.dropEffect = "copy"; //拖动节点允许的放置效果      
});      
target.addEventListener("drop", function(e) {        
  e.preventDefault(); //浏览器默认打开文件,阻止默认行为

  //显示文件名
  const files = e.dataTransfer.files;        
  e.target.innerHTML = files[0].name;
  
  //读取第一个文件
  const reader = new FileReader()
  reader.addEventListener('load', function(e){
    console.log(e.target.result)
  })
  reader.readAsDataURL(files[0])
});
```

## 3. FileReader 对象

### (1) FileReader 对象

FileReader 对象表示`文件读取器`，用于读取 `File 对象`或者 `Blob 对象`的文件内容

```javascript
定义：const fr = new FileReader()
属性：fr.error                    //返回读取文件时产生的错误对象
     fr.readyState               //返回读取文件时的当前状态(0:尚未加载,1:正在加载,2:加载完成)
     fr.result                   //返回读取完成后的文件内容
方法：fr.abort(file)              //无返回值,终止读取操作
     fr.readAsBinaryString(file) //读取完成后返回原始二进制字符串
     fr.readAsArrayBuffer(file)  //读取完成后返回ArrayBuffer实例
     fr.readAsText(file)         //读取完成后返回文本字符串
     fr.readAsDataURL(file)      //读取完成后返回DataURL格式字符串(base64编码)
```

### (2) FileReader 事件

```javascript
loadstart //读取操作开始时触发
progress  //读取操作进行中时触发
loadend   //读取操作结束时触发
load      //读取操作成功完成时触发
error     //读取操作发生错误时触发
abort     //用户终止读取操作时触发
```

### (3) 读取上传文件内容

```html
<input id="file" type="file">
```

```javascript
const fileBtn = document.getElementById('fileBtn')
fileBtn.addEventListener('change', function(e){
  const files = e.target.files
  console.log(files)

  //读取文件内容
  const reader = new FileReader()
  reader.addEventListener('load', function(e){
    console.log(e.target.result)
  })
  // reader.readAsBinaryString(files[0])
  // reader.readAsArrayBuffer(files[0])
  reader.readAsText(files[0])
  // reader.readAsDataURL(files[0])
})
```

![readAsBinaryString](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/readAsBinaryString.png)

![readAsArrayBuffer](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/readAsArrayBuffer.png)

![readAsText](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/readAsText.png)

![readAsDataURL](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/readAsDataURL.png)
