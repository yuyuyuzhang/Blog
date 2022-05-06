# 十三、CSS 过渡

## 1. CSS 过渡

CSS 过渡是元素从一种样式逐渐转换成另一种样式的效果，要实现过渡，必须指定要添加的效果以及效果的持续时间

```js
transition-property        //指定应用过渡效果的 CSS 属性名称
transition-delay           //指定过渡效果从何时开始(默认 0)
transition-duration        //指定过渡效果的持续时间(默认 0)
transition-timing-function //指定过渡效果的时间曲线(linear:以相同速度从开始到结束,ease-in:以慢速开始,ease-out:以慢速结束,ease-in-out:以慢速开始和结束,ease:以慢速开始然后变快最后以慢速结束,cubic-bezier(n,n,n,n))
```

![linear](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/linear.png)

![ease_in](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ease_in.png)

![ease_out](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ease_out.png)

![ease_in_out](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ease_in_out.png)

![ease](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ease.png)

## 2. 过渡事件

```js
elem.transitionstart  //某个 CSS3 过渡开始时,在过渡元素上触发
elem.transitionrun    //某个 CSS3 过渡执行时,在过渡元素上触发
elem.transitioncancel //某个 CSS3 过渡取消时,在过渡元素上触发
elem.transitionend    //某个 CSS3 过渡完成时,在过渡元素上触发
```

## 4. 实例

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

    transition-property: width;
    transition-duration: 5s;
    transition-timing-function: ease;
}
div:hover {
    width: 300px;
}
```

```js
const block = document.querySelector('#block');
block.addEventListener('transitionstart', () => {
  console.log('过渡开始')
})
block.addEventListener('transitionend', () => {
  console.log('过渡结束')
})
```

![transition](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/transition.png)
