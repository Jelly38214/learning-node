const http = require("http");
const querystring = require("querystring");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const server = http.createServer((req, res) => {
  // Set default returned data format: JSON
  res.setHeader("Content-type", "application/json");

  // Get path
  const url = req.url;
  req.path = url.split("?")[0];

  // Resolve query
  req.query = querystring.parse(url.split("?")[1]);

  const blogData = handleBlogRouter(req, res);

  if (blogData) {
    return res.end(JSON.stringify(blogData));
  }

  const userData = handleUserRouter(req, res);
  if (userData) {
    return res.end(JSON.stringify(userData));
  }

  // 404
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 Not Found");
  res.end();
});

server.listen(8000);
