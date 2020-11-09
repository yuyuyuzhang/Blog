# 二、SASS、CSS @import 区别

## 1. CSS @import

CSS 仅推荐使用 link 标签，不推荐使用 @import

* link 是 HTML 标签，没有兼容性问题，@import 是 CSS3 新增语法，低版本浏览器不支持
* link 加载 HTML 页面的同时加载，@import 是引用的 CSS 文件加载完后加载
* @import 会产生一个新的 HTTP 请求，消耗服务器资源
* 

## 2. SASS @import

* 导入 SASS 文件：导入的 SASS 文件的文件名必须以`下划线 _` 开头
  * a.scss

    ```scss
    @import "_b.scss";
    div {
        background-color: blue;
    }
    ```

  * _b.scss

    ```scss
    div {
        color: black;
    }
    ```

  * sass a.scss a.css

    最终所有 SASS 文件会被编译成一个 CSS 文件，包含所有 SASS 文件代码

    ![sass_@import]()

* 导入 CSS 文件：效果等同于 `CSS 的 @import`
  * a.scss

    ```scss
    @import "b.css";
    div {
        background-color: blue;
    }
    ```

  * b.css

    ```css
    div {
        color: black;
    }
    ```

  * sass a.scss a.css

    最终只会将 SASS 文件编译成一个 CSS 文件，导入的 CSS 文件仍然是单独的 CSS 文件，需要进行单独的 HTTP 请求

    ![css_@import]()

## 3. SASS

SASS 原本是没有花括号的缩进语法，但是对于熟悉 CSS 的前端人员不友好，因此 SASS 3 改成了花括号语法的 SCSS（Sassy CSS），因此 SASS 和 SCSS 没有区别，可以说 SCSS 是 SASS 的一种升级
