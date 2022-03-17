import inspector from 'inspector'
import fs from 'fs'

const session = new inspector.Session();
const fd = fs.openSync('profile.heapsnapshot', 'w')
session.connect()
session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
    fs.writeSync(fd, m.params.chunk);
});
session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
    session.disconnect();
    fs.closeSync(fd);
});