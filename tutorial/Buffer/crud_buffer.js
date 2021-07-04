/**
 * Buffer可以像数组一样被访问,获得的数字时Unicode码
 */
const buf = Buffer.from('Hey!')
console.log(buf)

// toString能打印出buffer的全部内容
console.log(buf.toString()) // Hey!

// 获取长度
console.log(buf.length) // 4,每个英文字符占据一个字节
console.log(Buffer.from('中文').length) // 6, 每个中文占据3个字节

// 遍历Buffer
for (const item of buf) {
  console.log(item) // 72 101 121 33
}

// 更改Buffer内容
const allocBuffer = Buffer.alloc(4)
allocBuffer.write("Hey!!!") // 超过4个字节的字符,被忽略
console.log(allocBuffer.toString()) // Hey!

allocBuffer[1] = 111 // o
console.log(allocBuffer.toString()) // Hoy!

// 复制Buffer
const bufcopy = Buffer.alloc(4)
allocBuffer.copy(bufcopy, 0, 0, 2) // 从allocBuffer的0位置开始,复制2个字节到bufcopy,以0位置开始放置
console.log(bufcopy.toString()) // Hoy!

// 切片Buffer, 切片不是副本,只是原本buffer的局部视图,类似Go的slice
const slice = allocBuffer.slice(0, 1) // 包括开头,不包括结尾来截取,得到H
console.log(slice.toString()) // H

