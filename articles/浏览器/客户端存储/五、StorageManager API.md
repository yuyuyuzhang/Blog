# 五、StorageManager API

## 1. StorageManager API

客户端存储方式有如下几种

* Cookie
* Cache
* Web Storage
* IndexedDB

为了统一和规范这些客户端存储方式的操作 API，引入了 StorageManager API，navigator.storage 属性返回 StorageManager 对象，用于访问`当前网站或应用程序的浏览器整体存储功能`，通过 StorageManager 对象可以`查看存储空间的限额和使用情况，甚至可以控制在清除用户数据的时候是否提醒用户`

* StorageManager API 只适用于 `HTTPS` 协议

## 2. storage units（box）

为了对不同`源（协议、域名、端口）`的数据进行管理，引入了 storage units（box）的概念，每个源都有一个 storage units（box）

如下图所示有 3 个源

* **Origin1**：既有 Web Storagge，又有 IndexedDB，因为并没有达到 storage units（box）的最大值，所以还留有一定的空余空间 free
* **Origin2**：还没有开始存储任何数据，所有都是空余空间 free
* **Origin3**：被 IndexexDB 占满了，没有任何空余空间 free

![storage units（box）](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/storage%20units%EF%BC%88box%EF%BC%89.png)

### (1) best-effort box

浏览器会`尽最大努力保留数据`，当存储空间用完，清理 best-effort box 时浏览器并不会提醒用户

* Cookie
* Cache
* SessionStorage

### (2) persistent box

浏览器会`尽可能长时间保留数据`，如果同时存在两种模式，当存储空间用完，将会首先清除 best-effort box，如果一定要清除 persistent box，浏览器会通知用户

* LocalStorage
* IndexedDB

## 3. StorageManager 对象

```javascript
定义：const storage = navigator.storage
方法：storage.estimate()  //返回Promise实例,StorageEstimate对象表示存储空间的限额和使用情况
     storage.persist()   //返回Promise实例,请求当前网站的模式(true:persistent box,false:best-effort box)
     storage.persisted() //返回Promise实例,请求使用当前网站persistent box的权限(true:用户已授权,false:用户未授权或best-effort box)
```

### (1) 查看存储空间限额和使用情况

```javascript
const f = async (spaceRequired) => {
  const storageInfo = await navigator.storage.estimate()
  console.log(storageInfo) //{quote: 64424506982, usage: 0, usageDetails: {}}

  //quota：配额, usage：已使用, usageDetails：使用细节
  if(storageInfo.quota - storageInfo.usage >= spaceRequired){
    console.log('存储空间足够')
  } else{
    console.log('存储空间不足')
  }
}
f()
```

### (2) 请求使用当前网站 persistent box 的权限

需要在 https 环境下测试

```javascript
const f = async (spaceRequired) => {
  Promise.all([
    navigator.storage.persist(),
    navigator.permissions.query({name: 'persistent-storage'})
  ]).then(([persistent, permission]) => {
    if(!persistent){
      console.log('best-effort box')
    } else if(permission.state === 'granted'){
      console.log('persistent box and you can use it')
    } else if(permission.state === 'prompt'){
      navigator.storage.persisted().then(persistentAndUse => {
        persistentAndUse ? 
        console.log('persistent but you can use it') : 
        console.log('persistent but you can not use it')
      })
    } else if(permission.state === 'denied') {
      console.log('persistent and you can not use it')
    }
  })
}
f()
```
