# 十一、CSS 背景

## 1. 背景颜色

```js
background-color //设置背景颜色
```

### (1) 背景颜色透明度

```html
<div class="div1">我是小可爱</div>
<div class="div2">我是大可爱</div>
```

```css
div {
    width: 100px;
    height: 80px;
    margin-bottom: 20px;
}
.div1 {
    background-color: rgb(106, 90, 205); /* #6A5ACD */
    opacity: 0.5;
}
.div2 {
    background-color: rgba(106, 90, 205, 0.5);
}
```

![background_color](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/background_color.png)

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

![cover](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/cover.png)

![contain](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/contain.png)

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

![border](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/border.png)

![padding](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/padding.png)

![content](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/content.png)

## 3. 背景渐变

CSS 渐变可以在多个颜色之间平稳过渡

* **线性渐变**：某个方向上的渐变
* **径向渐变**：由中心向周围的渐变

### (1) 线性渐变

线性渐变是某个方向上的渐变

```css
/* 单个线性渐变 */
background-image: linear-gradient([direction/angle], color1 size1, color2 size2, ...)

/* 重复线性渐变 */
background-image: repeating-linear-gradient([direction/angle], color1 size1, color2 size2, ...)
```

#### ① 某个方向的线性渐变

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 80px;
    background-image: linear-gradient(to bottom right, red, yellow);
}
```

![linear_gradient1](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/linear_gradient1.png)

#### ② 某个角度的线性渐变

![angle](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/angle.png)

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 80px;
    background-image: linear-gradient(45deg, rgba(65,105,225,0.8), rgba(138,43,226,0.8), rgba(0,128,128,0.8));
}
```

![linear_gradient2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/linear_gradient2.png)

#### ③ 重复的线性渐变

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 80px;
    background-image: repeating-linear-gradient(45deg, rgba(65,105,225,0.8) 10%, rgba(138,43,226,0.8) 20%);
}
```

![repeat_linear_gradient](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/repeat_linear_gradient.png)

### (2) 径向渐变

径向渐变是由中心向周围的渐变

```css
background-image: radial-gradient([shape size center], color1 size1, color2 size2, ...)

background-image: repeating-radial-gradient([shape size center], color1 size1, color2 size2, ...)



shape：
ellipsis //椭圆形(默认)
circle   //圆形

size：
closest-side    //以距离中心点最近的边计算渐变圆半径
farthest-side   //以距离中心点最远的边计算渐变圆半径
closest-corner  //以距离中心点最近的角计算渐变圆半径
farthest-corner //以距离中心点最远的角计算渐变圆半径

center：
at position //设置中心点
```

#### ① 圆形的径向渐变

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 80px;
    background-image: radial-gradient(circle farthest-side at 50% 50%, rgba(65,105,225,0.8), rgba(138,43,226,0.8))
}
```

![radial_gradient1](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/radial_gradient1.png)

#### ② 重复的径向渐变

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 80px;
    
}
```

![radial_gradient2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/radial_gradient2.png)
