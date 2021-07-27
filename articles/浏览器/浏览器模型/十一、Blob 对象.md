# 十一、Blob 对象

## 1. Blob 对象

ArrayBuffer 对象用来`操作内存`，Blob 对象用来`操作二进制文件`

* ArrayBuffer 对象表示`存储二进制数据的一段连续内存`，不能直接读写，只能通过 `TypedArray/DataView 视图`读写
* Blob 对象表示`一个二进制文件的数据内容`，常用来读写文件

## 2. Blob 构造函数

* 第一个参数（必需）：数组，数组成员可以是`字符串`或者 `ArrayBuffer 实例`
* 第二个参数（可选）：配置对象，type 属性为数据的 `MIME 类型`（默认`空字符串`）

```js
定义：const blob = new Blob(array, {type: MIME})
属性：blob.size             //返回blob的字节大小
     blob.type             //返回blob的MIME类型
方法：blob.sice(n1,n2,MIME) //返回新Blob实例,拷贝字节索引n1到字节索引n2前一项字节
```

```js
//分配一段 100 字节的连续内存
const buf = new ArrayBuffer(100);

const blob = new Blob([buf])
const copyBlob = blob.slice(20, 30)

console.log(blob.size) //100
console.log(blob.type) //''
console.log(blob)      //Blob {size: 100, type: ''}
console.log(copyBlob)  //Blob {size: 10, type: ''}
```

## 3. Blob URL

浏览器允许通过 `window.URL.createObjectURL()` 方法，针对 Blob 对象生成一个临时 URL 以便于某些 API 使用，这个 URL 以`blob://` 开头表明对应一个 Blob 对象

```js
function download(){
    downloadFile(fileId).then(res => {
        const blob = new Blob([res])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) //下载完移除元素
        window.URL.revokeObjectURL(url) //释放 blob 对象
    })
}
```
