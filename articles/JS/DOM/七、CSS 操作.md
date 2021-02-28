# 七、CSS 操作

[[_TOC_]]

## 1. 样式表

### (1) StyleSheetList 对象

StyleSheetList 对象表示`当前文档所有样式表的集合`，包含 link 元素的外部样式表和 style 元素的内联样式表

### (2) StyleSheet 对象

StyleSheet 对象表示`一张样式表`，可以是 link 元素的外部样式表或者 style 元素的内联样式表

```javascript
定义：const sheets = document.styleSheets 
     const sheet = sheets[index]
     const sheet = elem.sheet    //elem为<style>节点
属性：sheet.disabled              //返回/设置sheet的禁用状态
     sheet.ownerNode             //返回sheet所在的DOM节点
     sheet.href                  //返回sheet所在节点的href属性值
     sheet.title                 //返回sheet所在节点的title属性值
     sheet.type                  //返回sheet所在节点的type属性值
     sheet.media                 //返回MediaList实例,包含sheet所有适用媒介的集合
     sheet.cssRules              //返回CSSRuleList实例,包含sheet的所有CSS规则
     @import属性：
     sheet.parentStyleSheet      //返回指针,指向通过@import导入sheet的样式表
     sheet.ownerRule             //返回通过@import导入sheet的CSS规则
方法：sheet.insertRule(cssRule,n) //返回索引n,在sheet索引n处插入指定CSS规则
     sheet.deleteRule(n)         //无返回值,移除sheet中索引n处的CSS规则
```

```javascript
//<style id="myStyle">
//  .red {
//    color: red;
//  }
//  .big {
//    font-weight: bold;
//  }
//</style>
const style = document.getElementById('myStyle');
const sheet = style.sheet;

sheet.deleteRule(0);
sheet.insertRule('.small{fontSize: 14px;}', 0);
console.log(sheet.cssRules); //CSSRuleList {0: CSSStyleRule ".small", 1: CSSStyleRule ".big", length: 2}
```

## 2. classList 对象

classList 对象操作`元素的 class 类`，可以给元素添加删除类

```javascript
定义：const classList = elem.classList
方法：classList.add(class)      //无返回值,元素增加指定class
     classList.remove(class)   //无返回值,元素移除指定class
     classList.toggle(class)   //无返回值,元素切换指定class
     classList.contains(class) //返回布尔值,元素是否包含指定class
```

```javascript
//<div id="block" class="one"></div>
const div = document.getElementById("block");
const classList = div.classList;

classList.add('two', 'three');
classList.remove('two');
classList.toggle('three');
console.log(classList.contains('three')); //false
console.log(classList.toString());        //"one"
```

## 3. Style 对象

### (1) Style 对象

Style 对象表示`元素的 style 属性指定的所有内联样式`，但不包含与嵌入样式表或外部样式表层叠而来的样式

```javascript
定义：const style = elem.style
访问：style.css
属性：style.cssText                  //返回/设置style的css规则文本
     style.length                   //返回style声明的css规则个数
方法：style.getPropertyPriority(css) //返回style中指定css规则的important字符串
     style.getPropertyValue(css)    //返回style中指定css规则的属性值
     style.setProperty(css,value)   //无返回值,style新增指定css规则,已存在则修改
     style.removeProperty(css)      //返回并移除style中指定css规则
```

使用短划线的 CSS 属性名必须转换成`驼峰大小写`形式

```javascript
//<div id="block" style="font-size:14px;color:red;">haha</div>
const div = document.getElementById("block");
const style = div.style;

style.cssText = 'width:100px;height:50px;'; 
style.setProperty('color', 'blue');
style.removeProperty('width');
for(let i=0; i<style.length; i++){
  console.log(style[i] + ":" + style.getPropertyValue(style[i])); 
}
//输出："height:50px"  
//     "color:blue"
```

### (2) CSSStyleDeclaration 对象

CSSStyleDeclaration 对象表示`元素计算后的所有最终样式`，

文档元素的最终样式是浏览器综合各种规则计算出来的，该对象是`动态`的，任何基于样式的修改都会`实时反映`

```javascript
定义：const computedStyle = getComputedStyle(elem)
访问：computedStyle.css
属性：computedStyle.length                   //返回computedStyle声明的css规则个数
方法：computedStyle.getPropertyPriority(css) //返回computedStyle中指定css规则的important字符串
```

```javascript
//#block {
//  width:20px;
//}
//<div id="block" style="font-size:14px;color:red;">haha</div>
const div = document.querySelector('#block');
const computedStyle = getComputedStyle(div);

console.log(computedStyle.length); //280
console.log(computedStyle.width);  //"20px"
console.log(computedStyle.color);  //"rgb(255, 0, 0)"
```

## 4. CSS 规则

### (1) CSSRuleList 对象

CSSRuleList 对象表示`一组 CSS 规则`，成员都是 CSSRule 实例

### (2) CSSRule 对象

CSSRule 对象表示`一条 CSS 规则`，而一条 CSS 规则包括两部分：CSS 选择器和样式声明

```javascript
定义：const rules = sheet.cssRules
     const rule = rules[index]
属性：rule.parentStyleSheet //返回rule所在的样式表
     rule.parentRule       //返回rule的父规则
     rule.type             //返回rule的类型(1:普通规则,3:@import规则,4:@media规则,5:@font-face规则)
     rule.cssText          //返回rule的整个文本
     rule.selectorText     //返回rule的CSS选择器文本(仅针对普通规则)
     rule.style            //返回rule的样式声明文本(仅针对普通规则)
```

```html
<style id="myStyle">
  .red {
    color: red;
  }
  @media screen and (min-width: 900px) {
    .big {
      font-weight: bold;
    }
  }
</style>
```

```javascript
const styleNode = document.getElementById('myStyle');
const sheet = styleNode.sheet;
const rules = sheet.cssRules;
const rule1 = rules[0];
const rule2 = rules[1]
const rule21 = rule2.cssRules[0];

console.log(rule1.type);         //1
console.log(rule1.cssText);      //".red {color: red;}"
console.log(rule1.selectorText); //".red"
console.log(rule1.style);        //CSS2Properties {color→"red"}

console.log(rule2.type);         //4
console.log(rule2.cssText);      //"@media......"
console.log(rule2.selectorText); //undefined
console.log(rule2.style);        //undefined

console.log(rule21.cssText);              //".big {font-weight: bold;}"
console.log(rule21.parentRule === rule2); //true
console.log(rule21.parentStyleSheet);     //StyleSheet #myStyle
```
