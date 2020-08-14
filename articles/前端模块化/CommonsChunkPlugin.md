# CommonsChunkPlugin

[[_TOC_]]

## 1. CommonsChunkPlugin

CommonsChunkPlugin 主要用来提取第三方库和公共模块，避免首屏加载或者按需加载的 bundle 文件体积过大，导致加载时间过长

### (1) trunk 类型

* Webopack 的入口文件，entry trunk
* 入口文件的依赖文件，children trunk
* 通过 CommonsChunkPlugin 创建的文件，commons trunk

### (2) CommonsChunkPlugin 的配置属性

* name
* filename
* chunks
* minChunks

## 2. 不分离出第三方库和自定义公共模块

## 3. 分离出第三方库、自定义公共模块、Webpack 公共文件，但是在同一个文件中

## 4. 单独分离出第三方库、自定义公共模块、Webpack 公共文件，各自在不同文件

①②③④⑤⑥⑦⑧⑨⑩
