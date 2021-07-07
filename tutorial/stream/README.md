流驱动的 Nodejs API

- process.stdin => 返回连接到 stdin 的流
- process.stdout => 返回连接到 stdout 的流
- process.stderr => 返回连接到 stderr 的流
- fs.createReadStream() => 创建文件的可读流
- fs.createWriteStream() => 创建文件的可写流
- net.connect() => 启动基于流的连接
- http.request() => 返回 http.ClientRequest 类的实例,该实例是可写流
- zlib.createGzip() => 使用 gzip(压缩算法)将数据压缩到流中
- zlib.createGunzip() => 解压缩 gzip 流
- zlib.createDeflate() => 使用 deflate(压缩算法)将数据压缩到流中
- zlib.createInflate() => 解压缩 deflate 流

不同类型的流
- Readable: 可以通过pipe读取,但不能写入的流
- Writable: 可以通过pipe写入,但不能读取的流
- Duplex: 既可以读取也可以写入的流
- Transform: 类似Duplex,但其输出是其输入的转换的转换流