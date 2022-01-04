# 一、Babel

## 1. Babel 原理

Babel 是一个开源的 JS 语法转换工具，将 ES6 源码转换成可以被低版本浏览器识别的 ES5 源码，`V8 引擎将 ES6 源码转换成 ES6 AST，Babel 将 ES6 AST 转换成 ES5 AST，最后生成 ES5 源码`

### (1) 浏览器组成

浏览器的主要组件有以下 7 个

* **用户界面**：包括地址栏、前进/后退按钮、书签菜单等，除了标签页以外，浏览器显示的其他部分都属于用户界面
* **浏览器引擎**：负责在用户界面和渲染引擎之间传送指令
* **渲染引擎**：负责渲染和显示网页
* **网络**：负责网络调用以请求各种资源，例如 HTTP 请求
* **JS 引擎**：负责`解释和执行 JS 源码`，例如 Chrome V8 引擎
* **用户界面后端**：负责绘制浏览器的窗口小部件，例如组合框和窗口，底层使用了操作系统的用户界面方法
* **数据存储**：负责浏览器在`客户端本地磁盘`上存储各种数据，例如 Cookie、SessionStorage、LocalStorage、IndexedDB

### (2) Chrome v8 引擎架构

Chrome v8 引擎架构如下

![v8引擎架构]()

* **Parse**：负责将 JS 源码转换成 `AST 抽象语法树`
  * **词法分析**：将 JS 源码拆分成最小的、不可再分的`词法单元（token）`，忽略空格

    ```js
    var x = 1;
    ```

    ```js
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

* **Ignition（解释器）**：负责将 AST 抽象语法树转换成`字节码`
  * Ignition 解释器生成的字节码是介于 AST 抽象语法树和机器码之间的一种代码，需要将其转换成机器码之后才能执行，字节码可以理解为机器码的一种抽象
* **TurboFan（编译器）**：负责将字节码优化为可执行的`机器码`
  * Ignition 解释器生成字节码之后，如果发现一段代码被重复多次执行，生成的字节码以及分析数据就会传给 TurboFan 编译器，TurboFan 编译器根据分析数据生成`优化`好的机器码，这样性能会更好
* **Orinoco**：负责`垃圾回收`，释放不再需要的内存控件

### (3) AST 抽象语法树

AST 抽象语法树在实际工作中应用场景大致有如下几个

* **ESlint**：ESLint 使用指定解析器解析 JS 源码生成 AST 抽象语法树，然后`使用 AST 分析代码模式`
* **Babel**：V8 引擎将 ES6 源码转换成 ES6 AST，Babel 将其转换成 ES5 AST，最后生成 ES5 源码
* JS 反编译
* 关键词匹配
* 代码高亮
* 代码压缩

## 2. Babel 使用

@babel/cli 是 `Babel 终端 Cli 工具`

* npm i @babel/core -D

  必须先安装 Babel 编译器 @babel/core，才能编译并使用 Babel

* npm i @babel/cli -D

```js
npx babel [input] -o [output] //编译 input 目录并输出到 output 文件
npx babel [input] -d [output] //编译 input 目录并输出到 output 目录

-s         //输出 SourceMap 文件
-s inline  //输出 内联 SourceMap
```

* package.json

  ```json
  "scripts": {
    "eslintFix": "eslint src --fix",
    "babel": "npx babel src -d dist"
  },
  ```

## 3. Babel 配置

### (1) @babel/core

@babel/core 是 `Babel 编译器`，被拆分成 3 个模块

* **@babel/parser**：接收 ES6 源码，进行词法分析、语法分析，生成 ES6 AST
* **@babel/traverse**：接收并遍历 ES6 AST，根据`预设 preset、插件 plugin` 进行 AST 节点的替换、删除、添加等逻操作，生成 ES5 AST
  * @babel/traverse 本身只具有`遍历 ES6 AST` 的作用，在遍历迭代的过程中可以定义回调函数，回调函数的参数提供了丰富的增、删、改、查以及类型断言的方法
  * Babel 是`完全插件化`的，想要将 ES6 AST 转换成 ES5 AST，必须使用对应语法转换功能的`插件 plugin`，如果不使用任何插件，最终结果也只是生成和 ES6 源码一模一样的代码
* **@babel/generator**：接收 ES5 AST，生成 ES5 源码

![babel_core](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Babel/babel_core.png)

#### 实例

* npm i @babel/core -D

* index.html

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Babel-project</title>
  </head>
  <body>

  <script src="src/index.js" type="module"></script>
  </body>
  </html>
  ```

* src/components/base.js

  ```js
  const unique = arr => Array.from(new Set(arr))

  export { unique }
  ```

* src/index.js

  ```js
  const [x, y, ...z] = [1]
  console.log(x, y, z)

  const f = async() => {
    return await new Promise((resolve, reject) => {
      resolve('success')
    })
  }
  f().then(val => console.log(val))

  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    getName() {
      return this.name
    }
  }
  const person = new Person('张三', 20)
  console.log(person.getName())

  import { unique } from './components/base.js'
  console.log(unique([1, 1, 2]))
  ```

* http-server

  由下图可见，代码无异常，可以正常运行

  ![babel_server](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Babel/babel_server.png)

* npm run babel

  ![dist_babel_core1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Babel/dist_babel_core1.png)

  可以看出，转换后的代码没有任何变化

  ![dist_babel_core2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Babel/dist_babel_core2.png)

### (2) @babel/plugin-*、@babel/preset-*

`@babel/plugin-*` 是 Babel 的插件机制，每个插件具有对应的转换 ES6 语法的功能

`@babel/preset-*` 是一组预设的 Babel 插件，方便对插件进行集成配置管理

预设 presets 在插件 plugins 之前执行，预设 preset 是`从后往前`执行，插件 plugins 是`从前往后`执行

* @babel/preset-env：将最新的 ES6 语法转换成 ES5 语法
* @babel/preset-typescript：将 TS 语法转换成 ES5 语法

#### 实例

* npm i @babel/preset-env -D

* .babelrc.js

  项目根目录下新建配置文件 .babelrc.js，用于配置 Babel 转换预设及插件等

  ```js
  module.exports = {
    presets: [
      ["@babel/preset-env", {
        targets: {
          chrome: 58,
          ie: 9
        },
        modules: false, // 保留 ES6 modules，不转换成其他类型模块
        debug: true,    // 保留 console.log 到输出文件
      }]
    ],
  }
  ```

* npm run babel

  可以看出目前不兼容 Promsie 等新 API

  ![dist_babel_preset_env](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Babel/dist_babel_preset_env.png)

### (3) @babel/polyfill（core-js、regenerator-runtime）

@babel/polyfill 为浏览器不支持的 `ES6 新 API 如 Promise 等`提供兼容性代码，但是从 Babel v7.4.0 开始，不建议使用 @babel/polyfill，建议使用其拆分后的 `core-js、regenerator-runtime` 代替

由于后续将要说明的插件 @babel/plugin-transform-runtime 依赖了 core-js、regenerator-runtime，因此一般不需要在项目中单独配置 core-js、regenerator-runtime，而只需要配置 @babel/plugin-transform-runtime 即可

### (4) @babel/runtime、@babel/plugin-transform-runtime

@babel/runtime 是一个`生产环境依赖插件`

@babel/plugin-transform-runtime 是一个`开发环境依赖插件`，依赖了 core-js、regenerator-runtime、@babel/runtime

预设 presets 在插件 plugins 之前执行，预设 preset 是`从后往前`执行，插件 plugins 是`从前往后`执行

* Babel 在转码过程中，会加入很多自己定义的 `helper 函数`，这些 helper 函数可能会在每个文件都被重复引用，@babel/plugin-transform-runtime 会将这些重复的 helper 函数转换成公共的、单独的依赖，节省转码后的体积
* @babel/plugin-transform-runtime 以`沙盒`的方式将 ES6 新 API 对应的全局变量转换成 core-js、regenerator-runtime 的引用

#### 实例

* npm i @babel/plugin-transform-runtime -D

* .babelrc.js

  ```js
  module.exports = {
    presets: [
      ["@babel/preset-env", {
        targets: {
          chrome: 58,
          ie: 9
        },
        modules: false,       // 保留 ES6 modules，不转换成其他类型模块
        debug: true,          // 保留 console.log 到输出文件，方便调试
        useBuiltIns: 'entry', // 按需导入 core-js 支持的 ES6 新 API
        corejs: {             // 指定 core-js 版本
          version: "3.13", 
          proposals: true 
        },          
      }]
    ],
    plugins: ["@babel/plugin-transform-runtime"],
  }
  ```

* npm run babel

  ![dist_babel_plugin_transform_runtime](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/Babel/dist_babel_plugin_transform_runtime.png)

## 4. Babel 插件开发

* **@babel/traverse**：这个插件的作用是`接收并遍历 ES6 AST`，在迭代的过程中可以定义回调函数，回调函数的参数提供了丰富的增、删、改、查以及类型断言的方法

* **@babel/types**：这个插件的作用是`查找、创建、修改、删除、AST 节点`，因为 AST 也是一个树状结构，我们可以像 JS 操作 DOM 节点一样，使用 @babel/types 对 AST 进行操作

* **@babel/template**：这个插件的作用是`将字符串代码片段转换成 AST 节点`

## 5. Webpack 集成 Babel

Webpack 提供 babel-loader 用于转换 ES6 源码

* npm i babel-loader -D

* webpack.config.js

  ```js
  const ESLintPlugin = require('eslint-webpack-plugin');

  module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /(src)/,
          use: {
            loader: 'babel-loader'
          }
        },
      ]
    }
  };
  ```
