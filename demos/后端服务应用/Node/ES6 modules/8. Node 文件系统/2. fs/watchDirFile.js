import fs from 'fs'

const fsw = fs.watch('./watchDir/a.txt', (eventType, filename) => {
    console.log("eventType:", eventType)
    console.log("filename:", filename)
})