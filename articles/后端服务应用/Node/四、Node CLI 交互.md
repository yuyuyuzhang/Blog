# 四、Node CLI 交互

## 1. Node 输出超过 2 层嵌套的对象

* JSONstringify.js

     ```js
     const obj = {
     name: 'joe',
     age: 35,
     person1: {
          name: 'Tony',
          age: 50,
          person2: {
               name: 'Albert',
               age: 21,
               person3: {
                    name: 'Peter',
                    age: 23
               }
          }
     }
     }

     console.log(obj)
     console.log(JSON.stringify(obj, null, 2))
     ```

* node JSONstringify.js

     ![Node输出超过2层嵌套的对象]()

## 2. repl 模块

### (1) repl API

Node 提供 repl 模块支持`交互式解释器`，repl 模块提供了一个`读取-评估-打印-循环（REPL）`实现，既可以作为独立程序使用，也可以包含在其他应用程序中

```js
定义：import repl from 'repl'
属性：repl.builtinModules   //返回所有 Node 模块列表
方法：repl.start({options}) //返回并创建 replServer 实例


options：
prompt //指定输入提示(默认>)
input  //指定输入流(默认 process.stdin)
output //指定输出流(默认 process.stdout)
...
```

repl 命令如下

```js
.help   //显示当前 REPL 会话命令列表
.editor //当前 REPL 会话进入编辑器模式，可输入多行表达式(Ctrl+C 退出编辑器模式)
.clear  //重置当前 REPL 会话的上下文
.load   //将指定文件加载到当前 REPL 会话(.load ./file/to/load.js)
.save   //将当前 REPL 会话保存到指定文件(save ./file/to/save.js)
.exit   //退出当前 REPL 会话(Ctrl+D)

Tab：空白行按下，显示全局和局部变量，输入时按钮，显示相关的自动完成选项
```

### (2) repl.REPLServer 类

repl 模块导出 repl.REPLServer 类表示 `repl 实例`，运行时 repl.REPLServer 的实例将`接受用户输入的单行`，根据用户定义的评估函数评估并输出结果，输入和输出可能分别来自 stdin 和 stdout，也可能连接到任何 Node 流

repl.REPLServer 支持自动补全输入、补全预览、简单的 Emacs 风格的行编辑、多行输入、类 ZSH 的反向搜索、类 ZSH 的基于子串的历史搜索、ANSI 风格的输出、保存和恢复当前 REPL 会话状态、错误恢复和可定制的评估函数，不支持 ANSI 风格和 Emacs 风格的行编辑的终端会自动回退到有限的功能集

```js
定义：import repl from 'repl'
     const replServer = repl.start()
     const replServer = new repl.REPLServer(options)
方法：replServer.clearBufferedCommand()                   //无返回值,清除任何已缓冲但尚未执行的命令
     replServer.displayPrompt([preserveCursor])          //无返回值,将 repl 配置的 promt 输出到 output 并恢复 input 接受新输入,preserveCursor=true 光标不会重置为 0
     replServer.defineCommand(keyword,param=>{})         //无返回值,自定义 repl 命令
     replServer.setupHistory(historyPath,(err,repl)=>{}) //返回并初始化 REPL 的历史日志文件,执行 Node 二进制文件并使用命令行 REPL 时默认会初始化一个历史文件,但以编程方式创建 REPL 时需要使用此方法初始化历史日志文件


事件：
exit  //退出 repl 会话时触发(.exit / CTRL+D)
reset //重置 repl 会话的上下文时触发(.clear)
```

### (3) 实例

#### ① replServer.defineCommand(keyword,{help,param=>{}})

* repl.js

     ```js
     const replServer = repl.start();
     replServer.defineCommand('sayhello', function sayhello(param) {
          this.clearBufferedCommand();
          console.log(`Hello, ${param}!`);
          this.displayPrompt();
     })
     replServer.defineCommand('saybye', function saybye () {
          console.log('Goodbye!');
          this.close();
     });
     ```

* node 环境：.load repl.js

     ![defineCommand1]()

     ![defineCommand2]()

#### ② reset 事件

* repl.js

```js
const replServer = repl.start();
const initializeContext = context => {
     context.m = 'test';
}
initializeContext(replServer.context);
replServer.on('reset', initializeContext)
```

* node 环境：.load repl.js

     ![reset事件1]()

     电脑操作系统问题，repl 不稳定，显示有错误

     ![reset事件2]()

#### ③ exit 事件

* repl.js

     ```js
     const replServer = repl.start();
     replServer.on('exit', () => {
          console.log('Received "exit" event from repl!');
          process.exit();
     });
     ```

* node 环境：.load repl.js

     ![exit事件1]()

     电脑操作系统问题，repl 不稳定，显示有错误

     ![exit事件2]()

## 3. readline 模块

### (1) readline API

Node 提供 readline 模块使 `Node CLI 程序具有交互性`，readline 模块提供了从可读流`逐行读取`数据的接口，readline 模块的对外接口如下

```js
定义：import readline from 'readline'
方法：readline.createInterface(options)      //返回并创建 readline.Interface 实例
     readline.emitKeypressEvents(stream,cb) //无返回值,使指定可写流触发与接收到的输入对应的 keypress 事件
     readline.clearLine(stream,dir,cb)      //返回布尔值,根据指定方向 dir 清除指定可写流的当前行
     readline.clearScreenDown(stream,cb)    //返回布尔值,从光标的当前位置清除指定可写流
     readline.cursorTo(stream,x,y,cb)       //返回布尔值,将光标移动到指定位置
     readline.moveCursor(stream,dx,dy,cb)   //返回布尔值,相对当前位置将光标移动指定距离

返回布尔值：
stream 希望调用代码在继续写入额外数据前等待 drain 事件被触发，返回 false，否则返回 true
```

### (2) Interface 类

```js
定义：const rl = readline.createInterface({ input, output })
属性：rl.line                         //返回正在处理的当前输入数据
     rl.cursor                       //返回相对于 rl.line 的光标位置
方法：控制方法：
     rl.getCursorPos()               //返回光标相对于输入提示+字符串的实际位置
     rl.pause()                      //无返回值,暂停 input 流
     rl.resume()                     //无返回值,恢复 input 流
     rl.close()                      //无返回值,关闭 rl 实例并放弃对 input、output 流的控制
     交互方法：
     rl.setPrompt(prompt)            //无返回值,设置调用 rl.prompt() 时写入 output 的提示字符串
     rl.getPrompt()                  //返回当前提示字符串
     rl.prompt(preserveCursor)       //无返回值,将配置的 prompt 写入到 output,preserveCursor=true 则不重置光标位置为 0
     rl.write(data,key)              //无返回值,将 data 或 key 标识的键序列写入 output,仅当 output 是文本终端 ttf 时才支持 key 参数,指定 key 则忽略 data
     rl.question(query,[options],cb) //无返回值,询问用户,用户输入完成后执行 cb
```

### (3) Interface 事件

```js
rl.online    //当 input 流接收到行尾输入 (\n、\r、\r\n) 时在 rl 上触发,通常发生在用户按下回车或返回键
rl.onhistory //当历史数组更改时在 rl 上触发
rl.onpause   //当 input 流暂停时在 rl上触发
rl.onresume  //当 input 流恢复时在 rl上触发
rl.onclose   //当 input 流接收到 ctrl+d 或调用 rl.close() 方法时在 rl 上触发
rl.onSIGINT  //当 input 流接收到 ctrl+c 时在 rl 上触发,若没有注册事件监听则触发 pause、close 事件
rl.onSIGTSTP //当 input 流接收到 ctrl+z 时在 rl 上触发,若没有注册事件监听则 Node 进程将被移动到后台
rl.onSIGCONT //当之前使用 ctrl+z 移动到后台的 Node 进程返回前台时在 rl 上触发
```

### (4) 实例

* cli_readline.js

     ```js
     import readline from 'readline'

     const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
     })

     rl.question(`姓名：`, name => {
          rl.question(`密码：`, psw => {
               console.log('登录成功')
          })
     })
     ```

* node cli_readline.js

  ![cli_readline](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/cli_readline.png)

## 4. inquirer

### (1) inquirer

inquirer 包对 Node readline 模块进行了封装，提供了更完整、更抽象的解决方案

```js
inquirer.prompt([{
  type,         //问题类型
  message,      //问题描述
  prefix,       //修改message默认前缀
  suffix,       //修改message默认后缀
  name,         //存储当前问题用户回答的变量
  default,      //默认值
  choices,      //列表选项
  validate,     //对用户回答进行校验
  filter,       //对用户回答进行过滤或转换
  transformer,  //对用户回答的显示效果进行处理(如字体、背景色等,不影响答案内容)
  when,         //根据前面的回答，判断当前问题是否需要被回答
  pageSize      //修改某些type类型下的渲染行数
}]).then(answers => {})

type：
password //密码
input    //文本输入
number   //数字输入
confirm  //布尔值确认
list     //单选
rawlist  //单选
checkbox //复选
expand   //扩展选项
editor   //编辑模式
```

### (2) 实例

* npm i inquirer
* cli_inquirer.js

     ```js
     import inquirer from 'inquirer'

     const prompts = [
          {
               type: 'input',
               message: 'name:',
               name: 'name'
          },
          {
               type: 'password',
               message: 'password:',
               name: 'pwd'
          },
          {
               type: 'input',
               message: 'phone:',
               name: 'phone',
               validate: val => /\d{11}/g.test(val)
          },
          {
               type: 'confirm',
               message: '是否学生？',
               name: 'isStu',
          },
          {
               type: 'confirm',
               message: '是否参加本次考核？',
               name: 'isJoin',
               when: answers => answers.isStu
          },
          {
               type: 'list',
               message: '请选择一种颜色：',
               name: 'color1',
               choices: [
                    'red',
                    'green', 
                    'blue'
               ],
          },
          {
               type: 'rawlist',
               message: '请选择一种颜色：',
               name: 'color2',
               choices: [
                    'red',
                    'green',
                    'blue'
               ],
          },
          {
               type: 'checkbox',
               message: '请选择一种颜色：',
               name: 'color3',
               choices: [
                    'red',
                    'green',
                    'blue'
               ],
          }
     ]

     inquirer.prompt(prompts).then(answers => {
          console.log("answers:", answers)
     })
     ```

* node cli_inquirer.js

  ![cli_inquirer](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/cli_inquirer.png)

### (3) 模拟 npm init 命令生成 package.json 文件

* cli_inquirer_init.js

     ```js
     import inquirer from 'inquirer'
     import fs from 'fs'

     const prompts = [
          {
               type: 'input',
               message: 'package name:',
               default: 'project',
               name: 'name'
          },
          {
               type: 'input',
               message: 'version:',
               default: '1.0.0',
               name: 'version'
          },
          {
               type: 'input',
               message: 'description:',
               name: 'description'
          },
          {
               type: 'input',
               message: 'entry point:',
               default: 'cli_inquirer.js',
               name: 'main'
          },
          {
               type: 'input',
               message: 'test command:',
               name: 'scripts',
               filter: val => ({ test: val })
          },
          {
               type: 'input',
               message: 'git repository:',
               name: 'repository',
               filter: val => ({
                    type: 'git',
                    url: val
               })
          },
          {
               type: 'checkbox',
               message: 'keywords:',
               name: 'keywords',
               choices: []
          },
          {
               type: 'input',
               message: 'author:',
               name: 'author'
          },
          {
               type: 'input',
               message: 'license:',
               default: 'ISC',
               name: 'license'
          }
     ]

     inquirer.prompt(prompts)
          .then(answers1 => {
               // 打印上述回答以便用户再次确认
               console.log("answers1:", answers1)

               inquirer.prompt([{
                    type: 'confirm',
                    message: 'Is this OK?',
                    name: 'OK',
                    default: true,
               }]).then(answers2 => {
                    // 生成 package.json 文件
                    if(answers2.OK){
                         // JSON.stringify(str,replace,space) 后两个参数用于格式化
                         fs.writeFile('./packageTest.json', JSON.stringify(answers1, null, 2), (err) => {
                              if(!err){
                              console.log('packageTest.json 文件创建成功')
                              }
                         })
                    }
               })
          })
     ```

* node cli_inquirer_init.js

  ![cli_inquirer_init](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/cli_inquirer_init.png)

  ![cli_inquirer_init_package](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/cli_inquirer_init_package.png)
