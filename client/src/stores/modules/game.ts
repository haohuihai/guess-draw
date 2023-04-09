import { defineStore } from 'pinia'
import { store } from '../index'
import socket from '@/socket'
export interface GameState {
  nickname: string
  nicknames: String[]
  holder: string
  lines: []
  connected: boolean
}

export const useDrawPanel = defineStore('game', {
  state: (): GameState => {
    return {
      nickname: '', // 当前用户名
      nicknames: [], // 房间用户列表
      holder: '', // 游戏主持
      lines: [], // 游戏线条
      connected: false // 连接状态
    }
  },
  persist: {
    enabled: true
  },
  getters: {
    getHolder(state): string {
      return state.holder
    },
    getconnected(state): boolean {
      return state.connected
    },
    isGameStarted(state): boolean {
      return !!state.holder
    },
    isGameHolder(state): boolean {
      return state.nickname === state.holder
    },
    getNickNames(state): string[] {
      return state.nicknames
    },
    getNickname(state): string {
      return state.nickname
    },
    getLines(state): [] {
      return state.lines
    }
  },
  actions: {
    updateNickname(nickname) {
      this.nickname = nickname || ''
    },
    updateNicknames(nicknames) {
      this.nicknames = nicknames || []
    },
    updateHolder(holder) {
      this.holder = holder || ''
    },
    updateLines(lines) {
      this.lines = lines || []
    },
    // 通知谁进入房间
    addToNicknames(nickname: String) {
      // 判断是否在房间，不在房间则进行通知，这里只追加到列表后面了，
      // **** 可以有更好的通知效果，比如弹窗
      if (!this.nicknames.includes(nickname)) {
        this.nicknames.push(nickname)
      }
    },
    // 监听连接或者断开
    updateConnected(flag) {
      this.connected = flag
    },
    // 某玩家退出游戏
    delFromNicknames(nickname) {
      console.log('nickname', nickname)
      const names = this.nicknames.filter((item) => item !== nickname)
      this.updateNicknames(names)
    },
    // 画线条
    drawNewLine(newLine) {
      this.lines.push(newLine)
    },
    // 鼠标滑动.更新线条
    updateNewLine(lastLine) {
      // 更新vuex中最后一项的points即可
      const line = this.lines[this.lines.length - 1]
      line.points = lastLine.points
    },
    checkUserExist(nickname) {
      return new Promise((resolve, reject) => {
        socket.emit('check_user_exist', nickname, (isExist) => {
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
      // context.commit('updateNickname', nickname)
      this.nickname = nickname || ''
    },
    // 主持人开始游戏
    sendStartGame(answer) {
      // 发消息，通知到服务器
      socket.emit('start_game', answer)
    },
    // 参与人回答答案
    sendAnswerGame(inputImageName) {
      socket.emit('answer_game', inputImageName)
    },
    sendUserLeave() {
      // 发送退出消息
      socket.emit('leave')
      // context.commit('updateNickname', '')
      this.nickname = ''
      localStorage.removeItem('nickname')
    },
    // 向服务器同步游戏
    sendDrawNewLine(line) {
      socket.emit('new_line', line)
    },
    // 终止游戏
    sendStopGame() {
      socket.emit('stop_game')
    },
    // 向服务器更新线条数据
    sendUpdateNewLine(line) {
      socket.emit('update_line', line)
    }
  }
})

export const useDrawOneDraw = () => {
  return useDrawPanel(store)
}
