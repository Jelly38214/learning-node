const http = require("http");
const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const blog = require("./src/controller/blog");
const { rename } = require("fs");

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
      } else {
        resolve(JSON.parse(postData));
      }
    });
  });
};

const server = http.createServer((req, res) => {
  // Set default returned data format: JSON
  res.setHeader("Content-type", "application/json");

  // Get path
  const url = req.url;
  req.path = url.split("?")[0];

  // Resolve query
  req.query = querystring.parse(url.split("?")[1]);

  // Get post data
  getPostData(req).then((postData) => {
    req.body = postData;

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    const userResult = handleUserRouter(req, res);
    if (userResult) {
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
