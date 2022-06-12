import zlib from "zlib"
import fs from 'fs'
import path from "path"

export const decompress = (pathToCompressFile, pathToCompressDestinationFile) => {
  
  if (fs.existsSync(pathToCompressFile) && fs.existsSync(pathToCompressDestinationFile)) {
      let pathf = pathToCompressFile
      if(pathf.indexOf(path.sep)){
        pathf = pathToCompressFile.slice(pathToCompressFile.lastIndexOf(path.sep))
      }
      const newPathToCompressFile = path.join(pathToCompressDestinationFile, pathf)
      const inp = fs.createReadStream(pathToCompressFile)
      const out = fs.createWriteStream(newPathToCompressFile.slice(0,newPathToCompressFile.length-3))
      const brotli = zlib.createBrotliCompress()
      inp.pipe(brotli).pipe(out)
  } else {
    console.log('Operation failed')
  }
}