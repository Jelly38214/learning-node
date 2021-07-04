/**
 * 所有的方法都是在将全部内容写入文件之后才会将控制权返回给程序(在异步的版本中,这意味着执行回调)
 * 在这种情况下,更好的选择是使用流写入文件内容
 */
const fs = require('fs')
const path = require('path')

const content = '一些内容'
const content2 = '追加内容'
const filePath = path.resolve(__dirname, './output.txt')

/**
 * 默认情况下,替换文件内容,不存在则创建
 */
fs.writeFile(filePath, content, {flag: 'a'}, err => {
  if (err) {
    console.error(err)
    return
  }

  console.log('Write Successfully.')
})

fs.appendFile(filePath, content2, err => {
  if(err) {
    console.error(err)
    return
  }

  console.log('追加内容成功')
})