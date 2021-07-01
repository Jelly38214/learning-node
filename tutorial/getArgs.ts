// http://nodejs.cn/learn/nodejs-accept-arguments-from-the-command-line

/**
 * argv数组
 * 第一个值是`node`执行文件所在路径
 * 第二个值是当前被执行文件
 * 之后的才是其他传入参数
 */
process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

// 获得用户传递的参数
const args = process.argv.slice(2);
console.log(args);
