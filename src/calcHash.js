import crypto from 'crypto'
import fs from 'fs'

export const calcHash = fileToHash => {
    fs.readFile(fileToHash, (err, data) => {
        if (err) throw new Error(err.message)
        console.log(crypto.createHash('sha256').update(data).digest('hex'))
    })
};