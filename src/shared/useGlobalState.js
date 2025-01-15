// useGlobalState.js
import { ref, onMounted, onUnmounted } from 'vue'
import { getGlobalState, addGlobalStateListener, removeGlobalStateListener } from './globalStateManager'

export function useGlobalState() {
  const globalStore = ref(getGlobalState())

  const updateState = (state) => {
    globalStore.value = state
  }

  // 添加全局状态变化监听器
  const listener = (state) => {
    updateState(state)
  }

  onMounted(() => {
    addGlobalStateListener(listener)
  })

  onUnmounted(() => {
    removeGlobalStateListener(listener)
  })

  return {
    globalStore
  }
}
