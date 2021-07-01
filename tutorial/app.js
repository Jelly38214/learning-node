"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const hostname = "127.0.0.1";
const port = 3000;
// NOTE: req is Stream.Readable, res is Stream.Writable
const server = http_1.createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World", "utf8");
});
server.listen(port, hostname, () => {
  console.log(`服务运行在 http://${hostname}:${port}`);
});
