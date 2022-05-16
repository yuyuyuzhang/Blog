# 十一、Canvas API

## 1. Canvas API

Canvas 是一个 HTML 元素，也是一个画本，通常使用 JS 脚本来绘制图形

```js
定义：const canvas = document.querySelector('#canvas')
方法：canvas.getContext('2d') //返回一个 2D 画布绘图上下文
```

## 2. CanvasRenderingContext2D 对象

canvas 起初是空白的，JS 脚本首先需要找到渲染上下文，然后在上下文中绘制

canvas 采用左手背面坐标体系，以像素为单位（px），以画布左上角为坐标原点（0, 0）

* canvas 遵循现实绘画的原则，后画的内容会覆盖先画的内容
* canvas 绘画的内容不会超过画板范围

![canvas坐标体系](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas%E5%9D%90%E6%A0%87%E4%BD%93%E7%B3%BB.png)

```js
定义：const ctx = canvas.getContext('2d')
属性：基本属性：
     ctx.canvas      //返回当前渲染上下文对应的 canvas 节点
     填充属性：
     ctx.fillStyle   //返回或设置填充样式(color/gradient/img)
     路径属性：
     ctx.strokeStyle //返回或设置画笔样式(color/gradient/img)
     ctx.lineCap     //返回或设置路径线条末端样式(butt:方形,round:圆形,square:方形但增加一个线段一半厚度的矩形)
     ctx.lineJoin    //返回或设置路径线条连接处样式(round:弧形拐角,bevel:矩形拐角,miter:菱形拐角)
     ctx.miterLimit  //返回或设置路径线条连接处为菱形拐角时的接合处最大限制长度,超过限制连接处样式变成 bevel
     ctx.lineWidth   //返回或设置路径宽度(默认 1)
     ctx.lineDashOffset //返回或设置虚线路径偏移量
     文本属性：
     ctx.font        //返回或设置字体大小和类型
     ctx.fontKerning
     ctx.fontStretch
     ctx.fontVariantCaps
     ctx.letterSpacing
     ctx.textAlign    //返回或设置文本以绘制点为参考的水平对齐方式(left,right,center,start,end)
     ctx.textBaseline //返回或设置文本基线(top,hanging,middle,alphabetic-默认,ideographic,bottom)
     ctx.textRendering
     ctx.wordSpacing
     ctx.direction //返回或设置文本绘制方法(ltr,rtl)
     阴影属性：
     ctx.shadowBlur //返回或设置阴影模糊距离
     ctx.shadowColor //返回或设置阴影颜色
     ctx.shadowOffsetX //返回或设置阴影在 X 轴的延伸距离
     ctx.shadowOffsetY //返回或设置阴影在 Y 轴的延伸距离
     图像属性：
     ctx.imageSmoothingEnabled
     ctx.imageSmoothingQuality

     ctx.filter
     ctx.globalAlpha
     ctx.globalCompositeOperation
方法：绘制文本
     ctx.measureText(text) //返回 TextMetrics 实例,包含文本尺寸信息
     ctx.fillText(text,x,y) //无返回值,绘制文本 text,以坐标 (x,y) 为基线起点
     ctx.strokeText(text,x,y) //无返回值,绘制文本 text 骨架,以坐标 (x,y) 为基线起点
     绘制矩形：
     ctx.strokeRect(x,y,w,h) //无返回值,绘制矩形,指定起点坐标 (x,y) 及矩形宽高
     ctx.fillRect(x,y,w,h)   //无返回值,绘制并填充矩形,指定起点坐标 (x,y) 及矩形宽高
     ctx.clearRect()
     ctx.roundRect()
     绘制路径：
     ctx.beginPath() //开始一个新路径
     ctx.moveTo(x,y) //画笔从当前新路径起点移动到坐标 (x,y)
     ctx.lineTo(x,y) //画笔从当前新路径终点虚拟绘制直线到坐标 (x,y)
     ctx.arcTo(x1,y1,x2,y2,r) //画笔使用坐标 (x1,y1)、(x2,y2),半径 r 虚拟绘制从当前新路径终点开始的弧线
     ctx.arc(x,y,r,deg1,deg2,dir) //画笔以圆心 (x,y),半径 r,起始角度 deg1,结束角度 deg2 虚拟绘制从当前新路径终点开始的圆弧,dir 默认 false 顺时针 
     ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3) //画笔以当前新路径终点为起点,控制点 (x1,y1)、(x2,y2),终点 (x3,y3) 虚拟绘制三次贝塞尔曲线
     ctx.closePath() //画笔返回到当前新路径起点
     ctx.fill(path,fillRule) //画笔填充闭合路径(evenodd:奇偶环绕,nonzero:非零环绕)
     ctx.stroke()    //真实绘制当前新路径
     虚线路径：
     ctx.getLineDash()             
     ctx.setLineDash(segments) //无返回值,设置路径为虚线()
     渐变效果：
     ctx.createLinearGradient(x1,y1,x2,y2) //返回 CanvasGradient 实例,起点 (x1,y1),终点 (x2,y2)
     ctx.reateRadialGradient(x1,y1,r1,x2,y2,r2)  //返回 CanvasGradient 实例,起始圆 (x1,y1) r1,终点圆 (x2,y2) r2
     纹理效果：
     ctx.createPattern(canvasImageSource,repeation) //返回 CanvasPattern 实例(repeat,repeat-x,repeat-y,no-repeat)
     绘制图像：
     ctx.drawImage(canvasImageSource,dx,dy) //在画板指定位置 (dx,dy) 绘制整个图片
     ctx.drawImage(canvasImageSource,dx,dy,dw,dh) //在画板指定区域 (dx,dy) dw dh 绘制整个图片
     ctx.drawImage(canvasImageSource,sx,sy,sw,sh,dx,dy,dw,dh) //在画板指定区域 (dx,dy) dw dh 绘制图片的一部分 (sx,sy) sw sh

     ctx.createImageData()
     ctx.getImageData()
     ctx.putImageData()
     
     ctx.clip()
     ctx.createConicGradient()
     ctx.drawFocusIfNeeded()
     ctx.ellipse()
     ctx.getContextAttributes()
     ctx.getTransform()
     ctx.isContextLost()
     ctx.isPointInPath()
     ctx.isPointInStroke()
     ctx.quadraticCurveTo()
     ctx.reset()
     ctx.resetTransform()
     ctx.restore()
     ctx.rotate()
     ctx.save()
     ctx.scale()
     ctx.setTransform()
     ctx.transform()
     ctx.translate()
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

## 7. 实例

### (1) canvas 绘制文本

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

### (2) canvas 绘制矩形

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

### (3) canvas 绘制直线路径

canvas 绘制路径其实就是`连点成线`，现在渲染上下文中画很多点，再用直线或者曲线将其连接起来，就组成了各种不同的图形

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

### (4) canvas 绘制弧线路径

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

### (5) canvas 绘制贝塞尔曲线路径

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

### (6) canvas 填充闭合路径

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

### (7) canvas 虚线路径

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

### (8) canvas 渐变效果

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

### (9) canvas 纹理效果

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

### (10) canvas 绘制图像

#### 在画板指定位置绘制整个图片

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

#### 在画板指定区域绘制整个图片

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

#### 在画板指定区域绘制图片的一部分

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

#### 绘制位图 ImageBitmap

```html

```

```js

```

![]()

### (11) canvas 几何变换

### (11) canvas 动画

### (12) canvas

```html

```

```js

```

![]()

①②③④⑤⑥⑦⑧⑨⑩
