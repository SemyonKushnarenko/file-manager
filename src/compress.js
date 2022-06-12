import zlib from "zlib"
import fs from 'fs'
import path from "path"

export const compress = (pathToCompressFile, pathToCompressDestinationFile) => {
  if (fs.existsSync(pathToCompressFile) && fs.existsSync(pathToCompressDestinationFile)) {
      let pathf = pathToCompressFile
      if(pathf.indexOf(path.sep)){
        pathf = pathToCompressFile.slice(pathToCompressFile.lastIndexOf(path.sep))
      }
      const newPathToCompressFile = path.join(pathToCompressDestinationFile, pathf)
      const inp = fs.createReadStream(pathToCompressFile)
      const out = fs.createWriteStream(newPathToCompressFile+'.gz')
      const brotli = zlib.createBrotliCompress()
      inp.pipe(brotli).pipe(out)
  } else {
    console.log('Operation failed')
  }
}