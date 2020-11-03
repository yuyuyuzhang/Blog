# 一、Scss

## 1. 安装和使用

### (1) 安装

* npm install sass
* SASS 文件的后缀为 .scss，意为 `Sassy CSS`

### (2) 编译

* 编译风格
  * `expanded`：嵌套缩进的 CSS 代码
  * `compressed`：压缩的 CSS 代码（常用于`生产环境`）
* 在终端输出显示编译后的 CSS 代码：`sass test.scss`
* 保存编译后的 CSS 文件：`sass test.scss test.css`
* 指定编译风格：`sass test.scss test.css --style compressed`

### (3) 监听

* 监听：自动监听某个文件或目录，源文件有变动就自动生成编译后的版本
  * `sass --watch input.scss:output.css`
  * `sass --watch app/scss:app/css`

## 2. 基本语法

### (1) 注释

* 单行注释：只保留到 SASS 源文件，编译后被省略

    ```scss
    // comment
    ```

* 多行注释：保留到 SASS 源文件、`expanded` 编译后的 CSS 文件

    ```scss
    /*
     comment
     */
    ```

* 重要多行注释：保留到 SASS 源文件、`expanded/compressed` 编译后的 CSS 文件，通常用于`声明版权信息`

    ```scss
    /*!
     comment
     */
    ```

### (2) 嵌套

* 选择器嵌套

    ```scss
    div {
        p {
            color: red;
        }
    }
    ```

* 属性嵌套
  * 属性后面必须加`冒号 :`

    ```scss
    p {
        boder: {
            color red;
        }
    }
    ```

  * 嵌套的代码块中可以使用 `&` 引用父元素

    ```scss
    a {
        &:hover {
            color: red;
        }
    }
    ```

### (3) 计算

SASS 允许在代码中使用计算表达式

```scss
p {
    margin: 14px/2;
}
```

### (4) 变量

SASS 中变量以 `$` 开头，变量需要镶嵌在字符串中就必须写在 `#{$}` 中

```scss
$side: left;
p {
    float: $side;
    border-#{$side}-radius: 5px;
}
```

## 3. 高级用法

### (1) 条件语句

SASS 支持 `@if、@else` 条件判断

```scss
$val: 2;
p {
    @if $val === 2 {
        color: blue;
    } @else {
        color: red;
    }
}
```

### (2) 循环语句

SASS 支持 `@for、@each、@while` 循环

```scss
@for $i from 1 to 5 {
    .border-#{$i} {
        border: #{$i}px solid red;
    }
}
```

```scss
@each $i in 1, 2, 3, 4, 5 {
    .border-#{$i} {
        border: #{$i}px solid red;
    }
}
```

```scss
$i: 5;
@while  $i > 0 {
    .border-#{$i} {
        border: #{$i}px solid red;
    }
    $i: $i - 1;
}
```

### (3) 自定义函数

SASS 支持开发者编写自定义函数 `@function`

```scss
@function f($i){
    @return $i * 2;
}

p {
    width: f(10px)
}
```

## 4. 代码重用

### (1) 继承

SASS 支持一个选择器继承另一个选择器 `@extend`

```scss
.class1 {
    color: red;
}
.class2 {
    @extend .class1;
    background-color: transparent;
}
```

### (2) 混入

SASS 支持通过 `@mixin` 定义一个可重用的代码块混入，再通过 `@include` 调用这个混入，混入可以指定`参数和缺省值`

```scss
@mixin left($val: 10px) {
    float: left;
    margin-left: $val;
}

p {
    @include left(20px)
}
```

### (3) 颜色函数

SASS 提供了一些`内置的颜色函数`

### (4) 插入文件

SASS 支持通过 `@import` 引入外部文件，如果引入的是 CSS 文件，则等同于 CSS 的 `import` 命令

```scss
@import "path/filename.scss"; // 引入 SASS 文件
@import "foo.css";            // 引入 CSS 文件
```
