<template>
  <div style="display: flex; flex-direction: column">
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
    </div>
    <div>
      <h1>这是子应用Home页面</h1>
    </div>

    <div style="color: green">
      <h1>{{ sharedStore.message }}</h1>
      <h1>{{ globalStateValue }}</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSharedStore } from '../store/shared'
const sharedStore = useSharedStore()

// 使用 defineProps 来接收父应用传递的 props
const props = defineProps({
  globalState: {
    type: Object,
    required: true,
  },
})

const globalStateValue = props.globalState
debugger
// 直接从主应用传递的 store 中获取数据
const message = ref(globalStateValue)

// 如果需要修改主应用的状态
const updateMessage = () => {
  globalState.setMessage('Updated from child app')
}

// 监听 globalState 的动态变化
watch(
  () => props.globalState,
  (newGlobalState) => {
    console.log('Updated globalState:', newGlobalState)
  },
  { immediate: true }
)
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
