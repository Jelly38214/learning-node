# learning-node

## 模块系统及其查找，加载策略

![](https://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg)

> NODE_PATH: Node 允许通过 NODE_PATH 环境变量来指定额外的模块搜索路径
> NODE_PATH 环境变量中可以包含一个或多个目录路径, 路径之间在 Linux 下使用`:`分隔，在 window 下使用`;`分隔

```js
// 假设NODE_PATH=/home/user/lib:/home/lib
const bar = require("foo/bar");

/**
 *  模块查找路径
 *  1. /home/user/node_modules/foo/bar
 *  2. /home/node_modules/foo/bar
 *  ... 各层级的node_modules
 *
 *  // NODE_PATH指定的，额外的搜索路径
 *  3. /home/user/lib/foo/bar
 *  4. /home/lib/foo/bar
 * /

```

## Http 模块

主要的三个类：http.ClientRequest, http.Server, http.ServerResponse

### request 对象

`request instance` <- `http.ClientRequest` <- `Stream`

### response 对象

`response instance` <- `http.ServerResponse` <- `Stream`

| 属性或方法         | 解释                                                       |
| ------------------ | ---------------------------------------------------------- |
| statusCode = 200   | 设置状态码为 200                                           |
| end/end("success") | 结束本次请求, 当传内容时，类似 res.write(内容) + res.end() |



# Reference
  * http://nodejs.cn/learn/how-to-use-the-nodejs-repl
  * https://github.com/chyingp/nodejs-learning-guide