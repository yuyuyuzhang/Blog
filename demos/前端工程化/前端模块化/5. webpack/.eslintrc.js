module.exports = {
    "root": true, // 在当前根目录寻找配置文件
    "env": { // eslint 脚本运行环境
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended", // 启用 eslint 默认规则
    "parserOptions": {
        "ecmaVersion": 12,                // ES6 语法版本
        "sourceType": "module",           // ES6 模块
        "parser": "@babel/eslint-parser", // 指定解析器
    },
    "rules": {} // 自定义规则
};