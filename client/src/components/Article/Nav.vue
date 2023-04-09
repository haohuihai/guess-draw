<template>
  <div class="global-nav" :class="isShowNav ? 'global-top-hide' : ''">
    <a href="/">
      <img class="head-image" src="@/assets/imgs/1256748.png" alt="" />
    </a>
    <div class="global-nav-right">
      <div class="global-top-left">
        <span> 首页 </span>
        <span> 沸点 </span>
        <span> 小册 </span>
        <span> 活动 </span>
      </div>
      <div class="global-top-right">
        <ElInput
          suffix-icon="el-icon-search"
          v-model="input"
          @clear="handleClear"
          placeholder="请输入内容"
          :clearable="true"
          @change="handleChange"
          max="100"
        />
        <ElButton type="primary" @click="toWrite">写文章</ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElInput, ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'Nav',
  components: { ElInput, ElButton },
  props: {
    isLogin: {
      type: Boolean,
      require: true
    }
  },
  setup(props, { slots, expose, emit }) {
    const { push } = useRouter()
    let input = ref<string>('')
    let isShowNav = ref(false)
    let visible = ref(false)
    let fileList = ref([])
    onMounted(() => {})
    const toWrite = () => {
      console.log(123)
      push('/article/publish')
    }
    const handleClear = () => {
      console.log(`123`, 123)
    }
    const handleChange = () => {}
    return {
      input,
      visible,
      fileList,
      isShowNav,
      toWrite,
      handleClear,
      handleChange
    }
  }
})
</script>

<style lang="less">
.global-top-hide {
  transform: translate3d(0, -100%, 0);
}
.global-nav {
  display: flex;
  align-items: center;
  height: 70px;
  transition: all 0.2s;
  transform: translateZ(0);
  background: #fff;
  color: #909090;
  z-index: 20;
  justify-content: space-between;
  padding: 0 10px;
}
.head-image {
  width: 70px;
  height: 41px;
}
.global-nav-right {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.global-nav-right .notice {
  font-size: 25px;
  margin-right: 10px;
}

.global-top-left {
  display: flex;
  align-items: center;
  height: 41px;
  span {
    font-size: 18px;
    align-self: flex-end;
    vertical-align: middle;
    margin: 0 10px;
    cursor: pointer;
  }
}

.global-top-right {
  display: flex;
  .el-input {
    margin-right: 10px;
  }
}

.global-nav-right .global-top-lef span {
  margin: 0 10px;
  color: rgba(140, 140, 140, 1);
}
.global-nav-right .global-top-left span:nth-child(1) {
  color: #007fff;
}
.global-nav-right .global-top-left > span:nth-child(1):hover {
  color: #007fff;
}
</style>
