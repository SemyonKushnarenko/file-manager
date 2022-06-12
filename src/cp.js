import fs from 'fs'

export const cp = (pathToCopyFile, pathToCopyDestinationFolder) => {
  fs.copyFileSync(pathToCopyFile, pathToCopyDestinationFolder)
}