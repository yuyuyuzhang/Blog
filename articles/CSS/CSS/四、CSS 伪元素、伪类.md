# 四、CSS 伪元素、伪类

## 1. CSS 伪元素

CSS 伪元素用于`创建一些不在 DOM 树中的元素并为其添加样式`，CSS3 规定伪元素使用`双冒号 ::`

```js
::before       //在指定元素之前插入伪元素
::after        //在指定元素之后插入伪元素
::first-letter //将指定元素的第一个字母创建为伪元素
::first-line   //将指定元素的第一行创建为伪元素
::selection    //将指定元素中被用户选中或处于高亮状态的部分创建为伪元素
```

### (1) ::before、::after

```html
<p class="p1">我是小可爱</p>
<p class="p2">我是大可爱</p>
```

```css
.p1::after {
    content: '哈哈哈';
}
.p2::after {
    content: url('cat.jpg');
}
```

![after](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/after.png)

### (2) ::first-letter、::first-line

```html
<p>
  我是小可爱<br>
  我是大可爱
</p>
```

```css
p::first-line {
    color: red;
}
p::first-letter {
    font-weight: bold;
}
```

![first_letter_first_line](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/first_letter_first_line.png)

### (3) ::selection

```html
<p>我是小可爱</p>
```

```css
p::selection {
    background-color: gray;
}
```

![selection](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/selection.png)

## 2. CSS 伪类

CSS 伪类用于 `DOM 树中已有元素处于某种状态时为其添加样式`，CSS3 规定伪类使用`单冒号 :`

```js
结构化元素：
:first-child    //匹配父元素的第一个指定子元素
:last-child     //匹配父元素的最后一个指定子元素
:nth-child(n)   //匹配父元素的第 n 个指定子元素
:nth-last-child //匹配父元素的倒数第 n 个指定子元素

链接状态：
:link           //匹配指定链接的未访问状态
:visited        //匹配指定链接的已访问状态
:hover          //匹配指定链接的鼠标 hover 状态
:active         //匹配指定链接的活动状态
:focus          //匹配指定链接的焦点 focus 状态

表单相关：
:enabled        //匹配指定表单元素的启用状态
:disabled       //匹配指定表单元素的禁止状态
```

### (1) 结构化元素伪类

```html
<div class="parent">
  <div class="child"></div>
  <div class="child"></div>
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
.child:nth-child(1) {
    background-color: red;
}
```

![nth_child](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/nth_child.png)

### (2) 链接状态伪类

```html
<a href="https://www.runoob.com/css/css-pseudo-classes.html">菜鸟教程</a>
```

```css
a:link {
    color: red;
}
a:visited {
    color: blue;
}
a:hover {
    color: green;
}
```

![visited](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/visited.gif)

### (3) 表单相关伪类

```html
<input/>
<input disabled/>
```

```css
input:enabled {
    border: 1px solid blue;
}
input:disabled {
    border: 1px solid red;
}
```

![disabled](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/disabled.png)
