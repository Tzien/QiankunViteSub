import { defineStore } from 'pinia';

export const useSharedStore = defineStore('shared', {
  state: () => ({
    message: '这是子应用pinia实例',
  }),
  actions: {
    setMessage(newMessage) {
      this.message = newMessage;
    },
  },
});