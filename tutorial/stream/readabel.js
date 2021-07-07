/**
 * 在传统的方式中,当告诉程序读取文件时,会将文件从头到尾读入内存,然后进行(超大文件时内存不够就出错)
 * 使用流,则可以逐个片段地读取并处理(无需全部保存在内存中)
 * stream模块提供了构建所有流的API的基础.所有的流都是EventEmitter的实例
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "README.md");

const server = http.createServer((req, res) => {
  // it costs lots of time when data.txt is huge.
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end();
    }
    res.end(data);
  });
});

server.listen(3000);

const streamServer = http.createServer((req, res) => {
  // Using steam to read file
  const stream = fs.createReadStream(filePath);

  // res is a writerable stream
  // pipe 返回值是目标流,也就是res
  stream.pipe(res);
});

streamServer.listen(3003);
