import https from 'https'

const data = JSON.stringify({
  todo: 'Do something'
})

// PUT 和 DELETE 请求使用相同的 POST 请求格式，只需更改 options.method 的值即可。
const options:https.RequestOptions = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length
  }
}

const request = https.request(options, res => {
  console.log('状态码:', res.statusCode) 

  res.on('data', (chunk) => {
    process.stdout.write(chunk)
  })
})

request.on('error', error => {
  console.error(error)
})

request.write(data)
request.end()