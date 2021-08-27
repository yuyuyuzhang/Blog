import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question(`姓名：`, name => {
    rl.question(`密码：`, psw => {
        console.log('登录成功')
    })
})