# 零配置 Webpack 打包

* npm i webpack webpack-cli --save-dev
  
  安装 webpack-cli，由此在根目录生成 node_modules 文件夹和 package-lock.json 文件

* npx webpack
  
  从 `src/index.js` 文件开始自动打包，根据代码中的 import 操作，自动将所有用到的模块代码打包到一起

# 配置 Webpack 打包

* webpack.config.js
  
  根目录添加 `webpack.config.js` 文件，这是一个运行在 `node` 环境中的 JS 文件，该文件可以导出一个对象，通过导出对象的属性完成相应的 webpack 配置

* npx webpack
  
  重新打包
