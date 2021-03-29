# 三、FontFace API

## 1. FontFaceSet

FontFaceSet API 用于 JS 动态加载新字体文件，并检查之前动态加载的字体文件的状态

```javascript
定义：const fontfaceset = document.fonts //返回fontfaceSet实例,当前文档应用的字体
属性：fontfaceset.size   //返回动态加载的字体文件个数
     fontfaceset.status //返回加载状态(loaded...)
     fontfaceset.ready  //返回Promise实例

事件
loading      //字体加载过程中触发
loadingdone  //字体加载成功后触发
loadingerror //字体加载失败时触发
```

## 2. FontFace API

FontFace API 用来控制字体加载，浏览器原生提供 FontFace 构造函数，用来生成一个字体对象

```javascript
定义：const font = new FontFace(family,url,desc)
属性：font.family          //返回字体名
     font.status          //返回字体的加载状态(unloaded、loading、loaded、error)
     font.display         //同CSS属性font-display,指定字体加载期间如何显示
     font.style           //同CSS属性font-style
     font.weight          //同CSS属性font-weight
     font.stretch         //同CSS属性font-stretch
     font.unicodeRange    //同desc.unicodeRange属性
     font.variant         //同desc.variant属性
     font.featureSeetings //同desc.featureSeetings属性
方法：font.load()          //返回Promise实例,调用该方法真正开始加载字体

font-display：
auto     //浏览器决定
optional //前 100ms 显示不出内容，加载完成之前一直显示后备字体
block    //前 3s 显示不出内容，加载完成之前一直显示后备字体
fallback //前 100ms 显示不出内容，后 3s 显示后备字体，加载完成之前一直显示后备字体
```

## 3. 实例

```html
<p id="txt" style="font-family: 宋体;">我是小可爱</p>
<button id="btn">加载并应用字体</button>
```

```javascript
const btn = document.getElementById("btn")
btn.addEventListener('click', async e => {
  const font = new FontFace('TJS', 'url(./TJS.ttf)')
  await font.load()
  document.fonts.add(font) //将字体对象添加到页面
  document.getElementById('txt').style.fontFamily = 'TJS'
})
```
