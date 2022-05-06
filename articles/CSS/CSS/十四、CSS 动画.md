# 十四、动画

## 1. CSS

CSS 动画是元素从一种样式逐渐转换成另一种样式的效果，CSS 动画的实现机制是基于 CSS 过渡，但与 CSS 过渡不同的是 CSS 动画可以改变`任意多的样式以及任意多的次数`

CSS3 动画和 JS 动画的区别

* CSS 实现的是`补间动画`，就是状态发生改变产生的过渡动画
* JS 实现的是`帧动画`，也就是使用`定时器`每隔一段时间更改当前元素

CSS3 动画代替 JS 动画的好处

* CSS3 动画代码相对简单
* CSS3 动画`不占用 JS 引擎线程`
* CSS3 动画可以`减少重流和重绘`
* CSS3 动画性能更好，浏览器会专门对 CSS3 动画做一些优化，例如专门新建一个图层来跑动画

```js
@keyframes animationname { keyframes-selector: { css-styles } }


animation-name            //指定动画名称
animation-delay           //指定动画何时开始
animation-duration        //指定动画持续时间
animation-timing-function //指定动画的速度曲线(linear:以相同速度从开始到结束,ease-in:以慢速开始,ease-out:以慢速结束,ease-in-out:以慢速开始和结束,ease:以慢速开始然后变快最后以慢速结束,cubic-bezier(n,n,n,n))
animation-fill-mode       //指定动画不播放时应用到元素的样式
animation-play-state      //指定动画当前状态(running:运行,paused:暂停)
animation-iteration-count //指定动画的播放次数(默认 1)
animation-direction       //指定动画下一周期播放方向(normal:正向播放,reverse:反向播放,alternate:奇数次正向播放偶数次反向播放,alternate-reverse:奇数次反向播放偶数次正向播放)
```

## 2. 动画事件

```js
elem.animationstart     //某个 CSS3 动画开始时,在动画元素上触发
elem.animationend       //某个 CSS3 动画完成时,在动画元素上触发
elem.animationiteration //某个 CSS3 动画完成后重新开始时,在动画元素上触发
```

## 3. 实例

```html
<div></div>
```

```css
div {
    width: 100px;
    height: 100px;
    position: relative;
    animation: a 3s;
}
@keyframes a {
    0% {
        top: 0;
        left: 0;
        background-color: red;
    }
    25% {
        top: 0;
        left: 200px;
        background-color: blue;
    }
    50% {
        top: 200px;
        left: 200px;
        background-color: green;
    }
    75% {
        top: 200px;
        left: 0;
        background-color: gray;
    }
    100% {
        top: 0;
        left: 0;
        background-color: red;
    }
}
```

```js
const block = document.querySelector('#block')
block.addEventListener('animationstart', () => {
    console.log('动画开始')
})
block.addEventListener('animationend', () => {
    console.log('动画结束')
})
```

![animation](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/animation.mp4)
