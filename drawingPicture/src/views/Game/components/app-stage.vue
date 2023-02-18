<template>
  <el-card ref="wrapper" :body-style="{ padding: 0 }">
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
  </el-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      stageConfig: {
        width: 800,
        height: 700
      },
      painting: false,
      stroke: '#ff0000',
      strokeWidth: 5
      // lines: [
      //   { stroke: '#ff0000', strokeWidth: 5, points: [100, 100, 100, 400] },
      //   { stroke: '#00ff00', strokeWidth: 10, points: [100, 100, 300, 300, 300, 500] }
      // ]
    }
  },

  computed: {
    ...mapState(['lines']),
    ...mapGetters(['isGameStarted', 'isGameHolder'])
  },

  mounted() {
  },

  methods: {
    mousedownHandler(e) {
      // 这里只有游戏开始，并且是主持人才能绘画
      if (!this.isGameStarted || !this.isGameHolder) return
      this.painting = true
      // 创建一条新线条
      const newLine = {
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        points: [e.evt.layerX, e.evt.layerY]
      }

      // 将创建的线条存储到vuex中
      this.$store.commit('drawNewLine', newLine)
      // 将创建的线条更新到其他玩家
      this.$store.dispatch('sendDrawNewLine', newLine)
    },
    mousemoveHandler(e) {
      if (this.painting) {
        const lastLine = this.lines[this.lines.length - 1]
        lastLine.points = lastLine.points.concat([e.evt.layerX, e.evt.layerY])
        this.$store.commit('updateNewLine', lastLine)
        // 请求服务器，同步线的更新 action
        this.$store.dispatch('sendUpdateNewLine', lastLine)
      }
    },
    mouseupHandler() {
      this.painting = false
    }
  }
}
</script>
