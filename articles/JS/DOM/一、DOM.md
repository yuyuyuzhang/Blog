# 一、DOM

[[_TOC_]]

## 1. DOM

### (1) DOM

DOM 是针对 HTML 文档的一个`应用程序编程接口`（API），浏览器根据 DOM，将 HTML 文档解析成一系列节点构成的层次化的`节点树`（DOM 树），所有的节点和最终的 DOM 树，都有`规范的对外接口`，从而允许通过 JS 对 DOM 树进行各种操作

### (2) DOM 造成的性能消耗

浏览器会为`每个标签页`单独启动一个渲染进程

渲染进程主要负责将 HTML、CSS、JS 转化为用户可以与之交互的网页，每个渲染进程都会启动单独的渲染引擎线程、JS 引擎线程、事件触发线程、定时器技术线程、异步请求线程

每次 DOM 操作都会引发线程切换，从 JS 引擎线程切换到渲染引擎线程执行 DOM 操作，然后再切换回 JS 引擎线程继续执行 JS 代码，这就带来了性能损耗，如果频繁大量切换，就会产生性能问题

## 2. DOM 级别

### (1) DOM1

主要定义HTML、XML文档的底层结构，即DOM树结构

### (2) DOM2

在DOM树的基础上引入了更多的交互能力

① 核心模块：在DOM1级基础上构建，为节点添加了更多的方法和属性

② 视图模块：为文档定义了基于样式信息的不同视图

③ 事件模块：定义了如何使用事件与DOM文档交互

④ 样式模块：定义了如何访问和改变CSS样式信息

⑤ 遍历和范围模块：定义了遍历DOM文档和选择其特定范围的新接口

**⑥** HTML模块：在DOM1级HTML基础上构建，添加了更多的属性、方法、新接口

### (3) DOM3

支持更高级的XML特性

① XPath模块

② 加载与保存模块

## 3. DOM 树

一个文档的所有节点，按照所在层级，可以抽象成一种树状结构，DOM树有一个顶层节点，下一层是顶层节点的子节点，子节点又有自己的子节点，层层衍生出一个金字塔结构，倒过来就像一棵树

```js
<!DOCTYPE html>
<html lang="en" manifest="offline.appcache">
<head>
  <meta charset="UTF-8">
  <title>index</title>
</head>
<body>
  <p>something happend</p>

  <script src="jquery 1.11.3.js"></script>
</body>
</html>
```

![DOM树](https://github.com/yuyuyuzhang/Blog/blob/master/images/JS/DOM/DOM%E6%A0%91.png)