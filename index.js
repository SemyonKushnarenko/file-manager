import os from 'os'
import path from 'path'
import { stdin, exit } from 'process'
import * as readline from 'readline'

import { greeting } from './src/greeting.js'
import { calcHash } from './src/calcHash.js'
import { osInput } from './src/osInput.js'
import { changeDirectory } from './src/changeDirectory.js'
import { up } from './src/up.js'
import { cd } from './src/cd.js'

const userName = process.argv[2].split('=')[1]
let newDirectories = changeDirectory(os.userInfo().homedir)
let currentDirectory = newDirectories[0] 
let currentDirectoryString = newDirectories[1]
greeting(userName)
console.log(currentDirectoryString)

const rl = readline.createInterface({input: stdin, output: process.stdout});

rl.on('line', async dataBuffer => {
  const data = dataBuffer.toString().trim()
  try {
    switch (data) {
      case '.exit':
        exit()
      case data.match(/hash\s.+/)?.input:
        const pathToHashFile = path.join(currentDirectory, data.split(' ')[1])
        await calcHash(pathToHashFile)
        break
      case data.match(/os\s--.+/)?.input:
        osInput(data)
        break
      case 'up':
        newDirectories = up(currentDirectory, currentDirectoryString)
        currentDirectory = newDirectories[0] 
        currentDirectoryString = newDirectories[1]
        break
      case data.match(/cd\s.+/)?.input:
        const pathToNewDirectory = path.join(currentDirectory, data.slice(3))
        newDirectories = cd(pathToNewDirectory, currentDirectory, currentDirectoryString)
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
    console.log('\n' + currentDirectoryString)
  }
})

process.on('exit', () => console.log(`\nThank you for using File Manager, ${userName}!`))