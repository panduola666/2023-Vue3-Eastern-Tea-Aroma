import { userStore, updatedImgStore } from './index.js'
import router from '../router/index.js'
import axios from 'axios'
import Swal from 'sweetalert2'
import { defineStore } from 'pinia'
const { VITE_BASEURL } = import.meta.env
// const swalColor = {
//   confirmButtonColor: "#4c7866",
//   cancelButtonColor: "#727272",
// };
export default defineStore('coursesStore', {
  state: () => ({
    courses: [],
    currentCourse: {}
  }),
  actions: {
    async getCoursesData() {
      const res = await axios.get(
        `${VITE_BASEURL}/courses?_expand=user&_embed=courseDates`
      )
      this.courses = res.data
    },
    async getCurrent(courseDateId, isNew = false) {
      const updatedImg = updatedImgStore()
      updatedImg.imgUrl = ''
      if (isNew) {
        this.currentCourse = {
          title: '',
          coverUrl: '',
          contents: [''],
          price: 0,
          total: 0
        }
        return
      }
      try {
        const courseDate = await axios.get(
          `${VITE_BASEURL}/courseDates/${courseDateId}?_expand=course&_expand=user`
        )
        this.currentCourse = courseDate.data
      } catch (err) {
        if (err.response.status === 404) {
          Swal.fire({
            icon: 'warning',
            title: '查無此課程',
            showConfirmButton: false,
            timer: 1500
          }).then((res) => {
            console.log(res)
            router.push('/404')
          })
          return
        }
        console.log(err)
      }
      // console.log(courseDate.data);
    },
    patchSaved(courseDate) {
      console.log(courseDate)
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
        .catch((err) => {
          console.log('收藏')
          console.log(err)
        })
    }
  },
  getters: {}
})
