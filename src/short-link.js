const http = require("http");
const querystring = require("querystring");

/**
 * 短连接生成： ID自增 => 10进制转62([0-9, A-Z, a-z])进制 => 短码
 */

// 生产环境需将字符打乱防止被预测
const CHARS = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ";

// 全局自增长ID，每来一个长url，将其与一个自增id绑定，然后利用base62将该自增id转成字符串， 完成转换
let autoIncrId = 10000;

// 全局字典对象，模拟redis来存储短路径 -> 长路径的映射关系
const shortLongMap = {};

function string10to62(number) {
  const charsArr = CHARS.split("");
  const radix = CHARS.length;
  let qutient = +number;
  let encodeStr = "";
  do {
    // 除数*商+余数 = 被除数
    let mod = qutient % radix;
    qutient = (qutient - mod) / radix;
    encodeStr = charsArr[mod] + encodeStr;
  } while (qutient);

  return encodeStr;
}

http
  .createServer((req, res) => {
    if (req.method.toLowerCase() === "get") {
      // 如果是短路径，则重定向
      console.log(req.url)
      if (req.url in shortLongMap) {
        res.writeHead(302, {
          Location: shortLongMap[req.url],
        });
        res.end();
      } else if (Object.values(shortLongMap).includes(req.url)) {
        const shortLink = Object.entries(shortLongMap).filter(([key, value]) => value === req.url)[0][0]
        res.write(`Yes, This is a long Link and its short Link is ${shortLink}`);
        res.end();
      } else {
        res.write('This url is neight long link nor short link.')
        res.end()
      }
    }

    if (req.url === "/registry" && req.method.toLowerCase() === "post") {
      let bodystring = "";
      req.on("data", (chunk) => {
        bodystring += chunk;
      });

      req.on("end", () => {
        const bodyjson = JSON.parse(bodystring);
        let responseMsg = "Registry Successfully, the short link is";

        const longLink = bodyjson["lonkLink"];

        // 判断该长链接是否已经转化过
        const matchedKey = Object.entries(shortLongMap)
          .filter(([key, value]) => value === longLink)
          .reduce((prev, next) => prev + next[0], "");

        if (matchedKey) {
          responseMsg += matchedKey;
        } else {
          const shortLink = string10to62(autoIncrId++);
          shortLongMap[`/${shortLink}`] = `/${longLink}`;
          responseMsg += " " + shortLink;
          console.log(
            `Registry a longLink: ${longLink} and its short link is: ${shortLink}`
          );
        }
        res.end(responseMsg);
      });
    }
  })
  .listen(8080, () => {
    console.log("Short Link Server is listening at 8080 port.");
  });
