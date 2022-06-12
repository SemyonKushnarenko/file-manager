import { cp } from './cp'
import { rm } from './rm'

export const mv = (pathToMoveFile, pathToMoveDestinationFolder) => {
  cp(pathToMoveFile, pathToMoveDestinationFolder)
  rm(pathToMoveFile)
}