import os from 'os'
import path from 'path'
import {stdout, stdin, exit} from 'process'
import * as readline from 'readline'

import { greeting } from './src/greeting.js'
import { calcHash } from './src/calcHash.js'
import { osInput } from './src/osInput.js'
import { changeDirectory } from './src/changeDirectory.js'
import { up } from './src/up.js'

const userName = process.argv[2].split('=')[1]
let [currentDirectory, currentDirectoryString] = changeDirectory(os.userInfo().homedir)

greeting(userName)
stdout.write(currentDirectoryString)

const rl = readline.createInterface({input: stdin, output: stdout});

rl.on('line', dataBuffer => {
  const data = dataBuffer.toString().trim()
  try {
    switch (data) {
      case '.exit':
        exit()
      case data.match(/hash\s.+/)?.input:
        const pathToHashFile = path.join(currentDirectory, data.split(' ')[1])
        calcHash(pathToHashFile)
        break
      case data.match(/os\s--.+/)?.input:
        osInput(data)
        break
      case 'up':
        const newDirectories = up(currentDirectory, currentDirectoryString)
            
        currentDirectory = newDirectories[0] 
        currentDirectoryString = newDirectories[1]
        break
      default:
        console.log('\x1b[31m%s\x1b[0m', 'Invalid input')
        break
    }
  } catch(err) {
    console.log('\x1b[31m%s\x1b[0m', 'Operation failed', '\n', err.message)
  } finally {
    setTimeout(() => stdout.write('\n' + currentDirectoryString), 0)
  }
})

process.on('exit', () => stdout.write(`\nThank you for using File Manager, ${userName}!`))