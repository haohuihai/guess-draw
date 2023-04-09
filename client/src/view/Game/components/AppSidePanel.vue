<template>
  <ElCard class="mx-10px" :body-style="{ padding: '10px' }">
    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <ElButton v-if="!isGameStarted" type="primary" size="small" @click="startGameHandler"
        >主持游戏
      </ElButton>

      <ElButton
        v-if="isGameStarted && nickname === holder"
        type="warning"
        size="small"
        @click="stopGameHandler"
        >终止游戏</ElButton
      >

      <ElButton
        type="success"
        size="small"
        v-if="isGameStarted && nickname !== holder"
        @click="answerGameHandler"
        >猜答案</ElButton
      >

      <ElButton type="danger" size="small" @click="exitHandler">退出游戏</ElButton>
    </div>
    <!-- 玩家列表 -->
    <div class="panel-area">
      <ul class="participants">
        <li v-for="(item, index) in nicknames" :key="index">
          <span>{{ item }} {{ item === nickname ? '(我)' : '' }}</span>
          <ElTag v-if="item === holder" size="small">主持</ElTag>
        </li>
      </ul>
    </div>
    <!-- 弹出框：主持人设置答案 -->
    <ElDialog title="请设置答案" v-model="resultDialogVisible" width="30%">
      <ElInput v-model="expectImageName" placeholder="请输入您的答案" />

      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="resultDialogVisible = false">取 消</ElButton>
          <ElButton type="primary" @click="saveDialogHandler">确 定</ElButton>
        </span>
      </template>
    </ElDialog>

    <!-- 弹出框：答题人设置答案 -->
    <ElDialog title="请填写答案" v-model="answerDialogVisible" width="30%">
      <ElInput v-model="inputImageName" placeholder="请输入您的答案" />

      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="answerDialogVisible = false">取 消</ElButton>
          <ElButton type="primary" @click="saveAnswerDialogHandler">确 定</ElButton>
        </span>
      </template>
    </ElDialog>
  </ElCard>
</template>

<script lang="ts" setup>
import { ElTag, ElInput, ElButton, ElCard, ElDialog, ElMessage, ElMessageBox } from 'element-plus'
import { computed, unref, ref } from 'vue'
import { useDrawOneDraw } from '@/stores/modules/game'
import { useRouter } from 'vue-router'
const { replace } = useRouter()
let drawondrawState = useDrawOneDraw()
let resultDialogVisible = ref<boolean>(false)
let expectImageName = ref<string>('')
let answerDialogVisible = ref<boolean>(false)
let inputImageName = ref<string>('')

let nicknames = computed(() => {
  return drawondrawState.getNickNames
})

let nickname = computed(() => {
  return drawondrawState.getNickname
})

let holder = computed(() => {
  return drawondrawState.getHolder
})

let isGameStarted = computed(() => {
  return drawondrawState.isGameStarted
})

const saveDialogHandler = () => {
  if (!unref(expectImageName)) {
    ElMessage({
      message: '答案不能为空',
      type: 'error'
    })
    return
  }
  // 发送消息到服务器 判断是否有人已经抢到主持人了
  drawondrawState.sendStartGame(expectImageName.value)
  // this.$store.dispatch('sendStartGame', this.expectImageName)
  // 关闭弹窗
  resultDialogVisible.value = false
}
// 答题人回答答案
const saveAnswerDialogHandler = () => {
  // 1. 校验答案是否为空
  if (!inputImageName.value) {
    ElMessage({
      message: '答案设置不能为空',
      type: 'error'
    })
    return
  }
  drawondrawState.sendAnswerGame(inputImageName.value)
  // 2. 发送答案，判断是否正确
  // this.$store.dispatch('sendAnswerGame', this.inputImageName)

  // 3. 关闭弹框
  answerDialogVisible.value = false
}
const startGameHandler = () => {
  resultDialogVisible.value = true
  expectImageName.value = ''
}
// 退出游戏
const exitHandler = () => {
  ElMessageBox.confirm('是否要退出游戏呢？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // this.$store.dispatch('sendUserLeave')
    drawondrawState.sendUserLeave()
    // 跳转到登录
    replace({
      path: '/game/drawInto'
    })
  })
}
// 终止游戏
const stopGameHandler = () => {
  ElMessageBox.confirm('亲，你确定要终止游戏么？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    drawondrawState.sendStopGame()
  })
}
// 猜答案弹框
const answerGameHandler = () => {
  // 显示弹框， 清空弹框内容
  answerDialogVisible.value = true
  inputImageName.value = ''
}
</script>

<style scoped>
.panel-area {
  margin: 10px 0;
}
</style>
