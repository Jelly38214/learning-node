const http = require("http");
const Redis = require("ioredis");
const redisUrl = process.env.REDIS_URL || 6333
const redisClient = new Redis(redisUrl);
const Port = process.env.PORT || 8888

const {string10to62} = require('./utilis')

/**
 * 短连接生成： ID自增 => 10进制转62([0-9, A-Z, a-z])进制 => 短码
 */

// 全局自增长ID，每来一个长url，将其与一个自增id绑定，然后利用base62将该自增id转成字符串， 完成转换
let autoIncrId = 10000;
const LMAP = 'l2s'
const SMAP = 's2l'

http
  .createServer(async(req, res) => {
    if (req.method.toLowerCase() === "get") {
      // 如果是短路径，则302重定向
      const longLink = await redisClient.hget(SMAP, req.url)
      if (longLink) {
        res.writeHead(302, {
          Location: longLink,
        });
        res.end();
      } else {
        res.write("This url is not a short link, registry it pls.");
        res.end();
      }
    }

    if (req.url === "/registry" && req.method.toLowerCase() === "post") {
      let bodystring = "";
      req.on("data", (chunk) => {
        bodystring += chunk;
      });

      req.on("end", async() => {
        const bodyjson = JSON.parse(bodystring);
        let responseMsg = '';

        const longLink = bodyjson["lonkLink"];

        // 判断该长链接是否已经转化过
        const shortLink = await redisClient.hget(LMAP, longLink)

        if (shortLink) {
          responseMsg += `This long link has its short link: ${shortLink}`;
        } else {
          const shortLink = string10to62(autoIncrId++);
          await redisClient.hset(SMAP,`/${shortLink}`, longLink )
          await redisClient.hset(LMAP, longLink, `/${shortLink}`)
          responseMsg += `Registry Successfully, the short link is ${shortLink}`;
          console.log(
            `Registry a longLink: ${longLink} and its short link is: ${shortLink}`
          );
        }
        res.end(responseMsg);
      });
    }
  })
  .listen(Port, async() => {
    console.log(`Short Link Server is listening at ${Port} port.`);
  });
