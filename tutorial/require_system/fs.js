const fs = require("fs");
const path = require('path')

fs.readFileSync(require.resolve("./b"), (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
});

console.log(__dirname, __filename, process.cwd(), path.resolve('./'), path.resolve('.'))
