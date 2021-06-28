模块系统是ES Module的浏览器实现
默认屏蔽所有可能危险的权限,需要指定
存在window全局变量: `window===this, window===self, window===globalThis`

设计上,通过于浏览器API保持一致,来减少认知负担.如果服务端和浏览器存在相同概念,deno就不会创造新的概念

支持TS,异步操作全部返回Promise,使用ArrayBuffer处理二进制,没有node_modules