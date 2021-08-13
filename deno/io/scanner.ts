import { readLines } from "https://deno.land/std@0.104.0/io/mod.ts";
import * as path from "https://deno.land/std@0.104.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.104.0/fs/mod.ts";

const sourcePath = Deno.args[0] ||
  prompt("Absolute path of source code directory: ") ||
  path.dirname(path.fromFileUrl(import.meta.url));

const isSourcePathExits = fs.existsSync(sourcePath);

if (!isSourcePathExits) {
  console.log("Wrong path, pls try again.");
  Deno.exit(0);
}

const excludedDir = ["node_modules", ".next"];
const includedExt = [".js", ".jsx", ".ts", "tsx"];

const cmsKeyCollect: { [key: string]: number } = {};
const cmsKeyReg = /\bIDS_[\w_-]+/;

async function iterateDir(folderPath: string) {
  const files = Deno.readDirSync(folderPath);

  const contentList = [];
  for (const file of files) {
    const fileName = file.name;
    const extension = path.extname(fileName);
    if (file.isDirectory && excludedDir.includes(fileName)) continue;

    if (file.isFile && !includedExt.includes(extension)) continue;

    contentList.push(path.resolve(folderPath, fileName));
  }

  const fileList = contentList.filter((content) =>
    Deno.statSync(content).isFile
  );
  const dirList = contentList.filter((content) =>
    Deno.statSync(content).isDirectory
  );

  for (const file of fileList) {
    const fileReader = Deno.openSync(file);
    for await (const lineContent of readLines(fileReader)) {
      const keyContentArray = cmsKeyReg.exec(lineContent);
      if (Array.isArray(keyContentArray)) {
        const key = keyContentArray[0];
        cmsKeyCollect[key] = cmsKeyCollect[key] ? cmsKeyCollect[key] + 1 : 1;
      }
    }
  }

  for (const dirPath of dirList) {
    await iterateDir(dirPath);
  }
}

await iterateDir(sourcePath);

console.log(
  "total keys:",
  Object.keys(cmsKeyCollect).length,
  JSON.stringify(cmsKeyCollect, null, 2),
);
