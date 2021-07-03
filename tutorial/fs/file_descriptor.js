// https://www.cnblogs.com/qianye/archive/2012/11/24/2786357.html
const fs = require('fs')

/**
 * 常见的OpenMode: r+->读写; w+->读写,流定位到开头,不存在就创建该文件; a->写,流定位到末尾,不存在就创建;a+->读写,将流定位到末尾,不存在就创建
 * a其实是append
 * open的路径相对的是node执行命令所在目录
 */
fs.open('./package.json', 'r', (err, fd) => {
  // fd是文件描述符是一个数字, r表示打开文件用于读取
  console.log(fd)
})