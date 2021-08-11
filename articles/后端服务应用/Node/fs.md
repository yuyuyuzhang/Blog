# fs

## 1. fs

### (1) 文件权限位 mode

fs 模块对文件进行操作涉及到`文件操作权限`，文件操作权限分为读、写、执行、无权限 4 种类型，fs 模块针对 3 类用户分配权限：`文件所有者（自己）、文件所属组（家人）、其他用户（陌生人）`

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

![文件权限位mode]()

### (2) 文件标识位 flag

文件标识符代表对文件的操作方式，如下图所示

|符号|含义|
|----|---|
|r|读取文件，文件不存在则抛出异常|
|r+|读取并写入文件，文件不存在则抛出异常，存在则追加写入|
|rs|读取并写入文件，文件不存在则抛出异常，存在则追加写入，绕开本地文件系统缓存|
|w|写入文件，文件不存在则新建，存在则清空后写入|
|wx|类似 w，排他方式打开|
|w+|读取并写入文件，文件不存在则新建，存在则清空后写入|
|wx+|类似 w+，排他方式打开|
|a|追加写入文件，文件不存在则新建|
|ax|类似 a，排他方式打开|
|a+|读取并追加写入文件，文件不存在则新建|
|ax+|类似 a+，排他方式打开|

### (3) 文件描述符 fd

操作系统会为`每个打开的文件`分配一个文件描述符，文件操作使用文件描述符来`识别和追踪每个特定的文件`

Node 抽象了不同操作系统之间的差异，为所有打开的文件分配`数值`的文件描述符，Node 每操作一个文件，文件描述符`递增`，一般从 `3` 开始，因为前面有 0 1 2 三个比较特殊的描述符，分别代表`标准输入 process.stdin，标准输出 process.stdout，错误输出 process.stderr`

### (4) 文件 API

Node 的文件系统模块 fs 提供了一组标准的文件操作 API，fs 模块的所有方法均有`同步`和`异步`两个版本，异步方法性能更高，速度更快，而且没有阻塞，建议使用异步版本

```node
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
     fs.openSync(path,flag,mode)                //无返回值,打开文件
     fs.open(path,flag,mode,(err,fd)=>{})
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
     
     fs.statSync(path)
     fs.stat(path,cb)
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

```node

```
