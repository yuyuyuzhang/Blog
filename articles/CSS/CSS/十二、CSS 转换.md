# 十二、CSS 转换

## 1. CSS 转换

CSS 转换是`让某个元素改变形状、大小、位置`，从而对元素进行移动、缩放、转动、拉长、拉伸

## 2. CSS 2D 转换

```js
translate(x,y) //以当前元素左上角为原点,向右为 X 轴,向下为 Y 轴,
rotate(deg)    //以当前元素中心点为中心,顺时针旋转指定 deg
scale()
skew()
matrix()
```

### (1) translate(x, y)

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
    height: 80px;
    border: 1px solid red;
    position: relative;
    transform: translate(50px, 100px);
}
```

![translate](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/translate.png)

### (2) rotate(x, y)

```html

```

```css

```

![]()

### (3) scale

```html

```

```css

```

![]()

### (4) skew

```html

```

```css

```

![]()

### (5) matrix

```html

```

```css

```

![]()

## 3. CSS 3D 转换

```js
translate3d(x,y,z)                        //
scale3d(x,y,z)                            //
rotate3d(x,y,z,deg)                       //
perspective(n)                            //
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) //
```


