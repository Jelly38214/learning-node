const http = require('http')

console.log(http.METHODS) // 所有支持的http method

console.log(http.STATUS_CODES) // 所有的http状态码及其描述

console.log(http.globalAgent) // 指向Agent对象的全局实例,是http.Agent类的实例


/**
 * http模块提供了5个类
 * http.Agent: http.globalAgent的构造函数, globalAgent维护一个socket池,确保对服务器每个请求进行排队并且单个socket被复用
 * http.ClientRequest: http.request的返回结果
 * http.Server: http.createServer的返回结果
 * http.ServerResponse: http.createServer回调中的response
 * http.IncomingMessage: http.createServer回调中的request
 */