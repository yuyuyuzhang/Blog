# 三、CSS 选择器

## 1. CSS 组合选择器

```js
相邻后续兄弟选择器  +    //选择指定元素之后紧邻的第一个兄弟元素
普通后续兄弟选择器  ~    //选择指定元素之后的所有兄弟元素

直接子元素选择器    >    //选择指定元素的
后代选择器         空格  //选择指定元素的
```

### (1) 后续兄弟选择器

```html
<p>我是1</p>
<div>我是小可爱</div>
<p>我是2</p>
<p>我是3</p>
```

```css
div+p {
    color: red;
}
div~p {
    background-color: blue;
}
```

![后续兄弟选择器]()

### (2) 后代选择器

```html
<div>
  <p>我是小可爱1</p>
  <span><p>我是小可爱2</p></span>
</div>
```

```css
div>p {
    color: red;
}
div p {
    background-color: blue;
}
```

![后代选择器]()

## 2. CSS 属性选择器

```js
属性选择器      [attribute]            //匹配包含指定属性的所有元素
属性单值选择器  [attribute=value]      //匹配指定属性等于 value 的所有元素
属性多值选择器  [attribute*=value]     //匹配指定属性包含 value 的所有元素
               [attribute~=value]     //匹配指定属性包含独立单词 value 的所有元素
               [attribute|=value]     //匹配指定属性等于 value 或者等于 value-xxx 的所有元素
               [attribute^=value]     //匹配指定属性以 value 开头的所有元素
               [attribute$=value]     //匹配指定属性以 value 结尾的所有元素
```

```html
<p title="cut">我是小可爱</p>
<p title="aaacutaaa">我是小可爱</p>
<p title="aaa cut aaa">我是小可爱</p>

<p title="cut-aaa">我是小可爱</p>
<p title="aaa-cut">我是小可爱</p>

<p title="cutaaa">我是小可爱</p>
<p title="aaacut">我是小可爱</p>
```

```css
p[title*=cut] {
    text-decoration: underline;
}
p[title~=cut] {
    font-size: 20px;
}
p[title|=cut] {
    font-weight: bold;
}
p[title^=cut] {
    color: red;
}
p[title$=cut] {
    background-color: blue;
}
```

![属性选择器]()
