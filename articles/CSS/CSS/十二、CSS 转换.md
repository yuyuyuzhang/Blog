# 十二、CSS 转换

## 1. CSS 转换

CSS 转换是`让某个元素改变形状、大小、位置`，从而对元素进行移动、缩放、转动、拉长、拉伸

## 2. CSS 2D 转换

```js
transform-origin //设置当前元素的基点(默认中心点:50%,50%)


transform：
translate(xpx,ypx) //当前元素移动指定距离
scale(xn,yn)       //当前元素宽高缩放指定倍数
rotate(deg)        //当前元素旋转指定角度(以基点顺时针旋转 deg 角度 )
skew(xdeg,ydeg)    //当前元素倾斜指定角度
matrix(n,n,n,n,n)  //当前元素按照指定 2D 矩阵转换
```

### (1) translate(xpx, ypx)

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
    transform: translate(50px, 100px);
}
```

![translate2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/translate2.png)

### (2) scale(xn, yn)

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
    transform: scale(2, 2);
}
```

![scale2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/scale2.png)

### (3) rotate(deg)

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
    transform: rotate(45deg);
}
```

![rotate2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/rotate2.png)

### (4) skew(xdeg, ydeg)

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
    transform: skew(1deg, 0);
}
```

![skew2x](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/skew2x.mp4)

![skew2y](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/skew2y.mp4)

## 3. CSS 3D 转换

```js
perspective         //设置当前 3D 空间的透视距离
perspective-origin  //设置当前 3D 空间的消失点(默认位于中心 50% 50%)
transform-style     //设置当前元素将其 3D 空间传递给子元素(flat:2D,preserve-3d:3D)


transform-origin    //设置当前元素的基点(默认中心点:50%,50%,0)
backface-visibility //设置当前元素背向屏幕时是否可见(visible,hidden)


transform：
translate3d(xpx,ypx,zpx)                  //当前元素移动指定距离                 
scale3d(xn,yn,zn)                         //当前元素宽高缩放指定倍数
rotate3d(x,y,z,deg)                       //当前元素旋转指定角度(以基点为起点,以(x,y,z)为终点的向量为轴,按照左手定则旋转 deg 角度)
matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) //当前元素按照指定 3D 矩阵转换
```

### (1) perspective

透视距离可以看作观察者到对象的距离，透视距离越小，视觉效果越强，在父元素上设置 perspective 透视距离，那么所有子元素都可以共享相同的 3D 空间

默认 3D 空间的消失点位于 `3D 空间中心`，但也可以使用 perspective-origin 属性调整消失点位置

```css
perspective-origin: 25% 75%;
```

![perspective_origin](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/perspective_origin.png)

```html
<div class="scene">
    <div class="panel panel1"></div>
    <div class="panel panel2"></div>
</div>
```

```css
body {
    margin: 0;
    padding: 0;
}
.scene {
    width: 200px;
    height: 200px;
    padding: 50px;
    border: 1px solid black;
    perspective: 400px;
}
.panel {
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 20px;
    background-color: red;
}
.panel1 {
    transform: rotateY(45deg);
}
.panel2 {
    transform: rotateY(-45deg);
}
```

![perspective](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/perspective.png)

### (2) translate3d(xpx, ypx, zpx)

Z 轴在 3D 空间中`从前向后`，正值让元素靠近观察者，负值让元素远离观察者

```html
<div class="scene">
    <div class="panel panel1"></div>
    <div class="panel panel2"></div>
</div>
```

```css
body {
    margin: 0;
    padding: 0;
}
.scene {
    width: 200px;
    height: 200px;
    padding: 50px;
    border: 1px solid black;
    perspective: 400px;
}
.panel {
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 20px;
    background-color: red;
}
.panel1 {
    transform: translate3d(0, 0, 50px) rotateY(45deg); /* 距离观察者近 */
}
.panel2 {
    transform: translate3d(0, 0, -50px) rotateY(45deg); /* 距离观察者远 */
}
```

![translate3](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/translate3.png)

### (3) scale3d(xn, yn, zn)

```html
<div class="scene">
    <div class="panel panel1"></div>
    <div class="panel panel2"></div>
</div>
```

```css
body {
    margin: 0;
    padding: 0;
}
.scene {
    width: 200px;
    height: 200px;
    padding: 50px;
    border: 1px solid black;
    perspective: 400px;
}
.panel {
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 20px;
    background-color: red;
}
.panel1 {
    transform: scale3d(1, 1, 2) rotateY(45deg);
}
.panel2 {
    transform: scale3d(1, 1, 4) rotateY(45deg);
}
```

![scale3](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/scale3.png)

## 4. 实例

### (1) 卡片翻转

.scene 做为 3D 空间容器，.card 作为 3D 对象卡片，2 个单独的 .card__face 作为卡片的正面和背面，建议对任何 3D 变换使用相同的套路：`场景（.scene）、对象（.card）、面（.card__face）`

```html
<p>点击卡片可翻转</p>

<div class="scene">
  <div class="card">
    <div class="card-face card-face_front">front</div>
    <div class="card-face card-face_back">back</div>
  </div>
</div>
```

perspective 属性仅作用于`直接子元素`，为了让多层嵌套的子元素继承父级视角并存在于同一个 3D 空间，父级可以使用`transform-style: preserve-3d` 传递其视角，如果不设置则卡片表面将与其父级一起展平，背面的旋转将无效

```css
body {
    margin: 0;
    padding: 0;
}
.scene {
  width: 200px;
  height: 260px;
  border: 1px solid black;
  perspective: 600px; /* 设置透视距离 */
}
.card {
  width: 100%;
  height: 100%;
  position: relative; /* 给绝对定位的子元素以参考点 */
  cursor: pointer;
  transition: transform 1s; /* 设置过渡以查看 3D 转化效果 */
  transform-style: preserve-3d; /* 将 3D 视角和空间传递给子元素 */
}
.card.is-flipped {
  transform: rotateY(-180deg);
}
.card-face {
  position: absolute; /* 绝对定位 */
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* 背面隐藏 */
  backface-visibility: hidden;
  text-align: center;
  line-height: 260px;
  font-weight: bold;
  font-size: 40px;
  color: white;
}
.card-face_front {
  background: red;
}
.card-face_back {
  background: blue;
  transform: rotateY(180deg);
}
```

```js
const card = document.querySelector('.card');
card.addEventListener('click', () => {
  card.classList.toggle('is-flipped');
});
```

![card](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/card.mp4)

### (2) 立方体

立方体是一个真正的 3D 对象，具有 6 个面

```html
<div class="scene">
  <div class="cube">
    <div class="cube-face cube-face_front">front</div>
    <div class="cube-face cube-face_back">back</div>
    <div class="cube-face cube-face_right">right</div>
    <div class="cube-face cube-face_left">left</div>
    <div class="cube-face cube-face_top">top</div>
    <div class="cube-face cube-face_bottom">bottom</div>
  </div>
</div>
<p class="radio-group">
  <input type="radio" name="rotate-cube-side" value="front" checked /> front
  <input type="radio" name="rotate-cube-side" value="right" /> right
  <input type="radio" name="rotate-cube-side" value="back" /> back
  <input type="radio" name="rotate-cube-side" value="left" /> left
  <input type="radio" name="rotate-cube-side" value="top" /> top
  <input type="radio" name="rotate-cube-side" value="bottom" /> bottom
</p>
```

```css
body {
  margin: 0;
  padding: 0;
}
.scene {
  width: 200px;
  height: 200px;
  border: 1px solid black;
  perspective: 400px; /* 设置透视距离 */
}
.cube {
  width: 200px;
  height: 200px;
  position: relative; /* 给绝对定位的子元素以参考点 */
  transition: transform 1s; /* 设置过渡以查看 3D 转化效果 */
  transform-style: preserve-3d; /* 将 3D 视角和空间传递给子元素 */
  transform: translateZ(-100px);
}
.cube-face {
  position: absolute; /* 绝对定位 */
  width: 200px;
  height: 200px;
  border: 2px solid black;
  text-align: center;
  line-height: 200px;
  font-weight: bold;
  font-size: 40px;
  color: white;
}

.cube-face_front  { background: hsla(  0, 100%, 50%, 0.7); }
.cube-face_right  { background: hsla( 60, 100%, 50%, 0.7); }
.cube-face_back   { background: hsla(120, 100%, 50%, 0.7); }
.cube-face_left   { background: hsla(180, 100%, 50%, 0.7); }
.cube-face_top    { background: hsla(240, 100%, 50%, 0.7); }
.cube-face_bottom { background: hsla(300, 100%, 50%, 0.7); }

.cube-face_front  { transform: rotateY(  0deg) translateZ(100px); }
.cube-face_right  { transform: rotateY( 90deg) translateZ(100px); }
.cube-face_back   { transform: rotateY(180deg) translateZ(100px); }
.cube-face_left   { transform: rotateY(-90deg) translateZ(100px); }
.cube-face_top    { transform: rotateX( 90deg) translateZ(100px); }
.cube-face_bottom { transform: rotateX(-90deg) translateZ(100px); }

.cube.show-front  { transform: translateZ(-100px) rotateY(   0deg); }
.cube.show-right  { transform: translateZ(-100px) rotateY( -90deg); }
.cube.show-back   { transform: translateZ(-100px) rotateY(-180deg); }
.cube.show-left   { transform: translateZ(-100px) rotateY(  90deg); }
.cube.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
.cube.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }
```

```js
const cube = document.querySelector('.cube');
const radioGroup = document.querySelector('.radio-group');
let currentClass = '';

function changeSide() {
  const checkedRadio = radioGroup.querySelector(':checked');
  const showClass = 'show-' + checkedRadio.value;
  if (currentClass) {
    cube.classList.remove(currentClass);
  }
  cube.classList.add(showClass);
  currentClass = showClass;
}

changeSide();

radioGroup.addEventListener('change', changeSide );
```

![cube](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/cube.mp4)
