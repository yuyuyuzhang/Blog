# 九、CSS 显示隐藏

## 1. display: none

* 元素不可见，并且不会再占用空间
* 造成文档重排

## 2. visibility: hidden

* 元素不可见，但是仍然会占据空间、影响布局
* 造成文档重绘

## 3. opacity: 0

* 元素设置成透明，仍然占据空间、影响布局
* 造成文档重绘

## 4. transform: scale(0)

* 元素设置成缩放无限小，仍然占据空间、影响布局
* 造成文档重绘

```html
<p class="p1">我是小可爱1</p>
<p class="p2">我是小可爱2</p>
<p class="p3">我是小可爱3</p>
<p class="p4">我是小可爱4</p>
```

```css
.p1 {
    display: none;
}
.p2 {
    visibility: hidden;
}
.p3 {
    opacity: 0;
}
.p4 {
    transform: scale(0);
}
```

![display_none](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/display_none.png)

![visibility_hidden](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/visibility_hidden.png)

![opacity_0](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/opacity_0.png)

![scale_0](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/scale_0.png)
