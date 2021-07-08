/**
 * 使用serverRes给客户端返回:状态码/状态描述信息, 响应头部, 响应主体
 * 主要的方法,属性
 * serverRes.statusCode, serverRes.statusMessage, serverRes.writeHead(number, string, object)
 * 当执行了serverRes.writeHead(number, string, object)，意味着这些信息都已经发送到客户端啦,就不能再修改啦, statusCode/statusMessage再设置,无效,setHeader则会报错
 */
const http = require("http");

/**
 * 设置状态码,状态描述信息, 响应头部, 响应主体
 */
http
  .createServer((serverReq, serverRes) => {
    serverRes.statusCode = 200;
    serverRes.statusMessage = "ok";
    serverRes.end("success.");
  })
  .listen(3000);

/**
 *  serverRes.writeHead(number, string, object)可以提供额外的能力,比如设置响应头
 */
http
  .createServer((serverReq, serverRes) => {
    serverRes.writeHead(200, "ok", {
      "Content-Type": "text-plain",
    });

    serverRes.end("success.");
  })
  .listen(3003);

/**
 * 当使用serverRes.writeHead设置了头部并发送了出去,就不能在设置头部,否则报错: 'Cannot set headers after they are sent to the client
 */

http
  .createServer((serverReq, serverRes) => {
    serverRes.writeHead(200, "ok", {
      "Content-Type": "text-plain",
    });
    serverRes.setHeader(("Content-Type", "text-plain"));

    serverRes.end("success.");
  })
  .listen(3004);

/**
 * serverRes.writeHead会覆盖serverRes.statusCode, serverRes.StatusMessage, 以及用setHead设置的同名头部(这里需要注意,它不区分大小写什么都的,是要完成一样才会覆盖,比如content-type, Content-Type就是两个完全不一样的头部,不会被覆盖)
 */
http
  .createServer((serverReq, serverRes) => {
    serverRes.statusCode = 400;
    serverRes.statusMessage = "fail";
    serverRes.setHeader("Conent-Type", "application/json");

    serverRes.writeHead(200, "ok", {
      "Content-Type": "text-plain",
    });

    serverRes.end("success.");
  })
  .listen(3007);
