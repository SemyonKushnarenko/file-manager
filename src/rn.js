import path from 'path'
import fs from 'fs'

export const rn =  (pathToNewFileName, pathToOldFileName) => {
      fs.renameSync(pathToOldFileName, pathToNewFileName, err => {
        if (err) console.log("\x1b[31m%s\x1b[0m", 'Operation failed')
    })
}