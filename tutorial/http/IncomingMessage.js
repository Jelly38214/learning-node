/**
 * IncomingMessage类
 * 属性: aborted, close, headers, rawHeaders, statusCode(client端), statusMessage(client端)
 * httpVersion, url, socket
 * 方法: destroy, setTimeout
 */
const http = require("http");

获取请求相关信息
const getClientInfoServer = http.createServer((serverReq, serverRes) => {
  console.log(`
    1. 请求url: ${serverReq.url}
    2. http版本: ${serverReq.httpVersionl}
    3. http请求方法: ${serverReq.method}
    4. http请求头部: ${JSON.stringify(serverReq.headers)} 
  `);
});


getClientInfoServer.listen(3000)