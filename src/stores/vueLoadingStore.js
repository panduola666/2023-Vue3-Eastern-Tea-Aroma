import { defineStore } from 'pinia'
export default defineStore('vueLoadingStore', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    openLoading() {
      this.isLoading = true
    },
    closeLoading() {
      this.isLoading = false
    }
  }
})
