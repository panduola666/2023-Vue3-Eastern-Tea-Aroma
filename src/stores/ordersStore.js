import { vueLoadingStore } from './index.js'
import axios from 'axios'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
export default defineStore('ordersStore', {
  state: () => ({
    orders: []
  }),
  actions: {
    getOrdersData() {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios.get(`${VITE_BASEURL}/orders?_expand=user`).then((res) => {
        loading.closeLoading()
        this.orders = res.data
      })
    }
  }
})
