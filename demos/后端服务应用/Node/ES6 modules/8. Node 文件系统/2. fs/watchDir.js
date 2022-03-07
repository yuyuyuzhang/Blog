import fs from 'fs'

const fsw = fs.watch('./watchDir', (eventType, filename) => {
    console.log("eventType:", eventType)
    console.log("filename:", filename)
})