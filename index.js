import os from 'os'
import {stdout, stdin, exit} from 'process'
import * as readline from 'readline'

import { greeting } from "./src/greeting.js"

const userName = process.argv[2].split('=')[1]
const currentDirectory = os.userInfo().homedir
const currentDirectoryString = `You are currently in ${currentDirectory}\n`

greeting(userName)
stdout.write(currentDirectoryString)

const rl = readline.createInterface({input: stdin, output: stdout});

rl.on('line', dataBuffer => {
  const data = dataBuffer.toString().trim()
  try {
    switch (data) {
      case '.exit':
        exit()
      default:
        console.log('\x1b[31m%s\x1b[0m', 'Invalid input')
        break;
    }
  } catch(err) {
    console.log('\x1b[31m%s\x1b[0m', 'Operation failed')
  }

  stdout.write('\n' + currentDirectoryString)
})

process.on('exit', () => stdout.write(`\nThank you for using File Manager, ${userName}!`))