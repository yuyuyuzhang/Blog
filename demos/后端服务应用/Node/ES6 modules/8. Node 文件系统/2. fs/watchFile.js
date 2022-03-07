import fs from 'fs'

const fsStatW = fs.watchFile('./watchDir/a.txt', (currStat, prevStat) => {
    console.log("currStat:", currStat)
    console.log("prevStat:", prevStat)
})