// globalStateManager.js
let unsubscribe
let listeners = []
let state = {}

// 添加状态变化监听器
export function addGlobalStateListener(callback) {
  if (typeof callback === 'function') {
    listeners.push(callback)
  }
}

// 获取当前状态
export function getGlobalState() {
  return state
}

// 初始化全局状态监听器
export function initGlobalStateListener(actions) {
  if (!unsubscribe) {
    unsubscribe = actions.onGlobalStateChange((newState, prev) => {
      state = { ...state, ...newState } // 更新全局状态
      listeners.forEach((listener) => listener(newState, prev))
    }, true)
  }
}

// 移除特定的状态变化监听器
export function removeGlobalStateListener(callback) {
  listeners = listeners.filter((listener) => listener !== callback)
}

// 移除全局状态监听器
export function clearGlobalStateListener() {
  if (unsubscribe) {
    unsubscribe()
    unsubscribe = null
    listeners = []
    state = {}
  }
}
