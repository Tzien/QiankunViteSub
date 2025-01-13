import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import {
  renderWithQiankun,
  qiankunWindow,
} from 'vite-plugin-qiankun/dist/helper'
import { createPinia } from 'pinia'

import actions from './shared/action.js'
const pinia = createPinia()
let instance = null
function render(props = {}) {
  if (props) {
    // 注入 actions 实例
    actions.setActions(props)
  }
  const { container } = props
  instance = createApp(App)
  instance.use(pinia)
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
  },
})
