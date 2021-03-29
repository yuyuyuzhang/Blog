# 十一、MutationObserver API

[[_TOC_]]

## 1. MutationObserver 对象

目前用于检测页面变化的事件已不再推荐使用，而是推荐使用 MutationObserver 对象，MutationObserver 对象用于`观察并处理 DOM 的变动`

* 元素节点的增减
* 元素节点的属性变动
* 元素节点的文本内容变动

### (1) 异步触发

等待当前所有 DOM 操作都结束才会执行回调函数

### (2) 集中处理

把 DOM 变动记录封装成一个`数组`集中进行处理

### (3) 多类型

既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动

## 2. 创建 MutationObserver 对象

MutationObserver 对象的构造函数接受一个回调函数作为参数，当检测到页面变化时执行这个回调函数

该回调函数接受两个参数，第一个参数是页面变动记录的数组，第二个参数是当前 MutationObserver 对象实例

```javascript
const callback = function(records, observer){
  //...
}
const observer = new MutationObserver(callback);
```

## 3. MutationObserver 对象属性和方法

potions 配置中的基本选项均默认 false，设置基本选项中某些为 true 的情况下，可以追加使用某些特殊选项

```javascript
定义：const observer = new MutationObserver(callback);
方法：observer.observe(elem,options) //无返回值,启动监听,elem为要观察的元素节点,options配置要观察的特定变动
     observer.takeRecords()         //返回并清除未处理的变动记录数组
     observer.disconnect()          //无返回值,停止观察,DOM再发生变动不触发观察器

options配置：基本选项：
            childList               //是否观察目标节点的子元素节点
            attributes              //是否观察目标节点的所有属性
            characterData           //是否观察目标节点的子文本节点
            特殊选项：
            subtree                 //childList=true,是否观察目标节点的后代节点(元素节点、文本节点)
            attributeFilter         //attributes=true,用于限定目标节点被观察的属性数组
            attributeOldValue       //attributes=true,是否记录目标节点变动前的属性值
            characterDataOldValue   //characterData=true,是否记录目标节点变动前的子文本节点
```

## 4. MutationRecord 对象

MutationRecord 对象表示`变动记录`，包含与变动相关的所有信息

```javascript
属性：record.type            //返回该次变动类型
     record.target          //返回该次变动的元素节点
     record.previousSibling //返回该次变动元素节点的前一个同辈节点
     record.nextSibling     //返回该次变动元素节点的后一个同辈节点
     record.attributeName   //返回该次变动元素节点的变动属性
     record.oldValue        //返回该次变动元素节点变动前的值(attribute,characterData)
```

```html
<div id="block" style="width:20px;">abc</div>
```

```javascript
const callback = (records, observer) => {
  records.map(record => {
    console.log('record type: ' + record.type);
    console.log('Previous value: ' + record.oldValue);
  });
}
const observer = new MutationObserver(callback);

const div = document.getElementById('block');
const option = {
  //观察目标节点的子元素节点
  'childList': true,

  //观察目标节点的所有属性
  'attribute': true,
  'attributeOldValue': true,

  //观察目标节点的子文本节点&子元素节点
  'characterData': true,
  'characterDataOldValue': true,
  'subtree': true
};
observer.observe(div, option);

const span = document.createElement('span');
div.append(span);                       //第1次输出,当前元素节点增加子元素节点
span.append('我是小可爱');                //第2次输出,当前元素节点的子元素节点的变动
div.style.setProperty('width', '30px'); //第3次输出,当前元素节点的属性值改变
div.firstChild.appendData('haha');      //第4次输出,当前元素节点的子文本节点内容改变


//第1次输出
//"record type: childList"
//"Previous value: null"

//第2次输出
//"record type: childList"
//"Previous value: null"

//第3次输出
//"record type: attributes"
//"Previous value: width:20px;"

//第4次输出
//"record type: characterData"
//"Previous value: abc"
```
