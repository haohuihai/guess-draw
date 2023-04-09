import { defineStore } from 'pinia'
import { pinia } from '../index'
export const useMain = defineStore('store', {
  state: () => {
    return {
      counter: 0,
      name: 'name'
    }
  },
  getters: {
    doubleCount: (state) => {
      return state.counter * 2
    }
  },
  actions: {
    increment() {
      this.counter++
    },
    redomizeCounter() {
      setTimeout(() => {
        this.counter = Math.round(100 * Math.random())
      }, 0)
    }
  }
})
export const useHomePinia = () => {
  return useMain(pinia)
}