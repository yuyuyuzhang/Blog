# 一、硬件设备 API

## 1. WakeLock API

WakeLock API 用于`屏幕唤醒`

```javascript
定义：const wakeLock = navigator.wakeLock
方法：wakeLock.request(type) //返回Promise实例,指定类型的唤醒锁对象wakeLockSentinel
```

### (1) WakeLockSentinel 对象

WakeLockSentinel 对象表示`唤醒锁`，目前只针对`屏幕`

```javascript
定义：const wakeLockSentinel = await navigator.wakeLock.request()
属性：wakeLockSentinel.type      //返回当前唤醒锁类型,目前一直为屏幕screen
     wakeLockSentinel.released  //返回当前唤醒锁是否释放
方法：wakeLockSentinel.release() //释放当前唤醒锁


事件：
release //当前唤醒锁释放时触发
```

### (2) 实例

```javascript
const f = async () => {
  const wakeLockSreen = await navigator.wakeLock.request('screen')
  wakeLockSreen.addEventListener('release', e => {
    console.log('已释放唤醒锁')
  })

  //1s 后释放唤醒锁
  setTimeout(() => {
    wakeLockSreen.release()
  }, 1000);
}
f()
```

## 1. Keybord API

Keybord API 用于`检索键盘布局图和切换物理键盘按键捕获`

```javascript
定义：const keyboard = navigator.keyboard
方法：keyboard.getLayoutMap() //返回Promise实例,键盘布局图对象 keyboardLayoutMap
     keyboard.lock(keys)     //返回Promise实例,
     keyboard.unlock()       //返回Promise实例,
```

### (1) keyboardLayoutMap 对象

keyboardLayoutMap 对象表示`键盘布局图`

* **e.code**：返回当前按下键的`键名`
* **e.key** ：返回当前按下键的`键值`
* **e.keyCode**：返回当前按下键的`键码（字符键：键码=字符编码）`

```javascript
定义：const keyboardLayoutMap = await navigator.keyboard.getLayoutMap()
属性：keyboardLayoutMap.size        //返回
方法：keyboardLayoutMap.has(code)   //返回布尔值,当前键盘布局图是否有指定键名code
     keyboardLayoutMap.get(code)   //返回当前键盘布局图指定键名code
     keyboardLayoutMap.keys()      //返回键名code的遍历器
     keyboardLayoutMap.values()    //返回键值key的遍历器
     keyboardLayoutMap.entries()   //返回键名code-键值key的遍历器
     keyboardLayoutMap.forEach(cb) //无返回值,类同数组的forEach
```

### (2) 实例：检索键盘布局图

```javascript
const f = async () => {
  const keyboardLayoutMap = await navigator.keyboard.getLayoutMap()

  console.log(keyboardLayoutMap.has('KeyA')) //true
  console.log(keyboardLayoutMap.get('KeyB')) //'b'
 
  //遍历键值对
  for(let item of keyboardLayoutMap.keys()){
    console.log(item) //['KeyA', 'a'], ...
  }
}
f()
```

### (3) 实例：切换物理键盘按键捕获

```javascript

```

## 2. Bluetooth API

Bluetooth API 用于`连接蓝牙设备并与之交互`

* Bluetooth API 只支持基于 `https` 的页面
* 通过用户操作触发：需要确保这个 API 不会在用户未知的情况下偷偷在后台运行，也不希望用户什么都没有做站点就直接弹出一个提示吓到用户，于是只有当用户作出了类似 click 的操作，这个方法才会被调用

```javascript
定义：const bluetooth = navigator.bluetooth
方法：bluetooth.getAvailability()                               //返回Promise实例,当前设备是否支持蓝牙
     bluetooth.requestDevice({filters,optionalServices,acceptAllDevices}) //返回Promise实例,请求指定的蓝牙设备
```

### (1) BluetoothDevice 对象

BluetoothDevice 对象表示`蓝牙设备`

```javascript
定义：const bluttoothDevice = await navigator.bluetooth.requestDevice()
属性：bluttoothDevice.id   //返回当前蓝牙设备的id
     bluttoothDevice.name //返回当前蓝牙设备的名称
     bluttoothDevice.gatt //返回当前蓝牙设备的


事件：
gattserverdisconnected //
```

### (2) BluetoothRemoteGATTServer 对象

```javascript
定义：
属性：
方法：
```

### (2) 实例

```javascript
const f = async () => {
  const isBluetooth = await navigator.bluetooth.getAvailability()
  if(isBluetooth){
    const bluetoothDevices = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    console.log(bluetoothDevices)
  }
}
const btn = document.getElementById('btn')
btn.addEventListener('click', f)
```

![Bluetooth API]()

## 3. USB API

USB API 用于 `USB`

```javascript
定义：const usb = navigator.usb
方法：usb.getDevices()    //返回Promise实例,已连接的配对USB设备数组
     usb.requestDevice([filters]) //返回Promise实例,请求指定的USB


filters：
vendorId     //
productId    //
classCode    //
subclassCode //
protocolCode //
serialNumber //


事件：
connect    //配对USB设备连接时触发
disconnect //配对USB设备断开连接时触发
```

### (1) USBDevice 对象

USBDevice 对象表示 `USB 设备`

```javascript
定义：const usbDevices = await navigator.usb.getDevices()
     const usbDevice = usbDevices[index]
属性：usbDevice.
     usbDevice.
方法：usbDevice.
     usbDevice.
```

## 4. Battery API

### (1) BatteryManager 对象

BatteryManager 对象表示`电池`

```javascript
定义：const batteryManager = await navigator.getBattery()
属性：batteryManager.level           //返回电量等级(0.0-1.0)
     batteryManager.charging        //返回电池是否正在充电
     batteryManager.chargingTime    //返回电池距离充电完毕还剩多少秒
     batteryManager.dischargingTime //返回电池距离耗电至空还需多少秒
     

事件：
levelchange           //电池电量改变时触发
chargingchange        //电池充电状态改变时触发
chargingtimechange    //电池充电时间改变时触发
dischargingtimechange //电池耗电时间改变时触发
```

### (2) 实例

```javascript
const f = async () => {
  const battery = await navigator.getBattery()
  console.log(battery)

  //拔掉充电器测试
  battery.addEventListener('chargingchange', e => {
    console.log('chargingchange')
  })
}
f()
```
