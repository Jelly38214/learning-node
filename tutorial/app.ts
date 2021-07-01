import { createServer } from "http";
const hostname = "127.0.0.1";
const port = 3000;

// NOTE: req is Stream.Readable, res is Stream.Writable
const server = createServer((_req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World", "utf8");
});

server.listen(port, hostname, () => {
  console.log(`服务运行在 http://${hostname}:${port}`);
});

process.on("SIGTERM", server.close);
