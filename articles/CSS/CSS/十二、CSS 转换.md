# 十二、CSS 转换

## 1. CSS 转换

CSS 转换是`让某个元素改变形状、大小、位置`，从而对元素进行移动、缩放、转动、拉长、拉伸

## 2. CSS 2D 转换

```js
transform-origin //设置当前元素的基点(默认中心点:50%,50%,0)


translate(xpx, ypx)   //当前元素移动指定距离
rotate(deg)           //当前元素旋转指定角度(deg > 0 顺时针)
scale(xn, yn)         //当前元素宽高缩放指定倍数
skew(xdeg, ydeg)      //当前元素倾斜指定角度
matrix(n, n, n, n, n) //当前元素按照指定 2D 矩阵转换
```

### (1) translate(xpx, ypx)

```html
<div></div>
```

```css
body {
    margin: 0;
    padding: 0;
}
div {
    width: 100px;
    height: 50px;
    border: 2px solid black;
    position: relative;
    top: 100px;
    left: 100px;
    transform: translate(50px, 100px);
}
```

![translate2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/translate2.png)

### (2) rotate(deg)

```html
<div></div>
```

```css
body {
    margin: 0;
    padding: 0;
}
div {
    width: 100px;
    height: 50px;
    border: 2px solid black;
    position: relative;
    top: 100px;
    left: 100px;
    transform: rotate(45deg);
}
```

![rotate2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/rotate2.png)

### (3) scale(xn, yn)

```html
<div></div>
```

```css
body {
    margin: 0;
    padding: 0;
}
div {
    width: 100px;
    height: 50px;
    border: 2px solid black;
    position: relative;
    top: 100px;
    left: 100px;
    transform: scale(2, 2);
}
```

![scale2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/scale2.png)

### (4) skew(xdeg, ydeg)

```html
<div></div>
```

```css
body {
    margin: 0;
    padding: 0;
}
div {
    width: 100px;
    height: 50px;
    border: 2px solid black;
    position: relative;
    top: 100px;
    left: 100px;
    transform: skew(1deg, 0);
}
```

![skew2x](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/skew2x.mp4)

![skew2y](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/skew2y.mp4)

### (5) matrix(n, n, n, n, n, n)

```html
<div></div>
```

```css
body {
    margin: 0;
    padding: 0;
}
div {
    width: 100px;
    height: 50px;
    border: 2px solid black;
    position: relative;
    top: 100px;
    left: 100px;
    transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0); /* 顺时针旋转 30deg */
}
```

![matrix2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/matrix2.png)

## 3. CSS 3D 转换

```js
transform-origin    //设置当前元素的基点(默认中心点:50%,50%,0)
transform-style     //设置当前元素在 3D 空间的显示方式(flat:2D,preserve-3d:3D)
perspective-origin  //设置当前 3D 元素的透视效果(none:无透视效果,num:以像素设置当前元素与视图的距离)
perspective         //设置当前 3D 元素的底部位置
backface-visibility //设置当前 3D 元素背向屏幕时是否可见(visible,hidden)


translate3d(x,y,z)                        //
rotate3d(x,y,z,deg)                       //
scale3d(x,y,z)                            //
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) //
perspective(n)                            //
```


