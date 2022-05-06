# 十 文本

## 1. CSS 字体

```js
font-family //指定字体
font-size   //指定字体大小
font-style  //指定字体样式(normal:正常,italic:使用字体的斜体,oblique:让没有斜体属性的字体倾斜)
font-weight //指定字体粗细

@font-face {
    src: url()   //加载指定字体
    font-family  //给加载的指定字体命名
}
```

### (1) 加载字体文件

```html
<span>我是小可爱</span>
```

```css
@font-face {
    font-family: 'myFont';
    src: url('./TJS.ttf');
}
span {
    font-family: 'myFont';
}
```

![font_face](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/font_face.png)

## 2. CSS 文本

```js
letter-spacing     //设置字符间距(适用于英文和中文)
word-spacing       //设置文本间距(仅适用于英文)

color              //设置文本颜色
text-indent        //设置文本首行缩进
text-align         //设置文本对齐方式(left:左对齐,right:右对齐,center:中间排列,justify:两端对齐)
text-decoration    //设置文本修饰(none:无修饰,underline:下划线,overline:上划线,line-through:中间划线)
text-shadow        //设置文本阴影(h-shadow v-shadow blur color)
text-transform     //设置文本英文字母大小写(none:标准,capitalize:首字母大写,uppercase:全大写,lowercase:全小写)

line-height        //设置文本行高
vertical-align     //设置文本的垂直对齐方式

word-wrap          //设置文本断行规则(normal:只在允许的断字点换行,break-word:允许在长单词或 URL 地址内部换行)
word-break         //设置文本断行规则(normal:浏览器默认换行规则,break-all:允许在单词内换行,keep-all:只能在半角空格或连词符处换行)
white-space        //设置文本中的空白处理方式(normal:忽略空白,pre:保留空白,pre-wrap:保留空白但正常换行,pre-line:合并空白但正常换行,nowrap:遇到 <br> 标签才换行)

overflow           //设置文本溢出元素框的处理方式(visible:内容不修剪且多余内容呈现在元素框之外,hidden:内容被修剪且多余内容隐藏,scroll:内容被修剪且浏览器显示滚动条查看多余内容,auto:如果内容被修剪则浏览器显示滚动条查看多余内容)
text-overflow      //设置文本溢出元素框的显示方式(clip:剪切文本,ellipsis:显示省略号代表修剪文本,string:显示指定字符串代表修剪文本)
```

### (1) 字符间距、文本间距

```html
<p>我是小可爱</p>
<p>I am cut girl</p>
```

```css
p {
    word-spacing: 10px;
    letter-spacing: 5px;
}
```

![word_letter_spacing](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/word_letter_spacing.png)

### (2) 文本样式

```html
<p>我是小可爱</p>
<p>I am cut girl</p>
```

```css
p {
    text-shadow: 5px 5px 2px black;
    text-transform: capitalize;
}
```

![text_shadow_transform](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/text_shadow_transform.png)

### (3) 单行文本溢出隐藏

```html
<p class="ellipsis">
  我是小可爱水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
</p>
```

```css
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis; /* 超出显示省略号 */
    white-space: nowrap; /* 显示为一行但遇到 <br> 标签会换行 */
}
.ellipsis br {
    display: none;
}
```

![ellipsis1](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ellipsis1.png)

![ellipsis2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ellipsis2.png)

### (4) 多行文本溢出隐藏

```html
<p class="ellipsis-2">
  我是小可爱水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
  水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水水<br>
</p>
```

```css
.ellipsis-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
```

![ellipsis_2](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/CSS/ellipsis_2.png)
