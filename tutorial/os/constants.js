const os = require('os')

console.log('signals:',os.constants.signals) // 获得一个对象包含与进程信号相关的变量
console.log('errno:',os.constants.errno) // 获得一个对象包含可用于设置错误报告的常量

console.log('系统架构:',os.arch()) // arm/x64/arm64

console.log('cpu信息:', os.cpus().length)

console.log('可用内存字节数:', os.freemem())

console.log('当前用户主目录路径:', os.homedir())

console.log('主机名:', os.hostname())

console.log('编译的平台:', os.platform())

console.log('操作系统版本号:',os.release())

console.log('返回临时文件夹路径:', os.tmpdir())

console.log('返回系统中可用的总内存字节数:',os.totalmem())

console.log('当前操作系统:', os.type()) // Linux/Darwin/Window_NT

console.log('自上次重启以来计算机持续运行的秒数:', os.uptime())

console.log('当前用户信息:', os.userInfo())