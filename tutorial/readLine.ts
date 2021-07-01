// http://nodejs.cn/learn/accept-input-from-the-command-line-in-nodejs
import * as readline from 'readline'

const interaction =  readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

interaction.question('Typing your name: ', name => {
  console.log('Here is your name: ' + name)
  interaction.close()
})
