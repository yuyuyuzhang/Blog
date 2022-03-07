import child_process from 'child_process'

     const subProcess = child_process.fork('./child.js')
     subProcess.send({ name: 'parent' })
     subProcess.on('message', childMsg => {
          console.log("childMsg:", childMsg)
     })

     console.log('hello, I am parent')