<template>
  <div class="app-header">
    <ElTag v-if="connected" type="success">服务已连接</ElTag>
    <ElTag v-else type="danger">服务未连接</ElTag>

    <ElTag v-if="isGameStarted" type="success">游戏进行中</ElTag>
    <ElTag v-else type="info">游戏未开始</ElTag>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElTag } from 'element-plus'
import { useDrawPanel } from '@/stores/modules/game'
let drawondrawState = useDrawPanel()
let connected = computed(() => drawondrawState.getconnected)
let isGameStarted = computed(() => drawondrawState.isGameStarted)
</script>

<style lang="less" scoped>
.ElTag {
  margin-right: 10px;
}
.app-header {
  height: 50px;
  line-height: 50px;
  box-shadow: var(--el-box-shadow-light);
  margin: 10px;
  span {
    margin: 0 10px;
  }
}
</style>
