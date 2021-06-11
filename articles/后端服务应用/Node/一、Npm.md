# 二、Npm

## 1. npm

npm 是随 Node 一起安装的包管理工具，能解决 Node 代码部署的很多问题

* 允许用户从 npm 服务器下载别人编写的`第三方包/命令行程序`到本地使用
* 允许用户将自己编写的`第三方包/命令行程序`上传到 npm 服务器供别人使用

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
* 清空缓存
  * npm cache clean -f

### (2) npm 版本号

npm 使用`语义版本号`管理代码

* **主版本号 X**：大变动且向下不兼容
* **次版本号 Y**：新增功能但向下兼容
* **补丁版本号 Z**：修复 bug

## 2. package.json

* npm init

  项目根目录下执行 npm init，自动生成 package.json 文件用于`管理和定义 npm 包`

  ```json
  {
    "name": "node-project",
    "version": "1.0.0",
    "license": "ISC",
    "author": "yuyuyuzhang", 
    "contributors": "",    // 包的其他贡献者姓名列表
    "homepage": "",        // 包的官网地址
    "repository": "",      // 包的代码仓库，svn、git
    "description": "a node project",
    "keywords": [
      "node"
    ],
    "main": "index.js",
    "scripts": {},         // npm 脚本命令
    "devDependencies": {}, // 开发环境依赖
    "dependencies": {}     // 生产环境依赖
  }
  ```
