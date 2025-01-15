import { defineStore } from 'pinia'
import { ref } from 'vue'

// export const useMessageStore = defineStore(
//   'message',
//   {
//     state: () => ({
//       message: '这是子应用pinia实例',
//     }),
//     actions: {
//       setMessage(newMessage) {
//         this.message = newMessage
//       },
//     },
//   },
//   {
//     persist: true,
//   }
// )


export const useMessageStore = defineStore(
  'message',
  () => {
    const message = ref('这是子应用pinia实例')
    const setMessage = (newMessage) => {
      message.value = newMessage
    }
    return {
      message,
      setMessage,
    }
  },
  {
    persist: true,
  }
)