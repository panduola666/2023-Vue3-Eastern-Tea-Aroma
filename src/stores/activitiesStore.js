// import router from '../router/index.js'
import axios from 'axios'
// import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
export default defineStore('activitiesStore', {
  state: () => ({
    activities: [],
    activity: {}
  }),
  actions: {
    getAllActivitiesData() {
      axios.get(`${VITE_BASEURL}/activities`).then((res) => {
        this.activities = res.data
      })
    },
    getCurrentActivity(id) {
      axios
        .get(`${VITE_BASEURL}/activities/${id}`)
        .then((res) => (this.activity = res.data))
    }
  }
})
