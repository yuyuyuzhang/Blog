# 二、Cache

## 1. CacheStorage API

### (1) CacheStorage API

window.caches 属性返回 CacheStorage API，用于操作缓存

```javascript
定义：const caches = window.caches
方法：caches.open(cacheName)   //返回Promise实例,返回并创建指定名称的Cache对象,已创建就直接返回
     caches.has(cacheName)    //返回Promise实例,是否存在指定名称的Cache对象
     caches.delete(cacheName) //返回Promise实例,是否成功删除指定名称的Cache对象
     caches.keys(cacheName)   //返回Promise实例,所有Cache对象的名称数组
     caches.match(url)        //返回Promise实例,匹配所有Cache对象存储的指定url的response响应
```

### (2) 实例：操作 CacheStorage API

```javascript
const f = async () => {
  //创建多个 Cache 对象
  const cacheNames = ['cache1', 'cache2', 'cache3']
  await Promise.all(cacheNames.map(cacheName => window.caches.open(cacheName)))

  console.log(await window.caches.delete('cache1')) //true
  console.log(await window.caches.has('cache1'))    //false
  console.log(await window.caches.keys())           //Array ['cache1', 'cache3']

  console.log(await window.caches.match('./cat.jpg')) //undefined
  const cache1 = await window.caches.open('cache1')
  await cache1.add('./cat.jpg')
  console.log(await window.caches.match('./cat.jpg')) //Response
}
f()
```

## 2. Cache 对象

### (1) Cache 对象属性和方法

```javascript
定义：const cache = await window.caches.open(cacheName)
方法：cache.add(url)          //返回Promise实例,请求url并将返回的200 response响应添加到cache
     cache.addAll([url,...]) //返回Promise实例,请求url数组并将返回的所有200 response响应添加到cache
     cache.put(url,response) //返回Promise实例,请求url并将返回的任意response响应添加到cache
     cache.delete(url)       //返回Promise实例,是否成功删除cache存储的指定url的response响应
     cache.keys(url)         //返回Promise实例,匹配cache存储的指定url的request请求,url为空则匹配所有
     cache.match(url)        //返回Promise实例,匹配cache存储的指定url的response响应
     cache.macthAll()        //返回Promise实例,匹配cache存储的所有url的response响应
```

* **cache.add/addAll(request)**：只缓存 `200` 响应，不可用于不透明的响应
* **cache.put(request,response)**：缓存`任意`响应，可用于不透明的响应

  ```javascript
  //add/addAll 等同于以下代码
  fetch(url).then(res => {
     if(res.status === 200){
       return cache.put(url, response)
     }
     throw new Error('Bad response status')
  })
  ```

### (2) 实例：操作 Cache 对象

```javascript
const f = async () => {
  const cache1 = await window.caches.open('cache1')
  console.log(await cache1.addAll(['./cat.jpg', './movie.mp4'])) //undefined
  console.log(await cache1.keys('./cat.jpg'))   //[Request]
  console.log(await cache1.keys())              //[Request, Request]
  console.log(await cache1.match('./cat.jpg'))  //Response
  console.log(await cache1.matchAll())          //[Response, Response]
  console.log(await cache1.delete('./cat.jpg')) //true
}
f()
```

![Cache]()
