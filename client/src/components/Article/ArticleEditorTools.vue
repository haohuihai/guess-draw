<template>
  <div style="display: inline">
    <button
      type="button"
      @click="changeCodeStyle"
      class="op-icon fa fa-mavon-align-left"
      aria-hidden="true"
      title="代码风格"
    ></button>
    <button
      type="button"
      @click="changeThemeStyle"
      class="op-icon fa fa-mavon-align-left"
      aria-hidden="true"
      title="切换主题"
    ></button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MavonEditorTools',
  emits: ['changeCodeStyle', 'changeThemeStyle', 'hidleShowTools'],
  setup(props, { emit }) {
    const changeCodeStyle = () => {
      emit('changeCodeStyle')
    }
    const changeThemeStyle = () => {
      emit('changeThemeStyle')
    }
    const hidleShowTools = () => {
      emit('hidleShowTools')
    }
    return {
      changeCodeStyle,
      changeThemeStyle,
      hidleShowTools
    }
  }
})
</script>

<style></style>
