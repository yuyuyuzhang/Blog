# 三、Node CLI 交互

## 1. readline

Node 提供 readline 模块使 `Node CLI 程序具有交互性`

### (1) readline 模块

readline 模块提供了从可读流`逐行读取`数据的接口，readline 模块的对外接口如下

```js
定义：import readline from 'readline'
方法：readline.createInterface(options)      //返回并创建readline.Interface实例
     readline.emitKeypressEvents(stream,cb) //无返回值,使指定可写流触发与接收到的输入对应的keypress事件
     readline.clearLine(stream,dir,cb)      //返回布尔值,根据指定方向dir清除指定可写流的当前行
     readline.clearScreenDown(stream,cb)    //返回布尔值,从光标的当前位置清除指定可写流
     readline.cursorTo(stream,x,y,cb)       //返回布尔值,将光标移动到指定位置
     readline.moveCursor(stream,dx,dy,cb)   //返回布尔值,相对当前位置将光标移动指定距离

返回布尔值：
stream 希望调用代码在继续写入额外数据前等待 drain 事件被触发，返回 false，否则返回 true
```

### (2) Interface 类

```js
定义：const rl = readline.createInterface({ input,output })
属性：rl.line                         //返回正在处理的当前输入数据
     rl.cursor                       //返回相对于rl.line的光标位置
方法：控制方法：
     rl.getCursorPos()               //返回光标相对于输入提示+字符串的实际位置
     rl.pause()                      //无返回值,暂停input流
     rl.resume()                     //无返回值,恢复input流
     rl.close()                      //无返回值,关闭rl实例并放弃对input、output流的控制
     交互方法：
     rl.setPrompt(prompt)            //无返回值,设置调用rl.prompt()时写入output的提示字符串
     rl.getPrompt()                  //返回当前提示字符串
     rl.prompt(preserveCursor)       //无返回值,将配置的prompt写入到output,preserveCursor=true则不重置光标位置为0
     rl.write(data,key)              //无返回值,将data或key标识的键序列写入output,仅当output是文本终端ttf时才支持key参数,指定key则忽略data
     rl.question(query,[options],cb) //无返回值,询问用户,用户输入完成后执行cb
```

### (3) Interface 事件

```js
rl.online    //当input流接收到行尾输入(\n、\r、\r\n)时在rl上触发,通常发生在用户按下回车或返回键
rl.onhistory //当历史数组更改时在rl上触发
rl.onpause   //当input流暂停时在rl上触发
rl.onresume  //当input流恢复时在rl上触发
rl.onclose   //当input流接收到ctrl+d或调用rl.close()方法时在rl上触发
rl.onSIGINT  //当input流接收到ctrl+c时在rl上触发,若没有注册事件监听则触发pause、close事件
rl.onSIGTSTP //当input流接收到ctrl+z时在rl上触发,若没有注册事件监听则Node进程将被移动到后台
rl.onSIGCONT //当之前使用ctrl+z移动到后台的Node进程返回前台时在rl上触发
```

### (4) 实例

* config/cli_readline.js

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

* node config/cli_readline.js

  ![cli_readline]()

## 2. inquirer

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
* config/cli_inquirer.js

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

* node config/cli_inquirer.js

  ![cli_inquirer]()

### (3) 模拟 npm init 命令生成 package.json 文件

* config/cli_inquirer_init.js

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
                    fs.writeFile('./config/package.json', JSON.stringify(answers1, null, 2), (err) => {
                         if(!err){
                         console.log('package.json 文件创建成功')
                         }
                    })
               }
          })
     })
     ```

* node config/cli_inquirer_init.js

  ![cli_inquirer_init]()

  ![cli_inquirer_init_package]()
