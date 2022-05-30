# 八、ImageBitmap API

## 1. ImageBitmap API

ImageBitmap 是`高性能位图`，可以低延迟绘制，使用 window.createImageBitmap() 工厂方法模式从多种源中生成 ImageBitmap

```js
定义：window.createImageBitmap(img, options) //返回 Promise 实例,将图像源裁剪为指定规格的像素矩阵 ImageBitmap

img：
HTMLImageElement
HTMLVideoElement
HTMLCanvasElement
SVGImageElement
OffscreenCanvas
Blob
ImageData
ImageBitmap


options：
sx //裁剪点 X 坐标
sy //裁剪点 Y 坐标
sw //裁剪宽度
sh //裁剪高度
```

## 2. ImageBitmap 对象

ImageBitmap 对象表示位图

```js
定义：const imageBitmap = window.createImageBitmap(img, options)
属性：imageBitmap.width   //返回当前位图宽度
     imageBitmap.height  //返回当前位图高度
方法：imageBitmap.close() //无返回值,释放当前位图关联的所有图像资源
```

## 3. 实例

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

![canvas_img_bit](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/canvas_img_bit.png)
