# 三、Node 模块系统

## 1. Node 模块

### (1) Node 模块名

* Node 模块的扩展名可以是 `.js .json .node`，.node 扩展名表示`编译好的二进制文件`

### (2) Node 模块优先级

* Node 原生模块 > node_modules 文件夹模块 > 其他外部模块

### (3) Node 模块加载

* **模块名**：用于加载 `Node 原生模块`和 `node_modules 文件夹模块`

  ```node
  const http = require('http')
  ```

* **模块路径**：用于加载`其他外部模块`
  * 相对路径
  * 绝对路径

  ```node
  const circle = require('./circle.js')
  ```

当我们尝试通过模块名加载一个自定义的 http 模块，Node 会首先加载原生 http 模块，除非修改自定义 http 模块名或者使用路径加载

## 2. ES6 modules

详见 [ES6 modules](https://github.com/yuyuyuzhang/Blog/blob/master/articles/JS/ES6/%E5%8D%81%E4%B8%80%E3%80%81%E6%A8%A1%E5%9D%97.md)

## 3. CommonJS

### (1) CommonJS 规范

JS 文件和模块间具有`一一对应`的关系

* 模块名是`字符串`，可能包含`斜杠（路径）`
* 模块必须明确指出需要对外暴露的`功能接口`
* 所有代码都运行在`模块作用域`，不会污染全局作用域，模块内的变量都是`私有`的
* 模块加载顺序按照`在代码中出现的顺序`

### (2) module 对象

每个模块都有一个 module 对象，代表当前模块

```node
module.id       //返回当前模块id
module.filename //返回当前模块名
module.path     //返回当前模块路径
module.paths    //返回当前模块的搜索路径数组
module.loaded   //返回布尔值,当前模块是否加载完成
module.exports  //返回当前模块的输出接口
module.parent   //返回调用当前模块的模块,入口脚本通过node调用则module.parent=null
module.children //返回当前模块加载的其他模块
```

### (3) module.exports

module.exports 用于指定当前模块的输出接口

```node
// webpack.config.js
module.exports = (env, argv) => {
  const config = {
    target: 'web',
  }
  return config
}
```

### (4) require()

require() 函数用于加载指定模块并返回该模块的 `module.exports`，未发现指定模块则报错，require() 函数加载规则如下

* 参数以 / 开头：以绝对路径加载模块
* 参数以 ./ 开头：以相对路径加载模块
* 参数以其他开头：加载 `Node 原生模块`和 `node_modules 文件夹模块`

require() 函数及其辅助方法

```node
require.resolve()  //返回解析后的绝对路径的模块名
require.main       //返回入口（主模块）
require.cache      //返回所有缓存模块
require.extensions //根据模块后缀名调用不同执行函数
```

CommonJS 模块的加载机制是`输出值的拷贝`，某个模块一旦输出某个值，该模块内部的变化就无法影响到这个值

* count.js

  ```node
  let count = 1;
  const incCount = () => count++;

  module.exports = {
      count,
      incCount
  }
  ```

* index.js

  ```node
  const { count, incCount } = require('./count.js')

  console.log(count) //1
  incCount()
  console.log(count) //1，count 模块内部的变化无法影响输出的变量
  ```

### (5) 模块缓存

Node 仅在初次加载 CommonJS 模块时执行一次，之后再次加载都是直接从缓存中读取该模块的 `module.exports` 属性，想要每次加载时都执行某个模块，有以下 2 种方式

* 让模块输出一个函数

  ```node
  // webpack.config.js
  module.exports = (env, argv) => {
    const config = {
      target: 'web',
    }
    return config
  }
  ```

* 每次加载之前删除模块缓存

  ```node
  //删除指定模块缓存
  delete require.cache(moduleName) 

  //删除所有模块缓存
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache(key);
  })
  ```

### (6) 全局变量

CommonJS 模块规范支持以下 2 个全局变量，ES6 modules 不支持

* **__dirname**：当前模块的目录名
* **__filename**：当前模块的文件名（包含目录的绝对路径）

在 E:\Blog\demos\后端服务应用\Node\CommonJS 目录下运行 node index.js

```node
console.log(__dirname);  //"E:\Blog\demos\后端服务应用\Node\CommonJS"
console.log(__filename); //"E:\Blog\demos\后端服务应用\Node\CommonJS\index.js"
```

## 4. Node 包管理工具（Node Package Manager，npm）

### (1) npm

开发人员热衷于将自己开发的模块上传到 Github 或其他软件源上供其他开发者使用，我们需要下载模块源码并安装到应用环境上才可以使用，绝大多数模块都提供了简单的安装和使用说明，但更简单的安装和管理模块的方式是使用 Node 包管理工具（Node Package Manager，npm）

### (2) npm 命令

npm 常用命令如下

* 安装模块
  * 全局安装：安装到 Node 安装目录的 node_global 文件夹的 node_modules 目录
    * npm i moduleName -g
  * 本地安装：安装到项目代码的 node_modules 目录
    * npm i moduleName -D  安装为开发环境依赖
    * npm i moduleName     安装为生产环境依赖
  * 安装版本
    * npm i moduleName 1.2.2   安装指定版本
    * npm i moduleName ~1.2.2  安装1.2.x最新版本
    * npm i moduleName ^1.2.2  安装1.x.x最新版本
    * npm i moduleName latest  安装最新版本
* 卸载模块
  * npm uni moduleName
* 更新模块
  * npm update moduleName
* 搜索模块
  * npm search moduleName
* 发布模块
  * npm publish moduleName
* 撤销发布模块
  * npm unpublish moduleName
* 查看模块
  * npm ls
* 清空缓存
  * npm cache clean -f

### (3) package.json 文件

* npm init

  项目根目录下执行 npm init，自动生成 package.json 文件用于`管理当前项目的 npm 包`

* package.json - CommonJS

  ```json
  {
    "name": "node-commonjs-project",
    "version": "1.0.0",    // 大版本-次要版本-小版本
    "author": "yuyuyuzhang",
    "license": "ISC",
    "description": "a node commonJS project",
    "keywords": [
      "node",
      "commonJS"
    ],
    "main": "index.js",    // 包的入口
    "scripts": {           // npm 脚本命令
      "serve": "node index.js"
    },
    "devDependencies": {}, // 开发环境依赖
    "dependencies": {}     // 生产环境依赖
  }
  ```

* package.json - ES6 modules

  ```json
  {
    "name": "node-module-project",
    "version": "1.0.0",
    "author": "yuyuyuzhang",
    "license": "ISC",
    "description": "a node project",
    "keywords": [
      "node",
      "ES6 modules"
    ],
    "type": "module",      // ES6 modules
    "main": "index.js",    // 包的入口
    "scripts": {           // npm 脚本命令
      "serve": "node index.js"
    },
    "devDependencies": {}, // 开发环境依赖
    "dependencies": {}     // 生产环境依赖
  }
  ```

### (4) 发布自定义模块

* npm publish
