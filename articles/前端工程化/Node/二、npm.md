# 二、npm

## 1. npm

npm 是随 Node 一起安装的包管理工具，能解决 Node 代码部署的很多问题

* 允许用户从 npm 服务器下载别人编写的`第三方包/命令行程序`到本地使用
* 允许用户将自己编写的`第三方包/命令行程序`上传到 npm 服务器供别人使用

## 1. npm 命令

### (1) 安装模块

* 全局安装：npm install moduleName -g（安装到 Node 安装目录的 node_global 文件夹的 node_modules 目录下）
* 本地安装：npm install moduleName（安装到项目代码的 node_modules 目录下）
* 查看安装信息：npm list -g

### (2) 卸载模块

* npm uninstall moduleName

### (3) 更新模块

* npm update moduleName

### (4) 搜索模块

* npm search moduleName
