import Vue from 'vue'
import Vuex from 'vuex'
import socket from '../socket'

Vue.use(Vuex)

const state = {
  nickname: '', // 当前用户名
  nicknames: [], // 房间用户列表
  holder: '', // 游戏主持
  lines: [], // 游戏线条
  connected: false // 连接状态
}

const mutations = {
  // 进入房间获取到的信息用户昵称，用户列表，房主信息， 画线
  updateNickname(state, nickname) {
    state.nickname = nickname || ''
  },
  updateNicknames(state, nicknames) {
    console.log(nicknames)
    state.nicknames = nicknames || []
  },
  updateHolder(state, holder) {
    state.holder = holder || ''
  },
  updateLines(state, lines) {
    state.lines = lines || []
  },
  // 通知谁进入房间
  addToNicknames(state, nickname) {
    // 判断是否在房间，不在房间则进行通知，这里只追加到列表后面了，
    // **** 可以有更好的通知效果，比如弹窗
    if (!state.nicknames.includes(nickname)) {
      state.nicknames.push(nickname)
    }
  },
  // 监听连接或者断开
  updateConnected(state, flag) {
    state.connected = flag
  },
  // 某玩家退出游戏
  delFromNicknames(context, nickname) {
    state.nicknames = state.nicknames.filter(item => item !== nickname)
  },
  // 画线条
  drawNewLine(state, newLine) {
    console.log(newLine)
    state.lines.push(newLine)
  },
  // 鼠标滑动.更新线条
  updateNewLine(state, lastLine) {
    // 更新vuex中最后一项的points即可
    const line = state.lines[state.lines.length - 1]
    line.points = lastLine.points
  }
}

const actions = {
  // 首先检查是否被占用
  checkUserExist(context, nickname) {
    return new Promise((resolve, reject) => {
      socket.emit('check_user_exist', nickname, isExist => {
        resolve(isExist)
      })
    })
  },
  // 此时进入房间存储我的信息
  sendUserEnter(context) {
    const nickname = localStorage.getItem('nickname')
    // 在服务器存储名字
    socket.emit('enter', nickname)
    // 在本地存储名字
    context.commit('updateNickname', nickname)
  },
  // 主持人开始游戏
  sendStartGame(context, answer) {
    // 发消息，通知到服务器
    socket.emit('start_game', answer)
  },
  // 参与人回答答案
  sendAnswerGame(context, inputImageName) {
    socket.emit('answer_game', inputImageName)
  },
  sendUserLeave(context) {
    // 发送退出消息
    socket.emit('leave')
    context.commit('updateNickname', '')
    localStorage.removeItem('nickname')
  },
  // 向服务器同步游戏
  sendDrawNewLine(context, line) {
    socket.emit('new_line', line)
  },
  // 终止游戏
  sendStopGame(context) {
    socket.emit('stop_game')
  },
  // 向服务器更新线条数据
  sendUpdateNewLine(context, line) {
    socket.emit('update_line', line)
  }
}

const getters = {
  isGameStarted() {
    return !!state.holder
  },
  isGameHolder(state) {
    return state.nickname === state.holder
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
