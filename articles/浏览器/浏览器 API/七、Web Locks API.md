# 七、Web Locks API

## 1. LockManager 对象

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

## 2. LockManagerSnapshot 对象

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

## 3. Lock 对象

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
