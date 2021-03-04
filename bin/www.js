const http = require("http");
const PORT = process.env.PORT || 8000;
const serverHandle = require("../app");

const server = http.createServer(serverHandle);

server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
