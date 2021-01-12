const http = require("http");
const path = require("path");

const filepath = "/tmp/demo/js/test.js";

http
  .createServer(function (req, res) {
    res.write("1. Hello world! \n");

    /**
     * path 模块
     */
    res.write(`2. ${path.dirname(filepath)}\n`); // 获取路径
    res.write(`3. ${path.basename(filepath)}\n`); // 获取文件名
    res.write(`4. ${path.extname(filepath)}\n`); // 获取文件名后缀

    // 严格意义上讲 basename只是输出路径的最后一部分，并不会判断是否是文件名
    // 只是大部分时候，用来作为`简易的获取文件名`的方法
    res.write(`5. ${path.basename("/tmp/demo/js/test/")}\n`); // => test
    res.write(`6. ${path.basename("/tmp/demo/js/test")}\n`); // => test

    // 只想获取文件名，不包括文件扩展
    res.write(`7. ${path.basename(filepath, ".js")}\n`); // test

    // 获取文件扩展名
    res.write(`8. ${path.extname(filepath)}\n`); // => .js

    // extname 的详细规则：先执行basename获取到路径最后一部分B
    // 1. 从B的最后一个`.`开始截取，直到最后一个字符
    // 2. 如果B不存在`.`或者B的第一个字符就是`.`那么返回空字符串
    res.write(`9. ${path.extname("index.")}\n`); // => .
    res.write(`10. ${path.extname(".index")}\n`); // => ""

    /**
     * 路径组合: join, resolve, normalize
     */

    /**
     * normalize的规则
     * 1. 路径为空,返回.相当于当前的工作路径
     * 2. 合并路径中重复的路径分隔符(如linux下的/)
     * 3. .和..相当于cd 它
     * 4. 如果路径最后有/, 那么保留该/
     */

    // join, 把paths用/拼起来，再normalize
    res.write(`11. ${path.join("/foo", "/bar", "/baz/asdf", "quux", ".")}\n`); // => "/foo/bar/baz/asdf/quux"
    res.write(`12. ${path.join("/foo", "bar", "baz/asdf", "quux", "..")}\n`); // => "/foo/bar/baz/asdf", 最后一步cd ..所以quux就没有啦
    res.write(`13. ${path.join("/foo", "/bar", "/baz/asdf", "quux", "/")}\n`); // => "/foo/bar/baz/asdf/quux/"

    // resolve 可简化看出在终端从左到右执行cd, 需注意空时，和shell不一样，它还是返回当前工作路径,而不去跳到~路径
    res.write(
      `14. ${path.resolve("/foo", "./bar", "./baz/asdf", "./quux", "..")}\n`
    ); // => "/foo/bar/baz/asdf"

    /**
     * ==============
     */

    res.end();
  })
  .listen(8080);

/**
 * Exercise:
 * - Read “index.html.template” file
 *  - On the request, read user browser information such as device (let’s check if user is mobile, tablet or desktop) and language (in en-gb form) (don’t tell the candidate to use headers, correct ones are “User-Agent” and “Accept-Language”, candidate can use any library to parse “User-Agent”)
 *  - Return read template file with replaced “{{device}}” with user device info and “{{language}}” with user preferred language
 */
