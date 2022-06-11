import os from 'os'
import path from 'path'
import {stdout, stdin, exit} from 'process'
import * as readline from 'readline'

import { greeting } from "./src/greeting.js"
import { calcHash } from './src/calcHash.js'

const userName = process.argv[2].split('=')[1]
let currentDirectory = os.userInfo().homedir
let currentDirectoryString = `You are currently in ${currentDirectory}\n`

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
        switch (data.split(' ')[1].slice(2)) {
          case "cpus":
            console.log(os.cpus())
            break
          case "homedir":
            console.log(os.userInfo().homedir)
            break
          case "username":
            console.log(os.userInfo().username)
            break
          case "EOL":
            console.log(os.EOL)
            break
          case "architecture":
            console.log(os.arch())
            break
          default:
            console.log("Invalid input")
        }
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