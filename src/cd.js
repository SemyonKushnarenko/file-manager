import { changeDirectory } from "./changeDirectory.js"
import fs from 'fs'

export const cd = (pathToNewDirectory, currentDirectory, currentDirectoryString) => {
  const newDirectories = changeDirectory(pathToNewDirectory)
  if(fs.existsSync(pathToNewDirectory)){
    currentDirectory = newDirectories[0]
    currentDirectoryString = newDirectories[1]
  } else {
    console.log('Operation failed')
  }
  return [currentDirectory, currentDirectoryString]
}