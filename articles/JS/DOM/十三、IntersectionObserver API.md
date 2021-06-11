# 十三、IntersectionObserver API

[[_TOC_]]

## 1. IntersectionObserver 对象

### (1) IntersectionObserver 对象属性和方法

① 元素可见性的本质是`目标元素与视口产生一个交叉区`，因此 IntersectionObserver API 叫做交叉观察器，可以自动观察元素是否可见

② IntersectionObserver API 是`异步`的，在目标元素滚动至可见后，将`回调函数`添加到 `JS 引擎线程的宏任务队列`

```js
定义：const io = new IntersectionObserver(callback, options)
方法：io.observe(elem)    //无返回值,开始观察指定节点elem
      io.unobserve(elem) //无返回值,停止观察指定节点elem
      io.disconnect()    //无返回值,关闭观察器
```

### (2) options 配置项参数

```js
options:{
  threshold  //指定何时将回调函数添加到 JS 引擎线程的宏任务队列,默认[0,1],刚进入视口和完全离开视口时
  root       //指定目标元素滚动的容器节点
  rootMargin //指定目标元素容器节点的margin样式
}

示例
threshold: [0, 0.25, 0.5, 0.75, 1],  //目标元素 0%、25%、50%、75%、100% 可见时将回调函数添加到 JS 引擎线程的宏任务队列
```

![viewport](https://github.com/yuyuyuzhang/Blog/blob/master/images/JS/DOM/viewport.gif)

### (3) callback 回调函数

① options 配置项的 threshold 属性决定何时将回调函数添加到 JS 引擎线程的宏任务队列

② 回调函数的参数是一个`数组`，一个成员对应一个目标元素，每个成员都是一个 `IntersectionObserverEntry 实例`

## 2. IntersectionObserverEntry 对象

IntersectionObserverEntry 对象表示`目标元素的信息`

```html
{
  target: element,       //要观察的目标元素
  isIntersecting: false, //目标元素是否可见
  time: 3893.93,         //目标元素可见性发生变化的时间
  rootBounds: ClientRect {
    width: 920,
    height: 1024,
    top: 0,
    bottom: 920,
    left: 0,
    right: 1024
  },
  intersectionRatio: 0.54,           //目标元素的可见比例(intersectionRect/boundingClientRect)
  intersectionRect: ClientRect {},   //目标元素与视口的交叉区信息
  boundingClientRect: ClientRect {}, //目标元素的矩形区域信息
}
```

![交叉观察器](https://github.com/yuyuyuzhang/Blog/blob/master/images/JS/DOM/%E4%BA%A4%E5%8F%89%E8%A7%82%E5%AF%9F%E5%99%A8.png)

## 3. 实例

### (1) 懒加载

希望实现某些静态资源 ( 比如图片 )，只有用户向下滚动，进入视口时才加载，这样可以节省带宽，提高网页性能

```html
<div class="image-lazy">
  <img src="" data-src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
  <img src="" data-src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg" />
  <img src="" data-src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg" />
  <img src="" data-src="https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg" />
  <img src="" data-src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg" />
  <img src="" data-src="https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg" />
  <img src="" data-src="https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg" />
</div>
```

```css
.image-lazy {
  width: 680px;
  height: 400px;
  overflow-y: auto;
  border: 1px solid red;
}
.image-lazy img {
  width: 680px;
  height: 500px;
}
```

```js
const container = document.querySelector('.image-lazy')
const options = {
  threshold: [0, 0.5],
  root: container
}
const observer = new IntersectionObserver(entries => {
  entries.forEach(item => {
    //不可见就退出
    if (item.intersectionRatio <= 0){
      return
    }

    console.log(item)
    item.target.src = item.target.dataset.src //图片的src属性为占位符,data-src属性为真实url
    observer.unobserve(item.target) //停止观察,避免再次触发
  })
}, options)

//一个观察器同时观察多个元素
const query = selector => Array.from(document.querySelectorAll(selector))
query('.image-lazy img').forEach(item => observer.observe(item))
```

### (2) 无限滚动加载

无限滚动加载时，最好在页面底部有一个底部栏，一旦底部栏可见，就表示滚动到达了底部，从而加载新的条目放在底部栏前面，这样做的好处是无需再一次调用 observe() 方法，现有的 IntersectionObserver 可以保持使用

```html
<div class="image-lazy">
  <img src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg" />
  <div class="footerScroll">底部栏</div>
</div>
```

```css
.image-lazy {
  width: 680px;
  height: 400px;
  overflow-y: auto;
  border: 1px solid red;
}
.image-lazy img {
  width: 680px;
  height: 500px;
}
```

```js
const container = document.querySelector('.image-lazy')
const footer = document.querySelector('.footerScroll')
const options = {
  threshold: [0],
  root: container
}
const observer = new IntersectionObserver(entries => {
  //如果页尾栏不可见就退出
  if (entries[0].intersectionRatio <= 0){
    return
  }
  console.log('底部栏可见')

  //添加图片到底部栏之前
  const img = document.createElement('img')
  img.src = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
  footer.insertAdjacentElement('beforebegin', img)
}, options)
observer.observe(footer)
```
