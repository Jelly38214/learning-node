const Stream = require("stream");

const readableStream = new Stream.Readable({
  read() {},
});

const writableStream = new Stream.Writable({
  write(content, encoding, next) {
    console.log("Get:", content.toString());
    next();
  },
});

readableStream.pipe(writableStream);

readableStream.push("Hi");
readableStream.push("发送");
