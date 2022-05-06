# 五、CSS 定位

## 1. 静态定位 static

position: static：静态定位即没有定位，`HTML 元素遵循正常的文档流，不受 top、left、right、bottom 属性的影响`

```html
<div class="a">
    <div class="b"></div>
</div>
```

```css
.a {
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
}
.b {
    top: 5px; /* 不生效 */
    border: 1px solid blue;
    width: 50px;
    height: 50px;
}
```

![static](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/static.png)

## 2. 相对定位 relative

position: relative 相对定位即 `HTML 元素相对其正常位置`

```html
<div class="a">
    <div class="b"></div>
</div>
```

```css
.a {
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
}
.b {
    position: relative; /* 相对定位 */
    top: 5px;
    border: 1px solid blue;
    width: 50px;
    height: 50px;
}
```

![relative](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/relative.png)

## 3. 绝对定位 absolute

position: absolute 绝对定位即 `HTML 元素相对其最近的已定位的父元素，如果没有则相对于 html 元素`

### (1) 相对于最近的已定位父元素

```html
<div class="a">
    <div class="b"></div>
</div>
```

```css
.a {
    position: relative; /* a 元素相对定位 */
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
}
.b {
    position: absolute; /* 绝对定位：相对于 a 元素 */
    top: 5px;
    border: 1px solid blue;
    width: 50px;
    height: 50px;
}
```

![absolute_a](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/absolute_a.png)

### (2) 相对于 html 元素

```css
.a {
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
}
.b {
    position: absolute; /* 绝对定位：相对于 html 元素 */
    top: 5px;
    border: 1px solid blue;
    width: 50px;
    height: 50px;
}
```

![absolute_html](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/absolute_html.png)

## 4. 固定定位 fixed

position: fixed 固定定位即 `HTML 元素相对于浏览器窗口`

```html
<div class="a">
    <div class="b"></div>
</div>
```

```css
.a {
    box-sizing: border-box;
    margin: 10px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
}
.b {
    position: fixed; /* 相对定位 */
    bottom: 5px;
    border: 1px solid blue;
    width: 50px;
    height: 50px;
}
```

![fixed](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/fixed.png)

## 5. 粘性定位 sticty

position: sticty 粘性定位即 `HTML 元素依赖于用户的滚动，在相对定位和固定定位之间切换，跨越特定阈值 top、left、right、bottom 之前为相对定位，达到特定阈值后为固定定位`

```html
<div class="a"></div>
```

```css
body {
    height: 1000px;
    overflow-y: auto;
}
.a {
    position: sticky; /* 粘性定位 */
    top: 5px; /* 指定阈值 */
    box-sizing: border-box;
    margin: 100px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
}
```

![sticty](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/sticty.mp4)

## 6. 浮动 float

### (1) 浮动

* 浮动就是给元素设置 `float` 样式，浮动元素会根据样式向左或向右浮动，直到外边缘碰到包含框或另一个浮动元素为止
* 浮动元素会`脱离文档流，不再受限于父元素`
* 浮动元素之前的元素不受影响，之后的元素将`围绕`它
* 浮动元素自动变成 `display: block`

```html
<div class="parent">
  <div class="child"></div>
  <div class="child float-right"></div>
</div>
```

```css
.parent {
    border: 1px solid blue;
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    display: inline-block;
}
.float-right {
    height: 200px;
    float: right; /* 向右侧浮动 */
}
```

![float](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/float.png)

### (2) 清除浮动

> 浮动元素脱离文档流，不再受限于父元素，因此如果父元素没有设置高度，那么父元素的高度就不会受浮动子元素的高度变化而变化，会发生`高度坍塌`现象，因此需要清除浮动

清除浮动常用以下 3 种方式

#### ① 父元素设置 width 和 overflow: hidden/auto，不能设置 height
  
浏览器支持好，但是不能和 position 配合使用，因为超出的尺寸会被隐藏

```html
<div class="parent">
  <div class="child"></div>
  <div class="child float-right"></div>
</div>
```

```css
.parent {
    border: 1px solid blue;

    width: 100%;
    zoom: 1; /* IE 专有属性，解决 ie6、ie7 浮动问题 */
    overflow: hidden;
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    display: inline-block;
}
.float-right {
    height: 200px;
    float: right;
}
```

![clear1](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/clear1.png)

#### ② 父元素设置 clearfix 类，添加一个 ::after 伪元素，使用 clear:both 清除浮动
  
浏览器兼容性好

```html
<div class="parent clearfix">
  <div class="child"></div>
  <div class="child float-right"></div>
</div>
```

```css
.parent {
    border: 1px solid blue;
}
.child {
    width: 100px;
    height: 100px;
    border: 1px solid red;
    display: inline-block;
}
.float-right {
    height: 200px;
    float: right;
}

.clearfix {
    zoom: 1 /* IE 专有属性，解决 ie6、ie7 浮动问题 */
}
.clearfix::after {
    clear: both;
    display: block;
    content: "";
    height: 0;
    visibility: hidden; /* 允许浏览器渲染但不显示 */
}
```

![clear2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/clear2.png)
