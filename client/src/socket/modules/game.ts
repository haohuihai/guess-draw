import { useDrawOneDraw } from '@/stores/modules/game'
import { ElNotification, ElMessage } from 'element-plus'
const drawOneDraw = useDrawOneDraw()
const connectGame = (socket) => {
  drawOneDraw.updateConnected(true)
  // 此时用户进入房间获取到房间的信息， 用户列表， 是否是房主等
  socket.on('room_info', ({ nicknames, holder, lines }) => {
    // 获取都谁进入了房间
    drawOneDraw.updateNicknames(nicknames)
    // 更新房间房主信息
    drawOneDraw.updateHolder(holder)
    // 更新画线
    drawOneDraw.updateLines(lines)
  })
  // 此时通知房间其他人，谁进入房间,广播消息
  socket.on('user_enter', (nickname) => {
    // 进入房间的昵称 nickname
    drawOneDraw.addToNicknames(nickname)
  })

  // 返回游戏已经开始了
  socket.on('already_started', (holder) => {
    drawOneDraw.updateHolder(holder) // 这里是为了更新游戏主持，
    ElNotification({
      type: 'warning',
      message: `当前游戏已经进行中辣，主持人是 ${holder}`
    })
  })

  // 返回游戏正式开始
  socket.on('game_started', (holder) => {
    drawOneDraw.updateHolder(holder)
    ElNotification({
      type: 'success',
      message: `${holder} 作为主持人，已经成功开始了游戏，大家可以开始猜答案啦！`
    })
  })
  // 监听服务器终止游戏的事件
  socket.on('game_stoped', () => {
    // 清除相关的数据 游戏主持，线条
    drawOneDraw.updateHolder('')
    drawOneDraw.updateLines([])
    // 2. 弹出提示消息
    ElNotification({
      type: 'warning',
      message: `主持人终止了当前的游戏`
    })
  })
  // 监听答案是否正确
  socket.on('game_answered', ({ alreadyDone, success, nickname, answer }) => {
    if (alreadyDone) {
      ElMessage.error('当前答案已经被人猜中啦，您不能再猜了')
      return
    }
    if (!success) {
      ElNotification({
        type: 'error',
        message: `玩家 ${nickname} 猜的答案不对！ ${answer}`
      })
      return
    }
    // 排除上述 已经被人猜中，答案错误的情况，剩下的就是答案正确的情况
    ElMessage.error(`玩家 ${nickname} 猜中了正确的答案: ${answer}`)
  })
  // 监听线的绘制
  socket.on('starting_line', (line) => {
    drawOneDraw.drawNewLine(line)
  })
  // 监听更新的线条
  socket.on('updating_line', (line) => {
    drawOneDraw.updateNewLine(line)
  })
  // 监听用户离开房间
  socket.on('user_leave', (nickname) => {
    // 将离开的人，从vuex nicknames中移除该项
    drawOneDraw.delFromNicknames(nickname)
    // 其他人退出，没有任何问题，主持人如果退出了，做提示，主持人离开了，并清空信息
    if (nickname === drawOneDraw.getHolder) {
      drawOneDraw.updateHolder('')
      drawOneDraw.updateLines([])
      ElNotification({
        type: 'warning',
        message: '主持人离开了游戏！'
      })
    }
  })
  // 断开连接
  socket.on('disconnect', () => {
    drawOneDraw.updateConnected(false)
  })
}

export default connectGame
