/**
 * server: http.Server -> net.Server 实例,用来提供服务,处理客户端请求
 * client: http.ClientRequest实例,用来向服务端发起请求
 * serverReq/clientRes: 都是http.IncomingMessage -> Stream.Readable实例. serverReq用来获取客户端请求相关信息. clientRes用来获取服务端返回的相关信息
 * serverRes: http.ServerResponse -> OutgoingMessage -> Stream.Writable的实例
 */

const http = require("http");
const net = require("net");

// 服务器server: 接收来自客户端的请求,并将客户端请求的地址返回给客户端
const server = http.createServer((serverReq, serverRes) => {
  const url = serverReq.url;
  serverRes.end("访问的地址是:" + url);
});

server.listen(3000);
console.log("http.Server继承net.Server:", server instanceof net.Server);

/**
 * http.IncomingMessage有三个属性需要注意: method, statusCode, statusMessage
 * method: 只在server端的实例有(serverReq.method)
 * statusCode/statusMessage: 只在client端的实例有(clientRes.statusCode/statusMessage)
 */
// 客户端client: 向服务器发起请求,并将服务器返回的内容打印到控制台
const client = http.get("http://127.0.0.1:3000", function (clientRes) {
  clientRes.pipe(process.stdout);
});

/**
 * http.Server基础net.Server
 */

var netServer = net.createServer((socket) => {
  console.log("Connected: " + socket.remoteAddress + ":" + socket.remotePort);

  socket.on("data", (data) => {
    console.log("Data " + socket.remoteAddress + ": " + data);
    console.log("Data is: " + data);

    socket.write('Data from you is "' + data + '"');
  });

  socket.on("close", () => {
    console.log("CLOSE: " + socket.remoteAddress + " " + socket.remotePort);
  });
});

netServer.listen(8989, "127.0.0.1");
