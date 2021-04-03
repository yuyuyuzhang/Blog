# 四、Rollup

[[_TOC_]]

## 1. Rollup

Rollup 是一款 ES6 Modules 打包器，与 Webpack 不同，Webpack 几乎可以打包所有类型的资源，但是 Rollup 仅仅只是一个 ES6 Modules 打包器

Rollup 诞生的目的并不是要与 Webpack 这样的工具全面竞争，其初衷只是希望能够提供一个高效的 ES6 Modules 打包器，充分利用 ES6 Modules 的各项特性，构建出结构扁平，性能出众的类库

### (1) 优点

* 输出结果更加扁平，执行效率更高
* 自动移除未引用代码
* 打包结果仍然完全可读

### (2) 缺点

* 加载第三方模块比较复杂
* 模块最终都被打包到全局中，所以无法实现热加载
* 浏览器环境中，代码拆分功能必须使用 Require.js 这样的 AMD 库

### (3) 对比 Webpack

#### ① Webpack 大而全

开发一个`应用程序`，需要引用大量第三方模块，需要热加载提高开发体验，应用程序过大必须分包，这些情况下推荐使用 Webpack

#### ② Rolup 小而美

开发一个 `JS 框架或者库`，Rollup 的优点就特别有必要，而缺点也几乎可忽略，因此很多 React、Vue 之类的框架都是使用 Rollup 作为模块打包器

## 2. 无配置打包

### (1) 安装

`npm i rollup --save-dev`
  
通过 npm 安装 rollup，会产生 node_modules 依赖文件夹和 package-lock.json 文件

![安装](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/%E5%AE%89%E8%A3%85.png))

### (2) 打包

`npx rollup entry --file path`
  
通过参数 entry 指定打包入口文件，通过参数 --file path 指定输出文件路径

Rollup 打包结果与 Webpack 相比异常简洁，几乎与手写代码一样，就是把打包过程中的各个模块按照顺序依次拼接到一起

![bundle](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/bundle.png)

## 3. 有配置打包

### (1) 配置文件

Rollup 同样支持以配置文件的方式去配置打包过程中的各项参数，我们可以在项目的根目录下新建一个 `rollup.config.js` 的配置文件

* 项目根目录添加 rollup.config.js 配置文件
  
  ```javascript
  export default {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js', //输出文件名
      format: 'es' // 输出格式
    }
  }
  ```

* npx rollup --config
  
  使用 rollup.config.js 配置文件打包

  ![打包](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/%E6%89%93%E5%8C%85.png)

### (2) 输出格式

Rollup 打包支持多种输出格式，不同的输出格式大都是为了`适配不同的运行环境`，并没有什么需要额外理解的地方，配置文件如下，同时输出所有格式下的文件

rollup.config.js

```javascript
// 所有 Rollup 支持的格式
const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system']
export default formats.map(format => ({
  input: 'src/index.js',
  output: {
    file: `dist/bundle.${format}.js`,
    format
  }
}))
```

![输出格式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/%E8%BE%93%E5%87%BA%E6%A0%BC%E5%BC%8F.png)

## 4. 插件

Rollup 自身的功能就只是 ES6 Modules 模块的合并，如果有更高级的要求，例如加载其他类型的资源文件或者支持导入 CommonJS 模块，又或是编译 ES 新特性，这些额外的需求， Rollup 同样支持使用`插件`去扩展实现

> 插件是 Rollup 唯一的扩展方式

### (1) @rollup/plugin-json

Rollup 只能加载 ES6 Modules 的 JS 模块文件，不能像 Webpack 一样加载其他类型的资源文件，`@rollup/plugin-json` 插件可以让开发者在代码中导入 JSON 文件

* npm i @rollup/plugin-json --save-dev
  
  项目安装插件

* 配置文件 rollup.config.js 中配置插件
  
  @rollup/plugin-json 模块默认导出一个插件函数，将这个`插件函数的调用结果`添加到配置对象的 plugins 数组
  
  ```javascript
  export default {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'es'
    },
    plugins: [
      json() //@rollup/plugin-json 模块导出的插件函数的调用结果
    ]
  }
  ```

* 项目代码中导入 JSON 文件
  
  配置文件中配置好插件后，就可以在项目代码中导入 JSON 文件
  
  src/index.js

  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  import { name, version } from '../json/data.json'
  console.log(name, version)
  ```

* npx rollup --config
  
  重新打包，查看 dist/bundle.js 文件
  
  ![bundle_json](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/bundle_json.png)

### (2) @rollup/plugin-node-resolve

Rollup 只能使用 ES6 Modules 通过`文件路径`加载模块，不能像 Webpack 一样通过`模块名称`直接导入模块，@rollup/plugin-node-resolve 插件可以让开发者在代码中直接使用`模块名称`导入模块

* npm i @rollup/plugin-node-resolve --save-dev
  
  项目安装插件

* 配置文件 rollup.config.js 中配置插件
  
  @rollup/plugin-node-resolve 模块默认导出一个插件函数，将这个`插件函数的调用结果`添加到配置对象的 plugins 数组

  ```javascript
  import json from '@rollup/plugin-json'
  import resolve from '@rollup/plugin-node-resolve'
  export default {
    input: 'src/index.js',
    output: {
      file: 'dist/bundle.js',
      format: 'es' // 输出格式
    },
    plugins: [
      json(),
      resolve()
    ]
  }
  ```

* 项目代码中使用`模块名称`导入模块
  
  `npm i lodash-es --save-dev` 安装 lodash-es 模块
  
  在 src/index.js 文件中使用模块名导入该模块

  ```javascript
  import createHeading from './head.js'
  const heading = createHeading()
  document.body.append(heading)

  import { name, version } from '../json/data.json'
  console.log(name, version)

  //from 后跟模块名导入
  import { camelCase } from 'lodash-es'
  console.log(camelCase('hello rollup'))
  ```

* npx rollup --config
  
  重新打包，查看 dist/bundle.js 文件，bundle.js 文件非常复杂

## 5. 动态导入

Rollup 最新版本开始支持 ES6 Modules 的 `import()` 函数动态导入，从而实现模块的动态按需加载

### (1) 动态加载

在项目代码中使用 ES6 Modules 语法 import() 函数动态加载模块

src/index.js

```javascript
import createHeading from './head.js'
const heading = createHeading()
document.body.append(heading)

import { name, version } from '../json/data.json'
console.log(name, version)

// from 后跟模块名导入
// import { camelCase } from 'lodash-es'
// console.log(camelCase('hello Rollup'))

// 存在跨域问题
import('lodash-es').then(() => {
  console.log(camelCase('hello Rollup'))
})
```

### (2) 输出目录

Rollup 会自动提取动态导入的模块到单独的 JS 文件，因此需要在配置文件中指定`输出目录`而非输出文件名

rollup.config.js

```javascript
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist_more', //输出目录
    format: 'es'
  }
}
```

![dist_more](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/dist_more.png)

![bundle_more](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/bundle_more.png)

### (3) 兼容低版本浏览器

输出格式使用 `es`，打包后得到的代码还是 ES6 Modules 的格式，如上图所示，dist_more/index.js 文件中仍然还是 `import()` 代码，这在不支持 ES6 语法的低版本浏览器中明显是不兼容的

解决办法就是修改输出格式，Rollup 支持的所有格式中只有 `amd、system` 格式支持低版本浏览器环境，以输出格式 amd 为例，配置如下

rollup.config.js

```javascript
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist_more_amd', //输出目录
    format: 'amd'
  },
  plugins: [
    json(),
    resolve()
  ]
}
```

这样打包输出的结果就是采用 AMD 标准组织的代码，但是 AMD 标准在浏览器中也不是直接支持的，还需要使用一个支持这个 AMD 标准的库来加载这些输出的模块，例如 `Require.js`

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Rollup</title>
</head>
<body>

<!-- module JS 脚本存在跨域问题 -->
<!-- <script src="src/index.js" type="module"></script> -->
<!-- <script src="dist/bundle.js"></script> -->
<!-- <script src="dist_more/index.js"></script> -->
<script src="https://unpkg.com/requirejs@2.3.6/require.js" data-main="dist_more_amd/index.js"></script>
</body>
</html>
```

![dist_more_amd](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/dist_more_amd.png)

![bundle_more_amd](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/%E5%89%8D%E7%AB%AF%E6%A8%A1%E5%9D%97%E5%8C%96/rollup/bundle_more_amd.png)
