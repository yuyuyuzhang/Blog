# 三、Node REPL

## 1. REPL

REPL（Read Eval Print Loop，交互式解释器）表示一个电脑环境，类似于 shell，可以在终端中输入命令，并接收到系统的响应

## 2. Node REPL

Node 自带 REPL，可以调试 JS 代码，可以执行以下任务

* **读取**：读取并解析输入的 JS 数据结构并存储到内存
* **执行**：执行输入的 JS 数据结构
* **打印**：输出结果
* **循环**：循环执行以上三个步骤，直到退出当前终端

Node REPL 启用

* **node**：通过输入 node 命令来启用 Node REPL 终端

    ![Node REPL 启用](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/Node%20REPL%20%E5%90%AF%E7%94%A8.png)

Node REPL 命令

* **_**：下划线变量用于获取上个表达式的计算结果
  ![_](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/_.png)
* **.help**：列出使用命令
* **.break**：退出多行表达式
  ![.break](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/.break.png)
* **.editor**：进入编辑模式
* **.exit（ctrl+d）**：处于编辑模式则退出编辑模式，否则退出 Node REPL
* **.load fileName**：载入一个文件到当前 Node REPL 会话
* **.save fileName**：保存当前 Node REPL 会话到指定文件
