import https from 'https'

const options:https.RequestOptions = {
  hostname: 'nodejs.cn',
  port: 443,
  path: '/todos',
  method: 'GET'
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

request.end()