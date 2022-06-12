import path from 'path'
import fs from 'fs'

export const add = pathToAddFile => {
    if (fs.existsSync(pathToAddFile)) {
      console.log("\x1b[34m%s\x1b[0m", 'File already exists')
      console.log("\x1b[31m%s\x1b[0m", 'Operation failed')
    } else {
      fs.writeFileSync(pathToAddFile, '', err => {
        if (err) console.log("\x1b[31m%s\x1b[0m", 'Operation failed')
      })
      console.log("\x1b[34m%s\x1b[0m", 'Downloading...')
    }
}