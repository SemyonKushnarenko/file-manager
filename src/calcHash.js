import crypto from 'crypto'
import fsPromises from 'fs/promises'

export const calcHash = async fileToHash => {
    await fsPromises.readFile(fileToHash).then(data => {
        console.log(crypto.createHash('sha256').update(data).digest('hex'))
    })
}