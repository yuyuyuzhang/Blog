# 其他 API

## 4. LockManager API

```javascript
定义：const locks = navigator.locks
方法：locks.query()                  //返回Promise实例,锁管理快照对象LockManagerSnapshot
     locks.request(name,options,cb) //返回Promise实例,请求指定名称name和配置options的锁

options：
mode        //exclusive:独自,shared:共享
ifAvailable //true:仅在锁可用时授予锁
steal       //true:
signal      //
```

### (1) LockManagerSnapshot 对象

```javascript
定义：const lockManagerSnapshot = await navigator.locks.query()
属性：lockManagerSnapshot.held    //返回持有锁的对象数组
     lockManagerSnapshot.pending //返回请求锁的对象数组
```

实例：查询锁

```javascript
const f = async () => {
  await navigator.locks.request('my_resource', {mode: 'shared'}, async lock => {
    const locks = await navigator.locks.query()
    console.log(locks)
  })
}
f()
```

![查询锁]()

### (2) Lock 对象

```javascript
定义：const lock = await navigator.locks.request(name,options,cb)
属性：lock.name //返回当前锁的名称
     lock.mode //返回当前锁的模式
```

实例：请求锁

```javascript
const read = async () => {
  await navigator.locks.request('my_resource', {mode: 'shared'}, async lock => console.log(lock))
}
const write = async () => {
  await navigator.locks.request('my_resource', {mode: 'exclusive'}, async lock => console.log(lock))
}
```

## 5. Web Serial API

```javascript
定义：const serial = navigator.serial
方法：serial.getProts()    //返回Promise实例,连接到主机且有权访问的串行端口
     serial.requestPort() //返回Promise实例,


事件：
connect
disconnect
```

## 6. NetworkInformation API

```javascript
定义：const connection = navigator.connection
属性：connection.downlink      //
     connection.rtt           //
     connection.effectiveType //
     connection.saveData      //


事件：
change //
```

## 7. Scheduling API

```javascript
定义：const scheduling = navigator.scheduling
方法：scheduling.isInputPending() //
```

## 8. UserActivation API

```javascript
定义：const userActivation = navigator.userActivation
属性：userActivation.hasBeenActive //
     userActivation.isActive      //
```

## 9. HID API

```javascript
定义：const hid = navigator.hid
方法：hid.getDevices()    //
     hid.requestDevice() //


事件：
connect    //
disconnect //
```

## 11. CredentialsContainer API

```javascript
定义：const credentials = navigator.credentials
方法：credentials.create()              //
     credentials.get()                 //
     credentials.store()               //
     credentials.preventSilentAccess() //
```

## 12. Presentation API

```javascript
定义：const presentation = navigator.presentation
属性：presentation.defaultRequest //
     presentation.receiver       //
```

## 14. XRSystem API

```javascript
定义：const xr = navigator.xr
方法：xr.isSessionSupported() //
     xr.requestSession()     //
     xr.supportsSession()    //


事件：
devicechange //
```

## 15. DeprecatedStorageQuota API

```javascript
定义：const persistentStorage = navigator.webkitPersistentStorage
     const temporaryStorage = navigator.webkitTemporaryStorage
方法：persistentStorage/temporaryStorage.requestQuota()      //
     persistentStorage/temporaryStorage.queryUsageAndQuota() //
```

## 16. Crypto API

Crypto API 用于网页访问某些加密服务

```javascript
定义：const crypto = window.crypto
属性：crypto.subtle
方法：crypto.getRandomValues()
```

## 17. Performance API

Performance API 用于前端性能监控

```javascript
定义：const performance = window.performance
属性：performance.eventCounts
     performance.memory
     performance.navigation
     performance.timeOrigin
     performance.timing
     performance.
方法：performance.clearMarks()
     performance.clearMeasures()
     performance.clearResourceTimings()
     performance.getEntries()
     performance.getEntriesByName()
     performance.getEntriesByType()
     performance.mark()
     performance.measure()
     performance.measureUserAgentSpecificMemory()
     performance.now()
     performance.setResourceTimingBufferSize()
     performance.toJSON()


事件：
resourcetimingbufferfull //
```
