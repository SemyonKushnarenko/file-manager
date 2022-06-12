import fs from 'fs'

export const rm = (pathToRemoveFile) => {
  fs.rmSync(pathToRemoveFile)
}