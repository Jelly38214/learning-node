const http = require("http");
const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const { getCookieExpires, getPostData } = require("./src/utils");
const { redisGet, redisSet } = require("./src/db/redis");

const server = http.createServer((req, res) => {
  // Set default returned data format: JSON
  res.setHeader("Content-type", "application/json");

  // Get path
  const url = req.url;
  req.path = url.split("?")[0];

  // Resolve query
  req.query = querystring.parse(url.split("?")[1]);

  // Resolve Cookie
  req.cookie = querystring.parse(req.headers.cookie, "; ");

  // Resolve Session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    redisGet(userId).then((value) => {
      if (!value) {
        req.session = {};
        redisSet(userId, {});
      } else {
        req.session = value;
      }
    });
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    redisSet(userId, {});
    req.session = {};
  }

  // Get post data
  getPostData(req).then((postData) => {
    req.body = postData;

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      if (needSetCookie) {
        res.setHeader(
          "Set-Cookie",
          `username=${userId}; path=/; httpOnly; expires=${getCookieExpires}`
        );
      }
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
      if (needSetCookie) {
        res.setHeader(
          "Set-Cookie",
          `username=${userId}; path=/; httpOnly; expires=${getCookieExpires}`
        );
      }
      userResult.then((userData) => {
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found");
    res.end();
  });
});

server.listen(8000);
