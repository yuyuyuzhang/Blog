# 一、CSS 样式表

## 1. 加载其他样式表

@import 支持`媒体查询`，可以根据不同屏幕尺寸导入不同样式文件

```css
@import url() media-lists
```

### (1) 实例

```html
<div>我是小可爱</div>
```

```css
@import url('./small.css') screen and (max-width: 600px);
@import url('./big.css') screen and (min-width: 600px);
```

small.css

```css
* {
    color: red;
}
```

big.css

```css
* {
    color: blue;
}
```

![small](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/small.png)

![big](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/big.png)
