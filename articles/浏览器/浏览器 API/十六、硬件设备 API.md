# 十六、硬件设备 API

## 1. WakeLock API

### (1) WakeLock API

WakeLock API 用于`屏幕唤醒`

```js
定义：const wakeLock = navigator.wakeLock
方法：wakeLock.request(type) //返回 Promise 实例,指定类型的唤醒锁对象 wakeLockSentinel
```

### (2) WakeLockSentinel 对象

WakeLockSentinel 对象表示`唤醒锁`，目前只针对`屏幕`

```js
定义：const wakeLockSentinel = await navigator.wakeLock.request()
属性：wakeLockSentinel.type      //返回当前唤醒锁类型,目前一直为屏幕 screen
     wakeLockSentinel.released  //返回当前唤醒锁是否释放
方法：wakeLockSentinel.release() //释放当前唤醒锁


事件：
wakeLockSreen.onrelease //当前唤醒锁释放时触发
```

### (3) 实例

```js
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

## 2. Keybord API

### (1) Keybord API

Keybord API 用于`检索键盘布局图和切换物理键盘按键捕获`

```js
定义：const keyboard = navigator.keyboard
方法：keyboard.getLayoutMap() //返回 Promise 实例,键盘布局图对象 keyboardLayoutMap
     keyboard.lock(keys)     //返回 Promise 实例,锁住指定按键
     keyboard.unlock()       //返回 Promise 实例,解锁 keyboard.unlock() 锁住的所有按键
```

### (2) keyboardLayoutMap 对象

keyboardLayoutMap 对象表示`键盘布局图`

* **e.code**：返回当前按下键的`键名`
* **e.key** ：返回当前按下键的`键值`
* **e.keyCode**：返回当前按下键的`键码（字符键：键码 = 字符编码）`

```js
定义：const keyboardLayoutMap = await navigator.keyboard.getLayoutMap()
属性：keyboardLayoutMap.size        //返回当前键盘布局图的键个数
方法：keyboardLayoutMap.has(code)   //返回当前键盘布局图是否包含指定键名
     keyboardLayoutMap.get(code)   //返回当前键盘布局图指定键名
     keyboardLayoutMap.keys()      //返回当前键盘布局图键名的遍历器
     keyboardLayoutMap.values()    //返回当前键盘布局图键值的遍历器
     keyboardLayoutMap.entries()   //返回当前键盘布局图键值对的遍历器
     keyboardLayoutMap.forEach(cb) //无返回值,类同数组的 forEach
```

### (3) 实例：检索键盘布局图

```js
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

![Keyboard](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/Keyboard.png)

## 3. Battery API

### (1) BatteryManager 对象

BatteryManager 对象表示`电池`

```js
定义：const batteryManager = await navigator.getBattery()
属性：batteryManager.level           //返回电量等级(0.0-1.0)
     batteryManager.charging        //返回电池是否正在充电
     batteryManager.chargingTime    //返回电池距离充电完毕还剩多少秒
     batteryManager.dischargingTime //返回电池距离耗电至空还需多少秒


事件：
batteryManager.onlevelchange           //电池电量改变时触发
batteryManager.onchargingchange        //电池充电状态改变时触发
batteryManager.onchargingtimechange    //电池充电时间改变时触发
batteryManager.ondischargingtimechange //电池耗电时间改变时触发
```

### (2) 实例

```js
const f = async () => {
  const batteryManager = await navigator.getBattery()
  console.log(batteryManager)

  // 拔掉充电器测试
  batteryManager.addEventListener('chargingchange', e => {
    console.log('chargingchange')
  })
}
f()
```

先拔掉充电器，再插上充电器

![battery](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/battery.gif)

## 4. Print API

### (1) 打印事件

```js
window.onbeforeprint //打印机就绪时,在 window 对象上触发
window.onafterprint  //打印机关闭时,在 window 对象上触发
```

### (2) 实例

`Ctrl + p` 快捷键以预览打印

```js
window.addEventListener('beforeprint', e => {
  console.log('beforeprint:', e)
})
window.addEventListener('afterprint', e => {
  console.log('afterprint:', e)
})
```

![print](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/print.gif)

## 5. Bluetooth API

### (1) Bluetooth API

Bluetooth API 用于`连接蓝牙设备并与之交互`

* Bluetooth API 只支持基于 `https` 的页面
* 通过用户操作触发：需要确保这个 API 不会在用户未知的情况下偷偷在后台运行，也不希望用户什么都没有做站点就直接弹出一个提示吓到用户，于是只有当用户作出了类似 click 的操作，这个方法才会被调用

```js
定义：const bluetooth = navigator.bluetooth
方法：bluetooth.getAvailability()                                          //返回 Promise 实例,当前设备是否支持蓝牙
     bluetooth.requestDevice({filters,optionalServices,acceptAllDevices}) //返回 Promise 实例,寻找所有符合条件的远程蓝牙设备,返回用户选择配对的某个远程蓝牙设备
```

### (2) BluetoothDevice 对象

BluetoothDevice 对象表示`蓝牙设备`

```js
定义：const bluetoothDevice = await navigator.bluetooth.requestDevice()
属性：bluetoothDevice.id   //返回当前远程蓝牙设备的 id
     bluetoothDevice.name //返回当前远程蓝牙设备的名称
     bluetoothDevice.gatt //返回当前远程蓝牙设备的 BluetoothRemoteGATTServer 实例


事件：
bluetoothDevice.ongattserverdisconnected //当前远程蓝牙设备断开连接时触发
```

### (3) BluetoothRemoteGATTServer 对象

BluetoothRemoteGATTServer 对象表示`远程蓝牙设备的 GATT 服务器，也就是蓝牙 API 的接口`

```js
定义：const bluetoothRemoteGATTServer = await navigator.bluetooth.requestDevice().gatt
属性：bluetoothRemoteGATTServer.device    //返回远程蓝牙设备的 BluetoothDevice 实例
     bluetoothRemoteGATTServer.connected //返回远程蓝牙设备是否配对连接成功
```

### (4) 实例

```html
<button id="btn">点击</button>
```

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', async () => {
  const isBluetooth = await navigator.bluetooth.getAvailability()
  if(isBluetooth){
    const bluetoothDevice = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    console.log(bluetoothDevice)

    bluetoothDevice.addEventListener('gattserverdisconnected', () => {
      console.log('disconnected')
    })
  }
})
```

![bluetooth](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/bluetooth.gif)

## 6. USB API

### (1) USB API

USB API 用于 `USB`

```js
定义：const usb = navigator.usb
方法：usb.requestDevice({filters}]) //返回 Promise 实例,寻找所有符合条件的 USB 设备,返回用户选择配对的某个 USB 设备
     usb.getDevices()              //返回 Promise 实例,返回已连接的 USB 设备数组


filters：
vendorId     //官方供应商 ID
productId    //制造商定义的产品 ID
serialNumber //制造商定义的序列号


事件：
navigator.usb.onconnect    //配对 USB 设备连接时触发
navigator.usb.ondisconnect //配对 USB 设备断开连接时触发
```

### (2) USBDevice 对象

USBDevice 对象表示 `USB 设备`

```js
定义：const usbDevices = await navigator.usb.getDevices()
     const usbDevice = usbDevices[index]
     const usbDevice = await navigator.usb.requestDevice({filters}])
属性：usbDevice.opened                     //返回布尔值,是否已启用配对的 USB 设备
     usbDevice.vendorId                   //官方供应商 ID
     usbDevice.manufacturerName           //制造商名称
     usbDevice.productId                  //制造商定义的产品 ID
     usbDevice.productName                //制造商定义的产品名称
     usbDevice.serialNumber               //制造商定义的序列号
     usbDevice.deviceClass                //
     usbDevice.deviceSubclass             //
     usbDevice.deviceProtocol             //
     usbDevice.configuration              //
     usbDevice.configurations             //
     usbDevice.deviceVersionMajor         //主要版本号
     usbDevice.deviceVersionMinor         //次要版本号
     usbDevice.deviceVersionSubminor      //补丁版本号
     usbDevice.usbVersionMajor            //主要版本号
     usbDevice.usbVersionMinor            //次要版本号
     usbDevice.usbVersionSubminor         //补丁版本号
方法：usbDevice.open()                     //返回 Promise实例,
     usbDevice.reset()                    //返回 Promise 实例,
     usbDevice.close()                    //返回 Promise 实例,
     usbDevice.releaseInterface()         //返回 Promise 实例,
     usbDevice.claimInterface()           //返回 Promise 实例,
     usbDevice.selectAlternateInterface() //返回 Promise 实例,
     usbDevice.selectConfiguration()      //返回 Promise 实例,
     usbDevice.clearHalt()                //返回 Promise 实例,清除暂停条件
     usbDevice.transferIn()               //返回 Promise 实例,从 USB 设备发送数据后
     usbDevice.transferOut()              //返回 Promise 实例,数据发送到 USB 设备后
     usbDevice.controlTransferIn()        //返回 Promise 实例,命令传输到 USB 设备后
     usbDevice.controlTransferOut()       //返回 Promise 实例,从 USB 设备发送命令后
     usbDevice.isochronousTransferIn()    //返回 Promise 实例,时间敏感信息传输到 USB 设备后
     usbDevice.isochronousTransferOut()   //返回 Promise 实例,从 USB 设备发送时间敏感信息后
```

### (3) 实例

```html
<button id="btn1">查询 USB 设备</button>

<button id="btn2">显示已连接的 USB 设备</button>
```

```js
navigator.usb.addEventListener('connect', () => {
    console.log('connect')
})
navigator.usb.addEventListener('disconnect', () => {
    console.log('disconnect')
})

const btn1 = document.getElementById('btn1')
btn1.addEventListener('click', async () => {
    const usbDevice = await navigator.usb.requestDevice({
        filters: []
    })
    console.log(usbDevice)
})

const btn2 = document.getElementById('btn2')
btn2.addEventListener('click', async () => {
    navigator.usb.getDevices()
        .then(devices => {
            console.log("Total devices: " + devices.length);
            devices.forEach(device => {
                console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
            });
        });
})
```

![usb](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/usb.gif)
