# 十二、SVG API

## 1. SVG 概述

可缩放矢量图 SVG（Scalable Vector Graphics） 是一种`基于 XML 语法的图像格式`，其他图像格式都是基于`像素`处理，而 SVG 是`对图像的形状描述，本质上是文件，体积较小，不管放大多少倍都不会失真`

## 2. SVG 形状标签

### (1) SVG 形状标签

SVG 形状有如下 6 种：直线、折线、圆形、椭圆、矩形、多边形、路径

```html
<line x1="0" y1="0" x2="100" y2="20"/>                  //绘制直线,(x1,y1) 指定起点坐标,(x2,y2) 指定终点坐标

<polyline points="5,5 30,28 5,55"/>                     //绘制折线,points 指定每个端点坐标,端点之间空格分隔

<circle cx="25"  cy="80" r="25"/>                       //绘制圆形,(cx,cy) 指定圆心坐标,r 指定半径 

<ellipse cx="40" cy="130" rx="40" ry="20"/>             //绘制椭圆,(cx,cy) 指定椭圆中心坐标,rx ry 指定椭圆横向半径和纵向半径

<rect x="0" y="160" height="50" width="100"/>           //绘制矩形,(x,y) 指定矩形左上角端点坐标

<polygon points="50,220 100,220 150,270 75,320 0,270"/> //绘制多边形,points 指定每个端点坐标

<path d="
  M 18,3
  L 46,3
  L 46,40
  L 61,40
  L 32,68
  L 3,40
  L 18,40
  Z
"></path>                                               //绘制路径,M 表示移动到,L 表示画直线到,Z 表示闭合路径
```

### (2) 实例

```html
<svg
  id="svg"
  width="500"
  height="500">
  <line x1="0" y1="0" x2="100" y2="20" style="stroke: red;"/>

  <polyline points="5,5 30,28 5,55" style="fill: none; stroke: green; stroke-width: 3px;"/>

  <circle cx="25"  cy="80" r="25" style="fill: blue;"/>

  <ellipse cx="40" cy="130" rx="40" ry="20" style="fill: gray;"/>

  <rect x="0" y="160" height="50" width="100" style="fill: red;"/>

  <polygon points="50,220 100,220 150,270 75,320 0,270" style="fill: green;"/>

  <path d="
    M 108,3
    L 136,3
    L 136,40
    L 151,40
    L 122,68
    L 93,40
    L 108,40
    Z"></path>
</svg>
```

![svg_shape](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/svg_shape.mp4)

## 3. SVG 其他标签

### (1) SVG 其他标签

```html
<image xlink:href=""> //插入图片

<text x="" y=""> //绘制文本,(x,y) 指定文本左侧基线坐标

<g id=""></g> //组成 SVG 组,id 标识当前组

<use href="" x="" y=""/> //复制 SVG 形状,href 指定复制的形状 id,(x,y) 指定 use 标签左上角坐标

<pattern id="" patternUnits="userSpaceOnUse" width="" height=""> //自定义一个形状可被引用以平铺一个区域,id 标识该形状,patternUnits="userSpaceOnUse" 指定 pattern 宽高为实际像素值

<animate attributeName="" repeatCount="" from="" to="" dur=""> //产生动画效果,

<animateTransform> //仅针对 CSS 2D/3D 转换属性 transform,animate 标签对该属性不起作用
```

### (2) 实例

```html
<svg
  id="svg"
  width="500"
  height="500">
  <image xlink:href="./cat.jpg" style="height: 600px;"></image>
  
  <g id="circle" style="fill: green;">
    <text x="0" y="20">圆形</text>
    <circle cx="25" cy="50" r="25"></circle>
  </g>

  <g id="ellipse" style="fill: green;">
    <text x="75" y="20">椭圆形</text>
    <ellipse cx="100" cy="50" rx="25" ry="15"/>
  </g>

  <use href="#circle" x="0" y="100"/>

  <use href="#ellipse" x="0" y="100"/>

  <pattern id="a" patternUnits="userSpaceOnUse" width="40" height="40">
    <circle cx="10" cy="10" r="10" fill="#bee9e8"/>
  </pattern>
  <rect x="0" y="200" width="200" height="100" fill="url(#a)"/>

  <rect x="0" y="320" width="100" height="50" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
    <animate attributeName="width" from="100" to="500" dur="2s" repeatCount="indefinite" />
  </rect>  

  <rect x="100" y="400" width="50" height="50" fill="#4bc0c8">
    <animateTransform attributeName="transform" type="rotate" begin="0s" dur="5s" from="0 250 250" to="360 250 250" repeatCount="indefinite" />
  </rect>
</svg>
```

![svg_other](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/svg_other.mp4)

## 4. SVG DOM 使用

### (1) SVG CSS 属性

SVG 标签的 CSS 属性如下

```js
fill         //填充色
stroke       //描边色
stroke-width //边框宽度
```

### (2) SVG DOM 使用

* SVG 文件可以直接插入 HTML 网页，成为 DOM 的一部分，然后使用 CSS 和 JS 进行操作
* SVG 代码也可以写在一个独立文件中，然后使用 `<img>、<object>、<embed>、<iframe>` 等标签插入 HTML 网页
  从 iconfont 下载一个微博图片的 SVG 文件
* SVG 文件还可以转换成 Base64 编码，然后作为 Data URL 写入 HTML 网页
  在线网站上将 weibo.svg 转换成 Base64 编码
* CSS 代码也可以直接使用 SVG 文件

### (3) 实例

```css
div {
    width: 100px;
    height: 100px;
    background: url('./weiBo.svg');
    background-size: cover;
}
```

```html
<svg id="mysvg" width="100px" height="100px">
    <circle id="mycircle" cx="50" cy="50" r="50" style="fill: green;" />
</svg>

<img src="./weiBo.svg" style="width: 100px; height: 100px;" />

<img style="width: 100px; height: 100px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjUyMzM3ODcyNjk1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI5NzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj5AZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGZlZWRiYWNrLWljb25mb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUud29mZjI/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmMiIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTAzMTE1OF91Njl3OHloeGR1LndvZmY/dD0xNjMwMDMzNzU5OTQ0IikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xMDMxMTU4X3U2OXc4eWh4ZHUudHRmP3Q9MTYzMDAzMzc1OTk0NCIpIGZvcm1hdCgidHJ1ZXR5cGUiKTsgfQo8L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNOTQwLjE1NiA0NjAuODUzYy00LjIwNiAxMi45NS0xNS44MjkgMjIuMDI4LTI5LjMzMyAyMy4xMzQtMTMuNTA1IDEuMTA3LTI2LjQ1Ni02LjA4OC0zMi42NTQtMTguMDQyLTMuOTg1LTcuODYtNC44Ny0xNy4wNDctMi4xMDQtMjUuNDZoLTAuMTFjMTguMjY0LTU1Ljc4OCA1LjA5Mi0xMTctMzQuNTM2LTE2MC42MTMtMzkuNTE3LTQzLjUwMi05OS41MTItNjIuODczLTE1Ny40MDQtNTAuNTg2YTMzLjU1MyAzMy41NTMgMCAwIDEtMjUuMzQ4LTQuNjVjLTcuNDE3LTQuODctMTIuNzMtMTIuMzk3LTE0LjYxMi0yMS4wMzEtMy44NzQtMTcuOTMyIDcuNzQ5LTM1Ljc1MyAyNS45MDItMzkuNjI4IDc4LjQ4LTE2LjYwMyAxNjMuNjAzIDcuNjM4IDIyMS4yNzMgNzEuMTc1IDU3Ljg5MiA2My4zMTYgNzMuNSAxNDkuNzY2IDQ4LjkyNiAyMjUuN3oiIGZpbGw9IiNGRjk5MzMiIHAtaWQ9IjI5NzQiPjwvcGF0aD48cGF0aCBkPSJNNzA3LjE1IDMzNS45OTJjLTcuNDE3IDEuNTUtMTUuMjc2IDAuMjIyLTIxLjgwNy0zLjk4NC02LjUzLTQuMDk2LTEwLjg0Ny0xMC42MjctMTIuNjE4LTE4LjA0My0zLjMyMS0xNS40OTcgNi41My0zMC43NzMgMjIuMjQ5LTM0LjA5MyAzOS42MjctOC40MTMgODAuNjk0IDQuNzYgMTA3LjgxMyAzNC41MzYgMjguMjI3IDMwLjk5MyAzNS42NDMgNzMuMDU2IDIzLjY4OCAxMTAuMDI3LTIuMzI0IDcuMzA2LTcuNDE2IDEzLjI4My0xNC4zOSAxNi43MTUtNi44NjIgMy40MzEtMTQuODMyIDQuMDk1LTIyLjEzOCAxLjc3LTE1LjI3NS00Ljg3LTIzLjU3Ny0yMS4xNDEtMTguNTk2LTM2LjE5NWgtMC4xMWM2LjA4Ny0xOC43MDcgMS43Ny0zOS4xODUtMTEuNTEzLTUzLjc5Ny0xMy4xNzItMTQuNjExLTMzLjIwNy0yMS4wMzEtNTIuNTc4LTE2LjkzNnoiIGZpbGw9IiNGRjk5MzMiIHAtaWQ9IjI5NzUiPjwvcGF0aD48cGF0aCBkPSJNNzMyLjgzIDQ5OC45M2M1MC4zNjUgMTUuNDk4IDEwNi40ODYgNTMuMDIyIDEwNi40ODYgMTE5LjEwNSAwIDEwOS40NzQtMTU4Ljk1NCAyNDcuMjg2LTM5Ny44MjcgMjQ3LjI4Ni0xODIuMTk4IDAtMzY4LjYwMy04Ny42NjgtMzY4LjYwMy0yMzEuOSAwLTc1LjQ5MSA0OC4xNS0xNjIuNjA2IDEzMC45NDgtMjQ0Ljg1IDExMC41ODEtMTA5LjgwNiAyMzkuNjQ4LTE1OS44MzkgMjg4LjI0MS0xMTEuNTc3IDIxLjM2NCAyMS4yNTMgMjMuNDY3IDU4LjAwMiA5Ljc0MSAxMDEuOTQ3LTcuMTk1IDIyLjEzOCAyMC45MjEgOS44NTEgMjAuOTIxIDkuOTYyIDg5LjQ0LTM3LjE5MiAxNjcuNDc3LTM5LjQwNiAxOTUuOTI1IDEuMTA3IDE1LjE2NCAyMS40NzQgMTMuNzI1IDUxLjgwNC0wLjMzMiA4Ni43ODItNi40MiAxNS45NCAyLjEwMyAxOC4zNzUgMTQuNSAyMi4xMzl6IiBmaWxsPSIjRTYxNjJEIiBwLWlkPSIyOTc2Ij48L3BhdGg+PHBhdGggZD0iTTQ0MS45MzIgODEzLjYyOGMxNDUuMzM4LTE0LjI4IDI1NS42OTgtMTAyLjYxMiAyNDYuMjktMTk3LjU4NS05LjQxLTk0LjY0Mi0xMzQuOTM0LTE2MC4wNi0yODAuMzgzLTE0NS43ODEtMTQ1LjQ1IDE0LjI3OS0yNTUuNjk4IDEwMi43MjItMjQ2LjI5IDE5Ny40NzQgOS40MSA5NC44NjMgMTM0LjkzNCAxNjAuMDYgMjgwLjM4MyAxNDUuODkyeiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMjk3NyI+PC9wYXRoPjxwYXRoIGQ9Ik00NTYuNDMzIDU0My4zMThjNzEuNjE3IDE4LjM3NSAxMDguMTQ2IDg1LjQ1NCA3OC45MjMgMTUwLjU0MS0yOS42NjUgNjYuNzQ3LTExNS4wMDkgMTAyLjE2OS0xODcuNDAxIDc4LjkyMy02OS45NTgtMjIuMzYtOTkuNTEyLTkwLjk4OC02OC44NS0xNTIuNzU0IDI5Ljk5Ny02MC4zMjcgMTA4LjE0NS05NC41MzEgMTc3LjMyOC03Ni43MXoiIGZpbGw9IiMxQTFBMUEiIHAtaWQ9IjI5NzgiPjwvcGF0aD48cGF0aCBkPSJNNDAzLjYzMyA3MDEuMDU0YzEzLjgzNi0yMi40NyA2LjUzLTQ4LjI2Mi0xNi4xNjEtNTcuODkyLTIyLjQ3LTkuMjk4LTUxLjY5MyAwLjMzMi02NS41MyAyMS45MTctMTQuMDU4IDIxLjY5Ni03LjQxNiA0Ny41OTggMTQuOTQ0IDU3LjY3IDIyLjU4IDEwLjI5NSA1Mi42ODkgMC40NDMgNjYuNzQ3LTIxLjY5NXoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjI5NzkiPjwvcGF0aD48L3N2Zz4=" />

<div>小可爱</div>
```

![svg_dom](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/svg_dom.mp4)

## 5. SVG 转 Cavnas

```html
<svg id="svg" width="100px" height="100px">
    <circle id="mycircle" cx="50" cy="50" r="50" style="fill: green;" />
</svg>

<canvas id="canvas"></canvas>
```

```js
const svgDom = document.querySelector('#svg');
const svgHTML = new XMLSerializer().serializeToString(svgDom);
console.log(svgHTML)

const svgBlob = new Blob([svgHTML], { type: "image/svg+xml;charset=utf-8" });
const url = URL.createObjectURL(svgBlob);

const img = new Image();
img.src = url;
img.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
};
```

![svg_canvas](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E6%B5%8F%E8%A7%88%E5%99%A8/%E6%B5%8F%E8%A7%88%E5%99%A8%20API/svg_canvas.mp4)
