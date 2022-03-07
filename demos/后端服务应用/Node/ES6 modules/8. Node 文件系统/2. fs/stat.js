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