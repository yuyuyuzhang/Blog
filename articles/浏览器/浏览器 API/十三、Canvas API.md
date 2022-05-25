# 十三、Canvas API

## 1. Canvas API

Canvas 是一个 HTML 元素，也是一个画本，通常使用 JS 脚本来绘制图形

```js
定义：const canvas = document.querySelector('#canvas')
方法：canvas.getContext('2d') //返回一个 2D 画布绘图上下文
     canvas.toDataURL()      //返回当前 canvas 图像导出的 data: URL 字符串
```

## 2. CanvasRenderingContext2D 对象

canvas 起初是空白的，JS 脚本首先需要找到绘图上下文，然后在上下文中绘制

canvas 采用左手背面坐标体系，以像素为单位（px），以画布左上角为坐标原点（0, 0）

* canvas 遵循现实绘画的原则，后画的内容会覆盖先画的内容
* canvas 绘画的内容不会超过画板范围

![canvas坐标体系](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas%E5%9D%90%E6%A0%87%E4%BD%93%E7%B3%BB.png)

```js
定义：const ctx = canvas.getContext('2d')
属性：基本属性：
     ctx.canvas                   //返回当前绘图上下文对应的 canvas 节点
     图层混排模式：
     ctx.globalCompositeOperation //返回或设置图层混排模式
     填充属性：
     ctx.fillStyle                //返回或设置填充样式(color/gradient/img)
     路径属性：
     ctx.strokeStyle              //返回或设置画笔样式(color/gradient/img)
     ctx.lineCap                  //返回或设置路径线条末端样式(butt:方形,round:圆形,square:方形但增加一个线段一半厚度的矩形)
     ctx.lineJoin                 //返回或设置路径线条连接处样式(round:弧形拐角,bevel:矩形拐角,miter:菱形拐角)
     ctx.miterLimit               //返回或设置路径线条连接处为菱形拐角时的接合处最大限制长度,超过限制连接处样式变成 bevel
     ctx.lineWidth                //返回或设置路径宽度(默认 1)
     ctx.lineDashOffset           //返回或设置虚线路径偏移量
     文本属性：
     ctx.font                     //返回或设置字体大小和类型
     ctx.textAlign                //返回或设置文本以绘制点为参考的水平对齐方式(left,right,center,start,end)
     ctx.textBaseline             //返回或设置文本基线(top,hanging,middle,alphabetic-默认,ideographic,bottom)
     ctx.direction                //返回或设置文本绘制方法(ltr,rtl)
     阴影属性：
     ctx.shadowBlur               //返回或设置阴影模糊距离
     ctx.shadowColor              //返回或设置阴影颜色
     ctx.shadowOffsetX            //返回或设置阴影在 X 轴的延伸距离
     ctx.shadowOffsetY            //返回或设置阴影在 Y 轴的延伸距离
     图像属性：
     ctx.imageSmoothingEnabled    //返回或设置图层是否平滑(默认平滑 true)
     透明度属性：
     ctx.globalAlpha              //返回或设置全局透明度(0 ~ 1)
方法：绘图上下文：
     ctx.save()                                               //保存当前 canvas 状态并添加到图层栈顶部
     ctx.restore()                                            //弹出图层栈顶部图层并恢复之前的 canvas 状态
     绘制文本
     ctx.measureText(text)                                    //返回 TextMetrics 实例,包含文本尺寸信息
     ctx.fillText(text,x,y)                                   //绘制文本 text,以坐标 (x,y) 为基线起点
     ctx.strokeText(text,x,y)                                 //绘制文本 text 骨架,以坐标 (x,y) 为基线起点
     绘制矩形：
     ctx.strokeRect(x,y,w,h)                                  //绘制矩形,指定起点坐标 (x,y) 及矩形宽高
     ctx.fillRect(x,y,w,h)                                    //绘制并填充矩形,指定起点坐标 (x,y) 及矩形宽高
     绘制路径：
     ctx.beginPath()                                          //开始一个新路径
     ctx.moveTo(x,y)                                          //画笔从当前新路径起点移动到坐标 (x,y)
     ctx.lineTo(x,y)                                          //画笔从当前新路径终点虚拟绘制直线到坐标 (x,y)
     ctx.arcTo(x1,y1,x2,y2,r)                                 //画笔使用坐标 (x1,y1)、(x2,y2),半径 r 虚拟绘制从当前新路径终点开始的弧线
     ctx.arc(x,y,r,deg1,deg2,dir)                             //画笔以圆心 (x,y),半径 r,起始角度 deg1,结束角度 deg2 虚拟绘制从当前新路径终点开始的圆弧,dir 默认 false 顺时针 
     ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3)                     //画笔以当前新路径终点为起点,控制点 (x1,y1)、(x2,y2),终点 (x3,y3) 虚拟绘制三次贝塞尔曲线
     ctx.closePath()                                          //画笔返回到当前新路径起点
     ctx.fill(path,fillRule)                                  //画笔填充闭合路径(evenodd:奇偶环绕,nonzero:非零环绕)
     ctx.stroke()                                             //真实绘制当前新路径
     ctx.isPointInStroke(x,y)                                 //返回当前坐标点 (x,y) 是否在绘制的路径描边线上
     ctx.isPointInPath(x,y)                                   //返回当前坐标点 (x,y) 是否在绘制的路径填充区域内
     虚线路径：
     ctx.setLineDash(segments)                                //设置路径为虚线
     ctx.getLineDash()                                        //返回设置的虚线路径
     渐变效果：
     ctx.createLinearGradient(x1,y1,x2,y2)                    //返回 CanvasGradient 实例,起点 (x1,y1),终点 (x2,y2)
     ctx.reateRadialGradient(x1,y1,r1,x2,y2,r2)               //返回 CanvasGradient 实例,起始圆 (x1,y1) r1,终点圆 (x2,y2) r2
     纹理效果：
     ctx.createPattern(canvasImageSource,repeation)           //返回 CanvasPattern 实例(repeat,repeat-x,repeat-y,no-repeat)
     绘制图片：
     ctx.drawImage(canvasImageSource,dx,dy)                   //在画板指定位置 (dx,dy) 绘制整个图片
     ctx.drawImage(canvasImageSource,dx,dy,dw,dh)             //在画板指定区域 (dx,dy) dw dh 绘制整个图片
     ctx.drawImage(canvasImageSource,sx,sy,sw,sh,dx,dy,dw,dh) //在画板指定区域 (dx,dy) dw dh 绘制图片的一部分 (sx,sy) sw sh
     几何变换：
     ctx.translate(dx,dy)                                     //将画布沿水平和垂直方向移动 dx dy 距离
     ctx.scale(sx,sy)                                         //将画布水平和垂直方向缩放 sx sy
     ctx.rotate(deg)                                          //将画布顺时针旋转 deg
     ctx.transform(a,b,c,d,e,f)                               //将画布进行矩阵变换(a:水平缩放,b:水平倾斜,c:垂直倾斜,d:垂直缩放,e:水平移动,f:垂直移动)
     裁剪效果：
     ctx.clip([path],[fillRule])                              //裁剪画布(evenodd:奇偶环绕,nonzero:非零环绕)
     橡皮擦效果：
     ctx.clearRect(x,y,w,h)                                   //设置指定矩形区域内所有像素变成透明,并擦除其中绘制的所有内容
     像素数据：
     ctx.createImageData(imageData)                           //从现有的 imageData 实例复制一个相同宽高的透明图像
     ctx.createImageData(width,height)                        //创建一个指定宽高的透明图像
     ctx.getImageData(sx,sy,sw,sh)                            //获取当前画布指定区域 (sx,sy) sw sh 的像素数据
     ctx.putImageData(imageData,sx,sy)                        //将 imageData 全部绘制到画布指定区域 (dx,dy)
     ctx.putImageData(imageData,sx,sy,dx,dy,dw,dh)            //将 imageData 指定部分 (dx,dy) dw dh 绘制到画布指定区域 (sx,sy)
```

## 3. TextMetrics 对象

```js
定义：const textMetrics = ctx.measureText(text)
属性：textMetrics.width //返回文本宽度
```

## 4. CanvasGradient 对象

CanvasGradient 对象表示 `canvas 渐变`

```js
定义：const gradient = ctx.createLinearGradient(x1,y1,x2,y2) 
     const gradient = ctx.reateRadialGradient(x1,y1,r1,x2,y2,r2)
方法：gradient.addColorStop(offset,color) //无返回值,当前渐变增加一个渐变点(offset:0~1)
```

## 5. CanvasPattern 对象

CanvasPattern 对象表示 `canvas 纹理`

```js
定义：const gradient = ctx.createPattern(canvasImageSource,repeation) 
```

## 6. CanvasImageSource 类型

CanvasImageSource 是一个`辅助类型`，不是一个接口，也没有 API，只是用于描述以下 5 个类型的对象

* HTMLImageElement
* HTMLVideoElement
* HTMLCanvasElement
* CanvasRenderingContext2D
* ImageBitmap

## 7. ImageData 对象

### (1) ImageData API

```js
定义：const imageData = new ImageData([Uint8ClampedArray],width,height)
     const imageData = ctx.createImageData(imageData)
     const imageData = ctx.createImageData(width,height)
属性：imageData.data   //返回当前 canvas 对象像素数据,Uint8ClampedArray 类型的一维数组,包含 RGBA 格式的整型数据
     imageData.width  //返回当前 canvas 对象宽度
     imageData.height //返回当前 canavs 对象高度
```

如下 canvas 图像，如果以 1 像素为单位绘制网格，就会有 width * height 个像素格子，每个像素格子一个颜色，就有 width * height 个颜色，canvas 存储颜色使用`四字节表示法 RGBA`，也就是一个颜色用 4 个字节存储，那么 canvas 存储这张图片就需要 width * height * 4 bytes，因此 Uint8ClampedArray 是一个 width * height * 4 bytes 的一维数组

![ImageData](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/ImageData.png)

Uint8ClampedArray 如何存放每个像素的颜色呢？首先创建一个 width * height * 4 bytes 的字节数组，然后按照以下公式存放第 m 行 n 列颜色

R = 4 * (m-1) * (n-1) + 0
G = 4 * (m-1) * (n-1) + 1
B = 4 * (m-1) * (n-1) + 2
A = 4 * (m-1) * (n-1) + 3

![Uint8ClampedArray](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/Uint8ClampedArray.png)

因此想要获取第 m 行第 n 列颜色值的 B 值，就可以使用如下公式

ImageData.data[4*(m-1)*(n-1)+2]

### (2) 创建 ImageData 对象

使用构造函数创建 ImageData 实例时，参数必须满足 `Uint8ClampedArray = 4 * width * height`，如果参数 Uint8ClampedArray 为空，就会自动创建一个`透明图像`

```js
console.log(new ImageData(1, 1))
```

![canvas_imageData_1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_imageData_1.png)

## 8. 实例

### (1) canvas 绘图上下文

canvas 绘图上下文虽然一直被称为画布，但实际上应该理解为 Photoshop 中的`图层集合`

canvas 图层是按照`栈`结构进行管理的，而`图层代表 canvas 状态`，调用 ctx.save() 方法会保存当前 canvas 状态作为一个新图层并添加到图层栈顶部，调用 ctx.restore() 方法会弹出图层栈顶部图层并恢复之前的 canvas 状态

![图层](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/%E5%9B%BE%E5%B1%82.png)

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
<button id="restoreBtn">恢复</button>
<button id="drawBtn">绘制</button>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 红色图层
ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 50)
ctx.save()

// 绿色图层
ctx.fillStyle = 'green'
ctx.fillRect(100, 100, 100, 50)

// 恢复之前图层
const restoreBtn = document.querySelector('#restoreBtn')
restoreBtn.addEventListener('click', () => {
    ctx.restore()
})

// 使用当前图层绘制
const drawBtn = document.querySelector('#drawBtn')
drawBtn.addEventListener('click', () => {
    ctx.fillRect(200, 200, 100, 50)
})
```

![canvas_layer](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_layer.gif)

### (2) canvas 图层混排模式

图层混排模式可以简单地理解为 2 个图层按照不同模式组合成不同的结果，先绘制的图层是`目标图层 dst`，后绘制的图层是`源图层 src`

ctx.globalCompositeOperation 属性设置绘制新图层时采用的图层混排模式，共有 26 种值，效果如下所示

![图层混排模式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/%E5%9B%BE%E5%B1%82%E6%B7%B7%E6%8E%92%E6%A8%A1%E5%BC%8F.png)

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.globalCompositeOperation = 'xor'
ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 100)
ctx.fillStyle = 'green'
ctx.fillRect(50, 50, 100, 100)
```

![globalCompositeOperation](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/globalCompositeOperation.png)

### (3) canvas 绘制文本

canvas 绘制文本使用`六线五格基线图`，ctx.textBaseline 属性指定文本基线（默认 alphabetic），ctx.fillText(text,x,y) 方法的绘制点 (x,y) 指定基线的起始点位置

![六线五格图](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/%E5%85%AD%E7%BA%BF%E4%BA%94%E6%A0%BC%E5%9B%BE.png)

canvas 字体分为衬线字体和非衬线字体

* 衬线字体：笔画有粗有细，例如宋体
* 非衬线字体：笔画粗细均匀，例如黑体，

![font](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/font.png)

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.font = '24px Times New Roman'
ctx.shadowColor = 'red'
ctx.shadowBlur = 3
ctx.shadowOffsetX = 5
ctx.shadowOffsetY = 5

ctx.fillText('我是小可爱', 50, 50)
ctx.strokeText('我是大可爱', 50, 130)
```

![canvas_text](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_text.png)

### (4) canvas 绘制矩形

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 边框矩形
ctx.strokeStyle = 'red'
ctx.strokeRect(10, 10, 100, 50)

ctx.strokeStyle = 'green'
ctx.strokeRect(30, 30, 100, 50)

// 填充矩形
ctx.fillStyle = 'red'
ctx.fillRect(150, 10, 100, 50)

ctx.fillStyle = 'green'
ctx.fillRect(170, 30, 100, 50)
```

![canvas_rect](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_rect.png)

### (5) canvas 绘制直线路径

canvas 绘制路径其实就是`连点成线`，现在绘图上下文中画很多点，再用直线或者曲线将其连接起来，就组成了各种不同的图形

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.strokeStyle = 'red'
ctx.beginPath()
ctx.moveTo(20,20)
ctx.lineTo(200,20)
ctx.lineTo(120,120)
ctx.closePath()
ctx.stroke()
```

![canvas_path_line](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_path_line.png)

### (6) canvas 绘制弧线路径

canvas 绘制弧线涉及到切线原理，弧线就是以新路径终点作为起点（x0, y0），给定 2 个参考点（x1, y1）、（x2, y2），弧的大小取决于给定半径 r

![arcTo](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/arcTo.png)

canvas 绘制圆弧就是以圆心 (x, y)，半径 r，起始角度 deg1，结束角度 deg2 绘制的，方向 dir 默认 false 为顺时针

![arc](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/arc.png)

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.strokeStyle="red"
ctx.beginPath()

ctx.moveTo(200, 50)
ctx.arcTo(150, 100, 50, 75, 50)
ctx.stroke()

ctx.moveTo(150, 100)
ctx.arc(100, 100, 50, 0, 90 * Math.PI / 180) // 0 ~ 90
ctx.stroke()

ctx.moveTo(75, 50)
ctx.arc(50, 50, 25, 0, 2 * Math.PI) // 0 ~ 360 => 圆
ctx.stroke()
```

![canvas_path_arc](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_path_arc.png)

### (7) canvas 绘制贝塞尔曲线路径

使用 de Casteljau 算法绘制二次贝塞尔曲线（二次指的是 2 轮取点操作）

* 平面内任选 3 个不共线的点，依次用线段连接，得到 A-B-C
  ![ABC](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/ABC.png)
* 线段 AB 上任取点 D，线段 BC 上取点 E，使得 BE/BC = AD/AB，并连接 DE 两点
  ![DE](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/DE.png)
* 线段 DE 上取点 F，使得 DF/DE = BE/BC = AD/AB
  ![F](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/F.png)
* 就此得到二次贝塞尔曲线如下
  ![二次贝塞尔曲线](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/%E4%BA%8C%E6%AC%A1%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.png)
* 同理，三次贝塞尔曲线如下
  ![三次贝塞尔曲线](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/%E4%B8%89%E6%AC%A1%E8%B4%9D%E5%A1%9E%E5%B0%94%E6%9B%B2%E7%BA%BF.png)

```html
<canvas id="canvas" height="300"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.moveTo(173,126)
ctx.bezierCurveTo(117,87,86,260,149,237);
ctx.stroke()
```

![bezierCurveTo](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/bezierCurveTo.png)

### (8) canvas 填充闭合路径

如果调用了 ctx.closePath() 方法闭合路径，那么就可以调用 ctx.fill() 方法以特定颜色填充路径，填充规则有奇偶环绕和非零环绕

![fillRule](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/fillRule.png)

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.beginPath()
ctx.moveTo(20,20)
ctx.lineTo(200,20)
ctx.lineTo(120,120)
ctx.closePath()

// 填充闭合路径
ctx.fillStyle = "green"
ctx.fill()

ctx.stroke()
```

![canvas_fill](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_fill.png)

### (9) canvas 虚线路径

canvas 绘制路径默认实线，也可以使用 ctx.setLineDash(segments) 将路径设置为虚线

* ctx.setLineDash([1,2])
  ![setLineDash_1_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/setLineDash_1_2.png)
* ctx.setLineDash([1,2,3])
  canvas 绘制`条形码`就是使用这种方法
  ![setLineDash_1_2_3](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/setLineDash_1_2_3.png)

canvas 绘制的虚线路径可以使用 ctx.lineDashOffset 属性设置偏移量

* ctx.setLineDash([1,2,3])
  ![setLineDash_1_2_3](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/setLineDash_1_2_3.png)
* ctx.lineDashOffset = 2（正数则向左移动）
  ![lineDashOffset_left](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/lineDashOffset_left.png)
* ctx.lineDashOffset = -2（负数则向右移动）
  ![lineDashOffset_right](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/lineDashOffset_right.png)
* 虚线边框的`跑马灯效果`

     ```html
     <canvas id="canvas"></canvas>
     ```

     ```js
     const canvas = document.querySelector('canvas')
     const ctx = canvas.getContext('2d')
     let offset = 0;

     function draw() {
     ctx.clearRect(0,0, canvas.width, canvas.height);
     ctx.setLineDash([4, 2]);
     ctx.lineDashOffset = -offset;
     ctx.strokeRect(10,10, 100, 100);
     }

     function march() {
     offset++;
     if (offset > 16) {
     offset = 0;
     }
     draw();
     setTimeout(march, 20);
     }

     march()
     ```

     ![canvas_path_dash](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_path_dash.png)

### (10) canvas 渐变效果

#### ① 线性渐变

```html
<canvas id="canvas"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gradient = ctx.createLinearGradient(0, 0, 100, 0)
gradient.addColorStop(0, 'yellow')
gradient.addColorStop(1, 'red')

ctx.fillStyle = gradient
ctx.fillRect(0, 0, 100, 100)
```

![canvas_gradient_line](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_gradient_line.png)

#### ② 径向渐变

```html
<canvas id="canvas" height="300"></canvas
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const gradient = ctx.createRadialGradient(100, 100, 50, 100, 100, 100)
gradient.addColorStop(0, 'yellow')
gradient.addColorStop(1, 'red')

ctx.fillStyle = gradient
ctx.arc(100, 100, 100, 0, 2 * Math.PI)
ctx.fill()
ctx.stroke()
```

![canvas_gradient_linear](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_gradient_linear.png)

### (11) canvas 纹理效果

canvas 纹理就是`使用图片实现填充效果`

```html
<canvas id="canvas" height="300"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './cat.jpg'
img.addEventListener('load', () => {
    const pattern = ctx.createPattern(img, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, 300, 300)
})
```

![canvas_pattern](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_pattern.png)

### (12) canvas 绘制图片

#### ① 在画板指定位置绘制整个图片

ctx.drawImage(img,dx,dy) 在画板指定位置 (dx,dy) 绘制整个图片

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './cat.jpg'
img.addEventListener('load', () => {
    ctx.drawImage(img, 50, 50)
})
```

![canvas_img_1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_img_1.png)

#### ② 在画板指定区域绘制整个图片

ctx.drawImage(img,dx,dy,dw,dh) 在画板指定区域 (dx,dy) dw dh 绘制整个图片

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './cat.jpg'
img.addEventListener('load', () => {
    ctx.drawImage(img, 50, 50, 200, 100)
})
```

![canvas_img_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_img_2.png)

#### ③ 在画板指定区域绘制图片的一部分

ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh) 在画板指定区域 (dx,dy) dw dh 绘制图片的一部分 (sx,sy) sw sh

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './cat.jpg'
img.addEventListener('load', () => {
    ctx.drawImage(img, 10, 10, 100, 100, 50, 50, 200, 100)
})
```

![canvas_img_3](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_img_3.png)

#### ④ 绘制位图 ImageBitmap

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image()
img.src = './cat.jpg'
img.addEventListener('load', () => {
    window.createImageBitmap(img, 10, 10, 100, 100).then(res => {
        ctx.drawImage(res, 0, 0)
        res.close()
    })
})
```

![canvas_img_bit](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_img_bit.png

### (13) canvas 几何变换

canvas 几何变换的不是图形，而是`整个画布`，从显示结果来看变换的是图形，而实际上变换的是整个画布和坐标系

#### ① 平移 translate

canvas 平移就是将画布往水平方向和垂直方向移动一定距离 (dx, dy)

![translate](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/translate.mp4)

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 50)

ctx.translate(100, 50)
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, 100, 50)
```

![canvas_transform_translate](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_transform_translate.png)

#### ② 缩放 sacale

canvas 缩放就是画布围绕`左上角`，然后将宽高乘以一定的缩放因子 (sx, sy)，缩放因子 = 1 则不变

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 50)

ctx.scale(0.5, 2)
ctx.fillStyle = 'green'
ctx.fillRect(0, 50, 100, 50)
```

![canvas_transform_scale](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_transform_scale.png)

#### ③ 旋转 rotate

canvas 旋转就是画布围绕`左上角`，顺时针旋转一定弧度 deg（deg * Math.PI / 180）

![rotate](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/rotate.png)

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 50)

ctx.rotate(30 * Math.PI / 180) // 顺时针旋转 30 度
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, 100, 50)
```

![canvas_transform_rotate](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_transform_rotate.png)

#### ④ 变形 transforms

canvas 变形就是将前 3 种几何变换：平移、缩放、旋转融合在一起，使用`矩阵`来操作多种几何变换

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'
ctx.fillRect(0, 0, 100, 50)

ctx.transform(1, 1, 0, 1, 0, 0)
ctx.fillStyle = 'green'
ctx.fillRect(0, 0, 100, 50)
```

![canvas_transform_transform](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_transform_transform.png)

### (14) canvas 裁剪

canvas 裁剪针对`画布本身`，裁剪区域由路径定义，所以必须先绘制一个路径，然后调用 clip() 方法将该路径设定为裁剪区域，`一旦设定好裁剪区域，就只有落在裁剪区域内的图形才能绘制出来`，裁剪区域外的绘制将没有任何效果，默认裁剪区域是`整个画布`

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// 设定裁剪区域为圆形内
ctx.fillStyle = 'red'
ctx.beginPath()
ctx.arc(50, 50, 50, 0, Math.PI*2)
ctx.fill()
ctx.stroke()
ctx.clip()

// 绘制矩形
ctx.fillStyle = 'green'
ctx.fillRect(50, 50, 100, 50)
```

![canvas_clip](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_clip.png)

### (15) canvas 橡皮擦

ctx.clearRect(x,y,w,h) 方法可以设置指定矩形区域内所有像素变成透明，并擦除其中绘制的所有内容，从而实现橡皮擦效果

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillRect(0, 0, 100, 50)
ctx.clearRect(0, 0, 50, 25)
```

![canvas_clean](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_clean.png)

### (16) canvas 动画

canvas 是 HTML 元素，还有强大的 JS 作为操作语言，因此在 canvas 中实现动画相当容易，但是图层一旦绘制出来，就保持不变了，想要移动就只能对所有东西进行`重绘`，重绘相当耗时并且很依赖性能

canvas 实现动画的基本步骤

* 绘制一帧动画
  * 清空 canvas
  * 保存 canvas 状态
  * 绘制当前帧的动画图层
  * 恢复 canvas 状态
* 定时重绘

```html
<canvas id="canvas" height="300"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const sun = new Image()
const moon = new Image()
const earth = new Image()
sun.src = './sun.png'
moon.src = './moon.png'
earth.src = './earth.png'

// 定时重绘
setInterval(() => {
    draw()
}, 1000/60)

function draw() {
    ctx.globalCompositeOperation = 'destination-over'
    ctx.clearRect(0, 0, 300, 300) // 橡皮擦效果清空 canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.strokeStyle = 'rgba(0,153,255,0.4)'
    ctx.save()
    ctx.translate(150,150)

    // earth
    const time = new Date()
    ctx.rotate(((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds())
    ctx.translate(105,0)
    ctx.fillRect(0,-12,50,24) // Shadow
    ctx.drawImage(earth,-12,-12)

    // Moon
    ctx.save()
    ctx.rotate(((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds())
    ctx.translate(0,28.5)
    ctx.drawImage(moon,-3.5,-3.5)

    ctx.restore()
    ctx.restore()

    ctx.beginPath()
    ctx.arc(150,150,105,0,Math.PI*2,false) // Earth orbit
    ctx.stroke()
    ctx.drawImage(sun,0,0,300,300)

    window.requestAnimationFrame(draw)
}
```

![canvas_animation](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_animation.gif)

### (17) canvas 画布像素

canvas 提供了 ImageData 对象来操作画布本身的像素能力，ImageData 对象存储着 canvas 对象的真实像素数据

```html
<canvas id="canvas" height="300" style="border: 1px solid black;"></canvas>
```

```js
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.save();
ctx.translate(50,50);
ctx.fillStyle = "green"
ctx.fillRect(0,0,50,200);
ctx.rotate(-30 * Math.PI / 180)
ctx.fillStyle = "blue"
ctx.fillRect(0,0,50,200);
ctx.restore();

const data = ctx.getImageData(50,50,50,50);
ctx.putImageData(data,200,100,);

ctx.strokeStyle = "red"
ctx.strokeRect(50,50,50,50);
```

![canvas_imageData_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_imageData_2.png)
