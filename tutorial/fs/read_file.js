/**
 * readFile, readFileSync都会在返回数据之前将文件的全部内容读取到内存中
 * 这意味着大文件会对内存的消耗和程序执行的速度产生重大的影响
 */
const fs = require('fs')

fs.readFile('./package.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  console.log('Async version:',data)
})

const data = fs.readFileSync('./package.json', 'utf8')
console.log('Sync version:',data)