import fs from 'fs'

export const cat = pathToFile => {
  if (fs.existsSync(pathToFile)){
    console.log("\x1b[34m%s\x1b[0m", 'Downloading...\nYour result:');
    console.log(fs.readFileSync(pathToFile, "utf8"))
  } else {
    console.log('Operation failed')
  }
}