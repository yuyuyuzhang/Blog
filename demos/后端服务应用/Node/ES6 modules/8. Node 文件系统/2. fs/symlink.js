import fs from 'fs'

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