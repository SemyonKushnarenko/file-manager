import os from 'os'
import path from 'path'
import { stdin, exit } from 'process'
import * as readline from 'readline'
import EventEmitter from 'events'
const event = new EventEmitter

import { greeting } from './src/greeting.js'
import { calcHash } from './src/calcHash.js'
import { osInput } from './src/osInput.js'
import { changeDirectory } from './src/changeDirectory.js'
import { up } from './src/up.js'
import { cd } from './src/cd.js'
import { ls } from './src/ls.js'
import { cat } from './src/cat.js'
import { add } from './src/add.js'
import { rn } from './src/rn.js'
import { rm } from './src/rm.js'
import { cp } from './src/cp.js'
import { compress } from './src/compress.js'
import { decompress } from './src/decompress.js'

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
    console.log('')
    switch (data) {
      case '.exit':
        exit()
      case data.match(/hash\s.+/)?.input:
        const pathToHashFile = path.join(currentDirectory, data.split(/ +/)[1])
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
        const pathToNewDirectory = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1))
        newDirectories = cd(pathToNewDirectory, currentDirectory, currentDirectoryString)
        currentDirectory = newDirectories[0] 
        currentDirectoryString = newDirectories[1]
        break
      case 'ls':
        const files = await ls(currentDirectory)
        files.forEach(file => console.log(file))
        break
      case data.match(/cat\s+.+/)?.input:
        const pathToCatFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1))
        cat(pathToCatFile)
        break
      case data.match(/add\s+.+/)?.input:
        const pathToAddFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1))
        add(pathToAddFile)
        break
      case data.match(/rm\s+.+/)?.input:
        const pathToRemoveFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1))
        rm(pathToRemoveFile)
        break
      case data.match(/rn\s+.+\s+.+/)?.input:
          const pathToOldFileName = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          const pathToNewFileName = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/)[1])
          rn(pathToNewFileName, pathToOldFileName)
        break
      case data.match(/cp\s+.+\s+.+/)?.input:
          const pathToCopyFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          const pathToCopyDestinationFolder = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/).splice(1).join(' '), data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          cp(pathToCopyFile, pathToCopyDestinationFolder)
        break
      case data.match(/mv\s+.+\s+.+/)?.input:
          const pathToMoveFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          const pathToMoveDestinationFolder = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/).splice(1).join(' '), data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          cp(pathToMoveFile, pathToMoveDestinationFolder)
        break
      case data.match(/compress\s+.+\s+.+/)?.input:
          const pathToCompressFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          const pathToCompressDestinationFolder = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/).splice(1).join(' '))
          compress(pathToCompressFile, pathToCompressDestinationFolder)
        break
      case data.match(/decompress\s+.+\s+.+/)?.input:
          const pathToDecompressFile = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/)[0])
          const pathToDecompressDestinationFolder = path.join(currentDirectory, data.slice(data.split(' ')[0].length + 1).split(/ +/).splice(1).join(' '))
          console.log(pathToDecompressFile);
          console.log(pathToDecompressDestinationFolder.slice(0,-3));
          decompress(pathToDecompressFile, pathToDecompressDestinationFolder)
          
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

event.on('error', () => console.log('Operation failed'))

process.on('exit', () => console.log(`\nThank you for using File Manager, ${userName}!`))