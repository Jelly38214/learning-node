/**
 * resolve4是异步非阻塞的,lookup是同步阻塞,最多发4个同时
 * 其次就是lookup会走本地dns,resolve4直接走的是网络dns,修改本地dns服务器的内容会影响到lookup
 */

const dns = require("dns");

dns.resolve4("www.baidu.com", (err, address) => {
  if (err) throw err;
  console.log("address: ", address); // string[]
});
