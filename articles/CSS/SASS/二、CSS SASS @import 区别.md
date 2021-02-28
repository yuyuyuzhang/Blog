# 二、SASS、CSS @import 区别

## 1. CSS @import

CSS 仅推荐使用 link 标签，不推荐使用 @import

* link 是 HTML 标签，没有兼容性问题，@import 是 CSS3 新增语法，低版本浏览器不支持
* link 加载 HTML 页面的同时加载，@import 是引用的 CSS 文件加载完后加载
* @import 会产生一个新的 HTTP 请求，消耗服务器资源

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

    ![sass_@import](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/SASS/sass_%40import.png)

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

    ![css_@import](https://github.com/yuyuyuzhang/Blog/blob/master/images/CSS/SASS/css_%40import.png)
