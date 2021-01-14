# 三、Window对象

[[_TOC_]]

window 对象表示`浏览器窗口`，浏览器中 window 对象具有双重角色，既是通过 JS 访问浏览器窗口的一个接口，又是 ES 中规定的 `Global对象`，因而全局作用域中声明的变量和函数都是 window 对象的属性和方法

## 1. Window对象属性

```javascript
组件属性：
window.locationbar      //返回窗口的地址栏对象
window.menubar          //返回窗口的菜单栏对象
window.scrollbars       //返回窗口的滚动条对象
window.statusbar        //返回窗口的状态栏对象
window.toolbar          //返回窗口的工具栏对象
window.personalbar      //返回窗口用户安装的个人工具栏对象
原理属性：
window.console          //指向console对象
window.document         //指向document对象
window.screen           //指向screen对象
window.navigator        //指向Navigator对象
window.URL              //指向URL对象
window.URLSearchParams  //指向URLSearchParams对象
window.location         //指向location对象
window.history          //指向history对象
window.Natification     //指向Natification对象
应用属性：
window.arrayBuffer      //指向ArrayBuffer对象
window.blob             //指向Blob对象
window.file             //指向File对象
window.fileList         //指向FileList对象
window.fileReader       //指向FileReader对象
window.formData         //指向FormData对象
存储属性：
document.cookie         //指向cookie
window.sessionStorage   //指向SessionStorage对象
window.localStorage     //指向LocalStorage对象
window.indexedDB        //指向IndexedDB对象
状态信息属性：
window.status           //返回浏览器状态栏的文本
window.name             //返回字符串,表示当前窗口名字,主要用于配合超链接和表单的target属性使用
window.closed           //返回布尔值,表示当前窗口是否关闭
window.isSecureContext  //返回布尔值,表示当前窗口是否处于加密环境,https协议则是加密,否则不是
window.devicePixelRatio //返回数值,表示一个CSS像素由多少个物理像素组成,数值大表示用户正在使用高清屏幕
窗口属性：
window.frames           //返回当前文档所有框架构成的类数组对象
window.length           //返回当前文档包含的框架总数
window.frameElement     //返回当前窗口所在的元素节点
window.self             //返回当前窗口(只读)
window.top              //返回当前窗口的顶层窗口
window.parent           //返回当前窗口的父窗口,没有则返回自身
window.opener           //返回打开当前窗口的窗口,没有则返回null
位置大小属性：
window.innerWidth       //返回文档在当前窗口中可见部分的宽度(包括滚动条)
window.innerHeight      //返回文档在当前窗口中可见部分的高度
window.outerWidth       //返回当前窗口的宽度(包括浏览器菜单和边框)
window.outerHeight      //返回当前窗口的高度
window.pageXOffset      //返回文档的当前水平滚动距离
window.pageYOffset      //返回文档的当前垂直滚动距离
window.screenX          //返回浏览器窗口左上角相对当前屏幕左上角的水平距离
window.screenY          //返回浏览器窗口左上角相对当前屏幕左上角的垂直距离
```

## 2. Window对象方法

```javascript
对话框方法：
window.alert()                                  //通知对话框,仅含确定按钮,通知用户某些信息,无返回值
window.confirm()                                //征询对话框,包含确定取消按钮,征询用户是否同意
window.prompt()                                 //输入对话框,包含输入框和确定取消按钮,获取用户输入数据用户点击"确定"返回输入值
window.print()                                  //打印对话框
定时器方法：
window.setTimeout(f,t,...)                      //返回定时器编号,t毫秒后执行一次回调函数f,其他参数将依次传入回调函数
window.setInterval(f,t,...)                     //返回定时器编号,每隔t毫秒执行一次回调函数f
window.clearTimeout(tId)                        //无返回值,清除编号tId表示的setTimeout定时器
window.clearInterval(tId)                       //无返回值,清除编号tId表示的setInterval定时器
新窗口方法：
window.open(url,name,features)                  //返回并打开一个浏览器窗口,url为新窗口中文档地址,name为新窗口名字,
                                                //features为新窗口参数,新窗口已存在则沿用以前参数
window.close()                                  //无返回值,关闭当前由window.open()打开的窗口
window.stop()                                   //无返回值,停止加载当前窗口
文档滚动方法：
window.scrollTo(x,y)                            //无返回值,滚动当前文档到指定坐标(x,y)
window.scrollBy(x,y)                            //无返回值,滚动当前文档指定水平位移x,垂直位移y
窗口移动方法：
window.moveTo(x,y)                              //无返回值,移动当前窗口至指定坐标(x,y),屏幕左上角为圆心
window.moveBy(x,y)                              //无返回值,移动当前窗口指定水平位移量x,垂直位移量y
窗口缩放方法：
window.resizeTo(x,y)                            //无返回值,缩放当前窗口至指定宽高
window.resizeBy(x,y)                            //无返回值,缩放当前窗口指定水平位移量x,垂直位移量y
焦点方法：
window.focus()                                  //无返回值,当前窗口获得焦点(位于其他窗口之前),触发focus事件
window.blur()                                   //无返回值,当前窗口失去焦点,触发blur事件
推迟方法：
window.requestAnimationFrame(callback)          //返回整数n,推迟callback到浏览器下次重流时执行
window.requestIdleCallback(callback,options)    //返回整数n,推迟callback到系统资源空闲时执行,配置对象options仅timeout属性,
                                                //指定推迟执行的最大毫秒数
window.cancelAnimationFrame(n)                  //无返回值,取消callback的执行,n为requestAnimationFrame()返回值
window.cancelIdleCallback(n)                    //无返回值,取消callback的执行,n为requestIdleCallback()返回值
通信方法：
window.postMessage(msg,targetOrigin,[transfer]) //无返回值,安全地实现跨域通信
window.EventSource(url,config)                  //返回EventSource实例,浏览器与服务器建立SSE连接
window.WebSocket(url)                           //返回WebSocket实例,浏览器与服务器建立WebSocket连接
```
