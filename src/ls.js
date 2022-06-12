import fsPromises from 'fs/promises'

export const ls = async (searchPath) => {
  const files = await fsPromises.readdir(searchPath, { withFileTypes: true })
  const nFiles = []
  for (let file of files) {
      if ((file.isFile() || file.isDirectory()) && !(/(^|\/)\.[^\/\.]/g).test(file.name)) {
          nFiles.push(file.name)
      }
  }
  return nFiles
}