//参考:https://github.com/jawil/blog/issues/18
/**
 * 相对路径,在不同的函数中有不一样的含义
 * 在require中, 相对的是__dirname
 * 在其他函数,相对的是node命令执行时所在目录 比如fs.readFile中j等同process.cwd()
 */

const path = require("path");
const fs = require("fs");

const b = require("./b"); // 正确

// 正确
fs.readFile(path.resolve(__dirname, "b"), () => {
  console.log("readFile运行");
});

// 错误
fs.readFile("./b", (err) => {
  console.log("readFileSync出错");
});
