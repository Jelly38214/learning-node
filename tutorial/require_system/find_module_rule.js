//参考: http://www.ruanyifeng.com/blog/2015/05/require.html
/**
 * 当执行a.js时,会报错: cannot find module 'b.js'
 * 涉及到模块的查找机制
 */

/**
 * 模块查找机制, 当Node遇到require(X)时, 按下面的"顺序"处理
 * 0. 如果有缓存过,取出缓存返回,查找结束
 * 1. X是内置模块(require('http')), 返回该模块,查找结束
 * 2. X以"./" or "/" or "../"开头,也就是带路径的
 *   a. 根据X所在的父模块(引入X的模块),确定X的绝对路径
 *   b. 将X当成"文件", 依次查找(X,X.js,X.json,X.node),只要找到就返回,查找结束
 *   c. 将X当成"目录",依次查找(X/package.json(main字段对应的文件), X/index.js, X/index.json, X/index.node)
 * 3. X不带路径
 *   a. 根据X所在的父模块(引入X的模块),确定X的绝对路径
 *   b. 依次在每个目录中,将X当成文件名或目录名查找
 * 4. 抛出 "not found"错误
 */

//====== Example =======
/**
 * 引入b模块,根据不带路径,符合规则3
 * 根据父模块,也就是本模块确定b的绝对路径:
 * 1. 将b看出文件名
 *   a. 外层路径/tutorial/require_system/node_modules/b{js,json,node}
 *   b. 外层路径/tutorial/node_modules/b{js,json,node}
 *   c. 外层路径/node_modules/b{js,json,node}
 *   .....
 *   n. /node_modules/b{js,json,node}
 * 2. 将b看出目录
 *   a. 外层路径/tutorial/require_system/node_modules/b/{package.json, index.js, index.json, index.node}
 *   b. 外层路径/tutorial/node_modules/b/{package.json, index.js, index.json, index.node}
 *   c. 外层路径/node_modules/b/{package.json, index.js, index.json, index.node}
 *   .....
 *   n. /node_modules/b/{package.json, index.js, index.json, index.node}
 */
const b = require("b");
