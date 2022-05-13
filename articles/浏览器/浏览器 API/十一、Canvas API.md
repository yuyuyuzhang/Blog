# 十一、Canvas API

## 1. Canvas API

Canvas 是一个 HTML 元素，也是一个画本，通常使用 JS 脚本来绘制图形

```js
定义：const canvas = document.querySelector('#canvas')
方法：canvas.getContext('2d') //返回一个 2D 画布绘图上下文
```

## 2. CanvasRenderingContext2D 对象

canvas 起初是空白的，JS 脚本首先需要找到渲染上下文，然后在上下文中绘制

```js
定义：const ctx = canvas.getContext('2d')
属性：基本属性：
     ctx.canvas      //返回当前渲染上下文对应的 canvas 节点
     矩形样式：
     ctx.strokeStyle //返回或设置当前渲染上下文的画笔样式(color/gradient/img)
     ctx.fillStyle   //返回或设置当前渲染上下文的填充样式(color/gradient/img)

     ctx.direction
     ctx.filter
     ctx.font
     ctx.fontKerning
     ctx.fontStretch
     ctx.fontVariantCaps
     ctx.globalAlpha
     ctx.globalCompositeOperation
     ctx.imageSmoothingEnabled
     ctx.imageSmoothingQuality
     ctx.letterSpacing
     ctx.lineCap
     ctx.lineDashOffset
     ctx.lineJoin
     ctx.lineWidth
     ctx.miterLimit
     ctx.shadowBlur
     ctx.shadowColor
     ctx.shadowOffsetX
     ctx.shadowOffsetY
     ctx.textAlign
     ctx.textBaseline
     ctx.textRendering
     ctx.wordSpacing
方法：绘制矩形：
     ctx.strokeRect(x,y,w,h) //无返回值,在当前渲染上下文绘制矩形,指定起点坐标(x,y)及矩形宽高
     ctx.fillRect(x,y,w,h)   //无返回值,在当前渲染上下文绘制并填充矩形,指定起点坐标(x,y)及矩形宽高

     ctx.clearRect()
     ctx.roundRect()
     绘制路径：
     ctx.beginPath() //开始一个新路径

     ctx.moveTo(x,y) //画笔从当前新路径起点移动到坐标 (x,y)
     ctx.lineTo(x,y) //画笔从当前新路径终点虚拟绘制直线到坐标 (x,y)

     ctx.arc()
     ctx.arcTo(x1,y1,x2,y2,r) //画笔使用坐标 (x1,y1)、(x2,y2),半径 r 虚拟绘制从当前新路径终点开始的弧线 

     ctx.closePath() //画笔返回到当前新路径起点
     ctx.stroke()    //真实绘制当前新路径

     ctx.strokeText()
     
     ctx.bezierCurveTo()
     ctx.clip()
     ctx.createConicGradient()
     ctx.createImageData()
     ctx.createLinearGradient()
     ctx.createPattern()
     ctx.reateRadialGradient()
     ctx.drawFocusIfNeeded()
     ctx.drawImage()
     ctx.ellipse()
     ctx.fill()
     ctx.fillText()
     ctx.getContextAttributes()
     ctx.getImageData()
     ctx.getLineDash()
     ctx.getTransform()
     ctx.isContextLost()
     ctx.isPointInPath()
     ctx.isPointInStroke()
     ctx.measureText()
     ctx.putImageData()
     ctx.quadraticCurveTo()
     
     ctx.reset()
     ctx.resetTransform()
     ctx.restore()
     ctx.rotate()
     ctx.save()
     ctx.scale()
     ctx.setLineDash()
     ctx.setTransform()
     ctx.transform()
     ctx.translate()
```

### (1) canvas 坐标系

canvas 采用左手背面坐标体系，以像素为单位（px），以画布左上角为坐标原点（0, 0）

* canvas 遵循现实绘画的原则，后画的内容会覆盖先画的内容
* canvas 绘画的内容不会超过画板的范围

![canvas坐标体系]()

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

![canvas_rect]()

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

![canvas_path_line]()

### (4) canvas 绘制弧线路径

canvas 绘制弧线涉及到切线原理，弧线就是以新路径终点作为起点（x0, y0），给定 2 个参考点（x1, y1）、（x2, y2），弧的大小取决于给定的半径

![arc]()

```html
<canvas id="canvas"></canvas>
```

```js

```

![canvas_path_arc]()

①②③④⑤⑥⑦⑧⑨⑩
