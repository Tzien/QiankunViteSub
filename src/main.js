import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'
import pinia from './store/index'

import actions from './shared/action.js'
import { useMessageStore } from './store/message.js'
import {
  initGlobalStateListener,
  clearGlobalStateListener,
  addGlobalStateListener,
} from './shared/globalStateManager'

let instance = null
var messageStore = ref({})
async function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  instance.use(pinia)

  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    actions.setActions(props)
    //获取全局状态
    await addGlobalStateListener((state, prev) => {
      messageStore = state.messageStore
    })
  } else {
    messageStore = useMessageStore()
  }
  instance.use(router)
  instance.mount(container ? container.querySelector('#subapp') : '#subapp')
}

// 如何独立运行微应用？
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('并不是qiankun渲染')
  render()
}

renderWithQiankun({
  mount(props) {
    render(props)
    if (qiankunWindow.__POWERED_BY_QIANKUN__) {
      initGlobalStateListener(props)
    }
  },
  bootstrap() {
    console.log('%c', 'color:green;', ' ChildOne bootstrap')
  },
  update() {
    console.log('%c', 'color:green;', ' ChildOne update')
  },
  unmount(props) {
    instance.unmount()
    instance = null
    if (qiankunWindow.__POWERED_BY_QIANKUN__) {
      clearGlobalStateListener()
    }
  },
})
