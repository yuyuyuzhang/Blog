import inquirer from 'inquirer'

const prompts = [
    {
        type: 'input',
        message: 'name:',
        name: 'name'
    },
    {
        type: 'password',
        message: 'password:',
        name: 'pwd'
    },
    {
        type: 'input',
        message: 'phone:',
        name: 'phone',
        validate: val => /\d{11}/g.test(val)
    },
    {
        type: 'confirm',
        message: '是否学生？',
        name: 'isStu',
    },
    {
        type: 'confirm',
        message: '是否参加本次考核？',
        name: 'isJoin',
        when: answers => answers.isStu
    },
    {
        type: 'list',
        message: '请选择一种颜色：',
        name: 'color1',
        choices: [
            'red',
            'green', 
            'blue'
        ],
    },
    {
        type: 'rawlist',
        message: '请选择一种颜色：',
        name: 'color2',
        choices: [
            'red',
            'green',
            'blue'
        ],
    },
    {
        type: 'checkbox',
        message: '请选择一种颜色：',
        name: 'color3',
        choices: [
            'red',
            'green',
            'blue'
        ],
    }
]

inquirer.prompt(prompts).then(answers => {
    console.log("answers:", answers)
})