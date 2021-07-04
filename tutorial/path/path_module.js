//参考:https://github.com/chyingp/nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/path.md

/**
 * path按功能分三类: 获取所在目录路径,文件名和拓展名,以及路径组合
 */

const path = require("path");

/**
 * 获得文件所在目录路径
 */
const filePath = "/github/learning-node/tutorial/require_system/b.js";
console.log(path.dirname(filePath)); //=> /github/learning-node/tutorial/require_system/b.js

/**
 * 获取文件名: 其实只是输出路径的最后一部分,并不会判断是否有文件名
 */
console.log(path.basename("/tutorial/require_system/b.js")); //=>  b.js
console.log(path.basename("/tutorial/require_system/b.js/")); //=> b.js
console.log(path.basename("/tutorial/require_system/")); //=> require_system
console.log(path.basename("/tutorial/require_system")); //=> require_system

/**
 * 获取文件扩展名: 先对路径执行basename获取到最后一部分B,然后开始判断
 * 1.从B的最后一个.开始截取(包括.),直到最后一个字符
 * 2.如果B中不存在.或者B的第一个字符就是.的话,返回空字符
 */
console.log(path.extname("index.html")); // .html
console.log(path.extname("index.coffee.md")); // .md
console.log(path.extname("index.")); // .
console.log(path.extname("index")); // 空字符串
console.log(path.extname(".index")); // 空字符串

/**
 * 路径组合
 * path.resolve得到一个绝对路径,join不一定
 * reolve可以看成时从左到右执行cd命令,最终获得的绝对路径/文件名,空字符串or.or不传值相当于执行node时路径 
 * 假设当前执行node命令在/learning-node,本文件在/learning-node/tutorial/require_system/
 */
console.log(path.resolve('')) // 返回执行node命令所在目录绝对路 /learning-node
console.log(path.resolve('.'))// 返回执行node命令所在目录绝对路径 /learning-node
console.log(path.resolve('./code')) // 等同node执行路径下cd ./code -> /learning-node/code
console.log(path.resolve('code'))// 等同node执行路径下cd ./code -> /learning-node/code


