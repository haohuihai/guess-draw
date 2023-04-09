<template>
  <div>
    <!-- 布局：头部 -->
    <header>
      <AppHeader />
    </header>
    <!-- 布局：主体 -->
    <main class="flex">
      <!-- 左边 -->
      <AppSidePanel />
      <AppStage />
    </main>
  </div>
</template>
<script setup lang="ts">
import { useDrawPanel } from '@/stores/modules/game'
import AppHeader from '../components/AppHeader.vue'
import AppStage from '../components/AppStage.vue'
import AppSidePanel from '../components/AppSidePanel.vue'
import { ElPageHeader } from 'element-plus'
let drawondrawState = useDrawPanel()

// 一进入首页, 就意味着需要告诉服务器, 我来了
drawondrawState.sendUserEnter()
</script>
<style scoped>
.left-panel {
  padding: 20px;
}
</style>
