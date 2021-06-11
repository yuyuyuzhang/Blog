# 十七、WebVR API

## 1. Gamepad API

### (1) GamepadList 对象

GamepadList 对象表示`游戏手柄数组`

```js
定义：const gamepads = navigator.getGamepads() //返回所有已连接的游戏手柄数组
属性：gamepads.length                          //返回所有已连接的游戏手柄数目
方法：gamepads.item(index)                     //返回所有已连接的游戏手柄数组中的指定索引处游戏手柄
```

### (2) Gamepad 对象

Gamepad 对象表示`游戏手柄`

```js
定义：const gamepad = gamepads[index] //返回所有已连接的游戏手柄数组中的指定索引处游戏手柄
     const gamepad = e.gamepad       //返回触发当前事件的游戏手柄
属性：gamepad.connected               //返回布尔值,当前游戏手柄是否仍连接到设备
     gamepad.id                      //返回当前游戏手柄的id
     gamepad.index                   //返回当前游戏手柄的索引
     gamepad.timestamp               //返回当前游戏手柄的上次数据更新时间
     gamepad.mapping                 //返回当前游戏手柄的映射布局
     gamepad.hand                    //返回当前游戏手柄最可能是哪只手拿着的
     gamepad.axes                    //返回当前游戏手柄的坐标轴数组
     gamepad.buttons                 //返回当前游戏手柄上的按键数组
     gamepad.displayId               //返回当前游戏手柄控制的 VRDisplay 场景 id
     gamepad.hapticActuators         //返回GamepadHapticActuatorList对象,表示当前游戏手柄所有可用的触觉反馈硬件
     gamepad.pose                    //返回GamepadPose对象,表示当前游戏手柄的方向和位置信息
```

### (3) GamepadButton 对象

GamepadButton 对象表示`游戏手柄上的一个按键`

```js
定义：const gamepadBtns = gamepad.buttons
属性：gamepadBtns.pressed //返回布尔值,当前按钮是否被按下
     gamepadBtns.value   //返回当前按钮状态(0:未按下 - 1:按到底)
```

### (4) GamepadHapticActuatorList 对象

GamepadHapticActuatorList 对象表示`游戏手柄所有可用的触觉反馈硬件`

```js
定义：const gamepadHapticActuatorList = gamepad.hapticActuators
属性：gamepadHapticActuatorList.length      //返回所有可用触觉硬件的数目
方法：gamepadHapticActuatorList.item(index) //返回所有可用触觉硬件数组中的指定索引处触觉硬件
```

### (5) GamepadHapticActuator 对象

GamepadHapticActuator 对象表示`游戏手柄的一个触觉反馈硬件`

```js
定义：const gamepadHapticActuator = gamepadHapticActuatorList[index]
属性：gamepadHapticActuator.type    //返回当前触觉硬件的类型
方法：gamepadHapticActuator.pulse() //无返回值,使当前触觉硬件以一定强度脉冲持续指定时间
```

### (6) GamepadPose 对象

GamepadPose 对象表示`当前游戏手柄的方向和位置信息`

```js
定义：const gamepadPose = gamepad.pose
属性：gamepadPose.hasOrientation      //返回布尔值,当前游戏手柄能否返回方向信息
     gamepadPose.hasPosition         //返回布尔值,当前游戏手柄能否返回位置信息
     gamepadPose.orientation         //返回当前游戏手柄的方向信息
     gamepadPose.position            //返回当前游戏手柄的位置信息
     gamepadPose.linearVelocity      //返回线速度
     gamepadPose.linearAcceleration  //返回线性加速度
     gamepadPose.angularVelocity     //返回角速度
     gamepadPose.angularAcceleration //返回角加速度
```

### (7) Gamepad 事件

```js
window.ongamepadconnected    //连接到游戏手柄时触发
window.ongamepaddisconnected //与游戏手柄断开连接时触发
```

### (8) GamepadEvent 对象

GamepadEvent 对象表示游戏手柄事件，继承了 Event 对象

```js
e.gamepad //返回当前游戏手柄
```

## 2. 

