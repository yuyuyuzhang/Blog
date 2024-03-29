import process from 'process'
import fs from 'fs'

console.log('start');

setTimeout(() => { 
    console.log('1'); 
}, 0);

setImmediate(() => {
    console.log('setImmediate 1');
});

fs.readFile('./test.js', {encoding: 'utf-8'}, (err, data) => {
    if (err) throw err;
    console.log('read file success');
});

process.nextTick(() => {
    console.log('nextTick cb')
})

new Promise((resolve) => {
    console.log('promise')
    resolve();
}).then(() => {
    console.log('promise cb')
})

console.log('end');

// start -> promise -> end -> promise cb -> nextTick cb -> setImmediate 1 -> 1 -> read file success