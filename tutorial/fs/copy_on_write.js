const fs = require("fs");
const fsPromises = fs.promises;
/** Reference: https://mp.weixin.qq.com/s/nQ6wHZ4H7ULcvN-rwLP-GA
 * 文件复制这件事最常见的思路就是完全写一份相同的文件内容到另一个位置,但是这样有两个问题:
 * 1. 完全写一份相同的内容, 如果同样的文件复制了几百份,那么也创建相同的内容几百次, 浪费硬盘空间
 * 2. 如果写到一半断电了, 覆盖的内容如何恢复?
 *
 * 操作系统设计者就想到了COW技术
 * COW: Copy On Write, 写时复制
 * 复制只是添加一个引用到之前的内容(指针), 如果不修改并不会真正复制, 只有到第一次修改内容的时候才去真正复制对应的数据块,这样可以避免浪费硬盘空间;
 * 写文件时会先在另一个空闲磁盘块做修改,等修改完后才会复制到目标位置,这样就不会有断电无法回滚的问题
 *
 *  Node.js的fs.copyFile的api就可以使用COW模式
 */

/**
 * @type {{[p in key]: string }}
 * @description COPYFILE_EXCL: 如果目标文件已存在,会报错(默认是覆盖),值为1
 * @description COPYFILE_FICLONE: COW,如果系统不支持就转真正的复制(默认是直接复制) 值为2
 * @description COPYFILE_FICLONE_FORCE: COW, 系统不支持就报错 值为4
 */
// const {COPYFILE_EXCL, COPYFILE_FICLONE,COPYFILE_FICLONE_FORCE} = fs.constants

// 可以通过按位或把它们合并之后传入(配置组合)
// const flags = COPYFILE_FICLONE

(async () => {
  try {
    await fsPromises.copyFile(
      "package.json",
      "package_bk.json",
      fs.constants.COPYFILE_FICLONE
    );
  } catch (error) {
    console.log(error.message);
  }
})();
