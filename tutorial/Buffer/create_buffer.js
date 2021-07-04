/**
 * 可以将buffer视为整数数组,每一个整数代表一个数据字节
 * Buffer被引入用于帮助开发者处理二进制数据
 * Buffer与流紧密相连,当流处理器接收数据的速度快于其消化的速度时,则会将数据放在buffer中
 */

/**
 * 创建Buffer的方式: Buffer.from, Buffer.alloc, Buffer.allocUnsafe
 */
console.log(Buffer.from('Hey!'))

/**
 * alloc和allocUnsafe的区别在于,前者会使用0进行初始化,因此速度慢些,后者不会,因此可能会保存着旧数据
 */
console.log(Buffer.alloc(1024)) 
console.log(Buffer.allocUnsafe(1024))
