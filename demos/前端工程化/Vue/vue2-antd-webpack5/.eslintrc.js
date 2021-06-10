module.exports = {
  root: true,
  env: {
    'browser': true,
    'es2021': true,
    'node': true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],
  parserOptions: {
    'ecmaVersion': 12, // ES6 语法版本
    'sourceType': 'module', // ES6 模块
    'parser': '@babel/eslint-parser' // 指定解析器
  }
}
