# 四、Screen对象

[[_TOC_]]

Screen 对象表示`当前浏览器窗口所在的用户屏幕`，提供显示设备的信息

```javascript
定义：window.screen
属性：screen.width       //返回当前浏览器窗口所在用户屏幕总宽度(单位像素)
     screen.height      //返回当前浏览器窗口所在用户屏幕总高度(单位像素)
     screen.availWidth  //返回当前浏览器窗口所在用户屏幕可用宽度(不包括Windows任务栏或MAC底部Dock区)
     screen.availHeight //返回当前浏览器窗口所在用户屏幕可用高度(不包括Windows任务栏或MAC底部Dock区)
     screen.pixelDepth  //返回当前浏览器窗口所在用户屏幕的颜色分辨率(每像素的位数)
     screen.orientation //返回ScreenOrientation对象,表示屏幕方向
                        //(landscape-primary表示横放,landscape-secondary表示颠倒的横放,
                        //portrait-primary表示竖放,portrait-secondary表示颠倒的竖放)
```

属性应用

```javascript
console.log(screen.width);       //1600
console.log(screen.height);      //900
console.log(screen.availWidth);  //1600
console.log(screen.availHeight); //860
console.log(screen.pixelDepth);  //24
console.log(screen.orientation); //ScreenOrientation {type:"landscape-primary", angle:0, onchange:null}
```

根据屏幕的分辨率，将用户导向不同网页的代码

```javascript
if(screen.width <= 800 && screen.height <= 600){
  window.location.replace('small.html')
} else{
  window.location.replace('big.html')
}
```
