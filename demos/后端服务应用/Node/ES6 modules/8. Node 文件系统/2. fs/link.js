import fs from 'fs'
     
fs.link('./input.txt', './link.txt', err => {
    if(err) throw err

    fs.lstat('./link.txt', (err, stat) => {
        if(err) throw err
        console.log(stat)
    })
})