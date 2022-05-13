# 六、Web Serial API

## 1. 串口通信（Serial Communication）

通信是指`计算机与外界的信息交换`，因此通信既包括`计算机与外设间`、也包括`计算机与计算机间`的信息交换

串口通信是指`计算机与外设间通过数据信号线按位传输数据的一种通信方式`，由于串口通信是在一根数据线上一位一位传输数据，所用的传输线少，因此特别适合远距离传输，串口通信相对于`以太网模式、红外模式、蓝牙模式`，是一种相对低级的通信手段

串口通信稳定、简单，有非常多的硬件基于串口通信，例如一些经过简单封装的传感器模块，基于 STM32 微处理器的各种开发板也经常采用串口来打印一些感兴趣的数据和调试日志

以传感器为例，一般使用各种各样的串口调试助手与传感器通信，设置传感器的参数，并接收传感器的量测数据，然而这些传感器通常具有各式各样的通信协议，目前串口调试助手很难提供灵活的数据可视化功能，也就是绘图功能，有时对于感兴趣的信号的表示又不够直观，为此 2021 年 Google 在其开发者大会上推广的 Web Serial API 即可用于串口通信

## 2. Serial 对象

```js
定义：const serial = navigator.serial
方法：serial.getPorts()    //返回 Promise 实例,
     serial.requestPort() //返回 Promise 实例,
```

## 3. SerialPort 对象

```js
定义：const port = ports[index]
     const port = serial.requestPort()
属性：
方法：
```

## 4. Serial 事件

```js
onconnect    //
ondisconnect //
```
