export const changeDirectory = (newPath) => {
  let currentDirectory = newPath
  let currentDirectoryString = `You are currently in ${currentDirectory}\n`
  return [currentDirectory, currentDirectoryString]
}