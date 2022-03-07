import fs from 'fs'

fs.readFile('./input.txt', (err, data) => {
    if(err) throw err

    fs.writeFile('./output1.txt', data, err => {
        if(err) throw err
    })
})