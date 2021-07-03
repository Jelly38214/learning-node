/**
 * Node.js文件属性
 * 每个文件都带有一组详细信息,可用fs.stat来检查
 */

const fs = require('fs')

fs.stat('./package.json', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log('文件属性:',stats)
  console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size // Byte
  )
})