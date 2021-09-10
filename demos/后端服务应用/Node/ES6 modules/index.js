import path from 'path'
import fs from 'fs'
import zlib from 'zlib'


// fs.appendFile('input.txt', 'data to append', err => {
//     if(err) throw err
//     console.log('data append succeed!')
// })

// copy.txt 不存在则新建，已存在则覆盖
// fs.copyFile('input.txt', 'copy.txt', err => {
//     if (err) throw err
//     console.log('input.txt was copied to copy.txt')
// })





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




// fs.lchown('./symlink.txt', 0, 0, err => {
//     if(err) throw err
// }) 

// fs.readlink('./symlink.txt', (err, linkStr) => {
//     if(err) throw err
//     console.log(linkStr) //'E:\Blog\demos\后端服务应用\Node\ES6 modules\input.txt\'
// })





