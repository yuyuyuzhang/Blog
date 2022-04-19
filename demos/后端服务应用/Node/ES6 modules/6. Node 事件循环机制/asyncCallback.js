const fib = n => {
    if(n < 2) return n
    return fib(n - 1) + fib(n - 2)
}

const Obj = function() {}

Obj.prototype.doSomeThing = function(_arg) {
    // 最后一个参数为回调函数
    let cb = arguments[arguments.length - 1] 
    cb === typeof cb === 'function' ? cb : null

    const arg = typeof _arg === 'number' ? _arg : null

    if(!arg) {
        return cb(new Error('first _arg missing or not a number'))
    } else {
        process.nextTick(() => {
            const data = fib(arg)
            cb(null, data)
        })
    }
}

// 实例测试
const test = new Obj()
const num = 10
test.doSomeThing(10, (err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)   // 55
    }
})

test.doSomeThing('10', (err, res) => {
    if(err) {
        console.error(err) // Error: first _arg missing or not a number
    } else {
        console.log(res)
    }
})