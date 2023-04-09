import io from 'socket.io-client'

import connectGame from './modules/game'
const socket = io()

// 创建连接
// 进行连接监听
socket.on('connect', () => {
  console.log(123)
  // 绘画
  connectGame(socket)

})

export default socket
