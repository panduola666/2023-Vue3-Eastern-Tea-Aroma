import { vueLoadingStore } from './index.js'
import axios from 'axios'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env

export default defineStore('discountStore', {
  state: () => ({
    discountData: {}
  }),
  actions: {
    getDiscountData() {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios
        .get(`${VITE_BASEURL}/discount`)
        .then((res) => {
          if (loading.isLoading) loading.closeLoading()
          this.discountData = res.data
        })
        .catch(() => {
          loading.closeLoading()
        })
    }
  }
})
