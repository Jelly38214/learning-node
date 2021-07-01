// https://dev.to/ynmanware/setimmediate-settimeout-and-process-nexttick-3mfd
// 每次callStck empty了就是去执行nextTickQueue, 之后去看workQueue, 最后才去看messageQueue
const bar = () => console.log("bar");
const baz = () => console.log("baz");

// Start -> nextTick -> Before Bar -> bar
const foo = async () => {
  console.log("Start");
  setTimeout(bar, 100); // Put bar into messageQueue
  setImmediate(() => {
    console.log("Immediate"); // Put fn into messageQueue
  });
  process.nextTick(() => console.log("nextTick")); // Put fn into nextTickQueue
  new Promise((resolve, _reject) => {
    resolve("Before Bar"); // Put fn into workQueue
  }).then(console.log);
};

foo();
