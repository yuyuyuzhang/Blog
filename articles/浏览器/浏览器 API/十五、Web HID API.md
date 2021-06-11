# 十五、Web HID API

## 1. Web HID API

人体学接口设备（Human Interface Device，HID）是一类电脑设备，能够接受人类的输入并且输出给人类，诸如键盘、鼠标、触控屏幕和游戏控制器等都属于 HID

由于 HID 的种类很多，常因为太新、太旧或太少见，导致系统的驱动程序无法存取，尤其是缺乏对游戏手把的支持，更是常造成用户的不便，因为游戏手把输入和输出的标准化程度不高

网页平台现在已经支持许多 HID，透过实例化 HID 协定支持诸如键盘、鼠标、触控屏幕和游戏控制器等设备，但是这个支持依赖于操作系统，将操作系统 HID 驱动程序的输入转换到高级输入 API，因此只要主机 HID 驱动程序无法提供良好支持，通常网页就无法使用这些设备，而输出也有相似情况

Chrome 尝试以 WebHID API 来解决这个问题，透过 WebHID API 就可直接存取支持 HID 协定的设备，提供一种在 JS 中实例化特定设备逻辑的方法，`WebHID API 将会从 Chrome 89 开始在桌面版本默认启用`

## 2. HID 对象

```js
定义：const hid = navigator.hid
方法：hid.getDevices()    //
     hid.requestDevice() //
```

## 3. HID 事件

```js
.onconnect    //
.ondisconnect //
```
