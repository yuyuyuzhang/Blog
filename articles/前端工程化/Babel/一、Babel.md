# 一、Babel

## 1. Babel 原理



### (1) 语言处理程序

计算机硬件只能识别和处理`机器语言`，因此任何由其他语言编写的程序都必须由`语言处理程序`翻译成机器语言后才能由计算机硬件执行和处理

* **编译程序**：编译程序将`编译型语言`编写的源程序`全部编译`成机器语言的目标程序，然后再执行目标程序，只要源程序不变就无需重新编译
  * **编译型语言**：C、C++、Java
* **解释程序**：解释程序对`解释型语言`编写的源程序`边解释边执行`，解释一句执行一句
  * **解释型语言**：JavaScript、Python、Shell、SQL
  * **脚本语言**：解释型语言也被称为脚本语言

JS 是`解释型语言`，由 `JS 引擎`对 JS 源代码`边解释边执行`，解释一句执行一句，因此寻找 JS 源代码的错误只能`在执行过程中不断调试`

ESLint 可以让程序员在`编码过程`中发现问题，ESLint 使用 `Node` 编写，这样既可以有一个快速的运行环境也便于安装

### (2) 浏览器组成

浏览器的主要组件有以下 7 个

* **用户界面**：包括地址栏、前进/后退按钮、书签菜单等，除了标签页以外，浏览器显示的其他部分都属于用户界面
* **浏览器引擎**：负责在用户界面和渲染引擎之间传送指令
* **渲染引擎**：负责渲染和显示网页
* **网络**：负责网络调用以请求各种资源，例如 HTTP 请求
* **JS 引擎（JS 解释器）**：负责`解释和执行 JS 代码`，例如 Chrome V8 引擎
* **用户界面后端**：负责绘制浏览器的窗口小部件，例如组合框和窗口，底层使用了操作系统的用户界面方法
* **数据存储**：负责浏览器在`客户端本地磁盘`上存储各种数据，例如 Cookie、SessionStorage、LocalStorage、IndexedDB

### (3) Chrome V8 引擎解释和执行 JS 代码

Chrome V8 引擎解释和执行 JS 代码阶段如下

* **Parse**：`V8 引擎`将 JS 代码转换成 `AST 抽象语法树`
  * **词法分析**：将 JS 源代码拆分成最小的、不可再分的`词法单元（token）`，忽略空格

    ```javascript
    var x = 1;
    ```

    ```javascript
    分解成 5 个词法单元：var、a、=、1、;
    ```

  * **语法分析**：将词法单元转换成一个由元素逐级嵌套所组成的代表程序语法结构的 `AST 抽象语法树`

    ```json
    {
      "type": "Program",
      "start": 0,
      "end": 10,
      "sourceType": "module",
      "body": [
        {
          "type": "VariableDeclaration",
          "start": 0,
          "end": 10,
          "kind": "var",
          "declarations": [
            {
              "type": "Indentifier",
              "start": 4,
              "end": 9,
              "id": {
                "type": "Indetifier",
                "start": 4,
                "end": 5,
                "name": "a"
              },
              "init": {
                "type": "Literal",
                "start": 8,
                "end": 9,
                "value": 1,
                "raw": 1
              }
            }
          ]
        }
      ]
    }
    ```

* **Ignition**：`Ignition 解释器`将 AST 转换成`字节码`
* **TurboFan**：`TurboFan 编译器`将字节码优化为可执行的`机器码`
* **Orinoco**：`V8 引擎`进行垃圾回收，释放内存

### (4) AST 抽象语法树

AST 在实际工作中应用场景大致有如下几个

* ESlint：ESLint 使用 espree 来解析 JS 代码来生成 AST 抽象语法树，然后`使用 AST 分析代码模式`
* Babel：V8 引擎将 ES6 源码转换成 ES6 AST，Babel 将其转换成 ES5 AST，最后生成 ES5 源码
* JS 反编译
* 关键词匹配
* 代码高亮
* 代码压缩

## 2. Babel 安装

* 配置 ESLint 时已安装 @babel/core、@babel/eslint-parser

* npm i 

## 3. Babel 配置

* **@babel/core**：转换 ES6 代码的核心方法
* **@babel/preset-env**：babel 是插件化的，什么插件都不配，输入输出就是一样的，因此需要配置插件来转换 `ES6 标准语法`，@babel/preset-env 是一个`智能预设`，处理 ES6 规范语法的插件集合，会按需加载需要的插件
* **@babel/polyfill**：babel 默认只会转换 ES6 标准语法，不会转换 Promise 等新增的全局 API，@babel/polyfill 负责转换新增 API
* **@babel/plugin-transform-runtime**：babel 转换复杂语法例如 class 等时会引入一些 helper 函数，@babel/plugin-transform-runtime 负责将这些 helper 函数抽离到一个公共包，用到的地方只需要引入对应函数，从而减少代码量
