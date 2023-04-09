<template>
  <ElCard ref="wrapper" :body-style="{ padding: 0 }">
    <v-stage
      :config="stageConfig"
      @mousedown="mousedownHandler"
      @mouseup="mouseupHandler"
      @mousemove="mousemoveHandler"
    >
      <v-layer>
        <v-line v-for="(line, index) in lines" :key="index" :config="line" />
      </v-layer>
    </v-stage>
  </ElCard>
</template>

<script setup lang="ts">
import { ref, reactive, computed, unref, onMounted } from 'vue'
import { ElCard } from 'element-plus'
import { useDrawOneDraw } from '@/stores/modules/game'

let drawondrawState = useDrawOneDraw()

let bodyWidth = document.off

let stageConfig = reactive({
  width: 800,
  height: 700
})
let painting = ref(false)
let stroke = ref('#ff0000')
let strokeWidth = ref(5)

let lines = computed(() => {
  return drawondrawState.getLines
})

let isGameStarted = computed(() => {
  return drawondrawState.isGameStarted
})

let isGameHolder = computed(() => {
  return drawondrawState.isGameHolder
})
onMounted(() => {
  getWindowSize()
  window.addEventListener('resize', getWindowSize)
})

const getWindowSize = () => {
  stageConfig.width = window.innerWidth - 210
  stageConfig.height = window.innerHeight - 80
}
const mousedownHandler = (e) => {
  // 这里只有游戏开始，并且是主持人才能绘画
  if (!unref(isGameStarted) || !unref(isGameHolder)) return
  painting.value = true
  // 创建一条新线条
  const newLine = {
    stroke: stroke.value,
    strokeWidth: strokeWidth.value,
    points: [e.evt.layerX, e.evt.layerY]
  }

  // 将创建的线条存储到vuex中
  // this.$store.commit('drawNewLine', newLine)
  // 将创建的线条更新到其他玩家
  drawondrawState.drawNewLine(newLine)
  drawondrawState.sendDrawNewLine(newLine)
  // this.$store.dispatch('sendDrawNewLine', newLine)
}
const mousemoveHandler = (e) => {
  if (painting.value) {
    const lastLine = lines.value[lines.value.length - 1]
    lastLine.points = lastLine.points.concat([e.evt.layerX, e.evt.layerY])
    // this.$store.commit('updateNewLine', lastLine)
    drawondrawState.updateNewLine(lastLine)
    drawondrawState.sendUpdateNewLine(lastLine)
    // 请求服务器，同步线的更新 action
    // this.$store.dispatch('sendUpdateNewLine', lastLine)
  }
}
const mouseupHandler = () => {
  painting.value = false
}
</script>
