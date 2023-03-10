import { vueLoadingStore } from './index.js'
import axios from 'axios'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
export default defineStore('activitiesStore', {
  state: () => ({
    activities: [],
    activity: {}
  }),
  actions: {
    getAllActivitiesData() {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios.get(`${VITE_BASEURL}/activities`).then((res) => {
        this.activities = res.data
        loading.closeLoading()
      })
    },
    getCurrentActivity(id) {
      const loading = vueLoadingStore()
      loading.openLoading()
      axios.get(`${VITE_BASEURL}/activities/${id}`).then((res) => {
        loading.closeLoading()
        this.activity = res.data
      })
    }
  }
})
