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
      <h1>{{ messageStore.message }}</h1>
      <button @click="changeMessage">
        改变主应用消息为：这是改变的子应用实例
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect, unref, toRefs } from 'vue'
import { useMessageStore } from '../store/index'

var messageStore = ref({})

import { useGlobalState } from '@/shared/useGlobalState'
const { globalStore } = useGlobalState()
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper.js'
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  messageStore = useMessageStore()
} else {
  watchEffect(() => {
    if (globalStore.value) {
      messageStore.value = globalStore.value.messageStore
    }
  })
}

function changeMessage() {
  messageStore.value.setMessage('这是改变的子应用实例')
}
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
