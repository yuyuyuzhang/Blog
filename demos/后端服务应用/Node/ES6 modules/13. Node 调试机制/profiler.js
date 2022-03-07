import inspector from 'inspector'
import fs from 'fs'

const session = new inspector.Session();
session.connect()
session.post('Profiler.enable', () => {
    session.post('Profiler.start', () => {
    // 在此处调用测量中的业务逻辑...
    for(let i=0; i<10000, i++;) {
    }

    // 一段时间之后...
    session.post('Profiler.stop', (err, { profile }) => {
        // 将分析文件写入磁盘、上传等
        if (!err) {
        fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
        }
    });
    });
});