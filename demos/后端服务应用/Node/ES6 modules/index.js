import person from './person.js'
import { count, incCount } from './count.js'

// console.log(person) //{ name: '张三', age: 20 }

// console.log(count) //1
// incCount()
// console.log(count) //2

// os
// import os from 'os'
// console.log(os)

// console.log(process.allowedNodeEnvironmentFlags)
// console.log(process.domain) //null
// console.log(process.features)

// {
//     inspector: true,
//     debug: false,
//     uv: true,
//     ipv6: true,
//     tls_alpn: true,
//     tls_sni: true,
//     tls_ocsp: true,
//     tls: true,
//     cached_builtins: true
// }

import process from 'process'
import child_process from 'child_process'

// console.log(process)
// console.log(child_process)

//BaseObject {
//    ...
//}

// import minimist from 'minimist'
// const args = minimist(process.argv)
// console.log(args) //zy

import readline from 'readline'

const pl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

