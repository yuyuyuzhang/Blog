# 二、CSS 盒模型

## 1. CSS 盒模型

### (1) CSS 盒模型

所有 HTML 元素都可以看作是一个盒子，包括：外边距 margin、边框 border、内边距 padding、实际内容 content

![box_model](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/box_model.gif)

### (2) CSS 盒大小 box-sizing

* box-sizing: content-box（默认）
  * height = content
  * 元素总高度 = height + padding + border

  ```html
  <div class="a"></div>
  ```

  ```css
  .a {
    margin: 10px;
    padding: 10px;
    border: 5px solid red;
    width: 100px;
    height: 100px;
  }
  ```

* box-sizing: border-box
  * height = content + padding + border
  * 元素总高度 = height

  ```html
  <div class="a"></div>
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
  ```

### (3) CSS 盒阴影 box-shadow

box-shadow 设置盒子阴影(h-shadow v-shadow blur spread color inset)

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 50px;
    border-radius: 4px;
    background-color:red;
    box-shadow: 10px 10px 5px #888888;
  }
```

![box_shadow](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/box_shadow.png)
