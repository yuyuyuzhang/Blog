# 七、CSS 居中

## 1. 水平居中

### (1) 绝对定位

```html
<div class="parent">
    <div class="child"></div>
</div>
```
  
```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;

    position: relative; /* 父元素相对定位 */
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;

    box-sizing: border-box; /* 涉及宽度计算，需要设置 border-box */
    position: absolute; 
    left: 50%;
    transform: translateX(-50%); /* 沿 X 轴反方向移动自身一半距离 */
}
```

![center1_absolute](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center1_absolute.png)

### (2) flex 布局

```html
<div class="parent">
    <div class="child"></div>
</div>
```
  
```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center; /* 弹性子元素水平居中 */
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![center1_flex](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center1_flex.png)

### (3) margin: 0 auto

```html
<div class="parent">
    <div class="child"></div>
</div>
```
  
```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;

    margin: 0 auto; /* 确保块级元素定宽 */
}
```

![center1_margin](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center1_margin.png)

## 2. 垂直居中

### (1) 绝对定位

```html
<div class="parent">
    <div class="child"></div>
</div>
```

```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;

    position: relative; /* 父元素相对定位 */
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;

    box-sizing: border-box; /* 涉及宽度计算，需要设置 border-box */
    position: absolute; 
    top: 50%;
    transform: translateY(-50%); /* 沿 Y 轴反方向移动自身一半距离 */
}
```

![center2_absolute](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center2_absolute.png)

### (2) flex 布局

```html
<div class="parent">
    <div class="child"></div>
</div>
```

```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center; /* 弹性子元素垂直居中 */
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![center2_flex](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center2_flex.png)

## 3. 垂直水平居中

### (1) 绝对定位

```html
<div class="parent">
    <div class="child"></div>
</div>
```

```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;

    position: relative; /* 父元素相对定位 */
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;

    box-sizing: border-box; /* 涉及宽度计算，需要设置 border-box */
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 沿 X、Y 轴反方向移动自身一半距离 */
}
```

![center3_absolute](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center3_absolute.png)

### (2) flex 布局

```html
<div class="parent">
    <div class="child"></div>
</div>
```

```css
body {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
.parent {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center; /* 弹性子元素水平居中 */
    align-items: center; /* 弹性子元素垂直居中 */
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![center3_flex](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/center3_flex.png)
