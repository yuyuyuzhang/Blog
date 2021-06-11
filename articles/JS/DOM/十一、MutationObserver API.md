# 十一、MutationObserver API

## 1. MutationObserver API

目前用于检测页面变化的事件已不再推荐使用，而是推荐使用 MutationObserver API，MutationObserver API 用于`观察并处理 DOM 节点的变动`

* 元素节点的增减
* 元素节点的属性变动
* 元素节点的文本内容变动

### (1) 异步触发

等待当前所有 DOM 操作都结束才会执行回调函数

### (2) 集中处理

把 DOM 变动记录封装成一个`数组`集中进行处理

### (3) 多类型

既可以观察 DOM 的所有类型变动，也可以指定只观察某一类变动

## 2. MutationObserver 对象

浏览器原生提供 MutationObserver 构造函数，接受一个回调函数作为参数，该回调函数接受两个参数，第一个参数是页面变动记录数组 records，第二个参数是当前 MutationObserver 对象实例，当检测到页面变化时执行这个回调函数

> potions 配置中的基本选项均默认 false，设置基本选项中某些为 true 的情况下，可以追加使用某些特殊选项

```js
定义：const mutationObserver = new MutationObserver((records, mutationObserver) => {...});
方法：mutationObserver.observe(elem,options) //无返回值,开始观察节点elem
     mutationObserver.disconnect()          //无返回值,停止当前观察器的所有观察
     mutationObserver.takeRecords()         //返回并清除未处理的变动记录数组


options：
基本选项：
childList               //是否观察目标节点的子元素节点
attributes              //是否观察目标节点的所有属性
characterData           //是否观察目标节点的子文本节点
特殊选项：
subtree                 //childList=true,是否观察目标节点的后代节点(元素节点、文本节点)
attributeFilter         //attributes=true,用于限定目标节点被观察的属性数组
attributeOldValue       //attributes=true,是否记录目标节点变动前的属性值
characterDataOldValue   //characterData=true,是否记录目标节点变动前的子文本节点
```

## 3. MutationRecord 对象

MutationRecord 对象表示`变动记录`，包含与变动相关的所有信息

```js
定义：const records = observer.takeRecords()
属性：record.type            //返回该次变动类型
     record.target          //返回该次变动的元素节点
     record.previousSibling //返回该次变动元素节点的前一个同辈节点
     record.nextSibling     //返回该次变动元素节点的后一个同辈节点
     record.attributeName   //返回该次变动元素节点的变动属性
     record.oldValue        //返回该次变动元素节点变动前的值(attribute,characterData)
```

## 4. 实例

F12 打开控制台，控制 div 元素宽高变化时，不会触发观察器执行回调函数，因此`设置 attribute 属性并不能监听元素大小的响应式变化`

```html
<div id="block" style="border:1px solid red;width:100%;height:100px;">aaa</div>
```

```js
const div = document.getElementById('block');
const mutationObserver = new MutationObserver((records, observer) => {
  records.map(record => {
    console.log('record type: ' + record.type);
    console.log('Previous value: ' + record.oldValue);
  })
})
mutationObserver.observe(div, {
  //观察目标节点的子元素节点
  'childList': true,

  //观察目标节点的所有属性
  'attribute': true,
  'attributeOldValue': true,

  //观察目标节点的子文本节点&子元素节点
  'characterData': true,
  'characterDataOldValue': true,
  'subtree': true
})

//设置定时器方便观察变动
setTimeout(() => {
  const span = document.createElement('span');
  div.append(span);                       //第1次输出,当前元素节点增加子元素节点
  span.append('我是小可爱');               //第2次输出,当前元素节点的子元素节点的变动
  div.style.setProperty('width', '100px'); //第3次输出,当前元素节点的属性值改变
  div.firstChild.appendData('haha');      //第4次输出,当前元素节点的子文本节点内容改变
}, 1000)


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
