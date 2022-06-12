import os from 'os'

export const osInput = data => {
  switch (data.split(' ')[1].slice(2)) {
    case "cpus":
      const cpus = os.cpus()
      const cpusInfo = cpus.map(cpu => {return {
        model: cpu.model,
        speed: cpu.speed
      }})
      console.log(cpusInfo)
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
      console.log('\x1b[31m%s\x1b[0m', 'Invalid input')
  }
}