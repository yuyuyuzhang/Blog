import inquirer from 'inquirer'
import fs from 'fs'

const prompts = [
    {
        type: 'input',
        message: 'package name:',
        default: 'project',
        name: 'name'
    },
    {
        type: 'input',
        message: 'version:',
        default: '1.0.0',
        name: 'version'
    },
    {
        type: 'input',
        message: 'description:',
        name: 'description'
    },
    {
        type: 'input',
        message: 'entry point:',
        default: 'cli_inquirer.js',
        name: 'main'
    },
    {
        type: 'input',
        message: 'test command:',
        name: 'scripts',
        filter: val => ({ test: val })
    },
    {
        type: 'input',
        message: 'git repository:',
        name: 'repository',
        filter: val => ({
            type: 'git',
            url: val
        })
    },
    {
        type: 'checkbox',
        message: 'keywords:',
        name: 'keywords',
        choices: []
    },
    {
        type: 'input',
        message: 'author:',
        name: 'author'
    },
    {
        type: 'input',
        message: 'license:',
        default: 'ISC',
        name: 'license'
    }
]

inquirer.prompt(prompts)
    .then(answers1 => {
        // 打印上述回答以便用户再次确认
        console.log("answers1:", answers1)

        inquirer.prompt([{
            type: 'confirm',
            message: 'Is this OK?',
            name: 'OK',
            default: true,
        }]).then(answers2 => {
            // 生成 package.json 文件
            if(answers2.OK){
                // JSON.stringify(str,replace,space) 后两个参数用于格式化
                fs.writeFile('./packageTest.json', JSON.stringify(answers1, null, 2), (err) => {
                    if(!err){
                        console.log('packageTest.json 文件创建成功')
                    }
                })
            }
        })
})