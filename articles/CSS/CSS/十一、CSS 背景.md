# 十一、CSS 背景

## 1. 背景颜色

```js
background-color //设置背景颜色
```

## 2. 背景图像

```js
background-image      //设置背景图像路径
background-position   //设置背景图像的起始位置(left top, x% y%, xpx ypx)
background-size       //设置背景图像大小(cover:保持图像纵横比并扩展图像填满元素,contain:保持图像纵横比缩小图像来适应元素,xpx ypx,x% y%)
background-clip       //设置背景图像的绘制区域(border-box:背景绘制在边框内,padding-box:背景绘制在内边距内,content-box:背景绘制在内容方框内))
background-repeat     //设置背景图像的平铺方式(repeat:背景图像在水平和垂直方向均重复,repeat-x:背景图像在水平方式重复,repeat-y:背景图像在垂直方向重复,no-repeat:背景图像不重复)
background-attachment //设置背景图像的固定方式(local:背景图像随元素内容滚动,scroll:背景图像随页面滚动,fixed:背景图像固定)
background-blend-mode //设置背景层的混合模式(normal:正常模式,multiply:正片叠底模式,screen:滤色模式,overlay:叠加模式,darken:变暗模式,lighten:变亮模式,color-dodge:颜色减淡模式,saturation:饱和度模式,color:颜色模式,luminosity:亮度模式)
```

### (1) 背景图像大小

```html
<div></div>
```

```css
div {
    width: 300px;
    height: 200px;
    border: 5px solid red;
    padding: 20px;
    background-image: url('./cat.jpg');
    background-size: cover;
}
```

![cover]()

![contain]()

### (2) 背景图像绘制区域

```html
<div></div>
```

```css
div {
    width: 300px;
    height: 200px;
    border: 5px solid transparent;
    padding: 20px;
    background-image: url('./cat.jpg');
    background-clip: border-box;
}
```

![border]()

![padding]()

![content]()
