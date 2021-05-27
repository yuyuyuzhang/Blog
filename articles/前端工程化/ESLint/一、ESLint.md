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

JS 是`解释型语言`，由 `JS 引擎`对 JS 源代码`边解释边执行`，解释一句执行一句，因此寻找 JS 源代码的错误只能`在执行过程中不断调试`

ESLint 可以让程序员在`编码过程`中发现问题，ESLint 使用 `Node` 编写，这样既可以有一个快速的运行环境也便于安装

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
    env: { // 运行环境
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['airbnb-base'], // 大厂代码风格
    parserOptions: {
      ecmaVersion: 12,      // ES 语法版本
      sourceType: 'module', // ES6 modules
    },
    rules: {}, // 自定义规则
  };
  ```

* .eslintignore

  项目根目录下新建 .eslintignore 文件，配置 ESLint 需要忽略的目录和文件

  ```eslintignore
  node_modules
  dist
  config/*.js
  src/assets
  src/public
  ```

## 3. ESLint 配置

### (1) 配置文件 .eslintrc.js

ESLint 支持`层叠配置`，例如以下项目结构

* ESLint 默认会在所有父级目录中寻找配置文件，一直向上到`根目录`
* ESLint 会使用`距离检测文件最近`的配置文件为最高优先级，父目录的配置文件优先级较低
* 一旦配置文件中有 `root: true`，ESLint 就会停止在父级目录中寻找配置文件

your-project
├── .eslintrc.js
├── lib
│ └── source.js
└─┬ tests
  ├── .eslintrc.js
  └── test.js

.eslintrc.js

```javascript
module.exports = {
  root: true, // 停止在父级目录寻找配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,      // ES 语法版本
    sourceType: 'module', // ES6 modules
  },
  rules: {},
};
```

### (2) 解析器 parser

ESLint 默认使用 `Espree` 解析器，也可以配置其他的解析器，但是必须符合以下要求

* 必须是一个 `Node 模块`，可以使用 npm 单独安装解析器包
* 必须符合 `parser interface`

即使满足以上兼容性要求，也不能保证一个外部解析器可以与 ESLint 正常配合工作，以下外部解析器可以与 ESLint 兼容

* Esprima
* @babel/eslint-parser
* @typescript-eslint/parser

以 @babel/eslint-parser 为例，配置 ESLint 解析器过程如下

* npm i @babel/core @babel/eslint-parser -D

* .eslintrc.js

  ```javascript
  module.exports = {
    root: true, // 停止在父级目录寻找配置文件
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ['airbnb-base'],
    parserOptions: {
      parser: '@babel/eslint-parser', // 配置其他解析器
      ecmaVersion: 12,                // ES 语法版本
      sourceType: 'module',           // ES6 modules
    },
    rules: {},
  };
  ```

### (3) 继承 extends

ESLint extends `指定代码风格`，值可以是以下 2 类：

* **字符串**：指定配置
* **字符串数组**：每个配置`继承`前面的配置，`ESLint 递归地扩展配置`

具体的配置如下：

* **大厂代码风格**：Airbnb、Standard、Google、XO
* **eslint:recommended**：启用 ESLint 推荐核心规则，这个集合只在 ESLint `主版本`更新
* **eslint:all**：启用 ESLint 所有核心规则，这个集合可以在 ESLint `任何版本`更新（不推荐）
* **vue**：需要下载插件 `eslint-plugin-vue`
  * npm i eslint-plugin-vue -D
* **react**：需要下载插件 `eslint-plugin-react`
  * npm i eslint-plugin-react -D

.eslintrc.js

```javascript
module.exports = {
  root: true, // 停止在父级目录寻找配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // extends: ['airbnb-base'],
  extends: ['eslint:recommended'],
  // extends: ['plugin:vue/recommended', 'eslint:recommended'],   // Vue
  // extends: ['plugin:react/recommended', 'eslint:recommended'], // React
  parserOptions: {
    parser: '@babel/eslint-parser', // 配置其他解析器
    ecmaVersion: 12,                // ES 语法版本
    sourceType: 'module',           // ES6 modules
  },
  rules: {},
};
```

### (4) 自定义规则 rules

ESLint 自定义规则 rules 是基于 `extends` 来扩展的

.eslintrc.js

```javascript
module.exports = {
  root: true, // 停止在父级目录寻找配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // extends: ['airbnb-base'],
  extends: ['eslint:recommended'],
  // extends: ['plugin:vue/recommended', 'eslint:recommended'],   // Vue
  // extends: ['plugin:react/recommended', 'eslint:recommended'], // React
  parserOptions: {
    parser: '@babel/eslint-parser', // 配置其他解析器
    ecmaVersion: 12,                // ES 语法版本
    sourceType: 'module',           // ES6 modules
  },

  //it is base on https://eslint.bootcss.com/docs/rules/
  rules: {
    'accessor-pairs': 2,
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],
    'brace-style': [2, '1tbs', {
      'allowSingleLine': true
    }],
    'camelcase': [0, {
      'properties': 'always'
    }],
    'comma-dangle': [2, 'never'],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],
    'constructor-super': 2,
    'curly': [2, 'multi-line'],
    'dot-location': [2, 'property'],
    'eol-last': 2,
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    'generator-star-spacing': [2, {
      'before': true,
      'after': true
    }],
    'handle-callback-err': [2, '^(err|error)$'],
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'new-cap': [2, {
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,
    'no-array-constructor': 2,
    'no-caller': 2,
    'no-console': 'off',
    'no-class-assign': 2,
    'no-cond-assign': 2,
    'no-const-assign': 2,
    'no-control-regex': 0,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-class-members': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-character-class': 2,
    'no-empty-pattern': 2,
    'no-eval': 2,
    'no-ex-assign': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    'no-extra-parens': [2, 'functions'],
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-func-assign': 2,
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-iterator': 2,
    'no-label-var': 2,
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': [2, {
      'max': 1
    }],
    'no-native-reassign': 2,
    'no-negated-in-lhs': 2,
    'no-new-object': 2,
    'no-new-require': 2,
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    'no-return-assign': [2, 'except-parens'],
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 2,
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [2, {
      'defaultAssignment': false
    }],
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, {
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 2,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'one-var': [2, {
      'initialized': 'never'
    }],
    'operator-linebreak': [2, 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],
    'space-before-function-paren': [2, 'never'],
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    'spaced-comment': [2, 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2,
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 2,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']
  }
};
```

## 4. ESLint 使用

* src/index.js

  ![ESLint错误](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/ESLint/ESLint%E9%94%99%E8%AF%AF.png)

* package.json

  ```json
  "scripts": {
    "fix": "eslint src --fix"
  },
  ```

* npm run fix

  ![ESLint错误修复](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/ESLint/ESLint%E9%94%99%E8%AF%AF%E4%BF%AE%E5%A4%8D.png)

## 5. VSCode 集成 ESLint

* VSCode 安装并启用 ESLint

  ![VSCode安装ESLint](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/ESLint/VSCode%E5%AE%89%E8%A3%85ESLint.png)

  ![VSCode启用ESLint](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/ESLint/VSCode%E5%90%AF%E7%94%A8ESLint.png)

* VSCode settings.json 设置 ESLint 保存自动格式化

  ```json
  {
    // Live Server https
    "liveServer.settings.https": {
      "enable": true,
      "cert": "E:\\Blog\\demos\\cert.pem",
      "key": "E:\\Blog\\demos\\key.pem",
      "passphrase": ""
    },
    // ESLint
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
  }
  ```

* src/index.js

  ![ESLint错误](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/ESLint/ESLint%E9%94%99%E8%AF%AF.png)

* `Ctrl + S` 保存文件，自动格式化代码

  ![ESLint错误修复](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/ESLint/ESLint%E9%94%99%E8%AF%AF%E4%BF%AE%E5%A4%8D.png)

## 6. Webpack 集成 ESLint

Webpack 以前使用 eslint-loader，现在已废弃改用 `eslint-webpack-plugin`

* npm i eslint-webpack-plugin -D

* webpack.config.js

  ```javascript
  const ESLintPlugin = require('eslint-webpack-plugin');

  module.exports = {
    plugins: [
      new ESLintPlugin(options)
    ],
  };
  ```
