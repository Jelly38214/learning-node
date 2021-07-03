const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  /**
 * 获取请求携带的postData
 * 当使用http.createServer初始化http服务器时,服务器会在只要获得http请求头(而不是请求正文时)时调用回调
 * 传入的request对象是一个可读流
 */
  let data = ''
  req.on('data', (chunk) => {
    data += chunk
  })

  req.on('end', () => {
    console.log('\n数据读取完毕:', data)

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello World\n')
  })
})



server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})