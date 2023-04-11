import { userStore, updatedImgStore, vueLoadingStore } from './index.js'
import router from '../router/index.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
export default defineStore('coursesStore', {
  state: () => ({
    courses: [],
    currentCourse: {},
    dates: []
  }),
  actions: {
    async getCoursesData() {
      const loading = vueLoadingStore()
      loading.openLoading()
      try {
        const res = await axios.get(
          `${VITE_BASEURL}/courses?_expand=user&_embed=courseDates`
        )
        if (loading.isLoading) loading.closeLoading()
        this.courses = res.data
      } catch (err) {
        loading.closeLoading()
      }
    },
    async getDates() {
      const loading = vueLoadingStore()
      try {
        const res = await axios.get(
          `${VITE_BASEURL}/courseDates?_expand=course`
        )
        if (loading.isLoading) loading.closeLoading()
        this.dates = res.data
      } catch (err) {
        loading.closeLoading()
      }
    },
    async getCurrent(courseDateId, isNew = false) {
      const updatedImg = updatedImgStore()
      const loading = vueLoadingStore()
      updatedImg.imgUrl = ''
      if (isNew || courseDateId <= 0) {
        this.currentCourse = {
          title: '',
          coverUrl: '',
          contents: [''],
          price: 0,
          total: 0,
          start: new Date().getTime(),
          startHour: '13',
          startMinute: '00',
          end: new Date().getTime(),
          endHour: '13',
          endMinute: '00'
        }
        return
      }
      try {
        loading.openLoading()
        const courseDate = await axios.get(
          `${VITE_BASEURL}/courseDates/${courseDateId}?_expand=course&_expand=user`
        )
        if (loading.isLoading) loading.closeLoading()
        this.currentCourse = courseDate.data
      } catch (err) {
        if (err.response.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: '查無此課程',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push('/404')
          })
          return
        }
        loading.closeLoading()
      }
    },
    patchSaved(courseDate) {
      const user = userStore()
      if (!user.isLogin) return
      const { savedUsersId } = courseDate
      const isSaved = savedUsersId.includes(+sessionStorage.getItem('userId'))
      if (isSaved) {
        // 移除收藏
        const index = savedUsersId.findIndex(
          (item) => item === +sessionStorage.getItem('userId')
        )
        savedUsersId.splice(index, 1)
      } else {
        // 添加收藏
        savedUsersId.push(+sessionStorage.getItem('userId'))
      }
      Swal.fire({
        icon: 'success',
        title: isSaved ? '已移出收藏夾' : '已收藏',
        allowOutsideClick: false,
        showConfirmButton: false,
        timer: 1500
      })
      axios
        .patch(`${VITE_BASEURL}/courseDates/${courseDate.id}`, { savedUsersId })
        .then(() => {
          this.getCoursesData()
        })
    }
  },
  getters: {}
})
