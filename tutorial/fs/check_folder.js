/**
 * 检查文件夹是否存在
 * 创建新的文件夹
 * 读取目录内容
 * 重命名文件夹
 * 删除文件夹
 */

const fs = require("fs");
const path = require("path");

const folder_path = path.resolve(__dirname, "./check_folder");

/**
 * 检查文件夹是否存在以及Node.js是否具有访问权限
 * existsSync更好用些
 * */

fs.access(folder_path, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("check_folder Exits.");
});

fs.exists(folder_path, (isExist) => {
  if (!isExist) {
    // 使用mkdirSync/mkdir创建文件夹
    fs.mkdirSync(folder_path);
    console.log("Create folder successfully.");
  }

  fs.writeFileSync(path.resolve(folder_path, "output.txt"), "content", {
    flag: "w",
  }); // 替换
});

/**
 * 读取目录内容:readdir, readdirSync
 */
fs.readdir(folder_path, { encoding: "utf8" }, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Content in folder:", files);

  const fileList = files
    .map((fileName) => {
      return path.join(folder_path, fileName);
    })
    .filter((file) => fs.lstatSync(file).isFile());

  console.log("File in folder:", fileList);
});

/**
 * 重命名文件夹:rename, renameSync
 */

fs.rename(folder_path, path.resolve(__dirname, 'rename_check_folder'), err => {
  if(err) {
    console.error(err)
    return
  }

  console.log('rename folder done')
})

/**
 * 删除文件夹:rmdir,rmdirSync
 * 或者使用fs-extra模块
 */