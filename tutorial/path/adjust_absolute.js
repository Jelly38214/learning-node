const path = require('path')

console.log(path.isAbsolute('/test/something')) // true
console.log(path.isAbsolute('/test/something/a.txt')) // true
console.log(path.isAbsolute('./test/something/a.txt')) // false