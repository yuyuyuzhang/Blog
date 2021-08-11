# 三、Node 模块系统

## 1. Node 模块

Node 模块系统以 CommonJS 模块系统为模式，Node 模块系统的关键在于向开发人员保证了可以和其他模块一起工作

* 模块名是`字符串`，可能包含`斜杠（路径）`
* 模块必须明确指出需要对外暴露的功能接口
* 模块内的变量都是`私有`的
* 支持 CommonJS 规范 require、module.exports

Node 模块系统的 JS 文件和模块间具有`一一对应`的关系

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

## 2. Node 模块规范

### (1) ES6 modules

参见 [ES6 modules](https://github.com/yuyuyuzhang/Blog/blob/master/articles/JS/ES6/%E5%8D%81%E4%B8%80%E3%80%81%E6%A8%A1%E5%9D%97.md)

### (2) CommonJS

#### ① require()

* **require.resolve**：负责查找指定模块但并不加载该模块，只返回文件名
* **require.cache**：负责查找并返回指定模块的所有缓存版本

当我们在相同语境中再次加载同一模块，Node 会选择从 cache 中加载该模块来优化性能，如果需要强制重新加载某个 cache 中的模块，需要先从 cache 中删除该模块再重新加载

```node
const circle = require('./circle.js') //引用方式

delete require.cache('./circle.js') //删除模块缓存
```

#### ② module.exports

将可重用的 JS 代码分离出来作为一个单独的自定义模块

## 3. Node 包管理工具（Node Package Manager，npm）

开发人员热衷于将自己开发的模块上传到 Github 或其他软件源上供其他开发者使用，我们需要下载模块源码并安装到应用环境上才可以使用，绝大多数模块都提供了简单的安装和使用说明，但更简单的安装和管理模块的方式是使用 Node 包管理工具（Node Package Manager，npm）

### (1) npm 命令

npm 常用命令如下

* 安装模块
  * 全局安装：安装到 Node 安装目录的 node_global 文件夹的 node_modules 目录
    * npm i moduleName -g
  * 本地安装：安装到项目代码的 node_modules 目录
    * npm i moduleName -D  安装为开发环境依赖
    * npm i moduleName     安装为生产环境依赖
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

### (2) package.json 文件

* npm init

  项目根目录下执行 npm init，自动生成 package.json 文件用于`管理当前项目的 npm 包`

  ```json
  {
    "name": "node-project",
    "version": "1.0.0",
    "author": "yuyuyuzhang", 
    "license": "ISC",
    "description": "a node project",
    "keywords": [
      "node"
    ],
    "type": "module",      // 模块识别为 ES6 modules（否则识别为 CommonJS 模块）
    "main": "index.js",    // 包的入口
    "scripts": {},         // npm 脚本命令
    "devDependencies": {}, // 开发环境依赖
    "dependencies": {}     // 生产环境依赖
  }
  ```

## 4. 发布自定义模块

①②③④⑤⑥⑦⑧⑨⑩
