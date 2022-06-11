import { changeDirectory } from "./changeDirectory.js"
import path from 'path'
export const up = (currentDirectory, currentDirectoryString) => {
  if (currentDirectory.indexOf(path.sep) > -1) {
    const newPath = currentDirectory.slice(0,currentDirectory.lastIndexOf(path.sep))
    const newDirectories = changeDirectory(newPath)
    currentDirectory = newDirectories[0] 
    currentDirectoryString = newDirectories[1]
  }
  return [currentDirectory, currentDirectoryString]
}