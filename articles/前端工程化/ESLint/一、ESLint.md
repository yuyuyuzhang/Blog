# 一、ESLint

## 1. ESLint 原理

ESLint 是一个开源的 JS 代码检查工具，在 JS 代码中识别和报告`模式匹配`，目标是为了保证代码一致性和避免错误

### (1) 语言处理程序

计算机硬件只能识别和处理`机器语言`，因此任何由其他语言编写的程序都必须由`语言处理程序`翻译成机器语言后才能由计算机硬件执行和处理

* **编译程序**：编译程序将`编译型语言`编写的源程序`全部编译`成机器语言的目标程序，然后再执行目标程序，只要源程序不变就无需重新编译
  * **编译型语言**：C、C++、Java
* **解释程序**：解释程序对`解释型语言`编写的源程序`边解释边执行`，解释一句执行一句
  * **解释型语言**：JavaScript、Python、Shell、SQL
  * **脚本语言**：解释型语言也被称为脚本语言

JS 是`解释型语言`，由 `JS 引擎`对 JS 源代码`边解释边执行`，解释一句执行一句，因此寻找 JS 源代码的错误只能`在执行过程中不断调试`，而 ESLint 可以让程序员在`编码过程`中发现问题，ESLint 使用 `Node` 编写，这样既可以有一个快速的运行环境也便于安装

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

## 2. ESLint 安装

* npm i eslint -D

* ./node_modules/.bin/eslint --init

  ```javascript
  How would you like to use ESLint?
  To check syntax only
  To check syntax and find problems
  > To check syntax, find problems, and enforce code style //检查语法、查找问题、强制代码风格

  ? Where does your code run?
  > Browser
  > Node

  ? How would you like to define a style for your project?
  > Use a popular style guide // 选择大厂代码风格
  Answer questions about your style
  Inspect your JavaScript file

  ? Which style guide do you want to follow?
  > Airbnb: https://github.com/airbnb/javascript
  Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
  ```

* .eslintrc.js

  上一步骤回答完成后，会在项目根目录下自动生成 .eslintrc.js 文件

  ```javascript
  module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    rules: {},
  };
  ```

* 项目根目录下新建 .eslintignore 文件

  ```eslintignore
  node_modules
  dist
  config/*.js
  src/assets
  src/public
  ```

## 3. 

ESLint 是`完全插件化`的，每个规则都是一个插件，并且可以在运行时添加更多规则
