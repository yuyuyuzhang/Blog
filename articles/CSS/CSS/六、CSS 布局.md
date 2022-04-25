# 六、CSS 布局

## 1. @media screen 响应式布局

多媒体查询 @media screen 适用于`电脑屏幕、平板、智能手机`等的页面响应式布局

```html
<div class="screen-container">
  <div class="screen-item">1</div>
  <div class="screen-item">2</div>
  <div class="screen-item">3</div>
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
.screen-container {
    width: 100%;
    height: 100%;
}
.screen-item {
    display: inline-block;
    height: 100px;
    border: 1px solid red;
}
@media screen and (max-width: 600px) {
    .screen-item {
        width: 99%;
    }
}
@media screen and (min-width: 600px) and (max-width: 1200px) {
    .screen-item {
        width: 45%;
    }
}
@media screen and (min-width: 1200px) {
    .screen-item {
        width: 30%;
    }
}
```

![screen1]()

![screen2]()

![screen3]()

## 2. flex 布局

弹性布局定义了弹性容器（flex container）内弹性子元素（flex item）的布局

```js
弹性容器属性：
flex-direction  //指定弹性子元素的排列方式(row:横向从左到右排列-主轴横向,row-reverse:横向从右到左排列-主轴横向,column:纵向从上到下排列-主轴纵向,column-reverse:纵向从下到上排列-主轴纵向)
justify-content //指定弹性子元素在主轴上的对齐方式(flex-start:从行头紧挨着填充,flex-end:从行尾紧挨着填充,center:居中紧挨着填充,space-between:行上平均分布,space-around:行上平均分布且两边留有一半间隔空间)
align-items     //设置弹性子元素在侧轴上的对齐方式(flex-start:从列头紧挨着填充,flex-end:从列尾紧挨着填充,center:局中紧挨着填充)
flex-wrap       //设置弹性子元素超出弹性容器时的换行方式(nowrap:单行溢出,wrap:多行换行,wrap-reverse:多行反转换行)


弹性子元素属性：
order           //设置弹性子元素的排列顺序，数值小的排在前面
flex            //设置弹性子元素的空间分配大小
```

### (1) 横向排列 - 主轴横向

```html
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
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
.flex-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.flex-item {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![row]()

### (2) 纵向排列 - 主轴纵向

```html
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
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
.flex-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.flex-item {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![column]()

### (3) 换行

```html
<div class="flex-container">
  <div class="flex-item">1</div>
  <div class="flex-item">2</div>
  <div class="flex-item">3</div>
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
.flex-container {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.flex-item {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![wrap]()

![wrap-reverse]()

### (4) 垂直水平居中

```html
<div class="flex-container">
  <div class="flex-item"></div>
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
.flex-container {
    width: 100%;
    height: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.flex-item {
    width: 100px;
    height: 100px;
    border: 1px solid red;
}
```

![center_center]()
