<template>
  <div>
    <ElCard
      class="login-card"
      :body-style="{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px'
      }"
    >
      <ElForm ref="loginForm" inline :model="formData" :rules="rules">
        <ElFormItem prop="nickname">
          <ElInput v-model="formData.nickname" placeholder="请输入您的昵称" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="enterGame">进入游戏</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import { useDrawPanel } from '@/stores/modules/game'
import { reactive, ref, unref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
let drawondrawState = useDrawPanel()
const loginForm = ref<HTMLDivElement | null>(null)

let formData = reactive({
  nickname: ''
})

let rules = reactive({
  nickname: [{ required: true, message: '请输入您的昵称' }]
})
const enterGame = () => {
  unref(loginForm).validate(async (flag) => {
    if (!flag) return
    const nickname = formData.nickname
    const isExist = await drawondrawState.checkUserExist(nickname)
    console.log(nickname)
    if (isExist) {
      ElMessage.error('大哥，该昵称已经被人占用了！换个吧')
    } else {
      localStorage.setItem('nickname', nickname)
      //   this.$router.push('/home')
      router.push({
        path: '/game/drawonedraw'
      })
    }
  })
}
</script>

<style scoped>
.login-card {
  width: 50%;
  margin: 0 auto;
  margin-top: 200px;
}
</style>
