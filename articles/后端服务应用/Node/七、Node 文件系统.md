# 七、Node 文件系统

## 1. path 模块

### (1) path 模块

path 模块用于处理`文件和目录路径`，path 模块的默认操作因运行 Node 应用程序的操作系统而异，path 模块假定使用 `Windows` 风格的路径

### (2) path API

```js
定义：import path from 'path'
属性：path.win32                     //无返回值,提供特定于Windows的path API访问(import path from 'path/win32')
     path.posix                     //无返回值,提供特定于POSIX的path API访问(import path from 'path/posix')
     path.delimiter                 //返回特定于平台的路径定界符(Windows:分号、POSIX:冒号)
     path.sep                       //返回特定于平台的路径片段分隔符(Windows:反斜杠、POSIX:斜杠)
方法：基本方法：
     path.isAbsolute(pathStr)       //返回布尔值,pathStr是否为绝对路径
     path.relative(from,to)         //返回根据当前工作目录从from到to的相对路径
     path.dirname(pathStr)          //返回pathStr目录名
     path.basename(pathStr)         //返回pathStr文件名
     path.extname(pathStr)          //返回pathStr文件扩展名
     格式化方法：
     path.parse(pathStr)            //返回pathStr解析后的pathObj对象(JS对象:具有dir,base,root,name,ext属性)
     path.format(pathObj)           //返回pathObj格式后的pathStr字符串
     规范化方法：
     path.normalize(pathStr)        //返回规范化后的pathStr
     组装路径方法：
     path.join(pathStr1,...)        //返回使用路径片段分隔符作为路径定界符将pathStr1,...连接在一起并规范化后的路径
     path.resolve(pathStr1,...)     //返回构建后的绝对路径,给定的路径序列从右到左处理,每个后续path被追加到前面,直到构建成绝对路径,处理完所有路径序列后仍未构建成绝对路径,则会附加当前工作目录的绝对路径
```

#### ① 路径定界符

* **Windows**：分号 `;`
* **POSIX**：冒号 `:`

```js
import path from 'path'

const envPath = process.env.PATH
console.log(envPath)                       // 'C:\Windows;D:\nvm\nodejs;'
console.log(envPath.split(path.delimiter)) // [ 'C:\\Windows', 'D:\\nvm\\nodejs' ]
```

#### ② 路径片段分隔符

* **Windows**：反斜杠 `\`
* **POSIX**：斜杠 `/`

```js
import path from 'path'

const envPath = process.env.PATH
console.log(envPath)                 // 'C:\Windows;D:\nvm\nodejs;'
console.log(envPath.split(path.sep)) // [ 'C:', 'Windows;D:', 'nvm', 'nodejs;' ]
```

#### ③ 基本方法

```js
import path from 'path'

console.log(path.isAbsolute('/README.md')) //true
console.log(path.isAbsolute('./index.js')) //false

console.log(path.relative('E:\\Blog\\images\\JS\\ES\\ES6_reduce.png', 'E:\\Blog\\README.md')) //'..\..\..\..\README.md'

const pathStr = 'E:\\Blog\\demos\\test.html'
console.log(path.dirname(pathStr))  //'E:\Blog\demos'
console.log(path.basename(pathStr)) //'test.html'
console.log(path.extname(pathStr))  //'.html'
```

#### ④ 格式化方法

* 存在 pathObj.dir，忽略 pathObj.root
* 存在 pathObj.base，忽略 pathObj.name、pathObj.ext

```js
import path from 'path'

const pathStr = 'E:\\Blog\\demos\\test.html'
console.log(path.parse(pathStr))
// {
//   dir: 'E:\\Blog\\demos',
//   base: 'test.html',
//   root: 'E:\\',
//   name: 'test',
//   ext: '.html',
// }

const pathObj = {
  dir: 'E:\\Blog\\demos',
  base: 'test.html',
}
console.log(path.format(pathObj)) //'E:\Blog\demos\test.html'
```

#### ⑤ 规范化方法

path.normalize(pathStr) 方法用于规范化 pathStr，主要用于计算包含 `.`、`..`、`\\` 等相对说明符的`实际路径`

```js
import path from 'path'

console.log(path.normalize('./index.js')) //'index.js'
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\')) //'C:\temp\foo\'
```

#### ⑥ 组装路径方法

path.resolve(pathStr1,...) 返回构建后的绝对路径，给定的路径序列`从右到左`处理，每个后续 path 被追加到前面，直到构建成绝对路径，处理完所有路径序列后仍未构建成绝对路径，则会`附加当前工作目录的绝对路径`

```js
import path from 'path'

// path.join
console.log(path.join('/users', '999', 'test', '..'))   //'\users\999'
console.log(path.join('../users', '999', 'test', '..')) //'..\users\999'
console.log(path.join('./users', '999', 'test.html'))   //'users\999\test.html'

// path.resolve
console.log(path.resolve('./index.js'))       //'E:\Blog\demos\后端服务应用\Node\ES6 modules\index.js'
console.log(path.resolve('/a', 'index.js'))   //'E:\a\index.js'
console.log(path.resolve('../a', 'index.js')) //'E:\Blog\demos\后端服务应用\Node\a\index.js'
console.log(path.resolve('./a', 'index.js'))  //'E:\Blog\demos\后端服务应用\Node\ES6 modules\a\index.js'
```

## 2. fs 模块

### (1) 文件权限位 mode

fs 模块对文件进行操作涉及到`文件操作权限`，fs 模块针对 3 类用户分配权限：`文件所有者（自己）、文件所属组（家人）、其他用户（陌生人）`，文件操作权限分为以下 8 种类型

|数字表示（八进制）|描述|
|:-:|:-:|
|0|无权限|
|1|只可执行|
|2|只写|
|3|可执行、可写|
|4|只读|
|5|可执行、可读|
|6|可读、可写|
|7|可执行、可读、可写|

随便在一个目录下打开 git，使用 Linux 命令 ls -al 查看当前目录下文件夹和文件的权限位

开头第一项代表权限，第 1 位代表类型，d 开头表示文件夹，- 开头表示文件，后面 9 位按每 3 位划分，依次表示文件所有者、文件所属组、其他用户的权限

![文件权限位mode](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/%E6%96%87%E4%BB%B6%E6%9D%83%E9%99%90%E4%BD%8Dmode.png)

### (2) 文件标识位 flag

文件标识符代表对文件的操作方式，如下图所示

|符号|含义|
|---|---|
|r  |只读文件，文件不存在则抛出异常|
|r+ |读写文件，文件不存在则抛出异常，存在则追加写入|
|rs |读写文件，文件不存在则抛出异常，存在则追加写入，绕开本地文件系统缓存|
|w  |只写文件，文件不存在则新建，存在则清空后写入|
|wx |只写文件，类似 w，排他方式打开|
|w+ |读写文件，文件不存在则新建，存在则清空后写入|
|wx+|读写文件，类似 w+，排他方式打开|
|a  |写入文件，文件不存在则新建|
|ax |写入文件，类似 a，排他方式打开|
|a+ |读写文件，文件不存在则新建|
|ax+|读写文件，类似 a+，排他方式打开|

### (3) 文件描述符 fd

操作系统会为`每个打开的文件`分配一个文件描述符，文件操作使用文件描述符来`识别和追踪每个特定的文件`

Node 抽象了不同操作系统之间的差异，为所有打开的文件分配`数值`的文件描述符，Node 每操作一个文件，文件描述符`递增`，一般从 `3` 开始，因为前面有 0 1 2 三个比较特殊的描述符，分别代表`标准输入 process.stdin，标准输出 process.stdout，错误输出 process.stderr`

### (4) 文件 API

Node 的文件系统模块 fs 提供了一组标准的文件操作 API，fs 模块的所有方法均有`同步`和`异步`两个版本，异步方法性能更高，速度更快，而且没有阻塞，建议使用异步版本

```js
定义：const fs = require('fs')
方法：目录操作：
     fs.accessSync(path)     //有操作权限时无返回值,无操作权限时返回Error对象,查看是否对指定目录具有操作权限
     fs.access(path,err=>{})
     fs.mkdirSync(path)      //无返回值,创建目录,传入路径不正确会抛出异常
     fs.mkdir(path,err=>{})
     fs.rmdirSync(path)      //无返回值,删除目录
     fs.rmdir(path,err=>{})
     fs.opendirSync() //
     fs.opendir()
     fs.readdirSync(path,{encoding}) //返回指定目录下的成员数组,读取目录
     fs.readdir(path,{encoding},(err,data)=>{})
     文件操作：
     fs.openSync(path,flag,mode)                //返回文件描述符,打开文件
     fs.open(path,flag,mode,(err,fd)=>{})       //无返回值,打开文件
     fs.closeSync(fd)                           //无返回值,关闭文件 描述符？
     fs.close(fd,err=>{})    
     fs.unlinkSync(path)                        //无返回值,删除文件
     fs.unlink(path,err=>{})
     文件权限：
     fs.fchmodSync(fd,mode) //无返回值,设置文件权限
     fs.fchmod(fd,mode,err=>{})
     fs.chmodSync((path,mode)     //无返回值,修改文件权限
     fs.chmod((path,mode,err=>{})
     文件所有者：
     fs.fchownSync(fs,uid,gid) //无返回值,设置文件所有者
     fs.fchown(fs,uid,gid,err=>{})
     fs.chownSync(path,uid,gid)    //无返回值,更改文件的所有者和群组
     fs.chown(path,uid,gid,err=>{})

     fs.fdatasyncSync(fd) //无返回值,将与文件关联的所有当前排队的 I/O 操作强制为操作系统的同步 I/O 完成状态
     fs.fdatasync(fd,err=>{})

     fs.fsyncSync(fd) //无返回值,同步磁盘缓存
     fs.fsync(fd,err=>{}) //无返回值,同步磁盘缓存
                        
     文件单次读写：
     fs.readFileSync(path,{encoding,flag})                 //返回文件内容,读取文件
     fs.readFile(path,{encoding,flag},(err,data)=>{})          
     fs.writeFileSync(path,data,{encoding,flag,mode})      //无返回值,写入文件
     fs.writeFile(path,data,{encoding,flag:w,mode},err=>{})  
     fs.appendFileSync(path,data,{encoding,flag,mode})     //无返回值,追加写入文件
     fs.appendFile(path,data,{encoding,flag,mode},err=>{}) 
     fs.copyFileSync(srcpath,dstpath)                      //返回文件内容,拷贝写入文件,目标文件不存在则新建并拷贝
     fs.copyFile(srcpath,dstpath,(err,data)=>{})        
     fs.readlinkSync(path,{encoding}) //返回path引用的符号路径的内容
     fs.readlink(path,{encoding},(err,linkString)=>{})                  
     文件多次读写：
     fs.readSync(fd,buffer,offset,length,position) //返回文件内容,将无法一次性读取全部内容的大文件分多次读取到buffer
     fs.read(fd,buffer,offset,length,position,(err,bytesRead,buffer)=>{}) //offset:向buffer写入的初始位置,length:读取文件的长度,position:读取文件的初始位置,bytesRead:实际读取的字节数
     fs.writeSync(fd,buffer,offset,length,position) //无返回值,将无法一次性写入全部内容的buffer分多次写入文件
     fs.write(fd,buffer,offset,length,position,(err,bytesWritten,buffer)=>{}) //offset:从buffer读取的初始位置,length:读取buffer的字节数,position:写入文件初始位置,bytesWritten:实际写入的字节数
     文件二进制视图读写：
     fs.readvSync(fd,buffer,position)                            //返回文件内容,读取指定文件并写入ArrayBufferView数组
     fs.readv(fd,buffer,position,(err,bytesRead,buffer)=>{})     
     fs.writevSync(fd,buffer,position)                           //
     fs.writev(fd,buffer,position,(err,bytesWritten,buffer)=>{}) 
     
     同步异步：

     fs.realpathSync(path,{encoding}) //
     fs.realpath(path,{encoding},(err,resolvedPath)=>{})
     
     fs.renameSync()
     fs.rename(oldPath,newPath,cb)
     
     fs.existsSync()
     fs.exists()
     fs.ftruncateSync(fd,len)
     fs.ftruncate(fd,len,cb)
     fs.truncateSync(path,len)
     fs.truncate(path,len,cb)
     
     
     fs.lchownSync(path,mode)
     fs.lchown(path,mode,cb)
     
     
     fs.lchmodSync(path,mode)
     fs.lchmod(path,mode,cb)
     文件属性：
     fs.statSync(path) //返回文件属性,检查文件详细信息
     fs.stat(path,(err,stats)=>{})  //无返回值,检查文件详细信息

     fs.lstatSync(path)
     fs.lstat(path,cb)
     fs.lutimesSync()
     fs.lutimes()
     fs.fstatSync(fd)
     fs.fstat(fd,cb)
     fs.linkSync(srcpath,dstpath)
     fs.link(srcpath,dstpath,cb)
     fs.symlinkSync(srcpath,dstpath,type)
     fs.symlink(srcpath,dstpath,type,cb)
     
     fs.unlinkSync(path)
     fs.unlink(path,cb)
     fs.utimesSync(path,atime,mtime)
     fs.utimes(path,atime,mtime,cb)
     fs.futimesSync(fd,atime,mtime)
     fs.futimes(fd,atime,mtime,cb)
     fs.mkdtempSync()
     fs.mkdtemp()
     Stream 方法：
     fs.createReadStream()
     fs.createWriteStream()

     fs.Stats()
     fs._toUnixTimestamp()

     fs.watch()
     fs.watchFile()
     fs.unwatchFile()
```

### (5) stats 对象

文件目录的 Stats 对象存储着关于这个文件夹或文件的一些重要信息，例如创建时间、最后一次访问时间、最后一次修改时间、文章所占字节、判断文件类型的多个方法等

```js

```

①②③④⑤⑥⑦⑧⑨⑩
