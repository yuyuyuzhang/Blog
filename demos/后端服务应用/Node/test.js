// const fs = require('fs');
// setTimeout(() => {
//     console.log('1'); 
// }, 0);
// setImmediate(() => {
//     console.log('setImmediate 1');
// });
// fs.readFile('./test.html', {encoding: 'utf-8'}, (err, data) => {
//     if (err) throw err;
//     console.log('read file success', data);
// });
// Promise.resolve().then(()=>{
//     console.log('poll callback');
// });
// console.log('2');
//2
//poll callback
//1
//setImmediate 1
//read file success
//文件内容输出



// const fs = require('fs');
// console.log('start');
// fs.readFile('./test.html', {encoding: 'utf-8'}, (err, data) => {
//   if (err) throw err;
//   console.log('read file success');
// });
// setTimeout(() => {
//   console.log('setTimeout'); 
// }, 0);
// setImmediate(() => {
//   console.log('setImmediate');
// });
// Promise.resolve().then(()=>{
//   console.log('Promise callback');
// });
// process.nextTick(() => {
//   console.log('nextTick callback');
// });
// console.log('end');
//start 
//end 
//nextTick callback
//Promise callback
//setTimeout
//setImmediate
//read file success
//根据优先级执行顺序为：fs.readFile -> setTimeout -> setImmediate，但是fs.readFile执行时间肯定大于1ms，因此setTimeout、setImmediate先执行完



const fs = require('fs');
setTimeout(() => { 
    console.log('1'); 
    sleep(10000)
    console.log('sleep 10s');
}, 0);
fs.readFile('./test.html', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;
    console.log('read file success');
});
console.log('2');
function sleep(n){ 
    var start = new Date().getTime();
    while(true){
        if(new Date().getTime() - start > n){
            break;
        }
    }
}
//2
//1
//sleep 10s
//read file success
//fs.readFile以及处理完成，并且其回调函数到了主线程宏任务队列，但是主线程正在执行setTimeout回调函数
//sleep(10000)被阻塞了，因此必须等到setTimeout回调函数执行完毕后，才能执行fs.readFile回调函数

