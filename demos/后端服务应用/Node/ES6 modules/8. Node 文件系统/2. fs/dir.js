import fs from 'fs'

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