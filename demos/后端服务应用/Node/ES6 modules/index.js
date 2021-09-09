import path from 'path'
import fs from 'fs'

// fs.fchmod('./input.txt', 0o743, err => {
//     if (err) throw err
//     console.log('input.txt set mode succeed!')
// })

// const file = 'package.json'
// fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
//     if (err) {
//         console.error(
//         `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
//     } else {
//         console.log(`${file} exists, and it is writable`);
//     }
// })
// package.json exists, and it is writable


// fs.open('myfile', 'r', (err, fd) => {
//     if (err) {
//         if (err.code === 'ENOENT') {
//             console.error('myfile does not exist');
//             return
//         }
//         throw err
//     }

//     try {
//         fs.readMyData(fd)
//     } finally {
//         fs.close(fd, (err) => {
//             if (err) throw err
//         })
//     }
// })

// fs.appendFile('input.txt', 'data to append', err => {
//     if(err) throw err
//     console.log('data append succeed!')
// })

// fs.chmod('input.txt', 0o775, (err) => {
//     if (err) throw err
//     console.log('The permissions for file "input.txt" have been changed!')
// })

// copy.txt 不存在则新建，已存在则覆盖
// fs.copyFile('input.txt', 'copy.txt', err => {
//     if (err) throw err
//     console.log('input.txt was copied to copy.txt')
// })


// fs.createReadStream('./input.txt')
//   .pipe(fs.createWriteStream('output.gz'))

// 文件属性
fs.stat('input.txt', (err, stats) => {
    if(err) throw err
    console.log(stats)
    console.log(stats.isFile()) //true
})

// 文件夹属性
fs.stat('config', (err, stats) => {
    if(err) throw err
    console.log(stats)
    console.log(stats.isDirectory()) //true
})

