const http = require("http");

const nodeHeapDump = require("heapdump");

const leakArray = [];
const leak = function () {
  leakArray.push("leak" + Math.random());
};

http
  .createServer((serverReq, serverRes) => {
    leak();
    serverRes.writeHead(200, { "Content-Type": "text/plain" });
    serverRes.end("Hello World\n");
  })
  .listen(1337);

console.log(
  "Server running at http://127.0.0.1:1337, and its pid is " + process.pid
);
