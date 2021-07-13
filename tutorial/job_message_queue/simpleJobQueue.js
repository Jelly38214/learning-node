const { resolve } = require("path");

const queue = [];

let dispatching;

async function dispatch() {
  if (dispatching) return;

  dispatching = true;

  for (
    let task;
    (task = queue.shift());
    await Promise.resolve(task()).catch(console.error)
  );

  dispatching = false;
}

function postJob(f) {
  if (typeof f !== "function") return;
  queue.push(f);

  dispatch();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

postJob(async () => {
  await sleep(1000);
  console.log("foo");
});

postJob(async () => {
  await sleep(1000);
  console.log("bar");
});

postJob(async () => {
  await sleep(2000);
  console.log("baz");
});
postJob(() => console.log("qux"));
