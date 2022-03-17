import child_process from 'child_process'

const childProcess = child_process.fork('./childProcess.js')

childProcess.send({ name: 'parent' })
childProcess.on('message', childMsg => {
    debugger;
    console.log("childMsg:", childMsg)
})