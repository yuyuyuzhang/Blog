# 一、Permissions API

## 1. Permissions API

navigator.permissions 属性返回 Permissions API，用于`查询用户对于指定浏览器 API 的权限`

```javascript
定义：const permissions = navigator.permissions
方法：permissions.query({name: API}) //返回Promise实例,请求指定浏览器API的用户权限状态
```

当前 Permissions API 能够查询用户权限的浏览器 API 如下：

* Notification API
* Clipboard API
* Geolocation API
* Web MIDI API

## 2. PermissionStatus 对象

```javascript
定义：const permissionStatus = await navigator.permissions.query({name: API})
属性：permissionStatus.state //返回用户权限状态


granted //不提示用户的情况下成功
prompt  //提示用户由用户决定权限
denied  //不提示用户的情况下失败


事件：
change //用户权限状态改变时触发
```

## 3. 实例

```javascript
const f = async () => {
  const permissionStatus = await navigator.permissions.query({name: 'geolocation'})
  console.log(permissionStatus.state)

  permissionStatus.addEventListener('change', e => {
    console.log(e)
  })
}
f()
```
