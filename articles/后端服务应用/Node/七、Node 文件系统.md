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

文件权限位 mode 表示`对文件的访问权限`，fs 模块对文件进行操作涉及到的`文件操作权限`如下所示

|八进制数字|描述|
|:-:|:-:|
|7|可写、可读、可执行|
|6|可写、可读|
|5|可读、可执行|
|4|只读|
|3|可写、可执行|
|2|只写|
|1|只执行|
|0|无权限|

fs 模块针对以下 3 类用户分配权限，`Windows` 并没有实现三者之间权限的区别

* 文件所有者（自己）
* 文件所属组（家人）
* 其他用户（陌生人）

构建文件权限位 mode 的一种最简单方式是使用 `3 个八进制数字序列`，左边数字指定文件所有者权限，中间数字指定文件所属组权限，右边数字指定其他用户权限，例如八进制值 0o765 表示如下

* 文件所有者：可写、可读、可执行
* 文件所属组：可写、可读
* 其他用户：可读、可执行

### (2) 文件描述符 fd

POSIX 系统上对于每个进程，内部维护一个当前打开的文件表，每个打开的文件都分配一个简单的数字标识符，称为文件描述符，系统级上所有文件操作系统都使用文件描述符来识别和跟踪每个特定的文件，Windows 系统使用不同概念但相似的机制来跟踪文件

为了方便用户，Node 抽象了操作系统之间的差异，为每个打开的文件都分配了一个`数字文件描述符`，Node 每操作一个文件，文件描述符`递增`，一般从 `3` 开始，因为前面有 0 1 2 三个比较特殊的文件描述符，分别代表标准输入 process.stdin，标准输出 process.stdout，错误输出 process.stderr

操作系统限制了在任何给定时间可能打开的文件描述符的数量，因此`操作完成时必须关闭文件描述符`，否则可能导致内存泄漏，最终导致 Node 应用程序崩溃

### (3) fs API

Node 的文件系统模块 fs 提供了一组标准的文件操作 API，fs 模块的所有方法均有`同步`、`异步`、`Promise` 3 个版本，异步方法性能更高，速度更快，而且没有阻塞，建议使用异步版本

Promise API 使用底层 Node 线程池在事件循环线程之外执行文件系统操作，这些操作不是线程安全的，对同一文件执行多个并发修改时必须小心，否则可能会损坏数据

```js
定义：const fs = require('fs')
方法：文件夹或文件属性：
     fs.stat(path,(err,stats)=>{})            //返回并检查指定路径文件夹或文件的属性
     fs.statSync(path) 
     fs.fstat(fd,[options],(err,stats)=>{})   //返回并检查指定文件描述符对应文件的属性
     fs.fstatSync(fd,[options])
     fs.utimes(path,atime,mtime,err=>{})      //无返回值,修改指定路径文件的atime和mtime
     fs.utimesSync(path,atime,mtime)
     fs.lutimes(path,atime,mtime,err=>{})     //无返回值,修改指定路径文件的atime和mtime
     fs.lutimesSync(path,atime,mtime)
     fs.fchown(fs,uid,gid,err=>{})            //无返回值,设置文件所有者
     fs.fchownSync(fs,uid,gid) 
     fs.chown(path,uid,gid,err=>{})           //无返回值,更改文件的所有者和群组
     fs.chownSync(path,uid,gid) 
     fs.futimes(fd,atime,mtime,err=>{})       //无返回值,更改指定文件描述符对应文件的atime和mtime
     fs.futimesSync(fd,atime,mtime)
     fs.fchmod(fd,mode,err=>{})               //无返回值,设置文件权限
     fs.fchmodSync(fd,mode) 
     fs.chmod((path,mode,err=>{})             //无返回值,修改文件权限
     fs.chmodSync((path,mode)     
     文件夹方法：
     fs.opendir(path,[options],(err,dir)=>{})   //返回并打开指定路径文件夹
     fs.opendirSync(path,[options]) 
     fs.mkdir(path,[options],err=>{})           //无返回值,创建指定路径文件夹
     fs.mkdirSync(path,[options])      
     fs.mkdtemp(prefix,[options],(err,dir)=>{}) //返回并创建唯一临时文件夹
     fs.mkdtempSync(prefix,[options])
     fs.rmdir(path,[options],err=>{})           //无返回值,删除指定路径文件夹
     fs.rmdirSync(path,[options])      
     fs.readdir(path,[options],(err,data)=>{})  //返回并读取指定路径文件夹的全部内容的相对路径
     fs.readdirSync(path,[options])
     文件夹&文件公共方法
     fs.access(path,[mode],err=>{})     //无返回值,查看指定路径文件夹或文件是否存在且是否具有访问权限
     fs.accessSync(path,[mode]) 
     fs.rename(oldPath,newPath,err=>{}) //无返回值,重命名指定路径文件夹或文件
     fs.renameSync(oldPath,newPath)
     文件方法：
     fs.open(path,[flag],[mode],(err,fd)=>{}) //返回文件描述符,打开指定路径文件
     fs.openSync(path,[flag],[mode])               
     fs.rm(path,[options],err=>{})            //无返回值,删除指定路径文件
     fs.rmSync(path,[options]) 
     fs.truncate(path,len,err=>{})            //无返回值,截断指定路径文件至指定字节长度len
     fs.truncateSync(path,len)                
     fs.ftruncate(fd,[len],err=>{})           //无返回值,截断指定文件描述符为指定字节长度len
     fs.ftruncateSync(fd,[len])              
     fs.close(fd,err=>{})                     //无返回值,关闭指定文件描述符
     fs.closeSync(fd)
     fs.fsync(fd,err=>{})                     //无返回值,同步磁盘缓存
     fs.fsyncSync(fd)   
     fs.fdatasync(fd,err=>{})                 //无返回值,将与指定文件描述符对应文件关联的所有当前排队的IO操作强制为操作系统的同步IO完成状态
     fs.fdatasyncSync(fd) 
     读取文件：
     fs.readFile(path,[options],(err,data)=>{})                 //返回并读取指定路径文件内容
     fs.readFileSync(path,[options])        
     fs.read(fd,[{buf,offset,len,pos}],(err,bytesRead,buf)=>{}) //返回读取字节数及内部缓冲,从指定文件描述符对应文件的位置pos开始读取len字节到内部缓冲buf的偏移offset处
     fs.readSync(fd,buf,offset,len,pos)        
     fs.readv(fd,bufs,[pos],(err,bytesRead,bufs)=>{})           //返回读取字节数及ArrayBufferView数组,从指定文件描述符对应文件的位置pos处读取数据并存入ArrayBufferView数组
     fs.readvSync(fd,buf,pos)      
     写入文件：
     fs.writeFile(path,data,[options],err=>{})                    //无返回值,将数据写入指定路径文件,已存在则覆盖
     fs.writeFileSync(path,data,[options])      
     fs.appendFile(path,data,[options],err=>{})                   //无返回值,将数据追加写入指定路径文件的末尾
     fs.appendFileSync(path,data,[options])    
     fs.copyFile(spath,dpath,[mode],err=>{})                      //无返回值,将源文件内容复制到目标文件,已存在则覆盖   
     fs.copyFileSync(spath,dstpath)  
     fs.write(fd,buf,offset,len,pos,(err,bytesWrite,buf)=>{})     //返回写入字节数及内部缓冲,从内部缓冲buf的偏移offset处写入len字节到指定文件描述符对应文件的位置pos处
     fs.writeSync(fd,buf,offset,len,pos) 
     fs.writev(fd,ArrayBufferView,[pos],(err,bytesWrite,buf)=>{}) //返回写入字节数及ArrayBufferView数组,将ArrayBufferView数组写入指定文件描述符对应文件的位置pos处
     fs.writevSync(fd,buf,[pos])    
     Stream API 方法：
     fs.createReadStream(path,[options])  //返回只读流,读取指定路径文件
     fs.createWriteStream(path,[options]) //返回只写流,写入指定路径文件
     文件监控：
     fs.watch(path,[options],(et,path)=>{}) //返回FSWatcher实例,监控指定路径文件夹或文件
     fs.watchFile(path,[options],listner)   //返回StatWatcher实例,监听指定路径文件
     fs.unwatchFile(path,[listener])        //无返回值,停止监控指定路径文件夹或文件
     硬链接：
     fs.link(spath,dpath,err=>{})                       //无返回值,创建spath到dpath的硬链接
     fs.linkSync(spath,dpath)
     符号链接：
     fs.symlink(spath,dpath,[type],err=>{})             //无返回值,创建spath到dpath的符号链接
     fs.symlinkSync(spath,dpath,[type])
     fs.readlink(path,[options],(err,linkStr)=>{})      //返回指定路径符号链接的内容
     fs.readlinkSync(path,[options])
     硬链接&符号链接公共方法
     fs.lstat(path,[options],(err,stats)=>{})           //返回指定路径硬链接或符号链接的属性
     fs.lstatSync(path,[options])
     fs.lchown(path,uid,gid,err=>{})                    //无返回值,设置指定路径硬链接或符号链接的所有者
     fs.lchownSync(path,uid,gid)  
     fs.unlink(path,err=>{})                            //无返回值,删除指定路径硬链接或符号链接
     fs.unlinkSync(path)
```

### (4) Dir 类、Dirent 类

Dir 类表示`文件夹`

```js
定义：import 'fs' from 'fs'
     fs.opendir(path,[options],(err,dir)=>{})    //返回并打开指定路径文件夹
     fs.opendirSync(path,[options]) 
属性：dir.path                                    //返回当前文件夹的只读路径
方法：fs 模块方法：
     fs.access(path,[mode],err=>{})              //无返回值,查看指定路径文件夹或文件是否存在且是否具有访问权限
     fs.accessSync(path,[mode]) 
     fs.mkdir(path,[options],err=>{})            //无返回值,创建指定路径文件夹
     fs.mkdirSync(path,[options])      
     fs.mkdtemp(prefix,[options],(err,dir)=>{})  //返回并创建唯一临时文件夹
     fs.mkdtempSync(prefix,[options])
     fs.rmdir(path,[options],err=>{})            //无返回值,删除指定路径文件夹
     fs.rmdirSync(path,[options])      
     fs.rename(oldPath,newPath,err=>{})          //无返回值,重命名指定路径文件夹或文件
     fs.renameSync(oldPath,newPath)
     fs.readdir(path,[options],(err,dirent)=>{}) //返回并读取指定路径文件夹的全部内容的相对路径
     fs.readdirSync(path,[options])
     dir 对象方法：
     dir.read((err,dirent)=>{})                  //返回并读取当前文件夹的下一个文件夹条目(子文件夹或文件)
     dir.readSync()
     dir.close(err=>{})                          //无返回值,关闭当前文件夹的底层资源句柄
     dir.closeSync()
```

Dirent 类表示`文件夹条目`，可以是`子文件夹或文件`

```js
定义：fs 模块方法：
     fs.readdir(path,[options],(err,data)=>{})  //返回并读取指定路径文件夹的全部内容的相对路径
     fs.readdirSync(path,[options])
     dir 对象方法：
     dir.read((err,dirent)=>{})
     dir.readSync()
属性：dirent.name                //返回dirent名称
方法：dirent.isFile()            //返回dirent是否描述文件
     dirent.isDirectory()       //返回dirent是否描述文件夹
     dirent.isSymbolicLink()    //返回dirent是否描述符号链接
     dirent.isBlockDevice()     //返回dirent是否描述块设备
     dirent.isCharacterDevice() //返回dirent是否描述字符设备
     dirent.isFIFO()            //返回dirent是否描述先进先出管道(FIFO)
     dirent.isSocket()          //返回dirent是否描述套接字
```

实例

```js
fs.mkdir('./testDir/dir1', err => {
    if(err) throw err
    console.log('create dir1 succeed')

    fs.rename('./testDir/dir1', './testDir/dir1-1', err => {
        if(err) throw err
        console.log('rename dir1 succeed')

        fs.opendir('./testDir', (err, dir) => {
            if(err) throw err
            console.log('open dir1 succeed')

            // 全部读取
            fs.readdir('./testDir', { withFileTypes: true }, (err, dirent) => {
                if(err) throw err
                console.log(dirent)
                // [
                //     Dirent { name: 'dir1-1', [Symbol(type)]: 2 },
                //     Dirent { name: 'test.txt', [Symbol(type)]: 1 }
                // ]
            })

            // 一个个迭代读取
            dir.read((err, dirent) => {
                if(err) throw err

                if(dirent) {
                    console.log(dirent)
                    // Dirent { name: 'dir1-1', [Symbol(type)]: 2 }

                    dir.read((err, dirent) => {
                        if(err) throw err
        
                        if(dirent) {
                            console.log(dirent)
                            // Dirent { name: 'test.txt', [Symbol(type)]: 1 }
                        }
                    })
                }
            })
        })
    })
})
```

### (5) Stats 类

Stats 类表示`文件夹或文件属性`，存储着关于这个文件夹或文件的一些重要信息，例如创建时间、最后一次访问时间、最后一次修改时间、文章所占字节、判断文件类型的多个方法等

```js
定义：import fs from 'fs'
     fs.stat(path,(err,stats)=>{})            
     fs.statSync(path) 
     fs.fstat(fd,[options],(err,stats)=>{})  
     fs.fstatSync(fd,[options])
属性：基本属性：
     stats.uid                            //返回stats对应文件所有者标识符
     stats.gid                            //返回stats对应文件所属组标识符
     stats.mode                           //返回stats对应文件权限位
     stats.size                           //返回stats对应文件字节大小
     stats.blocks                         //返回stats对应文件被分配的块数
     stats.nlink                          //返回stats对应文件存在的硬链接数
     stats.rdev                           //返回设备标识符,若stats对应文件描述设备
     stats.dev                            //返回设备标识符,包含stats对应文件的设备
     stats.ino                            //返回stats对应文件的文件系统特定的索引节点编号
     stats.blksize                        //返回IO操作的文件系统块大小
     时间属性：
     stats.birthtime                      //返回stats对应文件的创建时间
     stats.atime                          //返回stats对应文件的最后一次访问时间
     stats.mtime                          //返回stats对应文件的最后一次修改时间
     stats.ctime                          //返回stats对应文件的最后一次更改文件状态时间
     stats.birthtimeMs                    //返回stats对应文件的创建时间的时间戳
     stats.atimeMs                        //返回stats对应文件的最后一次访问时间的时间戳
     stats.mtimeMs                        //返回stats对应文件的最后一次修改时间的时间戳
     stats.ctimeMs                        //返回stats对应文件的最后一次更改文件状态时间的时间戳
方法：fs 模块方法：
     fs.utimes(path,atime,mtime,err=>{})  //无返回值,修改指定路径文件的访问时间atime和修改时间mtime
     fs.utimesSync(path,atime,mtime)
     fs.lutimes(path,atime,mtime,err=>{}) //无返回值,修改指定路径文件的访问时间atime和修改时间mtime
     fs.lutimesSync(path,atime,mtime)
     fs.futimes(fd,atime,mtime,err=>{})   //无返回值,更改指定文件描述符对应文件的访问时间atime和修改时间mtime
     fs.futimesSync(fd,atime,mtime)
     fs.fchown(fs,uid,gid,err=>{})        //无返回值,设置文件所有者
     fs.fchownSync(fs,uid,gid) 
     fs.chown(path,uid,gid,err=>{})       //无返回值,更改文件的所有者和群组
     fs.chownSync(path,uid,gid) 
     fs.fchmod(fd,mode,err=>{})           //无返回值,设置文件权限
     fs.fchmodSync(fd,mode) 
     fs.chmod((path,mode,err=>{})         //无返回值,修改文件权限
     fs.chmodSync((path,mode)  
     stats 对象方法：
     stats.isFile()                       //返回stats是否描述文件
     stats.isDirectory()                  //返回stats是否描述文件夹
     stats.isSymbolicLink()               //返回stats是否描述符号链接
     stats.isBlockDevice()                //返回stats是否描述块设备
     stats.isCharacterDevice()            //返回stats是否描述字符设备
     stats.isFIFO()                       //返回stats是否描述先进先出管道(FIFO)
     stats.isSocket()                     //返回stats是否描述套接字
```

实例

```js
import fs from 'fs'

// 文件夹属性
fs.stat('config', (err, stats) => {
     if(err) throw err

     console.log(stats.isDirectory()) //true
     console.log(stats)
     // Stats {
     //   uid: 0,
     //   gid: 0,
     //   mode: 16822,
     //   size: 0,
     //   blocks: 0,
     //   nlink: 1,
     //   dev: 1723911979,
     //   rdev: 0,
     //   ino: 562949955908703,
     //   blksize: 4096,
     //   birthtime: 2021-09-04T16:29:13.478Z,
     //   atime: 2021-09-09T08:11:09.031Z,
     //   mtime: 2021-09-04T16:29:13.478Z,
     //   ctime: 2021-09-04T16:29:13.478Z,
     //   birthtimeMs: 1630772953478.4983,
     //   atimeMs: 1631175069031.3035,
     //   mtimeMs: 1630772953478.4983,
     //   ctimeMs: 1630772953478.4983 
     // }
})

// 文件属性
fs.stat('input.txt', (err, stats) => {
     if(err) throw err
    
     console.log(stats.isFile()) //true
     console.log(stats)
     // Stats {
     //   uid: 0,
     //   gid: 0,
     //   mode: 33206,
     //   size: 29,
     //   blocks: 0,
     //   nlink: 1,
     //   dev: 1723911979,
     //   rdev: 0,
     //   ino: 562949955908711,
     //   blksize: 4096,
     //   birthtime: 2021-09-04T16:29:13.478Z,
     //   atime: 2021-09-09T06:02:52.858Z,
     //   mtime: 2021-09-09T03:29:08.788Z,
     //   ctime: 2021-09-09T03:29:08.788Z,
     //   birthtimeMs: 1630772953478.4983,
     //   atimeMs: 1631167372857.9207,
     //   mtimeMs: 1631158148787.9668,
     //   ctimeMs: 1631158148787.9668
     // }
})
```

### (6) FSWatcher 类

FSWatcher 类表示`文件夹或文件监听器`

```js
定义：import fs from 'fs'
     fs.watch(path,[options],(et,path)=>{})
方法：fsW.ref()   //
     fsW.unref() //
     fsW.close() //

change //监听的文件夹或文件发生变化时触发
error  //监听的文件夹或文件发生错误时触发
close  //监听器停止监听时触发
```

StatWatcher 类表示`文件夹或文件属性监听器`

```js
定义：import fs from 'fs'
     fs.watchFile(path,[options],listner)
方法：statW.ref()   //
     statW.unref() //
```

### (7) 文件的读取写入

在`打开/读取/写入`文件之前，不要使用 fs.access() 方法检查文件的可访问性，这样会引入竞争条件，其他进程可能会在 2 次调用之间修改文件状态，因此开发者代码应该直接打开/读取/写入文件，并处理无法访问文件时引发的错误，通常仅当文件不会被直接使用时才会检查文件的可访问性

```js
fs.readFile('./input.txt', (err, data) => {
    if(err) throw err

    fs.writeFile('./output1.txt', data, err => {
        if(err) throw err
    })
})
```

![readFile_writeFile]()

Stream API

```js
import fs from 'fs'
import zlib from 'zlib'

fs.createReadStream('./input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('output.gz'))
```

![zlib管道API](https://github.com/yuyuyuzhang/Blog/blob/master/images/%E5%90%8E%E7%AB%AF%E6%9C%8D%E5%8A%A1%E5%BC%80%E5%8F%91/Node/zlib%E7%AE%A1%E9%81%93API.png)

### (8) 链接文件

fs 模块有关链接文件 API

```js
硬链接：
fs.link(spath,dpath,err=>{})                  //无返回值,创建spath到dpath的硬链接
fs.linkSync(spath,dpath)
符号链接：
fs.symlink(spath,dpath,[type],err=>{})        //无返回值,创建spath到dpath的符号链接
fs.symlinkSync(dpath,spath,[type])
fs.readlink(path,[options],(err,linkStr)=>{}) //返回指定路径符号链接的内容
fs.readlinkSync(path,[options])
硬链接&符号链接公共方法：
fs.lstat(path,[options],(err,stats)=>{})      //返回指定路径硬链接或符号链接的属性
fs.lstatSync(path,[options])
fs.lchown(path,uid,gid,err=>{})               //无返回值,设置指定路径硬链接或符号链接的所有者
fs.lchownSync(path,uid,gid)
fs.unlink(path,err=>{})                       //无返回值,删除指定路径硬链接或符号链接
fs.unlinkSync(path)
```

* **硬链接**：硬链接就是同一个文件的`不同文件名`，相当于创建文件副本
  * 硬链接和源文件相互独立，可以各自操作，删除互不影响
  * 删除符号链接不会影响源文件，删除源文件则符号链接会指向一个不存在的文件，无法再进行操作

     ```js
     fs.link('./input.txt', './link.txt', err => {
     if(err) throw err

     fs.lstat('./link.txt', (err, stat) => {
          if(err) throw err
          console.log(stat)
     })
     })
     ```

     ![link1]()

     ![link2]()

* **软链接/符号链接**：符号链接是一类`特殊文本文件`，仅包含一条`其他文件夹或文件`的`路径字符串`
  * 对符号链接操作会转换成对源文件操作
  * 删除符号链接不会影响源文件，删除源文件则符号链接会指向一个不存在的文件，无法再进行操作

     ```js
     fs.symlink('./input.txt', './symlink.txt', 'junction', err => {
     if(err) throw err

     fs.lstat('./symlink.txt', (err, stat) => {
          if(err) throw err
          console.log(stat)
     })

     fs.readlink('./symlink.txt', (err, linkStr) => {
          if(err) throw err
          console.log(linkStr) //'E:\Blog\demos\后端服务应用\Node\ES6 modules\input.txt\'
     })
     })
     ```

     ![symlink1]()

     ![symlink2]()
