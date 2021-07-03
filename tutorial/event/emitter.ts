// Node使用events模块构建事件系统
// const EventEmitter = require('events')
import EventEmitter from 'events'
const eventEmitterInstance:EventEmitter = new EventEmitter()

eventEmitterInstance.on('start', (begin: number, end:number) => {
  console.log(`开始 ${begin} ${end}`)
})

// 传递多个参数给监听函数
eventEmitterInstance.emit('start', 1, 100)


// 单次监听
eventEmitterInstance.once('once', () => {
  console.log('只执行一次') // 只会输出一次
})


let count = 0
const intervalID:NodeJS.Timeout = setInterval(() => {
  count++
  eventEmitterInstance.emit('once')

  if(count === 2) {
    clearInterval(intervalID)
  }
  
}, 1000)