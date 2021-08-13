import {
  readAllSync,
  readLines,
} from "https://deno.land/std@0.104.0/io/mod.ts";
import * as path from "https://deno.land/std@0.104.0/path/mod.ts";

const filename = path.resolve(Deno.cwd(), "io", "main.ts");
console.log("直接读全部内容: ", Deno.readTextFileSync(filename));

let fileReader = await Deno.open(filename);
// console.log("一次读: \n", new TextDecoder().decode(readAllSync(fileReader)));

for await (let line of readLines(fileReader)) {
  console.log("逐行内容:", line);
}

fileReader.close();
