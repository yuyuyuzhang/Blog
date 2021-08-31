# 二、Node REPL

## 1. REPL

REPL（Read Eval Print Loop，交互式解释器）表示一个电脑环境，类似于 shell，可以在终端中输入命令，并接收到系统响应

## 2. Node REPL

Node 自带 REPL，可以调试 JS 代码，可以执行以下任务

* **读取**：读取并解析输入的 JS 数据结构并存储到内存
* **执行**：执行输入的 JS 数据结构
* **打印**：输出结果
* **循环**：循环执行以上三个步骤，直到退出当前终端

### (1) Node REPL 命令

* **node**：启用 Node REPL
  默认尖括号 `>` 为命令行提示符，该符号之后输入的任何内容都由底层的 V8 JS 引擎处理
    ![Node REPL 启用](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/Node%20REPL%20%E5%90%AF%E7%94%A8.png)
* **.editor**：进入编辑模式，编辑多行表达式
* **ctrl + D**：存在编辑模式则退出编辑模式，否则退出 Node REPL
* **.save fileName**：保存当前 Node REPL 会话到指定文件
* **.load fileName**：载入一个文件到当前 Node REPL 会话

### (2) Node REPL 使用

* **即时输出表达式值**：REPL（Read Eval Print Loop）的重点在于 `Eval（求值）`，而变量赋值的表达式并不会返回变量值作为表达式的值，因此在 Node REPL 中变量赋值表达式会输出 undefined
  ![变量赋值表达式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%8F%98%E9%87%8F%E8%B5%8B%E5%80%BC%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)
* **_**：下划线变量用于获取上个表达式的计算结果，还可以访问其属性或调用其方法
  ![_](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/_.png)

### (3) 多行表达式

* .editor 进入编辑模式
* 编写多行表达式
* ctrl + D 退出编辑模式
* 使用多行表达式

![多行表达式](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E5%A4%9A%E8%A1%8C%E8%A1%A8%E8%BE%BE%E5%BC%8F.png)

### (4) 保存与载入文件

* **.save**：保存当前会话为 js 文件到当前目录

  ![.save1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.save1.png)

  ![.save2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.save2.png)

* **.load**：从当前目录加载指定 js 文件到当前会话

  b.js

  ```js
  var b = 2;
  ```

  ![.load1](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.load1.png)

  ![.load2](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.load2.png)
