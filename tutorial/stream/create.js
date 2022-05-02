// https://heptaluan.github.io/2019/10/09/Node/01/

const Stream = require("stream");

/**
 * 四种流
 * Readable 需要实现_read方法来返回内容
 * Writable 需要实现_write方法来接受内容
 * Duplex 需要实现_read和_write方法来接受和返回内容
 * Transform 需要实现_transform方法来把接受的内容转换之后返回
 */

/**
 * 三种创建方式
 * 1.流实例在创建时配置相应需要实现的方法: new Stream.Readable({read() {}})
 * 2.先创建实例,再给实例赋相应的方法: const r = new Stream.Readable(); r._read = () => {}
 * 3.创建一个继承对应流的类 class R extends Stream.Readable {read() {}}
 */

/**
 * 可读流: 它从某个地方获取数据后,给你提供数据的, 你通过data事件来接受这些数据
 * 可写流: 你给它提供数据, 然后它将这些数据写入到某个地方
 */

const readable = Stream.Readable({
  read() {
    this.push("read 1");
    this.push("read 2");
    this.push("read 3");
    this.push("\n");

    // push一个null时,就表示流已结束
    this.push(null);
  },
});

// type of data is a buffer.
readable.on("data", (data) => {
  console.log("readable series:", data.toString());
});

readable.on("end", () => {
  console.log("readable done~");
});

class ReadableWithIterator extends Stream.Readable {
  constructor(iterator) {
    super();
    this.iterator = iterator;
  }

  _read() {
    const next = this.iterator.next();

    if (next.done) {
      return this.push(null);
    }

    this.push(next.value);
  }
}

function* generator() {
  yield "Generator-1";
  yield "Generator-2";
}

const iterator = generator();
const readableWithIterator = new ReadableWithIterator(iterator);

readableWithIterator.on("data", (data) => {
  console.log("rWithIterator series:", data.toString());
});

readableWithIterator.on("end", () => {
  console.log("rWithIterator done~");
});

/**
 * duplex流的流入和流出内容不需要相关, 而transform流的流入和流出是相关的
 * 比如duplex的流出可以从A文件,写入可写到B文件,彼此独立不干扰
 *  transform更像一条流水线管道,输出是基于输入的,一定要有输入才有输出
 */
var duplexStream = Stream.Duplex({
  read() {
    this.push("read1 in duplex");
    this.push("read2 in duplex");
    this.push(null);
  },
  write(data, enc, next) {
    // console.log(data.toString());
    this.push(data.toString().split("").reverse().join(""));
    next();
  },
});

duplexStream.on("data", (data) =>
  console.log("Duplex series:", data.toString())
);
duplexStream.on("end", (data) => console.log("duplex read done~"));

duplexStream.write("write1 in duplex");
duplexStream.write("write2 in duplex");

duplexStream.end();

duplexStream.on("finish", (data) => console.log("duplex write done~"));

class TransformReverse extends Stream.Transform {
  constructor() {
    super();
  }

  _transform(buf, enc, next) {
    const res = buf.toString().split("").reverse().join("");
    this.push(res);

    next();
  }
}

var transformStream = new TransformReverse();

transformStream.on("data", (data) =>
  console.log("transform data:", data.toString())
);
transformStream.on("end", (data) => console.log("transform read done~"));

transformStream.write("transform write 1");
transformStream.write("transform write 2");

transformStream.end();

transformStream.on("finish", (data) => console.log("transform write done~"));

/**
 * stream的暂停和流动
 * readable steam有个readableFlowing的属性,代表是否自动读入数据
 * 默认为true, 也就是自动读入数据,然后监听data事件就可以拿到啦
 * 设置为false, 需要手动通过read方法来读入
 */
var pausedStream = new Stream.Readable({
  read() {
    this.push("pausedStream 1~\n");
    this.push("pausedStream 2~");
    this.push(null);
  },
});
pausedStream.readableFlowing = false;

let data;
// 手动read麻烦,可以使用自动流入的方式,调用pause/resume来暂停和恢复
while ((data = pausedStream.read()) !== null) {
  console.log(data.toString());
}

// 当调用writable stream的write方法的时候会返回一个boolean值代表数据是写入目标啦还是放在了缓冲区
// true: 数据已写入目标
// false: 目标暂未写入目标,暂时存放在缓冲区
var rsWithPause = new Stream.Readable({
  read() {
    this.push("hello");
    this.push("world");
    this.push(null)
  },
});

var wsWithPause = new Stream.Writable({
  write(buff, enc, next) {
    console.log('wsWithPause Data:',buff.toString())
    next() 
  }
})

rsWithPause.on('data', (buff) => {
  if(!wsWithPause.write(buff)) {
    rsWithPause.pause();
  }
})

// 写入流把数据成功写入目标后,触发drain事件
wsWithPause.on('drain', () => {
  rsWithPause.resume();
})
