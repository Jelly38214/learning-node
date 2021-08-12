// 参数有两种, Deno runtime flag, script arguments
// 文件名前面的是runtime flag, 文件名后面的是script arguments
// 执行命令 deno run get_script_arg.ts props -color --red
console.log(Deno.args) // ["props", "-color", "--red"]