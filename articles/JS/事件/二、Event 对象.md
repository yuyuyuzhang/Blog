# 二、Event 对象

## 1. Event 对象

事件发生以后，会产生一个  Event对象作为参数传给监听函数 listener，当事件处理程序执行完毕，Event 对象就会被`销毁`，Event 对象包含所有与事件相关的信息，比如导致事件的元素、事件类型等

```js
定义：const e = new Event(type, options);
属性：e.target                    //返回触发事件的节点
     e.currentTarget             //返回注册事件处理程序的节点
     e.type                      //返回事件类型
     e.eventPhase                //返回整数值,表示当前事件目前所处阶段(1:捕获阶段,2:目标阶段,3:冒泡阶段)
     e.bubbles                   //返回布尔值,当前事件是否会冒泡
     e.cancelable                //返回布尔值,当前事件是否可取消默认行为
     e.isTrusted                 //返回布尔值,当前事件是否由真实用户行为产生
     e.cancelBubble              //返回布尔值,当前事件是否调用过stopPropagation()
     e.defaultPrevented          //返回布尔值,当前事件是否调用过preventDefault()
     e.timeStamp                 //返回毫秒时间戳,当前事件发生的时间,相对于文档加载成功开始计算
     e.detail                    //返回数值,表示UI事件某种具体信息
方法：e.composedPath()            //返回触发当前事件的节点和冒泡经过的所有上层节点构成的数组
     e.preventDefault()          //无返回值,阻止当前事件的默认行为
     e.stopPropagation()         //无返回值,阻止事件在DOM中继续传播,作用在所有后续节点
     e.stopImmediatePropagation()//无返回值,阻止事件在DOM中继续传播,作用在当前节点及所有后续节点
```

### (1) 事件节点

* target 指向`触发事件的节点`
* currentTarget 指向`注册事件处理程序的节点`
* 事件处理程序中的 this 指向`注册事件处理程序的节点`

如下例所示，button 上没有注册事件处理程序，于是当 click 事件冒泡到了 document.body，在那里事件才真正得到处理

```html
<button id="btn">点击</button>
```

```js
const btn = document.querySelector('#btn');
document.body.addEventListener('click', function(e){
  console.log(e.target);        //<button id="btn">
  console.log(e.currentTarget); //<body>
  console.log(this);            //<body>
});
```

### (2) 通过一个函数处理多个事件

通过检测 event.type 属性，得知发生的具体事件，从而执行相应的操作

```html
<button id="btn">点击</button>
```

```js
const btn = document.querySelector('#btn');
const handler = function(e){
  switch(e.type){
    case 'click':
      console.log('click');
      break;;
    case 'mouseover':
      console.log('mouseover');
      break;
    case 'mouseout':
      console.log('mouseout');
      break;
  }
};
btn.addEventListener('click', handler);
btn.addEventListener('mouseover', handler);
btn.addEventListener('mouseout', handler);
```

### (3) 事件阶段

通过 event.eventPhase 属性可以确定事件当前正处于事件流的哪个阶段，如下例所示，首先在捕获阶段触发 document.body 上注册的事件处理程序，然后在冒泡阶段触发按钮上注册的事件处理程序，接着再触发 document.body 上注册的事件处理程序，控制台依次输出：1 2 3

```html
<button id="btn">点击</button>
```

```js
const btn = document.querySelector('#btn');
btn.addEventListener('click', function(e){
  console.log(e.eventPhase);
}, false);
document.body.addEventListener('click', function(e){
  console.log(e.eventPhase);
}, true);
document.body.addEventListener('click', function(e){
  console.log(e.eventPhase);
}, false);
```

### (4) 阻止事件默认行为

e.preventDefault() 可以阻止事件的默认行为，如下例所示，链接的默认行为是单击时会跳转到指定的 URL，而取消默认行为则不会跳转

```html
<a href="https://fanyi.baidu.com">百度翻译</a>
```

```js
const link = document.querySelector('a');
link.addEventListener('click', function(e){
  e.preventDefault();
});
```

### (5) 阻止事件继续传播

e.stopPropagation() 和 e.stopImmediatePropagation() 都可以阻止事件在 DOM 中继续传播，即事件不会再向上冒泡，而后者比前者阻止的更加彻底

```html
<button id="btn">点击</button>
```

```js
const btn = document.getElementById('btn');
btn.addEventListener('click', function(e){
  console.log(1);               //正常:1 2 3
  e.stopPropagation();          //阻止:1 2
  e.stopImmediatePropagation(); //阻止:1
});
btn.addEventListener('click', function(e){
  console.log(2);
});
document.body.addEventListener('click', function(e){
  console.log(3);
});
```
