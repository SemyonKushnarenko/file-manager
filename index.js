import os from 'os'

import { greeting } from "./src/greeting.js"

const userName = process.argv[2].split('=')[1]
const currentDirectory = os.userInfo().homedir
const currentDirectoryString = `You are currently in ${currentDirectory}\n`

greeting(userName)
process.stdout.write(currentDirectoryString)

process.stdin.on('data', dataBuffer => {

  process.stdout.write(currentDirectoryString)
})