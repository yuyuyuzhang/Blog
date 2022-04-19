import EventEmitter from 'events';
import fs from 'fs';

class InputChecker extends EventEmitter {
    constructor(name, file) {
        super(); // 先调用父类构造函数新建实例

        this.name = name;
        this.writeStream = fs.createWriteStream('./' + file + '.txt');
    }
    check(input) {
        const command = input.trim().substr(0, 3)
        if(command == 'wr:') {
            this.emit('write', input.substr(3, input.length))
        } else {
            this.emit('end')
        }
    }
}

const ic = new InputChecker('yuyuyuzhang', 'output')
ic.on('write', function(data) {
    this.writeStream.write(data, 'utf8')
})
ic.on('end', function() {
    process.exit()
})

process.stdin.setEncoding('utf8')
process.stdin.on('readable', function() {
    const input = process.stdin.read()
    input && ic.check(input)
})