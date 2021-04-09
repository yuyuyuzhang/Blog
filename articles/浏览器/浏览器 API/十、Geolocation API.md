# 十、Geolocation API

[[_TOC_]]

## 1. Geolocation API

Geolocation API 用于`获取用户的当前地理位置`，由于涉及到用户隐私，所有浏览器会提示用户，是否同意给出地理位置，Geolocation API 只能在 `HTTPS` 环境下使用

## 2. Geolocation 对象

```javascript
定义：const geoloacation = navigator.geoloacation                           
方法：geoloacation.getCurrentPosition(successCB,errorCB,options) //无返回值,请求用户的当前地理位置
     geoloacation.watchPosition(successCB,errorCB,options)      //返回监听ID,监听用户当前地理位置是否发生变化
     geoloacation.clearWatch(id)                                //无返回值,取消watchProsition方法的监听


options 配置：
enableHighAccuracy //布尔值,是否返回高精度结果
timeout            //正整数,等待查询的最长时间(ms)
maximumage         //正整数,可接受的缓存的最长缓存时间(ms),0:不返回缓存(默认),Infinity:必须返回缓存
```

## 3. Position 对象

Position 对象表示`当前地理位置`

```javascript
定义：const position = 
属性：position.coords    //返回Coordinates实例,表示当前地理位置的坐标
     position.timestamp //返回当前时间戳
```

PositionError 对象表示`请求当前地理位置失败时的错误对象`

```javascript
定义：const positionError = 
属性：positionError.code    //返回错误原因(1:无权限,2:无法获得位置,3:超时)
     positionError.message //返回错误描述字符串
```

## 4. Coordinates 对象

Coordinates 对象表示`当前地理位置的坐标`

```javascript
定义：const coordinates = Position.coords
属性：coordinates.longitude        //返回经度
     coordinates.latitude         //返回纬度
     coordinates.accuracy         //返回经纬度的精度(米)
     coordinates.altitude         //返回海拔(米)
     coordinates.altitudeAccuracy //返回海拔的精度(米)
     coordinates.speed            //返回设备速度(米/秒)
     coordinates.heading          //返回设备前进方向(度),方向按顺时针,北->东->南->西,0->90->180->270
```

## 5. 实例

```javascript
if(!navigator.geolocation){
  console.log('您的浏览器不支持 Geolocation API')
} else{
  const target = {
    latitude : 0,
    longitude: 0
  }

  const watchId = navigator.geolocation.watchPosition(function(position){
    const coords = position.coords
    if(coords.latitude === target.latitude && coords.longitude === target.longitude){
      console.log('您已经到达指定位置')
      navigator.geolocation.clearWatch(watchId)
    } else{
      //输出用户当前地理位置
      console.log('您的当前地理位置如下：')
      console.log('经度：' + coords.latitude)
      console.log('维度：' + coords.longitude)
      console.log('误差：' + coords.accuracy + '米')
    }
  }, function(positionError){
    console.log(positionError.code + '：' + positionError.message)
  }, {
    enableHighAccuracy: true,
    timeout: 60000,
    maximumAge: 0
  })
}
```
